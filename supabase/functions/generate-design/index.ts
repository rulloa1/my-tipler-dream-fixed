import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define allowed styles to prevent prompt injection
const ALLOWED_STYLES = [
  'Modern Luxury',
  'Minimalist Scandinavian',
  'Industrial Chic',
  'Modern Farmhouse',
  'Mid-Century Modern',
  'Coastal Contemporary',
  'Dark Academia',
  'Art Deco',
  'Bohemian',
  'Traditional',
  'Contemporary',
  'Rustic',
  'Mediterranean',
  'Japanese Zen'
] as const;

// Input validation schema
const requestSchema = z.object({
  imageBase64: z.string()
    .min(1, 'Image is required')
    .refine(
      (val) => val.startsWith('data:image/'),
      'Invalid image format: must be a base64 data URL'
    )
    .refine(
      (val) => /^data:image\/(jpeg|jpg|png|webp|gif);base64,/.test(val),
      'Invalid image type: must be JPEG, PNG, WebP, or GIF'
    )
    .refine(
      (val) => val.length < 10_000_000,
      'Image too large: must be less than ~7.5MB'
    ),
  style: z.enum(ALLOWED_STYLES, {
    errorMap: () => ({ message: `Invalid style. Allowed styles: ${ALLOWED_STYLES.join(', ')}` })
  })
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Authenticated user:', user.id);

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input with zod
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request parameters', 
          details: validationResult.error.errors.map(e => e.message)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { imageBase64, style } = validationResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Lovable AI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing room structure with Lovable AI Vision...');

    // Step 1: Vision API - Analyze the room structure using Gemini
    const visionResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: 'Describe this interior room in detail. Focus on the architectural layout, perspective, furniture placement, and lighting. Do NOT describe the colors or specific decor style. Just the structure and composition.' 
              },
              { 
                type: 'image_url', 
                image_url: { url: imageBase64 } 
              }
            ],
          },
        ],
      }),
    });

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text();
      console.error('Vision API error:', visionResponse.status, errorText);
      
      if (visionResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (visionResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add funds to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to analyze image' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const visionData = await visionResponse.json();
    const rawDescription = visionData.choices?.[0]?.message?.content || 'A room interior';
    
    // Sanitize Vision API output to prevent prompt injection
    const description = rawDescription
      .substring(0, 500)
      .replace(/[^a-zA-Z0-9\s,.'\\-]/g, '')
      .trim() || 'A room interior';
    
    console.log('Vision Analysis complete (sanitized):', description.substring(0, 100) + '...');

    // Step 2: Generate new style image using Gemini image generation
    console.log('Generating redesigned image with Lovable AI...');
    
    const imagePrompt = `A photorealistic, architectural digest quality photograph of a room with this structure: ${description}. The room is designed in a ${style} style. High end, professional interior design photography, 8k resolution.`;
    
    const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-pro-image-preview',
        messages: [
          {
            role: 'user',
            content: imagePrompt,
          },
        ],
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error('Image generation API error:', imageResponse.status, errorText);
      
      if (imageResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (imageResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add funds to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate image' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const imageData = await imageResponse.json();
    console.log('Image generation response:', JSON.stringify(imageData).substring(0, 500));
    
    // Extract image from response - Gemini returns images inline in the content
    const content = imageData.choices?.[0]?.message?.content;
    let generatedUrl = null;
    
    // Check if content is an array (multimodal response)
    if (Array.isArray(content)) {
      for (const part of content) {
        if (part.type === 'image_url' && part.image_url?.url) {
          generatedUrl = part.image_url.url;
          break;
        }
      }
    } else if (typeof content === 'string' && content.startsWith('data:image')) {
      // Direct base64 image
      generatedUrl = content;
    }

    if (!generatedUrl) {
      console.error('No image in response. Full response:', JSON.stringify(imageData));
      return new Response(
        JSON.stringify({ error: 'No image generated. The AI may have returned text instead.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Image generated successfully');
    
    return new Response(
      JSON.stringify({ imageUrl: generatedUrl, description }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error in generate-design function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
