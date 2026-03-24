# HeyGen Video Generation Payload

Use structured avatar video generation first.

## V1 Payload Shape

1. `title`
2. `input_text`
3. `avatar_id`
4. `voice_id`
5. `aspect_ratio`
6. `background`

## V1 Render Rules

1. Send only the exact approved script
2. Lock the script once render begins
3. Use a single talking-head render for V1
4. Do not send Video Agent or multi-scene directives in V1

## Mock App Behavior

1. Simulate a successful request with a render id
2. Simulate a failure if the script carries an explicit force-fail marker
3. Return a mock player URL only after polling completes

## Live App Behavior

1. Fail closed if endpoint or ID values are missing
2. Do not claim the live payload is final without the current HeyGen developer reference

## Needs Factual Validation

1. Exact endpoint URL
2. Exact request schema and nesting
3. Exact accepted background and aspect-ratio values

## Needs Compliance Review

1. None in this payload doc by itself
