import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transparent use of art in the realm of generative AI",
};

const licenses = [
  {
    src: "/licenses/png/open-commercial-color.png",
    alt: "Arttribute Open License",
    title: "Arttribute Open License",
    description:
      "This license permits the use of art in AI-driven creative processes where the resultant output can be distributed or modified as long as an attribution to the original creator of the art is provided. The license allows for commercial use of the resultant output.",
  },
  {
    src: "/licenses/png/exclusive-color.png",
    alt: "Arttribute Exclusive License",
    title: "Arttribute Exclusive License",
    description:
      "This license permits the use of art exclusively by any agreed number of parties in AI-driven creative processes. The resultant output can be distributed or modified, including for commercial purposes, as long as an attribution to the original creator of the art is provided.",
  },
  {
    src: "/licenses/png/non-commercial-color.png",
    alt: "Arttribute Non-commercial License",
    title: "Arttribute Non-commercial License",
    description:
      "This license permits the use of art in AI-driven creative processes where the resultant output can be distributed or modified for non-commercial purposes only, as long as an attribution to the original creator of the art is provided.",
  },
  {
    src: "/licenses/png/exlusive-noncommercial-color.png",
    alt: "Arttribute Exclusive Non-commercial License",
    title: "Arttribute Exclusive Non-commercial License",
    description:
      "This license permits the use of art exclusively by any agreed number of parties in AI-driven creative processes. The resultant output can be distributed or modified for non-commercial purposes only, as long as an attribution is provided.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="absolute left-78 right-0 top-40 -z-10 m-auto h-[250px] w-[310px] rounded-full bg-gradient-to-r from-amber-500 via-lime-500 to-purple-500 opacity-20 blur-[50px]"></div>
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-10 lg:border-l">
          <div className="p-8">
            <div className="flex items-center">
              <div className="m-2 ml-8 py-24 pl-4 lg:pl-20 lg:pr-8 mb-12">
                <h1 className="text-6xl font-bold">Arttribute Licenses</h1>
                <div className="text-lg mt-4 m-1 text-gray-800">
                  <p>
                    Simple code-enforceable licenses for art in AI-driven
                    creative processes
                  </p>
                </div>
              </div>
              <div className="hidden py-16 px-10 lg:block m-4">
                <Image
                  src="/licenses/png/arttribute-license-color.png"
                  alt="hero"
                  width={160}
                  height={160}
                  className="animate-float z-0"
                />
              </div>
            </div>
            <div className="p-4">
              <Card className="m-3 border rounded-xl shadow-md ">
                <CardContent className="p-10">
                  <h2 className="text-2xl font-semibold">
                    Share your work with control
                  </h2>
                  <p className="text-base text-gray-500 mt-2">
                    Inspired by Creative Commons, Arttribute licenses are
                    designed to provide a simple standard way to grant
                    permissions for the use of your work in AI-driven creative
                    processes - ensuring that you are always credited for your
                    work. There are four types of licenses:
                  </p>
                  <Link
                    href="https://artifacts.arttribute.io/artifacts/create"
                    target="_blank"
                  >
                    <Button variant="outline" className="mt-4 mb-0 ">
                      <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Choose how your work can be used
                      </p>
                      <ChevronRight className="h-4 w-4 text-purple-500" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <div className="border-l border-dashed px-12 py-8 ml-16">
                {licenses.map((license, index) => (
                  <Card
                    key={index}
                    className="m-4 border-purple-300 rounded-xl shadow-md hover:shadow-xl"
                  >
                    <CardContent className="p-8">
                      <div className="lg:flex items-center justify-center">
                        <Image
                          src={license.src}
                          width={
                            license.src ===
                            "/licenses/png/exlusive-noncommercial-color.png"
                              ? 200
                              : 120
                          }
                          height={90}
                          alt={license.alt}
                          className="m-2 p-2"
                        />
                        <div className="m-2 p-2 ">
                          <h2 className="text-xl font-bold">{license.title}</h2>
                          <p className="text-base text-gray-500">
                            {license.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="m-3 border rounded-xl shadow-md ">
                <CardContent className="p-10">
                  <h2 className="text-xl font-semibold">
                    These are not just symbols, they are code-enforceable
                  </h2>
                  <p className="text-base text-gray-500 mt-2">
                    Arttribute provides tools for developers to enforce these
                    licenses in their AI applications. Our reverse search
                    capabilities allow for mapping artwork to its license,
                    creator, and usage, ensuring compliance and proper
                    attribution.
                  </p>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://artifacts.arttribute.io/artifacts/create"
                      target="_blank"
                    >
                      <Button variant="outline" className="mt-4 mb-0 ">
                        <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                          Control how your work is used
                        </p>
                      </Button>
                    </Link>
                    <Link
                      href="https://docs.arttribute.io"
                      target="_blank"
                      className="ml-auto"
                    >
                      <Button
                        variant="ghost"
                        className="mt-4 mb-0 ml-2 text-decoration-line"
                      >
                        <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent ">
                          Read the docs
                        </p>
                        <ChevronRight className="h-4 w-4 text-purple-500" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
