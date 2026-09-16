# Existing Inspection Desk application

Open https://acv-inspection-desk-legacy.vercel.app/ in a browser. This supplied CFML source runs on Lucee 6.2.8.20. You do not need to install it locally. The JSON records are fictional.

[Saved runtime pages](snapshots/index.json) are available if the hosted application is unavailable.

DF-01: stock-number matching is case-sensitive in index.cfm. The Next.js replacement must make it case-insensitive. All other required behavior is in [the preservation contract](../docs/PRESERVATION-CONTRACT.md).
