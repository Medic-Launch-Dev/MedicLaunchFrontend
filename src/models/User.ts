export interface TokenData {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface MedicLauncUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  graduationYear: number;
  displayName: string;
  university: string;
  howDidYouHearAboutUs: string;
}