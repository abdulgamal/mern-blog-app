import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <Link to={`/details/${item?._id}`} className="max-w-sm">
      <img
        src={item?.blog_image}
        alt={item?.title}
        className="h-[300px] w-full object-cover rounded-md"
      />
      <h5 className="md:text-2xl text-xl font-bold tracking-tight text-gray-900 dark:text-white my-1">
        {item?.title.length > 20
          ? item?.title?.slice(0, 20) + "..."
          : item?.title}
      </h5>
      <div
        className="font-normal text-gray-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{
          __html:
            item?.content.length > 80
              ? item?.content?.slice(0, 80) + "..."
              : item?.content,
        }}
      />
      <div className="flex justify-between items-center">
        <div className="flex mt-2 items-center space-x-2">
          <Avatar
            alt="User profile"
            img={item?.userId?.profile_image}
            rounded
          />
          <div>
            <p className="text-gray-700">{item?.userId?.username}</p>
          </div>
        </div>
        <p className="text-gray-500 text-xs font-semibold">
          {new Date(item?.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default Card;
