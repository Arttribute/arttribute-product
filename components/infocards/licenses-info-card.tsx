import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function LicensesInfoCard() {
  return (
    <>
      <Card className="lg:m-4 shadow-md border-purple-300 lg:p-4 rounded-xl shadow-md hover:shadow-xl">
        <CardContent className="p-4">
          <div className="lg:flex items-center justify-center">
            <Image
              src={"/licenses/png/arttribute-license-color.png"}
              width={120}
              height={90}
              alt="Arttribute Licensing"
              className="m-2 p-2 "
            />
            <div className="m-2 p-2">
              <h2 className="text-xl font-bold ">
                Simple Code enforced licenses
              </h2>
              <p className="text-base text-gray-500">
                Inspired by Creative Commons, Arttribute provides simple
                code-enforceable licenses for granting AI usage permissions for
                your work.
              </p>
            </div>
          </div>
          <Link href="/licenses" passHref>
            <Button variant="outline" className="m-2 mb-0 ">
              <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Learn more
              </p>
              <ChevronRight className="h-4 w-4 text-purple-500" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
