const dunstPressPhotoSources = {
  romeo: {
    name: "Romeo + Juliet",
    logo: "/dunst/press/logoer/romeo_juliet_logo.jpg",
    article: "/dunst/press/2004/04_04_01_romeo_om_dunst/04_04_01_romeo_om_dunst.html",
    folder: "/dunst/press/2004/04_04_01_romeo_om_dunst/",
  },
  dansk: {
    name: "Dansk Magazine",
    logo: "/dunst/press/logoer/dansk_magazine_logo.jpg",
    article: "/dunst/press/2004/04_02_01_dansk/04_02_01_dansk.html",
    folder: "/dunst/press/2004/04_02_01_dansk/",
  },
};

const dunstPressProfilePhotos = {
  "/dunst/01_performere/03_dennis-agerblad/index.html": [
    { source: "dansk", files: ["01_dennis.jpg", "02_dennis.jpg"], alt: "Dennis Agerblad" },
  ],
  "/dunst/01_performere/05_hairwerk/index.html": [
    { source: "romeo", files: ["/dunst/01_performere/05_hairwerk/hasse_hairwerk_02.jpg"], alt: "Hairwerk poserer til Hasse Nielsens fotoserie", credit: "Photo: Hasse Nielsen." },
  ],
  "/dunst/01_performere/01_ramona_macho/index.html": [
    { source: "romeo", files: ["/dunst/01_performere/01_ramona_macho/hasse_ramona_05.jpg"], alt: "Nærportræt af Ramona Macho i sort kasket, store briller og krøllet gul paryk", credit: "Photo: Hasse Nielsen." },
    { source: "dansk", files: ["03_ramona.jpg", "10_ramona.jpg"], alt: "Ramona Macho" },
  ],
  "/dunst/01_performere/04_johnny_warehouse/index.html": [
    { source: "romeo", files: ["/dunst/01_performere/04_johnny_warehouse/hasse_johnny_02.jpg"], alt: "Nærportræt af Johnny Warehouse med nummer 73 på kasketten og sort bånd om halsen", credit: "Photo: Hasse Nielsen." },
  ],
  "/dunst/01_performere/08_the_thom/index.html": [
    { source: "romeo", files: ["romeo_julie_adam_thom.jpg"], alt: "mAdam og The Thom" },
    { source: "dansk", files: ["05_thom.jpg"], alt: "The Thom" },
  ],
  "/dunst/01_performere/09_stimulundia/index.html": [
    { source: "romeo", files: ["romeo_julie_dennis_stimu.jpg"], alt: "Dennis Agerblad og Stimulundia" },
    { source: "dansk", files: ["08_stimulundia.jpg"], alt: "Stimulundia" },
  ],
  "/dunst/01_performere/02_miss_fish/index.html": [
    { source: "dansk", files: ["06_fish.jpg"], alt: "Miss Fish" },
  ],
  "/dunst/01_performere/06_puta/index.html": [
    { source: "dansk", files: ["04_puta.jpg", "09_puta.jpg"], alt: "Puta" },
  ],
};

function dunstPressPhotoCards(profilePath) {
  const entries = dunstPressProfilePhotos[profilePath];
  if (!entries) return null;
  const gallery = document.createElement("div");
  gallery.className = "performer-press-gallery";
  for (const entry of entries) {
    const source = dunstPressPhotoSources[entry.source];
    const card = document.createElement("section");
    card.className = "performer-press-card";
    card.dataset.pressSource = entry.source;
    const logo = document.createElement("img");
    logo.src = source.logo;
    logo.alt = source.name;
    const photos = document.createElement("div");
    photos.className = "performer-press-images";
    for (const filename of entry.files) {
      const image = document.createElement("img");
      image.src = filename.startsWith("/") ? filename : `${source.folder}${filename}`;
      image.alt = entry.alt;
      image.loading = "lazy";
      photos.append(image);
    }
    const link = document.createElement("a");
    link.className = "performer-press-source";
    link.href = menuDestination(`https://dunst.dk${source.article}`);
    link.textContent = `Læs artiklen i ${source.name}`;
    card.append(dunstPressLogo(logo), photos);
    if (entry.credit) {
      const caption = document.createElement("p");
      caption.className = "performer-photo-caption";
      caption.textContent = entry.credit;
      card.append(caption);
    }
    card.append(link);
    gallery.append(card);
  }
  return gallery;
}

function dunstPressLogo(image) {
  const banner = document.createElement("div");
  banner.className = "performer-press-logo";
  image.removeAttribute("width");
  image.removeAttribute("height");
  banner.append(image);
  return banner;
}

function dunstPressArticlePath(anchor) {
  const url = new URL(anchor.href, location.href);
  if (url.origin !== location.origin && !["dunst.dk", "www.dunst.dk"].includes(url.hostname)) return "";
  const path = url.searchParams.get("path") || url.pathname;
  return /^\/dunst\/press\/20\d{2}\/.+\.html?$/.test(path) ? path : "";
}

const dunstPressPhotoCaptions = {
  "/dunst/01_performere/08_the_thom/index.html": {
    "hasse_thom_madam_01.jpg": "mAdam & The Thom",
    "hasse_johnny_thom_02.jpg": "The Thom & Johnny Warehouse",
  },
};

function dunstRemoveGenericProfileHeadings(root) {
  for (const heading of root.querySelectorAll("table.profile-card .head, .legacy-box-heading")) {
    const title = heading.textContent.trim().replace(/\s+/g, " ");
    if (!/^(?:dunst party|event|recommend|abroad)[:.]?$/i.test(title)) continue;
    const row = heading.closest("tr");
    if (row?.cells.length === 1) row.remove();
    else heading.remove();
  }
}

function dunstCleanProfileCaptions(root) {
  const sourceLinks = new WeakMap();
  const hasSourceLink = (card) => {
    if (!sourceLinks.has(card)) {
      sourceLinks.set(card, [...card.querySelectorAll("a[href]")].some((link) => {
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin && !["dunst.dk", "www.dunst.dk"].includes(url.hostname)) return false;
        const path = url.searchParams.get("path") || url.pathname;
        return /^\/dunst\/(?:02_parties|03_events|abroad|cafe|film|kunst|musik|press|radio|recommends)\//.test(path);
      }));
    }
    return sourceLinks.get(card);
  };
  const credit = /[ \t]*\b(?:photos?|fotos?|photographer|fotograf)(?:[ \t]*:[ \t]*|[ \t]+(?:by|af)[ \t]+)[^.!?\r\n]+[.]?/gi;
  const prefix = /(?:\b(?:dunst\s+party|recommend|event|abroad|music|musik|caf[ée]|film)[\s:–-]+)?\b(?:photos?|videos?|fotos?|billeder?)\s+(?:f\s*rom|fra)\s*:\s*/gi;
  const recommendation = /^\s*dunst\s+recommends?(?:\s+this\s+event)?\s*[:.]?\s*$/i;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const emptyLabels = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!parent.closest(".card-body, .performer-photo-caption, td:not(.head)") || parent.closest("a")) continue;
    let copy = recommendation.test(node.data) ? "" : node.data.replace(prefix, "");
    if (/\b(?:photo|foto)/i.test(copy)) {
      const card = parent.closest(".profile-card, .performer-press-card, .media-card, .dj-profile td");
      if (card && hasSourceLink(card)) {
        const withoutCredit = copy.replace(credit, "");
        if (withoutCredit !== copy) copy = withoutCredit.trim();
      }
    }
    if (copy === node.data) continue;
    node.data = copy;
    if (!copy.trim()) emptyLabels.push(node);
  }
  for (const text of emptyLabels) {
    if (!root.contains(text)) continue;
    const parent = text.parentElement;
    const label = parent.matches("b, strong, span, font, p") && !parent.textContent.trim() &&
      !parent.querySelector(":not(br)") ? parent : text;
    while (label.nextSibling?.nodeName === "BR" ||
           label.nextSibling?.nodeType === Node.TEXT_NODE && !label.nextSibling.textContent.trim()) {
      label.nextSibling.remove();
    }
    label.remove();
  }
}

function dunstNormalizePressCards(root, profilePath) {
  const logos = {
    romeo: [dunstPressPhotoSources.romeo.logo, "Romeo + Juliet"],
    bt: ["/dunst/press/logoer/bt_logo_00.gif", "B.T."],
    studio54: ["/dunst/press/logoer/out_and_about_logo.jpg", "Out & About"],
    brunch: ["/dunst/press/logoer/tv2-lorry_logo_00.gif", "TV 2 Lorry"],
    blokken: ["/dunst/press/2005/05_11_08_blokken/blokken_logo.gif", "Blokken på DR1"],
    mohawk: ["/dunst/press/2006/06_04_01_mohawk_beaver_nr_12/Mohawk_Beaver_front.jpg", "Mohawk Beaver"],
    filmhuset: ["/dunst/press/logoer/panbladet_logo.gif", "Panbladet"],
  };
  for (const card of root.querySelectorAll("table.profile-card, .legacy-box")) {
    const links = [...card.querySelectorAll("a[href]")].filter(link =>
      dunstPressArticlePath(link) && (link.textContent.trim() || link.querySelector("img")));
    if (!links.length) continue;
    const article = links.find(link => link.textContent.trim()) || links[0];
    const path = dunstPressArticlePath(article);
    let logo = card.querySelector('img[src*="/press/logoer/"]');
    const source = Object.keys(logos).find(key => path.includes(key));
    let publication = logo?.alt;
    if (source) {
      const [logoPath, name] = logos[source];
      logo ||= card.querySelector(`img[src$="${logoPath}"]`) || document.createElement("img");
      logo.src = logoPath;
      publication = name;
    } else if (logo) {
      const filename = new URL(logo.src).pathname.split("/").at(-1);
      const titles = [ [/panbladet/i, "Panbladet"], [/out_and_about/i, "Out & About"], [/citadel/i, "Citadel"],
        [/fyn/i, "Fyns Amts Avis"], [/zyritipp/i, "Züritipp"], [/ekstra/i, "Ekstra Bladet"],
        [/klubvaerelset/i, "Klubværelset på P1"], [/dr_uland/i, "DR P1"], [/free/i, "Free"] ];
      publication = titles.find(([pattern]) => pattern.test(filename))?.[1] || publication;
      if (/panbladet/i.test(filename)) logo.src = "/dunst/press/logoer/panbladet_logo.gif";
    }
    if (!logo) continue;
    logo.alt = publication || "Publikationens logo";

    const pressCard = document.createElement("section");
    pressCard.className = "performer-press-card performer-press-from-archive";
    if (card.classList.contains("performer-press-portrait-stack")) {
      pressCard.classList.add("performer-press-portrait-stack");
    }
    pressCard.append(dunstPressLogo(logo));
    const photos = document.createElement("div");
    photos.className = "performer-press-images";
    const captions = source === "romeo" ? dunstPressPhotoCaptions[profilePath] : null;
    for (const image of card.querySelectorAll("img")) {
      const caption = captions?.[new URL(image.src).pathname.split("/").at(-1)];
      if (!caption) { photos.append(image); continue; }
      const figure = document.createElement("figure");
      const copy = document.createElement("figcaption");
      copy.className = "performer-photo-caption";
      copy.textContent = caption;
      image.alt = caption;
      figure.append(image, copy);
      photos.append(figure);
    }
    if (photos.childElementCount) pressCard.append(photos);
    if (!captions) pressCard.append(...card.querySelectorAll(".performer-photo-caption"));

    const foot = document.createElement("div");
    foot.className = "performer-press-links";
    for (const link of card.querySelectorAll('a[href]:not(:has(img))')) {
      if (!dunstPressArticlePath(link) && link.textContent.trim()) foot.append(link.cloneNode(true));
    }
    const seen = new Set();
    for (const link of [article, ...links]) {
      if (seen.has(link.href) || (link !== article && !link.textContent.trim())) continue;
      seen.add(link.href);
      const item = document.createElement("a");
      item.href = link.href;
      item.textContent = source === "romeo" ? "Læs artiklen i Romeo + Juliet" :
        link.textContent.replace(/\s+/g, " ").trim() || (publication ? `Se indslaget fra ${publication}` : "Læs artiklen");
      foot.append(item);
    }
    pressCard.append(foot);
    card.replaceWith(pressCard);
  }
}

function updateRomeoArticle(root, path) {
  if (path !== dunstPressPhotoSources.romeo.article) return;
  const caption = root.querySelector('td:has(img[src$="/romeo_gruppe.jpg"]) > b');
  if (caption) caption.textContent = "performancegruppen dunst";
  const title = [...root.querySelectorAll('font[size="5"]')]
    .find(element => element.textContent.includes("Hvis du ikke kan"));
  for (const line of title?.querySelectorAll("br") || []) line.replaceWith(" ");
}
