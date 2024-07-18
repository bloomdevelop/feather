import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/ui/flex";

export default function NotFound() {
  return (
    <Flex
      flexDirection="col"
      justifyContent="center"
      alignItems="center"
      class="w-full h-screen gap-2"
    >
      <Flex justifyContent="center" alignItems="center" class="gap-2">
        <h1 class="text-4xl font-bold">404</h1>
        <p class="text-muted-foreground">Page not found</p>
      </Flex>
      <A href="/">
        <Button variant="outline">Go back Home</Button>
      </A>
    </Flex>
  );
}
