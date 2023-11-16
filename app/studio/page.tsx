import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { MainNav } from "@/components/main-nav";
import { HowItWorks } from "@/components/how-it-works";

export const metadata: Metadata = {
  title: "Arttribute Studio",
  description:
    "AI enabled Co-creation | Collaboratively produce unique art for Strorytelling, Games, Fashion, and more, with the help of AI",
};

export default function StudioPage() {
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
                Arttribute Studio
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
            <div className="col-span-7 justify-self-center block w-[570px] -mt-4">
              <h1 className="text-5xl font-bold">AI enabled Co-creation</h1>
              <p className="text-xl mt-4">
                Collaboratively produce unique art for Strorytelling, Games,
                Fashion, and more, with the help of AI
              </p>
              <div className="ml-auto flex items-center space-x-10 mt-6">
                <Button>Start Creating</Button>
              </div>
            </div>
            <div className="col-span-5 justify-self-start">
              <div className="m-4 ">
                <Image
                  src={"/floatstudio.png"}
                  alt={"hero"}
                  width={480}
                  height={480}
                  className="animate-float m-7 mt-24"
                />
              </div>
            </div>
          </div>
          <div className="items-center justify-center  lg:border-t  border-dashed mt-16 p-10">
            <h2 className="text-2xl font-bold text-center mt-8"></h2>
          </div>
        </div>
      </div>
    </>
  );
}
