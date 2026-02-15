-- Allow Admins to update any profile (for approving authors, etc.)
create policy "Admins can update any profile"
  on public.profiles
  for update
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- Allow Admins to delete any profile (optional, for cleanup)
create policy "Admins can delete any profile"
  on public.profiles
  for delete
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );
