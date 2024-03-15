import LoadingIcon from "./LoadingIcon";

export default function Modal({ text }: { text: string }) {
  return (
    <div className="fixed z-50 cursor-not-allowed flex items-center justify-center top-0 left-0 bottom-0 right-0  bg-slate-500 bg-opacity-30">
      <span className="text-2xl  flex bg-slate-600 bg-opacity-100 w-64 rounded-xl text-center items-center justify-center h-24">
        <LoadingIcon />
        {text}
      </span>
    </div>
  );
}
