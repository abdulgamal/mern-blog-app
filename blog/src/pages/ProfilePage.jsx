import { Avatar, Button, FileInput, Label, TextInput } from "flowbite-react";

function ProfilePage() {
  return (
    <div className="container mx-auto px-3 flex flex-col justify-center items-center min-h-[85vh]">
      <h2 className="text-center text-2xl text-gray-500 font-semibold">
        Profile Page
      </h2>
      <div className="my-4">
        <Label
          htmlFor="file"
          className=" max-w-fit"
          value={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
              size={"xl"}
              bordered
            />
          }
        />
        <FileInput id="file" className="hidden" />
      </div>
      <div className="my-2 max-w-lg w-full">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput id="username" type="text" required />
        </div>
      </div>
      <div className="my-2 max-w-lg w-full">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" type="password" required />
        </div>
      </div>
      <div className="my-2 max-w-lg w-full">
        <Button className="w-full" outline gradientDuoTone="cyanToBlue">
          Save
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
