export interface TokenData {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface UserProfile {
  city?: string;
  email: string;
  firstName: string;
  graduationYear?: number;
  id?: string;
  lastName: string;
  phoneNumber?: string;
  questionsCompleted?: number;
  subscribeToPromotions: boolean;
  subscriptionMonths?: string;
  subscriptionPurchaseDate?: string;
  howDidYouHearAboutUs?: string;
  university?: string;
  isOnFreeTrial?: boolean;
  freeTrialDaysRemaining?: number | null;
  remainingTrialQuestions?: number;
  remainingTrialClinicalCases?: number;
  stripeSubscriptionStatus?: string;
}

export interface MedicLaunchUser extends UserProfile {
  password: string;
}