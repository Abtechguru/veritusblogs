-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  name text,
  avatar_url text,
  bio text,
  role text default 'reader', -- 'admin', 'author', 'reader'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'name', 'reader');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ARTICLES
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique, -- For SEO friendly URLs if needed, currently using ID
  excerpt text,
  content text,
  cover_image text,
  category text,
  tags text[],
  author_id uuid references public.profiles(id),
  published boolean default false,
  featured boolean default false,
  views integer default 0,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- COMMENTS
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  article_id uuid references public.articles(id) on delete cascade,
  user_id uuid references public.profiles(id),
  content text not null,
  parent_id uuid references public.comments(id), -- For nested replies
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REELS
create table public.reels (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  video_url text not null,
  thumbnail_url text,
  caption text,
  likes integer default 0,
  views integer default 0,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- WISE WORDS
create table public.wise_words (
  id uuid default uuid_generate_v4() primary key,
  quote text not null,
  author text not null,
  category text,
  likes integer default 0,
  published_at date default CURRENT_DATE,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STORAGE BUCKETS (You need to create 'images' and 'videos' via UI or API, SQL support for storage setup is limited)
-- This is just a placeholder comment.

-- RLS POLICIES (Row Level Security)
alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.comments enable row level security;
alter table public.reels enable row level security;
alter table public.wise_words enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Articles Policies
create policy "Articles are viewable by everyone if published." on public.articles for select using (published = true or auth.uid() in (select id from public.profiles where role = 'admin' or id = author_id));
create policy "Authors can create articles." on public.articles for insert with check (auth.uid() in (select id from public.profiles where role in ('admin', 'author')));
create policy "Authors can update own articles." on public.articles for update using (auth.uid() = author_id or auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Authors can delete own articles." on public.articles for delete using (auth.uid() = author_id or auth.uid() in (select id from public.profiles where role = 'admin'));

-- Comments Policies
create policy "Comments are viewable by everyone." on public.comments for select using (true);
create policy "Authenticated users can create comments." on public.comments for insert with check (auth.role() = 'authenticated');
create policy "Users can update own comments." on public.comments for update using (auth.uid() = user_id);
create policy "Users can delete own comments." on public.comments for delete using (auth.uid() = user_id or auth.uid() in (select id from public.profiles where role = 'admin'));

-- Reels Policies
create policy "Reels are viewable by everyone." on public.reels for select using (true);
create policy "Admins/Authors can create reels." on public.reels for insert with check (auth.uid() in (select id from public.profiles where role in ('admin', 'author')));
create policy "Admins/Authors can delete own reels." on public.reels for delete using (auth.uid() = user_id or auth.uid() in (select id from public.profiles where role = 'admin'));

-- Wise Words Policies
create policy "Wise words are viewable by everyone." on public.wise_words for select using (true);
create policy "Admins can manage wise words." on public.wise_words for all using (auth.uid() in (select id from public.profiles where role = 'admin'));
