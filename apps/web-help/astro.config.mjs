import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightUtils({
          navLinks: {
            leading: { useSidebarLabelled: "leadingNavLinks" },
          },
        }),
        starlightLinksValidator(),
      ],
      title: "Help Center",
      tableOfContents: { minHeadingLevel: 1, maxHeadingLevel: 3 },
      credits: true,
      logo: {
        src: "./public/favicon.svg",
        alt: "Feather Icon",
      },
      customCss: [
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
        "@fontsource-variable/inter",
      ],
      social: {
        github: "https://github.com/withastro/starlight",
      },
      pagination: false,
      sidebar: [
        {
          label: "leadingNavLinks",
          items: [
            {
              label: "Changelogs",
              link: "changelogs/",
            },
            {
              label: "How to",
              link: "how-to/",
            },
          ],
        },
        {
          label: "Changelogs",
          autogenerate: {
            directory: "changelogs",
          },
        },
        {
          label: "How to",
          autogenerate: {
            directory: "how-to",
          },
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
