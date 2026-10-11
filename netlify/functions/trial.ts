import { createPostJsonHandler } from "../../server/lib/netlify-json";
import { processTrialSubmission } from "../../server/handlers/process-trial";

export const handler = createPostJsonHandler(processTrialSubmission);
