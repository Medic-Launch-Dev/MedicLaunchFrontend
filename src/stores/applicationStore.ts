import { makeAutoObservable } from "mobx";

export class ApplicationStore {
  errorMessage = "";
  shouldNavigateConfirm = false;

  constructor() {
    makeAutoObservable(this);
  }

  setShouldNavigateConfirm(shouldNavigateConfirm: boolean) {
    this.shouldNavigateConfirm = shouldNavigateConfirm;
  }

  setError(message) {
    console.error(message);
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = "";
  }
}

const applicationStore = new ApplicationStore();
export default applicationStore;
