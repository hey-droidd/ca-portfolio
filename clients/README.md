# Clients

Each directory is one prospect's reusable website package.

```text
clients/
└── <client-id>/
    ├── record.json      # CRM/sales history — WHAT happened with this prospect
    ├── website.json     # Website configuration — HOW their preview looked
    ├── assets/          # Source logos/photos supplied for this prospect
    ├── custom/          # Optional one-off Astro sections (80–90% need none)
    └── versions/
        ├── v1/          # Snapshot of record.json + website.json per outreach
        └── v2/
```

## Add a new client

1. Copy `jane-doe/` to `<new-id>/` (record + website + versions/v1).
2. Edit `record.json` (outreach status, notes) and `website.json`
   (business, content, sections, assets).
3. Drop logos/photos in `assets/` and publish-ready files under
   `public/clients/<new-id>/`; point `website.json` asset paths there.
4. Snapshot the exact preview into `versions/vX/` before sending it.
5. Point `src/pages/index.astro` at the new `website.json` to preview.

## Rules

- Git branches track the **design system**. Client history lives in
  `versions/` — never create a branch per prospect.
- `website.json` must stay fully self-sufficient: months later, checking
  out this commit plus a version snapshot must reproduce the preview.
