# Validation

Run the repository checks and inspect the actual output. `scripts/audit-compliance.mjs` checks static page structure, real language alternates, article content, sources, canonical metadata, sitemap membership, external rating attribution and published image credits. Runtime behavior is additionally tested with bounded actual-source fixtures before release.

A successful local build is not production acceptance. The actual default Worker entry, HTTP redirects and error status, weather refresh, analytics controls, Urdu numerals, mobile layouts and desktop reading must also be checked against the deployed version. Source-read dates do not guarantee present opening or ticket arrangements.
