import { Avatar, Button, Label, Textarea } from "flowbite-react";

function Details() {
  return (
    <div className="container mx-auto">
      <div className="h-[50vh] my-4">
        <img
          src="https://images.unsplash.com/photo-1681949215173-fe0d15c790c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwOHxhZXU2ckwtajZld3x8ZW58MHx8fHx8"
          alt="detail image"
          className="h-full w-full object-cover md:rounded-lg"
        />
      </div>
      <div className=" md:w-9/12 mx-auto px-3">
        <h2 className="text-2xl font-bold">
          Women in Tech: Breaking Barriers and Shaping the Future
        </h2>
        <p className=" text-gray-500 tracking-wider my-2">
          In recent years, the role of women in the field of technology has
          gained significant attention. While the tech industry has
          traditionally been male-dominated, there is a growing recognition of
          the importance of diversity and inclusion. Women are making remarkable
          strides in the tech world, breaking barriers, and shaping the future
          of technology.
        </p>
        <div className="flex my-4 items-center space-x-3">
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
          <p className="text-gray-500 font-semibold">Alexander Perra ,</p>
          <p className=" text-gray-500 font-semibold text-xs">
            30 December 2020
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
