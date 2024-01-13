import React, { useContext } from 'react';
import { PracticeStore } from '../stores/practiceStore';


interface ServiceProvderContextValues {
    practiceStore: PracticeStore
}

export const ServiceProviderContext = React.createContext<ServiceProvderContextValues | null>(null);
export const ServiceProviderConsumer = ServiceProviderContext.Consumer;

export const ServiceProvider = ({ children }) => {
    const practiceStore = new PracticeStore();

    return (
        <ServiceProviderContext.Provider value={{ practiceStore }}>
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