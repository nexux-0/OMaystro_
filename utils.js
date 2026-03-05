export const qs = (sel, el = document) => el.querySelector(sel);
export const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export const formatDh = (value) => {
  if (value === null || value === undefined) return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return `${n}dh`;
};

export const formatPizzaPrice = (price) => {
  if (!price || typeof price !== "object") return "";
  const m = formatDh(price.m);
  const l = formatDh(price.l);
  if (!m && !l) return "";
  return `${m} (M) / ${l} (L)`;
};

export const safeText = (s) => {
  const str = String(s ?? "");
  const rx = new RegExp("[\\u0000-\\u001F\\u007F]", "g");
  return str.replace(rx, "").trim();
};

export const setHidden = (el, hidden) => {
  if (!el) return;
  el.classList.toggle("hidden", Boolean(hidden));
};

export const debounce = (fn, ms) => {
  let t = null;
  return (...args) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), ms);
  };
};

export const buildMapsUrl = (query) => {
  const q = encodeURIComponent(query || "");
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
};

export const buildMapsEmbedUrl = (query) => {
  const q = encodeURIComponent(query || "");
  return `https://www.google.com/maps?q=${q}&output=embed`;
};

export const buildTelUrl = (phoneDisplay) => {
  const cleaned = safeText(phoneDisplay);
  const rx = new RegExp("[^0-9+]", "g");
  const compact = cleaned.replace(rx, "");
  return `tel:${compact}`;
};

export const buildWhatsappUrl = (phoneE164, message) => {
  const rx = new RegExp("[^0-9]", "g");
  const compact = String(phoneE164 || "").replace(rx, "");
  const text = encodeURIComponent(message || "");
  return `https://wa.me/${compact}?text=${text}`;
};
