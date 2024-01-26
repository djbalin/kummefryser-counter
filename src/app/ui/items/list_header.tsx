export default function ListHeader() {
  return (
    // <div className="  items-center gap-x-8 justify-around">
    <div className="flex text-xl items-center px-2">
      <div className="flex firstColumn justify-center">Quantity</div>
      <div className="flex flex-col items-center secondColumn justify-center">
        Item
        <span className="lower">
          <i>Volume | Category</i>
        </span>
      </div>
      <div className="flex thirdColumn justify-center">Time left</div>
      {/* <div className="flex fatColumn justify-center">Date</div> */}
      <div className="flex flex-col justify-center fourthColumn items-center">
        <span>Expiration date</span>
        <span className="lower">Freeze date</span>
      </div>
      <div className="flex fifthColumn justify-center">Edit</div>
    </div>
  );
}
