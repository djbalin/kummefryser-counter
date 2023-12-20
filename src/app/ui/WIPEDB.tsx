"use client";

export default function WipeDB({
  wipeDBAndRefresh,
}: {
  wipeDBAndRefresh(): Promise<void>;
}) {
  async function handleClick() {
    console.log("WIPING :)");

    await wipeDBAndRefresh();
  }
  return (
    <button
      onClick={(e) => handleClick()}
      className="border-4 items-center justify-center px-4 flex my-4 rounded-md border-purple-500 border-opacity-70"
    >
      RESTART DB
    </button>
  );
}
