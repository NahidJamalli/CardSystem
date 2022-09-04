import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Outlet />
    </ProtectedRoute>
  );
}

export default App;
