import { Avatar, Button, Label, Textarea } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  deleteBlogComment,
  deleteBlogData,
  fetchBlog,
  fetchBlogComments,
} from "../../requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { formatDateDifference } from "../utils/formatDate";

function Details() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const notify = (msg) => toast(msg);

  const fetchDetails = async (val) => {
    try {
      const { data } = await fetchBlog(val);
      setBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (val) => {
    try {
      const { data } = await fetchBlogComments(val);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      let newObj = { blogId: id, comment };
      const { status } = await createComment(newObj);
      if (status == 200) {
        setComment("");
        setRefresh("post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (val) => {
    try {
      const { status } = await deleteBlogComment(val);
      if (status == 200) {
        setRefresh("comment");
      }
    } catch ({ response }) {
      notify(response?.data?.message);
    }
  };

  const deleteBlog = async (val) => {
    try {
      const { status } = await deleteBlogData(val);
      if (status == 200) {
        navigate("/");
      }
    } catch ({ response }) {
      notify(response?.data?.message);
    }
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  useEffect(() => {
    fetchComments(id);
  }, [id, refresh]);

  return (
    <div className="container mx-auto">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        </div>
      ) : (
        <>
          <div className="h-[50vh] my-4">
            <img
              src={blog?.blog_image}
              alt="detail image"
              className="h-full w-full object-cover md:rounded-lg"
            />
          </div>
          <div className=" md:w-9/12 mx-auto px-3">
            <h2 className="text-2xl font-bold">{blog?.title}</h2>
            <div
              className=" text-gray-500 tracking-wider my-2"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
            <div className="flex my-4 items-center space-x-3 justify-between">
              <div className="flex items-center space-x-2">
                <Avatar
                  alt="User profile"
                  img={blog?.userId?.profile_image}
                  rounded
                />
                <div>
                  <p className="text-gray-500 font-semibold">
                    {blog?.userId?.username}
                  </p>
                  <p className="text-gray-500 font-semibold text-[10px]">
                    {formatDateDifference(blog?.createdAt)}
                  </p>
                </div>
              </div>
              {user?._id == blog?.userId?._id && (
                <>
                  <div className="flex items-center space-x-2">
                    <Button color="gray">
                      <Link to={`/update/${blog?._id}`}>Edit</Link>
                    </Button>
                    <Button
                      color="failure"
                      onClick={() => deleteBlog(blog?._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className=" md:w-9/12 mx-auto px-4">
            {user ? (
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Leave a comment" />
                </div>
                <Textarea
                  id="comment"
                  placeholder="Type a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                />
                <Button
                  disabled={comment.length < 4}
                  onClick={postComment}
                  outline
                  gradientDuoTone="cyanToBlue"
                  className="mt-3"
                >
                  Send
                </Button>
              </div>
            ) : (
              <Button outline gradientDuoTone="cyanToBlue" className="mt-3">
                <Link to="/sign-in">Login to leave a comment</Link>
              </Button>
            )}
          </div>
          <div className="my-3 md:w-9/12 mx-auto px-3">
            {comments.map((comment) => (
              <div
                key={comment?._id}
                className="flex flex-row space-x-3 mb-3 border border-gray-100 rounded-lg items-start p-3"
              >
                <Avatar
                  alt="User profile"
                  img={comment?.userId?.profile_image}
                  rounded
                />
                <div>
                  <p className="text-xs text-gray-500">
                    {comment?.userId?.username}
                  </p>
                  <p className="text-xs">{comment?.comment}</p>
                  <div className="my-2 flex flex-row space-x-3">
                    <div className="flex flex-row space-x-0.5 items-center">
                      <CiHeart />
                      <span className="text-xs text-gray-500">
                        {comment?.numOfLikes}
                      </span>
                    </div>
                    {user?._id == comment?.userId?._id && (
                      <Button
                        color="failure"
                        pill
                        size={"xs"}
                        onClick={() => deleteComment(comment?._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
