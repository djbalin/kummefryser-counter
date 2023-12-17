import Link from "next/link";
import ItemList from "../ui/itemlist";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center ">
      <span className="text-3xl pb-16">Hvad har jeg i fryseren :)</span>
      <Link
        className="border-2 rounded-md border-red-500 border-opacity-40"
        href={"/dashboard/create"}
      >
        <button>aaaaaa</button>
      </Link>
      <ItemList></ItemList>
    </div>
  );
}
