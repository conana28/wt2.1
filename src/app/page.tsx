import Container from "@/components/ui/container";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mt-2 mx-auto">
      <h1>Home Next.js + Tailwind CSS</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
