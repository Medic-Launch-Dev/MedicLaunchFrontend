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
  hasActiveSubscription?: boolean;
  id?: string;
  lastName: string;
  phoneNumber?: string;
  questionsCompleted?: number;
  subscribeToPromotions: boolean;
  subscriptionMonths?: string;
  subscriptionPurchaseDate?: string;
  howDidYouHearAboutUs?: string;
  university?: string;
  isSubscribed?: boolean;
  isOnFreeTrial?: boolean;
  freeTrialDaysRemaining?: number | null;
}

export interface MedicLaunchUser extends UserProfile {
  password: string;
}