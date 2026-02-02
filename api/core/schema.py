from pydantic import BaseModel
from typing import Optional, List

class UserProfile(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    income: Optional[int] = None
    occupation: Optional[str] = None
    caste: Optional[str] = None
    
class EligibilityRequest(BaseModel):
    user_profile: UserProfile

class EligibilityResponse(BaseModel):
    scheme_id: str
    eligible: bool
    failed_criteria: List[str]
