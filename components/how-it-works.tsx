import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, Circle, Dot } from "lucide-react";

const steps = [
  {
    text: "🎨 Artists upload artwork with terms",
    gradient: "from-indigo-50 via-purple-50 to-amber-0",
  },
  {
    text: "🙏 User Requests to use artwork",
    gradient: "from-white via-purple-50 to-pink-50",
  },
  {
    text: "🤝 User makes an attribution & supports artist",
    gradient: "from-white via-purple-50 to-pink-50",
  },
  {
    text: "🔎 Arttribute checks for a valid attribution",
    gradient: "from-blue-50 via-pink-50 to-white",
  },
  {
    text: "✅ Approve or deny the request to use the artwork",
    gradient: "from-white via-indigo-50 to-pink-50",
  },
];

const ArrowStep = ({
  position,
  color,
}: {
  position: string;
  color: string;
}) => (
  <div
    className={`absolute ${position} w-4 h-6 bg-white rounded-full flex items-center justify-center`}
  >
    <ArrowDown size={24} className={`text-${color}`} />
  </div>
);

export function HowItWorks({}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="grid grid-cols-12 -ml-2">
      <div className="flex col-span-1 my-6">
        <div className="relative flex flex-col items-center w-8 h-full">
          <div className="absolute w-0.5 h-full bg-gradient-to-b from-violet-600 to-pink-500 rounded-full"></div>
          <ArrowStep position="top-0" color="violet-600" />
          <ArrowStep position="top-1/4" color="violet-600" />
          <ArrowStep position="top-1/2" color="purple-500" />
          <ArrowStep position="top-3/4" color="pink-500" />
          <div className="absolute bottom-0 w-4 h-6 bg-white rounded-full flex items-center justify-center">
            <Dot size={24} className="text-pink-600" />
          </div>
        </div>
      </div>
      <div className="col-span-11">
        {steps.map((step, index) => (
          <Card
            key={index}
            className={`col-span-1 mt-4 mb-5 mr-4 rounded-2xl bg-gradient-to-r ${step.gradient}`}
          >
            <CardHeader>
              <h2 className="text-base font-medium">{step.text}</h2>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
