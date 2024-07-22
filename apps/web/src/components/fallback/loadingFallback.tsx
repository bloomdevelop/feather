import { Flex } from "../ui/flex";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function loadingFallback() {
  return (
    <Flex
      flexDirection="col"
      justifyContent="start"
      alignItems="start"
      class="gap-2"
    >
      <div class="flex items-center space-x-4">
        <Skeleton height={48} circle />
        <div class="space-y-2">
          <Skeleton height={16} width={200} radius={5} />
          <Skeleton height={16} width={200} radius={5} />
        </div>
      </div>
      <Separator />
      <Skeleton height={48} radius={5} />
      <Skeleton height={48} radius={5} />
      <Skeleton height={48} radius={5} />
    </Flex>
  );
}
