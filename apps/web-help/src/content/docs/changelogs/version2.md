---
title: Version 0.2.0
description: Second release of Feather client.
---

:::caution[Alpha Version]
This version is unstable and it's not complete, even some features are not implemented yet. So make sure to suggest or report bugs in the [GitHub repository](https://github.com/bloomdevelop/feather/issues).
:::

## What's new

- Sheets now has headers with `title` props.
- Added acknowledgements in about section on settings.
- Added loading indicator
- Improved member list and labels.
- Added `ComposeComponents` with new permission system whenever you have "Send Messages" permission.
- Added markdown support for `MessageProvider`, currently we didn't support any plugins created by Revolt yet.
- New font, uses Inter for sans font and JetBrains Mono for monospace font.

## Bug Fixes

- Fixed a issue where the channel tries to check if it's undefined while it's always returning true.
