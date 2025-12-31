-- Remove the SELECT policy on user_roles
-- Role checks will still work via the SECURITY DEFINER has_role() function
-- but users cannot directly query/see role assignments
DROP POLICY IF EXISTS "Users can view own roles only" ON public.user_roles;