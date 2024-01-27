import Banner from "./components/Banner";
import Blogs from "./components/Blogs";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Banner />
      <Blogs />
    </main>
  );
}

export default App;
