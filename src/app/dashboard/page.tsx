import ItemList from "../ui/itemlist";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center ">
      <span className="text-3xl pb-16">Hvad har jeg i fryseren :)</span>
      <ItemList></ItemList>
    </div>
  );
}
