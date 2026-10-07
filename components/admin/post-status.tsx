import { Badge } from "@/components/ui/surface";

/** Draft, Scheduled or Published, in the kit's status colors. */
export function PostStatusBadge({ status, publishedAt }: { status: "draft" | "published"; publishedAt: string | null }) {
  if (status === "draft") return <Badge tone="warning">Draft</Badge>;
  if (publishedAt && new Date(publishedAt) > new Date()) return <Badge tone="info">Scheduled</Badge>;
  return (
    <Badge tone="success" dot>
      Published
    </Badge>
  );
}
