# HeyGen API Auth Setup

Use a mock-first provider posture for V1.

## V1 Setup

1. Default `HEYGEN_PROVIDER=mock`
2. Keep the workflow usable with no live key present
3. Surface auth posture in the Provider Setup page before any render request

## Required Env Placeholders

1. `HEYGEN_PROVIDER`
2. `HEYGEN_API_KEY`
3. `HEYGEN_API_URL`
4. `HEYGEN_AVATAR_ID`
5. `HEYGEN_VOICE_ID`
6. `HEYGEN_ASPECT_RATIO`
7. `HEYGEN_BACKGROUND`

## App Behavior

1. Mock mode should report a safe, review-ready auth check
2. Live mode should not be treated as complete unless the key, endpoint, avatar, and voice values are all present
3. If live values are incomplete, fail closed and return a clear operator-facing note

## Needs Factual Validation

1. Exact HeyGen API base URL and version path
2. Exact auth header format expected by the current HeyGen developer API

## Needs Compliance Review

1. None in this setup doc
