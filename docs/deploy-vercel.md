# Live on Vercel — and what to change at Namecheap

## Status

| | |
|---|---|
| Live URL | **https://xhosen-gate.vercel.app** |
| Vercel project | `anas-projects-85878d53/xhosen-gate` |
| Git | connected to `splach-coder/by-marrakech` — pushes to the default branch auto-deploy |
| Domains attached | `xhosengate.com`, `www.xhosengate.com` (waiting on DNS) |

All routes verified live: both locales, all pages, the four `/tours` → `/explore`
redirects, sitemap and robots. Image optimisation is on.

---

## ⚠️ Read this before touching DNS

`xhosengate.com` currently has **working email** on the Namecheap server:

```
xhosengate.com        A    162.0.217.113     ← the website
www.xhosengate.com    A    162.0.217.113     ← the website
mail.xhosengate.com   A    162.0.217.113     ← email  ✋ do not touch
xhosengate.com        MX   mail.xhosengate.com  ✋ do not touch
```

Vercel offers two ways to connect a domain. **Take the A-record route, not the
nameserver route.**

Switching the nameservers to `ns1.vercel-dns.com` would hand the whole zone to
Vercel and drop the MX and `mail` records with it — email to
`@xhosengate.com` would start bouncing immediately. Vercel does not host email.

Changing just the two website A records leaves the mail records exactly where
they are.

---

## What to change

Your nameservers are `dns1.namecheaphosting.com` / `dns2.namecheaphosting.com`,
which means the zone is managed **in cPanel, not in the Namecheap dashboard**.
The Advanced DNS tab on namecheap.com will be greyed out or ignored.

**cPanel → Domains → Zone Editor → Manage (for xhosengate.com)**

Edit these two records — change the value only, leave everything else alone:

| Type | Name | Change from | Change to |
|---|---|---|---|
| A | `xhosengate.com` | `162.0.217.113` | **`76.76.21.21`** |
| A | `www.xhosengate.com` | `162.0.217.113` | **`76.76.21.21`** |

Leave untouched: the `mail` A record, the MX record, and any TXT/SPF/DKIM.

If `www` exists as a CNAME rather than an A record, point it at
`cname.vercel-dns.com` instead — either works.

### Then

Nothing further. Vercel polls for the change, issues the SSL certificate
automatically, and emails you when it is verified. Typical propagation is
15–60 minutes; TTL on the current records may make it up to a few hours.

Check progress any time:

```bash
npx vercel domains inspect xhosengate.com
```

Once it verifies, `xhosengate.com` and `www.xhosengate.com` both serve the site
over HTTPS, and Vercel redirects www → apex by default.

---

## One thing to clean up after DNS moves

The old cPanel site will still be sitting on `162.0.217.113`. Once the domain
resolves to Vercel, nothing points at it — but the hosting account still needs
to stay active if that is where your email lives. Do not cancel the hosting
plan; you would lose the mailboxes.

---

## Still on placeholders

The site is live with placeholder contact details. Every WhatsApp booking button
opens a chat to a number that does not exist:

```
NEXT_PUBLIC_WHATSAPP_NUMBER  = 212600000000
NEXT_PUBLIC_BUSINESS_PHONE   = +212 600 000 000
NEXT_PUBLIC_BUSINESS_EMAIL   = hello@xhosen.com
NEXT_PUBLIC_BUSINESS_ADDRESS = 123 Medina Avenue, Marrakech 40000, Morocco
```

These are compiled into the JavaScript at build time, so changing them means
updating Vercel and redeploying — not just editing a setting:

```bash
npx vercel env rm NEXT_PUBLIC_WHATSAPP_NUMBER production
printf '2126XXXXXXXX' | npx vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
npx vercel deploy --prod
```

Or edit them in the Vercel dashboard under *Settings → Environment Variables*
and hit **Redeploy**. Give me the real values and I will do it in one pass.

---

## Deploying updates

Because the GitHub repo is connected, pushing to the default branch deploys
automatically. To deploy the working tree directly instead:

```bash
npx vercel deploy --prod
```

---

## The cPanel bundle

`deploy/cpanel/` and `npm run build:cpanel` still work if you ever want to move
back — `docs/deploy-cpanel.md` has those steps. The folder is gitignored and
safe to delete (~108 MB).
