-- Drop the existing policy that may allow anonymous access
DROP POLICY IF EXISTS "Users can view own roles, admins can view all" ON public.user_roles;

-- Create a new policy that explicitly requires authentication
CREATE POLICY "Authenticated users can view own roles, admins can view all"
ON public.user_roles
FOR SELECT
TO authenticated
USING ((auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role));