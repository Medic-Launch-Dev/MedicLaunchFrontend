import React, { useContext } from 'react';
import { FlashCardStore } from '../stores/flashCardStore';
import { PaymentStore } from '../stores/paymentStore';
import { PracticeStore } from '../stores/practiceStore';
import { QuestionsStore } from '../stores/questionsStore';
import AxiosProvider from './AxiosProvider';
import MedicLaunchApiClient from './MedicLaunchApiClient';
import { UserStore } from '../stores/userStore';


interface ServiceProvderContextValues {
    practiceStore: PracticeStore;
    questionsStore: QuestionsStore;
    paymentStore: PaymentStore;
    flashCardStore: FlashCardStore;
    userStore: UserStore;
}

export const ServiceProviderContext = React.createContext<ServiceProvderContextValues | null>(null);
export const ServiceProviderConsumer = ServiceProviderContext.Consumer;

export const ServiceProvider = ({ children }) => {
    const axiosProvider = new AxiosProvider();
    const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
    const practiceStore = new PracticeStore(medicLaunchApiClient);
    const questionsStore = new QuestionsStore(medicLaunchApiClient);
    const paymentStore = new PaymentStore(medicLaunchApiClient);
    const flashCardStore = new FlashCardStore(medicLaunchApiClient);
    const userStore = new UserStore(medicLaunchApiClient);

    return (
        <ServiceProviderContext.Provider value={{ practiceStore, questionsStore, paymentStore, flashCardStore, userStore }}>
            {children}
        </ServiceProviderContext.Provider>
    )
}

export const useServiceProvider = () => {
    const context = useContext(ServiceProviderContext);

    if (!context) {
        throw new Error("useServiceProvider must be used within ServiceProvider");
    }

    return context;
}