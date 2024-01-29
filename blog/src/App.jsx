// import Banner from "./components/Banner";
// import Blogs from "./components/Blogs";
import FooterComponent from "./components/Footer";
import Navbar from "./components/Navbar";
// import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import CreatePage from "./pages/CreatePage";
// import ProfilePage from "./pages/ProfilePage";
// import Details from "./pages/Details";

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* <Banner /> */}
      {/* <Blogs /> */}
      {/* <Details /> */}
      {/* <CreatePage /> */}
      {/* <ProfilePage /> */}
      {/* <LoginPage /> */}
      <SignupPage />
      <FooterComponent />
    </main>
  );
}

export default App;
