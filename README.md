# Relational Immortality Survey

Anonymous research survey web app for the pilot study **Relational Immortality: Attachment, Grief, and Beliefs About Continued Existence**.

Participants see the neutral public title: **Relationships, Identity, Mortality, and Beliefs About Consciousness**.

---

## What this is

A mobile-first survey that collects anonymous responses with:

- Randomized experimental conditions
- Bereaved / non-bereaved branching
- Derived research variables calculated automatically
- CSV export for analysis

---

## Quick start (local)

### 1. Open the project folder

```
C:\Users\admin\Projects\relational-immortality-survey
```

### 2. Install and run

```powershell
npm install
npm run dev
```

### 3. Open in browser

- **Survey:** http://localhost:3000
- **Admin (download data):** http://localhost:3000/admin

Default admin password: `change-me-in-production`  
(Change this in `.env.local` — see below.)

---

## Where responses are stored

Responses save as individual JSON files in:

```
data/responses/
```

Each file is named with an anonymous participant ID. Names are optional (participant may leave blank). Email addresses and IP addresses are not collected.

---

## Download your data (non-technical)

1. Go to **http://localhost:3000/admin** (or your live URL + `/admin`)
2. Enter your admin password
3. Click **Download CSV**
4. Open the CSV file in Excel or Google Sheets

---

## Change the admin password

1. Copy `.env.example` to `.env.local`
2. Edit the line: `ADMIN_SECRET=your-secret-password-here`
3. Restart the app (`npm run dev`)

---

## Deploy online (free)

### Option A: Vercel (recommended)

1. Create a free account at [vercel.com](https://vercel.com)
2. Install Vercel CLI or connect your GitHub repo
3. Deploy the project folder
4. In Vercel project settings → Environment Variables, add:
   - `ADMIN_SECRET` = your chosen password

**Important:** Vercel's free hosting does not keep local files permanently. For production, you'll need cloud storage (see Option B) or deploy to Railway/Render where the filesystem persists.

### Option B: Railway or Render (persistent file storage — recommended for live study)

1. Create a free account at [render.com](https://render.com) or [railway.app](https://railway.app)
2. Connect this project folder (push to GitHub first, or upload)
3. For Render: the included `render.yaml` sets up persistent disk storage automatically
4. Set `ADMIN_SECRET` to your chosen password in the dashboard
5. Deploy — responses persist in `data/responses/`

**Use this option for your live pilot.** Vercel free hosting does not keep uploaded files permanently.

---

## Project files

| File | Purpose |
|------|---------|
| `README.md` | This file — setup and usage |
| `DATA_DICTIONARY.md` | Every variable explained |
| `RESEARCH_PLAN.md` | Hypotheses and analysis plan |
| `src/components/SurveyApp.tsx` | Main survey flow |
| `src/app/api/submit/route.ts` | Saves responses |
| `src/app/api/export/route.ts` | CSV export |
| `src/app/admin/page.tsx` | Admin download page |

---

## Testing

Run a test submission locally:

1. Start the app (`npm run dev`)
2. Complete the survey at http://localhost:3000
3. Check `data/responses/` for a new JSON file
4. Download CSV from http://localhost:3000/admin

Test both paths:
- Answer **No** to bereavement question (shorter path)
- Answer **Yes** to bereavement question (full path)

---

## Support

This is an exploratory pilot. See `RESEARCH_PLAN.md` for hypotheses and analysis guidance. Do not interpret correlations as proof of causation.
