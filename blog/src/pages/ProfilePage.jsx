import { Avatar, Button, FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../utils/uploadImage";
import ProgressBar from "@ramonak/react-progress-bar";
import { updateUser } from "../../requests";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../features/users/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user, loading } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user?.username || "");
  const [url, setUrl] = useState(
    user?.profile_image ||
      "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
  );
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (msg) => toast(msg);

  const handleUpdate = async () => {
    const newObj = { username: name, password, profile_image: url };
    dispatch(fetchStart());

    try {
      const { data } = await updateUser(newObj);
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(fetchError("Something went wrong!"));
      notify("Something went wrong!");
    }
  };

  useEffect(() => {
    if (!file) return;
    uploadImage(file, setUrl, setProgress);
  }, [file]);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

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
              img={url}
              rounded
              size={"xl"}
              bordered
            />
          }
        />
        <FileInput
          id="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      {progress > 0 && (
        <div className="my-2">
          <ProgressBar completed={progress} />
        </div>
      )}
      <div className="my-2 max-w-lg w-full">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="my-2 max-w-lg w-full">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="my-2 max-w-lg w-full">
        <Button
          className="w-full"
          outline
          gradientDuoTone="cyanToBlue"
          onClick={handleUpdate}
          disabled={loading}
        >
          Save
          {loading && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
