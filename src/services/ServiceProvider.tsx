import React, { useContext } from 'react';
import { AccountStore } from '../stores/accountStore';
import { ErrorStore } from '../stores/errorStore';
import { FlashCardStore } from '../stores/flashCardStore';
import { NotesStore } from '../stores/notesStore';
import { PaymentStore } from '../stores/paymentStore';
import { PracticeStore } from '../stores/practiceStore';
import { QuestionsStore } from '../stores/questionsStore';
import { UserStore } from '../stores/userStore';
import AxiosProvider from './AxiosProvider';
import MedicLaunchApiClient from './MedicLaunchApiClient';

interface ServiceProviderContextValues {
  practiceStore: PracticeStore;
  questionsStore: QuestionsStore;
  paymentStore: PaymentStore;
  flashCardStore: FlashCardStore;
  userStore: UserStore;
  errorStore: ErrorStore;
  accountStore: AccountStore;
  notesStore: NotesStore;
}

export const ServiceProviderContext = React.createContext<ServiceProviderContextValues | null>(null);
export const ServiceProviderConsumer = ServiceProviderContext.Consumer;

export const ServiceProvider = ({ children }) => {
  const errorStore = new ErrorStore();
  const axiosProvider = new AxiosProvider();
  const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider, errorStore);
  const practiceStore = new PracticeStore(medicLaunchApiClient);
  const questionsStore = new QuestionsStore(medicLaunchApiClient);
  const paymentStore = new PaymentStore(medicLaunchApiClient);
  const flashCardStore = new FlashCardStore(medicLaunchApiClient);
  const userStore = new UserStore(medicLaunchApiClient);
  const accountStore = new AccountStore(medicLaunchApiClient);
  const notesStore = new NotesStore(medicLaunchApiClient);

  return (
    <ServiceProviderContext.Provider value={{
      practiceStore,
      questionsStore,
      paymentStore,
      flashCardStore,
      userStore,
      errorStore,
      accountStore,
      notesStore
    }}>
      {children}
    </ServiceProviderContext.Provider>
  );
}

export const useServiceProvider = () => {
  const context = useContext(ServiceProviderContext);

  if (!context) {
    throw new Error("useServiceProvider must be used within ServiceProvider");
  }

  return context;
}
