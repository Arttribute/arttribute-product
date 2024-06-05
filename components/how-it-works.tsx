import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, Circle, Dot } from "lucide-react";

export function HowItWorks({}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="grid grid-cols-12 -ml-2">
      <div className="flex col-span-1 my-6">
        <div className="relative flex flex-col items-center w-8 h-full">
          <div className="absolute w-0.5 h-full bg-gradient-to-b from-violet-600  to-pink-500 rounded-full"></div>
          <div className="absolute top-0  w-4 h-10 bg-white rounded-full flex items-center justify-center">
            <ArrowDown size={24} className="text-violet-600" />
          </div>
          <div className="absolute top-1/4  w-4 h-6 bg-white rounded-full flex items-center justify-center">
            <ArrowDown size={24} className="text-violet-600" />
          </div>
          <div className="absolute top-1/2  w-4 h-6 bg-white rounded-full flex items-center justify-center">
            <ArrowDown size={24} className="text-purple-500" />
          </div>
          <div className="absolute top-3/4  w-4 h-6 bg-white rounded-full flex items-center justify-center">
            <ArrowDown size={24} className="text-pink-500" />
          </div>
          <div className="absolute bottom-0 w-4 h-6 bg-white rounded-full flex items-center justify-center">
            <Dot size={24} className="text-pink-600" />
          </div>
        </div>
      </div>

      <div className="col-span-11">
        <Card className="col-span-1 mt-4 mb-5 mr-4  rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-0">
          <CardHeader>
            <h2 className="text-base font-medium ">
              🎨 Artists upload artwork with terms
            </h2>
          </CardHeader>
        </Card>
        <Card className="col-span-1 mt-4 mb-5 mr-4 rounded-2xl bg-gradient-to-r from-white via-purple-50 to-pink-50 ">
          <CardHeader>
            <h2 className="text-base font-medium ">
              🙏 User Requests to use artwork
            </h2>
          </CardHeader>
        </Card>

        <Card className="col-span-1 mt-4 mb-5 mr-4 rounded-2xl bg-gradient-to-r from-white via-purple-50 to-pink-50 ">
          <CardHeader>
            <h2 className="text-base font-medium ">
              🤝 User makes an attribution & supports artist
            </h2>
          </CardHeader>
        </Card>

        <Card className="col-span-1 mt-4 mb-5 mr-4  rounded-2xl bg-gradient-to-r from-blue-50 via-pink-50 to-white">
          <CardHeader>
            <h2 className="text-base font-medium ">
              🔎 Arttribute checks for a valid attribution
            </h2>
          </CardHeader>
        </Card>
        <Card className="col-span-1 mt-4 mb-5 mr-4 rounded-2xl bg-gradient-to-r from-white via-indigo-50 to-pink-50">
          <CardHeader>
            <h2 className="text-base font-medium ">
              ✅ Approve or deny the request to use the artwork
            </h2>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
