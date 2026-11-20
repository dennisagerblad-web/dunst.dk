window.DunstPartyCaptions = (() => {
  let state;
  let activeParty;
  const key = (party, image) => `${party}|${decodeURIComponent(new URL(image, location.href).pathname)}`;
  const load = () => state ||= fetch(new URL("party-captions.json", location.href), {cache: "no-store"})
    .then(response => { if (!response.ok) throw new Error("Undertekster kunne ikke hentes"); return response.json(); });

  async function apply(party) {
    activeParty = party;
    const data = await load();
    const page = document.querySelector(".page");
    for (const image of page.querySelectorAll("img")) {
      const id = key(party, image.src);
      const caption = data.captions[id];
      const card = image.closest(".media-card");
      const figure = image.closest(".owner-caption-figure");
      const existing = card?.querySelector(".owner-photo-caption") || figure?.querySelector(".owner-photo-caption");
      if (typeof caption !== "string" || !caption.trim()) {
        existing?.remove();
        if (figure) figure.replaceWith(...figure.childNodes);
        continue;
      }
      if (existing) { existing.textContent = caption; continue; }
      if (card) {
        const text = document.createElement("div");
        text.className = "card-body owner-photo-caption";
        const paragraph = document.createElement("p");
        paragraph.textContent = caption;
        text.append(paragraph);
        card.append(text);
        const fit = () => { if (image.naturalWidth) card.style.setProperty("--caption-card-width", `${image.naturalWidth + 2}px`); };
        image.addEventListener("load", fit, {once: true});
        fit();
      } else {
        if (image.closest(".owner-caption-figure")) continue;
        const figure = document.createElement("figure");
        figure.className = "owner-caption-figure";
        const text = document.createElement("figcaption");
        text.className = "owner-photo-caption";
        text.textContent = caption;
        const media = image.parentElement.matches("a") && image.parentElement.childElementCount === 1 && !image.parentElement.textContent.trim() ? image.parentElement : image;
        media.replaceWith(figure);
        figure.append(media, text);
      }
    }
  }
  window.addEventListener("focus", () => {
    if (!activeParty) return;
    state = null;
    apply(activeParty).catch(() => {});
  });
  return {apply, key};
})();
