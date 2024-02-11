import { Avatar, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function Banner({ blog }) {
  return (
    <div className="container mx-auto my-2 md:h-[70vh] h-screen">
      <div className="grid md:grid-cols-2 gap-3 h-full">
        <div className="h-full overflow-hidden">
          <img
            src={
              blog?.blog_image ||
              "https://plus.unsplash.com/premium_photo-1705056546306-ab28435c20c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D"
            }
            alt="article image"
            className="w-full object-cover md:rounded-lg h-full"
          />
        </div>
        <div className="flex flex-col justify-center p-4">
          <h2 className="font-semibold tracking-wider text-gray-500 mb-2">
            Featured Article
          </h2>
          <h1 className="text-xl">{blog?.title}</h1>
          <p className="font-semibold text-sm text-gray-500 my-3 tracking-wider">
            {blog?.content}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex mt-2 items-center space-x-2">
              <Avatar
                alt="User settings"
                img={blog?.userId?.profile_image}
                rounded
              />
              <div>
                <p className="text-gray-700">{blog?.userId?.username}</p>
                <p className="text-xs text-gray-500 font-semibold">
                  {new Date(blog?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Link to={`/details/${blog?._id}`}>
              <Button size={"xs"} outline gradientDuoTone="cyanToBlue">
                Read More
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
