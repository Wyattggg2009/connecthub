# The Pack
Wolf-themed private messaging, voice and video calling, groups and push notifications.

The original repository and hosting URL remain unchanged to preserve existing installations.

## Current release
**38.0.0 — Console Edition.** The release string is centralized in `pack-boot.js`. Startup shows the verified display name, best-effort device/browser information, and installed-web-app status. Device detection stays local; no telemetry is sent.

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


## Version 37 — Bella’s Bunny Kingdom
Open `bunny-kingdom.html` from Chats or Pack Arena. Free spins (12 per UTC day), three reward tiers, 15 village upgrades and saved account progress. No bets, purchases, transferable value or cash prizes. Server-generated spin results; duplicate request IDs are idempotent. Our Den members can explicitly opt into sharing their latest 100 game actions and progress with their existing partner. Sharing is off by default and can be revoked. Database tests used rolled-back transactions; no player test data was retained. Real browser sign-in and two-device tests remain necessary.

## Version 38 preparation — console compatibility
Open `console-check.html` directly on PS4 to check JavaScript syntax and browser capabilities. The report is local only. This is a diagnostic, not a PS4 compatibility release; actual hardware testing and feature-specific fallbacks are still required.


## Bunny Kingdom 37.5 — Moonlight Adventure
The existing game now has ten villages, five five-level buildings per village, 24 milestone cards across four sets, three companions with shared XP and bonus coins, shield defenses against NPCs, clue-based treasure digs, daily quests and free partner gifts. Existing account saves are retained; the new server endpoint is authenticated and preserves request idempotency. No wagers, paid currency, real-world prizes or attacks on real players. Both Our Den partners must enable game sharing for gift sending. Game-only history remains revocable. Database tests used rolled-back transactions, and actual browser/device tests remain outstanding. Version 38 is still reserved for console compatibility.


## Version 38 — Console Edition
- `index.html` detects PlayStation 4/5 user agents before loading the modern client and redirects to `console.html`. `?desktop=1` opts out. No device telemetry.
- The standalone console client uses ES5-style JavaScript and XMLHttpRequest with authenticated Supabase REST and separate tab-session storage, not the modern Supabase JS SDK. Five-second foreground polling, direct/group text, quick replies, saved messages, signed attachments, direct unread alerts and recent calls.
- Bunny Kingdom uses the existing adventure RPC and cloud saves. Arena has basic controls for all ten existing games, with property trade negotiation still delegated to the standard edition. Pack World supports existing rooms, 2D positions, decoration display and shared pet status; full construction and activities remain on the standard edition. Our Den provides a read-only notes view. Entertainment opens providers and existing watch/radio rooms; synchronized playback control remains on the standard edition.
- Calling is experimental and only available if modern WebRTC and media access are exposed. Microphone/camera test buttons explicitly request and release hardware. Phone handoff displays a link containing the selected contact ID (no credentials); the phone must sign in and start its own call. Sony Party is separate. No claim of native PlayStation Party control, TURN relay or guaranteed PS4 WebRTC.
- TV pointer and keyboard arrow focus, large-text and compact safe-area layouts; Sony-reserved buttons cannot be guaranteed. Browser diagnostics remain available.
- Verified JavaScript syntax, mocked PS4/PS5 redirects and desktop bypass, mocked login/direct/group sends/Bunny spin, unavailable-WebRTC fallback. Real console, physical calling, GitHub Pages deployment and playback need verification. No database schema changes for this release.


### 38.1.1 PS4 Messaging Edition
The console homepage now opens private messaging directly. Games, calls, world and entertainment are removed from this console UI only. Settings supports optional six-digit PIN unlock, encrypted refresh-token ciphertext stored locally, server-side bcrypt PIN verification, a five-failure lockout and a 30-day expiry. A password is never persisted; Lock clears the in-memory session; Sign out removes the local PIN and requests server revocation. Use on a trusted device only. The standard edition remains unchanged. Includes local SVG emoji artwork for 33 common emojis, a readable fallback for others, emoji picker, drafts (in memory), search, replies, reactions, edit/delete, forward, bookmarks, silent messages, expiry options, per-contact unread badges and attachment viewing. GIF loading is on demand. Actual PS4 rendering and end-to-end auth are not yet verified; database PIN behavior and a mocked client login/chat/lock/unlock passed. No live messages were sent during testing.


### 38.2 — Companion Calls
The PS4 keeps the messaging-only UI, six-digit PIN and image emoji picker. In a private conversation it can start/stop a call on a separately authenticated computer using the same account. Open My account & tools > Chromebook Call Host on the computer, explicitly enable voice or optionally video hosting, grant media access, keep the tab awake; the opt-in lease lasts two hours. The host uses the existing WebRTC call engine; PS4 sends only commands, not media. Host commands are scoped to account/session and a per-tab host key; stop is scoped to the initiating console session and request. Host heartbeat and request expiry prevent stale queued calls. A new request never silently ends a different call. Physical test not yet performed; rollback tests verified arm/start/claim/status/stop/disarm and cross-account/session restrictions; mocked host dial/end integration passed. Pop-out video uses standard/Safari PiP with in-app fallback, optional auto-PiP, supported Media Session call actions and Audio Session play-and-record; phone OS background microphone/camera restrictions still apply. On supported browsers, the call attempts to select a labeled connected headset/headphone output and rechecks device changes; manual choice overrides automatic routing. Otherwise system audio settings control Bluetooth. No guaranteed native background calling or Bluetooth detection, no new paid hosting.
