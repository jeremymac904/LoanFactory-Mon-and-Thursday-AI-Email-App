# Error Handling Matrix

The app should fail clearly and recover cleanly.

## Failure Cases

1. Missing live auth or ID values
2. Script empty after sanitization
3. Render timeout
4. Moderation or policy rejection
5. Credit exhaustion
6. Unknown API failure

## Required App Responses

1. Keep the draft intact
2. Keep the tutorial workflow visible
3. Show the current failure reason in plain language
4. Offer `Reject and restart`
5. Do not auto-attach a failed or incomplete render

## V1 Mock Expectations

1. Safe placeholder failure text is acceptable
2. Mock failures should never block the rest of the draft workflow

## Needs Factual Validation

1. Exact HeyGen error codes and rate-limit behavior
2. Exact moderation response format
3. Exact credit exhaustion response format

## Needs Compliance Review

1. None in this error matrix by itself
