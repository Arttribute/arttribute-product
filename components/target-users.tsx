import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TargetUsers() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Card className="col-span-1 m-2 p-1">
          <CardHeader>
            <h2 className="text-2xl font-semibold ">👩🏽‍🎨 For Artists</h2>
          </CardHeader>
          <CardContent>
            <div className="m-2">
              <h4 className="text-lg font-semibold mb-4 ">
                🔑 Control how your art is used
              </h4>
              <div className="border-l p-2">
                <p className="text-sm mb-4 ml-2 text-gray-600">
                  Upload your artwork and set your terms. Each of your artwork
                  is uniquely marked to track its usage and ensure you get the
                  credit you deserve.
                </p>
              </div>
            </div>
            <Link href="/private-beta" passHref>
              <Button variant="outline" className="mt-4">
                <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Protect your Art
                </p>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-1 m-2">
          <CardHeader>
            <h2 className="text-2xl font-semibold ">👨🏾‍💻 For Builders</h2>
          </CardHeader>
          <CardContent>
            <div className="m-2">
              <h4 className="text-lg font-semibold mb-4">
                ⚒️ Build trust into your AI applications
              </h4>
              <div className="border-l p-2">
                <p className="text-sm mb-4 ml-2 text-gray-600">
                  Enforce ethics in your generative AI applications. Our API
                  handles attribution and licensing checks so you can focus on
                  building.
                </p>
              </div>
            </div>
            <Link href="/private-beta" passHref>
              <Button variant="outline" className="mt-4">
                <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Build with Arttribute
                </p>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-1 m-2">
          <CardHeader>
            <h2 className="text-2xl font-semibold">🙋🏽 For AI Art lovers</h2>
          </CardHeader>
          <CardContent>
            <div className="m-2">
              <h4 className="text-lg font-semibold mb-4">
                🫡 Use art responsibly
              </h4>
              <div className="border-l p-2">
                <p className="text-sm mb-4 ml-2 text-gray-600">
                  Access art from verified artists, perfect for AI remixing for
                  fashion, games storytelling, and more. Every artwork comes
                  with clear specified terms.
                </p>
              </div>
            </div>
            <Link href="/private-beta" passHref>
              <Button variant="outline" className="mt-4">
                <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Discover and use Art
                </p>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
