export default function Navitem({
  title,
  destination,
}: {
  title: string;
  destination: string;
}) {
  return (
    <a
      href={destination}
      className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
    >
      {title}
    </a>
  );
}
