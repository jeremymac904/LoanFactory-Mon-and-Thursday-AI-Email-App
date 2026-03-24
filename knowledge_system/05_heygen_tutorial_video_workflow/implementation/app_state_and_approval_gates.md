# App State And Approval Gates

The app uses a double-approval video workflow.

## State Definitions

1. `script_draft`
   Meaning: tutorial script exists and is still editable
2. `script_approved`
   Meaning: Gate 1 passed and the script is ready for render request
3. `rendering`
   Meaning: script is locked and polling is active
4. `review`
   Meaning: final video is playable for Gate 2 review
5. `attached`
   Meaning: final video was approved and attached to the draft
6. `failed`
   Meaning: render failed or live wiring is incomplete

## Gate Rules

1. Draft approval happens first
2. Script approval happens before render request
3. Final video approval happens before attach
4. Email scheduling and sending still remain under the existing draft approval gate

## Lock Rules

1. Script stays editable in `script_draft`
2. Script may still be revised before render if Jeremy wants another pass
3. Script locks immediately when render request begins

## Restart Rules

1. Rejecting the final video restarts the workflow at a fresh script draft
2. Restart should not destroy the underlying email draft

## Needs Factual Validation

1. None for the state machine itself

## Needs Compliance Review

1. None for the state machine itself
