import Link from "next/link";
import {
  DiscordLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Logo } from "./logo";

export default function Footer() {
  const links = [
    {
      title: "Product",
      items: [
        { href: "/games", text: "Games" },
        { href: "https://studio.arttribute.io/", text: "Arttribute Studio" },
        { href: "https://artifacts.arttribute.io/", text: "Artifacts" },
      ],
    },
    {
      title: "Company",
      items: [
        { href: "/", text: "About" },
        { href: "https://github.com/Arttribute", text: "Github" },
        { href: "https://docs.arttribute.io/", text: "Documentation" },
      ],
    },
    {
      title: "Legal",
      items: [
        { href: "/", text: "Terms of Service" },
        { href: "/", text: "Privacy Policy" },
        { href: "/licenses", text: "Arttribute Licenses" },
      ],
    },
  ];

  const socialLinks = [
    {
      href: "https://discord.gg/SUqUn5XhkP",
      icon: <DiscordLogoIcon className="h-6 w-6 m-2" />,
    },
    {
      href: "https://x.com/arttribute_io",
      icon: <TwitterLogoIcon className="h-6 w-6 m-2" />,
    },
    {
      href: "https://www.instagram.com/arttribute.io/",
      icon: <InstagramLogoIcon className="h-6 w-6 m-2" />,
    },
    {
      href: "https://www.linkedin.com/company/arttribute-labs/",
      icon: <LinkedInLogoIcon className="h-6 w-6 m-2" />,
    },
  ];

  return (
    <div className="border-t p-16">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <Logo variant="coloured" text="Arttribute" />
          <p className="text-gray-500 ml-1">hello@arttribute.io</p>
        </div>

        {links.map((linkGroup, index) => (
          <div key={index} className="col-span-6 lg:col-span-2 m-2">
            <h3 className="font-semibold text-gray-700 mb-2">
              {linkGroup.title}
            </h3>
            <ul className="flex flex-col">
              {linkGroup.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="text-sm text-gray-600"
                    href={item.href}
                    target="_blank"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-12 lg:col-span-2">
          <div className="flex">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                className="text-gray-700"
                href={social.href}
                target="_blank"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
