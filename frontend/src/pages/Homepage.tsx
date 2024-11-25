import { useEffect, useState } from "react";
import { categories } from "../data";
import Listingcard from "../components/Listingcard";
import { fetchListings } from "../lib/api-client";
import { ListingSchemaTypes } from "../../../backend/src/models/listingsModel";

const Homepage = () => {
  const [listings, setListings] = useState<ListingSchemaTypes | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchListings(selectedCategory);
        setListings(data.listings);
      } catch (error: unknown) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <main className="max-w-screen-2xl mx-auto">
      <div className="overflow-x-scroll lg:hide-scrollbar  lg:mx-0 md:flex justify-center mb-7 sm:ml-10">
        <div className="flex gap-8 ">
          {categories.map((item) => (
            <>
              <div
                key={item.label}
                className={`flex flex-col items-center py-4 text-center rounded-xl gap-1 cursor-pointer ${item.label === selectedCategory && " text-[#FF5A5F] "}`}
                onClick={() => setSelectedCategory(item.label)}
              >
                <item.icon />
                <p className="whitespace-nowrap">{item.label}</p>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  mx-2 ">
        {listings.length <= 0 ? (
          <h1 className="text-center">No Listings found</h1>
        ) : (
          listings.map((listing) => <Listingcard listing={listing} />)
        )}
      </div>
    </main>
  );
};

export default Homepage;
