-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- SCHEMES TABLE (Core Data)
create table public.schemes (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  
  ministry text,
  state text default 'Central', -- 'Central' or specific State name
  scheme_url text,
  
  beneficiary_type text[], -- Array of strings e.g. ['student', 'farmer']
  funding_pattern text,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ELIGIBILITY RULES TABLE (JSON Logic)
create table public.eligibility_rules (
  id uuid default uuid_generate_v4() primary key,
  scheme_id uuid references public.schemes(id) on delete cascade not null,
  
  -- The rule definition in JSON format
  rules jsonb not null default '{}'::jsonb,
  
  created_at timestamp with time zone default now()
);

-- SAVED SCHEMES (User Bookmarks)
create table public.saved_schemes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  scheme_id uuid references public.schemes(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  
  unique(user_id, scheme_id)
);

-- RLS POLICIES

-- Profiles: Users can read/edit their own profile
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." 
  on public.profiles for select 
  using ( true );

create policy "Users can insert their own profile." 
  on public.profiles for insert 
  with check ( auth.uid() = id );

create policy "Users can update own profile." 
  on public.profiles for update 
  using ( auth.uid() = id );

-- Schemes: Viewable by everyone, only admins (service role) can insert/update for now
alter table public.schemes enable row level security;

create policy "Schemes are viewable by everyone." 
  on public.schemes for select 
  using ( true );

-- Eligibility Rules: Public read
alter table public.eligibility_rules enable row level security;

create policy "Eligibility rules are viewable by everyone." 
  on public.eligibility_rules for select 
  using ( true );

-- Saved Schemes: Users manage their own
alter table public.saved_schemes enable row level security;

create policy "Users can view own saved schemes." 
  on public.saved_schemes for select 
  using ( auth.uid() = user_id );

create policy "Users can save schemes." 
  on public.saved_schemes for insert 
  with check ( auth.uid() = user_id );

create policy "Users can unsave schemes." 
  on public.saved_schemes for delete 
  using ( auth.uid() = user_id );

-- TRIGGERS for Profile handling on Auth Signup
-- This function automatically creates a profile entry when a new user signs up via Supabase Auth
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
