import { PlanLookupKey } from "../models/Payment";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class PaymentStore {
    private apiClient: MedicLaunchApiClient;

    constructor(apiClient: MedicLaunchApiClient) {
        this.apiClient = apiClient;
    }

    async createCheckoutSession(planLookupKey: PlanLookupKey, endorselyReferral?: string) {
        return await this.apiClient.createCheckoutSession(planLookupKey, endorselyReferral);
    }

    async createBillingPortalSession() {
        return await this.apiClient.createBillingPortalSession();
    }

    async getPubishableKey() {
        return await this.apiClient.getPublishableKey();
    }
}