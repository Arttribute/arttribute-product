import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Sparkles, Puzzle } from "lucide-react";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transaparent use of art in the realm of genereative AI",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-10 lg:border-l">
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
                AI enabled Games
              </h1>
              <p className="text-center text-sm mt-4  lg:text-left  lg:text-xl ">
                Explore the world of AI enabled games and create your own
              </p>
              <div className="text-center m-2 lg:text-left lg:mt-6 lg:m-0  ">
                <Link href="#play" passHref>
                  <Button className="px-12 mr-2">Play </Button>
                </Link>
                <Link href="/private-beta" passHref>
                  <Button variant="outline">Start Creating</Button>
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
          <div className="items-center justify-center  lg:border-t  border-dashed mt-16 p-10">
            <h2 className="text-4xl font-bold text-center mt-6">Play</h2>
            <div className="grid lg:grid-cols-12 mt-12 gap-4">
              <div className="lg:col-span-4 rounded-md border border-gray-300 shawdow-lg hover:shadow-xl rounded-xl">
                <div className="p-4 ">
                  <Image
                    src={"/games/promptles-game.png"}
                    alt={"hero"}
                    width={400}
                    height={400}
                    className="border border-purple-300 rounded-lg object-cover aspect-[4/3]"
                  />
                </div>

                <div className="m-4 mt-0">
                  <h3 className=" font-bold mb-2">Promptles</h3>
                  <p className=" text-sm mb-2">
                    Guess the prompt that generated the image for a spot on an
                    onchain leaderboard
                  </p>
                  <Link
                    href="https://promptles.arttribute.io/"
                    target="_blank"
                    passHref
                  >
                    <Button variant="outline" className="mt-4">
                      <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Play Promptles
                      </p>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 rounded-md  border border-gray-300 shawdow-lg hover:shadow-xl rounded-xl">
                <div className="p-4 ">
                  <Image
                    src={"/games/tarot-reading.png"}
                    alt={"hero"}
                    width={400}
                    height={400}
                    className="border border-purple-300 rounded-lg object-cover aspect-[4/3]"
                  />
                </div>

                <div className="m-4 mt-0">
                  <h3 className=" font-bold mb-2">AI Tarot</h3>
                  <p className=" text-sm mb-2">
                    Get AI generated tarot readings and explore the world of AI
                    enabled divination
                  </p>
                  <Link
                    href="https://tarot.arttribute.io/"
                    target="_blank"
                    passHref
                  >
                    <Button variant="outline" className="mt-4">
                      <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Play AI Tarot
                      </p>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 rounded-md  border border-gray-300 shawdow-lg hover:shadow-xl rounded-xl">
                <div className="p-4 ">
                  <Image
                    src={"/games/mosaics-game.png"}
                    alt={"hero"}
                    width={400}
                    height={400}
                    className="border border-purple-300 rounded-lg object-cover aspect-[4/3]"
                  />
                </div>

                <div className="m-4 mt-0">
                  <h3 className=" font-bold mb-2">Mosaics</h3>
                  <p className=" text-sm mb-2">
                    Solve AI generated puzzles, compete on onchain leaderboards
                    and earn NFTs
                  </p>
                  <Link
                    href="https://mosaics.arttribute.io/"
                    target="_blank"
                    passHref
                  >
                    <Button variant="outline" className="mt-4">
                      <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Play Mosaics
                      </p>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-20 flex flex-col items-center justify-center">
              <h3 className="text-3xl font-bold text-center mt-6">
                More coming soon...
              </h3>
              <p className="text text-gray-500 text-center mt-4">
                Join our discord to stay updated
              </p>
              <Link
                href="https://discord.gg/SUqUn5XhkP"
                target="_blank"
                passHref
              >
                <Button className="mt-4">Join Discord</Button>
              </Link>
            </div>
            <div className="p-10"></div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
