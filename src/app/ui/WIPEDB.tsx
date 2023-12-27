"use client";

export default function WipeDB({
  wipeDBAndRefresh,
}: {
  wipeDBAndRefresh(): Promise<void>;
}) {
  async function handleClick() {
    await wipeDBAndRefresh();
  }
  return (
    <button
      onClick={(e) => handleClick()}
      className="border-4 items-center h-16 w-auto justify-center px-4 flex my-4 rounded-md border-purple-500 border-opacity-70"
    >
      RESET DB
    </button>
  );
}
