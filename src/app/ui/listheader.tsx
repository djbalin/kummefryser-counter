export default function ListHeader() {
  return (
    // <div className="  items-center gap-x-8 justify-around">
    <div className="flex items-center px-2">
      <div className="flex minorColumn justify-center">Amount</div>
      <div className="flex majorColumn justify-center">Item</div>
      <div className="flex majorColumn justify-center">Use before</div>
      {/* <div className="flex majorColumn justify-center">Date</div> */}
      <div className="flex flex-col majorColumn items-center">
        <span>Expiration date</span>
        <span className="lower">Freeze date</span>
      </div>
      <div className="flex minorColumn justify-center">Edit</div>
    </div>
  );
}
