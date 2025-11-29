import ProductList from "@/components/ProductList";
import Hero from "@/components/Hero";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <Hero/>
      </div>
      <ProductList category={category} params="homepage"/>
    </div>
  );
};

export default Homepage;
