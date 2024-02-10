import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlogFn } from "../../requests";
import { toast } from "react-toastify";

function CreatePage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const notify = (msg) => toast(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newObj = {
      title,
      content,
      blog_image:
        "https://images.unsplash.com/photo-1681949215173-fe0d15c790c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwOHxhZXU2ckwtajZld3x8ZW58MHx8fHx8",
    };

    try {
      const results = await createBlogFn(newObj);
      console.log(results);
    } catch ({ response }) {
      notify(response.data);
    }
  };

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
            <TextInput
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
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
              value={content}
              onChange={setContent}
            />
          </div>
          <Button
            type="submit"
            outline
            gradientDuoTone="cyanToBlue"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;
