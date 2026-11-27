# The Pack
Wolf-themed private messaging, voice and video calling, groups and push notifications.

The original repository and hosting URL remain unchanged to preserve existing installations.

## Current release
**33.0.0 — The Next Generation.** The release string is centralized in `pack-boot.js`. Startup shows the verified display name, best-effort device/browser information, and installed-web-app status. Device detection stays local; no telemetry is sent.

Notification worker column grants, notification routing and diagnostics, unique answer guard, call device selection and connection metrics are included in this release. WebRTC still uses STUN without a TURN relay.

Background read aloud is best effort while a page remains active. Rich notification previews are selected per device; private avatar links expire and disappearing message text is not included.

Custom chat wallpapers are stored locally per account and conversation. Pack Music shares official Spotify song and Jam invitations in private messages; playback and synchronization are handled by Spotify, not by The Pack.

Pack Radio uses the official iHeartRadio live station widget. Private two-person rooms share a station selection, not an audio stream. Playback, ads, and live delays are controlled by the provider.

Desktop layout uses a three-pane messaging workspace, collapsible group settings, wide-screen Den and admin navigation, and keyboard shortcuts. Mobile navigation is retained.

Pack World: private two-person 3D rooms with persistent decoration, movement, optional distance-gated WebRTC voice, shared pixel art, tic-tac-toe, pet activities and couple questions. The Fun Hub has device-local arcade games, a card creator and a celebration planner. Feed surprises notify via the existing push service at publication time; older surprises are not retroactively sent. WebGL, device audio and real two-device performance require testing.

Fixing Bella: notification preparation separates browser permission from subscription, with a repair flow, local display test, subscription serialization fallback, bounded worker/key requests and stage-specific diagnostic errors. Samsung Internet installed-app delivery requires device testing. The installed app identity and existing push endpoint keys are unchanged.

Optional verified email notifications and reply-by-email for direct messages. See EMAIL-SETUP.md for provider credentials, domain and webhook setup. No email delivery until configured and opted in.

Steady Connection adds caller-led ICE restart signaling, bounded recovery attempts, independent call event polling, adaptive video bitrate, device replacement guards and a manual reconnect button. Both devices need this release for recovery. Calls still use STUN only; restrictive networks may need TURN. Physical device tests remain necessary.

## Version 33
New responsive chat UI, inbox filters, pins, nicknames, local drafts, folder names, recent previews, online strip, unified direct-message search, accent and accessibility settings, call readiness and picture-in-picture fallback, grouped notification center, admin metrics and announcements, feedback, My Pack Studio with shared events/media timeline and AES-GCM local journal. Existing modules and database data retained. Group calls, TURN relay infrastructure, E2EE chat, alternative push provider, advanced 3D/game redesigns are not implemented. Browser and two-device testing remains required. Vault, preferences and drafts are local; vault is encrypted, drafts/preferences are not. Do not lose your vault passphrase.

Silent send: ordinary direct-message composer may suppress web push, email enqueue and the updated client's in-app audio/toast. Both clients need 33; unread counts still update. Voice commands, scheduled messages and media room invitations remain normal sends.
