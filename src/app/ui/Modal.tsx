import LoadingIcon from "./LoadingIcon";

export default function Modal({ text }: { text: string }) {
  return (
    <div className="absolute cursor-not-allowed flex items-center justify-center top-0 min-w-[100%] min-h-[100%] bg-slate-500 bg-opacity-30">
      <span className="text-2xl  flex bg-slate-600 bg-opacity-100 w-64 rounded-xl text-center items-center justify-center h-24">
        <LoadingIcon />
        {text}
      </span>
    </div>
  );
}
