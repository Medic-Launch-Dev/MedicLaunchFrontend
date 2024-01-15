import React, { useContext } from 'react';
import { PracticeStore } from '../stores/practiceStore';
import { QuestionsStore } from '../stores/questionsStore';
import AxiosProvider from './AxiosProvider';
import MedicLaunchApiClient from './MedicLaunchApiClient';


interface ServiceProvderContextValues {
    practiceStore: PracticeStore;
    questionsStore: QuestionsStore;
}

export const ServiceProviderContext = React.createContext<ServiceProvderContextValues | null>(null);
export const ServiceProviderConsumer = ServiceProviderContext.Consumer;

export const ServiceProvider = ({ children }) => {
    const axiosProvider = new AxiosProvider();
    const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
    const practiceStore = new PracticeStore();
    const questionsStore = new QuestionsStore(medicLaunchApiClient);

    return (
        <ServiceProviderContext.Provider value={{ practiceStore, questionsStore }}>
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