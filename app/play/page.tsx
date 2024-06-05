import { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { MainNav } from "@/components/main-menu";
import { HowItWorks } from "@/components/how-it-works";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transaparent use of art in the realm of genereative AI",
};

export default function HomePage() {
  return (
    <>
      <Logo text="Arttribute" />
      <h1 className="text-4xl  font-bold">Play</h1>
    </>
  );
}
