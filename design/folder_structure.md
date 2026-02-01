# SchemeSaarthi Monorepo Structure

We will use a standard monorepo structure to organize frontend, backend, and data processing scripts.

```
Scheme-Saarthi/
├── api/                        # FastAPI Backend (Vercel Serverless)
│   ├── index.py                # Entry point
│   ├── main.py                 # FastAPI app instance
│   ├── requirements.txt        # Python dependencies
│   └── routers/                # API Endpoints
│
├── apps/
│   └── web/                    # Next.js Frontend
│       ├── app/                # App Router
│       ├── components/         # React Components
│       ├── lib/                # Utils (Supabase client, types)
│       └── public/             # Static assets
│
├── packages/
│   └── scraper/                # Python Data Pipeline
│       ├── spiders/            # Scrapy spiders or BS4 scripts
│       ├── processors/         # PDF/Text cleaning logic
│       └── scripts/            # Manual sync scripts
│
├── design/                     # Project Documentation
│   ├── architecture.md
│   ├── schema.sql
│   └── folder_structure.md
│
├── vercel.json                 # Vercel Deployment Config
├── README.md
└── .gitignore
```
