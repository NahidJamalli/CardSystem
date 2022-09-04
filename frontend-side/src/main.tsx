import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import Accounts from "./pages/Accounts";
import Cards from "./pages/Cards";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RootStore, { StoreProvider } from "./store";
import Transactions from "./pages/Transactions";

const store = new RootStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="cards" element={<Cards />} />
          <Route path="profile" element={<Profile />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);
