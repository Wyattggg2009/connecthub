# Pack Email setup — version 31.0.0

This optional service uses Resend. The app does not change Pack login credentials or use the internal synthetic login email. Every member verifies their own real email address.

## Administrator setup (browser only)
1. Create a Resend account at https://resend.com/ .
2. In Domains, add and verify a sender domain you control. For testing, Resend's shared sender may only send to your account's own address. For other members, use a verified sender domain. Domain registration can cost money.
3. Create a Resend API key with access to sending and retrieving inbound messages. Keep it secret. Open Emails → Receiving and copy the assigned inbound domain (not an individual address); alternatively configure a dedicated inbound subdomain. Don't change your existing mailbox MX records.
4. Create a webhook at https://resend.com/webhooks for `email.received`. Endpoint: https://fcefqdjjhmkwmavtrbop.supabase.co/functions/v1/pack-email . Copy its signing secret.
5. In https://supabase.com/dashboard/project/fcefqdjjhmkwmavtrbop/functions/secrets add:
   - PACK_RESEND_API_KEY — your Resend API key
   - PACK_EMAIL_FROM — verified sender, e.g. The Pack <notifications@your-domain.example> (replace with your real verified domain)
   - PACK_REPLY_DOMAIN — your Resend inbound domain, without @
   - PACK_RESEND_WEBHOOK_SECRET — webhook signing secret (whsec_...)
6. Open https://wyattggg2009.github.io/connecthub/email.html and refresh connection. Verify your own mailbox and opt in. Have another account send you a normal direct message, leave it unread, then check your inbox. Tap Reply, put REPLY: Hello on the first line, send, and verify that the chat gets one reply.

The provider is not configured by deployment alone. The configured flags only check environment values, not actual delivery. Free plan quotas can change; see https://resend.com/pricing . Email is not instant like web push. The queue polls once per minute, suppresses already-read/deleted/disappearing messages and limits queued messages to 30 per account per 24 hours. It retries eligible send failures up to three times; expired jobs are removed. Reply tokens are single-use, sender-address-bound, expire in 24 hours, and are invalidated when changing email or turning off the channel. Incoming webhooks are signature-checked; possession of the reply address is a capability, so don't forward these emails. Text replies only, with explicit REPLY: prefix to avoid accidental auto replies and quoted messages. No group/call/feed email alerts yet. Email providers may retain previews and reply text. Do not commit API keys to GitHub.
