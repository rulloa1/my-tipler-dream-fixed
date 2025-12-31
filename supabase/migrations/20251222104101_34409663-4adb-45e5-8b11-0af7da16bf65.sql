-- Drop existing SELECT policies that cause the security issue
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a single permissive SELECT policy that properly restricts access
-- Users can ONLY see their own roles, admins can see all
CREATE POLICY "Users can view own roles, admins can view all"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  OR public.has_role(auth.uid(), 'admin')
);