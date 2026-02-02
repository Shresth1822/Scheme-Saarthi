from fastapi import FastAPI, HTTPException
from core.schema import EligibilityRequest, EligibilityResponse
from core.engine import evaluate_scheme

app = FastAPI(title="SchemeSaarthi API")

# Mock database of schemes for demonstration until we connect Supabase
MOCK_SCHEMES = [
    {
        "id": "1",
        "title": "Old Age Pension",
        "rules": { "age": { "min": 60 }, "income": { "max": 250000 } }
    },
    {
        "id": "2",
        "title": "Student Scholarship",
        "rules": { "occupation": { "must_match": "Student" }, "age": { "max": 25 } }
    }
]

@app.get("/")
def read_root():
    return {"message": "SchemeSaarthi API is running"}

@app.post("/api/check-eligibility")
def check_eligibility(request: EligibilityRequest):
    results = []
    user_data = request.user_profile.dict(exclude_none=True)
    
    for scheme in MOCK_SCHEMES:
        evaluation = evaluate_scheme(user_data, scheme["rules"])
        results.append({
            "scheme_id": scheme["id"],
            "title": scheme["title"],
            "eligible": evaluation["eligible"],
            "failed_criteria": evaluation["failed_criteria"]
        })
        
    return results
