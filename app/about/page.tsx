import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { MainNav } from "@/components/main-nav";
import { HowItWorks } from "@/components/how-it-works";

export const metadata: Metadata = {
  title: "About",
  description: "Example dashboard app built using the components.",
};

export default function AboutPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="flex flex-col md:flex">
        <div className="fixed top-0 left-0 right-0 ">
          <div className="border-b">
            <div className="flex h-16 items-center px-40">
              <Link
                href="/examples/dashboard"
                className="text-xl transition-colors hover:text-primary font-bold"
              >
                Arttribute
              </Link>

              <div className="ml-auto items-center justify-center">
                <MainNav className="mx-6" />
              </div>

              <div className="ml-auto flex items-center space-x-4">
                <Button>Start Creating</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-10 lg:border-l mt-16">
          <div className="grid grid-cols-12 items-center justify-center  ">
            <div className="col-span-6 justify-self-center block w-[400px] -mt-4">
              <h1 className="text-7xl font-bold">The AI Art Protocol</h1>
              <p className="text-lg m-2">
                Arttribute enables fair and transaparent use of art in the realm
                of genereative AI
              </p>
            </div>
            <div className="col-span-6 justify-self-center">
              <div className="m-4 ">
                <Image
                  src={"/arttribute.png"}
                  alt={"hero"}
                  width={460}
                  height={460}
                  className="animate-float m-7 mt-24"
                />
              </div>
              <div
                className="absolute top-80 right-80 "
                style={{
                  boxShadow:
                    "0 0 120px 20px #f8bbd0, 0 0 280px 160px #fff59d, 0 0 300px 220px #0ff, 0 0 200px 120px #ff4081",
                  zIndex: -1,
                }}
              ></div>
            </div>
          </div>
          <HowItWorks />
        </div>
      </div>
    </>
  );
}
