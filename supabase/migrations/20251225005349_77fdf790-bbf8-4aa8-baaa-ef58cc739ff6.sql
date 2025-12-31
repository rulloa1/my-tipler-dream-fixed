-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view own roles, admins can view all" ON public.user_roles;

-- Create a new restrictive policy - users can only see their own roles
CREATE POLICY "Users can only view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);