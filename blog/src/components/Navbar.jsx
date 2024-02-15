import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logOut } from "../features/users/userSlice";
import { persistor } from "../../app/store";
import { logOutUser } from "../../requests";

function NavComponent() {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await logOutUser();
    persistor.purge();
    dispatch(logOut());
  };

  return (
    <Navbar fluid rounded className="container mx-auto">
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Blog
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User"
                img={
                  user?.profile_image ||
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                }
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.username}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Link to="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button>
            <Link to="/sign-up">Get started</Link>
          </Button>
        )}

        <Navbar.Toggle className="ml-2" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={pathname == "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={pathname == "/create"} as={"div"}>
          <Link to="/create">Create</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavComponent;
