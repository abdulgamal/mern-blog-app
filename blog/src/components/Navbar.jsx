import { Avatar, Dropdown, Navbar } from "flowbite-react";

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
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        {/* <Button>Get started</Button> */}
        <Navbar.Toggle className="ml-2" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Create</Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavComponent;
