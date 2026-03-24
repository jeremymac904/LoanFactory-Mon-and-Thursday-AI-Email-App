# Status Polling Logic

V1 uses polling only.

## Polling Rules

1. Start polling only after a render id exists
2. Poll every 15 to 20 seconds in live mode
3. Stop polling when the render reaches `completed` or `failed`
4. Apply a timeout ceiling so the app can surface a stuck render instead of hanging silently

## App State Expectations

1. `rendering`
2. `review`
3. `failed`

## Mock Rules

1. Return `processing` for the first polls
2. Return `completed` after a short deterministic sequence
3. Allow a predictable failure path for UI validation

## Needs Factual Validation

1. Exact live polling interval that stays under HeyGen rate limits
2. Exact timeout expectations for current HeyGen render times
3. Exact live status vocabulary returned by HeyGen

## Needs Compliance Review

1. None in this polling doc
