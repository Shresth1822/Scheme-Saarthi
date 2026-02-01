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
  -- Example: { "age": { "min": 18 }, "income": { "max": 500000 } }
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

-- RLS POLICIES (Placeholder - enabled in Phase 2)
alter table public.profiles enable row level security;
alter table public.schemes enable row level security;
alter table public.eligibility_rules enable row level security;
alter table public.saved_schemes enable row level security;
