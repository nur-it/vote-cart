export const GUEST_COOKIE_NAME = "poll_guest_id";
export const GUEST_STORAGE_KEY = "poll_guest_id";

/**
 * Generates a standard random UUID/token for guest identification
 */
export function generateGuestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "g_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Client-side: gets or creates persistent guest id across localStorage and cookies
 */
export function getOrCreateGuestId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem(GUEST_STORAGE_KEY);
  if (!id) {
    // Check cookie
    const match = document.cookie.match(new RegExp("(^| )" + GUEST_COOKIE_NAME + "=([^;]+)"));
    if (match && match[2]) {
      id = match[2];
    }
  }

  if (!id) {
    id = generateGuestId();
  }

  // Ensure both localStorage & cookie have it (cookie valid for 1 year)
  localStorage.setItem(GUEST_STORAGE_KEY, id);
  document.cookie = `${GUEST_COOKIE_NAME}=${id}; path=/; max-age=31536000; SameSite=Lax`;

  return id;
}
