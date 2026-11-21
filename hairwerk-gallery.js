const hairwerkGallery = document.getElementById("hairwerk-gallery");
const hairwerkPhotoCredit = (source) => {
  const file = source.split("/").pop();
  return window.DUNST_ARCHIVE_DATA["/dunst/01_performere/05_hairwerk/index.html"].gallery
    .find((entry) => entry.image?.split("/").pop() === file)?.detail_lines
    ?.find((line) => /^(?:photo|foto)\s*:/i.test(line)) || "";
};
const hairwerkPressPhotos = dunstPressPhotoCards("/dunst/01_performere/05_hairwerk/index.html");
if (hairwerkPressPhotos) hairwerkGallery.append(hairwerkPressPhotos);
let currentYear;
let currentGrid;

for (const [index, item] of window.DUNST_PREVIEW_DATA.hairwerk.entries()) {
  const csdPhoto = item.url?.includes("/06_07_22_csd_berlin/")
    ? window.DUNST_RECOMMENDS_PHOTOS.profiles["05_hairwerk"] : null;
  if (csdPhoto) item.images = [csdPhoto.image];
  if (index === 0 && !item.year && !item.label && item.images.some((src) => src.includes("hasse_hairwerk_02.jpg"))) continue;
  if (item.year !== currentYear || !currentGrid) {
    currentYear = item.year;
    const section = document.createElement("section");
    section.className = "section hairwerk-year";
    currentGrid = document.createElement("div");
    currentGrid.className = "grid";
    if (currentYear) {
      const heading = document.createElement("h2");
      heading.className = "year-box";
      heading.textContent = `${currentYear}:`;
      section.append(heading);
    }
    section.append(currentGrid);
    hairwerkGallery.append(section);
  }

  const card = document.createElement("article");
  card.className = "media-card legacy-box";
  if (item.box_class) card.classList.add(`legacy-${item.box_class}`);
  if (item.box_bgcolor && /^#[0-9a-f]{6}$/i.test(item.box_bgcolor)) card.style.backgroundColor = item.box_bgcolor;
  if (item.box_heading) {
    const heading = document.createElement("h3");
    heading.className = "legacy-box-heading";
    heading.textContent = item.box_heading;
    card.append(heading);
  }

  const images = document.createElement("div");
  images.className = "legacy-box-images";
  for (const [imageIndex, source] of item.images.entries()) {
    const image = document.createElement("img");
    image.src = source;
    image.alt = csdPhoto?.alt || item.alt || `Hairwerk, billede ${index + 1}.${imageIndex + 1}`;
    image.loading = index < 3 ? "eager" : "lazy";
    images.append(image);
  }
  card.append(images);
  const credits = [...new Set(item.images.map(hairwerkPhotoCredit).filter(Boolean))];
  if (credits.length && !credits.every((credit) => (item.source_text || "").includes(credit))) {
    const caption = document.createElement("p");
    caption.className = "performer-photo-caption";
    caption.textContent = credits.join(" ");
    card.append(caption);
  }

  const body = document.createElement("div");
  body.className = "card-body";
  let source = item.source_text || "";
  if (item.box_heading && source.startsWith(item.box_heading)) source = source.slice(item.box_heading.length).trim();
  if (source) {
    const paragraph = document.createElement("p");
    const linkAt = item.url ? source.lastIndexOf(item.label) : -1;
    if (linkAt >= 0) {
      paragraph.append(document.createTextNode(source.slice(0, linkAt)));
      const link = document.createElement("a");
      link.href = menuDestination(item.url);
      link.textContent = item.label;
      paragraph.append(link, document.createTextNode(source.slice(linkAt + item.label.length)));
    } else paragraph.textContent = source;
    body.append(paragraph);
  }
  if (item.press_image && item.press_url) {
    const pressLink = document.createElement("a");
    pressLink.href = menuDestination(item.press_url);
    pressLink.setAttribute("aria-label", "Læs artiklen i Panbladet");
    const pressLogo = document.createElement("img");
    pressLogo.src = item.press_image;
    pressLogo.alt = "Panbladet";
    pressLogo.className = "hairwerk-press-logo";
    pressLink.append(pressLogo);
    body.append(pressLink);
  }

  if (body.childNodes.length) card.append(body);
  const fitCard = () => {
    const pictures = [...images.querySelectorAll("img")];
    const width = pictures.reduce((sum, picture) => sum + (picture.naturalWidth || 0), 0);
    if (width) card.style.setProperty("--legacy-image-width", `${width + Math.max(0, pictures.length - 1) * 8 + 2}px`);
  };
  for (const picture of images.querySelectorAll("img")) picture.addEventListener("load", fitCard, { once: true });
  fitCard();
  currentGrid.append(card);
}
dunstNormalizePressCards(hairwerkGallery);
dunstRemoveGenericProfileHeadings(hairwerkGallery);
