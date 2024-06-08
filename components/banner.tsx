import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <>
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-10 lg:border-l ">
          <div>
            <div className="absolute left-75 right-0 top-40 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gradient-to-r from-amber-500 via-lime-500 to-purple-500 opacity-20 blur-[50px]"></div>

            <div className="rounded-lg">
              <div className="flex item-center">
                <div className="m-2 ml-8 py-40 pl-4 lg:pl-20 lg:pr-8 mb-12">
                  <div className="font-bold text-5xl lg:text-6xl m-1 text-gray-900">
                    <h1>
                      Automating <br />
                      Fair Play in Gen AI
                    </h1>
                  </div>
                  <div className="text-lg mt-4 m-1 text-gray-800">
                    <p>
                      Arttribute facilitates art attribution and licensing in
                      generative AI
                    </p>
                  </div>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://artifacts.arttribute.io/artifacts/create"
                      target="_blank"
                    >
                      <Button className="m-1 font-medium p-6 rounded-lg px-12">
                        Share & Control your Art{" "}
                      </Button>
                    </Link>
                    <Link href="https://studio.arttribute.io/" target="_blank">
                      <Button
                        variant="outline"
                        className="hidden lg:flex m-1 font-medium p-6 rounded-lg opacity-90"
                      >
                        Create your own AI model{" "}
                        <Sparkles className="m-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block m-4">
                  <Image
                    src={"/arttribute.png"}
                    alt={"hero"}
                    width={400}
                    height={400}
                    className=" animate-float m-7 mt-24 z-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
