export interface ClinicalCase {
  id?: string;
  title: string;
  caseDetails: string;
  createdOn?: Date;
}

export interface GenerateClinicalCase {
  patientDemographics: string;
  clinicalContext: string;
  presentingComplaint: string;
  symptoms: string;
  complaintHistory: string;
}