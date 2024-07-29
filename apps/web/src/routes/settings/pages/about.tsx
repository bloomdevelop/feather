import { Flex } from "~/components/ui/flex";

export default function AboutPage() {
  return (
    <>
      <h1 class="text-4xl font-bold">Feather</h1>
      <h3 class="text-2xl">Version: 0.2.0</h3>
      <h1 class="text-3xl font-bold">Acknowledgements</h1>
      <p>This client wouldn't be possible without these libraries:</p>
      <Flex justifyContent="start" alignItems="center" class="gap-2">
        <h1 class="text-xl font-bold">Solid-js</h1>
        <p>By solidjs</p>
      </Flex>
      <Flex justifyContent="start" alignItems="center" class="gap-2">
        <h1 class="text-xl font-bold">Revolt.js</h1>
        <p>By insertfish, modified by bloomdevelop</p>
      </Flex>
      <Flex justifyContent="start" alignItems="center" class="gap-2">
        <h1 class="text-xl font-bold">solid-ui {"(reusable components)"}</h1>
        <p>By sek-consulting</p>
      </Flex>
      <Flex justifyContent="start" alignItems="center" class="gap-2">
        <h1 class="text-xl font-bold">@kobalte/core</h1>
        <p>By kobaltedev</p>
      </Flex>
      <Flex justifyContent="start" alignItems="center" class="gap-2">
        <h1 class="text-xl font-bold">@corvu/drawer</h1>
        <p>By corvudev</p>
      </Flex>
    </>
  );
}
