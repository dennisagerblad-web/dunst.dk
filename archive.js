const archiveParams = new URLSearchParams(location.search);
const archivePath = archiveParams.get("path") ||
  (document.body.hasAttribute("data-performance-home") ? "/dunst/01_performere/200_billeder_help.html" : null);
const hrFruRoot = "/dunst/02_parties/fest_18_hr_fru/";
if (archivePath?.startsWith(hrFruRoot + "kandidater/")) document.body.classList.add("hr-fru-candidates-page");
const archiveView = archiveParams.get("view");
Object.assign(window.DUNST_ARCHIVE_DATA, window.DUNST_RECOMMENDS.routes);
const froekenDennisPhoto = "assets/froken-verden-dennis-malle-720.jpg";
const froekenDennisAlt = "Dennis Agerblad optræder i færøsk nationaldragt, blond paryk og sorte støvler til Frøken Verden 2002";
for (const record of Object.values(window.DUNST_ARCHIVE_DATA)) {
  for (const item of record.gallery || []) {
    if (item.image.endsWith("/recommends/2002/froeken_verden/dennis_fest_01.jpg")) {
      item.image = froekenDennisPhoto;
      item.alt = froekenDennisAlt;
    }
  }
}
const recommendsPhotos = window.DUNST_RECOMMENDS_PHOTOS;
for (const [path, photos] of [
  [recommendsPhotos.path, recommendsPhotos.csd],
  ["/dunst/recommends/2006/06_05_11_smegma/index.html", recommendsPhotos.smegma],
]) {
  const record = window.DUNST_ARCHIVE_DATA[path];
  if (record) record.gallery = record.gallery
    .filter(item => !item.image.endsWith("/dennis_agerblad_video_00.jpg"))
    .concat(photos);
}
const archiveRecord = window.DUNST_ARCHIVE_DATA[archivePath];
const marilynName = "Marilyn ´Not´Monroe";
const correctMarilynName = (value) => value.replace(/Cunta Kinte/g, marilynName);
const marilynCorrectionPage = [
  "/dunst/abroad/2006/06_04_28_amsterdam/",
  "/dunst/02_parties/fest_18_hr_fru/",
  "/dunst/01_performere/21_marilyn_not_monroe/",
  "/dunst/opdater.html",
].some((prefix) => archivePath?.startsWith(prefix));
if (marilynCorrectionPage && archiveRecord) {
  for (const item of archiveRecord.gallery) {
    if (item.detail_lines) item.detail_lines = item.detail_lines.map(correctMarilynName);
  }
}
const partyGallery = /^\/dunst\/02_parties\/fest_[^/]+\/index\.html$/.test(archivePath) && archiveRecord?.gallery.length;
if (partyGallery) document.body.classList.add("parties", "party-gallery");
if (archivePath?.startsWith("/dunst/02_parties/")) document.body.classList.add("parties");
if (archivePath?.startsWith("/dunst/abroad/")) document.body.classList.add("abroad");
if (archivePath === "/dunst/kunst/kunst_i_dunst/index.html") document.body.classList.add("events-archive", "kunst-i-dunst-page");
for (const [prefix, className] of [
  ["/dunst/musik/", "music-archive"],
  ["/dunst/radio/", "radio-archive"],
  ["/dunst/03_events/", "events-archive"],
  ["/dunst/cafe/", "cafe-archive"],
  ["/dunst/film/", "film-archive"],
  ["/dunst/recommends/", "recommends-archive"],
]) if (archivePath?.startsWith(prefix)) document.body.classList.add(className);
const filmMenu = window.DUNST_PREVIEW_DATA.menu.find((item) => item.label === "dunst FILMS");
if (filmMenu?.children.some((item) => {
  if (!item.url || !archivePath) return false;
  const filmPath = new URL(item.url).pathname;
  return filmPath === archivePath ||
    (!filmPath.startsWith("/dunst/film/") && archivePath.startsWith(filmPath.slice(0, filmPath.lastIndexOf("/") + 1)));
})) {
  document.body.classList.add("film-archive");
}
if (archivePath === "/dunst/film/music_videos/index.html") document.body.classList.add("music-videos-index");
if (archivePath === "/dunst/03_events/2004/04_07_17_belgrade_pride/index.html") document.body.classList.add("belgrade-demo-page");
if (archivePath === "/dunst/02_parties/fest_06_lefreak/index.html") document.body.classList.add("lefreak-page");
if (archivePath === "/dunst/01_performere/guests/index.html") document.body.classList.add("guest-performers-overview");
if (archivePath === "/dunst/film/04_08_04_playing_tourist/index.html") document.body.classList.add("playing-tourist-page");
if (archivePath === "/dunst/film/kanal_dunst/index.html") document.body.classList.add("kanal-dunst-page");
if (archivePath === "/dunst/film/05_09_28_videomarathon/index.html") document.body.classList.add("videomarathon-page");
if (archivePath === "/dunst/film/ramonas_rejse/index.html") document.body.classList.add("ramonas-rejse-page");
if (archivePath === "/dunst/film/04_02_03_zullu/index.html") document.body.classList.add("zulu-bingo-page");
if (archivePath === "/dunst/film/skidt_kommer_til/index.html") document.body.classList.add("skidt-film-page");
if (archivePath?.startsWith("/dunst/film/dunst_bio/")) document.body.classList.add("dunst-bio-page");
if (["/dunst/film/cglff_2004/index.html", "/dunst/film/from_scratch/index.html"].includes(archivePath)) document.body.classList.add("film-festival-page");
if (archivePath === "/dunst/press/2002/02_08_16_tv2/video_tv2_foto.html") document.body.classList.add("tv2-news-page");
if (archivePath === "/dunst/press/2005/05_05_27_tv2-lorry_brunch/index.html") document.body.classList.add("tv2-brunch-page");
if (archivePath === "/dunst/02_parties/fest_23_sabaah/index.html") document.body.classList.add("sabaah-party-page");
if (archivePath === "/dunst/02_parties/fest_24_stubnitz/index.html") document.body.classList.add("stubnitz-party-page");
if (archivePath === "/dunst/02_parties/fest_11_helligaanden/index.html") document.body.classList.add("helligaanden-party-page");
if (archivePath === "/dunst/02_parties/fest_21_shave_your_pet/index.html") document.body.classList.add("shave-party-page");
if (archivePath === "/dunst/02_parties/fest_19_habibis_exil/index.html") document.body.classList.add("habibis-party-page");
if (archivePath === "/dunst/02_parties/fest_18_hr_fru/index.html") document.body.classList.add("hr-fru-party-page");
if (archivePath === "/dunst/press/2005/05_02_01_lene_pan/lene_pan.html") document.body.classList.add("hr-fru-panbladet-page");
if (archivePath === "/dunst/press/2004/04_09_01_alexis/04_09_01_alexis.html") document.body.classList.add("alexis-press-article");
if (archivePath === "/dunst/dj/dj_ny.html") document.body.classList.add("dj-front");
if (archivePath === "/dunst/about_us/index.html") document.body.classList.add("history-page");
if (archivePath === "/dunst/abroad/2003/03_11_15_shadow_people/index.html") document.body.classList.add("shadow-people-index");
if (archivePath === "/dunst/02_parties/fest_13_cross_dress/index.html") document.body.classList.add("cross-dress-page");
if (["fest_01_barbeque", "fest_02_nytaar", "fest_04_sommerfest"].some((name) => archivePath === `/dunst/02_parties/${name}/index.html`)) document.body.classList.add("early-party-page");
if (["/dunst/press/2005/05_06_01_pan_habibi/pan_habibi.html", "/dunst/press/2005/05_05_09_qx/habibis_qx.html"].includes(archivePath)) document.body.classList.add("habibis-press-page");
if (archivePath?.startsWith("/dunst/abroad/2003/ski_ferie/")) document.body.classList.add("ski-archive");
if (archivePath === "/dunst/musik/06_02_11_ungdomshuset/index.html") document.body.classList.add("odeur-concert");
const categoryFronts = new Map([
  ["/dunst/musik/index.html", "music-front"],
  ["/dunst/radio/index.html", "radio-front"],
  ["/dunst/03_events/index.html", "events-front"],
  ["/dunst/abroad/index.html", "abroad-front"],
  ["/dunst/cafe/index.html", "cafe-front"],
  ["/dunst/film/index.html", "film-front"],
  ["/dunst/01_performere/200_billeder_help.html", "performers-front"],
  ["/dunst/press/press.html", "press-front"],
  ["/dunst/recommends/index.html", "recommends-front"],
]);
const categoryFront = categoryFronts.get(archivePath);
if (categoryFront) document.body.classList.add("category-front", categoryFront);
if (archivePath?.startsWith("/dunst/calendar/")) document.body.classList.add("calendar-archive");
if (archivePath === "/dunst/0/backup_guestbook.html") document.body.classList.add("guestbook-archive");
if (archivePath === "/dunst/links/links.html") document.body.classList.add("links-archive");
if (archivePath === "/dunst/press/press_photos/press.html") document.body.classList.add("press-photos-archive");
if (/^\/dunst\/press\/(?:200[2-7]|2013)\//.test(archivePath || "") &&
    !/\/index\.html$/.test(archivePath)) document.body.classList.add("press-article-page");
if (archivePath?.startsWith("/nyhedsbrev/gamle_nyheder/")) document.body.classList.add("newsletter-archive");
if (!categoryFront && !document.body.matches(".guestbook-archive,.links-archive,.calendar-archive,.newsletter-archive")) document.body.classList.add("archive-detail");
const archiveBase = new URL("/", location.href);
const archiveTitle = document.getElementById("archive-title");
const archiveContent = document.getElementById("archive-content");
const archiveGallery = document.getElementById("archive-gallery");
const photoToGallery = new Map();
for (const [parent, record] of Object.entries(window.DUNST_ARCHIVE_DATA)) {
  for (const item of record.gallery) {
    if (!item.url) continue;
    const photo = new URL(item.url, location.href);
    if (["dunst.dk", "www.dunst.dk"].includes(photo.hostname) && photo.pathname.startsWith(parent.replace(/index\.html$/, "")) && photo.pathname.includes("/pages/") && /\.html?$/.test(photo.pathname)) {
      photoToGallery.set(photo.pathname, parent);
    }
  }
}

function archiveRoute(view, path = archivePath) {
  const target = new URL("archive.html", location.href);
  target.searchParams.set("path", path);
  if (view) target.searchParams.set("view", view);
  target.searchParams.set("v", previewBuild);
  return target.href;
}

function archiveAsset(path) {
  return new URL(path.replace(/^\//, ""), archiveBase);
}

function archiveImageRoute(path) {
  const route = new URL(archiveRoute(null, "/dunst/press/press_photos/press.html"));
  route.searchParams.set("view", "image");
  route.searchParams.set("src", path);
  return route.href;
}

function backFallback() {
  if (archivePath?.startsWith(hrFruRoot + "kandidater/") && /_frameset\.html$/.test(archivePath) &&
      !archivePath.endsWith("/kandidat_frameset.html")) {
    return archiveRoute(null, hrFruRoot + "kandidater/kandidat_frameset.html");
  }
  if (archivePath?.startsWith(hrFruRoot + "kandidater/") || archivePath?.startsWith(hrFruRoot + "kattegorier/")) {
    return archiveRoute(null, hrFruRoot + "index.html");
  }
  if (archivePath === "/mobil/help.html") return archiveRoute(null, "/dunst/dj/dj_ny.html");
  if (archivePath === "/dunst/recommends/index.html") return new URL("index.html", location.href).href;
  if (/^\/dunst\/abroad\/2003\/ski_ferie\/(09|10|11|12)\/index\.html$/.test(archivePath)) {
    return archiveRoute(null, "/dunst/abroad/2003/ski_ferie/ski_oversigt.html");
  }
  const fronts = [
    ["/dunst/recommends/", "/dunst/recommends/index.html"],
    ["/dunst/film/", "/dunst/film/index.html"],
    ["/dunst/03_events/", "/dunst/03_events/index.html"],
    ["/dunst/abroad/", "/dunst/abroad/index.html"],
    ["/dunst/cafe/", "/dunst/cafe/index.html"],
    ["/dunst/radio/", "/dunst/radio/index.html"],
    ["/dunst/musik/", "/dunst/musik/index.html"],
    ["/dunst/01_performere/", "/dunst/01_performere/200_billeder_help.html"],
    ["/dunst/press/", "/dunst/press/press.html"],
  ];
  const front = fronts.find(([prefix]) => archivePath?.startsWith(prefix))?.[1];
  if (front) return archiveRoute(null, front);
  if (archivePath?.startsWith("/dunst/02_parties/")) return new URL("parties.html", location.href).href;
  return new URL("index.html", location.href).href;
}

function addBackLink() {
  const isMenuDestination = window.DUNST_PREVIEW_DATA.menu.some((section) =>
    [section, ...section.children].some((item) => item.url && new URL(item.url).pathname === archivePath));
  if (categoryFront || /^\/dunst\/press\/(?:20\d\d)\/index\.html$/.test(archivePath) ||
      isMenuDestination ||
      document.body.matches(".newsletter-archive,.guestbook-archive,.links-archive") ||
      /^\/dunst\/01_performere\/(?:\d+_[^/]+|guests(?:\/[^/]+)?)\/index\.html$/.test(archivePath)) return;
  const link = document.createElement("a");
  link.className = "archive-back";
  link.href = backFallback();
  link.textContent = "← Tilbage";
  link.addEventListener("click", (event) => {
    const referrer = document.referrer && new URL(document.referrer);
    if (referrer && referrer.origin === location.origin && referrer.pathname.startsWith(new URL("./", location.href).pathname) && history.length > 1) {
      event.preventDefault();
      history.back();
    }
  });
  document.querySelector(".archive-shell").prepend(link);
}

function archiveItemTitle() {
  if (archivePath === "/nyhedsbrev/gamle_nyheder/index.html") return "dunst Newsletter - gamle nyhedsbreve";
  if (archivePath === "/nyhedsbrev/gamle_nyheder/right.html") return "Gamle nyhedsbreve";
  for (const section of window.DUNST_PREVIEW_DATA.menu) {
    for (const item of [section, ...section.children]) {
      if (item.url && new URL(item.url).pathname === archivePath) return item.label;
    }
  }
  return archivePath?.split("/").pop()?.replace(/\.html?$/i, "") || "Dunst-arkiv";
}

function localDestination(raw, sourceUrl) {
  const target = new URL(raw, sourceUrl);
  if (["dunst.dk", "www.dunst.dk"].includes(target.hostname)) {
    if (photoToGallery.has(target.pathname)) return archiveRoute("billeder", photoToGallery.get(target.pathname));
    if (/\.html?$/i.test(target.pathname)) return menuDestination(target.href);
    return archiveAsset(target.pathname).href + target.search + target.hash;
  }
  if (target.origin === location.origin && target.pathname.startsWith(archiveBase.pathname)) {
    if (/\.html?$/i.test(target.pathname)) {
      const originalPath = "/" + target.pathname.slice(archiveBase.pathname.length);
      if (photoToGallery.has(originalPath)) return archiveRoute("billeder", photoToGallery.get(originalPath));
      return menuDestination("https://dunst.dk" + originalPath + target.search + target.hash);
    }
  }
  return target.href;
}

function rewriteContent(body, sourceUrl) {
  const fragment = document.createDocumentFragment();
  for (const node of [...body.childNodes]) fragment.append(node.cloneNode(true));
  while (fragment.firstChild && (
    fragment.firstChild.nodeType === Node.COMMENT_NODE ||
    (fragment.firstChild.nodeType === Node.TEXT_NODE && !fragment.firstChild.textContent.trim()) ||
    fragment.firstChild.nodeName === "BR"
  )) fragment.firstChild.remove();
  for (const element of [...fragment.querySelectorAll("script,style,link,meta,base")]) element.remove();
  for (const link of [...fragment.querySelectorAll("a[href]")]) {
    if (!/^javascript:\s*(?:(?:window|parent)\.)?history\.back\s*\(/i.test(link.getAttribute("href")) ||
        !/^(?:tilbage|back)$/i.test(link.textContent.trim())) continue;
    const row = link.closest("tr");
    const table = row?.closest("table");
    link.remove();
    if (row && !row.textContent.trim() && !row.querySelector("img,video,audio,object,embed,iframe")) row.remove();
    if (table && !table.textContent.trim() && !table.querySelector("img,video,audio,object,embed,iframe")) table.remove();
  }
  for (const link of [...fragment.querySelectorAll("a")]) {
    if (/^print (?:denne side|this page)$/i.test(link.textContent.replace(/\s+/g, " ").trim())) {
      const parent = link.parentElement;
      const row = link.closest("tr");
      if (row && row.textContent.replace(/\s+/g, " ").trim() === link.textContent.replace(/\s+/g, " ").trim()) {
        const table = row.closest("table");
        row.remove();
        if (!table.rows.length) table.remove();
      }
      else if (parent?.textContent.trim() === link.textContent.trim() && [...parent.children].every((child) => child === link || child.tagName === "HR" || child.tagName === "BR")) parent.remove();
      else link.remove();
    }
  }
  const textNodes = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
  while (textNodes.nextNode()) {
    let copy = textNodes.currentNode.textContent.replace(/\bPrint (?:denne side|this page)\b/gi, "");
    if (marilynCorrectionPage) copy = correctMarilynName(copy);
    textNodes.currentNode.textContent = copy;
  }
  for (const element of fragment.querySelectorAll("*")) {
    for (const attribute of [...element.attributes]) {
      if (attribute.name.startsWith("on") || ["style", "srcdoc"].includes(attribute.name)) element.removeAttribute(attribute.name);
    }
    element.removeAttribute("nowrap");
    if (element.tagName !== "IMG") {
      element.removeAttribute("width");
      element.removeAttribute("height");
    }
    for (const name of ["src", "poster", "background"]) {
      const raw = element.getAttribute(name);
      if (!raw) continue;
      if (/^javascript:/i.test(raw)) element.removeAttribute(name);
      else element.setAttribute(name, localDestination(raw, sourceUrl));
    }
    if (element.tagName === "A" || element.tagName === "AREA") {
      const href = element.getAttribute("href");
      if (href && !href.startsWith("#")) {
        if (/^javascript:/i.test(href)) element.removeAttribute("href");
        else if (element.tagName === "AREA" && archivePath === "/dunst/press/press_photos/press.html" && /\.(?:jpe?g|png|gif|webp)$/i.test(new URL(href, sourceUrl).pathname)) {
          const imagePath = new URL(href, sourceUrl).pathname;
          const originalPath = imagePath.startsWith(archiveBase.pathname) ? "/" + imagePath.slice(archiveBase.pathname.length) : imagePath;
          element.setAttribute("href", archiveImageRoute(originalPath));
        } else element.setAttribute("href", localDestination(href, sourceUrl));
      }
      element.removeAttribute("target");
    }
    if (element.tagName === "FORM") {
      for (const button of element.querySelectorAll('[type="submit"]')) button.disabled = true;
    }
  }
  compactImageCaptionSpacing(fragment);
  return fragment;
}

function compactImageCaptionSpacing(root) {
  const inline = "a,b,strong,font,span,i,em,u";
  for (const image of root.querySelectorAll("img")) {
    if (image.matches('[align="left" i],[align="right" i]') ||
        /(?:pix_trans|extern_link|spacer)\./i.test(image.getAttribute("src") || "")) continue;
    let cursor = image;
    let next = cursor.nextSibling;
    const spacing = [];
    while (true) {
      if (!next) {
        const parent = cursor.parentElement;
        if (!parent?.matches(inline)) break;
        cursor = parent;
        next = cursor.nextSibling;
        continue;
      }
      if (next.nodeType === Node.COMMENT_NODE || next.nodeType === Node.TEXT_NODE && !next.textContent.trim() ||
          next.nodeName === "BR" || next.nodeType === Node.ELEMENT_NODE &&
          !next.matches("[id],[name]") && next.matches("p,span,b,strong,font,i,em,u") &&
          !next.textContent.trim() && !next.querySelector("img,iframe,video,audio,object,embed")) {
        spacing.push(next);
        next = next.nextSibling;
        continue;
      }
      if (next.nodeType === Node.ELEMENT_NODE && next.matches(inline) && next.firstChild) {
        cursor = next;
        next = next.firstChild;
        continue;
      }
      const isCopy = next.nodeName === "HR" || next.nodeType === Node.TEXT_NODE && next.textContent.trim() ||
        next.nodeType === Node.ELEMENT_NODE && next.matches("p,div,figcaption,h1,h2,h3,h4,h5,h6") &&
        next.textContent.trim() && !next.querySelector("img,table,iframe,video,object,embed");
      if (isCopy) {
        spacing.forEach(node => node.remove());
        image.classList.add("has-following-caption");
        if (next.nodeType === Node.ELEMENT_NODE) next.classList.add("image-caption-copy");
      }
      break;
    }
    const row = image.closest("tr");
    if (row && !row.textContent.trim()) {
      const caption = row.nextElementSibling;
      if (caption?.matches("tr") && caption.textContent.trim() && !caption.querySelector(".head,img,table,iframe,video,object,embed")) {
        for (const cell of caption.cells) {
          cell.classList.add("image-caption-cell");
          trimImageCaptionStart(cell);
        }
        image.classList.add("has-following-caption");
      }
    }
  }
}

function trimImageCaptionStart(container) {
  while (container.firstChild && (container.firstChild.nodeName === "BR" ||
    container.firstChild.nodeType === Node.COMMENT_NODE ||
    container.firstChild.nodeType === Node.TEXT_NODE && !container.firstChild.textContent.trim())) container.firstChild.remove();
  const first = container.firstElementChild;
  if (first && container.firstChild === first && first.matches("a,b,strong,font,span,i,em,u,p,div")) {
    first.classList.add("image-caption-copy");
    trimImageCaptionStart(first);
  }
}

function upgradeFrontImages() {
  if (!categoryFront) return;
  for (const image of archiveContent.querySelectorAll("img")) {
    const path = new URL(image.src, location.href).pathname;
    if (!path.startsWith(archiveBase.pathname)) continue;
    const original = "/" + path.slice(archiveBase.pathname.length);
    const full = window.DUNST_FRONT_IMAGES?.[original];
    if (full) image.src = full;
    if (full?.endsWith("/06_05_05_lars_von_trier/images/IMG_1157.jpg")) {
      image.alt = "Lars von Trier og Søde Car O’lina til 50-års fødselsdagen";
    }
    image.removeAttribute("width");
    image.removeAttribute("height");
  }
}

function unfoldFrontTable() {
  if (!["events-front", "abroad-front", "cafe-front"].includes(categoryFront)) return;
  const table = archiveContent.querySelector("table.ramme");
  if (!table || table.rows.length < 3) return;
  const firstRows = [...table.rows].slice(0, 2);
  const heading = firstRows[0].querySelector(".head");
  const introduction = firstRows[1].cells[0];
  if (!heading || !introduction) return;
  const panel = document.createElement("section");
  panel.className = "front-panel";
  const title = document.createElement("h1");
  title.className = "front-heading";
  title.textContent = heading.textContent.trim();
  const intro = document.createElement("div");
  intro.className = "front-intro";
  if (categoryFront === "events-front") {
    const first = document.createElement("p");
    first.textContent = introduction.querySelector("b")?.textContent.trim() || "";
    const rule = document.createElement("hr");
    const last = document.createElement("p");
    last.className = "front-intro-last";
    last.textContent = [...introduction.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent).join(" ").replace(/\s+/g, " ").trim();
    intro.append(first, rule, last);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = introduction.textContent.replace(/\s+/g, " ").trim();
    intro.append(paragraph);
  }
  const cards = document.createElement("div");
  cards.className = "front-cards";
  for (const row of [...table.rows].slice(2)) {
    for (const cell of row.cells) {
      let previous = null;
      for (const link of [...cell.querySelectorAll("a")].filter((a) => a.querySelector("img"))) {
        const range = document.createRange();
        if (previous) range.setStartAfter(previous);
        else range.setStart(cell, 0);
        range.setEndBefore(link);
        const caption = range.toString().replace(/\s+/g, " ").trim();
        const card = document.createElement("a");
        card.className = "front-card";
        card.href = link.href;
        const image = link.querySelector("img").cloneNode(true);
        if (categoryFront === "abroad-front" && image.src.includes("/queeruption_berlin/")) {
          image.src = archiveAsset("/dunst/abroad/2003/queeruption_berlin/2003_05_23_queerupti_10.jpg").href;
          image.alt = "Puta, Hairwerk og Miss Fish i Berlin";
          image.removeAttribute("width");
          image.removeAttribute("height");
        }
        if (categoryFront === "abroad-front" && image.src.includes("/03_11_15_shadow_people/")) {
          image.src = archiveAsset("/dunst/abroad/2003/03_11_15_shadow_people/shadow_people_02.jpg").href;
          image.alt = "The Shadow People samlet i Berlin";
          image.removeAttribute("width");
          image.removeAttribute("height");
        }
        card.append(image);
        if (categoryFront === "abroad-front" && image.src.includes("/05_10_07_be_queer_02/poster_00.jpg")) {
          image.src = archiveAsset("/dunst/abroad/2005/05_10_07_be_queer_02/poster_a.gif").href;
          image.alt = "Be Queer #2-plakatens overskrift";
          image.removeAttribute("width");
          image.removeAttribute("height");
          for (const [file, alt] of [
            ["poster_b.jpg", "Be Queer #2-plakatens collage"],
            ["poster_c.gif", "Be Queer #2-plakatens program"],
          ]) {
            const part = document.createElement("img");
            part.src = archiveAsset(`/dunst/abroad/2005/05_10_07_be_queer_02/${file}`).href;
            part.alt = alt;
            part.loading = "lazy";
            card.append(part);
          }
        }
        if (caption) {
          const text = document.createElement("span");
          text.className = "front-card-title";
          text.textContent = caption;
          card.append(text);
        }
        const fit = () => {
          if (image.naturalWidth) card.style.setProperty("--front-image-width", `${image.naturalWidth + 2}px`);
        };
        image.addEventListener("load", fit, { once: true });
        if (image.complete) fit();
        cards.append(card);
        previous = link;
      }
    }
  }
  if (categoryFront === "events-front") {
    const eventMenu = window.DUNST_PREVIEW_DATA.menu.find(item => item.label === "dunst EVENTS");
    const order = new Map(eventMenu.children.filter(item => item.url)
      .map((item, index) => [new URL(item.url).pathname, index]));
    const rank = card => order.get(new URL(card.href).searchParams.get("path")) ?? order.size;
    cards.append(...[...cards.children].sort((a, b) => rank(a) - rank(b)));
  }
  panel.append(title, intro);
  archiveContent.replaceChildren(panel, cards);
}

function unfoldPerformers() {
  if (categoryFront !== "performers-front") return;
  const booking = archiveContent.querySelector("table.ramme");
  const photoLinks = [...archiveContent.querySelectorAll("a")].filter((a) => a.querySelector("img"));
  if (!booking || !photoLinks.length) return;
  const bookingBox = document.createElement("div");
  bookingBox.className = "performers-booking";
  bookingBox.append(booking.cloneNode(true));
  const bookingHeading = bookingBox.querySelector("table.ramme .head");
  if (bookingHeading) bookingHeading.textContent = "dunst was active from 2001 to 2007.";
  const bookingCopy = bookingBox.querySelector("table.ramme tr:nth-child(2) td");
  if (bookingCopy) {
    const groupPhoto = document.createElement("img");
    groupPhoto.className = "performers-group-photo";
    groupPhoto.src = new URL("assets/hasse-dunst-group-1200.jpg", location.href).href;
    groupPhoto.width = 1200;
    groupPhoto.height = 876;
    groupPhoto.alt = "Gruppeportræt af dunst-performere i farverige kostumer foran en lys væg";
    const photoButton = document.createElement("button");
    photoButton.type = "button";
    photoButton.className = "performers-photo-open";
    photoButton.setAttribute("aria-label", "Vis gruppebilledet i fuld størrelse");
    photoButton.append(groupPhoto);
    const photoFigure = document.createElement("figure");
    photoFigure.className = "performers-photo-figure";
    const photoCredit = document.createElement("figcaption");
    photoCredit.className = "performers-photo-credit";
    photoCredit.textContent = "Photo: Hasse Nielsen";
    photoFigure.append(photoButton, photoCredit);
    const photoDialog = document.createElement("dialog");
    photoDialog.className = "performers-photo-dialog";
    photoDialog.setAttribute("aria-label", "Gruppebillede af dunst");
    const fullPhoto = document.createElement("img");
    fullPhoto.alt = groupPhoto.alt;
    fullPhoto.width = 4008;
    fullPhoto.height = 2928;
    const closePhoto = document.createElement("button");
    closePhoto.type = "button";
    closePhoto.className = "performers-photo-close";
    closePhoto.setAttribute("aria-label", "Luk billedet");
    closePhoto.textContent = "×";
    photoDialog.append(closePhoto, fullPhoto);
    document.body.append(photoDialog);
    photoButton.addEventListener("click", () => {
      fullPhoto.src = new URL("assets/hasse-dunst-group-full.jpg", location.href).href;
      photoDialog.showModal();
    });
    closePhoto.addEventListener("click", () => photoDialog.close());
    photoDialog.addEventListener("click", (event) => {
      if (event.target === photoDialog) photoDialog.close();
    });
    const bookingFont = bookingCopy.querySelector("font");
    const bookingList = bookingFont?.querySelector("ul");
    if (bookingFont?.firstChild?.nodeType === Node.TEXT_NODE && bookingList) {
      bookingFont.replaceChildren(bookingFont.firstChild, bookingList);
    }
    const copyPanel = document.createElement("div");
    copyPanel.className = "performers-booking-copy";
    copyPanel.append(...bookingCopy.childNodes);
    bookingCopy.replaceChildren(photoFigure, copyPanel);
  }
  const gallery = document.createElement("div");
  gallery.className = "performers-grid";
  const performerNames = new Map(window.DUNST_PREVIEW_DATA.menu.flatMap((section) => section.children || [])
    .filter((item) => item.url).map((item) => [new URL(menuDestination(item.url), location.href).href, item.label]));
  for (const link of photoLinks) {
    for (const image of link.querySelectorAll("img")) {
      const item = document.createElement("a");
      item.href = link.href;
      item.setAttribute("aria-label", performerNames.get(link.href) || "Åbn performersiden");
      const photo = image.cloneNode(true);
      photo.loading = "lazy";
      photo.alt = "";
      item.append(photo);
      gallery.append(item);
    }
  }
  for (const [name, profilePath, photoPath] of [
    ["Bob", "/dunst/01_performere/15_bob/index.html", "/dunst/02_parties/fest_16_coma/coma_29.jpg"],
    ["Signe", "/dunst/01_performere/27_signe/index.html", "/dunst/02_parties/fest_16_coma/coma_57.jpg"],
    ["Zanne Bizze", "/dunst/01_performere/14_zanne/index.html", "/dunst/01_performere/guests/zanne/zanne_arty_farty_01.jpg"],
  ]) {
    const item = document.createElement("a");
    item.href = archiveRoute(null, profilePath);
    item.setAttribute("aria-label", `Åbn profilen for ${name}`);
    const photo = document.createElement("img");
    photo.src = archiveAsset(photoPath).href;
    photo.alt = "";
    photo.loading = "lazy";
    item.append(photo);
    gallery.append(item);
  }
  archiveContent.replaceChildren(bookingBox, gallery);
  startPerformersScroll();
}

function startPerformersScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let position = window.scrollY;
  let direction = 1;
  let lastFrame = 0;
  let pauseUntil = 0;
  const pixelsPerSecond = 24;
  const pause = () => { pauseUntil = performance.now() + 12000; };
  window.addEventListener("wheel", pause, { passive: true });
  window.addEventListener("touchstart", pause, { passive: true });
  window.addEventListener("pointerdown", pause, { passive: true });
  window.addEventListener("keydown", pause);

  function move(time) {
    const elapsed = lastFrame ? Math.min((time - lastFrame) / 1000, 0.1) : 0;
    lastFrame = time;
    if (document.hidden || document.body.classList.contains("menu-open") || time < pauseUntil) {
      position = window.scrollY;
    } else {
      const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      position += direction * pixelsPerSecond * elapsed;
      if (position >= bottom) {
        position = bottom;
        direction = -1;
      } else if (position <= 0) {
        position = 0;
        direction = 1;
      }
      window.scrollTo(0, position);
    }
    window.requestAnimationFrame(move);
  }
  window.requestAnimationFrame(move);
}

async function showDjFront() {
  if (archivePath !== "/dunst/dj/dj_ny.html") return;
  const tables = [...archiveContent.querySelectorAll("table.ramme")];
  if (tables.length < 3) return;
  const intro = document.createElement("div");
  intro.className = "dj-intro";
  intro.append(tables[1]);
  const calendar = tables[1].querySelector("td:not(.head)");
  if (calendar) {
    const phone = calendar.querySelector("img");
    const help = [...calendar.querySelectorAll("a")].find((link) => /\/mobil\/help\.html$/.test(new URL(link.href, location.href).searchParams.get("path") || new URL(link.href, location.href).pathname));
    const copy = document.createElement("p");
    copy.append("tjek ");
    const address = document.createElement("strong");
    address.textContent = "mobil.dunst.dk";
    copy.append(address, " and see when we are playing.");
    const helpLine = document.createElement("p");
    helpLine.className = "dj-calendar-help";
    if (help) helpLine.append(help);
    calendar.replaceChildren(...[phone, copy, helpLine].filter(Boolean));
    phone?.removeAttribute("align");
  }
  const profiles = document.createElement("div");
  profiles.className = "dj-profile-grid";
  const pages = await Promise.all(tables.slice(2).map(async (table) => {
    const link = table.querySelector('a[href*="_frameset.html"]');
    const path = link && new URL(link.href, location.href).searchParams.get("path")?.replace(/_frameset\.html$/, ".html");
    if (!path) return null;
    const page = await readLegacyPage(archiveAsset(path));
    const profile = rewriteContent(page.doc.body, page.url).querySelector("table.ramme");
    if (!profile) return null;
    profile.classList.add("dj-profile");
    const head = profile.querySelector(".head[background]");
    if (head) {
      const name = document.createElement("h2");
      name.textContent = head.textContent.replace(/\s+/g, " ").trim();
      const image = document.createElement("img");
      image.src = head.getAttribute("background");
      image.alt = "";
      head.removeAttribute("background");
      head.classList.add("dj-profile-heading");
      head.replaceChildren(image, name);
    }
    return profile;
  }));
  for (const page of pages) {
    if (!page) continue;
    if (profiles.childElementCount) {
      const divider = document.createElement("hr");
      divider.className = "dj-profile-divider";
      profiles.append(divider);
    }
    profiles.append(page);
  }
  const title = document.createElement("h1");
  title.className = "performer-profile-title";
  title.textContent = "dunst DJ's";
  archiveContent.replaceChildren(title, intro, profiles);
}

function unfoldPress() {
  if (categoryFront !== "press-front") return;
  const table = archiveContent.querySelector("#Indhold > table.ramme");
  if (!table || table.rows.length < 3) return;
  const panel = document.createElement("section");
  panel.className = "front-panel press-panel";
  const title = document.createElement("h1");
  title.className = "front-heading";
  title.textContent = table.rows[0].cells[0]?.textContent.trim() || "";
  const intro = document.createElement("div");
  intro.className = "front-intro";
  intro.append(...[...table.rows[1].cells[0].childNodes].map((node) => node.cloneNode(true)));
  for (const note of intro.querySelectorAll("b")) {
    if (!/Vælg fra listen til højre\./i.test(note.textContent)) continue;
    if (note.nextSibling?.nodeName === "BR") note.nextSibling.remove();
    note.remove();
  }
  const introParts = [];
  let introText = "";
  const addIntroParagraph = () => {
    const copy = introText.replace(/\s+/g, " ").trim();
    if (copy) {
      const paragraph = document.createElement("p");
      paragraph.textContent = copy;
      introParts.push(paragraph);
    }
    introText = "";
  };
  for (const node of [...intro.childNodes]) {
    if (node.nodeName === "BR") addIntroParagraph();
    else if (node.nodeName === "HR") {
      addIntroParagraph();
      introParts.push(document.createElement("hr"));
    } else introText += node.textContent || "";
  }
  addIntroParagraph();
  intro.replaceChildren(...introParts);
  const logos = document.createElement("div");
  logos.className = "press-logos";
  const largerLogos = new Map([
    ["urban_logo_00.gif", "urban_logo.gif"],
    ["soendagsavisen_logo_00.gif", "soendagsavisen_logo.gif"],
    ["siegessaule_logo_00.gif", "siegessaule_logo.jpg"],
    ["citadel_logo_00.gif", "citadel_logo.gif"],
    ["cph_post_logo_00.gif", "cph_post_logo.gif"],
    ["tv2_logo_00.gif", "tv2_logo.gif"],
    ["tune_logo_00.gif", "tune_logo.gif"],
    ["metroxpress_logo_00.gif", "metroxpress_logo.jpg"],
    ["cum_and_c_logo_00.jpg", "cum_and_c_logo.jpg"],
    ["panbladet_00.gif", "panbladet_logo.gif"],
    ["fyn_amts_avis_00.gif", "fyn_amts_avis.jpg"],
    ["free_logo_00.gif", "free_logo.jpg"],
    ["out_and_about_logo_00.gif", "out_and_about_logo.jpg"],
    ["bronx_logo_00.gif", "bronx_logo.jpg"],
    ["homotropolis_logo_00.gif", "homotropolis_logo.gif"],
    ["qx_logo_00.gif", "qx_logo.gif"],
    ["dansk_magazine_logo_00.gif", "dansk_magazine_logo.jpg"],
    ["glrf_logo_00.gif", "glrf_logo.jpg"],
    ["information_00.gif", "information.gif"],
    ["romeo_juliet_logo_00.jpg", "romeo_juliet_logo.jpg"],
    ["ekstra_bladet_00.gif", "ekstra_bladet.gif"],
    ["politikken_00.gif", "politikken.gif"],
    ["zyritipp_00.jpg", "zyritipp.jpg"],
    ["klubvaerelset_logo_00.jpg", "klubvaerelset_logo.jpg"],
  ]);
  for (const row of [...table.rows].slice(2)) {
    for (const cell of row.cells) {
      if (!cell.querySelector("img")) continue;
      const logo = document.createElement("div");
      logo.className = "press-logo";
      logo.append(...[...cell.childNodes].map((node) => node.cloneNode(true)));
      for (const image of logo.querySelectorAll("img")) {
        const oldName = new URL(image.src).pathname.split("/").at(-1);
        if (largerLogos.has(oldName)) image.src = archiveAsset(`/dunst/press/logoer/${largerLogos.get(oldName)}`).href;
        image.removeAttribute("width");
        image.removeAttribute("height");
      }
      logos.append(logo);
    }
  }
  panel.append(title, intro, logos);
  table.replaceWith(panel);
  const photo = [...archiveContent.querySelectorAll("a:has(img)")]
    .find((link) => new URL(link.href).searchParams.get("path") === "/dunst/press/press_photos/press.html");
  if (photo) {
    photo.classList.add("press-photo-link");
    photo.querySelector("img")?.removeAttribute("align");
  }
}

function pressYearRoute(year, articlePath) {
  const route = new URL(archiveRoute(null, `/dunst/press/${year}/index.html`));
  route.searchParams.set("article", articlePath);
  return route.href;
}

function fitPressArticle(container) {
  const table = container.querySelector(":scope > table");
  if (!table) return;
  table.classList.add("press-article-table");
  const images = [...table.querySelectorAll("img")];
  const copyLength = table.textContent.replace(/\s+/g, " ").trim().length;
  const fit = () => {
    const widest = Math.max(0, ...images.map((image) => image.naturalWidth || Number(image.getAttribute("width")) || 0));
    const width = copyLength > 900 ? 800 : Math.min(800, Math.max(320, widest ? widest + 32 : 500));
    table.style.setProperty("--press-article-width", `${width}px`);
  };
  for (const image of images) image.addEventListener("load", fit, { once: true });
  fit();
}

function addTv2BrunchVideo(container) {
  if (container.querySelector('iframe[src*="NNK3iHLIqYY"]')) return;
  const video = document.createElement("div");
  video.className = "tv2-featured-video";
  const frame = document.createElement("iframe");
  frame.src = "https://www.youtube-nocookie.com/embed/NNK3iHLIqYY";
  frame.title = "TV2-Lorry Brunch";
  frame.loading = "lazy";
  frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  video.append(frame);
  container.prepend(video);
}

async function showPressYear(year) {
  document.body.classList.add("press-year-page");
  const index = document.createElement("details");
  index.className = "press-year-index";
  const summary = document.createElement("summary");
  summary.textContent = `Se indslag fra ${year}`;
  const links = document.createElement("nav");
  links.setAttribute("aria-label", `Presseindslag fra ${year}`);
  const heading = document.createElement("h2");
  heading.textContent = `Press ${year}`;
  heading.className = "press-year-title";
  const articlePaths = [];

  if (year === "2013") {
    const articlePath = "/dunst/press/2013/article.html";
    const month = document.createElement("section");
    month.className = "press-year-month";
    month.innerHTML = '<h3>Marts</h3><div class="press-year-month-items"></div>';
    const item = document.createElement("div");
    item.className = "press-year-item";
    const link = document.createElement("a");
    link.href = pressYearRoute(year, articlePath);
    link.textContent = "Copenhagen Performance Art Troupe – Dunst";
    item.append(link);
    month.querySelector(".press-year-month-items").append(item);
    links.append(month);
    articlePaths.push(articlePath);
  } else {
    const { doc, url } = await readLegacyPage(archiveAsset(`/dunst/press/${year}/right.html`));
    const menu = rewriteContent(doc.body, url);
    const table = menu.querySelector("table");
    if (!table) throw new Error(`Presselisten for ${year} blev ikke fundet.`);
    const months = document.createElement("div");
    months.className = "press-year-months";
    let monthItems = null;
    for (const row of [...table.rows].slice(1)) {
      const cell = row.cells[0];
      if (!cell) continue;
      if (cell.querySelector("hr")) {
        const month = document.createElement("section");
        month.className = "press-year-month";
        const monthTitle = document.createElement("h3");
        monthTitle.textContent = cell.textContent.replace(/\s+/g, " ").trim();
        monthItems = document.createElement("div");
        monthItems.className = "press-year-month-items";
        month.append(monthTitle, monthItems);
        months.append(month);
      } else if (cell.querySelector("a[href], img")) {
        if (!monthItems) {
          const month = document.createElement("section");
          month.className = "press-year-month";
          monthItems = document.createElement("div");
          monthItems.className = "press-year-month-items";
          month.append(monthItems);
          months.append(month);
        }
        const item = document.createElement("div");
        item.className = "press-year-item";
        item.append(...[...cell.childNodes]);
        while (item.lastElementChild?.tagName === "BR") item.lastElementChild.remove();
        monthItems.append(item);
      }
    }
    for (const link of months.querySelectorAll("a[href]")) {
      const target = new URL(link.href, location.href);
      if (year === "2006" && target.hostname === "www.information.dk" &&
          target.pathname === "/Indgang.php") {
        link.closest(".press-year-item")?.remove();
        continue;
      }
      const path = target.searchParams.get("path");
      if (path?.startsWith(`/dunst/press/${year}/`) && /\.html?$/.test(path)) {
        link.href = pressYearRoute(year, path);
        articlePaths.push(path);
      } else if (target.origin !== location.origin) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    }
    for (const month of months.querySelectorAll(".press-year-month")) {
      if (!month.querySelector(".press-year-item")) month.remove();
    }
    links.append(months);
  }

  const requested = archiveParams.get("article");
  const newest = [...articlePaths].sort((a, b) => {
    const date = (path) => path.match(/\/(\d{2})_(\d{2})_(\d{2})_/)?.slice(1).join("") || "";
    return date(b).localeCompare(date(a));
  })[0];
  const selected = articlePaths.includes(requested) ? requested : newest;
  if (!selected) throw new Error(`Der er ingen arkiverede presseindslag fra ${year}.`);
  const article = document.createElement("div");
  article.className = "press-year-article";
  index.append(summary, links);
  const layout = document.createElement("div");
  layout.className = "press-year-layout";
  const navigation = document.createElement("section");
  navigation.className = "press-year-navigation";
  navigation.append(heading, index);
  layout.append(navigation, article);
  archiveContent.replaceChildren(layout);
  const narrow = matchMedia("(max-width: 900px), (max-width: 1024px) and (max-height: 500px)");
  index.open = !narrow.matches;
  narrow.addEventListener("change", (event) => { index.open = !event.matches; });
  let activeArticle = null;
  let selectionToken = 0;
  async function selectArticle(path, updateHistory = false) {
    const token = ++selectionToken;
    const source = await readLegacyPage(archiveAsset(path));
    if (token !== selectionToken) return;
    article.replaceChildren(rewriteContent(source.doc.body, source.url));
    if (path === "/dunst/press/2005/05_05_27_tv2-lorry_brunch/index.html") addTv2BrunchVideo(article);
    fitPressArticle(article);
    for (const link of links.querySelectorAll("a[href]")) {
      if (new URL(link.href, location.href).searchParams.get("article") === path) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
    activeArticle = path;
    article.scrollTop = 0;
    if (updateHistory) history.pushState(null, "", pressYearRoute(year, path));
    if (updateHistory && narrow.matches) {
      index.open = false;
      article.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  links.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    const path = link && new URL(link.href, location.href).searchParams.get("article");
    if (!articlePaths.includes(path)) return;
    event.preventDefault();
    if (path !== activeArticle) void selectArticle(path, true);
  });
  addEventListener("popstate", () => {
    const path = new URLSearchParams(location.search).get("article");
    void selectArticle(articlePaths.includes(path) ? path : newest);
  });
  await selectArticle(selected);
  if (requested === selected && !narrow.matches) {
    const current = links.querySelector('a[aria-current="page"]');
    if (current) {
      const item = current.closest(".press-year-item") || current;
      index.scrollTop += item.getBoundingClientRect().top - index.getBoundingClientRect().top - index.clientHeight / 2;
    }
  }
}

function sizeArchiveTables() {
  if (!document.body.classList.contains("archive-detail")) return;
  const top = archiveContent.querySelector(":scope > table.ramme");
  for (const table of archiveContent.querySelectorAll("table.ramme")) {
    for (const cell of table.querySelectorAll("td:not(.head)")) {
      if (cell.closest("table.ramme") !== table || !cell.querySelector("img,iframe,object,embed,video,audio")) continue;
      const textNodes = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
      while (textNodes.nextNode()) {
        const node = textNodes.currentNode;
        if (node.textContent.trim() && node.parentElement.closest("table") === table) {
          cell.classList.add("archive-copy-cell");
          break;
        }
      }
    }
    const photos = [...table.querySelectorAll("img")].filter((image) => image.closest("table.ramme") === table);
    const bodyText = [...table.rows].filter((row) => !row.querySelector(".head"))
      .map((row) => row.textContent.trim()).join(" ").trim();
    if (table !== top && photos.length && bodyText) table.classList.add("photo-caption-box");
    const fitToImages = () => {
      if (partyGallery && table === top) return;
      const widest = Math.max(0, ...[...table.rows].map((row) => [...row.querySelectorAll("img")]
        .filter((image) => image.closest("table.ramme") === table)
        .reduce((sum, image) => sum + (image.naturalWidth || Number(image.getAttribute("width")) || 0), 0)));
      const width = widest ? widest + (document.body.classList.contains("events-archive") || document.body.classList.contains("abroad") || table.querySelector(".archive-copy-cell") ? 26 : 16) : 800;
      table.style.setProperty("--archive-table-width", `${width}px`);
    };
    for (const image of photos) if (!image.complete) image.addEventListener("load", fitToImages, { once: true });
    fitToImages();
  }
  if (partyGallery) archiveContent.querySelector("table.ramme")?.style.setProperty("--archive-table-width", "800px");
}

function fitPartyTopTable() {
  if (!partyGallery || document.body.classList.contains("cross-dress-page")) return;
  const table = archiveContent.querySelector(":scope > table.ramme");
  if (!table) return;
  const images = [...table.querySelectorAll("img")].filter((image) =>
    image.closest("table.ramme") === table && !image.closest("details"));
  const widthOf = (image) => image.naturalWidth || Number(image.getAttribute("width")) || 0;
  const fit = () => {
    const widths = images.map(widthOf).filter((width) => width > 1);
    const paired = table.querySelector(".sabaah-flyers, .party-top-art-pair, .lefreak-flyers");
    const pairWidths = paired ? [...paired.querySelectorAll("img")].map(widthOf).filter((width) => width > 1) : [];
    const pairWidth = pairWidths.length ? pairWidths.reduce((sum, width) => sum + width, 0) +
      (pairWidths.length - 1) * 16 : 0;
    const contentWidth = Math.max(0, ...widths, pairWidth);
    table.style.setProperty("--archive-table-width", `${contentWidth ? contentWidth +
      (table.querySelector(".archive-copy-cell") ? 26 : 16) : 800}px`);
  };
  for (const image of images) if (!image.complete) image.addEventListener("load", fit, { once: true });
  fit();
}

function markArchiveDates() {
  const month = "(?:januar|februar|marts|martz|march|april|maj|may|juni|june|juli|july|august|augst|september|oktober|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|okt|nov|dec)";
  const days = "(?:\\d{1,2}\\.?(?:\\s*(?:[+&,/–-]|\\s)\\s*\\d{1,2}\\.?)*)?";
  const writtenDate = new RegExp(`^${days}\\s*${month}\\.?\\s*(?:[-–]\\s*)?(?:(?:19|20)\\d{2})?$`, "i");
  const datedTables = new Map();
  for (const cell of archiveContent.querySelectorAll(".head")) {
    const value = cell.textContent.replace(/\s+/g, " ").trim();
    if (!/^(?:19|20)\d{2}$/.test(value) && !writtenDate.test(value) && !/^\d{1,2}[.\/-]\d{1,2}(?:\s*[-–]\s*(?:19|20)\d{2}|[.\/-](?:19|20)?\d{2})?$/.test(value)) continue;
    cell.classList.add("archive-date");
    for (const breakNode of cell.querySelectorAll("br")) breakNode.replaceWith(" ");
    const table = cell.closest("table");
    if (table) datedTables.set(table, (datedTables.get(table) || 0) + 1);
  }
  for (const [table, count] of datedTables) {
    if (count < 3 || table.closest(".calendar-archive")) continue;
    const scroller = document.createElement("div");
    scroller.className = "date-table-scroll";
    table.style.setProperty("--date-table-width", `${count * 135}px`);
    table.replaceWith(scroller);
    scroller.append(table);
  }
}

function enhanceCrossDress() {
  if (archivePath !== "/dunst/02_parties/fest_13_cross_dress/index.html") return;
  const table = archiveContent.querySelector("table.ramme");
  const artCell = table?.rows[1]?.cells[1];
  if (!artCell) return;
  artCell.classList.add("cross-dress-art-cell");
  table.rows[3]?.cells[0]?.classList.add("cross-dress-centered");
  const slideshow = document.createElement("div");
  slideshow.className = "cross-dress-slideshow";
  slideshow.setAttribute("role", "img");
  slideshow.setAttribute("aria-label", "Ti skiftende tegninger af korsfæstede figurer");
  const frames = Array.from({ length: 10 }, (_, index) => {
    const frame = document.createElement("img");
    frame.src = archiveAsset(`/dunst/02_parties/fest_13_cross_dress/tegning_${String(index + 1).padStart(2, "0")}.gif`).href;
    frame.alt = "";
    frame.className = index === 0 ? "active" : "";
    frame.width = 244;
    frame.height = 325;
    slideshow.append(frame);
    return frame;
  });
  artCell.replaceChildren(slideshow);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let current = 0;
    window.setInterval(() => {
      frames[current].classList.remove("active");
      current = (current + 1) % frames.length;
      frames[current].classList.add("active");
    }, 160);
  }
  const lineupCell = table.rows[4]?.cells[0];
  const source = lineupCell?.querySelector("table");
  const columns = source && [...source.rows].filter((row) => row.cells.length === 2 && row.textContent.trim())
    .flatMap((row) => [...row.cells]);
  if (columns?.length === 4) {
    const details = document.createElement("details");
    details.className = "party-lineup-details";
    const summary = document.createElement("summary");
    summary.textContent = "Se DJs og performere";
    const grid = document.createElement("div");
    grid.className = "party-lineup-grid";
    for (const cell of columns) {
      const column = document.createElement("div");
      column.append(...cell.childNodes);
      grid.append(column);
    }
    details.append(summary, grid);
    lineupCell.replaceChildren(details);
  }
}

function foldSkoegeredenLineup() {
  if (archivePath !== "/dunst/02_parties/fest_12_skoegereden/index.html") return;
  const row = archiveContent.querySelector(":scope > table.ramme")?.rows[2];
  if (!row || row.cells.length !== 2) return;
  const details = document.createElement("details");
  details.className = "party-lineup-details";
  const summary = document.createElement("summary");
  summary.textContent = "Se DJs og performere";
  const grid = document.createElement("div");
  grid.className = "party-lineup-grid";
  for (const cell of [...row.cells]) {
    const column = document.createElement("div");
    column.append(...cell.childNodes);
    grid.append(column);
  }
  details.append(summary, grid);
  row.cells[0].colSpan = 2;
  row.cells[0].append(details);
  row.cells[1].remove();
}

function enhanceSabaahFlyers() {
  if (archivePath !== "/dunst/02_parties/fest_23_sabaah/index.html") return;
  const tables = [...archiveContent.querySelectorAll(":scope > table.ramme")];
  if (tables.length < 2) return;
  const firstCell = tables[0].rows[1]?.cells[0];
  const landscape = tables[0].querySelector('img[src*="dunst_sabaah.jpg"]');
  const portrait = tables[1].querySelector('img[src$="/dunst.jpg"]');
  if (!firstCell || !landscape || !portrait) return;
  const flyers = document.createElement("div");
  flyers.className = "sabaah-flyers";
  flyers.append(portrait, landscape);
  firstCell.replaceChildren(flyers);
  tables[1].remove();
  for (const breakNode of archiveContent.querySelectorAll(":scope > br")) breakNode.remove();
}

function enhancePartyTopArt() {
  if (archivePath === "/dunst/02_parties/fest_14_silo_01/index.html") {
    archiveContent.querySelector('table.ramme img[src$="/silo_01b.jpg"]')?.remove();
  }
  if (archivePath === "/dunst/02_parties/fest_11_helligaanden/index.html") {
    const table = archiveContent.querySelector("table.ramme");
    const heading = table?.querySelector(".head");
    if (heading) heading.textContent = "Helligåndsfesten";
    const cell = table?.rows[1]?.cells[0];
    const pictures = cell && [...cell.querySelectorAll("img")];
    if (pictures?.length === 2) {
      const pair = document.createElement("div");
      pair.className = "party-top-art-pair";
      pair.append(...pictures);
      cell.replaceChildren(pair);
    }
  }
  if (archivePath === "/dunst/02_parties/fest_21_shave_your_pet/index.html") {
    const tables = [...archiveContent.querySelectorAll(":scope > table.ramme")];
    const firstCell = tables[0]?.rows[1]?.cells[0];
    const firstImage = firstCell?.querySelector("img");
    const blackAndWhitePoster = archiveContent.querySelector(':scope > table.ramme img[src$="/gkt_flyer_sort.jpg"]');
    if (!firstImage) return;
    const download = firstCell.querySelector('a[href*="GTK-poster_a4.pdf"]');
    const pair = document.createElement("div");
    pair.className = "party-top-art-pair shave-flyers";
    const first = document.createElement("div");
    first.append(firstImage);
    if (download) first.append(download);
    pair.append(first);
    firstCell.replaceChildren(pair);
    blackAndWhitePoster?.closest("table.ramme")?.remove();
    for (const breakNode of archiveContent.querySelectorAll(":scope > br")) breakNode.remove();
  }
}

async function enhanceLeFreak() {
  if (archivePath !== "/dunst/02_parties/fest_06_lefreak/index.html") return;
  const table = archiveContent.querySelector(":scope > table.ramme");
  const flyerCell = table?.rows[1]?.cells[0];
  const front = flyerCell?.querySelector("img");
  if (!front) return;
  const headingRow = table.rows[0];
  const heading = headingRow?.cells[0];
  const date = headingRow?.cells[1];
  if (heading && date) {
    const title = document.createElement("span");
    title.textContent = heading.textContent.trim();
    const time = document.createElement("time");
    time.textContent = date.textContent.trim();
    const headingInner = document.createElement("div");
    headingInner.className = "lefreak-heading-inner";
    headingInner.append(title, time);
    heading.classList.add("lefreak-heading");
    heading.colSpan = 2;
    heading.replaceChildren(headingInner);
    date.remove();
  }
  const backPage = await readLegacyPage(archiveAsset("/dunst/02_parties/fest_06_lefreak/lefreak_01b.html"));
  const lineup = [...backPage.doc.querySelectorAll("table")].at(-1);
  if (!lineup) return;
  const flyers = document.createElement("div");
  flyers.className = "lefreak-flyers";
  for (const [image, caption] of [
    [front, "Flyer - Frontside"],
    [document.createElement("img"), "Flyer - Backside"],
  ]) {
    if (caption === "Flyer - Backside") image.src = archiveAsset("/dunst/02_parties/fest_06_lefreak/flyer_fest_06_back_b.jpg").href;
    image.removeAttribute("width");
    image.removeAttribute("height");
    image.alt = caption;
    const figure = document.createElement("figure");
    const text = document.createElement("figcaption");
    text.textContent = caption;
    figure.append(image, text);
    flyers.append(figure);
  }
  const details = document.createElement("details");
  details.className = "lefreak-story";
  const summary = document.createElement("summary");
  summary.textContent = "læs om festen";
  const story = document.importNode(lineup, true);
  story.className = "lefreak-lineup";
  details.append(summary, story);
  flyerCell.replaceChildren(flyers, details);
  table.rows[2]?.remove();
}

function enhanceGayNightCabaret() {
  if (archivePath !== "/dunst/cafe/2002/gay_night_cabaret/index.html") return;
  const table = archiveContent.querySelector(":scope > table.ramme");
  const cell = table?.rows[1]?.cells[0];
  const front = cell?.querySelector("img");
  if (!front) return;
  table.classList.add("gay-cabaret-top");
  const back = document.createElement("img");
  back.src = archiveAsset("/dunst/cafe/2002/gay_night_cabaret/flyer_bagside.jpg").href;
  back.alt = "Gay Night Cabaret-flyerens bagside";
  const pair = document.createElement("div");
  pair.className = "gay-cabaret-flyers";
  for (const [image, caption] of [
    [front, ""],
    [back, archiveRecord?.gallery.find((item) => item.image.endsWith("/flyer_bagside.jpg"))?.detail_lines.at(-1) || ""],
  ]) {
    image.removeAttribute("width");
    image.removeAttribute("height");
    const figure = document.createElement("figure");
    figure.append(image);
    if (caption) {
      const text = document.createElement("p");
      text.className = "gay-cabaret-caption";
      text.textContent = caption;
      figure.append(text);
    }
    pair.append(figure);
  }
  cell.replaceChildren(pair);
}

function collapseDemonstration() {
  if (archivePath !== "/dunst/03_events/2004/04_07_17_belgrade_pride/index.html") return;
  const table = archiveContent.querySelector(":scope > table.ramme");
  if (!table || table.rows.length < 4) return;
  const details = document.createElement("details");
  details.className = "event-story-details";
  const summary = document.createElement("summary");
  summary.textContent = "læs om demonstrationen";
  const story = document.createElement("table");
  story.className = "ramme event-story-table";
  const body = document.createElement("tbody");
  body.append(...[...table.rows].slice(2));
  story.append(body);
  details.append(summary, story);
  const row = table.insertRow();
  const cell = row.insertCell();
  cell.colSpan = 2;
  cell.append(details);
}

function adjustKunstIDunst() {
  if (archivePath !== "/dunst/kunst/kunst_i_dunst/index.html") return;
  const table = archiveContent.querySelector(":scope > table.ramme");
  const flyer = table?.querySelector('img[src*="kunst_i_dunst_01_flyer.gif"]');
  const cell = flyer?.closest("td");
  if (!cell) return;
  cell.remove();
  for (const row of [...table.rows].slice(1)) {
    if (row.cells[0]) row.cells[0].colSpan = 2;
  }
  const copy = table.rows[1]?.querySelector("p");
  while (copy?.lastChild && (copy.lastChild.nodeName === "BR" ||
      copy.lastChild.nodeType === Node.TEXT_NODE && !copy.lastChild.textContent.trim())) copy.lastChild.remove();
  const exhibition = [...(copy?.childNodes || [])].find((node) =>
    node.nodeType === Node.ELEMENT_NODE && node.matches("b, strong") && /Sommerudstilling/.test(node.textContent));
  if (!exhibition) return;
  const columns = document.createElement("div");
  columns.className = "kunst-intro-columns";
  const workshop = document.createElement("div");
  const show = document.createElement("div");
  let secondColumn = false;
  for (const node of [...copy.childNodes]) {
    if (node === exhibition) secondColumn = true;
    (secondColumn ? show : workshop).append(node);
  }
  for (const column of [workshop, show]) {
    while (column.lastChild && (column.lastChild.nodeName === "BR" ||
      column.lastChild.nodeType === Node.TEXT_NODE && !column.lastChild.textContent.trim())) column.lastChild.remove();
  }
  const contactRow = table.rows[2];
  const contactCell = contactRow?.cells[0];
  if (contactCell) {
    const contact = document.createElement("p");
    contact.className = "kunst-contact";
    contact.append(...contactCell.childNodes);
    show.append(contact);
    contactRow.remove();
  }
  columns.append(workshop, show);
  copy.append(columns);
  for (const breakNode of archiveContent.querySelectorAll(":scope > br")) breakNode.remove();
}

function enhanceHrFruTop() {
  if (archivePath !== hrFruRoot + "index.html") return;
  const table = archiveContent.querySelector("table.ramme");
  const cell = table?.rows[1]?.cells[0];
  const originalFlyer = cell?.querySelector("img");
  if (!originalFlyer) return;
  const banner = document.createElement("img");
  banner.src = archiveAsset(hrFruRoot + "hr_fru_banner_01.gif").href;
  banner.alt = "Animeret HR & FRU dunst-banner";
  const story = document.createElement("details");
  story.className = "hr-fru-story";
  const summary = document.createElement("summary");
  summary.textContent = "Læs mere om festens regler og info";
  const storyTable = document.createElement("table");
  storyTable.className = "ramme";
  const storyBody = document.createElement("tbody");
  for (const row of [...table.rows].slice(2)) storyBody.append(row);
  for (const cell of storyBody.querySelectorAll("td[nowrap]")) cell.removeAttribute("nowrap");
  storyTable.append(storyBody);
  story.append(summary, storyTable);
  const artwork = document.createElement("div");
  artwork.className = "hr-fru-top-art";
  artwork.append(banner, originalFlyer, story);
  cell.replaceChildren(artwork);
  cell.classList.add("archive-copy-cell");
}

function collapseLongPartyIntro() {
  if (!/^\/dunst\/02_parties\/fest_[^/]+\/index\.html$/.test(archivePath) ||
      [hrFruRoot + "index.html", "/dunst/02_parties/fest_06_lefreak/index.html"].includes(archivePath)) return;
  const table = archiveContent.querySelector(":scope > table.ramme");
  if (!table) return;
  const label = `Læs mere om ${archiveItemTitle()}`;
  const createDetails = () => {
    const details = document.createElement("details");
    details.className = "party-intro-details";
    const summary = document.createElement("summary");
    summary.textContent = label;
    details.append(summary);
    return details;
  };
  for (const row of [...table.rows].slice(1)) {
    if (row.textContent.replace(/\s+/g, " ").trim().length < 450) continue;
    if (row.querySelector("img")) {
      for (const cell of [...row.cells]) {
        if (cell.textContent.replace(/\s+/g, " ").trim().length < 450) continue;
        const details = createDetails();
        const copy = document.createElement("div");
        copy.className = "party-intro-copy";
        for (const node of [...cell.childNodes]) {
          if (node.nodeType === Node.ELEMENT_NODE && (node.matches("img") || node.matches("a:has(img)"))) continue;
          copy.append(node);
        }
        details.append(copy);
        cell.append(details);
      }
      continue;
    }
    const details = createDetails();
    const inner = document.createElement("table");
    inner.className = "party-intro-inner";
    const body = document.createElement("tbody");
    const replacement = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = table.rows[0]?.cells.length || row.cells.length;
    replacement.append(cell);
    row.replaceWith(replacement);
    body.append(row);
    inner.append(body);
    details.append(inner);
    cell.append(details);
  }
}

function linkKlfStory() {
  if (archivePath !== "/dunst/02_parties/fest_16_coma/index.html") return;
  for (const link of archiveContent.querySelectorAll("a")) {
    if (link.textContent.trim() === "THE KLF") link.href = "#klf";
  }
}

async function addHrFruFeatures() {
  if (archivePath !== hrFruRoot + "index.html") return;
  const features = document.createElement("div");
  features.className = "hr-fru-features";
  const box = (title) => {
    const section = document.createElement("section");
    section.className = "hr-fru-feature";
    const heading = document.createElement("h2");
    heading.textContent = title;
    section.append(heading);
    features.append(section);
    return section;
  };
  const candidates = box("Vinder af HR&FRU dunst:");
  const winner = document.createElement("img");
  winner.src = archiveAsset(hrFruRoot + "kandidater/IMG_4230.jpg").href;
  winner.alt = "Lene Leth Lebbe";
  const winnerLink = document.createElement("a");
  winnerLink.href = archiveRoute(null, hrFruRoot + "kandidater/lene_frameset.html");
  winnerLink.append(winner);
  const allCandidates = document.createElement("a");
  allCandidates.href = archiveRoute(null, hrFruRoot + "kandidater/kandidat_frameset.html");
  allCandidates.textContent = "Se alle Kandidaterne";
  candidates.append(winnerLink, allCandidates);

  const press = box("Pressen skrev");
  press.classList.add("hr-fru-press-feature");
  const panblad = document.createElement("img");
  panblad.src = archiveAsset("/dunst/press/logoer/panbladet_00.jpg").href;
  panblad.alt = "Panbladet";
  const pressLink = document.createElement("a");
  pressLink.href = archiveRoute(null, "/dunst/press/2005/05_02_01_lene_pan/lene_pan.html");
  pressLink.textContent = "En spiselig lebbe";
  press.append(panblad, pressLink);
  const homotropolisLink = document.createElement("a");
  homotropolisLink.className = "hr-fru-homotropolis-link";
  homotropolisLink.href = archiveRoute(null, "/dunst/press/2004/04_12_10_homotropolis/04_12_10_homotropolis.html");
  const homotropolisLogo = document.createElement("img");
  homotropolisLogo.src = archiveAsset("/dunst/press/logoer/homotropolis_logo.gif").href;
  homotropolisLogo.alt = "Homotropolis";
  const homotropolisTitle = document.createElement("span");
  homotropolisTitle.textContent = "10. december 2004 – Dunst indtager atter Ungdomshuset";
  homotropolisLink.append(homotropolisLogo, homotropolisTitle);
  press.append(homotropolisLink);

  for (const [title, path] of [
    ["Atomizer Consert", "hr_fru_dunst_02.html"],
    ["Queer Mini Festival", "queer_festival_01.html"],
  ]) {
    const section = box(title);
    const link = document.createElement("a");
    link.href = archiveRoute(null, hrFruRoot + path);
    link.textContent = title;
    section.append(link);
  }
  archiveContent.querySelector("table.ramme")?.after(features);

  const menuUrl = archiveAsset(hrFruRoot + "kattegorier/kattegori_menu.html");
  const { doc } = await readLegacyPage(menuUrl);
  const category = document.createElement("section");
  category.className = "hr-fru-categories";
  const list = document.createElement("div");
  list.className = "hr-fru-category-list";
  const entries = await Promise.all([...doc.querySelectorAll('a:has(img)')].map(async (link) => {
    const pageUrl = new URL(link.getAttribute("href"), menuUrl);
    const page = await readLegacyPage(pageUrl);
    const image = document.createElement("img");
    image.src = new URL(link.querySelector("img").getAttribute("src"), menuUrl).href;
    image.alt = page.doc.querySelector(".head")?.textContent.trim() || "";
    return image;
  }));
  list.append(...entries);
  category.append(list);
  archiveContent.append(category);
}

function combineHrFruFlow() {
  if (archivePath !== hrFruRoot + "index.html") return;
  const top = archiveContent.querySelector(":scope > table.ramme");
  const features = archiveContent.querySelector(":scope > .hr-fru-features");
  const categories = archiveContent.querySelector(":scope > .hr-fru-categories");
  const galleryGrid = archiveGallery.querySelector(":scope > .grid");
  if (!top || !features || !categories || !galleryGrid) return;
  const flow = document.createElement("div");
  flow.className = "hr-fru-flow";
  flow.append(galleryGrid);
  top.after(features, categories, flow);
}

function combinePartyFlow() {
  if (!partyGallery || archivePath === hrFruRoot + "index.html") return;
  const top = archiveContent.querySelector(":scope > table.ramme");
  if (!top) return;
  const flow = document.createElement("div");
  flow.className = "party-flow";
  for (const node of [...archiveContent.children]) {
    if (node === top) continue;
    if (node.tagName === "BR") { node.remove(); continue; }
    flow.append(node);
  }
  for (const node of [...archiveGallery.children]) {
    if (!node.classList.contains("party-photo-credits")) flow.append(node);
  }
  if (flow.childElementCount) top.after(flow);
}

function repairImageMaps() {
  for (const image of archiveContent.querySelectorAll("img[usemap]")) {
    const name = image.getAttribute("usemap").replace(/^#/, "");
    if (name === "Map") image.closest("table.ramme")?.classList.add("press-photo-map-table");
    const map = [...archiveContent.querySelectorAll("map")].find((item) => item.name === name || item.id === name);
    if (!map) continue;
    const areas = [...map.querySelectorAll("area[coords]")];
    for (const area of areas) area.dataset.originalCoords = area.coords;
    const update = () => {
      const originalWidth = Number(image.getAttribute("width")) || image.naturalWidth;
      if (!originalWidth || !image.getBoundingClientRect().width) return;
      const scale = image.getBoundingClientRect().width / originalWidth;
      for (const area of areas) area.coords = area.dataset.originalCoords.split(",").map((number) => Math.round(Number(number) * scale)).join(",");
    };
    image.addEventListener("load", update);
    window.addEventListener("resize", update);
    update();
  }
}

function showArchiveImage() {
  const path = archiveParams.get("src") || "";
  if (!path.startsWith("/dunst/press/press_photos/") || path.includes("..") || !/\.(?:jpe?g|png|gif|webp)$/i.test(path)) {
    archiveContent.textContent = "Billedet blev ikke fundet.";
    return;
  }
  const image = document.createElement("img");
  image.src = archiveAsset(path).href;
  image.alt = "Pressefoto";
  archiveContent.classList.add("archive-single-image");
  archiveContent.replaceChildren(image);
}

function linkFilmImages() {
  if (categoryFront !== "film-front") return;
  for (const cell of archiveContent.querySelectorAll("td.film")) {
    const destinations = [...new Set([...cell.querySelectorAll("a[href]")].map((link) => link.href))];
    if (destinations.length !== 1) continue;
    for (const image of cell.querySelectorAll("img")) {
      if (image.closest("a")) continue;
      const link = document.createElement("a");
      link.href = destinations[0];
      image.replaceWith(link);
      link.append(image);
    }
  }
}

function groupMusicIntro() {
  if (categoryFront !== "music-front") return;
  const boxes = [...archiveContent.querySelectorAll(":scope > .box_1x1")];
  const intro = boxes.find((box) => box.querySelector(".head")?.textContent.trim() === "dunst MUSIC");
  const recordCompany = boxes.find((box) => box.querySelector(".head")?.textContent.trim() === "Pladeselskab");
  if (!intro || !recordCompany) return;
  const stack = document.createElement("div");
  stack.className = "music-intro-stack";
  intro.before(stack);
  stack.append(intro, recordCompany);
}

function adjustMusicFront() {
  if (categoryFront !== "music-front") return;
  const boxes = [...archiveContent.querySelectorAll(":scope > .box_1x1")];
  const findBox = (text) => boxes.find((box) => box.querySelector(".head")?.textContent.trim().includes(text));
  const berlin = findBox("Berlin Insane");
  const berlinLink = berlin && [...berlin.querySelectorAll("a")].find((link) =>
    new URL(link.href).searchParams.get("path") === "/dunst/musik/05_berlin_insane/index.html");
  berlinLink?.replaceWith(...berlinLink.childNodes);

  const concert = findBox("Concert");
  const concertPhoto = concert?.querySelector('img[src*="IMG_8463.jpg"]');
  if (concertPhoto) {
    concertPhoto.src = archiveAsset("/dunst/musik/06_02_11_ungdomshuset/flyer_stor_01.jpg").href;
    concertPhoto.removeAttribute("width");
    concertPhoto.removeAttribute("height");
  }

  const firstCd = findBox("CD #1");
  if (firstCd) {
    const heads = firstCd.querySelectorAll(".head");
    if (heads[0]) heads[0].textContent = "dunst cd 1 - odéur";
    if (heads[1]) heads[1].textContent = "17. Marts - 2005";
    const detailLink = [...firstCd.querySelectorAll("a")].find((link) =>
      new URL(link.href).searchParams.get("path") === "/dunst/musik/05_03_01_odeur/index.html");
    if (detailLink) detailLink.textContent = "odéur";
    const cover = firstCd.querySelector("img");
    if (cover && !cover.closest("a")) {
      const coverLink = document.createElement("a");
      coverLink.href = archiveRoute(null, "/dunst/musik/05_03_01_odeur/index.html");
      coverLink.setAttribute("aria-label", "Læs om dunst odéur");
      cover.replaceWith(coverLink);
      coverLink.append(cover);
    }
    const body = firstCd.querySelector("tr:last-child td");
    while (body?.lastChild && (body.lastChild.nodeName === "BR" ||
      body.lastChild.nodeType === Node.TEXT_NODE && !body.lastChild.textContent.trim())) body.lastChild.remove();
  }
  const secondCd = findBox("CD #2");
  const secondHeading = secondCd?.querySelector(".head");
  if (secondHeading) secondHeading.textContent = "dunst cd 2 - Shave Your Pet";
}

const musicStreaming = {
  janeFonda: "https://open.spotify.com/album/49vnXWwP2iSJm7pfta75jK?si=vBD0oikzQaaBtLBGlsmviw",
  doubleSingle: "https://open.spotify.com/album/6FTwf3KSqPhPaxwBmGk2iM?si=b2_U1VwMQPSPBxSpy8rylw",
  deformedBabies: "https://open.spotify.com/track/3p3adbLzPz81Yw0Jmohjeu?si=b1e422b79e6b4d40",
  shaveYourPet: "https://open.spotify.com/album/01dKCA2BXGwbCgC3tD7VwF?si=CAZVyQWcTfu2_1MjgQqCyQ",
  munchOfUs: "https://open.spotify.com/album/7Fv1itDE3SLy3w1rxnKq40?si=sIhXKNU3QUSqy8_IPD61yw",
  odeur: "https://open.spotify.com/album/6lq1QPMY6hCQdihWcoFmZZ?si=DLwkKY5MTNOdH3qI_o0BNg",
};

function appendMusicStreaming(cell, href) {
  if (!cell) return;
  const paragraph = document.createElement("p");
  paragraph.className = "music-streaming-link";
  const link = document.createElement("a");
  link.href = href;
  link.textContent = "Streaming på Spotify";
  paragraph.append(link);
  cell.append(paragraph);
}

async function updateMusicReleases() {
  if (!document.body.classList.contains("music-archive")) return;
  if (categoryFront === "music-front") {
    const doubleSingle = [...archiveContent.querySelectorAll(":scope > .box_1x1")]
      .find(box => box.querySelector('img[src*="action_disco"]'));
    if (doubleSingle && !archiveContent.querySelector("#nuclear-jane-fonda")) {
      const box = doubleSingle.cloneNode(true);
      box.id = "nuclear-jane-fonda";
      const headings = box.querySelectorAll(".head");
      headings[0].textContent = "Nuclear Family - Jane Fonda / Electroclash Is Dead";
      headings[1].textContent = "2007";
      const cell = box.querySelector("tr:last-child td");
      const cover = document.createElement("img");
      cover.src = "assets/nuclear-family-jane-fonda-600.jpg";
      cover.alt = "Cover til Nuclear Family-singlen Jane Fonda / Electroclash Is Dead";
      cover.width = 600;
      cover.height = 600;
      const description = document.createElement("p");
      description.textContent = "Jane Fonda/Electroclash is Dead fra Nuclear Family er skrevet, komponeret og sunget af de to performere Nikolaj & Andreas Tange Lange.";
      const details = document.createElement("p");
      details.textContent = "Sangene er som altid en hæsblæsende blanding af skarpe satiriske tekster, electro beats og en ægte melodisk indie feeling.";
      cell.replaceChildren(cover, description, details);
      appendMusicStreaming(cell, musicStreaming.janeFonda);
      doubleSingle.before(box);
    }
    for (const head of archiveContent.querySelectorAll(".head")) {
      if (head.textContent.trim() === "Download") head.textContent = "Streaming";
    }
    for (const box of archiveContent.querySelectorAll(":scope > .box_1x1")) {
      const image = box.querySelector("img");
      const source = image?.getAttribute("src") || "";
      if (source.includes("action_disco")) {
        box.id = "nuclear-double-single";
        box.querySelector(".head").textContent = "Nuclear Family - Double Single";
        const cell = image.closest("td");
        const copy = document.createElement("p");
        copy.textContent = 'Nuclear Family’s double single "Action! Disco! / Smashing Cars" is available for streaming.';
        cell.replaceChildren(image, copy);
        appendMusicStreaming(cell, musicStreaming.doubleSingle);
        continue;
      }
      const detailPath = source.includes("FUCK-MY-HE-ART")
        ? "/dunst/musik/10_06_01_nuclear_fam/index.html"
        : source.includes("deformed_babies")
            ? "/dunst/musik/07_01_01_nuclear_fam/deformed_babies.html" : null;
      if (detailPath) {
        for (const link of box.querySelectorAll("a")) link.href = archiveRoute(null, detailPath);
      }
      if (source.includes("deformed_babies")) appendMusicStreaming(box.querySelector("tr:last-child td"), musicStreaming.deformedBabies);
      if (source.includes("/06_07_03_shave_your_pet/")) appendMusicStreaming(box.querySelector("tr:last-child td"), musicStreaming.shaveYourPet);
      if (source.includes("/05_03_01_odeur/")) appendMusicStreaming(box.querySelector("tr:last-child td"), musicStreaming.odeur);
    }
    for (const cell of archiveContent.querySelectorAll("td:has(img):not(.head)")) {
      const image = [...cell.querySelectorAll("img")].pop();
      let media = image;
      while (media.parentElement !== cell && media.parentElement.matches("a,b,strong,font,span") && !media.parentElement.textContent.trim()) media = media.parentElement;
      const copy = document.createElement("div");
      copy.className = "music-card-copy";
      while (media.nextSibling) copy.append(media.nextSibling);
      while (copy.firstChild && (copy.firstChild.nodeName === "BR" || copy.firstChild.nodeType === Node.TEXT_NODE && !copy.firstChild.textContent.trim())) copy.firstChild.remove();
      if (copy.textContent.trim()) media.after(copy);
    }
    return;
  }
  const odeurRoot = "/dunst/musik/05_03_01_odeur/";
  if (archivePath.startsWith(odeurRoot)) {
    if (["index.html", "05_03_01_odeur_01.html"].some(name => archivePath === odeurRoot + name)) {
      const front = archiveContent.querySelector("table.ramme");
      front?.classList.add("odeur-album-cover");
      const image = front?.querySelector("img");
      if (image) image.alt = "Forsiden af dunst-albummet odéur";
      appendMusicStreaming(front?.rows[front.rows.length - 1]?.cells[0], musicStreaming.odeur);
      const backPage = await readLegacyPage(archiveAsset(odeurRoot + "05_03_01_odeur_02.html"));
      const back = rewriteContent(backPage.doc.body, backPage.url);
      back.querySelector("table.ramme")?.classList.add("odeur-album-cover");
      const backHeading = back.querySelector(".head");
      if (backHeading) backHeading.textContent = 'Back cover of the dunst CD "odéur"';
      const backImage = back.querySelector("img");
      if (backImage) backImage.alt = "Bagsiden af dunst-albummet odéur med de 13 numre";
      archiveContent.append(back);
      const photos = document.createElement("section");
      photos.className = "odeur-press-photos";
      photos.id = "odeur-press-photos";
      const heading = document.createElement("h2");
      heading.textContent = "Press photos";
      const link = document.createElement("a");
      link.href = archiveRoute(null, odeurRoot + "05_03_01_odeur_05.html");
      link.setAttribute("aria-label", "Se pressefotos af alle kunstnerne på odéur");
      const artists = document.createElement("img");
      artists.src = archiveAsset("/dunst/press/press_photos/odeur/press_photos_03.jpg").href;
      artists.alt = "Pressebillede af kunstnerne på dunst odéur";
      artists.width = 790;
      artists.height = 189;
      link.append(artists);
      photos.append(heading, link);
      archiveContent.append(photos);
    }
    const nav = document.createElement("nav");
    nav.className = "odeur-album-links";
    nav.setAttribute("aria-label", "Om dunst odéur");
    if (!["index.html", "05_03_01_odeur_01.html"].some(name => archivePath === odeurRoot + name)) {
      const covers = document.createElement("a");
      covers.href = archiveRoute(null, odeurRoot + "index.html");
      covers.textContent = "odéur – covers";
      nav.append(covers);
    }
    for (const [label, name] of [["Press photos", "05_03_01_odeur_05.html"], ["Press Text", "05_03_01_odeur_03.html"], ["Credit list", "05_03_01_odeur_04.html"]]) {
      if (name === "05_03_01_odeur_05.html" && archiveContent.querySelector(".odeur-press-photos")) continue;
      const link = document.createElement("a");
      link.href = archiveRoute(null, odeurRoot + name);
      link.textContent = label;
      nav.append(link);
    }
    archiveContent.append(nav);
    return;
  }
  let streaming;
  if (/^\/dunst\/musik\/07_01_01_nuclear_fam\/(?:index|deformed_babies)\.html$/.test(archivePath)) {
    streaming = musicStreaming.deformedBabies;
  } else if (/^\/dunst\/musik\/06_07_03_shave_your_pet\/(?:index|shave_your_pet)\.html$/.test(archivePath)) {
    streaming = musicStreaming.shaveYourPet;
  } else if (/^\/dunst\/musik\/04_02_07_munch_of_us\/(?:index|04_02_07_munch_01)\.html$/.test(archivePath)) {
    streaming = musicStreaming.munchOfUs;
  }
  if (streaming) {
    const table = archiveContent.querySelector("table.ramme");
    appendMusicStreaming(table?.rows[table.rows.length - 1]?.cells[0], streaming);
  }
}

async function showPlayingTourist() {
  const filmMenu = archiveContent.querySelector("table");
  const options = document.createElement("div");
  options.className = "playing-options";
  const quickTime = filmMenu?.rows[0]?.cells[0]?.querySelector("a:has(img)");
  if (quickTime) {
    const badge = quickTime.cloneNode(true);
    badge.className = "playing-quicktime";
    badge.querySelector("img").alt = "QuickTime 6 Required";
    options.append(badge);
  }
  for (const cell of [...(filmMenu?.rows[0]?.cells || [])].slice(1)) {
    const link = cell.querySelector("a:has(img)");
    if (!link) continue;
    const card = document.createElement("a");
    card.className = "playing-option";
    if (/modem/i.test(cell.textContent)) card.classList.add("playing-option-modem");
    card.href = link.href;
    const image = link.querySelector("img").cloneNode(true);
    image.alt = "";
    image.removeAttribute("width");
    image.removeAttribute("height");
    const caption = document.createElement("span");
    caption.textContent = cell.textContent.replace(/\s+/g, " ").trim();
    card.append(image, caption);
    options.append(card);
  }

  const base = "/dunst/film/04_08_04_playing_tourist/";
  const slidePage = await readLegacyPage(archiveAsset(`${base}playing_doll_01.html`));
  const slideTable = slidePage.doc.querySelector("table.ramme");
  const slideCaption = slideTable?.rows[2]?.textContent.replace(/\s+/g, " ").trim() || "";
  const slideshow = document.createElement("section");
  slideshow.className = "playing-slideshow";
  const heading = document.createElement("h1");
  heading.className = "bar";
  heading.append(document.createTextNode("Playing tourist"));
  const date = document.createElement("time");
  date.textContent = slideTable?.rows[0]?.cells[1]?.textContent.trim() || "";
  heading.append(date);
  const figure = document.createElement("figure");
  const animatedImage = document.createElement("img");
  animatedImage.src = archiveAsset(`${base}vindue_01.jpg`).href;
  animatedImage.alt = slideCaption;
  figure.append(animatedImage);
  if (slideCaption) {
    const caption = document.createElement("figcaption");
    caption.textContent = slideCaption;
    figure.append(caption);
  }
  slideshow.append(heading, figure);
  let slide = 1;
  window.setInterval(() => {
    if (document.hidden) return;
    slide = slide % 6 + 1;
    animatedImage.src = archiveAsset(`${base}vindue_${String(slide).padStart(2, "0")}.jpg`).href;
  }, 2000);

  const gallery = document.createElement("div");
  gallery.className = "playing-photo-grid";
  const photos = await Promise.all(Array.from({ length: 7 }, (_, index) =>
    readLegacyPage(archiveAsset(`${base}playing_tourist_0${index + 1}.html`))));
  for (const page of photos) {
    const source = rewriteContent(page.doc.body, page.url).querySelector("table.ramme");
    const image = source?.querySelector("img");
    if (!image) continue;
    image.removeAttribute("width");
    image.removeAttribute("height");
    const photo = document.createElement("figure");
    photo.append(image);
    const captionCell = source.rows[2]?.cells[0];
    if (captionCell?.textContent.trim()) {
      const caption = document.createElement("figcaption");
      caption.append(...captionCell.childNodes);
      image.alt = caption.textContent.replace(/\s+/g, " ").trim();
      photo.append(caption);
    } else image.alt = "Playing tourist";
    gallery.append(photo);
  }
  const videos = document.createElement("div");
  videos.className = "playing-videos";
  const firstVideo = document.createElement("a");
  firstVideo.className = "playing-video-link";
  firstVideo.href = "https://www.youtube.com/watch?v=niszWtJ7B6M";
  firstVideo.target = "_blank";
  firstVideo.rel = "noopener noreferrer";
  firstVideo.setAttribute("aria-label", "Dennis Agerblad & Miss Fish in Copenhagen city – se videoen på YouTube");
  const thumbnail = document.createElement("img");
  thumbnail.src = "https://i.ytimg.com/vi/niszWtJ7B6M/hqdefault.jpg";
  thumbnail.alt = "Dennis Agerblad & Miss Fish in Copenhagen city";
  thumbnail.loading = "lazy";
  firstVideo.append(thumbnail);
  const secondVideo = document.createElement("iframe");
  secondVideo.src = "https://www.youtube-nocookie.com/embed/jABs9lrKQ6A";
  secondVideo.title = "Dennis Agerblad & Miss Fish in the forrest";
  secondVideo.loading = "lazy";
  secondVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  secondVideo.allowFullscreen = true;
  videos.append(firstVideo, secondVideo);
  archiveContent.replaceChildren(options, videos, slideshow, gallery);
}

async function showKanalDunst() {
  const original = archiveContent.querySelector("#Indhold .KANT");
  const textCell = original?.rows[0]?.cells[0];
  const logo = original?.querySelector('img[src*="kanal_dunst_logo.gif"]');
  if (!textCell || !logo) return;
  const intro = document.createElement("section");
  intro.className = "kanal-intro";
  const pageHeading = document.createElement("h1");
  pageHeading.className = "kanal-heading";
  pageHeading.textContent = "kANAL dunst";
  const copy = document.createElement("div");
  copy.className = "kanal-intro-copy";
  copy.append(...textCell.childNodes);
  copy.querySelector("font")?.remove();
  while (copy.firstChild && (copy.firstChild.nodeName === "BR" || copy.firstChild.nodeType === Node.TEXT_NODE && !copy.firstChild.textContent.trim())) copy.firstChild.remove();
  const walker = document.createTreeWalker(copy, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    walker.currentNode.textContent = walker.currentNode.textContent.replace(/Klik i menuen til h\u00f8jre[\s\S]*?The Haunted dunst house'\./, "");
  }
  logo.alt = "kanal dunst";
  intro.append(copy, logo);

  const pressPage = await readLegacyPage(archiveAsset("/dunst/film/kanal_dunst/pressemeddelelse.html"));
  const pressCell = rewriteContent(pressPage.doc.body, pressPage.url).querySelector("table td");
  const press = document.createElement("details");
  press.className = "panel kanal-press";
  const heading = document.createElement("summary");
  heading.className = "bar";
  heading.textContent = "læs Pressemeddelelsen";
  const body = document.createElement("div");
  body.className = "panel-body";
  if (pressCell) body.append(...pressCell.childNodes);
  press.append(heading, body);
  const photos = document.createElement("div");
  photos.className = "kanal-photo-grid";
  for (let number = 1; number <= 20; number++) {
    const image = document.createElement("img");
    image.src = `assets/kanal-dunst/kanal-dunst-${String(number).padStart(2, "0")}.jpg`;
    image.alt = number === 1 ? "kANAL dunst-logo" : `Stillbillede ${number - 1} fra kANAL dunst`;
    image.loading = "lazy";
    image.decoding = "async";
    photos.append(image);
  }
  archiveContent.replaceChildren(pageHeading, intro, press, photos);

  const frame = document.createElement("div");
  frame.className = "kanal-tv-frame";
  frame.setAttribute("aria-hidden", "true");
  for (const [name, file] of [
    ["top-left", "screen_left_top_gul.gif"], ["top-right", "screen_right_top.gif"],
    ["bottom-left", "screen_left.gif"], ["bottom-right", "screen_right.gif"],
  ]) {
    const image = document.createElement("img");
    image.className = `kanal-${name}`;
    image.src = archiveAsset(`/dunst/film/kanal_dunst/images/${file}`).href;
    image.alt = "";
    frame.append(image);
  }
  document.body.append(frame);
}

async function addRadioLinks() {
  if (categoryFront !== "radio-front") return;
  const rightUrl = archiveAsset("/dunst/radio/right.html");
  const { doc, url } = await readLegacyPage(rightUrl);
  const right = rewriteContent(doc.body, url);
  const list = document.createElement("div");
  list.className = "radio-links";
  const firstColumn = document.createElement("div");
  firstColumn.className = "radio-first-column";
  const main = archiveContent.querySelector("table.ramme");
  if (main) firstColumn.append(main);
  list.append(firstColumn);
  const audioByTitle = new Map();
  for (const link of right.querySelectorAll("#Indhold a")) {
    const source = new URL(link.href, location.href).searchParams.get("src");
    if (!source || !/\.mp3$/i.test(source)) continue;
    const title = link.textContent.replace(/\s+/g, " ").trim();
    audioByTitle.set(title, new URL(source, archiveAsset("/dunst/radio/")).href);
  }
  const broadcasts = new Map([
    ["4. Juli 2005", { host: "", audio: [] }],
    ["23. Maj 2005", { host: "radio værter: Nikolaj og Andreas.", audio: [] }],
    ["9. Maj 2005", { host: "radio værtinder: RadioKaren & Grr-it.", audio: [] }],
    ["25. April 2005", { host: "radio værtinder: Tina Trash & Petruska.", audio: ["Tina & Delores 1", "Tina & Delores 2", "Tina & Delores 3", "The Pope Is Dead"] }],
    ["11. April 2005", { host: "radio værter: Sune Prahl Knussen & Mads Drud.", audio: ["Bøsse Sex", "Orgasme"] }],
    ["25. Marts 2005", { host: "radio værtinder: Radio Karen & Dennis Agerblad.", audio: ["dunst Manifest", "Interview med mAdam 1", "Interview med mAdam 2", "Interview med mAdam 3"] }],
  ]);
  for (const table of right.querySelectorAll("#Indhold > table.ramme")) {
    const heading = table.querySelector(".head")?.textContent.replace(/\s+/g, " ").trim();
    if (heading === "Lyt") continue;
    if (heading === "kundeservice - 2010") {
      const mainHeading = main?.querySelector(".head");
      if (mainHeading) mainHeading.textContent = "dunst kundeservice - 2010";
      continue;
    }
    const broadcast = broadcasts.get(heading);
    if (broadcast) {
      const cell = [...table.querySelectorAll("td")].find((item) => !item.classList.contains("head"));
      const image = cell?.querySelector("img");
      if (cell && image) {
        cell.replaceChildren(image);
        if (broadcast.host) {
          const host = document.createElement("p");
          host.className = "radio-host";
          const label = broadcast.host.match(/^(.+?:)\s*(.+)$/);
          if (label) {
            const bold = document.createElement("b");
            bold.textContent = `${label[1]} `;
            host.append(bold, document.createTextNode(label[2]));
          } else host.textContent = broadcast.host;
          cell.append(host);
        }
        for (const title of broadcast.audio) {
          const source = audioByTitle.get(title);
          if (!source) continue;
          const player = document.createElement("div");
          player.className = "radio-audio-item";
          const label = document.createElement("strong");
          label.textContent = title;
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.preload = "none";
          audio.src = source;
          audio.setAttribute("aria-label", title);
          player.append(label, audio);
          cell.append(player);
        }
      }
      list.append(table);
      continue;
    }
    if (heading === "Hvornår sender i?") {
      const cell = [...table.querySelectorAll("td")].find((item) => !item.classList.contains("head"));
      if (cell) {
        const lines = [
          "Du finder radio dunst på 92,9 FM og 88,9 kabel.",
          "Hver anden mandag i ulige uger.",
          "kl. 22:00 - 24:00",
        ];
        cell.replaceChildren();
        for (const line of lines) cell.append(document.createTextNode(line), document.createElement("br"));
        const calendar = document.createElement("a");
        calendar.href = `${archiveRoute(null, "/dunst/calendar/2005.html")}#her`;
        calendar.textContent = "kalenderen";
        cell.append(document.createTextNode("Eller se i dunst "), calendar, document.createTextNode(" hvornår vi sender."));
      }
      firstColumn.append(table);
      continue;
    }
    if (table.querySelector('a[href*="03_04_26_p1_"], a[href*="06_02_28_p1_klubvaerelset"]')) continue;
    list.append(table);
  }
  const features = document.createElement("div");
  features.className = "radio-features";
  for (const path of [
    "/dunst/press/2003/03_04_26_p1_/03_04_26_p1.html",
    "/dunst/press/2006/06_02_28_p1_klubvaerelset/06_02_28_p1.html",
  ]) {
    const page = await readLegacyPage(archiveAsset(path));
    const content = rewriteContent(page.doc.body, page.url);
    const table = content.querySelector("table.ramme");
    if (!table) continue;
    table.classList.add("radio-feature");
    features.append(table);
  }
  archiveContent.replaceChildren(list, features);
  upgradeFrontImages();
  for (const image of list.querySelectorAll("table.ramme img")) {
    const table = image.closest("table.ramme");
    const fitToImage = () => {
      if (image.naturalWidth) table.style.setProperty("--radio-image-width", `${image.naturalWidth}px`);
    };
    image.addEventListener("load", fitToImage, { once: true });
    if (image.complete) fitToImage();
  }
}

function replaceFlashPlayer() {
  if (!document.body.classList.contains("radio-archive")) return;
  const placeholder = archiveContent.querySelector("#flashPlayer");
  if (!placeholder) return;
  const audio = document.createElement("audio");
  audio.controls = true;
  audio.preload = "metadata";
  audio.src = archiveAsset("/dunst/radio/kundeservice/01/dunst_kundeservice_02.mp3").href;
  audio.setAttribute("aria-label", "Få løst dit røvhulsproblem her og få opskriften på Anus salve");
  placeholder.replaceWith(audio);
}

function showRadioPlayer() {
  const source = archiveParams.get("src") || "";
  const title = archiveParams.get("title") || "radio dunst";
  if (!/^[^:#?]+\.mp3$/i.test(source) || source.includes("..") || source.startsWith("/")) {
    archiveContent.textContent = "Lydfilen kunne ikke åbnes.";
    return;
  }
  const panel = document.createElement("section");
  panel.className = "front-panel radio-player";
  const heading = document.createElement("h1");
  heading.className = "front-heading";
  heading.textContent = "radio dunst";
  const content = document.createElement("div");
  content.className = "front-intro";
  const name = document.createElement("p");
  name.textContent = title;
  const audio = document.createElement("audio");
  audio.controls = true;
  audio.preload = "metadata";
  audio.src = new URL(source, archiveAsset("/dunst/radio/")).href;
  content.append(name, audio);
  panel.append(heading, content);
  archiveContent.replaceChildren(panel);
}

async function fetchLegacyPage(url) {
  const page = new URL(url, archiveBase);
  if (page.origin !== location.origin ||
      !(/^\/(?:dunst|nyhedsbrev)\//.test(page.pathname) || page.pathname === "/mobil/help.html")) {
    throw new Error("Siden ligger uden for dunst-arkivet.");
  }
  return fetch(page, {mode: "same-origin"});
}

async function readLegacyPage(url, depth = 0) {
  if (depth > 5) throw new Error("For mange indlejrede rammer");
  const response = await fetchLegacyPage(url);
  if (!response.ok) throw new Error(`Kunne ikke indlæse siden (${response.status})`);
  const doc = new DOMParser().parseFromString(await response.text(), "text/html");
  const frame = doc.querySelector('frame[name="indhold"], frame');
  if (frame?.getAttribute("src")) {
    return readLegacyPage(new URL(frame.getAttribute("src"), url), depth + 1);
  }
  return { doc, url };
}

async function readCandidateFrames(url) {
  const response = await fetchLegacyPage(url);
  if (!response.ok) throw new Error(`Kunne ikke indlæse kandidatsiden (${response.status})`);
  const doc = new DOMParser().parseFromString(await response.text(), "text/html");
  const frames = [...doc.querySelectorAll("frame[src]")];
  if (frames.length < 2) throw new Error("Kandidatsiden mangler billeder");
  return {
    menuUrl: new URL(frames[0].getAttribute("src"), url),
    photoUrl: new URL(frames[1].getAttribute("src"), url),
  };
}

async function showHrFruCandidates() {
  const root = hrFruRoot + "kandidater/";
  if (archivePath === root + "kandidat_frameset.html") {
    const menuUrl = archiveAsset(root + "kandidat_menu.html");
    const menu = await readLegacyPage(menuUrl);
    const title = document.createElement("h1");
    title.className = "year-box";
    title.textContent = "De 10 Kandidater:";
    const grid = document.createElement("div");
    grid.className = "hr-fru-candidate-grid";
    const cards = await Promise.all([...menu.doc.querySelectorAll('a:has(img)')].map(async (link) => {
      const framesUrl = new URL(link.getAttribute("href"), menuUrl);
      const frames = await readCandidateFrames(framesUrl);
      const [namePage, photoPage] = await Promise.all([readLegacyPage(frames.menuUrl), readLegacyPage(frames.photoUrl)]);
      const nameCell = namePage.doc.querySelector("td");
      for (const breakNode of nameCell?.querySelectorAll("br") || []) breakNode.replaceWith(" ");
      const name = nameCell?.textContent.replace(/\s+/g, " ").trim() || "";
      const sourceImage = photoPage.doc.querySelector("table.ramme img") || link.querySelector("img");
      const image = document.createElement("img");
      image.src = new URL(sourceImage.getAttribute("src"), sourceImage === link.querySelector("img") ? menuUrl : photoPage.url).href;
      image.alt = name;
      const caption = document.createElement("span");
      caption.textContent = name;
      const card = document.createElement("a");
      card.href = archiveRoute(null, "/" + framesUrl.pathname.slice(archiveBase.pathname.length));
      card.className = "hr-fru-candidate-card";
      card.append(image, caption);
      return card;
    }));
    grid.append(...cards);
    archiveContent.replaceChildren(title, grid);
    archiveGallery.hidden = true;
    document.title = "De 10 Kandidater | dunst";
    return true;
  }
  if (!archivePath.startsWith(root) || !/_frameset\.html$/.test(archivePath)) return false;
  const frames = await readCandidateFrames(archiveAsset(archivePath));
  const menu = await readLegacyPage(frames.menuUrl);
  const title = document.createElement("h1");
  title.className = "year-box";
  const nameCell = menu.doc.querySelector("td");
  for (const breakNode of nameCell?.querySelectorAll("br") || []) breakNode.replaceWith(" ");
  title.textContent = nameCell?.textContent.replace(/\s+/g, " ").trim() || "HR&FRU dunst";
  const grid = document.createElement("div");
  grid.className = "hr-fru-candidate-photos";
  const targets = [...new Set([...menu.doc.querySelectorAll('a:has(img)')]
    .map((link) => new URL(link.getAttribute("href"), frames.menuUrl).href)
    .filter((url) => new URL(url).pathname.startsWith(archiveAsset(root).pathname)))];
  const cards = await Promise.all(targets.map(async (url) => {
    const page = await readLegacyPage(url);
    const source = rewriteContent(page.doc.body, page.url);
    const table = source.querySelector("table.ramme");
    if (table) table.classList.add("hr-fru-candidate-photo");
    return table;
  }));
  grid.append(...cards.filter(Boolean));
  archiveContent.replaceChildren(title, grid);
  archiveGallery.hidden = true;
  document.title = `${title.textContent} | dunst`;
  return true;
}

function performerEventCard({imagePath, width, height, alt, eventPath, eventName, category = "dunst Party", description = ""}) {
  const card = document.createElement("table");
  card.className = "ramme profile-card";
  card.style.setProperty("--profile-image-width", `${width + 2}px`);
  const body = card.createTBody();
  if (category) {
    const head = body.insertRow().insertCell();
    head.className = "head";
    head.textContent = category;
  }
  const cell = body.insertRow().insertCell();
  const image = document.createElement("img");
  image.src = archiveAsset(imagePath).href;
  image.width = width;
  image.height = height;
  image.alt = alt;
  cell.append(image);
  const caption = document.createElement("div");
  caption.className = "performer-photo-caption";
  if (description) {
    const descriptionLine = document.createElement("div");
    descriptionLine.textContent = description;
    caption.append(descriptionLine);
  }
  caption.append("Photo from: ");
  const link = document.createElement("a");
  link.href = archiveRoute(null, eventPath);
  link.textContent = eventName;
  caption.append(link);
  cell.append(caption);
  return card;
}

function showAddedPerformerProfile() {
  const isSigne = archivePath === "/dunst/01_performere/27_signe/index.html";
  const isMaria = archivePath === "/dunst/01_performere/28_maria_maud/index.html";
  const profile = document.createElement("div");
  profile.className = "performer-profile-content";
  const title = document.createElement("h1");
  title.className = "performer-profile-title";
  title.textContent = isSigne ? "Signe" : isMaria ? "Maria Maud" : "Zanne Bizze";
  const section = document.createElement("section");
  section.className = "hairwerk-year";
  const year = document.createElement("h2");
  year.className = "year-box";
  year.textContent = isSigne ? "2004:" : isMaria ? "2006:" : "2003:";
  const grid = document.createElement("div");
  grid.className = "grid";
  if (isSigne) {
    for (const [file, width, height] of [["coma_31.jpg", 450, 338], ["coma_32.jpg", 338, 450]]) {
      grid.append(performerEventCard({
        imagePath: `/dunst/02_parties/fest_16_coma/${file}`,
        width, height,
        alt: "Signe laver show til dunst går i COMA i 2004",
        eventPath: "/dunst/02_parties/fest_16_coma/index.html",
        eventName: "dunst går i COMA",
        description: "Signe laver show.",
      }));
    }
    grid.append(performerEventCard({
      imagePath: "/dunst/02_parties/fest_16_coma/coma_57.jpg",
      width: 375, height: 500,
      alt: "Signe ved festen dunst går i COMA i 2004",
      eventPath: "/dunst/02_parties/fest_16_coma/index.html",
      eventName: "dunst går i COMA",
    }));
  } else if (isMaria) {
    for (const [folder, file, height, eventName, alt, credit] of [
      ["fest_21_shave_your_pet", "IMG_0171.jpg", 337, "Shave Your Pet", "Maria Maud smiler i pink top og blond krøllet paryk ved siden af en maskeret gæst", "Dennis Agerblad"],
      ["fest_22_rode_rave_rovhul_pyramide", "DSCF5104.jpg", 301, "Røvhuls Pyramide", "Maria Maud i pink paryk ved siden af en performer med sort-hvid ansigtsmaling", "Annett"],
    ]) {
      grid.append(performerEventCard({
        imagePath: `/dunst/02_parties/${folder}/images/${file}`,
        width: 450, height, alt,
        eventPath: `/dunst/02_parties/${folder}/index.html`,
        eventName, category: "", description: `Photo: ${credit}.`,
      }));
    }
    for (const [file, height, description, credit] of [
      ["IMG_9197.jpg", 337, "Maria Maud & Tove Hansen.", "Dennis Agerblad"],
    ]) {
      grid.append(performerEventCard({
        imagePath: `/dunst/03_events/2006/06_05_05_lars_von_trier/images/${file}`,
        width: 450, height,
        alt: description,
        eventPath: "/dunst/03_events/2006/06_05_05_lars_von_trier/index.html",
        eventName: "Lars Von Trier",
        category: "",
        description: `${description} Photo: ${credit}.`,
      }));
    }
    grid.append(performerEventCard({
      imagePath: "/dunst/abroad/2006/06_04_28_amsterdam/images/IMG_9082.jpg",
      width: 450, height: 337,
      alt: "Maria Maud & Tove Hansen i Amsterdam",
      eventPath: "/dunst/abroad/2006/06_04_28_amsterdam/index.html",
      eventName: "Amsterdam",
      category: "",
      description: "Maria Maud & Tove Hansen. Photo: Dennis Agerblad.",
    }));
  } else {
    grid.append(performerEventCard({
      imagePath: "/dunst/01_performere/guests/zanne/zanne_arty_farty_01.jpg",
      width: 359, height: 500,
      alt: "Zanne ved sin performance med Liebling Siebling til Arty Farty i 2003",
      eventPath: "/dunst/cafe/2003/arty_farty/index.html",
      eventName: "Arty Farty",
      category: "",
    }));
  }
  section.append(year, grid);
  profile.append(title, section);
  archiveContent.replaceChildren(profile);
  archiveGallery.hidden = true;
}

async function showPerformerProfile() {
  if (["/dunst/01_performere/14_zanne/index.html", "/dunst/01_performere/27_signe/index.html", "/dunst/01_performere/28_maria_maud/index.html"].includes(archivePath)) {
    showAddedPerformerProfile();
    return;
  }
  const rightPath = archivePath.replace(/index\.html$/, "right.html");
  const { doc, url } = await readLegacyPage(archiveAsset(rightPath));
  const source = rewriteContent(doc.body, url);
  const root = source.querySelector("center") || source;
  const profile = document.createElement("div");
  profile.className = "performer-profile-content";
  let section;
  let grid;
  const newSection = (year) => {
    section = document.createElement("section");
    section.className = "hairwerk-year";
    if (year) {
      const heading = document.createElement("h2");
      heading.className = "year-box";
      heading.textContent = year;
      section.append(heading);
    }
    grid = document.createElement("div");
    grid.className = "grid";
    section.append(grid);
    profile.append(section);
  };
  const images = [...root.querySelectorAll("img")];
  const performerLabel = window.DUNST_PREVIEW_DATA.menu.flatMap((item) => item.children || [])
    .find((item) => item.url && new URL(item.url).pathname === archivePath)?.label || "";
  const comparable = (value) => value.toLowerCase().replace(/^performer\s*[-–]\s*/, "").replace(/[\s.:]+$/g, "").trim();
  for (const [index, image] of images.entries()) {
    const galleryEntry = archiveRecord.gallery[index];
    const larger = galleryEntry?.image;
    // Old Kanal dunst film pages contain television-frame graphics before their content.
    if (larger && !/\/film\/kanal_dunst\/images\/screen_[^/]+\.gif$/i.test(larger)) {
      image.src = new URL(larger, location.href).href;
    }
    image.removeAttribute("width");
    image.removeAttribute("height");
    image.loading = index < 3 ? "eager" : "lazy";
    const link = image.closest("a[href]");
    const page = galleryEntry?.url ? new URL(galleryEntry.url, location.href).pathname : "";
    const linkedPage = link ? (new URL(link.href, location.href).searchParams.get("path") || new URL(link.href, location.href).pathname) : "";
    const csdProfilePhoto = recommendsPhotos.profiles[archivePath.split("/")[3]];
    if (csdProfilePhoto && linkedPage.includes("/06_07_22_csd_berlin/")) {
      image.src = csdProfilePhoto.image;
      image.alt = csdProfilePhoto.alt;
      link.href = archiveRoute(null, recommendsPhotos.path);
      for (const eventLink of image.closest("table").querySelectorAll("a[href]")) {
        if (eventLink.textContent.trim() === "CSD Berlin") eventLink.href = link.href;
      }
    }
    const ownPhotoPage = page.startsWith("/dunst/01_performere/");
    if (!link || (linkedPage !== page && !(ownPhotoPage && linkedPage === archivePath)) ||
        !window.DUNST_PERFORMER_PHOTO_PAGES?.has(page)) continue;
    const cardText = image.closest("table")?.textContent.replace(/\s+/g, " ").toLowerCase() || "";
    const captionLines = (galleryEntry.detail_lines || []).filter((line) => {
      const cleaned = line.trim();
      return cleaned && !/^tilbage$/i.test(cleaned) && comparable(cleaned) !== comparable(performerLabel) &&
        !/^(?:19|20)\d{2}$/.test(cleaned) &&
        !/^(?:\d{1,2}\b.*\b(?:januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)\b|(?:januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)\b).*\b(?:19|20)\d{2}\b/i.test(cleaned) &&
        !cardText.includes(cleaned.toLowerCase());
    });
    while (link.nextElementSibling?.matches("br")) link.nextElementSibling.remove();
    link.replaceWith(image);
    if (captionLines.length) {
      const caption = document.createElement("div");
      caption.className = "performer-photo-caption";
      for (const line of captionLines) {
        const part = document.createElement("div");
        part.textContent = line;
        caption.append(part);
      }
      image.after(caption);
    }
  }
  for (const node of [...root.childNodes]) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim()) {
        if (archivePath === "/dunst/01_performere/23_nuclear_family/index.html" &&
            node.textContent.trim() === ":" && profile.querySelector(".performer-profile-title")) continue;
        if (!grid) newSection();
        const paragraph = document.createElement("p");
        paragraph.textContent = node.textContent.trim();
        grid.append(paragraph);
      }
      continue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    if (node.matches("br,hr")) continue;
    if (node.matches("strong,b") && !grid) {
      const heading = document.createElement("h1");
      heading.className = "performer-profile-title";
      heading.textContent = node.textContent.trim().replace(/:\s*$/, "");
      profile.append(heading);
      continue;
    }
    if (node.matches("table")) {
      const year = !node.querySelector("img") && node.textContent.trim().match(/^((?:19|20)\d{2}:?)$/)?.[1];
      if (year) { newSection(year); continue; }
      if (node.querySelector('img[src*="myspace_logo.gif"]')) continue;
      if (!grid) newSection();
      node.classList.add("profile-card");
      const firstRow = node.rows[0];
      if (firstRow && !firstRow.querySelector(".head")) {
        const firstCell = firstRow.cells[0];
        const firstImage = firstCell?.querySelector("img");
        const heading = firstCell?.querySelector(":scope > b:first-child, :scope > strong:first-child");
        const headingText = heading?.textContent.replace(/\s+/g, " ").trim() || "";
        const headingIsLabel = headingText && headingText.length <= 100 &&
          !/^(?:photo|foto)\s*(?:from|fra)?\s*:/i.test(headingText) &&
          (firstImage ? (heading.compareDocumentPosition(firstImage) & Node.DOCUMENT_POSITION_FOLLOWING) :
            firstCell.textContent.replace(/\s+/g, " ").trim() === headingText);
        if (heading && headingIsLabel) {
          const next = heading.nextElementSibling;
          if (next?.matches("hr,br")) next.remove();
          const headerRow = node.insertRow(0);
          const headerCell = headerRow.insertCell();
          headerCell.className = "head";
          headerCell.colSpan = Math.max(1, firstRow.cells.length);
          headerCell.append(heading);
        }
      }
      for (const cell of node.querySelectorAll("td")) {
        const pressLink = (link) => {
          const target = new URL(link.href, location.href);
          return (target.searchParams.get("path") || target.pathname).startsWith("/dunst/press/");
        };
        const photoLink = [...cell.querySelectorAll("a:has(img)")]
          .find((link) => !pressLink(link) && [...cell.querySelectorAll("a")].some((other) => other !== link && !other.querySelector("img")));
        if (photoLink) photoLink.replaceWith(...photoLink.childNodes);
        for (const image of cell.querySelectorAll("img")) {
          while (image.nextElementSibling?.matches("br")) image.nextElementSibling.remove();
          const wrapper = image.closest("a");
          while (wrapper?.nextElementSibling?.matches("br")) wrapper.nextElementSibling.remove();
        }
        const logo = cell.querySelector('img[src*="/press/logoer/panbladet_"]');
        const articleLink = [...cell.querySelectorAll("a[href]")].find(pressLink);
        if (logo && articleLink && !logo.closest("a[href]") &&
            (logo.compareDocumentPosition(articleLink) & Node.DOCUMENT_POSITION_FOLLOWING)) {
          if (/panbladet_00\.(?:jpg|gif)$/i.test(logo.src)) {
            logo.src = archiveAsset("/dunst/press/logoer/panbladet_logo.gif").href;
            logo.removeAttribute("width");
            logo.removeAttribute("height");
          }
          logo.alt = "Panbladet";
          const logoLink = document.createElement("a");
          logoLink.href = articleLink.href;
          logoLink.append(logo);
          cell.insertBefore(logoLink, articleLink);
        }
        // Keep the original caption text, including bare text nodes, inside its own padded area.
        const cellImages = [...cell.querySelectorAll("img")];
        if (cellImages.length === 1) {
          const media = cellImages[0].closest("a") || cellImages[0];
          if (media.parentElement === cell && media.nextSibling) {
            const copy = document.createElement("div");
            copy.className = "performer-card-copy";
            while (media.nextSibling) copy.append(media.nextSibling);
            while (copy.firstChild &&
              (copy.firstChild.nodeType === Node.TEXT_NODE && !copy.firstChild.textContent.trim() ||
               copy.firstChild.nodeType === Node.ELEMENT_NODE && copy.firstChild.matches("br"))) {
              copy.firstChild.remove();
            }
            if (copy.textContent.trim()) cell.append(copy);
          }
        }
      }
      const profileImages = [...node.querySelectorAll("img")];
      const fitProfileCard = () => {
        const widest = Math.max(0, ...profileImages.map((image) => image.naturalWidth || 0));
        if (widest) node.style.setProperty("--profile-image-width", `${widest + 2}px`);
      };
      for (const image of profileImages) image.addEventListener("load", fitProfileCard, { once: true });
      fitProfileCard();
      grid.append(node);
    } else {
      if (!grid) newSection();
      grid.append(node);
    }
  }
  if (!profile.querySelector(".performer-profile-title")) {
    const performer = window.DUNST_PREVIEW_DATA.menu.flatMap((item) => item.children || [])
      .find((item) => item.url && new URL(item.url).pathname === archivePath);
    if (performer) {
      const heading = document.createElement("h1");
      heading.className = "performer-profile-title";
      heading.textContent = performer.label === "Bjarne pigen" ? "Bjarne Pigen" : performer.label.replace(/:\s*$/, "");
      profile.prepend(heading);
    }
  }
  const profileYearGrid = (year) => [...profile.querySelectorAll(".hairwerk-year")]
    .find((section) => section.querySelector(".year-box")?.textContent.startsWith(year))?.querySelector(".grid");
  const ensureProfileYearGrid = (year) => {
    const existing = profileYearGrid(year);
    if (existing) return existing;
    const section = document.createElement("section");
    section.className = "hairwerk-year";
    const heading = document.createElement("h2");
    heading.className = "year-box";
    heading.textContent = `${year}:`;
    const yearGrid = document.createElement("div");
    yearGrid.className = "grid";
    section.append(heading, yearGrid);
    const older = [...profile.querySelectorAll(".hairwerk-year")]
      .find((item) => Number.parseInt(item.querySelector(".year-box")?.textContent, 10) < Number(year));
    if (older) older.before(section);
    else profile.append(section);
    return yearGrid;
  };
  if (archivePath === "/dunst/01_performere/01_ramona_macho/index.html") {
    const photo = recommendsPhotos.profiles["01_ramona_macho"];
    ensureProfileYearGrid("2006").prepend(performerEventCard({
      imagePath: new URL(photo.image, location.href).href,
      width: photo.width, height: photo.height, alt: photo.alt,
      eventPath: recommendsPhotos.path, eventName: "CSD Berlin", category: "Recommend",
    }));
  }
  if (archivePath === "/dunst/01_performere/18_ulle_dulle/index.html") {
    ensureProfileYearGrid("2005").prepend(performerEventCard({
      imagePath: "/dunst/02_parties/fest_20_private_parts/images/HPIM2675.jpg",
      width: 450, height: 339,
      alt: "Ulle Dulle med plaster under øjet ved siden af en performer med bamsehoved til Private Parts",
      eventPath: "/dunst/02_parties/fest_20_private_parts/index.html",
      eventName: "Private Parts",
    }));
  }
  if (archivePath === "/dunst/01_performere/21_marilyn_not_monroe/index.html") {
    const festivalImage = ensureProfileYearGrid("2006").querySelector('img[src$="/marilyn_not_monroe_01.jpg"]');
    if (festivalImage) {
      festivalImage.alt = "Marilyn ´Not´Monroe ved Roze Wester Festival i Amsterdam, 2006";
      if (!festivalImage.closest("a")) {
        const festivalLink = document.createElement("a");
        festivalLink.href = archiveRoute(null, "/dunst/abroad/2006/06_04_28_amsterdam/index.html");
        festivalImage.replaceWith(festivalLink);
        festivalLink.append(festivalImage);
      }
      const festivalCaptionLink = [...festivalImage.closest("table").querySelectorAll("a")]
        .find((link) => link.textContent.includes("Queens Day, Amsterdam"));
      if (festivalCaptionLink) festivalCaptionLink.textContent = "Roze Wester Festival";
    }
    const yearGrid = ensureProfileYearGrid("2004");
    for (const [file, width, height, category] of [
      ["CRW_0653.jpg", 266, 400, "Billig"],
      ["cunta_kinte_01.jpg", 433, 500, "Billig"],
    ]) {
      yearGrid.append(performerEventCard({
        imagePath: `/dunst/02_parties/fest_18_hr_fru/kandidater/${file}`,
        width, height,
        alt: `Marilyn 'not' Monroe i kategorien ${category} til Hr. & Fru dunst`,
        eventPath: "/dunst/02_parties/fest_18_hr_fru/index.html",
        eventName: "Hr. & Fru dunst",
        category,
      }));
    }
    ensureProfileYearGrid("2005").prepend(performerEventCard({
      imagePath: "/dunst/02_parties/fest_20_private_parts/images/HPIM2638.jpg",
      width: 377, height: 500,
      alt: "Marilyn 'not' Monroe viser sit behårede bryst til Private Parts",
      eventPath: "/dunst/02_parties/fest_20_private_parts/index.html",
      eventName: "Private Parts",
    }));
  }
  if (archivePath === "/dunst/01_performere/15_bob/index.html") {
    const yearGrid = profileYearGrid("2004");
    const comaCard = [...(yearGrid?.querySelectorAll("table.profile-card") || [])]
      .find((card) => card.querySelector('img[src$="/coma_29.jpg"]'));
    if (comaCard) yearGrid.prepend(comaCard);
  }
  const promoteProfileCard = (year, position) => {
    const card = profileYearGrid(year)?.children[position - 1];
    const title = profile.querySelector(".performer-profile-title");
    if (!card || !title) return;
    let feature = profile.querySelector(":scope > .performer-feature");
    if (!feature) {
      feature = document.createElement("div");
      feature.className = "performer-feature";
      title.after(feature);
    }
    feature.append(card);
  };
  if (archivePath === "/dunst/01_performere/12_knud_vesterskov/index.html") promoteProfileCard("2004", 1);
  if (archivePath === "/dunst/01_performere/23_nuclear_family/index.html") promoteProfileCard("2005", 2);
  if (archivePath === "/dunst/01_performere/06_puta/index.html") promoteProfileCard("2004", 6);
  if (archivePath === "/dunst/01_performere/08_the_thom/index.html") promoteProfileCard("2005", 2);
  if (archivePath === "/dunst/01_performere/16_tove_hansen/index.html") promoteProfileCard("2005", 2);
  if (archivePath === "/dunst/01_performere/19_tina_trash/index.html") {
    const cards = profileYearGrid("2006");
    if (cards?.children[3]) cards.prepend(cards.children[3]);
  }
  if (archivePath === "/dunst/01_performere/14_madam/index.html") {
    const article = archiveRoute(null, "/dunst/press/2004/04_04_01_romeo_om_dunst/04_04_01_romeo_om_dunst.html");
    for (const card of [...(profileYearGrid("2005")?.children || [])]) {
      for (const link of card.querySelectorAll("a:has(img)")) link.href = article;
    }
    promoteProfileCard("2005", 1);
  }
  if (archivePath === "/dunst/01_performere/03_dennis-agerblad/index.html") {
    const homepage = profile.querySelector('a[href*="dennisagerblad.dk/dennis_frameset.html"]');
    if (homepage) {
      homepage.href = "https://dennisagerblad.dk/";
      homepage.textContent = "Dennis Agerblad own website";
      homepage.target = "_blank";
      homepage.rel = "noopener noreferrer";
      homepage.closest("table.profile-card")?.classList.add("dennis-website-card");
    }
    const year2004 = [...profile.querySelectorAll(".hairwerk-year")]
      .find((section) => section.querySelector(".year-box")?.textContent.startsWith("2004"));
    const yearGrid = year2004?.querySelector(".grid");
    const hasseCard = [...(yearGrid?.querySelectorAll("table.profile-card") || [])]
      .find((card) => card.textContent.includes("dunst Photosession with Hasse Nielsen"));
    if (hasseCard) {
      const cell = hasseCard.querySelector("td:not(.head)");
      const images = document.createElement("div");
      images.className = "dennis-hasse-images";
      for (const file of ["hasse_dennis_04.jpg", "hasse_dennis_05.jpg"]) {
        const image = document.createElement("img");
        image.src = archiveAsset(`/dunst/01_performere/03_dennis-agerblad/${file}`).href;
        image.alt = "Dennis Agerblad fotograferet af Hasse Nielsen";
        images.append(image);
      }
      const caption = document.createElement("p");
      caption.textContent = "dunst Photosession with Hasse Nielsen for";
      const logo = cell.querySelector('img[src*="romeo_juliet_logo"]')?.closest("a")?.cloneNode(true);
      cell.replaceChildren(images, caption);
      if (logo) cell.append(logo);
      hasseCard.classList.add("dennis-hasse-card");
      yearGrid.prepend(hasseCard);
    }
  }
  if (archivePath === "/dunst/01_performere/04_johnny_warehouse/index.html") {
    const homepage = profile.querySelector('a[href*="johnnywarehouse.com"]');
    if (homepage) {
      const newLink = document.createElement("a");
      newLink.href = "https://petervadim.dk/";
      newLink.textContent = "https://petervadim.dk/";
      newLink.target = "_blank";
      newLink.rel = "noopener noreferrer";
      homepage.replaceWith(document.createTextNode("Johnny Warehouse (Peter Vadim) hjemmeside: "), newLink);
    }
    const articleLink = profile.querySelector('a[href*="forside_nyt.html"]');
    const articleCard = articleLink?.closest("table.profile-card");
    if (articleCard) {
      const { doc, url } = await readLegacyPage(archiveAsset("/dunst/news/forside_nyt.html"));
      const articleTable = rewriteContent(doc.body, url).querySelector("table.ramme");
      if (articleTable) {
        articleTable.classList.add("profile-card", "johnny-article-card");
        const headingRow = articleTable.rows[0];
        headingRow.replaceChildren();
        const headingCell = headingRow.insertCell();
        headingCell.className = "head";
        headingCell.colSpan = 2;
        headingCell.textContent = "Article about dunst og 2020.";
        const copyCell = articleTable.rows[1]?.cells[0];
        for (const strong of articleTable.querySelectorAll("strong")) strong.replaceWith(...strong.childNodes);
        while (copyCell?.firstChild && (
          copyCell.firstChild.nodeName === "BR" ||
          (copyCell.firstChild.nodeType === Node.TEXT_NODE && !copyCell.firstChild.textContent.trim())
        )) copyCell.firstChild.remove();
        for (const br of [...(copyCell?.querySelectorAll("br") || [])]) {
          if (!br.previousSibling?.textContent?.trim() || !br.nextSibling?.textContent?.trim()) br.remove();
        }
        articleCard.replaceWith(articleTable);
      }
    }
  }
  if (archivePath === "/dunst/01_performere/12_knud_vesterskov/index.html") {
    const title = profile.querySelector(".performer-profile-title");
    if (title) title.textContent = "Knud Vesterskov (Moma Van Vest)";
    const hotmen = profile.querySelector('a[href*="hmcbmovie.com"]');
    if (hotmen) {
      hotmen.href = "https://da.wikipedia.org/wiki/HotMen_CoolBoyz";
      hotmen.target = "_blank";
      hotmen.rel = "noopener noreferrer";
    }
  }
  if (archivePath === "/dunst/01_performere/23_nuclear_family/index.html") {
    const intro = profile.querySelector(".profile-card td");
    if (intro) {
      for (const line of [...intro.querySelectorAll("br")]) {
        const before = line.previousSibling?.textContent || "";
        const next = line.nextSibling;
        const after = next?.textContent || "";
        if (/&\s*$/.test(before) && /^\s*Andreas Tange\b/.test(after)) {
          line.remove();
          if (next) next.textContent = ` ${after.trimStart()}`;
          break;
        }
      }
    }
  }
  if (archivePath === "/dunst/01_performere/07_car-o-lina/index.html") {
    const year = [...profile.querySelectorAll(".hairwerk-year")]
      .find((part) => part.querySelector(".year-box")?.textContent.startsWith("2006"));
    const cards = year?.querySelector(".grid");
    const film = [...(cards?.children || [])]
      .find((card) => card.querySelector(".head")?.textContent.trim() === "Film");
    if (film) cards.append(film);
  }
  if (archivePath === "/dunst/01_performere/16_tove_hansen/index.html") {
    profile.querySelector('a[href*="tovehansendrag.dk"]')?.closest("table.profile-card")?.remove();
  }
  const pressPhotos = dunstPressPhotoCards(archivePath);
  if (pressPhotos) {
    if (archivePath === "/dunst/01_performere/03_dennis-agerblad/index.html") {
      const yearGrid = [...profile.querySelectorAll(".hairwerk-year")]
        .find((section) => section.querySelector(".year-box")?.textContent.startsWith("2004"))?.querySelector(".grid");
      const hasseCard = yearGrid?.querySelector(".dennis-hasse-card");
      const danskCard = pressPhotos.querySelector(".performer-press-card");
      if (yearGrid && danskCard) yearGrid.insertBefore(danskCard, hasseCard?.nextSibling || yearGrid.firstChild);
    } else if (archivePath === "/dunst/01_performere/14_madam/index.html") {
      // The two former Flash image pages now link directly to this article.
    } else if (archivePath === "/dunst/01_performere/06_puta/index.html") {
      const danskCard = pressPhotos.querySelector(".performer-press-card");
      if (danskCard) profileYearGrid("2004")?.prepend(danskCard);
    } else if (archivePath === "/dunst/01_performere/01_ramona_macho/index.html") {
      const yearGrid = profileYearGrid("2004");
      yearGrid?.children[1]?.remove();
      const danskCard = [...pressPhotos.querySelectorAll(".performer-press-card")]
        .find((card) => card.textContent.includes("Dansk Magazine"));
      if (danskCard) yearGrid?.prepend(danskCard);
      profile.querySelector(".performer-profile-title")?.after(pressPhotos);
    } else if (archivePath === "/dunst/01_performere/09_stimulundia/index.html") {
      const yearGrid = profileYearGrid("2004");
      const flashCards = [yearGrid?.children[3], yearGrid?.children[4]].filter(Boolean);
      const romeoCard = [...pressPhotos.querySelectorAll(".performer-press-card")]
        .find((card) => card.textContent.includes("Nr. 19 - April 2004"));
      const images = romeoCard?.querySelector(".performer-press-images");
      romeoCard?.classList.add("stimulundia-press-card");
      const article = archiveRoute(null, "/dunst/press/2004/04_04_01_romeo_om_dunst/04_04_01_romeo_om_dunst.html");
      if (images && flashCards.length === 2) {
        images.replaceChildren();
        for (const card of flashCards) {
          const image = card.querySelector("img");
          const link = document.createElement("a");
          link.href = article;
          link.append(image);
          images.append(link);
          card.remove();
        }
      }
      const danskCard = [...pressPhotos.querySelectorAll(".performer-press-card")]
        .find((card) => card.textContent.includes("Dansk Magazine"));
      if (danskCard) yearGrid?.prepend(danskCard);
      profile.querySelector(".performer-profile-title")?.after(pressPhotos);
    } else if (archivePath === "/dunst/01_performere/08_the_thom/index.html") {
      const danskCard = [...pressPhotos.querySelectorAll(".performer-press-card")]
        .find((card) => card.textContent.includes("Dansk Magazine"));
      if (danskCard) profileYearGrid("2004")?.prepend(danskCard);
    } else {
      const title = profile.querySelector(".performer-profile-title");
      if (title) title.after(pressPhotos);
      else profile.prepend(pressPhotos);
    }
  }
  if (archivePath === "/dunst/01_performere/03_dennis-agerblad/index.html") promoteProfileCard("2004", 1);
  if (archivePath === "/dunst/01_performere/04_johnny_warehouse/index.html") promoteProfileCard("2003", 4);
  archiveContent.replaceChildren(profile);
  archiveGallery.hidden = true;
}

async function showMusicVideos() {
  const rightUrl = archiveAsset("/dunst/film/music_videos/right.html");
  const { doc, url } = await readLegacyPage(rightUrl);
  const tables = [...doc.querySelectorAll("table.ramme")].filter((table) => table.querySelector("a img"));
  const grid = document.createElement("div");
  grid.className = "music-video-grid";
  const cards = await Promise.all(tables.map(async (table) => {
    const link = table.querySelector("a:has(img)");
    const artist = table.querySelector(".head")?.textContent.trim().replace(/\s+/g, " ") || "";
    const title = link.textContent.trim().replace(/\s+/g, " ").replace(/\s*-\s*Photo Slide show\b/i, "");
    const videoPage = await readLegacyPage(new URL(link.getAttribute("href"), url));
    const original = videoPage.doc.querySelector("iframe[src*='youtube.com']");
    if (!original) throw new Error(`Video mangler: ${title}`);
    const card = document.createElement("article");
    card.className = "music-video-embed-card";
    const heading = document.createElement("h2");
    heading.textContent = artist;
    const frame = document.createElement("iframe");
    frame.src = original.getAttribute("src");
    frame.title = original.getAttribute("title") || `${artist} - ${title}`;
    frame.allow = original.getAttribute("allow") || "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    const caption = document.createElement("div");
    caption.className = "music-video-caption";
    const name = document.createElement("strong");
    name.textContent = title;
    caption.append(name);
    const sourceText = videoPage.doc.querySelector("table.ramme tr:last-child")?.textContent.replace(/\s+/g, " ").trim() || "";
    const extra = sourceText.replace(new RegExp(`^${artist.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:?\\s*`, "i"), "")
      .replace(title, "").replace(/\s*-\s*Photo Slide show\b/i, "").trim();
    if (extra) {
      const credit = document.createElement("p");
      credit.textContent = extra;
      caption.append(credit);
    }
    card.append(heading, frame, caption);
    return card;
  }));
  grid.append(...cards);
  archiveGallery.className = "archive-gallery music-videos-gallery";
  archiveGallery.replaceChildren(grid);
  archiveGallery.hidden = false;
}

function showShadowPeople() {
  const table = archiveContent.querySelector("table.ramme");
  if (!table || !archiveRecord) return;
  const rows = [...table.rows];
  const introduction = rows[1]?.cells[0];
  if (introduction) {
    const title = document.createElement("strong");
    title.textContent = "The shadow people";
    introduction.replaceChildren(title, document.createTextNode(" - A gay electro-punk show at Eggers & Landwehr KG, Berlin."), document.createElement("hr"));
  }
  const externalLink = rows[4]?.querySelector("a");
  const groupCredit = rows[2]?.textContent.replace(/\s+/g, " ").trim().replace(/^The Shadowpeople\s*/i, "") || "";
  rows[3]?.querySelector("hr")?.remove();
  rows[2]?.remove();
  rows[4]?.remove();
  table.style.setProperty("--archive-table-width", "800px");
  const grid = document.createElement("div");
  grid.className = "shadow-people-photos";
  for (const index of [1, 2, 3, 4, 6]) {
    const item = archiveRecord.gallery[index];
    if (!item) continue;
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.detail_lines?.slice(2).join(" ") || "The Shadowpeople";
    image.loading = index < 3 ? "eager" : "lazy";
    const caption = document.createElement("figcaption");
    caption.textContent = index === 6 && groupCredit ? groupCredit : item.detail_lines?.slice(2).join(" ") || "";
    figure.append(image, caption);
    grid.append(figure);
  }
  archiveGallery.className = "archive-gallery shadow-people-gallery";
  archiveGallery.replaceChildren(grid);
  if (externalLink) archiveGallery.append(externalLink);
  archiveGallery.hidden = false;
}

async function showSkiOverview() {
  document.title = "Skiferie i Nordsverige | dunst";
  const { doc, url } = await readLegacyPage(archiveAsset(archivePath));
  const source = doc.querySelector("table.ramme");
  if (!source) throw new Error("Skiferieoversigten mangler");
  const panel = document.createElement("section");
  panel.className = "ski-overview-panel";
  const heading = document.createElement("h1");
  heading.className = "front-heading";
  heading.textContent = source.rows[0].textContent.replace(/\s+/g, " ").trim();
  const grid = document.createElement("div");
  grid.className = "ski-overview-grid";
  for (const [index, cell] of [...source.rows[1].cells].entries()) {
    const day = ["09", "10", "11", "12"][index];
    const dayText = cell.querySelector("a")?.textContent.replace(/\s+/g, " ").trim() || "";
    const link = document.createElement("a");
    link.className = "ski-day-link";
    link.href = archiveRoute(null, `/dunst/abroad/2003/ski_ferie/${day}/index.html`);
    const title = document.createElement("h2");
    title.textContent = dayText;
    link.append(title);
    for (const original of cell.querySelectorAll("a img")) {
      const image = document.createElement("img");
      image.src = new URL(original.getAttribute("src").replace(/_00(?=\.(?:jpe?g|png|gif)$)/i, ""), url).href;
      image.alt = dayText;
      link.append(image);
    }
    const description = document.createElement("p");
    description.textContent = cell.textContent.replace(dayText, "").replace(/\s+/g, " ").trim();
    link.append(description);
    grid.append(link);
  }
  panel.append(heading, grid);
  archiveContent.replaceChildren(panel);
}

function showSkiDay(day) {
  document.title = `Skiferie i Nordsverige – ${Number(day)} Januar 2003 | dunst`;
  const sections = window.DUNST_SKI_DATA?.[day];
  if (!sections) throw new Error("Skiferiegalleriet mangler");
  archiveTitle.replaceChildren(document.createTextNode("Skiferie i Nordsverige"));
  const date = document.createElement("time");
  date.textContent = `${Number(day)} Januar 2003`;
  archiveTitle.append(date);
  archiveTitle.hidden = false;
  const content = document.createElement("div");
  content.className = "ski-day-sections";
  for (const section of sections) {
    const group = document.createElement("section");
    group.className = "ski-day-section";
    const heading = document.createElement("h2");
    heading.textContent = section.title;
    const grid = document.createElement("div");
    grid.className = "ski-day-photos";
    for (const photo of section.photos) {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = photo.image;
      image.alt = photo.caption || section.title;
      image.loading = "lazy";
      figure.append(image);
      if (photo.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = photo.caption;
        figure.append(caption);
      }
      grid.append(figure);
    }
    group.append(heading, grid);
    content.append(group);
  }
  archiveContent.replaceChildren(content);
}

function showSkidtFilm() {
  const table = archiveContent.querySelector("table.ramme");
  const row = table?.rows[2];
  const cell = row?.cells[0];
  if (!cell) return;
  const sections = cell.innerHTML.split(/(?:<br\s*\/?>\s*){2,}/i).filter((part) => part.trim());
  const columns = document.createElement("div");
  columns.className = "skidt-copy-grid";
  for (const section of sections) {
    const column = document.createElement("div");
    column.className = "skidt-copy";
    column.innerHTML = section;
    columns.append(column);
  }
  cell.replaceChildren(columns);
  cell.colSpan = 2;
  row.cells[1]?.remove();
}

function showTv2News() {
  const original = archiveContent.querySelector("table.ramme");
  const logo = original?.querySelector('img[src*="tv2_logo.gif"]');
  const photo = original?.querySelector('img[src*="tv2news_01.jpg"]');
  if (!logo || !photo) return;
  const panel = document.createElement("section");
  panel.className = "tv2-news-panel";
  const head = document.createElement("div");
  head.className = "tv2-news-head";
  const date = document.createElement("b");
  date.textContent = original.querySelector("table")?.rows[1]?.textContent.trim() || "";
  head.append(logo, date);
  const frame = document.createElement("div");
  frame.className = "tv2-realone-frame";
  frame.style.backgroundImage = `url("${archiveAsset("/dunst/press/2002/02_08_16_tv2/tv2_ramme.gif").href}")`;
  frame.append(photo);
  const story = document.createElement("div");
  story.className = "tv2-news-story";
  for (const line of [
    "i forbindelse med Copenhagen pride fik dunst besøg nede i sin kælder i Sommerstedgade hvor vi hørte til dengang. Det blev til et interview med Dennis Agerblad og misfish",
    "“hvorfor holder I pride?”",
    "“det ved jeg ikke? Fish, hvorfor holder vi pride?”",
    "“det gør vi fordi der ikke er plads til sådan nogen som os.”",
  ]) {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    story.append(paragraph);
  }
  panel.append(head, frame, story);
  archiveContent.replaceChildren(panel);
}

function showRecommendsFront() {
  const panel = document.createElement("section");
  panel.className = "front-panel recommends-intro";
  const title = document.createElement("h1");
  title.className = "front-heading";
  title.textContent = "dunst RECOMENDS";
  const intro = document.createElement("p");
  intro.textContent = "Dette er ikke dunst, men medlemmers egne arrangementer.";
  panel.append(title, intro);
  const years = document.createElement("div");
  const { listedItems: items, monthNames: recommendsMonthNames } = window.DUNST_RECOMMENDS;
  let currentYear;
  let currentMonth;
  let section;
  let cards;
  for (const item of items) {
    if (item.year !== currentYear) {
      currentYear = item.year;
      currentMonth = undefined;
      section = document.createElement("section");
      section.className = "recommends-year";
      years.append(section);
    }
    if (item.month !== currentMonth) {
      currentMonth = item.month;
      const monthSection = document.createElement("section");
      monthSection.className = "recommends-month";
      monthSection.dataset.month = item.month || "unknown";
      const month = document.createElement("h2");
      month.className = "year-box";
      month.textContent = `${item.month ? recommendsMonthNames[item.month - 1] : "måned ikke angivet"} - ${item.year}:`;
      cards = document.createElement("div");
      cards.className = "front-cards recommends-cards";
      monthSection.append(month, cards);
      section.append(monthSection);
    }
    const card = document.createElement("a");
    card.className = "front-card";
    card.href = archiveRoute(null, item.path);
    if (item.image) {
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = `Plakat eller foto fra ${item.label}`;
      image.loading = "lazy";
      card.append(image);
      const fit = () => card.style.setProperty("--front-image-width", `${Math.min(image.naturalWidth, 450) + 2}px`);
      image.addEventListener("load", fit, {once: true});
      if (image.complete && image.naturalWidth) fit();
    }
    const caption = document.createElement("span");
    caption.className = "front-card-title";
    caption.textContent = item.label.includes(item.year) ? item.label : `${item.label} ${item.year}`;
    card.append(caption);
    cards.append(card);
  }
  archiveContent.replaceChildren(panel, years);
  archiveGallery.hidden = true;
}

function correctRecommendsEvents() {
  if (!document.body.classList.contains("recommends-archive") || categoryFront) return;
  const event = archivePath.split("/")[4];
  const table = archiveContent.querySelector(":scope > table");
  if (["04_09_02_kupe_aarhus", "04_10_08_kulturnat_knud"].includes(event)) {
    for (const cell of table?.querySelectorAll("td:not(.head)") || []) {
      if (cell.textContent.trim().length < 250 || cell.querySelector("table,details")) continue;
      const details = document.createElement("details");
      details.className = "recommends-event-details";
      const summary = document.createElement("summary");
      summary.textContent = "læs om arrangementet";
      details.append(summary);
      for (const node of [...cell.childNodes]) {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches("img")) continue;
        details.append(node);
      }
      cell.append(details);
    }
  }
  if (["04_10_29_ramona_intime", "04_10_30_halloween"].includes(event) && table) {
    table.classList.add("recommends-legacy-layout");
    table.dataset.recommendsWidth = "450";
  }
  if (event === "04_11_10_rhythm_king" && table) {
    table.querySelector(".head").textContent = "damUlove holder fest";
    for (const frame of table.querySelectorAll("iframe,object,embed")) frame.closest("tr")?.remove();
    for (const link of table.querySelectorAll('a[href*="dameulove.webbyen.dk"]')) link.closest("tr")?.remove();
    const copy = table.rows[1]?.cells[0];
    if (copy) {
      const link = document.createElement("a");
      link.href = "http://www.dameulove.webbyen.dk/";
      link.textContent = "www.dameulove.webbyen.dk";
      copy.replaceChildren("Se indhold på: ", link);
    }
  }
  if (event === "07_03_25_seminar" && table) {
    const image = table.querySelector("img");
    if (image) {
      const row = table.insertRow(1);
      const cell = row.insertCell();
      cell.colSpan = 2;
      cell.append(image);
    }
  }
  if (event === "08_03_14_warehouse" && table) {
    table.classList.add("recommends-program");
    for (const row of [...table.rows]) {
      if (row.cells.length !== 2 || row.querySelector(".head")) continue;
      const [copy, pictures] = row.cells;
      if (!pictures.querySelector("img")) continue;
      const photo = document.createElement("div");
      photo.className = "recommends-program-photo";
      photo.append(...pictures.childNodes);
      copy.prepend(photo);
      copy.colSpan = 2;
      row.classList.add("recommends-program-row");
      pictures.remove();
    }
    const languageLink = table.querySelector('a[name="dansk"]');
    if (languageLink) {
      const row = languageLink.closest("tr");
      if (!row.textContent.trim() && !row.querySelector("img")) {
        row.nextElementSibling.id = "dansk";
        row.remove();
      }
    }
  }
  if (event === "06_07_22_csd_berlin" && table) {
    const caption = table.rows[2]?.cells[0];
    if (caption) {
      const motto = document.createElement("p");
      motto.textContent = "We are red, we are white, we are Danish Dynamite.";
      caption.append(motto);
    }
  }
  if (event === "05_04_30_fotograf_fest" && table) {
    table.querySelector("img")?.closest("tr")?.remove();
    table.querySelector('a[href*="shok.dk"]')?.before("fotograffest ");
    table.dataset.recommendsWidth = "450";
  }
  if (event === "05_06_16_bryllup" && table) {
    const cell = table.querySelector("img")?.closest("td");
    let previous;
    for (const node of [...(cell?.childNodes || [])]) {
      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
        node.remove();
        continue;
      }
      if (node.nodeName === "BR" && (!previous || ["IMG", "BR"].includes(previous.nodeName))) {
        node.remove();
        continue;
      }
      previous = node;
    }
  }
  if (event === "04_11_13_enhedslisten" && !archiveGallery.hidden) archiveContent.before(archiveGallery);
}

function compactRecommendsText() {
  const roots = archiveContent.querySelectorAll("p,td:not(:has(table)),.recommends-copy,details");
  for (const root of roots) {
    for (const paragraph of root.querySelectorAll("p")) {
      if (!paragraph.textContent.trim() && !paragraph.querySelector("img,iframe,object,embed,video,audio")) paragraph.remove();
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let hasText = false;
    let breaks = [];
    const clearBreaks = (atEnd = false) => {
      if (!hasText || atEnd) breaks.forEach(node => node.remove());
      else if (breaks.length > 1) {
        const gap = document.createElement("span");
        gap.className = "recommends-paragraph-gap";
        gap.setAttribute("aria-hidden", "true");
        breaks[0].replaceWith(gap);
        breaks.slice(1).forEach(node => node.remove());
      }
      breaks = [];
    };
    // Collect first so removing old line breaks cannot disturb the tree walker.
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.nodeName === "BR") breaks.push(node);
      else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        clearBreaks();
        hasText = true;
      }
    }
    clearBreaks(true);
  }
  for (const line of archiveContent.querySelectorAll(":scope > br")) line.remove();
}

function frameRecommendsImages() {
  if (!document.body.classList.contains("recommends-archive") || categoryFront) return;
  correctRecommendsEvents();
  const event = window.DUNST_RECOMMENDS.items.find(item =>
    archivePath.startsWith(item.path.slice(0, item.path.lastIndexOf("/") + 1)));
  if (event) {
    for (const row of archiveContent.querySelectorAll("tr")) {
      const title = row.cells[0];
      if (title?.classList.contains("head")) title.textContent = event.label;
    }
  }
  for (const image of archiveContent.querySelectorAll('img[src$="/froeken_verden/dennis_fest_01.jpg"]')) {
    image.src = froekenDennisPhoto;
    image.alt = froekenDennisAlt;
    image.dataset.displayWidth = "360";
  }
  for (const table of archiveContent.querySelectorAll(":scope > table")) {
    const box = document.createElement("section");
    box.className = "recommends-box";
    if (table.classList.contains("recommends-legacy-layout")) box.classList.add("recommends-legacy-dark");
    table.before(box);
    box.append(table);
    const heading = document.createElement("div");
    heading.className = "recommends-detail-heading";
    for (const row of [...table.rows]) {
      if (![...row.cells].some(cell => cell.classList.contains("head"))) continue;
      const line = document.createElement("div");
      line.className = "recommends-detail-heading-row";
      for (const [index, cell] of [...row.cells].entries()) {
        if (!cell.textContent.trim()) continue;
        const text = document.createElement("div");
        text.className = index > 0 ? "recommends-heading-date" : "recommends-heading-title";
        text.append(...cell.childNodes);
        line.append(text);
      }
      heading.append(line);
      row.remove();
    }
    if (heading.childElementCount) box.prepend(heading);
    const ownImages = [...table.querySelectorAll("img")];
    const images = ownImages.length ? ownImages : [...archiveGallery.querySelectorAll("img")];
    const fit = () => {
      const width = Number(table.dataset.recommendsWidth) || Math.max(0, ...images.map(image => Number(image.dataset.displayWidth) || image.naturalWidth || Number(image.getAttribute("width")) || 0));
      if (width) {
        box.style.width = `${width + 2}px`;
      }
    };
    images.forEach(image => image.addEventListener("load", fit, {once:true}));
    fit();
    for (const row of table.querySelectorAll("tr")) if ([...row.cells].some(cell => cell.classList.contains("head"))) row.classList.add("recommends-heading-row");
  }
  for (const image of archiveContent.querySelectorAll("img")) {
    if (image.closest(".recommends-image")) continue;
    image.removeAttribute("hspace");
    image.removeAttribute("vspace");
    for (const table of [image.closest("table")]) table?.classList.add("recommends-image-table");
    const frame = document.createElement("figure");
    frame.className = "recommends-image";
    image.replaceWith(frame);
    frame.append(image);
    // Paragraph wrappers around old images must not add space inside the border.
    if (frame.parentElement?.matches("p,a") && !frame.parentElement.textContent.trim()) frame.parentElement.classList.add("recommends-image-only");
    const fit = () => {
      if (image.naturalWidth) frame.style.width = `${(Number(image.dataset.displayWidth) || image.naturalWidth) + 2}px`;
    };
    image.addEventListener("load", fit, {once:true});
    if (image.complete) fit();
  }
  for (const cell of archiveContent.querySelectorAll("td:has(.recommends-image)")) {
    if (cell.querySelector("table")) continue;
    let copy;
    for (const node of [...cell.childNodes]) {
      if (node.nodeType === Node.ELEMENT_NODE && (node.matches(".recommends-image,.recommends-image-only") || node.querySelector(".recommends-image"))) {
        copy = null;
        continue;
      }
      if (!copy) {
        copy = document.createElement("div");
        copy.className = "recommends-copy";
        node.before(copy);
      }
      copy.append(node);
    }
    for (const empty of cell.querySelectorAll(".recommends-copy")) if (!empty.textContent.trim() && !empty.querySelector("iframe,video,audio")) empty.remove();
  }
  compactRecommendsText();
  document.body.classList.add("recommends-ready");
}

async function showMain() {
  if (categoryFront === "recommends-front") { showRecommendsFront(); await window.DunstRecommendsCaptions?.apply(archivePath); return; }
  const imageEvent = window.DUNST_RECOMMENDS.items.find(item => item.path === archivePath && item.images);
  if (imageEvent) {
    const heading = document.createElement("h1");
    heading.textContent = `${imageEvent.label} ${imageEvent.year}`;
    archiveContent.replaceChildren(heading);
    for (const src of imageEvent.images) {
      const image = document.createElement("img");
      image.src = src;
      image.alt = `Plakat fra ${imageEvent.label}`;
      archiveContent.append(image);
    }
    frameRecommendsImages();
    await window.DunstRecommendsCaptions?.apply(archivePath);
    return;
  }
  const pressYear = archivePath?.match(/^\/dunst\/press\/(200[2-7]|2013)\/index\.html$/)?.[1];
  if (pressYear) { await showPressYear(pressYear); return; }
  if (await showHrFruCandidates()) return;
  if (/^\/dunst\/01_performere\/\d+_[^/]+\/index\.html$/.test(archivePath) &&
      archivePath !== "/dunst/01_performere/05_hairwerk/index.html") {
    document.body.classList.add("performer-profile");
    await showPerformerProfile();
    return;
  }
  const skiDay = archivePath?.match(/^\/dunst\/abroad\/2003\/ski_ferie\/(09|10|11|12)\/index\.html$/)?.[1];
  if (skiDay) { showSkiDay(skiDay); fitCaptionFigures(); return; }
  if (archivePath === "/dunst/abroad/2003/ski_ferie/ski_oversigt.html") { await showSkiOverview(); return; }
  const source = archivePath === "/dunst/abroad/2003/03_11_15_shadow_people/index.html"
    ? archiveAsset("/dunst/abroad/2003/03_11_15_shadow_people/shadow_people_01.html")
    : archiveRecord?.main ? new URL(archiveRecord.main, location.href) : archiveAsset(archivePath);
  const { doc, url } = await readLegacyPage(source);
  archiveContent.replaceChildren(rewriteContent(doc.body, url));
  for (const drawing of archiveContent.querySelectorAll('img[src*="/dunst/0/images/tegning_01.gif"]')) {
    const container = drawing.closest("#Tegning");
    if (container) container.remove();
    else {
      const table = drawing.closest("table");
      if (table && !table.textContent.trim()) table.remove();
      else drawing.remove();
    }
  }
  if (archivePath === "/dunst/links/links.html") {
    const content = archiveContent.querySelector("#Indhold");
    content?.querySelector(":scope > table.ramme")?.remove();
    content?.querySelectorAll(":scope > br").forEach((breakLine) => breakLine.remove());
    if (content) {
      const heading = document.createElement("h1");
      heading.className = "plain-page-title links-page-title";
      heading.textContent = "Links";
      content.prepend(heading);

      const instagramLinks = [
        ["AleX.T.C.", "https://www.instagram.com/alexisdragby/"],
        ["Andreas Tange Lange (Nuclear Family)", "https://www.instagram.com/theandreastange/"],
        ["Carsten Sparwath", "https://www.instagram.com/carstensparwath/"],
        ["Delores Düshess LaCour", "https://www.instagram.com/gevandt/"],
        ["Dennis Agerblad", "https://www.instagram.com/dennisagerblad/"],
        ["Hairwerk", "https://www.instagram.com/tommyholbech/"],
        ["Johnny Warehouse", "https://www.instagram.com/petervadim/"],
        ["Knud Vesterskov", "https://www.instagram.com/selvesteknudv/"],
        ["Lene Leth Lebbe", "https://www.instagram.com/leneleth/"],
        ["Liebling Siebling", "https://www.instagram.com/reinarsaiber/"],
        ["mAdam", "https://www.instagram.com/madamdedangelaim/"],
        ["Minimal Martin", "https://www.instagram.com/mm_tattoo/"],
        ["Miss Fish", "https://www.instagram.com/missfish_net/"],
        ["Nikolaj Tange Lange (Nuclear Family)", "https://www.instagram.com/nikolajism/"],
        ["Petruska", "https://www.instagram.com/renemyntman/"],
        ["Ramona Macho", "https://www.instagram.com/ramona_macho/"],
        ["Rosa Lux", "https://www.instagram.com/rosaluxmusic/"],
        ["Stimulundia", "https://www.instagram.com/stimulundia68/"],
        ["Søde Car O'lina", "https://www.instagram.com/hunter.desportes/"],
        ["Tina Trasch", "https://www.instagram.com/vav_lifestyle/"],
        ["Udart", "https://www.instagram.com/_udart_/"],
      ];
      const facebookLinks = [
        ["Ulle Dulle", "https://www.facebook.com/ulrik.r.pedersen/"],
        ["Puta", "https://www.facebook.com/seuxal.baltazar/"],
        ["Tove Hansen", "https://www.facebook.com/tove.hansen.50/"],
      ];
      const socialTable = document.createElement("table");
      socialTable.className = "ramme dunst-social-links";
      socialTable.cellPadding = "10";
      socialTable.cellSpacing = "0";
      const titleRow = socialTable.insertRow();
      const titleCell = titleRow.insertCell();
      titleCell.className = "head";
      titleCell.textContent = "dunst på Instagram og Facebook";
      const linksRow = socialTable.insertRow();
      const linksCell = linksRow.insertCell();
      const socialList = document.createElement("div");
      socialList.className = "dunst-social-list";
      const socialLinks = [
        ...instagramLinks.map(([name, url]) => ({name, url, platform: "instagram"})),
        ...facebookLinks.map(([name, url]) => ({name, url, platform: "facebook"})),
      ].sort((first, second) => first.name.localeCompare(second.name, "da", {sensitivity: "base"}));
      for (const {name, url, platform} of socialLinks) {
        const line = document.createElement("div");
        line.className = "dunst-social-entry";
        const icon = document.createElement("span");
        icon.className = `dunst-social-icon dunst-social-icon-${platform}`;
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = platform === "instagram"
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>';
        line.append(icon);
        const label = document.createElement("a");
        label.href = url;
        label.target = "_blank";
        label.rel = "noopener noreferrer";
        label.setAttribute("aria-label", `${name} på ${platform === "instagram" ? "Instagram" : "Facebook"}`);
        label.textContent = name;
        line.append(label);
        socialList.append(line);
      }
      linksCell.append(socialList);
      heading.after(socialTable);
    }
    const credit = document.createElement("p");
    credit.className = "links-drawing-credit";
    credit.textContent = "Tegning: Ramona Macho.";
    archiveContent.append(credit);
  }
  if (archivePath === "/dunst/about_us/index.html") {
    const subheadings = new Set([
      "dunst er", "Derudover er dunst:", "Hvordan startede dunst?", "dunst-fester",
      "dunst i Bøssehuset", "flere dunst's aktiviteter", "dunst CD udgivelse", "Bliv medlem!",
    ]);
    for (const heading of archiveContent.querySelectorAll("b,strong")) {
      if (subheadings.has(heading.textContent.replace(/\s+/g, " ").trim())) heading.classList.add("copy-heading");
    }
    const text = document.createTreeWalker(archiveContent, NodeFilter.SHOW_TEXT);
    while (text.nextNode()) {
      text.currentNode.textContent = text.currentNode.textContent
        .replaceAll("Martin Kjær", "Balthasar Castor")
        .replace("hermafoditter, transseksuelle, transvestitter", "hermafoditter, Interkønnede, transkønnede, transvestitter");
    }
  }
  if (/^\/dunst\/01_performere\/guests\/[^/]+\/index\.html$/.test(archivePath)) {
    document.body.classList.add("performer-profile");
    for (const card of archiveContent.querySelectorAll("table.ramme")) {
      card.classList.add("profile-card");
      const images = [...card.querySelectorAll("img")];
      const fitCard = () => {
        const widest = Math.max(0, ...images.map((image) => image.naturalWidth || 0));
        if (widest) card.style.setProperty("--profile-image-width", `${widest + 18}px`);
      };
      for (const image of images) image.addEventListener("load", fitCard, { once: true });
      fitCard();
    }
  }
  if (document.body.classList.contains("newsletter-archive")) {
    for (const link of archiveContent.querySelectorAll("a")) {
      const target = new URL(link.href, location.href);
      if (target.searchParams.get("path") === "/nyhedsbrev/nyhedsbrev.html") {
        link.href = archiveRoute(null, "/nyhedsbrev/gamle_nyheder/2011_11_26_nyhedsbrev.html");
      }
    }
  }
  if (archivePath === "/mobil/help.html") {
    for (const link of archiveContent.querySelectorAll("a")) {
      if (link.textContent.trim() === "Back") link.closest("table.ramme")?.remove();
    }
  }
  if (archivePath === "/dunst/film/05_09_28_videomarathon/index.html") {
    const video = document.createElement("iframe");
    video.className = "videomarathon-video";
    video.src = "https://www.youtube-nocookie.com/embed/bWTwdySaEb4";
    video.title = "Misundelse - Dennis Agerblad";
    video.loading = "lazy";
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    video.allowFullscreen = true;
    archiveContent.append(video);
  }
  if (archivePath === "/dunst/film/04_02_03_zullu/index.html") {
    const flashCell = archiveContent.querySelector("table.ramme")?.rows[1]?.cells[0];
    const firstPhoto = archiveRecord?.gallery[0];
    if (flashCell && firstPhoto) {
      const image = document.createElement("img");
      image.src = new URL(firstPhoto.image, location.href).href;
      image.alt = "Zulu Bingo";
      image.width = 446;
      image.height = 140;
      flashCell.replaceChildren(image);
    }
  }
  if (archivePath === "/dunst/film/skidt_kommer_til/index.html") showSkidtFilm();
  if (document.body.classList.contains("dunst-bio-page")) {
    if (archivePath === "/dunst/film/dunst_bio/2003/index.html") {
      const heading = archiveContent.querySelector("table.ramme .head");
      if (heading) heading.textContent = "dunstBio - vi har fået fjernsyn - 2003";
    }
    while (archiveContent.lastChild && (archiveContent.lastChild.nodeName === "BR" || archiveContent.lastChild.nodeType === Node.TEXT_NODE && !archiveContent.lastChild.textContent.trim())) archiveContent.lastChild.remove();
  }
  if (archivePath === "/dunst/press/2002/02_08_16_tv2/video_tv2_foto.html") showTv2News();
  if (archivePath === "/dunst/film/2009/julekalender/julekalender.html") {
    for (const link of archiveContent.querySelectorAll('a[href*="quibblo.com/quiz/bh6lG6F/"]')) link.remove();
  }
  if (/^\/dunst\/musik\/06_07_03_shave_your_pet\/(?:index|shave_your_pet)\.html$/.test(archivePath)) {
    const frame = archiveContent.querySelector('iframe[src*="shave_your_load.html"]');
    if (frame) {
      const covers = document.createElement("img");
      const nextCover = () => `${String(Math.floor(Math.random() * 23) + 1).padStart(2, "0")}.jpg`;
      covers.src = new URL(nextCover(), url).href;
      covers.alt = "Handdrawn covers";
      covers.className = "shave-cover";
      frame.replaceWith(covers);
      window.setInterval(() => {
        if (document.hidden) return;
        covers.src = new URL(nextCover(), url).href;
      }, 1000);
    }
    archiveContent.querySelector("#CC")?.remove();
  }
  if (archivePath === "/dunst/musik/06_02_11_ungdomshuset/index.html") {
    const heading = archiveContent.querySelector("table.ramme tr:first-child td.head:first-child b");
    if (heading) {
      const title = heading.textContent.trim().split(/\s+-\s+Live in concert/i)[0];
      heading.replaceChildren(document.createTextNode(`${title} -`), document.createElement("br"), document.createTextNode("Live in concert"));
    }
    const cover = archiveContent.querySelector('img[src*="odeur_front_00.jpg"]');
    if (cover) cover.src = cover.src.replace("odeur_front_00.jpg", "odeur_front.jpg");
    const firstPhoto = archiveContent.querySelector('img[src*="flyer_01.jpg"]');
    if (firstPhoto) {
      firstPhoto.src = archiveAsset("/dunst/musik/06_02_11_ungdomshuset/images/IMG_8463.jpg").href;
      firstPhoto.removeAttribute("width");
      firstPhoto.removeAttribute("height");
    }
    const details = archiveContent.querySelector("table.ramme tr:nth-child(3)");
    if (details) {
      const cell = document.createElement("td");
      cell.colSpan = 3;
      cell.className = "odeur-details";
      for (const original of [...details.cells]) {
        const section = document.createElement("div");
        section.className = "odeur-detail";
        section.append(...[...original.childNodes]);
        cell.append(section);
      }
      details.replaceChildren(cell);
    }
  }
  if (archivePath === "/dunst/film/music_videos/index.html") {
    const tv = archiveContent.querySelector('img[src*="tv_00.gif"]');
    if (tv) archiveContent.replaceChildren(tv);
  }
  if (archivePath === "/dunst/press/2005/05_05_27_tv2-lorry_brunch/index.html") {
    const videoUrl = new URL("video_tv2-lorry_player.html", url);
    const videoPage = await readLegacyPage(videoUrl);
    const videoTable = videoPage.doc.querySelector("iframe[src*='youtube.com']")?.closest("table.ramme");
    if (videoTable) {
      const wrapper = document.createElement("div");
      wrapper.append(videoTable.cloneNode(true));
      const video = document.createElement("div");
      video.className = "tv2-featured-video";
      video.append(rewriteContent(wrapper, videoPage.url));
      archiveContent.prepend(video);
    }
    for (const breakNode of archiveContent.querySelectorAll(":scope > br")) breakNode.remove();
  }
  if (archivePath === "/dunst/press/2005/05_05_27_tv2-lorry_brunch/video_tv2-lorry_player.html") {
    const broken = [...archiveContent.querySelectorAll("a")].find((link) => link.href.includes("tv2lorry.dk/moduler/nyheder/showregvideo.asp"));
    if (broken) {
      let previous = broken.previousSibling;
      while (previous && (previous.nodeName === "BR" || previous.nodeType === Node.TEXT_NODE && !previous.textContent.trim())) {
        const remove = previous;
        previous = previous.previousSibling;
        remove.remove();
      }
      if (previous?.nodeType === Node.TEXT_NODE && /Taget herfra:/i.test(previous.textContent)) previous.textContent = previous.textContent.replace(/Taget herfra:\s*/i, "");
      broken.nextSibling?.nodeName === "BR" && broken.nextSibling.remove();
      broken.remove();
    }
  }
  if (document.body.classList.contains("playing-tourist-page")) await showPlayingTourist();
  if (document.body.classList.contains("kanal-dunst-page")) await showKanalDunst();
  if (archivePath === "/dunst/abroad/2003/queeruption_berlin/index.html") {
    const flyer = archiveContent.querySelector('img[src$="/flyer.jpg"]');
    if (flyer) {
      flyer.src = archiveAsset("/dunst/abroad/2003/queeruption_berlin/2003_05_23_queerupti_10.jpg").href;
      flyer.width = 450;
      flyer.height = 532;
      flyer.alt = "Puta, Hairwerk & Miss fish.";
    }
  }
  upgradeFrontImages();
  adjustMusicFront();
  await updateMusicReleases();
  replaceFlashPlayer();
  unfoldFrontTable();
  groupMusicIntro();
  if (categoryFront === "abroad-front") {
    for (const link of archiveContent.querySelectorAll("a")) {
      if (new URL(link.href).searchParams.get("path") !== "/dunst/abroad/2003/ski_ferie/10/index.html") continue;
      link.href = archiveRoute(null, "/dunst/abroad/2003/ski_ferie/ski_oversigt.html");
    }
  }
  unfoldPerformers();
  await showDjFront();
  unfoldPress();
  if (archivePath === "/dunst/press/2005/index.html") {
    const section = document.createElement("section");
    section.className = "habibis-press-overview";
    const heading = document.createElement("h2");
    heading.textContent = "HabibisExil";
    section.append(heading, createHabibisPressLinks());
    archiveContent.prepend(section);
  }
  linkFilmImages();
  await addRadioLinks();
  await enhanceLeFreak();
  enhanceGayNightCabaret();
  collapseDemonstration();
  adjustKunstIDunst();
  sizeArchiveTables();
  markArchiveDates();
  enhanceCrossDress();
  foldSkoegeredenLineup();
  enhanceSabaahFlyers();
  enhancePartyTopArt();
  enhanceHrFruTop();
  collapseLongPartyIntro();
  fitPartyTopTable();
  linkKlfStory();
  await addHrFruFeatures();
  repairImageMaps();
  if (categoryFront === "film-front") {
    for (const spacer of archiveContent.querySelectorAll(":scope > .box_1x1 > br, :scope > .box_2x1 > br")) spacer.remove();
  }
  archiveContent.querySelectorAll("#gul, #yellowCorner").forEach((corner) => corner.remove());
  if (document.body.classList.contains("guestbook-archive")) {
    archiveContent.querySelector("#tom")?.remove();
    const intro = archiveContent.querySelector(".intro");
    const oldTitle = intro?.querySelector(":scope > b");
    if (oldTitle) {
      const title = document.createElement("h1");
      title.className = "plain-page-title";
      title.textContent = oldTitle.textContent.trim();
      oldTitle.replaceWith(title);
      intro.querySelectorAll(":scope > hr").forEach((rule) => rule.remove());
    }
  }
  if (document.body.classList.contains("calendar-archive")) {
    for (const heading of archiveContent.querySelectorAll("b,strong")) {
      if (/^dunst Calendar 20\d\d$/.test(heading.textContent.trim())) heading.classList.add("copy-heading");
    }
    const legend = archiveContent.querySelector("#CC");
    const calendar = archiveContent.querySelector("#Calendar, #Calender");
    if (calendar?.id === "Calender") calendar.id = "Calendar";
    for (const table of calendar?.querySelectorAll(":scope > table > tbody > tr > td > table") || []) {
      if (table.querySelector(":scope > tbody > tr > td.head[colspan='7']")) table.classList.add("calendar-month");
    }
    if (legend && calendar) {
      legend.setAttribute("role", "complementary");
      legend.setAttribute("aria-label", "The meaning of the colours");
      const legendImage = legend.querySelector("img");
      if (legendImage) legendImage.alt = "The meaning of the colours";
      calendar.before(legend);
    }
  }
  if (location.hash) {
    const name = decodeURIComponent(location.hash.slice(1));
    const anchor = document.getElementById(name) || [...archiveContent.querySelectorAll("[name]")].find((node) => node.getAttribute("name") === name);
    anchor?.scrollIntoView();
  }
  if (archivePath === "/dunst/film/music_videos/index.html") await showMusicVideos();
  else if (archivePath === "/dunst/abroad/2003/03_11_15_shadow_people/index.html") showShadowPeople();
  else if (archiveRecord?.gallery.length && categoryFront !== "radio-front" && !document.body.matches(".playing-tourist-page,.kanal-dunst-page")) {
    showGallery(true);
    if (document.body.classList.contains("habibis-party-page")) await formatHabibisArticles();
    combineHrFruFlow();
    combinePartyFlow();
    if (location.hash === "#klf") document.getElementById("klf")?.scrollIntoView();
  }
  addSupplementalPressMentions();
  if (document.body.classList.contains("press-article-page")) fitPressArticle(archiveContent);
  fitCaptionFigures();
  frameRecommendsImages();
  compactImageCaptionSpacing(document.querySelector(".page"));
  spaceArchiveBoxes(archiveContent);
  if (archivePath.startsWith("/dunst/02_parties/")) await window.DunstPartyCaptions?.apply(archivePath);
  if (archivePath.startsWith("/dunst/recommends/")) await window.DunstRecommendsCaptions?.apply(archivePath);
}

function spaceArchiveBoxes(container) {
  const box = "table.ramme, .recommends-box, .legacy-box, .front-panel, .date-table-scroll";
  for (const next of container.querySelectorAll(`:scope > :is(${box})`)) {
    const breaks = [];
    let previous = next.previousSibling;
    while (previous && (previous.nodeName === "BR" ||
        previous.nodeType === Node.COMMENT_NODE ||
        previous.nodeType === Node.TEXT_NODE && !previous.textContent.trim())) {
      if (previous.nodeName === "BR") breaks.push(previous);
      previous = previous.previousSibling;
    }
    if (!previous?.matches?.(box)) continue;
    breaks.forEach((node) => node.remove());
    previous.classList.add("archive-box-before");
    next.classList.add("archive-box-after");
  }
}

function fitCaptionFigures() {
  if (document.body.classList.contains("hr-fru-candidates-page")) return;
  for (const figure of document.querySelectorAll(".page figure:has(img + figcaption)")) {
    const image = figure.querySelector("img");
    if (!image) continue;
    const fit = () => {
      if (!image.naturalWidth) return;
      const style = getComputedStyle(figure);
      const inset = [style.paddingLeft, style.paddingRight, style.borderLeftWidth, style.borderRightWidth]
        .reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
      figure.style.setProperty("--figure-image-width", `${image.naturalWidth + inset}px`);
    };
    image.addEventListener("load", fit, { once: true });
    if (image.complete) fit();
  }
}

function createHabibisPressLinks() {
  const articles = [
    { path: "/dunst/press/2005/05_06_01_pan_habibi/pan_habibi.html", name: "Panbladet", logo: "/dunst/press/logoer/panbladet_logo.gif", date: "Juni 2005" },
    { path: "/dunst/press/2005/05_05_09_qx/habibis_qx.html", name: "QX", logo: "/dunst/press/logoer/qx_logo.gif", date: "9. Maj 2005" },
  ];
  const container = document.createElement("div");
  container.className = "habibis-press-articles";
  for (const { path, name, logo, date } of articles) {
    const article = document.createElement("article");
    article.className = "habibis-press-link";
    const heading = document.createElement("h2");
    heading.textContent = name;
    const logoLink = document.createElement("a");
    logoLink.href = archiveRoute(null, path);
    const image = document.createElement("img");
    image.src = archiveAsset(logo).href;
    image.alt = `${name} logo`;
    logoLink.append(image);
    const time = document.createElement("time");
    time.textContent = date;
    const readLink = document.createElement("a");
    readLink.href = logoLink.href;
    readLink.textContent = "Læs en anmeldelse af festen";
    article.append(heading, logoLink, time, readLink);
    container.append(article);
  }
  return container;
}

function formatHabibisArticles() {
  const grid = archiveGallery.querySelector(".grid");
  if (!grid) return;
  for (const path of ["/dunst/press/2005/05_06_01_pan_habibi/", "/dunst/press/2005/05_05_09_qx/"]) {
    [...grid.querySelectorAll(".media-card")].find((item) => item.querySelector("img")?.src.includes(path))?.remove();
  }
  grid.before(createHabibisPressLinks());
}

const supplementalPressMentions = {
  "/dunst/03_events/2004/04_07_17_belgrade_pride/index.html": [
    ["Kærlighed lagt for had.", "", "/dunst/press/2005/05_10_01_gritt_i_serbien/gritt_i_serbien.html"],
  ],
  "/dunst/film/from_scratch/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2002/02_11_01_filmhuset/02_11_01_filmhuset.html"],
  ],
  "/dunst/abroad/2003/03_11_15_shadow_people/index.html": [
    ["Siegessäule", "siegessaule_logo.jpg", "/dunst/press/2003/03_11_01_siegessaule/03_11_01_siegessaule.html"],
  ],
  "/dunst/recommends/2002/froeken_verden/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2002/02_09_01_frk_verden/02_09_01_frk_verden.html"],
    ["Siden Sidst", "siden_sidst_logo.gif", "/dunst/press/2002/02_09_01_siden_sidst/02_09_01_siden_sidst.html"],
  ],
  "/dunst/cafe/2003/arty_farty/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2003/03_04_01_arty_farty/03_04_01_arty_farty.html"],
  ],
  "/dunst/02_parties/fest_12_skoegereden/index.html": [
    ["BT", "bt_logo_00.gif", "/dunst/press/2003/03_08_18_bt/03_08_18_bt.html"],
  ],
  "/dunst/02_parties/fest_10_primate_nite/index.html": [
    ["Copenhagen Post", "cph_post_logo.gif", "/dunst/press/2003/03_04_25_cph_post/03_04_25_cph_post.html"],
  ],
  "/dunst/02_parties/fest_07_nytaar/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2003/03_02_01_nytaar/03_02_01_nytaar.html"],
  ],
  "/dunst/02_parties/fest_11_helligaanden/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2003/03_08_01_sodoma/03_08_01_sodoma.html"],
  ],
  "/dunst/02_parties/fest_06_lefreak/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2002/02_12_01_pan_lefreak/02_12_01_pan_lefreak.html"],
    ["Copenhagen Post", "cph_post_logo.gif", "/dunst/press/2002/02_11_15_cph_post/02_11_15_cph_post.html"],
  ],
  "/dunst/film/04_02_03_zullu/index.html": [
    ["Citadel", "citadel_logo.gif", "/dunst/press/2004/04_03_01_zulu_citadel/04_03_01_zulu_citadel.html"],
    ["Søndags Avisen", "soendagsavisen_logo.gif", "/dunst/press/2004/04_02_08_zulu/04_02_08_zulu.html"],
  ],
  "/dunst/musik/04_02_07_munch_of_us/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2004/04_03_01_munch_of_us/04_03_01_munch_of_us.html"],
    ["Bronx Magazine", "bronx_logo.jpg", "/dunst/press/2004/04_02_01_bronx_of_us/04_03_01_bronx_of_us.html"],
    ["Citadel", "citadel_logo.gif", "/dunst/press/2004/04_02_01_elektrikal_release/04_02_01_elektrikal_release.html"],
  ],
  "/dunst/recommends/2004/04_02_07_munch_of_us/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2004/04_03_01_munch_of_us/04_03_01_munch_of_us.html"],
    ["Bronx Magazine", "bronx_logo.jpg", "/dunst/press/2004/04_02_01_bronx_of_us/04_03_01_bronx_of_us.html"],
    ["Citadel", "citadel_logo.gif", "/dunst/press/2004/04_02_01_elektrikal_release/04_02_01_elektrikal_release.html"],
  ],
  "/dunst/recommends/2003/03_02_01_studio_54/index.html": [
    ["Out & About", "out_and_about_logo.jpg", "/dunst/press/2003/03_02_01_studio54/03_02_01_studio54.html"],
  ],
  "/dunst/recommends/2004/04_09_25_puha_benutz/index.html": [
    ["Panbladet", "panbladet_logo.gif", "/dunst/press/2004/04_02_01_pan/04_02_01_puta.html"],
    ["Ekstra Bladet", "ekstra_bladet.gif", "/dunst/press/2004/04_10_27_ekstra_bladet/04_09_27_ekstrabladet.html"],
  ],
};

function addSupplementalPressMentions() {
  const mentions = supplementalPressMentions[archivePath];
  if (!mentions) return;
  const existing = new Set([...document.querySelectorAll("#archive-content a[href], #archive-gallery a[href]")]
    .map((link) => new URL(link.href).searchParams.get("path")));
  const missing = mentions.filter(([, , path]) => !existing.has(path));
  if (!missing.length) return;
  const group = document.createElement("section");
  group.className = "press-mentions";
  if (new Set([
    "/dunst/02_parties/fest_06_lefreak/index.html",
    "/dunst/02_parties/fest_07_nytaar/index.html",
    "/dunst/02_parties/fest_10_primate_nite/index.html",
    "/dunst/02_parties/fest_11_helligaanden/index.html",
    "/dunst/02_parties/fest_12_skoegereden/index.html",
    "/dunst/cafe/2003/arty_farty/index.html",
    "/dunst/film/04_02_03_zullu/index.html",
    "/dunst/musik/04_02_07_munch_of_us/index.html",
    "/dunst/recommends/2004/04_02_07_munch_of_us/index.html",
  ]).has(archivePath)) {
    const heading = document.createElement("h2");
    heading.textContent = "Pressen skrev:";
    group.append(heading);
  }
  const links = document.createElement("div");
  links.className = "press-mentions-items";
  for (const [name, logo, path] of missing) {
    const card = document.createElement("article");
    card.className = "media-card press-logo-card";
    const link = document.createElement("a");
    link.href = archiveRoute(null, path);
    link.setAttribute("aria-label", `Læs artiklen fra ${name} under The Press`);
    if (logo) {
      const image = document.createElement("img");
      image.src = archiveAsset(`/dunst/press/logoer/${logo}`).href;
      image.alt = `${name} logo`;
      const enlarge = () => { if (image.naturalWidth && image.naturalWidth < 260) image.style.width = "260px"; };
      image.addEventListener("load", enlarge, { once: true });
      if (image.complete) enlarge();
      link.append(image);
    } else {
      card.className = "media-card press-text-card";
      link.textContent = name;
    }
    card.append(link);
    links.append(card);
  }
  group.append(links);
  const partyFlow = archiveContent.querySelector(".party-flow, .hr-fru-flow");
  if (partyFlow) partyFlow.before(group);
  else {
    archiveGallery.hidden = false;
    archiveGallery.prepend(group);
  }
}

function showGallery(preserveMain = false) {
  const items = (archiveRecord?.gallery || []).filter((item) =>
    archivePath !== "/dunst/02_parties/fest_23_sabaah/index.html" ||
    !/\/images\/(?:6|Scan%20037)\.jpg$/.test(item.image));
  const groupedPress = new Set([
    "/dunst/02_parties/fest_05_electro/index.html",
    "/dunst/03_events/2004/04_03_04_scissor_sisters/index.html",
    "/dunst/cafe/2002/gay_night_cabaret/index.html",
  ]).has(archivePath);
  const mainImagePaths = preserveMain ? new Set([...archiveContent.querySelectorAll("img")].map((img) => new URL(img.src, location.href).pathname)) : new Set();
  const mainLines = archiveRecord?.main_lines || [];
  const normalized = (value) => value.trim().toLocaleLowerCase("da");
  const repeatedPartyHeaders = new Set();
  const photoCredits = new Set();
  const partyCredit = (line) => line.match(/^(?:photo|foto)\s*:\s*(.+)$/i)?.[1] ||
    line.match(/\s+(?:photo|foto)\s*:\s*([^.!?]{2,80})\.?$/i)?.[1];
  if (partyGallery) {
    const headingCounts = new Map();
    for (const item of items) {
      for (const line of (item.detail_lines || []).slice(0, 2)) {
        const key = normalized(line);
        headingCounts.set(key, (headingCounts.get(key) || 0) + 1);
      }
      for (const line of item.detail_lines || []) {
        const credit = partyCredit(line);
        if (credit) for (const name of credit.split(/\s*(?:,|&|\band\b)\s*/i)) {
          const clean = name.trim().replace(/\.$/, "");
          if (clean) photoCredits.add(clean);
        }
      }
    }
    for (const [line, count] of headingCounts) {
      if (count >= Math.max(2, Math.ceil(items.length * .4))) repeatedPartyHeaders.add(line);
    }
  }
  if (!preserveMain && mainLines.length) {
    const title = document.createElement("span");
    title.textContent = mainLines[0];
    archiveTitle.replaceChildren(title);
    if (mainLines[1]) {
      const date = document.createElement("time");
      date.textContent = mainLines[1];
      archiveTitle.append(date);
    }
    archiveTitle.hidden = false;
  }
  archiveContent.hidden = !preserveMain;
  archiveGallery.hidden = false;
  archiveGallery.className = "archive-gallery";
  archiveGallery.replaceChildren();
  const remainingMainText = mainLines.slice(2).filter((line) => !mainLines.slice(0, 2).some((head) => normalized(line) === normalized(head)))
    .map((line) => line.replace(/\bPrint denne side\b/gi, "").trim()).filter(Boolean);
  if (!preserveMain && remainingMainText.length) {
    const eventCopy = document.createElement("div");
    eventCopy.className = "event-copy";
    for (const line of remainingMainText) {
      const paragraph = document.createElement("p");
      paragraph.textContent = line;
      eventCopy.append(paragraph);
    }
    archiveGallery.append(eventCopy);
  }
  const grid = document.createElement("div");
  grid.className = "grid";
  let pressGroupItems;
  for (const [index, item] of items.entries()) {
    const pressArticle = !archivePath.startsWith("/dunst/press/") &&
      item.url && new URL(item.url, location.href).pathname.startsWith("/dunst/press/");
    if (pressArticle && document.body.classList.contains("habibis-party-page")) continue;
    if (archivePath === "/dunst/abroad/2003/queeruption_berlin/index.html" && item.image.endsWith("/flyer.jpg")) continue;
    if (archivePath === "/dunst/press/2005/05_05_27_tv2-lorry_brunch/index.html" && item.url?.endsWith("video_tv2-lorry_player.html")) continue;
    if (archivePath === "/dunst/musik/06_02_11_ungdomshuset/index.html" && item.image.endsWith("/flyer_01.jpg")) continue;
    if (archivePath === hrFruRoot + "index.html" && /\/hr_fru_dunst_0[23]\.html$/.test(item.url || "")) continue;
    if (mainImagePaths.has(new URL(item.image, location.href).pathname)) continue;
    const card = document.createElement("article");
    card.className = "media-card";
    if (pressArticle) card.classList.add("press-logo-card");
    if (archivePath === "/dunst/02_parties/fest_16_coma/index.html" && item.url?.endsWith("/coma_club_04.html")) card.id = "klf";
    if (archivePath === "/dunst/02_parties/fest_17_spejder/index.html" && item.image.endsWith("/kvinde_huller.gif")) card.classList.add("spejder-knob-card");
    const image = document.createElement("img");
    image.src = item.image;
    if (item.image === froekenDennisPhoto) card.classList.add("froeken-dennis-photo");
    image.alt = item.alt || `Arkivbillede ${index + 1} fra ${archiveItemTitle()}`;
    const pressName = pressArticle ?
      /panbladet/i.test(item.image) ? "Panbladet" :
      /nat_og_dag/i.test(item.image) ? "Nat&Dag" :
      /cum_and_c/i.test(item.image) ? "Cum & C" :
      /politikken/i.test(item.image) ? "Politiken" :
      /urban/i.test(item.image) ? "Urban" :
      /bt_logo/i.test(item.image) ? "BT" : "The Press" : "";
    if (pressArticle) image.alt = `${pressName} logo`;
    image.loading = index < 3 ? "eager" : "lazy";
    const shaveVideo = archivePath === "/dunst/02_parties/fest_21_shave_your_pet/index.html"
      ? item.image.endsWith("/tove_hansen_video_00.jpg") ? "FJ5iOYvhFMc"
        : item.image.endsWith("/video_dennis_thom_00.jpg") ? "Kswkim-4W2I" : ""
      : "";
    const kunstVideo = archivePath === "/dunst/kunst/kunst_i_dunst/index.html" &&
      item.image.endsWith("/google_dyrepasser_00.jpg") ? "Y_DPundjHN4" : "";
    if (shaveVideo || kunstVideo) {
      card.classList.add("shave-video-card");
      card.style.setProperty("--caption-card-width", "442px");
      const video = document.createElement("iframe");
      video.src = `https://www.youtube-nocookie.com/embed/${shaveVideo || kunstVideo}${kunstVideo ? "?start=1" : ""}`;
      video.title = kunstVideo ? "Dennis Agerblad som dyrepasser" : item.detail_lines?.at(-1) || "Shave Your Pet";
      video.loading = "lazy";
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      video.allowFullscreen = true;
      card.append(video);
    } else if (pressArticle) {
      const link = document.createElement("a");
      link.href = localDestination(item.url, location.href);
      link.setAttribute("aria-label", `Læs artiklen fra ${pressName} under The Press`);
      link.append(image);
      card.append(link);
    } else card.append(image);
    let detailLines = (item.detail_lines || []).filter((line) => !mainLines.some((mainLine) => normalized(line) === normalized(mainLine)))
      .map((line) => line.replace(/\s*Print denne side\b/gi, "").trim()).filter(Boolean);
    if (document.body.classList.contains("recommends-archive")) detailLines = detailLines.filter(line =>
      !/^(?:we\s+recommend|dunst\s+recommends?(?:\s+this\s+event)?):?$/i.test(line) &&
      !/^\d{1,2}\.\s*(?:januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)\s*-?\s*\d{4}$/i.test(line));
    if (partyGallery) detailLines = detailLines
      .filter((line) => !repeatedPartyHeaders.has(normalized(line)) && !/^(?:photo|foto)\s*:/i.test(line))
      .map((line) => line.replace(/\s+(?:photo|foto)\s*:\s*[^.!?]{2,80}\.?$/i, "").trim())
      .filter(Boolean);
    if (archivePath === "/dunst/film/music_videos/index.html") {
      detailLines = detailLines.filter((line) => !/^Music Videos$/i.test(line));
      const title = detailLines.find((line) => line.includes(":"));
      const heading = detailLines[0] === "Nuclear Family" ? detailLines.shift() : title?.split(":")[0];
      if (title && heading && heading !== "Nuclear Family") detailLines = detailLines.map((line) => line === title ? line.slice(heading.length + 1).trim() : line);
      if (heading) {
        const head = document.createElement("h2");
        head.className = "music-video-card-head";
        head.textContent = heading;
        card.prepend(head);
      }
      const link = document.createElement("a");
      link.className = "music-video-card-link";
      link.href = localDestination(item.url, location.href);
      link.append(image);
      card.append(link);
    }
    if (detailLines.length) {
      const body = document.createElement("div");
      body.className = "card-body";
      for (const line of detailLines) {
        const detail = document.createElement("p");
        detail.className = "original-photo-text";
        detail.textContent = line;
        body.append(detail);
      }
      if (archivePath === "/dunst/film/music_videos/index.html") card.querySelector(".music-video-card-link").append(body);
      else if (card.id === "klf") {
        const details = document.createElement("details");
        details.className = "klf-card-details";
        const summary = document.createElement("summary");
        summary.textContent = "Læs mere om bandet KLF";
        details.append(summary, body);
        card.append(details);
      } else if (archivePath === "/dunst/03_events/2004/04_03_04_scissor_sisters/index.html" &&
                 detailLines.join(" ").length > 450) {
        const details = document.createElement("details");
        details.className = "event-story-details";
        const summary = document.createElement("summary");
        summary.textContent = "læs om festen";
        details.append(summary, body);
        card.append(details);
      } else card.append(body);
    }
    if (!shaveVideo && !kunstVideo && document.body.classList.contains("archive-detail") && !document.body.classList.contains("hr-fru-candidates-page")) {
      const fitToImage = () => {
        if (!image.naturalWidth) return;
        const frame = pressArticle ? (groupedPress ? 0 : 26)
          : partyGallery ? (detailLines.length ? 2 : 0)
          : document.body.classList.contains("abroad") && detailLines.length ? 26
          : document.body.classList.contains("guest-performers-overview") ? 26
          : archivePath === "/dunst/film/music_videos/index.html" ? 14 : 2;
        if (pressArticle && image.naturalWidth < 260) image.style.width = "260px";
        card.style.setProperty("--caption-card-width", `${Math.max(image.naturalWidth, pressArticle ? 260 : 0) + frame}px`);
      };
      image.addEventListener("load", fitToImage, { once: true });
      if (image.complete) fitToImage();
    }
    if (pressArticle && groupedPress) {
      if (!pressGroupItems) {
        const group = document.createElement("section");
        group.className = "press-mentions";
        const heading = document.createElement("h2");
        heading.textContent = "Pressen skrev:";
        pressGroupItems = document.createElement("div");
        pressGroupItems.className = "press-mentions-items";
        group.append(heading, pressGroupItems);
        grid.append(group);
      }
      pressGroupItems.append(card);
    } else grid.append(card);
  }
  archiveGallery.append(grid);
  if (partyGallery && photoCredits.size) {
    const credit = document.createElement("p");
    credit.className = "party-photo-credits";
    credit.textContent = `foto: ${[...photoCredits].join(", ")}.`;
    archiveGallery.append(credit);
  }
  if (document.body.classList.contains("archive-detail") && grid.childElementCount === 1) {
    grid.classList.add("gallery-single");
    for (const card of grid.querySelectorAll(".media-card")) {
      const image = card.querySelector("img");
      if (!image) continue;
      const fit = () => {
        if (image.naturalWidth) card.style.setProperty("--gallery-card-width", `${Math.min(800, image.naturalWidth + 24)}px`);
      };
      image.addEventListener("load", fit, { once: true });
      if (image.complete) fit();
    }
  }
}

const mergedRadioPages = new Set([
  "/dunst/radio/08_jonas_kenneth/05_06_04_radio_flyer.html",
  "/dunst/radio/05/05_05_23_radio_flyer.html",
  "/dunst/radio/04/05_05_09_radio_flyer.html",
  "/dunst/radio/03/05_04_25_radio_flyer.html",
  "/dunst/radio/02/05_04_11_radio_flyer.html",
  "/dunst/radio/01/05_03_25_radio_flyer.html",
  "/dunst/press/2003/03_04_26_p1_/03_04_26_p1.html",
  "/dunst/press/2006/06_02_28_p1_klubvaerelset/06_02_28_p1.html",
]);
const mergedDjPages = new Set(["djuna_barnes", "rosa_lux", "minimal_martin", "stimulundia", "alexis", "carsten", "hairwerk", "miss_fish", "nikolaj", "vibeke", "oli_viagra"]
  .flatMap((name) => [`/dunst/dj/${name}.html`, `/dunst/dj/${name}_frameset.html`]).concat(["/dunst/dj/index.html", "/dunst/dj/right.html"]));

if (archivePath === "/dunst/musik/07_01_01_nuclear_fam/action_disco.html") {
  location.replace(`${archiveRoute(null, "/dunst/musik/index.html")}#nuclear-double-single`);
} else if (archivePath === "/nyhedsbrev/gamle_nyheder/right.html") {
  location.replace(archiveRoute(null, "/nyhedsbrev/gamle_nyheder/index.html"));
} else if (archivePath === "/nyhedsbrev/nyhedsbrev.html") {
  location.replace(archiveRoute(null, "/nyhedsbrev/gamle_nyheder/2011_11_26_nyhedsbrev.html"));
} else if (mergedRadioPages.has(archivePath)) {
  location.replace(archiveRoute(null, "/dunst/radio/index.html"));
} else if (mergedDjPages.has(archivePath)) {
  location.replace(archiveRoute(null, "/dunst/dj/dj_ny.html"));
} else if (archivePath === "/dunst/news/forside_nyt.html") {
  location.replace(archiveRoute(null, "/dunst/01_performere/04_johnny_warehouse/index.html"));
} else if ([
  "/dunst/01_performere/14_madam/madam_01.html",
  "/dunst/01_performere/14_madam/madam_02.html",
  "/dunst/01_performere/09_stimulundia/stimulundia_08.html",
  "/dunst/01_performere/09_stimulundia/stimulundia_09.html",
].includes(archivePath)) {
  location.replace(archiveRoute(null, "/dunst/press/2004/04_04_01_romeo_om_dunst/04_04_01_romeo_om_dunst.html"));
} else if (archivePath?.startsWith("/dunst/01_performere/") && window.DUNST_PERFORMER_PHOTO_PAGES?.has(archivePath)) {
  const profileRoot = archivePath.match(/^\/dunst\/01_performere\/[^/]+\//)?.[0];
  location.replace(archivePath.startsWith("/dunst/01_performere/05_hairwerk/")
    ? new URL("hairwerk.html", location.href).href
    : archiveRoute(null, `${profileRoot}index.html`));
} else if (["/dunst/musik/05_berlin_insane/index.html", "/dunst/musik/05_berlin_insane/05_berlin_insane_01.html", "/dunst/musik/05_berlin_insane/right.html"].includes(archivePath)) {
  location.replace(archiveRoute(null, "/dunst/musik/index.html"));
} else if ([hrFruRoot + "hr_fru_dunst_03.html", hrFruRoot + "hr_fru_banner.html", hrFruRoot + "hr_fru_banner_01.html", hrFruRoot + "kattegorier/kattegorier_frameset.html"].includes(archivePath)) {
  location.replace(archiveRoute(null, hrFruRoot + "index.html"));
} else if (archivePath === "/dunst/02_parties/fest_16_coma/coma_club_04.html") {
  location.replace(`${archiveRoute(null, "/dunst/02_parties/fest_16_coma/index.html")}#klf`);
} else if (archivePath === hrFruRoot + "kandidater/kandidat_frameset_lene.html") {
  location.replace(archiveRoute(null, hrFruRoot + "kandidater/lene_frameset.html"));
} else if (photoToGallery.has(archivePath)) {
  location.replace(archiveRoute("billeder", photoToGallery.get(archivePath)));
} else if (/^\/dunst\/01_performere\/05_hairwerk\/hairwerk_\d+\.html$/.test(archivePath)) {
  location.replace(new URL("hairwerk.html", location.href));
} else if (!archivePath || !["/dunst/", "/nyhedsbrev/"].some((prefix) => archivePath.startsWith(prefix)) && archivePath !== "/mobil/help.html" || archivePath.includes("..")) {
  archiveContent.textContent = "Siden blev ikke fundet.";
} else {
  document.title = document.body.hasAttribute("data-performance-home")
    ? "dunst" : `${archiveItemTitle()} | dunst`;
  addBackLink();
  if (archiveView === "image") showArchiveImage();
  else if (archivePath === "/dunst/radio/player.html") showRadioPlayer();
  else if (archiveView === "billeder" && archiveRecord) showGallery();
  else showMain().catch((error) => { archiveContent.textContent = error.message; });
}
