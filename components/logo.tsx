import Link from "next/link";

interface LogoProps {
  variant?: "coloured" | "black" | "grayed";
  text: string;
}
export function Logo({ text, variant }: LogoProps) {
  return (
    <Link
      href="/"
      className=" ml-2 text-xl transition-colors hover:text-primary font-bold"
    >
      <div className="flex">
        {variant === "grayed"
          ? grayedLogo
          : variant === "black"
          ? blackLogo
          : colouredLogo}
        <div className="ml-1">{text}</div>
      </div>
    </Link>
  );
}

const colouredLogo = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.1191 3.20123L27.1486 9.66137L16.5918 16.5942L4.85327 9.66137L16.1191 3.20123Z"
      fill="#F74581"
    />
    <path
      d="M4.85327 9.66138L16.5918 16.5942V28.6479L5.01084 22.1877L4.85327 9.66138Z"
      fill="#813380"
    />
    <path
      d="M16.5918 16.5942L27.1486 9.66138V22.109L16.5918 28.5691V16.5942Z"
      fill="#1A237E"
    />
    <path
      d="M4.85716 9.92495L4.85326 9.66133L5.01082 9.74011L16.6707 28.4905L16.5918 28.6478L16.476 28.5874L4.85716 9.92495Z"
      fill="#F74581"
    />
  </svg>
);

const blackLogo = (
  <svg
    width="24"
    height="26"
    viewBox="0 0 24 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.1069 0.201233L23.1364 6.66137L12.5796 13.5942L0.841064 6.66137L12.1069 0.201233Z"
      fill="#575757"
    />
    <path
      d="M0.841064 6.66138L12.5796 13.5942V25.6479L0.998629 19.1877L0.841064 6.66138Z"
      fill="#232323"
    />
    <path
      d="M12.5796 13.5942L23.1364 6.66138V19.109L12.5796 25.5691V13.5942Z"
      fill="black"
    />
    <path
      d="M0.844983 6.92495L0.841079 6.66133L0.998642 6.74011L12.6585 25.4905L12.5796 25.6478L12.4638 25.5874L0.844983 6.92495Z"
      fill="#575757"
    />
  </svg>
);

const grayedLogo = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 23 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.613 0.201233L22.6425 6.66137L12.0857 13.5942L0.347168 6.66137L11.613 0.201233Z"
      fill="white"
    />
    <path
      d="M0.347168 6.66138L12.0857 13.5942V25.6479L0.504732 19.1877L0.347168 6.66138Z"
      fill="#DDDDDD"
    />
    <path
      d="M12.0857 13.5942L22.6425 6.66138V19.109L12.0857 25.5691V13.5942Z"
      fill="#A2A2A2"
    />
    <path
      d="M0.351056 6.92495L0.347152 6.66133L0.504715 6.74011L12.1646 25.4905L12.0857 25.6478L11.9699 25.5874L0.351056 6.92495Z"
      fill="white"
    />
  </svg>
);
