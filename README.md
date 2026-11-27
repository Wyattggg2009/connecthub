# The Pack
Wolf-themed private messaging, voice and video calling, groups and push notifications.

The original repository and hosting URL remain unchanged to preserve existing installations.

## Current release
**25.0.0 — Voice & Rich Alerts.** The release string is centralized in `pack-boot.js`. Startup shows the verified display name, best-effort device/browser information, and installed-web-app status. Device detection stays local; no telemetry is sent.

Notification worker column grants, notification routing and diagnostics, unique answer guard, call device selection and connection metrics are included in this release. WebRTC still uses STUN without a TURN relay.

Background read aloud is best effort while a page remains active. Rich notification previews are selected per device; private avatar links expire and disappearing message text is not included.
