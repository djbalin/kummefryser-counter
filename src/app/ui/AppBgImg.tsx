import Image from "next/image";
import bgImage from "@/app/public/freezer.webp";

export default function AppBgImg() {
  return (
    <Image
      src={bgImage}
      placeholder="blur"
      alt=""
      //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      fill
      // className="object-cover xl:object-contain mt-16"
      style={{
        // boxShadow: "20px  20px 20px 20px yellow inset",
        zIndex: -1,
      }}
    />
  );
}
