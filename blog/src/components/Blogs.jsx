import Card from "./Card";

function Blogs({ results }) {
  return (
    <div className="container mx-auto mt-5 px-3">
      <h2 className="font-semibold text-gray-600">Recent Posts</h2>
      <div className="my-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-1">
        {results.map((item) => (
          <Card key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
