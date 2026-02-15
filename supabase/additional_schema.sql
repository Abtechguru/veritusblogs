-- SUPPORT TICKETS
create table public.support_tickets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  subject text not null,
  message text not null,
  status text default 'open', -- 'open', 'in-progress', 'resolved', 'closed'
  priority text default 'medium', -- 'low', 'medium', 'high', 'urgent'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STORIES
create table public.stories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  content_url text not null, -- URL to image/video
  type text default 'image', -- 'image', 'video'
  caption text,
  expires_at timestamp with time zone default (now() + interval '24 hours'),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES for Support Tickets
alter table public.support_tickets enable row level security;
create policy "Users can view own tickets." on public.support_tickets for select using (auth.uid() = user_id or auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Users can create tickets." on public.support_tickets for insert with check (auth.role() = 'authenticated');
create policy "Admins can update tickets." on public.support_tickets for update using (auth.uid() in (select id from public.profiles where role = 'admin'));

-- RLS POLICIES for Stories
alter table public.stories enable row level security;
create policy "Stories are viewable by everyone." on public.stories for select using (true);
create policy "Authors/Admins can create stories." on public.stories for insert with check (auth.uid() in (select id from public.profiles where role in ('admin', 'author')));
create policy "Owners/Admins can delete stories." on public.stories for delete using (auth.uid() = user_id or auth.uid() in (select id from public.profiles where role = 'admin'));

-- ARTICLE TABLE UPDATES
alter table public.articles add column if not exists status text default 'pending';
alter table public.articles add column if not exists categories text[];
alter table public.articles add column if not exists is_sponsored boolean default false;
alter table public.articles add column if not exists sponsored_by text;

-- NEWSLETTER SUBSCRIBERS
create table if not exists public.subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES for Subscribers
alter table public.subscribers enable row level security;
create policy "Subscribers can be inserted by anyone." on public.subscribers for insert with check (true);
create policy "Admins can view and manage subscribers." on public.subscribers for all using (auth.uid() in (select id from public.profiles where role = 'admin'));

