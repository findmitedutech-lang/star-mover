# Restyle the POST section to match the reference

## Scope
- Change only the POST view inside Stories.
- Preserve the existing upload, live broadcast, classroom, category, and bottom-navigation behavior.
- Do not alter the Home or Live views, data flow, or server actions.

## Visual changes
- Use a pure-black full-height canvas with crisp white text.
- Add the compact Create heading and “Open to All” / “Official TV” section labels from the reference.
- Restyle the existing classroom controls as one solid blue card, keeping Whiteboard, Screen Share, and Start Class actions connected to their current behavior.
- Restyle the existing upload and live-broadcast controls as one solid deep-red FindMit TV Official card.
- Present existing category filters as outlined pills beneath the broadcast card.
- Keep the existing bottom Home / Live / Post navigation and its Back / Forward controls unchanged.

## Interaction preservation
- Keep all current click handlers and loading/disabled states.
- Keep current topic, description, caption, file upload, start-live, and start-class validation.
- Reveal the existing input controls within the redesigned cards only when their related action is selected.

## Verification
- Check the POST view at the current mobile size against the supplied reference.
- Confirm upload, live, classroom, and navigation controls remain reachable.
- Confirm the preview builds without errors.
