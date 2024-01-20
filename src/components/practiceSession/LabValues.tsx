import { Typography } from "@mui/material";
import { primaryGradientText } from "../../theme";

export default function LabValues() {
  return (
    <div>
      <Typography variant="h4" sx={primaryGradientText}>Lab Values</Typography>
      <br />
      {
        labValues.map(labValue => (
          <div>
            <Typography color="primary" fontWeight={600}>{labValue.heading}&nbsp;</Typography>
            <Typography fontWeight={500} sx={{ whiteSpace: 'pre-line' }}>{labValue.values}</Typography>
          </div>
        ))
      }
    </div>
  )
}

const labValues = [
  {
    heading: "Biochemistry:",
    values: (
      `Na+: 135 - 145 mmol/l
      K+: 3.5 - 5.0 mmol/l
      Urea: 2.5 - 6.5 mmol/l
      Creatinine: 50 - 120 µmol/l
      ALT: 5 - 30 IU/l
      AST: 10 - 40 IU/l
      Bilirubin: 2 - 17 µmol/l
      Alkaline phosphatase: 30 - 130 IU/l
      Albumin: 35 - 55 g/l
      γGT: 5 - 30 IU/l
      αFP: <10 kU/l
      Corrected Ca2+: 2.20 - 2.60 mmol/l
      PO43-: 0.70 - 1.40 mmol/l
      Amylase: <200 U/l
      Lactate: 0.5 - 2.2 mmol/l
      Mg2+: 0.75 - 1.00 mmol/l
      Urate: 0.1 - 0.4 mmol/l
      CRP: 0 - 10 mg/l
      
      `
    )
  },
  {
    heading: "Arterial Blood Gas Results:",
    values: (
      `pH: 7.35 – 7.45
      pO2: 11 – 13 kPa (82.5 – 97.5 mmHg)
      pCO2: 4.7 – 6.0 kPa (35.2 – 45 mmHg)
      HCO3: 22 – 26 mmol/L
      Base excess: (-2 to +2 mmol/L)
      
      `
    )
  },
  {
    heading: "CSF:",
    values: (
      `White blood cells (WBC): 0 – 5 cells/µL
      Red blood cells (RBC): 0 – 10/mm³
      Protein: 0.15 – 0.45 g/L (or <1% of the serum protein concentration)
      Glucose: 2.8 – 4.2 mmol/L (or ≥ 60% plasma glucose concentration)
      Opening pressure: 10 – 20 cm H2O
      
      `
    )
  },
  {
    heading: "Endocrinology:",
    values: (
      `TSH: 0.17 - 3.2 µU/l
      fT4: 11 - 22 pmol/l
      fT3: 3.5 - 5 pmol/l
      Growth hormone: <10 ng/ml
      Cholesterol: <5.2 mmol/l
      Triglycerides: 0 - 1.5 mmol/l
      LDL: <3.5 mmol/l
      HDL: >1.0 mmol/l
      Total/HDL: <5.0 mmol/l
      FSH: 1 - 25 U/l
      LH: 1 - 70 U/l
      Prolactin: <400 mU/l
      Haematology:
      MCV: 76 - 98 fl
      Haematocrit: 0.35 - 0.55
      WCC: 4 - 11 x 109/l
      Neutrophils: 2.5 - 7.58 x 109/l
      Lymphocytes: 1.5 - 3.5 x 109/l
      Platelets: 150 - 400 x 109/l
      ESR: 0-10 mm in the 1st hour
      PT: 10.6 - 14.9 s
      PTT: 23.0 - 35.0 s
      TT: 10.5 - 15.5 s
      Fibrinogen: 125 - 300 mg/dl
      Vitamin B12: 160 - 900 pmol/l
      Folate: 2.0 - 11.0 µg/l
      Immunoglobulins:
      IgM: 0.5 - 2.0 g/l
      IgG: 5 - 16 g/l
      IgA: 1.0 - 4.0 g/l
      
      
      Hba1c: <48 mmol/mol, <6.5%
      
      Cortisol (Blood)
      Morning: 450-700 nmol/L
      Midnight: 80-280 nmol/L
      Lactate
      Venous: 0.6-2.4 mmol/L
      Arterial: 0.6-1.8 mmol/L
      
      Lipids
      Total cholesterol: < 5 mmol/L
      Triglycerides: 0.55-1.90 mmol/L
      HDL cholesterol: 0.9-1.93 mmol/L
      LDL cholesterol: < 2 mmol/L
      
      Cardiac enzymes
      Troponin T: <12 ng/L (<0.1 ng/ml)
      
      Creatine kinase
      Male: 25-195 U/L
      Female: 5-170 U/L
      
      Lactate dehydrogenase (LDH): 70-250 U/L
      
      Urine reference intervals
      Cortisol (free): < 280 nmol/24h
      
      `
    )
  },
  {
    heading: "Reference:",
    values: (
      `Oxford Handbook of Clinical Medicine 10th Edition
      Oxford Handbook of Haematology 3rd Edition
      Oxford Handbook of Endocrinology and Diabetes 3rd Edition`
    )
  },
];