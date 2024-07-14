export interface TokenData {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface MedicLaunchUser {
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

export interface UserProfile {
  city: string;
  displayName: string;
  email: string;
  graduationYear: number;
  hasActiveSubscription: boolean;
  id: string;
  questionsCompleted: number;
  subscribeToPromotions: boolean;
  subscriptionMonths: string;
  subscriptionPurchaseDate: string;
  university: string;
}