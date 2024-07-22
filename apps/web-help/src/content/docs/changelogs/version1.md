---
title: Version 0.1.0
description: First release of Feather client.
---

:::caution[Alpha Version]
This version is unstable and it's not complete, even some features are not implemented yet. So make sure to suggest or report bugs in the [GitHub repository](https://github.com/bloomdevelop/feather/issues).
:::

## What's new

- This is the first release of Feather client but, also the initial work in a new monorepo.
- Feather uses `solid-ui` for UI/UX while using Solid.js for framework.
- Compact mode has been added but it's not complete yet.
- Developer mode has been added, useful for debugging and making new components. Not intended for production.
- Currently we're modifying revolt.js, a official client library for [Revolt.chat](https://revolt.chat), so we can expose and get the `X-Session-Token` header (needed for some api functions) to get it working properly.

## Features

- Light and Dark mode.
- Ability to switch between servers.
- Able to login with [your revolt.chat](https://revolt.chat) account
- Able to see/send messages

:::caution[Notice]
Note that the messages isn't dynamic in a specific scenario, that's mean when you send a message it doesn't appear your messages at this moment. But we will find a ways to fix it.

Also there's missing features for like attachments, replies and more, which it will be added later on.
:::
