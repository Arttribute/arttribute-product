import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HowItWorks({}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="items-center justify-center  lg:border-t  border-dashed mt-16 p-10">
      <h2 className="text-4xl font-bold text-center">How it works</h2>
      <div className="grid grid-cols-12 mt-10 gap-4">
        <div className="col-span-6 rounded-md border-2 border-dotted ">
          <h3 className="text-2xl font-bold text-center m-6">For Artisits</h3>
          <div className="m-10">
            <h4 className="text-xl font-bold mb-4">🖼️ Upload your Art</h4>
            <p className="text-md mb-2">
              Your canvas, your rules. Upload your artwork, set your own terms,
              and if you like, a price tag too.
            </p>
          </div>

          <div className="m-10">
            <h4 className="text-xl font-bold mb-4">🔑 Choose How It's Used</h4>
            <div className="border-l p-4">
              <b>Open Access</b>
              <p className="text-md mb-4 ml-2">
                Opt for open sharing and let your art inspire freely
              </p>
              <b>Permission-Based</b>
              <p className="text-md mb-4 ml-2">
                Want a say in who uses your art? You got it
              </p>
              <b>Monetize Your Art</b>
              <p className="text-md mb-4 ml-2">
                Set a price, and watch your art generate revenue
              </p>
              <b>Exclusive Access</b>
              <p className="text-md mb-4 ml-2">
                Approve who uses your art, and how. And get paid for it
              </p>
            </div>
            <Link href="/" passHref>
              <Button className="mt-10">Get Started</Button>
            </Link>
          </div>
        </div>
        <div className="col-span-6 rounded-md border-2 border-dotted ">
          <h3 className="text-2xl font-bold text-center m-6">
            AI Artisans & Collectors
          </h3>
          <div className="m-10">
            <h4 className="text-xl font-bold mb-4">
              🎨 Access a Diverse Art Library
            </h4>
            <p className="text-md mb-2">
              Explore an extensive collection of artworks. Each piece is a
              potential spark for your AI models{" "}
            </p>
          </div>
          <div className="m-10">
            <h4 className="text-xl font-bold mb-4">🫡 Use Art Responsibly</h4>
            <div className="border-l p-4">
              <b>Clear Terms</b>
              <p className="text-md mb-4 ml-2">
                Every artwork comes with clear specified license terms
              </p>
              <b>Fair Play, Fair Pay</b>
              <p className="text-md mb-4 ml-2">
                Every purchase is a direct nod of support to the artist
              </p>
              <b>Arttribute Certificates</b>
              <p className="text-md mb-4 ml-2">
                With each selection, you get a proof of proper attribution
              </p>
              <b>Seamless, Respectful Art Fusion</b>
              <p className="text-md mb-4 ml-2">
                From AI models to personal galleries, blend art with honor
              </p>
            </div>
            <Link href="/" passHref>
              <Button className="mt-10">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
