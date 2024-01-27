import { Avatar } from "flowbite-react";
import { dummyData } from "../../constants";

function Blogs() {
  return (
    <div className="container mx-auto mt-5 px-3">
      <h2 className="font-semibold text-gray-600">Recent Posts</h2>
      <div className="my-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-1">
        {dummyData.map((item) => (
          <div key={item.id} className="max-w-sm">
            <img
              src={item?.image}
              alt={item?.title}
              className="h-[300px] w-full object-cover rounded-md"
            />
            <h5 className="md:text-2xl text-xl font-bold tracking-tight text-gray-900 dark:text-white my-1">
              {item?.title.length > 20
                ? item?.title?.slice(0, 20) + "..."
                : item?.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item?.content.length > 80
                ? item?.content?.slice(0, 80) + "..."
                : item?.content}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex mt-2 items-center space-x-2">
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
                <div>
                  <p className="text-gray-700">Ali Marell</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs font-semibold">30/12/2024</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
