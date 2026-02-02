import os
from supabase import create_client, Client

def init_supabase() -> Client:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") # Use Service Role for admin writes
    
    if not url or not key:
        raise ValueError("Missing Supabase credentials in environment variables.")
        
    return create_client(url, key)

def upsert_scheme(client: Client, data: dict):
    """
    Upserts a scheme record into the 'schemes' table.
    """
    # Using 'scheme_url' or 'title' as a potential conflict target if needed, 
    # but initially relying on unique ID or handled logic. 
    # For now, we'll just insert/update based on a loose match logic or just append.
    # ideally we should have a unique external ID.
    
    # Simple insert for now as we don't have a unique constraint on URL yet in schema
    # Logic to check existence could go here.
    
    response = client.table("schemes").insert(data).execute()
    return response
