import { Flex } from "~/components/ui/flex";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { TbAlertCircle } from "solid-icons/tb";
import { Separator } from "~/components/ui/separator";

export default function dmsPage() {
  return (
    <Flex justifyContent="start" flexDirection="row" class="w-full h-full">
      <Flex
        class="max-w-72 w-full h-full gap-2 p-2 overflow-auto"
        flexDirection="col"
        justifyContent="start"
        alignItems="start"
      >
        <Alert>
          <TbAlertCircle />
          <AlertTitle>This page is a work in progress.</AlertTitle>
          <AlertDescription>Come back later!</AlertDescription>
        </Alert>
      </Flex>
      <Separator orientation="vertical" />
    </Flex>
  );
}
