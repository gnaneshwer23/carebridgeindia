import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/whatsapp";

/**
 * Deterministic PRD-safe replies when AI_GATEWAY_API_KEY is not configured.
 * Never invents prices, savings, diagnoses, or wait guarantees.
 */
export function fallbackReply(userText: string): string {
  const q = userText.toLowerCase();

  if (/\b(emergenc|999|111|chest pain|stroke|suicid)\b/.test(q)) {
    return "If this is urgent, use NHS 111 or local emergency services now. CareBridge is not an emergency or clinical service.";
  }

  if (/\b(whatsapp|human|speak|call|phone|talk to (a |someone|you))\b/.test(q)) {
    return `You can message the CareBridge team on WhatsApp at ${WHATSAPP_DISPLAY}: ${WHATSAPP_URL}. For a personalised comparison, use Compare my options on /enquire. Not for emergencies.`;
  }

  if (/\b(how (it |does it )?work|pathway|process|steps)\b/.test(q)) {
    return "CareBridge helps UK adults prepare a personalised wait and cost comparison with planned treatment in India: prepare an enquiry, a coordinator gathers a patient-specific proposal (total expected cost and provider-confirmed availability, unknowns left blank), then you decide — including deciding not to travel. Read /how-it-works or start at /enquire. Nothing here books treatment.";
  }

  if (/\b(wait|nhs|queue|list)\b/.test(q)) {
    return "NHS waits vary by procedure and area. This site explains the comparison idea on /waiting; it does not invent your wait time or claim “no waiting list” in India. A personalised view starts with /enquire.";
  }

  if (/\b(cost|price|cheap|sav(e|ing)|quote|fee|£|\$)\b/.test(q)) {
    return "I cannot invent prices or savings percentages. Public pages such as /costs give context only. A personalised total expected cost comes after an enquiry, with unknowns left blank — start at /enquire, or WhatsApp us at " +
      WHATSAPP_URL +
      ".";
  }

  if (/\b(book|pay|marketplace|hospital list|medi)\b/.test(q)) {
    return "CareBridge is not a booking marketplace and does not take payment or admit patients. It supports a personalised UK–India comparison so you can decide with clearer information. See /how-it-works.";
  }

  if (/\b(clinician|gp|referr|doctor)\b/.test(q)) {
    return "There is a short note for clinicians on /for-clinicians. CareBridge does not replace NHS care pathways or provide clinical advice.";
  }

  if (/\b(patient|eligib|who (is|can)|uk adult)\b/.test(q)) {
    return "CareBridge is aimed at UK adults facing a long NHS wait or high private cost who want a personalised India comparison. See /for-patients. It is not clinical acceptance and not part of the NHS.";
  }

  return `I can help you find How it works (/how-it-works), NHS wait context (/waiting), UK cost context (/costs), or start Compare my options (/enquire). For a person, WhatsApp ${WHATSAPP_DISPLAY}: ${WHATSAPP_URL}. I will not invent prices, savings, diagnoses, or treatment dates.`;
}
