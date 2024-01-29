// import Banner from "./components/Banner";
// import Blogs from "./components/Blogs";
import FooterComponent from "./components/Footer";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
// import Details from "./pages/Details";

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* <Banner /> */}
      {/* <Blogs /> */}
      {/* <Details /> */}
      <CreatePage />
      <FooterComponent />
    </main>
  );
}

export default App;
