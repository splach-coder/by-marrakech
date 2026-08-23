# Deploying to cPanel (Namecheap)

## What this app needs

This is **not** a static site and cannot be uploaded as plain HTML. Three things
require a running Node.js process:

| Feature | Where | Why it blocks static export |
|---|---|---|
| `next-intl` middleware | `src/middleware.ts` | Middleware does not exist in a static export — `/` would never redirect to `/en` or `/fr` |
| Runtime redirects | `/tours`, `/experiences`, `/activities`, `/services` | `redirect()` runs per-request on the server |
| Dynamic rendering | every route (`ƒ` in the build output) | Pages are rendered on demand, not baked at build |

So the hosting requirement is: **cPanel with "Setup Node.js App"** (CloudLinux
Node.js Selector + Passenger), Node **18.18 or newer**. Namecheap's Stellar
plans generally include it; the cheapest legacy plans may not.

**Check first:** log into cPanel and look under *Software* for
**Setup Node.js App**. If it is not there, this app cannot run on that plan —
see *If your plan has no Node.js* at the bottom.

---

## Step 1 — Build the bundle (on your machine)

```bash
npm run build:cpanel
```

This produces `deploy/cpanel/` — around 100 MB — containing three things Next
keeps separate and you must ship together:

```
deploy/cpanel/
├── server.js          ← Passenger startup file
├── node_modules/      ← runtime dependencies only (56 MB, not the 600 MB dev tree)
├── .next/             ← compiled app + static chunks
├── public/            ← images, fonts, robots.txt (40 MB)
└── .env.production.template
```

Nothing is installed on the server. No `npm install` over SSH, no build step in
cPanel — which matters, because shared hosting usually kills a Next build for
running out of memory.

**Before building, make sure `.env.local` holds the real production values.**
Every `NEXT_PUBLIC_*` variable is compiled into the JavaScript at build time:

```
NEXT_PUBLIC_BUSINESS_PHONE=...
NEXT_PUBLIC_BUSINESS_PHONE_RAW=...
NEXT_PUBLIC_BUSINESS_EMAIL=...
NEXT_PUBLIC_BUSINESS_ADDRESS=...
NEXT_PUBLIC_WHATSAPP_NUMBER=...
NEXT_PUBLIC_CURRENCY_SYMBOL=€
```

Changing these in cPanel afterwards does nothing. To change them you rebuild and
re-upload. The WhatsApp number in particular is baked into every booking link.

---

## Step 2 — Create the Node.js app in cPanel

*Software → Setup Node.js App → Create Application*

| Field | Value |
|---|---|
| Node.js version | highest available, 18.18+ |
| Application mode | **Production** |
| Application root | `xhosengate` (a folder in your home dir, **not** `public_html`) |
| Application URL | your domain |
| Application startup file | `server.js` |

Click **Create**. cPanel makes the folder, sets up the Passenger config, and
creates a virtualenv activation command it shows at the top of the page.

Keeping the app root outside `public_html` means your source and `.env` are not
web-reachable. cPanel wires the domain to the app for you.

---

## Step 3 — Upload

Zip the **contents** of `deploy/cpanel` (not the folder itself), then in cPanel:

*File Manager → your app root → Upload → select the zip → Extract*

Upload the zip rather than 3,000 loose files — File Manager and FTP are both
painfully slow with `node_modules`, and shared plans have inode limits you can
trip by uploading uncompressed.

Afterwards the app root should contain `server.js`, `node_modules/`, `.next/`
and `public/` at the top level. If everything landed inside a nested
`cpanel/` folder, move it up one level.

Delete the `.htaccess` that ships in the bundle **if** cPanel already wrote its
own when you created the app (it normally does). It is only a fallback, and its
placeholder values are not real paths.

---

## Step 4 — Environment variables

*Setup Node.js App → your app → Environment variables*

Add:

```
NODE_ENV = production
```

Everything else is already compiled in. You only need to add more here if you
later introduce server-only secrets (a Sanity token, an SMTP password) — those
are read at runtime and are safe to set here.

---

## Step 5 — Start

Back on the Node.js app screen, click **Restart**. Then open your domain.

`/` should redirect to `/en`, and the language switcher should move you to
`/fr`.

---

## Troubleshooting

**502 / "Application failed to start"**
Open *Setup Node.js App* and read the log path it lists — usually
`~/logs/<app>.log` or `stderr.log` in the app root. The two common causes are a
Node version below 18.18, and `server.js` not being at the top level of the app
root.

**Site loads but every page is unstyled**
`.next/static` did not make it up. That folder is easy to miss because Next
excludes it from `standalone` — the packaging script copies it in, so re-run
`npm run build:cpanel` and re-upload rather than copying by hand.

**Images 404**
`public/` is missing from the app root, or it got nested a level deep.

**Everything works, then 503 after a while**
Shared plans kill idle processes and cap memory (often 512 MB–1 GB). Passenger
restarts on the next request, so the first hit after an idle period is slow.
This is normal on shared hosting and is the main reason a VPS or a Node host
suits an SSR app better.

**A content change did not appear**
There is no build on the server. Rebuild locally, re-upload, restart.

---

## Updating the site later

```bash
npm run build:cpanel
```

Then re-upload `.next/`, `public/` and `server.js` (skip `node_modules/` unless
`package.json` changed) and hit **Restart**. Uploading only `.next` is usually
enough for a copy or design change.

---

## Image optimisation is off on cPanel

`npm run build:cpanel` sets `CPANEL_BUILD=true`, which switches
`images.unoptimized` on in `next.config.ts`. Next's optimiser needs the `sharp`
binary and writes a growing cache to disk — both awkward on shared hosting.

The trade-off: `next/image` serves the original files. That is fine for the
fleet and hero images (already sized WebP, 200–500 KB) but some tour photos in
`public/images/` are 500 KB–1.2 MB and will be served at full size.

If the site feels heavy, the fix is to pre-resize those source images rather
than turning the optimiser back on. Vercel and local dev are unaffected — they
still optimise normally.

---

## If your plan has no Node.js

The app cannot be made static without losing the locale routing and the four
redirects. Realistic options:

1. **Upgrade the Namecheap plan** to one with Node.js support — cheapest path,
   keeps everything working.
2. **Namecheap VPS** — full control, no idle-kill, no memory cap. Best fit for
   an SSR site you intend to grow.
3. **Deploy to Vercel and point the Namecheap domain at it.** You keep the
   domain and email with Namecheap and just change the DNS records. This is what
   Next.js is built for: zero config, proper image optimisation, no cold-start
   penalty. Worth considering even if cPanel *does* work.
