export interface TokenData {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface MedicLaunchUser {
  city: string;
  displayName: string;
  email: string;
  firstName: string;
  graduationYear: number;
  howDidYouHearAboutUs: string;
  lastName: string;
  password: string;
  university: string;
}

export interface UserProfile {
  city: string;
  displayName: string;
  email: string;
  firstName: string;
  graduationYear: number;
  hasActiveSubscription: boolean;
  id: string;
  lastName: string;
  phone: string;
  questionsCompleted: number;
  subscribeToPromotions: boolean;
  subscriptionMonths: string;
  subscriptionPurchaseDate: string;
  university: string;
}