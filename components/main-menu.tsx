import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function MainMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
        <MenubarMenu>
          <MenubarTrigger className="text-sm ">About</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {" "}
              <Link href="/" rel="noopener noreferrer" target="_blank">
                About Arttribute
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/licenses" rel="noopener noreferrer" target="_blank">
                {" "}
                Arttribute Licences
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm ">Artists</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {" "}
              <Link
                href="https://studio.arttribute.io/"
                rel="noopener noreferrer"
                target="blank"
              >
                Studio
              </Link>
            </MenubarItem>
            {/* <MenubarSeparator />
            <MenubarItem>
              <Link href="/" passHref>
                {" "}
                Arttribute Licences
              </Link>
            </MenubarItem> */}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm ">Builders</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link
                href="https://docs.arttribute.io/"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                Arttribute API
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              {" "}
              <Link href="/" rel="noopener noreferrer">
                Build with Arttribute
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-sm ">Games</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {" "}
              <Link href="/games" rel="noopener noreferrer" target="_blank">
                Play
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}
