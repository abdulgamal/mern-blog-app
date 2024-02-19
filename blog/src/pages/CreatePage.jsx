import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlogFn, fetchBlog, updateBlogData } from "../../requests";
import { toast } from "react-toastify";
import uploadImage from "../utils/uploadImage";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";

function CreatePage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const notify = (msg) => toast(msg);

  useQuery(["edit", id], () => fetchBlog(id), {
    enabled: !!id,
    onSuccess: (data) => {
      setTitle(data?.data?.title);
      setContent(data?.data?.content);
      setUrl(data?.data?.blog_image);
    },
  });

  const { mutate, loading } = useMutation((values) => createBlogFn(values), {
    onSuccess: () => {
      setTitle("");
      setProgress(0);
      setContent("");
      setUrl("");
      setFile("");
      queryClient.invalidateQueries("blogs");
      navigate("/");
    },
    onError: ({ response }) => {
      notify(response?.data);
    },
  });

  const { mutate: updateBlog, loading: load } = useMutation(
    (values) => {
      return updateBlogData(id, values);
    },
    {
      onSuccess: () => {
        setTitle("");
        setProgress(0);
        setContent("");
        setUrl("");
        setFile("");
        queryClient.invalidateQueries("blogs");
        navigate("/");
      },
      onError: ({ response }) => {
        notify(response.data);
      },
    }
  );

  const handleUpload = (e) => {
    e.preventDefault();
    uploadImage(file, setUrl, setProgress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newObj = {
      title,
      content,
      blog_image:
        url ||
        "https://images.unsplash.com/photo-1681949215173-fe0d15c790c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwOHxhZXU2ckwtajZld3x8ZW58MHx8fHx8",
    };
    mutate(newObj);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let newObj = {
      title,
      content,
      blog_image: url,
    };
    updateBlog(newObj);
  };

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-3 min-h-[85vh]">
      <h2 className="text-center text-2xl text-gray-500 font-semibold">
        {id ? "Update" : "Create"} a Blog
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
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <Button
              outline
              gradientDuoTone="cyanToBlue"
              disabled={loading}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
          {progress > 0 && (
            <div className="my-2">
              <ProgressBar completed={progress} />
            </div>
          )}
          {url && (
            <div className="h-[30vh] my-4">
              <img
                src={url}
                alt="detail image"
                className="h-full w-full object-cover md:rounded-lg"
              />
            </div>
          )}
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
          {id ? (
            <Button
              type="submit"
              outline
              gradientDuoTone="cyanToBlue"
              onClick={handleUpdate}
              disabled={load}
            >
              Update
            </Button>
          ) : (
            <Button
              type="submit"
              outline
              gradientDuoTone="cyanToBlue"
              onClick={handleSubmit}
              disabled={loading || !title || !content}
            >
              Post
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreatePage;
