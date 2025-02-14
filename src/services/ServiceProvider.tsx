import React, { useContext } from 'react';
import { AccountStore } from '../stores/accountStore';
import { ApplicationStore } from '../stores/applicationStore';
import { FlashCardStore } from '../stores/flashCardStore';
import { NotesStore } from '../stores/notesStore';
import { NotificationsStore } from '../stores/notificationsStore';
import { PaymentStore } from '../stores/paymentStore';
import { PracticeStore } from '../stores/practiceStore';
import { QuestionsStore } from '../stores/questionsStore';
import { TextbookLessonStore } from '../stores/textbookLessonStore';
import { UserStore } from '../stores/userStore';
import AxiosProvider from './AxiosProvider';
import MedicLaunchApiClient from './MedicLaunchApiClient';

interface ServiceProviderContextValues {
  practiceStore: PracticeStore;
  questionsStore: QuestionsStore;
  paymentStore: PaymentStore;
  flashCardStore: FlashCardStore;
  userStore: UserStore;
  applicationStore: ApplicationStore;
  accountStore: AccountStore;
  notesStore: NotesStore;
  notificationsStore: NotificationsStore;
  textbookLessonStore: TextbookLessonStore;
}

export const ServiceProviderContext = React.createContext<ServiceProviderContextValues | null>(null);
export const ServiceProviderConsumer = ServiceProviderContext.Consumer;

export const ServiceProvider = ({ children }) => {
  const applicationStore = new ApplicationStore();
  const axiosProvider = new AxiosProvider();
  const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider, applicationStore);
  const practiceStore = new PracticeStore(medicLaunchApiClient);
  const questionsStore = new QuestionsStore(medicLaunchApiClient);
  const paymentStore = new PaymentStore(medicLaunchApiClient);
  const flashCardStore = new FlashCardStore(medicLaunchApiClient);
  const userStore = new UserStore(medicLaunchApiClient);
  const accountStore = new AccountStore(medicLaunchApiClient);
  const notesStore = new NotesStore(medicLaunchApiClient);
  const notificationsStore = new NotificationsStore(medicLaunchApiClient);
  const textbookLessonStore = new TextbookLessonStore(medicLaunchApiClient);

  return (
    <ServiceProviderContext.Provider value={{
      practiceStore,
      questionsStore,
      paymentStore,
      flashCardStore,
      userStore,
      applicationStore,
      accountStore,
      notesStore,
      notificationsStore,
      textbookLessonStore
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
