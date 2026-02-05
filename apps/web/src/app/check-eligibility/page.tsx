"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkEligibility } from "@/data/api";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

export default function EligibilityPage() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    state: "Delhi",
    income: "",
    occupation: "Unemployed",
    caste: "General",
  });

  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    // Convert types for API
    const payload = {
      ...formData,
      age: parseInt(formData.age),
      income: parseInt(formData.income),
    };

    // Simulate API delay for UX
    // await new Promise(r => setTimeout(r, 800))

    const data = await checkEligibility(payload);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Check Your Eligibility</h1>
          <p className="text-muted-foreground">
            Enter your details to find schemes matched to your profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="e.g. 25"
                      required
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Family Income (₹)</Label>
                  <Input
                    id="income"
                    name="income"
                    type="number"
                    placeholder="e.g. 250000"
                    required
                    min="0"
                    value={formData.income}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Bihar">Bihar</option>
                    {/* Add more states */}
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                    >
                      <option value="Unemployed">Unemployed</option>
                      <option value="Student">Student</option>
                      <option value="Farmer">Farmer</option>
                      <option value="Salaried">Salaried</option>
                      <option value="Self-Employed">Self-Employed</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caste">Category</Label>
                    <Select
                      id="caste"
                      name="caste"
                      value={formData.caste}
                      onChange={handleChange}
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Checking...
                    </>
                  ) : (
                    "Check Eligibility"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Results</h2>

            {!results && !loading && (
              <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl text-muted-foreground text-center">
                <AlertCircle className="h-10 w-10 mb-2 opacity-20" />
                <p>Fill out the form to see results.</p>
              </div>
            )}

            {results && results.length === 0 && (
              <div className="p-4 rounded-lg bg-orange-50 text-orange-800 border border-orange-200">
                No schemes found for this profile.
              </div>
            )}

            <div className="space-y-3">
              {results?.map((res: any) => (
                <Card
                  key={res.scheme_id}
                  className={`border-l-4 ${res.eligible ? "border-l-green-500" : "border-l-red-500"}`}
                >
                  <CardContent className="p-4 pt-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{res.title}</h3>
                      {res.eligible ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                          <XCircle className="w-3 h-3 mr-1" /> Not Eligible
                        </span>
                      )}
                    </div>

                    {!res.eligible && res.failed_criteria.length > 0 && (
                      <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                        <strong>Reason:</strong> Criteria not met for{" "}
                        {res.failed_criteria.join(", ")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
