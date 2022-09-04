import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { useStore } from "./store";

const ProtectedRoute = ({ children }: any) => {
  const { userStore } = useStore();
  if (!userStore.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default observer(ProtectedRoute);
