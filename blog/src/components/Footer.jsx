import { Footer } from "flowbite-react";

function FooterComponent() {
  return (
    <Footer container className="container mx-auto">
      <Footer.Copyright href="#" by="Blog" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Home</Footer.Link>
        <Footer.Link href="#">Create</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default FooterComponent;
