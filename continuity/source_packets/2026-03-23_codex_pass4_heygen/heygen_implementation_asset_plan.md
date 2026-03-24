# **Implementation Asset Plan: Loan Factory Training Email & Video App**

## **1\. App Workflow Docs We Need**

### **File 1**

1. **Exact file name:** app\_state\_and\_approval\_gates.md  
2. **Purpose:** Defines the exact state machine of the app from draft to final email send.  
3. **Who it serves:** The backend and frontend engineers (Codex).  
4. **Why it matters:** Ensures the app correctly locks the script when rendering begins so the video and email text perfectly match.  
5. **Exact sections that should be inside it:** State Definitions (Drafting, Pending API, Polling, Review, Final), State Transition Triggers, Edit Lock Mechanisms.  
6. **What examples should be added later:** Edge-case transition handling (e.g., user closing browser during polling).  
7. **Needs factual validation:** No  
8. **Needs compliance review:** No  
9. **Required for v1 or optional:** Required for v1

### **File 2**

1. **Exact file name:** ui\_approval\_screens.md  
2. **Purpose:** Frontend specifications for the human-in-the-loop review screens.  
3. **Who it serves:** Frontend engineers.  
4. **Why it matters:** Managers need a clear interface to review scripts (Gate 1\) and watch the final video (Gate 2\) before distribution.  
5. **Exact sections that should be inside it:** Script Editor View, Video Playback Modal, Approve/Reject Button Logic, Rejection Reason Flow.  
6. **What examples should be added later:** Mobile-responsive views for managers approving on-the-go.  
7. **Needs factual validation:** No  
8. **Needs compliance review:** No  
9. **Required for v1 or optional:** Required for v1

## **2\. Prompt Library Docs We Need**

### **File 3**

1. **Exact file name:** script\_generation\_prompts.md  
2. **Purpose:** System prompts for OpenAI/Claude to convert a training email draft into a HeyGen-ready script.  
3. **Who it serves:** LLM integration engineers.  
4. **Why it matters:** Ensures the generated script strictly follows the 20/50/30/Wolf formula and the Broker-Leader persona.  
5. **Exact sections that should be inside it:** Core System Prompt, Tone & Style Constraints, Output JSON Schema, The 20/50/30/Wolf Ratio Injector.  
6. **What examples should be added later:** Few-shot examples of successful email-to-script conversions.  
7. **Needs factual validation:** No  
8. **Needs compliance review:** Needs compliance review (ensure prompt strictly forbids compliance violations or off-brand promises).  
9. **Required for v1 or optional:** Required for v1

## **3\. HeyGen Request Payload Docs We Need**

### **File 4**

1. **Exact file name:** heygen\_video\_generation\_payload.md  
2. **Purpose:** The exact JSON schema needed to hit the HeyGen generation endpoint.  
3. **Who it serves:** Backend API integration engineers.  
4. **Why it matters:** Dictates the exact API call structure required to generate a structured avatar video.  
5. **Exact sections that should be inside it:** API Endpoint URL, Auth Headers, Payload Body Schema, Variable Injection (Script, Avatar ID, Voice ID).  
6. **What examples should be added later:** Multi-scene payload variations if visual slide overlays are added in V2.  
7. **Needs factual validation:** Needs factual validation (exact HeyGen V2 Developer API endpoint structures are required).  
8. **Needs compliance review:** No  
9. **Required for v1 or optional:** Required for v1

### **File 5**

1. **Exact file name:** avatar\_and\_voice\_mapping.md  
2. **Purpose:** Stores the hardcoded identifiers for Jeremy's digital twin and voice.  
3. **Who it serves:** Backend engineers handling environment variables.  
4. **Why it matters:** Prevents accidental generation using public or default avatars.  
5. **Exact sections that should be inside it:** AVATAR\_ID mapping, VOICE\_ID mapping, Fallback IDs (if applicable), Video Aspect Ratio Defaults.  
6. **What examples should be added later:** Secondary IDs for different outfits (e.g., polo vs. suit).  
7. **Needs factual validation:** Needs factual validation (requires fetching the exact IDs from your HeyGen account).  
8. **Needs compliance review:** Needs compliance review (verify Jeremy's digital twin consent verification has passed HeyGen moderation).  
9. **Required for v1 or optional:** Required for v1

## **4\. HeyGen Response and Status Handling Docs We Need**

### **File 6**

1. **Exact file name:** status\_polling\_logic.md  
2. **Purpose:** The loop architecture for checking HeyGen video generation status securely.  
3. **Who it serves:** Backend engineers.  
4. **Why it matters:** HeyGen processing is asynchronous; the app must poll safely without hitting rate limits.  
5. **Exact sections that should be inside it:** Polling Interval Rules (e.g., 15s), Timeout Thresholds (e.g., 15m), API Status Parsing (processing, completed, failed).  
6. **What examples should be added later:** Exponential backoff logic if HeyGen API load times increase.  
7. **Needs factual validation:** Needs factual validation (confirm HeyGen's specific API rate limits for polling).  
8. **Needs compliance review:** No  
9. **Required for v1 or optional:** Required for v1

### **File 7**

1. **Exact file name:** error\_handling\_matrix.md  
2. **Purpose:** Defines how the app recovers from API failures or HeyGen moderation flags.  
3. **Who it serves:** Backend and Frontend engineers.  
4. **Why it matters:** Prevents the app from crashing or freezing if a script violates HeyGen's terms or if credit limits are hit.  
5. **Exact sections that should be inside it:** Moderation Rejection Fallbacks, API Timeout Handling, Credit Exhaustion Alerts.  
6. **What examples should be added later:** Custom UI error states explaining *why* the video failed to the user.  
7. **Needs factual validation:** Needs factual validation (requires exact HeyGen error codes).  
8. **Needs compliance review:** No  
9. **Required for v1 or optional:** Required for v1

## **5\. Webhook Docs We Need, If Useful**

### **File 8**

1. **Exact file name:** webhook\_architecture\_v2.md  
2. **Purpose:** To replace polling with an event-driven status update system.  
3. **Who it serves:** Backend infrastructure engineers.  
4. **Why it matters:** Reduces outbound server requests. Unnecessary for the low volume (2 videos/week) in V1, but scales better in V2.  
5. **Exact sections that should be inside it:** Webhook Endpoint Ingress Setup, Secret Verification/Security, Payload Parsing.  
6. **What examples should be added later:** Dead-letter queues for missed webhook events.  
7. **Needs factual validation:** Needs factual validation.  
8. **Needs compliance review:** No  
9. **Required for v1 or optional:** Optional for later

## **6\. Memory and Style Docs We Need**

### **File 9**

1. **Exact file name:** compliance\_enforcement.md  
2. **Purpose:** Automated checks to ensure the NMLS text and disclosures are always present.  
3. **Who it serves:** Backend engineers.  
4. **Why it matters:** Bypasses human error to ensure every generated script mathematically includes the required legal text.  
5. **Exact sections that should be inside it:** Required Footer Strings (NMLS 1195266 / NMLS 320841), Injection Logic (Appending to input text).  
6. **What examples should be added later:** State-specific disclosures if the audience expands.  
7. **Needs factual validation:** No  
8. **Needs compliance review:** Needs compliance review (final legal approval on the appended footer text).  
9. **Required for v1 or optional:** Required for v1

### **File 10**

1. **Exact file name:** script\_sanitization\_rules.md  
2. **Purpose:** Pre-processing logic to format text specifically for text-to-speech readability.  
3. **Who it serves:** Backend engineers handling string manipulation.  
4. **Why it matters:** Prevents AI pronunciation errors (e.g., formatting $1M as one million dollars or forcing acronym phonetics like D. S. C. R.).  
5. **Exact sections that should be inside it:** Regex Replacement Rules, Forbidden Symbols Stripper, Number Formatting Rules.  
6. **What examples should be added later:** Advanced dictionary mappings using HeyGen's actual Brand Glossary API feature.  
7. **Needs factual validation:** Needs factual validation (to see if HeyGen native Brand Glossary overrides the need for hardcoded regex).  
8. **Needs compliance review:** No  
9. **Required for v1 or optional:** Required for v1

## **7\. What Should Be Mocked First in Codex Before Live API Wiring**

1. **API Authentication Check:** Mock a successful 200 OK connection to the HeyGen API without spending credits.  
2. **LLM Output Mock:** Hardcode a perfectly structured 20/50/30/Wolf script so UI work can proceed without waiting for OpenAI/Claude integration.  
3. **Status Polling Loop:** Mock a timer that returns processing three times, then completed to test frontend spinner UI.  
4. **Video Playback:** Mock the final payload with a public placeholder .mp4 video URL to test the Gate 2 review modal.

## **8\. What Should Stay Out of Scope for V1**

* Webhook infrastructure for status updates.  
* HeyGen "Video Agent" (prompt-to-video rewriting) features.  
* Multi-scene rendering, B-roll injection, or automatic slide generation.  
* Video Translation features.  
* Direct-to-inbox auto-sending (skipping Gate 2 human review).  
* Enterprise-only LiveAvatar or interactive streaming.

## **Final Summary Action Plan**

### **The Top 10 Files to Create First**

1. app\_state\_and\_approval\_gates.md  
2. ui\_approval\_screens.md  
3. script\_generation\_prompts.md  
4. compliance\_enforcement.md  
5. script\_sanitization\_rules.md  
6. heygen\_video\_generation\_payload.md  
7. avatar\_and\_voice\_mapping.md  
8. status\_polling\_logic.md  
9. error\_handling\_matrix.md  
10. heygen\_api\_auth\_setup.md (Not detailed above, but implicit for baseline API auth).

### **The Best Order to Build Them**

1. **Core Logic:** app\_state\_and\_approval\_gates.md, compliance\_enforcement.md, script\_sanitization\_rules.md.  
2. **LLM Integration:** script\_generation\_prompts.md.  
3. **HeyGen API Layer:** heygen\_api\_auth\_setup.md, avatar\_and\_voice\_mapping.md, heygen\_video\_generation\_payload.md.  
4. **App Resilience:** status\_polling\_logic.md, error\_handling\_matrix.md.  
5. **Frontend:** ui\_approval\_screens.md.

### **Top 5 HeyGen Tutorial Video Prompt Templates Supported**

1. **The Policy Breakdown:** Explaining a new internal rule or lender guideline.  
2. **The Math Walkthrough:** Explaining how to calculate a specific loan scenario (e.g., DSCR ratios).  
3. **The Software Update:** Explaining a new feature in AxonForge or internal tech.  
4. **The Market Shift:** A quick "Inside Man" update on immediate rate changes or economic news.  
5. **The Leadership Memo:** A motivational "Wolf" segment addressing branch performance or mindset.

### **Top 5 UI Actions This App Should Expose**

1. **Generate Script from Draft:** Button to trigger OpenAI/Claude.  
2. **Edit & Approve Script:** Text box with a lock-in confirmation button.  
3. **Render Video:** Button to trigger the HeyGen API payload.  
4. **Play / Review Final Render:** Embedded video player.  
5. **Approve & Attach / Reject & Restart:** Final workflow distribution buttons.

### **The Single Best Next Step**

Open your HeyGen Developer Dashboard to locate the exact API Reference documentation and Jeremy's avatar\_id / voice\_id. We need those exact factual parameters to successfully write heygen\_video\_generation\_payload.md for Codex.