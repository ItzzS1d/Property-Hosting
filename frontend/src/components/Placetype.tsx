import { categories } from "../data";

interface Placetype {
  setPlaceType: (value: string) => void;
  placeType: string;
  border?: boolean;
}

const Placetype = ({ setPlaceType, placeType, border }: Placetype) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 ">
      {categories.map((item, i) => (
        <>
          <div
            key={i}
            className={`${border ? "border-2 " : ""} flex flex-col items-center py-4 text-center rounded-xl gap-1 cursor-pointer ${item.label === placeType && "bg-[#FF5A5F] text-white border-[#FF5A5F]"}`}
            onClick={() => setPlaceType(item.label)}
          >
            <item.icon />
            <p>{item.label}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Placetype;
