import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useServiceProvider } from "../../services/ServiceProvider";

function NavigationHandler() {
  const location = useLocation();

  const { applicationStore } = useServiceProvider();

  useEffect(() => {
    if (applicationStore.errorMessage)
      applicationStore.clearError();

    if (location.pathname === "/practice-session" || location.pathname === "/review-session")
      applicationStore.setShouldNavigateConfirm(true);
    else applicationStore.setShouldNavigateConfirm(false);
  }, [location]);

  return <Outlet />;
}

export default observer(NavigationHandler);