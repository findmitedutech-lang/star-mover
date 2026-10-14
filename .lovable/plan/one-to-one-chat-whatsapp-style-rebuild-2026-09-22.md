# One-to-One Chat WhatsApp-Style Rebuild

## Scope
Patch only the one-to-one conversation experience and its two dedicated presentation pieces. Keep the chat list, group/community chats, calls, message delivery, uploads, notifications, routes, and all other pages unchanged.

## UI rebuild
- Replace the one-to-one header with a sticky FindMit-purple bar: back, avatar/name/presence, voice call, video call, and overflow controls.
- Make the conversation a full-height scrolling wallpaper surface with centered date pills and smooth message entry.
- Restyle sent bubbles in FindMit purple with white text and right tails; style received bubbles white with dark text, shadow, and left tails.
- Keep image, video, audio, file, reply, deleted-message, starred-message, and call-event rendering intact while matching the new bubble system.
- Rebuild the bottom composer as a white rounded text box containing emoji, auto-growing text, and attachment controls, plus a separate circular purple mic/send control.

## Interaction behavior
- Add press-and-hold message actions: Reply, Copy, Forward, Delete where allowed.
- Add horizontal swipe-to-reply with a visual drag threshold.
- Display pending, sent, delivered, and read receipt states using clock/single tick/double grey/double blue indicators.
- Add a mobile attachment sheet for Camera, Gallery, Document, Location, and Contact; reuse existing media uploads and send location/contact as structured chat messages supported by the one-to-one renderer.
- Preserve WhatsApp-style hold-to-record, slide-to-cancel, upward lock, pause/resume, and voice-note sending.
- Preserve typing presence and replies; add smooth auto-scroll only when the reader is near the bottom.
- Add a floating down button and unread badge when the reader has scrolled upward.
- Add upward loading for older messages while preserving scroll position.
- Expand image viewing to a full-screen viewer with download and forward actions.

## Technical details
- Extend the chat message type and rendering locally for location/contact without changing unrelated screens.
- Add paginated message fetching to the existing chat helper while keeping the current fetch API compatible for group chat.
- Use the existing shadcn controls and Framer Motion; do not replace existing data or call logic.
- Add semantic chat color tokens for FindMit purple, bubble text, wallpaper overlay, receipts, and destructive actions instead of hardcoded component colors.
- Verify the one-to-one conversation at mobile and desktop sizes, including composer growth, attachment sheet, message actions, scrolling, and build health.
