import { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { HowItWorks } from "@/components/how-it-works";

import Link from "next/link";
import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import TargetUsers from "@/components/target-users";
import ArttributionInfoCard from "@/components/infocards/arttribution-info-card";
import LicensesInfoCard from "@/components/infocards/licenses-info-card";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Arttribute | Fair and Transparent AI Art Usage",
  description:
    "Arttribute enables fair and transparent use of art in generative AI. It facilitates art attribution and licensing in generative AI.",
  keywords:
    "Arttribute, AI art, generative AI, fair use of art, transparent art use",
};
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="px-16">
        <div className="p-1">
          <TargetUsers />
        </div>

        <div className="items-center justify-center border-t border-dashed mt-12 lg:py-4 lg:mx-6"></div>
        <div className="flex justify-center p-6">
          <h3 className="text-3xl font-semibold">How it works</h3>
        </div>

        <div className="grid grid-cols-12 lg:p-6">
          <div className="col-span-12 lg:col-span-6 lg:pr-6">
            <ArttributionInfoCard />
            <LicensesInfoCard />
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
