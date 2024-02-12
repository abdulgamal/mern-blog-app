import { Avatar, Button, Label, Textarea } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import {
  createComment,
  deleteBlogComment,
  fetchBlog,
  fetchBlogComments,
} from "../../requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Details() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState("");

  const notify = (msg) => toast(msg);

  const fetchDetails = async (val) => {
    try {
      const { data } = await fetchBlog(val);
      setBlog(data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  useEffect(() => {
    fetchComments(id);
  }, [id, refresh]);

  return (
    <div className="container mx-auto">
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
        <div className="flex my-4 items-center space-x-3">
          <Avatar
            alt="User profile"
            img={blog?.userId?.profile_image}
            rounded
          />
          <p className="text-gray-500 font-semibold">
            {blog?.userId?.username} ,
          </p>
          <p className=" text-gray-500 font-semibold text-xs">
            {new Date(blog?.createdAt).toLocaleDateString()}
          </p>
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
                <Button color="gray" pill size={"xs"}>
                  Edit
                </Button>
                <Button
                  color="failure"
                  pill
                  size={"xs"}
                  onClick={() => deleteComment(comment?._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
