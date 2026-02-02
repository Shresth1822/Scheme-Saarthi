import os
import json
import time
from dotenv import load_dotenv
from utils.db import init_supabase, upsert_scheme
from extractors.metadata import extract_scheme_details

# Load env vars
load_dotenv()

# Placeholder for actual URL list source
# In production, this might crawl a listing page or read from a file
TEST_URLS = [
    "https://www.myscheme.gov.in/schemes/pm-kisan-samman-nidhi", # Example URL, logic will need to adapt to specific sites
    # Add more test URLs here
]

def run_etl():
    """
    Main ETL function.
    1. Iterates through URLs.
    2. Extracts data using extractors.
    3. Transforms/Cleans data.
    4. Loads into Supabase.
    """
    print("Starting ETL Process...")
    supabase_client = init_supabase()
    
    for url in TEST_URLS:
        print(f"Processing: {url}")
        try:
            # EXTRACT & TRANSFORM
            scheme_data = extract_scheme_details(url)
            
            if not scheme_data:
                print(f"Failed to extract data for {url}")
                continue

            # LOAD
            result = upsert_scheme(supabase_client, scheme_data)
            print(f"Successfully upserted scheme: {scheme_data.get('title')}")
            
            # Be polite to the server
            time.sleep(1) 

        except Exception as e:
            print(f"Error processing {url}: {e}")

    print("ETL Process Completed.")

if __name__ == "__main__":
    run_etl()
