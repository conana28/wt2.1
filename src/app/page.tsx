import Container from "@/components/ui/container";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      {/* <div className="space-y-10 pb-10"> */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
        <div>
          <h1>Home Next.js + Tailwind CSS</h1>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </div>
      </div>
      {/* </div> */}
    </Container>
  );
}
