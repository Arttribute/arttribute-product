import { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { MainNav } from "@/components/main-nav";
import { HowItWorks } from "@/components/how-it-works";
import Link from "next/link";

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
        <div className="fixed top-0 left-0 right-0 z-10 bg-white">
          <div className="border-b">
            <div className="flex h-16 items-center lg:px-40">
              <Logo text="Arttribute Studio" />

              <div className="ml-auto items-center justify-center">
                <MainNav className="hidden lg:flex mx-6" />
              </div>

              <div className="ml-auto flex items-center space-x-4">
                <div className="hidden lg:flex">
                  <Link
                    href="https://f2ucuftdof4.typeform.com/to/Rj2S7Msh"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button>Join Private Beta</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-10 lg:border-l mt-16">
          <div className="grid lg:grid-cols-12 items-center justify-center ">
            <div className=" text-center col-span-12 mt-24">
              <h1 className="text-center text-3xl font-bold -mt-2 ">
                Join Our Private Beta
              </h1>

              <div className="m-4 , p-8 ">
                <p className="text-center text-lg  -mt-2 ">
                  We&apos;re delighted you&apos;re interested in joining the
                  exclusive Private Beta. <br /> If you&apos;d like to be a part
                  of our Private Beta, please click "Join private beta " to fill
                  out the form
                  <br />
                  and we&apos;ll get back to you soon!
                </p>
              </div>
            </div>
            <div className="text-center m-2 lg:col-span-12 justify-self-center block lg:w-[570px] lg:h-[300px]">
              <Link
                href="https://f2ucuftdof4.typeform.com/to/Rj2S7Msh"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button>Join Private Beta</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="items-center justify-center  lg:border-t  border-dashed mt-16 p-10"></div>
      </div>
    </>
  );
}
