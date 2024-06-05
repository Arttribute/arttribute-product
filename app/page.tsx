import { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { HowItWorks } from "@/components/how-it-works";

import Link from "next/link";
import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import TargetUsers from "@/components/target-users";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transaparent use of art in the realm of genereative AI",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />

      <div className="p-16">
        <TargetUsers />

        <div className="items-center justify-center  lg:border-t  border-dashed mt-12 p-4"></div>
        <div className="flex justify-center p-6">
          <h3 className="text-3xl font-semibold">How it works</h3>
        </div>

        <div className="grid grid-cols-12 lg:p-6">
          <div className="col-span-12 lg:col-span-6 lg:pr-6">
            <Card className="lg:m-4 shadow-md p-4  mb-4">
              <CardContent className="p-7">
                <h2 className="text-2xl font-bold ">
                  {" "}
                  Automatic Attributions{" "}
                </h2>
                <p className="text-base text-gray-600">
                  Arttribute is centerd around attributions, ensuring that
                  artists get proper credit when their work is used in AI by
                  automatically appending attribution details to AI-generated
                  content.
                </p>
              </CardContent>
            </Card>
            <Card className="lg:m-4 shadow-md border-purple-300 lg:p-4 rounded-xl">
              <CardContent className="p-4">
                <div className="lg:flex items-center justify-center">
                  <Image
                    src={
                      "/licenses/png/arrtibute-exlusive-noncommercial-license.png"
                    }
                    width={120}
                    height={100}
                    alt="Arttribute Licensing"
                    className="m-2 p-2"
                  />
                  <div className="m-2 p-2">
                    <h2 className="text-xl font-bold ">
                      Simple Code enforced licenses
                    </h2>
                    <p className="text-base text-gray-500">
                      Inspired by Creative Commons, Arttribute provides simple
                      code-enforceable licenses for granting AI usage
                      permissions for your work.
                    </p>
                  </div>
                </div>
                <Link href="/private-beta" passHref>
                  <Button variant="outline" className="m-2 mb-0 ">
                    <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      Learn more
                    </p>
                    <ChevronRight className="h-4 w-4 text-purple-500" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-6 ">
            <HowItWorks />
          </div>
        </div>
      </div>
      <br />
      <br />

      <Footer />
    </>
  );
}
