import { createQuoteHandler } from "@/lib/quote-handler";

/** Receives quote requests from the website form and emails them to the team. */
export const POST = createQuoteHandler();
