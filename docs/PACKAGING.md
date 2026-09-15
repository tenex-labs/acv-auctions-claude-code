# Packaging — version 1.1

`npm run package` creates `submission.zip` from saved files. Git is not required. New and uncommitted files are included. The machine-readable contract is `../scripts/shared/contract.json`; its packaging limits and supported formats control the packager, portal and checker.

## Contents

Include all regular project files in supported formats after the explicit exclusions. Include permitted root runtime and configuration files, `CLAUDE.md`, `README.md`, `.env.example`, relevant `.claude/settings.json`, all public documentation, and complete skill directories recursively, including supporting files. Include the supplied public `legacy/` and `product/` packets so documented references survive extraction. These public packets contain no private reference implementation or checker variants. Files under arbitrary helper directories are permitted and count under the size rule.

Required: `package.json` with build/start scripts, `package-lock.json`, `.node-version`, `CLAUDE.md`, `README.md`, `.claude/settings.json`, `tests/participant/assessment.json`. Its `regressionTest` must name an included test. Every local reference used by the supplied instructions or skills must resolve after extraction. Missing or unsupported files stop the command with the exact path. Do not silently skip oversize or required files.

Exclude dependencies, `.git`, `.vercel`, generated `.next*`/dist/build/out/coverage/test output, runtime data including the configured data directory, private workspace directories, logs, caches, archive files, Claude local settings/memory/transcripts and `CLAUDE.local.md`. Exclude real `.env` files while allowing `.env.example`. Refuse credential files and credential-shaped values rather than copying them. File permissions, links, paths and format restrictions are enforced by the validator.

## Identity

Read each file once into a bounded buffer, hash those same bytes, then confirm the saved file did not change during packaging. Sort paths by Unicode code point, not locale. For each file concatenate `path + TAB + lowercase sha256 + LF`; packageHash is the SHA-256 of the resulting UTF-8 bytes. The generated manifest itself is not included in that file list. producedAt may vary and never changes packageHash. Compute zipSha256 separately from the completed archive bytes. Identical saved files must have identical packageHash even if ZIP metadata differs.

The manifest includes manifestVersion 1, contractVersion inspection-desk-2task-1.1, producedAt, tool, node, fileCount, uncompressedBytes, files[{path,bytes,sha256}], packageHash, sizeReport and warnings. Hashes in the manifest are claims until every included file is checked by the server.

## Limits

- Compressed ZIP: 25 MiB maximum (26,214,400 bytes); warn above 10 MiB (10,485,760 bytes).
- Extracted contents: 100 MiB maximum, enforced while actual bytes are read.
- 3,000 files maximum; 2 MiB maximum per file. Manifest has the same per-file bound.
- Paths: 200 characters, 16 levels maximum; no absolute paths, traversal, backslashes, colon, control characters, unsafe segments or case-insensitive duplicates.
- 20 binary files maximum, supported image/font/PDF formats only in the locations named by contract.json. SVG is text and subject to content checks.
- ZIP store/deflate only; support valid ZIP64 metadata within these limits. Reject encrypted, multipart or inconsistent archives, links, special files, duplicate entries and central/local record disagreement. Count actual expanded bytes; verify CRC and SHA-256 for every file.

A workshop download has one `inspection-desk/` root and no root submission-manifest.json. Reject it with: “Run npm run package in your project and upload submission.zip.” Presence of the public legacy/product packets is allowed; it is no longer a download-detection rule.

## Secrets and dependency sources

Scan plausible complete credentials, not bare explanatory prefixes. Detection patterns in the scanner's own source must not match as credentials. Exercise this with a clean starter and dummy complete credential strings. Do not print matching values; print path and line. Reject credential-bearing npm configuration. The checker ignores submitted npm network settings, validates every lockfile resolved URL against registry.npmjs.org, rejects git/file/link/custom-source dependencies, and installs with scripts disabled and an explicit trusted npm configuration. Network access exists only for controlled dependency download; build/start/test/hook execution is offline.

## Recovery and uploads

`npm run package -- --recovery` writes a uniquely named backup without overwriting another backup. It saves unfinished work and does not require feature checks to pass. Fix packaging errors before replacing files with checkpoint C1.

The browser previews the bounded file list and manifest, then uploads binary bytes to a temporary staging object by signed URL. The server verifies every included file, fingerprint, path and limit. It writes the verified bytes with create-only semantics to a separate private accepted object that no upload URL targets. The receipt identifies those immutable bytes by zipSha256, object/version identity, packageHash, participant and sequence. Reusing a live staging URL cannot change an accepted receipt.

Under one workshop, participant and contract, repeated packageHash values return the existing accepted version and do not enqueue another assessment. A receipt from local development is labelled local; only verified production storage produces a production receipt.

## Release checks

Run packaging twice on the starter and reference; compare packageHash and separately record zipSha256. Test changed files during packaging, new files, nested skill helpers, all referenced docs after extraction, config files, .env.example, dummy secrets, missing lockfile, oversize files, malformed archives, links, duplicate paths, and immutable storage. From a fresh extraction run setup, preflight, foundation and the appropriate finished-task commands. Record actual durations.
