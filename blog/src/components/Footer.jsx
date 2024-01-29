import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

function FooterComponent() {
  return (
    <Footer container className="container mx-auto">
      <Footer.Copyright href="#" by="Blog" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link as={"div"}>
          <Link to="/">Home</Link>
        </Footer.Link>
        <Footer.Link as={"div"}>
          <Link to="/create">Create</Link>
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default FooterComponent;
