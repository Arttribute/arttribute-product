import { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { MainNav } from "@/components/main-nav";
import { HowItWorks } from "@/components/how-it-works";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transaparent use of art in the realm of genereative AI",
};

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="flex flex-col md:flex">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white">
          <div className="border-b">
            <div className="flex h-16 items-center lg:px-40">
              <Logo text="Arttribute" />
              <div className="ml-auto items-center justify-center">
                <MainNav className="hidden lg:flex mx-6" />
              </div>

              <div className="ml-auto flex items-center space-x-4">
                <div className="hidden lg:flex">
                  <Button>Start Creating</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-10 lg:border-l mt-16">
          <div className="grid lg:grid-cols-12 items-center justify-center  ">
            <div className=" lg:col-span-7 justify-self-end block w-[570px] -mt-4">
              <h1 className=" text-center text-5xl font-bold mt-24 lg:text-left lg:text-6xl  lg:mt-0">
                The AI Art Protocol
              </h1>
              <p className=" text-center mt-4 text-md lg:text-left text-xl m-2">
                Arttribute enables fair and transaparent use of art in the realm
                of genereative AI
              </p>
            </div>
            <div className="hidden lg:block col-span-5 justify-self-center">
              <div className="m-4 ">
                <Image
                  src={"/arttribute.png"}
                  alt={"hero"}
                  width={400}
                  height={400}
                  className="animate-float m-7 mt-24 z-0"
                />
              </div>
              <div
                className="absolute top-80 right-80 "
                style={{
                  boxShadow:
                    "0 0 120px 20px #f8bbd0, 0 0 260px 140px #fff59d, 0 0 200px 160px #0ff, 0 0 200px 120px #ff4081",
                  zIndex: -1,
                }}
              ></div>
            </div>
          </div>
          <div className="m-6"></div>
          <HowItWorks />
          <div className="items-center justify-center  lg:border-t  border-dashed mt-16 p-10">
            <h2 className="text-2xl font-bold text-center mt-8"></h2>
          </div>
        </div>
      </div>
    </>
  );
}
