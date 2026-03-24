# Script Sanitization Rules

Sanitize the tutorial script before render so text-to-speech stays more predictable.

## V1 Rules

1. Remove markdown symbols and decorative characters
2. Collapse repeated whitespace
3. Strip headings or list markers that do not need to be spoken
4. Normalize risky acronyms into a more speakable form when the app knows them

## Good First Dictionary Rules

1. `DSCR` to `D.S.C.R.`
2. `FHA` to `F.H.A.`
3. `VA` to `V.A.`
4. `NMLS` to `N.M.L.S.`

## V1 Guardrails

1. Do not silently alter the business meaning of the script
2. Keep sanitization deterministic and reviewable
3. Do not depend on a live Brand Glossary feature for V1

## Needs Factual Validation

1. Whether the current HeyGen stack or account supports a native glossary feature that should replace some of these rules later

## Needs Compliance Review

1. None in the sanitization rules themselves
