// src/stores/ErrorStore.js
import { makeAutoObservable } from "mobx";

export class ErrorStore {
  errorMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  setError(message) {
    console.log("Error: ", message);
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = "";
  }
}

const errorStore = new ErrorStore();
export default errorStore;
