# UI Approval Screens

These are the required V1 review screens for the HeyGen workflow.

## Screen 1: Script Review

1. Show the generated script in an editable field
2. Make it obvious that render has not started yet
3. Expose `Approve script`
4. Keep the script tied to the current approved draft

## Screen 2: Render In Progress

1. Show the render id
2. Show current status
3. Expose `Poll render status`
4. Explain that V1 uses polling, not webhooks

## Screen 3: Final Video Review

1. Show an embedded player
2. Expose `Approve and attach`
3. Expose `Reject and restart`
4. Show whether the run is mock or live-ready

## Screen 4: Failure State

1. Show the failure reason
2. Keep restart visible
3. Do not hide the original draft

## Needs Factual Validation

1. None for the UI state flow itself

## Needs Compliance Review

1. Avatar and voice usage disclosures if the UI later surfaces live readiness claims
