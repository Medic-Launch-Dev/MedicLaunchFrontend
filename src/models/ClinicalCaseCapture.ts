export interface ClinicalCase {
  id?: string;
  title: string;
  caseDetails: string;
}

export interface GenerateClinicalCase {
  patientDemographics: string;
  clinicalContext: string;
  presentingComplaint: string;
  symptoms: string;
  complaintHistory: string;
}