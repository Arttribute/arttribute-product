import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import MainMenu from "./main-menu";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center lg:px-40">
        <Logo text="Arttribute" />
        <div className="ml-auto items-center justify-center">
          <MainMenu className="hidden lg:flex mx-6" />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden lg:flex">
            <Link href="/private-beta" passHref>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
