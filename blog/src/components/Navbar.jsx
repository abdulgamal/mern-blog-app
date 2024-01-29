import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

function NavComponent() {
  return (
    <Navbar fluid rounded className="container mx-auto">
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Blog
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Link to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          <Link to="/sign-in">
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Link>
        </Dropdown>
        {/* <Button>Get started</Button> */}
        <Navbar.Toggle className="ml-2" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/create">Create</Link>
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavComponent;
