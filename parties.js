const partiesGrid = document.getElementById("parties-grid");

for (const party of window.DUNST_PREVIEW_DATA.parties) {
  const url = menuDestination(party.url);
  const title = /\b20\d\d\b/.test(party.label) ? party.label : `${party.label} ${party.year}`;
  const card = document.createElement("a");
  card.className = "party-card";
  card.href = url;
  const picture = document.createElement("img");
  picture.src = party.image;
  if (party.url.includes("/fest_07_nytaar/")) picture.classList.add("parties-wide-flyer");
  picture.alt = `Plakat eller billede for ${title}`;
  picture.loading = "lazy";
  const caption = document.createElement("span");
  caption.textContent = title;
  card.append(picture, caption);
  const fit = () => {
    if (!picture.naturalWidth) return;
    const width = party.url.includes("/fest_07_nytaar/") ? Math.min(picture.naturalWidth, 470)
      : picture.src.includes("flyer_pinse_c.gif") ? 330 : picture.naturalWidth;
    card.style.setProperty("--party-front-image-width", `${width + 2}px`);
  };
  picture.addEventListener("load", fit, { once: true });
  if (picture.complete) fit();
  partiesGrid.append(card);
}
