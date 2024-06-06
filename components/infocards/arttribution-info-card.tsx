import { Card, CardContent } from "@/components/ui/card";
export default function ArttributionInfoCard() {
  return (
    <>
      <Card className="lg:m-4 p-4  mb-4 shadow-md hover:shadow-xl">
        <CardContent className="p-7">
          <h2 className="text-2xl font-bold "> Automatic Attributions </h2>
          <p className="text-base text-gray-600">
            Arttribute is centerd around attributions, ensuring that artists get
            proper credit when their work is used in AI by automatically
            appending attribution details to AI-generated content.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
