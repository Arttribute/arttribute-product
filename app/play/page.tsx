import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transaparent use of art in the realm of genereative AI",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <h1 className="text-4xl  font-bold">Play</h1>
      <Footer />
    </>
  );
}
