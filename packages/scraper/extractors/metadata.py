import requests
from bs4 import BeautifulSoup

def extract_scheme_details(url: str) -> dict:
    """
    Fetches URL and extracts scheme metadata.
    Returns a dictionary matching the Supabase 'schemes' table structure.
    """
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # NOTE: Selectors below are PLACEHOLDERS. 
        # Actual selectors depend on the specific HTML structure of target sites (india.gov.in / myscheme.gov.in).
        # We will refine these based on actual page inspection or trial.
        
        title = soup.find('h1').get_text(strip=True) if soup.find('h1') else "Unknown Title"
        
        # Example extracting description (often in a specific div or p tag)
        description = ""
        desc_tag = soup.find('div', class_='scheme-description') # Hypothetical class
        if desc_tag:
            description = desc_tag.get_text(strip=True)
            
        # Ministry (often in breadcrumbs or specific metadata block)
        ministry = "Unknown Ministry"
        
        return {
            "title": title,
            "description": description,
            "ministry": ministry,
            "scheme_url": url,
            "state": "Central", # Default, logic to detect state needed
            "beneficiary_type": [],
            "funding_pattern": ""
        }

    except Exception as e:
        print(f"Extraction Error for {url}: {e}")
        return None
