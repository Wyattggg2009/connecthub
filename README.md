# The Pack
Wolf-themed private messaging, voice and video calling, groups and push notifications.

The original repository and hosting URL remain unchanged to preserve existing installations.

## Current release
**36.0.0 — Game Night.** The release string is centralized in `pack-boot.js`. Startup shows the verified display name, best-effort device/browser information, and installed-web-app status. Device detection stays local; no telemetry is sent.

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

## Version 34 — Pack Reach
Optional ntfy.sh backup alert channel: each member generates a secret random topic, subscribes in ntfy on their own device, enables categories and tests. No API key or domain; generic event types only, no names, message content, source identifiers or GPS. Public topics are capability secrets, not authenticated private topics. 35 jobs/user/24h and 180/project/24h, provider limits may apply. Cache disabled, offline delivery not guaranteed. Signed service-only worker, own-topic/history RLS; test throttle and topic revocation. Direct, group, incoming/possible missed calls, feed, optional personal/direct plan reminders, notices and sign-in sessions. Silent/disappearing/read direct messages excluded, no message replies from ntfy. Web push remains separate. Email still requires provider setup. Telegram/Discord/SMS/native call UI are not implemented. See notifications.html. No member enrolled automatically.

## Eclipse 35
Shared visual refresh, fixed two-member Our Den allowlist, mood/quiz/date/keepsake/challenge timeline, future unlock enforced by RLS, real Connect Four with invitation/turn validation, live admin phone lab, drawing attachments, custom animated emoji stickers, conversation stats, priority and keyword highlights, and account-synced ntfy quiet hours/snoozing. Phone lab uses actual same-origin session; no mobile OS simulation, camera/mic/location disabled. Existing data retained. Advanced calls, Telegram/Discord, full 3D city/vehicles and E2EE remain separate work. Quiet hours apply only to ntfy backup, not web push. User-interface testing and actual device delivery remain necessary.

## Version 36 — Game Night
Ten new saved, server-validated multiplayer games in `arena.html`: Dominion (territory conquest), Pack Estates (property economy and consensual trades), Checkers, Reversi, Gomoku, Mancala, Nim, Dots & Boxes, Hex, and Breakthrough. The two long-form games support 2–4 players; others support 2. Every accepted move persists in Supabase with a revision lock; only invited active, compatible members can read or mutate matches. All invitees must accept. The lobby supports resume, status filters, copyable private match links, move history (latest 60), and polling while visible. Existing Connect Four saves remain accessible at `connect-four.html`; tic-tac-toe stays in Den. Dominion and Pack Estates are original streamlined games, not official commercial adaptations. Both finish by round 30 or earlier victory; property credits have no monetary value. No automatic move reminders, chess, matchmaking, bots, or native offline sync. Actual phone/browser gameplay remains to be tested.
