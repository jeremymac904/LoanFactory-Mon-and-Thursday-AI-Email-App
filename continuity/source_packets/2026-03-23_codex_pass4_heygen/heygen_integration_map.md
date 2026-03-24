# **HeyGen Integration Map: Loan Factory Internal Training App**

## **1\. The Best First HeyGen Workflow for this App**

The most reliable V1 workflow operates as a two-stage pipeline with two human approval gates:

1. **Script Generation:** Your app (using OpenAI/Claude) drafts the training email and a matching video script following the 20/50/30/Wolf blueprint.  
2. **Gate 1 (Human):** Manager reviews, edits, and approves the script.  
3. **Generation:** App sends an API request to HeyGen with the exact approved script, Jeremy's avatar\_id, and voice\_id.  
4. **Processing:** App polls the HeyGen API for status.  
5. **Gate 2 (Human):** App displays the finalized video\_url for human review to check for pronunciation or visual glitches.  
6. **Distribution:** Upon final approval, the video is embedded/linked in the Monday/Thursday email and sent.

## **2\. Simple Prompt-to-Video vs. Structured Avatar Video Generation**

**You must use Structured Avatar Video Generation first.**

* **Why:** The "Video Agent" (prompt-to-video) is designed to rewrite scripts, make pacing decisions, and auto-select B-roll. Since your content is heavily regulated (NMLS compliance) and follows a strict strategic framework (The Broker-Leader identity), you cannot afford AI hallucinations in the script. Structured generation guarantees the avatar speaks the *exact* words approved in Gate 1\.

## **3\. Exact Inputs Our App Should Collect Before Sending**

Before calling the HeyGen API, your app must assemble:

* avatar\_id: The specific identifier for Jeremy's custom Digital Twin. *(FLAG: Custom Avatars require a recorded consent video and specific paid tier).*  
* voice\_id: The specific identifier for Jeremy's cloned voice.  
* input\_text: The strictly approved script (must include the required NMLS compliance footer).  
* background: A static hex color (e.g., \#FFFFFF), a simple uploaded image ID (e.g., a subtle Loan Factory logo), or transparent.  
* test/aspect\_ratio: Standard 16:9 (landscape) or 9:16 (portrait/mobile).  
* title: Internal reference (e.g., Training\_Mon\_10\_24).

## **4\. Exact Outputs Our App Should Expect Back from HeyGen**

* **Initial Response:** A video\_id and a status (usually processing or pending).  
* **Completion Response:** \* status: completed  
  * video\_url: The direct URL to the .mp4 file.  
  * thumbnail\_url: A generated thumbnail for embedding in the email.  
  * duration: Length of the video (useful for tracking credit usage).  
* **Error Response:** status: failed and an error\_message (e.g., "script too long", "moderation flagged").

## **5\. Safest Generation Flow for a Human-in-the-Loop System**

The safest flow divorces script writing from video rendering:

1. **Drafting State:** App holds the text draft.  
2. **Pending API State:** Human clicks "Generate Video". App locks the script text so it cannot be changed post-approval.  
3. **Polling State:** App shows a loading spinner or "Video Rendering..." status.  
4. **Review State:** Video is rendered and playable directly inside your internal app's UI.  
5. **Final State:** Human clicks "Approve & Send Email." If the video has an error (e.g., weird pronunciation of a mortgage acronym), the human clicks "Reject & Edit Script", restarting from Step 2\.

## **6\. How Video Status Checking Should Work**

For V1, use **Status Polling**.

* **Mechanism:** Your backend runs a scheduled job or loop that calls the HeyGen GET /video\_status endpoint using the video\_id.  
* **Frequency:** Poll every 15 to 20 seconds. Generating an avatar video is not instant; it typically takes a few minutes depending on length.  
* **Timeout:** Implement a timeout (e.g., 15 minutes). If the video is still "processing", alert the user that the render is stuck.

## **7\. Whether Webhooks Should be Used in V1 or Later**

**Later (V2).**

Since you are only generating two videos a week (Mondays and Thursdays), setting up secure webhook endpoints, handling ingress, and managing webhook failure retries is unnecessary engineering overhead for V1. Simple interval polling is highly reliable for low-volume background tasks.

## **8\. What Parts of the Workflow Need Human Approval**

1. **The Script:** Before API generation, to prevent wasting HeyGen API credits on bad text.  
2. **The Final Video:** Before sending the email, to ensure the AI didn't mispronounce industry terms (like DSCR or FHA) and that the visual lip-sync didn't glitch.

## **9\. What Parts Can Be Automated Later**

* **Pronunciation Dictionaries:** Automatically wrapping known acronyms in phonetics (e.g., forcing the script to spell out "D. S. C. R." instead of risking the AI saying "discer") using HeyGen's Brand Glossary via API.  
* **Visual Overlays:** Automatically injecting standard text overlays (like the NMLS number) into the video using the API's multi-scene capabilities.  
* **Direct to Inbox:** Skipping the final video approval *only if* the system has successfully rendered X number of videos without human rejection.

## **10\. What HeyGen Features Should Stay Out of Scope for V1**

* **Video Agent:** Unpredictable script alterations.  
* **Video Translation:** Unnecessary for an internal US-based team.  
* **LiveAvatar / Interactive Avatars:** Requires web socket connections and streaming; too complex for a static email app. *(FLAG: LiveAvatar is often an Enterprise-only feature).*  
* **Complex Multi-Scene B-Roll:** Stick to a single talking-head scene to ensure fast, reliable rendering.

## **11\. Top 10 Docs This Notebook Should Help Us Create**

1. heygen\_api\_auth\_setup.md \- API key management and environment setup.  
2. avatar\_and\_voice\_mapping.md \- Hardcoded IDs for Jeremy's specific digital twin and voice.  
3. video\_generation\_payload.md \- The exact JSON schema Codex needs to hit the generation endpoint.  
4. script\_sanitization\_rules.md \- Regex/logic to strip unsupported characters before sending to HeyGen.  
5. status\_polling\_logic.md \- The loop architecture for checking video status safely.  
6. error\_handling\_matrix.md \- How the app should respond to HeyGen API rate limits or moderation failures.  
7. ui\_approval\_gates.md \- Frontend specs for the human-in-the-loop review screens.  
8. heygen\_credit\_tracking.md \- Logic to log API usage so you don't run out of credits mid-month.  
9. pronunciation\_glossary.md \- A living dictionary of mortgage terms and their phonetic spellings.  
10. compliance\_enforcement.md \- Automated checks to ensure NMLS text is always appended to the payload.

## **12\. Biggest Source Gaps or Open Questions We Still Need to Answer**

* **Exact API Endpoint Structure:** The uploaded knowledge base contains Help Center guides (UI focused), but we need the official Developer API Reference to give Codex the exact URL endpoints (e.g., api.heygen.com/v2/...).  
* **"The Wolf" Tone Control via API:** The uploaded blueprint requires "The Wolf" (high energy). We need to validate if HeyGen's API supports passing emotion tags (e.g., ElevenLabs v3 tags like \<laugh\> or \<emphasis\>) programmatically, or if we need to rely solely on punctuation.  
* **Digital Twin Readiness:** Does Jeremy already have a studio-grade Custom Avatar created and approved in HeyGen? *(FLAG: If not, this takes time, requires a consent video, and must pass HeyGen moderation before API use).*  
* **API Rate Limits & Credit Costs:** We need to confirm the exact API credit deduction per minute of generated video to model monthly costs.