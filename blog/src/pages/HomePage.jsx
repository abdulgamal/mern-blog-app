import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Blogs from "../components/Blogs";
import { fetchBlogs } from "../../requests";

function HomePage() {
  const [blogs, setBlogs] = useState([]);

  const handleFetch = async () => {
    try {
      const { data } = await fetchBlogs();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="container mx-auto">
      <Banner blog={blogs?.[0]} />
      <Blogs results={blogs} />
    </div>
  );
}

export default HomePage;
