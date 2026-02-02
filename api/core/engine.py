from typing import Dict, Any, List

def check_criteria(user_value: Any, rule: Any) -> bool:
    """Helper to check a single criteria against a rule."""
    if isinstance(rule, dict):
        if "min" in rule and user_value < rule["min"]:
            return False
        if "max" in rule and user_value > rule["max"]:
            return False
        if "must_match" in rule and user_value != rule["must_match"]:
            return False
        if "must_be_in" in rule and user_value not in rule["must_be_in"]:
            return False
    return True

def evaluate_scheme(user_profile: Dict[str, Any], scheme_rules: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates if a user is eligible for a scheme.
    Returns: { "eligible": bool, "failed_criteria": [] }
    """
    failed_criteria = []
    
    for criterion, rule in scheme_rules.items():
        user_value = user_profile.get(criterion)
        
        # If user data is missing for a required rule, we fail it (or handle as 'unknown')
        if user_value is None:
            failed_criteria.append(f"Missing data for: {criterion}")
            continue
            
        if not check_criteria(user_value, rule):
            failed_criteria.append(criterion)
            
    return {
        "eligible": len(failed_criteria) == 0,
        "failed_criteria": failed_criteria
    }
