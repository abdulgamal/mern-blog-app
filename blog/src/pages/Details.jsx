import { Avatar, Button, Label, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../../requests";
import { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchDetails = async (val) => {
    try {
      const { data } = await fetchBlog(val);
      setBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  return (
    <div className="container mx-auto">
      <div className="h-[50vh] my-4">
        <img
          src={blog?.blog_image}
          alt="detail image"
          className="h-full w-full object-cover md:rounded-lg"
        />
      </div>
      <div className=" md:w-9/12 mx-auto px-3">
        <h2 className="text-2xl font-bold">{blog?.title}</h2>
        <div
          className=" text-gray-500 tracking-wider my-2"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
        <div className="flex my-4 items-center space-x-3">
          <Avatar
            alt="User profile"
            img={blog?.userId?.profile_image}
            rounded
          />
          <p className="text-gray-500 font-semibold">
            {blog?.userId?.username} ,
          </p>
          <p className=" text-gray-500 font-semibold text-xs">
            {new Date(blog?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className=" md:w-9/12 mx-auto px-4">
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Leave a comment" />
          </div>
          <Textarea
            id="comment"
            placeholder="Type a comment..."
            required
            rows={4}
          />
          <Button outline gradientDuoTone="cyanToBlue" className="mt-3">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Details;
