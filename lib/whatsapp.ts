/** CareBridge human contact on WhatsApp (E.164 without +). */
export const WHATSAPP_E164 = "447553886303";

export const WHATSAPP_DISPLAY = "+44 7553 886303";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;

export function whatsappHref(prefill?: string) {
  if (!prefill?.trim()) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(prefill.trim())}`;
}
