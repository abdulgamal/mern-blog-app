import { Avatar, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDateDifference } from "../utils/formatDate";

function Banner({ blog }) {
  return (
    <div className="container mx-auto my-2 md:h-[70vh] h-screen">
      <div className="grid md:grid-cols-2 gap-3 h-full">
        <div className="h-full overflow-hidden">
          <img
            src={blog?.blog_image}
            alt="article image"
            className="w-full object-cover md:rounded-lg h-full"
          />
        </div>
        <div className="flex flex-col justify-center p-4">
          <h2 className="font-semibold tracking-wider text-gray-500 mb-2">
            Featured Article
          </h2>
          <h1 className="text-xl">{blog?.title}</h1>
          <div
            className="font-semibold text-sm text-gray-500 my-3 tracking-wider"
            dangerouslySetInnerHTML={{
              __html:
                blog?.content.length > 700
                  ? blog?.content?.slice(0, 700) + "..."
                  : blog?.content,
            }}
          />
          <div className="flex justify-between items-center">
            <div className="flex mt-2 items-center space-x-2">
              <Avatar
                alt="User profile"
                img={blog?.userId?.profile_image}
                rounded
              />
              <div>
                <p className="text-gray-700">{blog?.userId?.username}</p>
                <p className="text-xs text-gray-500 font-semibold">
                  {formatDateDifference(blog?.createdAt)}
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
