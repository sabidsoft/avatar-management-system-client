import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/loader/Loader";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import User from "./pages/user/User";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import DataDeletionInstructions from "./pages/dataDeletionInstructions/DataDeletionInstructions";
import Signup from "./pages/signup/Signup";
import AdminRoute from "./components/privateRoute/adminRoute/AdminRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminSignup from "./pages/adminSignup/AdminSignup";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin-signup" element={<AdminSignup />} />

        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/dashboard/users/:facebookId" element={<AdminRoute><User /></AdminRoute>} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/data-deletion-instructions" element={<DataDeletionInstructions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
