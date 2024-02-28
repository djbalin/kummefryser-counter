export default function ListHeader() {
  return (
    <div className="flex flex-row justify-evenly text-center text-xl items-center px-2">
      <div className="hidden sm:flex sm:firstColumn sm:justify-center">
        Quantity
      </div>
      <div className="flex flex-col sm:items-center w-[70%] sm:secondColumn sm:justify-center">
        Item
        <span className="inline lower">Volume | Category</span>
      </div>
      <div className="sm:flex w-[30%] sm:thirdColumn sm:justify-center">
        Time left
      </div>
      <div className="hidden sm:flex sm:flex-col sm:justify-center sm:fourthColumn sm:items-center">
        <span>Expiration date</span>
        <span className="hidden sm:inline lower">Freeze date</span>
      </div>
      <div className="hidden sm:flex sm:fifthColumn sm:justify-center">
        Edit
      </div>
    </div>
  );
}
