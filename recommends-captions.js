window.DunstRecommendsCaptions = (() => {
  let state, activePath;
  const key = (path, image) => `${path}|${decodeURIComponent(new URL(image, location.href).pathname)}`;
  const load = () => state ||= fetch(new URL("recommends-captions.json", location.href), {cache: "no-store"})
    .then(response => { if (!response.ok) throw new Error("Undertekster kunne ikke hentes"); return response.json(); });
  async function apply(path) {
    activePath = path;
    const data = await load();
    const page = document.querySelector(".page");
    if (!page) return;
    for (const image of page.querySelectorAll(".archive-content img, #archive-gallery img")) {
      const caption = data.captions[key(path, image.src)];
      const container = image.closest(".media-card,.recommends-image");
      if (!container) continue;
      const existing = container.querySelector(".recommends-owner-caption");
      if (typeof caption !== "string" || !caption.trim()) { existing?.remove(); continue; }
      if (existing) { existing.textContent = caption; continue; }
      const text = document.createElement(container.matches("figure") ? "figcaption" : "div");
      text.className = "owner-photo-caption recommends-owner-caption";
      text.textContent = caption;
      container.append(text);
    }
  }
  window.addEventListener("focus", () => { if (activePath) { state = null; apply(activePath).catch(() => {}); } });
  return {apply, key};
})();
