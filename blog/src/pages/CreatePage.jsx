import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePage() {
  const [value, setValue] = useState("");

  return (
    <div className="container mx-auto px-3 min-h-[85vh]">
      <h2 className="text-center text-2xl text-gray-500 font-semibold">
        Create a Blog
      </h2>
      <div className="my-3">
        <form>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Your Title" />
            </div>
            <TextInput id="title" type="text" required />
          </div>
          <div id="fileUpload" className="flex space-x-3 items-center">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload Image" />
              </div>
              <FileInput
                id="file"
                helperText="An image is required for the blog"
              />
            </div>
            <Button outline gradientDuoTone="cyanToBlue">
              Upload
            </Button>
          </div>
          <div className="my-3">
            <div className="mb-2 block">
              <Label htmlFor="content" value="Content" />
            </div>
            <ReactQuill
              theme="snow"
              id="content"
              value={value}
              onChange={setValue}
            />
          </div>
          <Button type="submit" outline gradientDuoTone="cyanToBlue">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;
