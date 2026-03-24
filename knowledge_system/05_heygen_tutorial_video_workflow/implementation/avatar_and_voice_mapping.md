# Avatar And Voice Mapping

This file defines what the app expects before live HeyGen rendering is allowed.

## Required Runtime Values

1. `HEYGEN_AVATAR_ID`
2. `HEYGEN_VOICE_ID`
3. Default aspect ratio for training videos
4. Default background treatment for the single-scene avatar render

## V1 Rules

1. Do not fall back to a public or generic avatar silently
2. Do not claim a live Digital Twin is ready unless Jeremy's approved avatar and voice are confirmed
3. Treat the mapping as environment-backed, not hardcoded product truth

## UI Posture

1. Mock mode may show a safe placeholder render
2. Live mode must show that avatar and voice IDs are missing until validated

## Needs Factual Validation

1. Jeremy's actual avatar_id
2. Jeremy's actual voice_id
3. Any secondary avatar or outfit variants

## Needs Compliance Review

1. Avatar rights and consent verification status
2. Voice-clone approval and allowed usage scope
