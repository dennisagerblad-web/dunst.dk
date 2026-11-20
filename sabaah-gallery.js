const gallery = document.getElementById("sabaah-gallery");
const sabaahImages = window.DUNST_ARCHIVE_DATA["/dunst/02_parties/fest_23_sabaah/index.html"].gallery;

for (const [index, item] of sabaahImages.entries()) {
  const card = document.createElement("article");
  card.className = "media-card";
  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.alt || `Foto ${index + 1} fra Sabaah meets dunst`;
  image.loading = index < 3 ? "eager" : "lazy";
  card.append(image);

  const lines = (item.detail_lines || []).filter((line) => !["sabaah meets dunst", "15. september 2007"].includes(line.toLocaleLowerCase("da")));
  if (lines.length) {
    const body = document.createElement("div");
    body.className = "card-body";
    for (const line of lines) {
      const detail = document.createElement("p");
      detail.className = "original-photo-text";
      detail.textContent = line;
      body.append(detail);
    }
    card.append(body);
  }
  gallery.append(card);
}
