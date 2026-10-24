import { createPostJsonHandler } from "../../server/lib/netlify-json";
import { processTrialSubmission } from "../../server/handlers/process-trial";
// comment for just verify
// ddsds
export const handler = createPostJsonHandler(processTrialSubmission);
