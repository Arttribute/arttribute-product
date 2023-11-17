import { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { MainNav } from "@/components/main-nav";
import { HowItWorks } from "@/components/how-it-works";

export const metadata: Metadata = {
  title: "Arttribute Studio",
  description:
    "AI enabled Co-creation | Collaboratively produce unique art for Strorytelling, Games, Fashion, and more, with the help of AI",
};

import Link from "next/link";

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
                  <Link href="/private-beta" passHref>
                    <Button>Start Creating</Button>
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
          <div className="grid lg:grid-cols-12 items-center justify-center  ">
            <div className="flex items-center justify-center -mt-12 lg:hidden">
              <div className="m-4 ">
                <Image
                  src={"/floatstudio.png"}
                  alt={"hero"}
                  width={300}
                  height={300}
                  className=" animate-float m-7 mt-24"
                />
              </div>
            </div>
            <div className="lg:col-span-7 justify-self-center block lg:w-[570px] ">
              <h1 className="text-center text-3xl font-bold -mt-2  lg:text-left lg:text-5xl lg:mt-0">
                AI enabled Co-creation
              </h1>
              <p className="text-center text-sm mt-4  lg:text-left  lg:text-xl ">
                Collaboratively produce unique art for Strorytelling, Games,
                Fashion, and more, with the help of AI
              </p>
              <div className="text-center m-2 lg:text-left lg:mt-6 lg:m-0  ">
                <Link href="/private-beta" passHref>
                  <Button>Start Creating</Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block col-span-5 justify-self-start">
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
          <div className="items-center justify-center  lg:border-t lg:border-r  border-dashed mt-16 p-10">
            <h2 className="text-4xl font-bold text-center mt-6">
              Simple, Collaborative, Transformative
            </h2>
            <div className="grid lg:grid-cols-12 mt-12 gap-4">
              <div className="lg:col-span-4 rounded-md  border-2 border-dotted">
                <h3 className="text-center text-2xl font-bold  m-8 mb-2">
                  Artists Inspire AI
                </h3>

                <div className="m-8 mt-4">
                  <p className="text-center text-md mb-2">
                    Fuel AI models with your unique art. It&apos;s like teaching
                    it your creative language!
                  </p>
                  <p className="text-center text-md mb-2">
                    Upload your art collections to train custom shareable AI
                    models that mirror your style
                  </p>
                </div>
              </div>
              <div className="lg:col-span-4 rounded-md border-2 border-dotted ">
                <h3 className="text-center text-2xl font-bold  m-8 mb-2">
                  Choose your Inspiration
                </h3>

                <div className="m-8 mt-4">
                  <p className="text-center text-md mb-2">
                    Explore a world of AI-models infused with styles from your
                    favorite artists
                  </p>
                  <p className="text-center text-md mb-2">
                    Pick the one that sparks your imagination!
                  </p>
                </div>
              </div>
              <div className="lg:col-span-4 rounded-md border-2 border-dotted ">
                <h3 className="text-center text-2xl font-bold  m-8 mb-2">
                  Collaborative Creation
                </h3>

                <div className="m-8 mt-4">
                  <p className="text-center text-md mb-2">
                    Together, merge ideas into stunning artwork that tells new
                    stories.
                  </p>
                  <p className="text-center text-md mb-2">
                    Use AI models fine tuned by artists to bring your artistic
                    vision to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
