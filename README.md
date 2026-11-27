# The Pack
Wolf-themed private messaging, voice and video calling, groups and push notifications.

The original repository and hosting URL remain unchanged to preserve existing installations.

## Current release
**27.0.0 — Pack Radio.** The release string is centralized in `pack-boot.js`. Startup shows the verified display name, best-effort device/browser information, and installed-web-app status. Device detection stays local; no telemetry is sent.

Notification worker column grants, notification routing and diagnostics, unique answer guard, call device selection and connection metrics are included in this release. WebRTC still uses STUN without a TURN relay.

Background read aloud is best effort while a page remains active. Rich notification previews are selected per device; private avatar links expire and disappearing message text is not included.

Custom chat wallpapers are stored locally per account and conversation. Pack Music shares official Spotify song and Jam invitations in private messages; playback and synchronization are handled by Spotify, not by The Pack.

Pack Radio uses the official iHeartRadio live station widget. Private two-person rooms share a station selection, not an audio stream. Playback, ads, and live delays are controlled by the provider.
