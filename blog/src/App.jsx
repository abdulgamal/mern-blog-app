import FooterComponent from "./components/Footer";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import Details from "./pages/Details";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="details/:id" element={<Details />} />
      </Routes>
      <FooterComponent />
    </main>
  );
}

export default App;
