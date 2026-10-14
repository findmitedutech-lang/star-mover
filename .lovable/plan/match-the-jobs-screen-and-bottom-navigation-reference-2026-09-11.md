# Match the Jobs screen and bottom navigation reference

## What will change
- Remove the fixed top Back/Forward bar from the root layout so it disappears everywhere, including Jobs.
- Add circular green Back and Forward controls to the left and right edges of the existing bottom navigation on every signed-in page.
- Keep those controls out of the sign-in page, disable and fade them when browser history is unavailable, and preserve exact browser Back/Forward behavior.
- Restyle the existing bottom navigation to match the reference: dark floating pill, centered four app tabs, icon-above-label layout, coral active Jobs state, and green history buttons.
- Restyle only the existing Jobs page shell and FindMit Ghana introduction to match the reference: dark header, “My posts” action, large three-way pill tabs, yellow FindMit Ghana badge, edge-to-edge rounded image, overlaid title, supporting copy, and yellow trust badges.
- Preserve the current Find Jobs, Find Talent, FindMit Ghana content, forms, data, and navigation logic.

## Technical details
- Update the root layout to remove `TopHistoryNav`.
- Move history state and controls into `AppShell` so they render only after authentication and profile completion.
- Use existing app routes and TanStack links for the four main tabs.
- Add semantic navigation and Jobs-specific color/shadow tokens in the global design system; avoid hardcoded page colors.
- Adjust page bottom spacing so content remains visible above the taller floating navigation.
- Verify browser history states, tab switching, Jobs mobile rendering, and the latest build diagnostics.
