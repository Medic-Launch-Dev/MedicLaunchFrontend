import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class PaymentStore {
    private apiClient: MedicLaunchApiClient;

    constructor(apiClient: MedicLaunchApiClient) {
        this.apiClient = apiClient;
    }

    async getPaymentIntent(planId: number) {
        return await this.apiClient.getPaymentClientSecret(planId);
    }

    async getPubishableKey() {
        return await this.apiClient.getPublishableKey();
    }
}