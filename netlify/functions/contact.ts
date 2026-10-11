import { createPostJsonHandler } from "../../server/lib/netlify-json";
import { processContactSubmission } from "../../server/handlers/process-contact";

export const handler = createPostJsonHandler(processContactSubmission);
