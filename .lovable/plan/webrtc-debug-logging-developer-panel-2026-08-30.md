# WebRTC Debug Logging + Developer Panel

## What the prompt does (plain language)

That prompt asks for two things:

1. **Detailed logging everywhere WebRTC touches camera/mic** — in `src/lib/webrtc-media.ts` (getUserMedia), `src/components/live/LiveHost.tsx`, `src/components/live/LiveWatch.tsx`, and `src/components/chat/CallScreen.tsx`. Each step records: what was requested, success/failure, and the exact browser error (`NotAllowedError` = permission denied, `NotFoundError` = no camera/mic, `OverconstrainedError`, `NotReadableError` = device busy, etc.), with timestamps.
2. **A developer panel** — an on-screen overlay (e.g. a floating bug icon, toggled in Settings) that lists these events live, so on a phone/APK you can see exactly why the camera failed without needing a desktop console.

## Plan

1. **New `src/lib/webrtc-debug.ts`** — in-memory ring buffer (last ~200 entries) with `log(category, message, detail?)`, a tiny subscribe API so the panel updates live, and helpers `describeMediaError(err)` mapping DOMException names to plain explanations.
2. **Instrument media/signalling paths**:
   - `src/lib/webrtc-media.ts`: log permission requests, constraints used, success (with track settings), and every failure name/message.
   - `LiveHost.tsx` / `LiveWatch.tsx`: log peer connection state changes, ICE failures, offer/answer errors, track stop/replace.
   - `CallScreen.tsx`: log call signalling and media acquisition results.
3. **New `src/components/DebugPanel.tsx`** — collapsible floating panel showing timestamped entries, color-coded errors, a "Copy logs" button, and a "Clear" button. Hidden by default; enabled via a toggle in Settings (stored in localStorage) or `?debug=1` URL param.
4. **Mount the panel** in `src/routes/__root.tsx` so it's available on live/call screens.
5. **Settings toggle** — add "Developer debug panel" switch on the Settings page.

## Technical details

- No backend/schema changes; logs stay client-side in memory (nothing uploaded).
- Panel renders via a small store + React state; no new dependencies.
- Production-safe: panel only appears when explicitly enabled; logging itself is negligible overhead.
