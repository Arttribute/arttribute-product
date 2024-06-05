import { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/how-it-works";

import { NonCommercial } from "@/components/license-icons";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transaparent use of art in the realm of genereative AI",
};

export default function HomePage() {
  return (
    <>
      <Logo text="Arttribute" />
      <h1 className="text-4xl  font-bold">Licensing</h1>

      <h2 className="text-2xl font-bold mt-8">
        Arttribute Open License
        <NonCommercial width={50} height={50} />
      </h2>
      <p className="text-lg">
        This license permits the use of art in AI-driven creative processes
        where the resultant output can be distributed or modified as long as an
        attribution to the original creator of the art is provided. The license
        allows for commercial use of the resultant output.
      </p>
      <h2 className="text-2xl font-bold mt-8">Arttribute Exclusive License </h2>
      <p className="text-lg">
        This license permits the use of art exclusively by the licensee and any
        agreed number of co-exclusive licensees in AI-driven creative processes.
        The resultant output can be distributed or modified, including for
        commercial purposes, as long as an attribution to the original creator
        of the art is provided.
      </p>
      <h2 className="text-2xl font-bold mt-8">
        Arttribute Non-commercial License
      </h2>
      <p className="text-lg">
        This license permits the use of art in AI-driven creative processes
        where the resultant output can be distributed or modified for non
        commercial puroses only and as long as an attribution to the original
        creator of the art is provided.
      </p>
      <h2 className="text-2xl font-bold mt-8">
        Arttribute Exclusive Non-commercial License{" "}
      </h2>
      <p className="text-lg">
        This license permits the use of art exclusively by the licensee and any
        agreed number of co-exclusive licensees in AI-driven creative processes.
        The resultant output can be distributed or modified, including for
        commercial purposes, as long as an attribution to the original creator
        of the art is provided.
      </p>
    </>
  );
}
