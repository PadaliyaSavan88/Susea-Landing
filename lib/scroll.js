// Shared smooth-scroll helpers.
// The nav is `position: sticky; top: 0`, so section titles must sit just below
// it. We measure the nav height at call time so it stays correct on mobile too.

export function getNavOffset() {
  if (typeof document === "undefined") return 0;
  const nav = document.querySelector(".nav, [data-su-nav]");
  return (nav?.offsetHeight ?? 0);
}

// Smooth-scroll to an element by id, offset for the sticky nav. Does not touch
// the URL — callers decide whether to keep/clean the hash.
export function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

export function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
