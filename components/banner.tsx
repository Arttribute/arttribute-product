import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <>
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#9080800a_1px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_2px)] bg-[size:18px_28px]">
          <div className="absolute left-60 right-0 top-20 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gradient-to-r from-amber-500 to-purple-500 opacity-20 blur-[50px]"></div>
        </div>
        <div className="rounded-lg">
          <div className="flex item-cemnter justify-center text-center">
            <div className="m-2 py-32 ">
              <div className="font-bold text-6xl m-1 text-gray-900 ">
                <h1>Automating Fair Play in Gen AI</h1>
              </div>
              <div className="text-2xl mt-4 m-1 text-gray-800">
                <p>
                  Arttribute facilitates art attribution and licensing in
                  generative AI
                </p>
              </div>
              <div className="flex mt-4 justify-center text-center">
                <Button className="m-1 font-bold p-6 rounded-lg px-12">
                  Protect your art <Sparkles className="m-1 h-4 w-4" />
                </Button>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="m-1 font-bold p-6 rounded-lg opacity-90"
                  >
                    Create your own AI model
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
