const menuPreviewRoutes = new Map([
  ["/dunst/02_parties/index.html", "parties.html"],
  ["/dunst/01_performere/05_hairwerk/index.html", "hairwerk.html"],
]);
const previewBuild = "20261120-dunst-launch";
const mobileMenuQuery = matchMedia("(max-width: 720px), (max-width: 1024px) and (max-height: 500px)");
const performanceHomePath = "/dunst/01_performere/200_billeder_help.html";
const menuOrder = [
  "PERFORMANCE GROUP", "dunst MUSIC", "dunst RADIO", "dunst PARTIES", "dunst EVENTS",
  "dunst ABROAD", "dunst CAFÉ", "dunst FILMS", "dunst CALENDAR", "dunst DJ's",
  "dunst HISTORY", "the PRESS", "dunst GUESTBOOK", "dunst NEWSLETTER", "dunst RECOMENDS", "LINKS",
];
const recommendsChildren = [];
let recommendsYear;
let recommendsMonth;
const { listedItems, monthNames } = window.DUNST_RECOMMENDS;
for (const item of listedItems) {
  if (item.year !== recommendsYear) {
    recommendsChildren.push({label: `${item.year}:`});
    recommendsYear = item.year;
    recommendsMonth = undefined;
  }
  if (item.month !== recommendsMonth) {
    recommendsMonth = item.month;
    if (item.month) recommendsChildren.push({label: `${monthNames[item.month - 1]}:`, month: true});
  }
  recommendsChildren.push({label: item.label, url: `https://dunst.dk${item.path}`});
}
window.DUNST_PREVIEW_DATA.menu.push({
  label: "dunst RECOMENDS", url: "https://dunst.dk/dunst/recommends/index.html",
  color: "#ff6600", children: recommendsChildren,
});
const orderedMenu = [...window.DUNST_PREVIEW_DATA.menu].sort((a, b) =>
  menuOrder.indexOf(a.label) - menuOrder.indexOf(b.label));

function menuDestination(url) {
  const original = new URL(url, location.href);
  if (!["dunst.dk", "www.dunst.dk"].includes(original.hostname)) return original.href;
  const preview = menuPreviewRoutes.get(original.pathname);
  if (preview) {
    const route = new URL(preview, location.href);
    for (const [key, value] of original.searchParams) route.searchParams.set(key, value);
    route.searchParams.set("v", previewBuild);
    route.hash = original.hash;
    return route.href;
  }
  const route = new URL("archive.html", location.href);
  route.searchParams.set("path", original.pathname);
  for (const [key, value] of original.searchParams) route.searchParams.set(key, value);
  route.searchParams.set("v", previewBuild);
  route.hash = original.hash;
  return route.href;
}

function galleryDestination(url) {
  const destination = menuDestination(url);
  const route = new URL(destination, location.href);
  if (!route.pathname.endsWith("/archive.html")) return destination;
  const originalPath = new URL(url, location.href).pathname;
  if (!window.DUNST_ARCHIVE_DATA?.[originalPath]?.gallery.length) return destination;
  route.searchParams.set("view", "billeder");
  return route.href;
}

function menuAnchor(item, className, activePath = currentArchivePath) {
  const anchor = document.createElement("a");
  anchor.className = className;
  anchor.href = menuDestination(item.url);
  anchor.textContent = item.label;
  if (item.color) anchor.style.color = item.color;
  if (item.newsletter) anchor.classList.add("newsletter-link");
  const currentMainPage = location.pathname.replace("-billeder.html", ".html");
  const selected = activePath
    ? new URL(item.url).pathname === activePath
    : anchor.pathname === currentMainPage;
  if (selected) anchor.setAttribute("aria-current", "page");
  return anchor;
}

const menuRoot = document.getElementById("full-menu");
const menuSidebar = document.getElementById("site-menu");
const isPlainClick = (event) => event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
let savedMenuScroll;
try { savedMenuScroll = JSON.parse(sessionStorage.getItem("dunst-menu-scroll") || "null"); } catch {}
const restoreMenuScroll = () => {
  if (savedMenuScroll?.target !== location.href) return;
  const link = [...menuRoot.querySelectorAll("a.menu-link, a.menu-child")].find((item) => item.href === savedMenuScroll.target);
  if (mobileMenuQuery.matches && link && Number.isFinite(savedMenuScroll.offset)) {
    const offset = link.getBoundingClientRect().top - menuSidebar.getBoundingClientRect().top;
    menuSidebar.scrollTop += offset - savedMenuScroll.offset;
  } else {
    menuSidebar.scrollTop = savedMenuScroll.top;
  }
};
menuRoot.addEventListener("click", (event) => {
  const link = event.target.closest("a.menu-child, a.menu-link");
  if (!link || !isPlainClick(event)) return;
  const child = link.classList.contains("menu-child");
  if (!child && (!mobileMenuQuery.matches || link.getAttribute("aria-current") === "page" ||
      link.parentElement.querySelector('.menu-expander[aria-expanded="true"]'))) return;
  const offset = link.getBoundingClientRect().top - menuSidebar.getBoundingClientRect().top;
  sessionStorage.setItem("dunst-menu-scroll", JSON.stringify({target: link.href, top: menuSidebar.scrollTop, offset}));
  if (child) {
    const group = link.closest(".menu-group").querySelector(".menu-link").textContent;
    sessionStorage.setItem("dunst-menu-group", group);
    sessionStorage.setItem("dunst-menu-open", "true");
    sessionStorage.removeItem("dunst-animate-menu-to");
  }
}, true);
menuRoot.classList.add("menu-initializing");
const menuStates = [];
let selectedMenuState = null;
let menuAction = 0;
const currentArchivePath = new URLSearchParams(location.search).get("path") || document.body.dataset.archivePath ||
  (document.body.hasAttribute("data-performance-home") ? performanceHomePath : null);
const isPerformanceHome = document.body.hasAttribute("data-performance-home");

document.addEventListener("toggle", (event) => {
  const details = event.target;
  if (!(details instanceof HTMLDetailsElement)) return;
  const label = details.querySelector(":scope > summary")?.firstChild;
  if (label?.nodeType !== Node.TEXT_NODE) return;
  label.textContent = label.textContent.replace(
    /^(\s*[Ll]æs )(?:mere|mindre)\b/,
    `$1${details.open ? "mindre" : "mere"}`,
  );
}, true);

function rememberGroup(state, open) {
  sessionStorage.setItem("dunst-menu-group", state.label);
  sessionStorage.setItem("dunst-menu-open", String(open));
}

function setGroupOpen(state, open) {
  state.isOpen = open;
  state.children.classList.toggle("is-open", open);
  state.children.inert = !open;
  state.children.setAttribute("aria-hidden", String(!open));
  state.button.setAttribute("aria-expanded", String(open));
  state.button.setAttribute("aria-label", `${open ? "Skjul" : "Vis"} underpunkter til ${state.label}`);
}

function slideTime(state) {
  return matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : state.duration;
}

function toggleMenuGroup(state) {
  const action = ++menuAction;
  if (state.isOpen) {
    setGroupOpen(state, false);
    rememberGroup(state, false);
    return;
  }
  rememberGroup(state, true);
  const previous = menuStates.find((item) => item.isOpen);
  if (previous) {
    setGroupOpen(previous, false);
    setTimeout(() => { if (action === menuAction) setGroupOpen(state, true); }, slideTime(previous));
  } else setGroupOpen(state, true);
}

for (const link of document.querySelectorAll("[data-history-back]")) {
  link.addEventListener("click", (event) => {
    const previous = document.referrer && new URL(document.referrer);
    if (previous && previous.origin === location.origin && previous.pathname.startsWith(new URL("./", location.href).pathname) && history.length > 1) {
      event.preventDefault();
      history.back();
    }
  });
}
for (const [index, section] of orderedMenu.entries()) {
  const group = document.createElement("div");
  group.className = "menu-group";
  if (section.newsletter) group.classList.add("newsletter-group");
  if (section.label === "dunst RECOMENDS") group.classList.add("recommends-menu-group");
  const row = document.createElement("div");
  row.className = "menu-row";
  const sectionLink = menuAnchor(section, "menu-link");
  row.append(sectionLink);
  if (section.children.length) {
    const children = document.createElement("div");
    children.className = "menu-children";
    children.id = `menu-children-${index}`;
    const inner = document.createElement("div");
    inner.className = "menu-children-inner";
    let hasCurrentPage = sectionLink.getAttribute("aria-current") === "page";
    const firstNewsletter = section.newsletter && hasCurrentPage && section.children.find((item) => item.url);
    const activeChildPath = firstNewsletter ? new URL(firstNewsletter.url).pathname : currentArchivePath;
    for (const child of section.children) {
      if (child.url) {
        const link = menuAnchor(child, "menu-child", activeChildPath);
        if (link.getAttribute("aria-current") === "page") hasCurrentPage = true;
        inner.append(link);
      } else {
        const heading = document.createElement("span");
        heading.className = child.month ? "menu-year menu-month" : "menu-year";
        heading.textContent = child.label;
        inner.append(heading);
      }
    }
    children.append(inner);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-expander";
    button.textContent = "▾";
    button.setAttribute("aria-label", `Vis underpunkter til ${section.label}`);
    button.setAttribute("aria-controls", children.id);
    button.setAttribute("aria-expanded", "false");
    children.inert = true;
    children.setAttribute("aria-hidden", "true");
    row.append(button);
    group.append(row, children);
    const sectionPath = new URL(section.url).pathname;
    const state = {
      button, children, sectionLink, label: section.label, isOpen: false, duration: 400,
      pathPrefix: section.label === "the PRESS" ? "/dunst/press/" : sectionPath.slice(0, sectionPath.lastIndexOf("/") + 1),
      childPrefixes: section.children.filter((item) => item.url).map((item) => {
        const path = new URL(item.url).pathname;
        return path.slice(0, path.lastIndexOf("/") + 1);
      }),
    };
    menuStates.push(state);
    if (hasCurrentPage) selectedMenuState = state;
    button.addEventListener("click", () => toggleMenuGroup(state));
    sectionLink.addEventListener("click", (event) => {
      if (!isPlainClick(event)) return;
      if (state.isOpen || sectionLink.getAttribute("aria-current") === "page") {
        event.preventDefault();
        toggleMenuGroup(state);
        return;
      }
      if (mobileMenuQuery.matches) {
        sessionStorage.removeItem("dunst-animate-menu-to");
        rememberGroup(state, true);
        return;
      }
      const previous = menuStates.find((item) => item.isOpen);
      if (previous !== state) sessionStorage.setItem("dunst-animate-menu-to", sectionLink.href);
      else sessionStorage.removeItem("dunst-animate-menu-to");
      rememberGroup(state, true);
      if (previous && previous !== state) {
        event.preventDefault();
        const action = ++menuAction;
        setGroupOpen(previous, false);
        setTimeout(() => { if (action === menuAction) location.assign(sectionLink.href); }, slideTime(previous));
      }
    });
  } else {
    group.append(row);
    sectionLink.addEventListener("click", (event) => {
      if (!isPlainClick(event) || mobileMenuQuery.matches) return;
      const previous = menuStates.find((item) => item.isOpen);
      if (!previous) return;
      event.preventDefault();
      const action = ++menuAction;
      setGroupOpen(previous, false);
      rememberGroup(previous, false);
      setTimeout(() => {
        if (action === menuAction) location.assign(sectionLink.href);
      }, slideTime(previous));
    });
  }
  menuRoot.append(group);
  const current = menuStates[menuStates.length - 1];
  if (current?.children === group.lastElementChild) {
    current.duration = Math.min(900, Math.max(260, Math.round(current.children.firstElementChild.scrollHeight * 1.1)));
    current.children.style.setProperty("--menu-slide-duration", `${current.duration}ms`);
  }
}
menuRoot.lastElementChild?.classList.add("menu-last-group");

if (!selectedMenuState && currentArchivePath) {
  selectedMenuState = menuStates
    .flatMap((state) => state.childPrefixes.map((prefix) => ({ state, prefix })))
    .filter(({ prefix }) => currentArchivePath.startsWith(prefix))
    .sort((a, b) => b.prefix.length - a.prefix.length)[0]?.state
    || menuStates.find((state) => currentArchivePath.startsWith(state.pathPrefix))
    || null;
}
if (selectedMenuState?.label === "the PRESS") selectedMenuState.sectionLink.classList.add("is-current-section");
const animateMenuOnArrival = sessionStorage.getItem("dunst-animate-menu-to") === location.href;
sessionStorage.removeItem("dunst-animate-menu-to");
if (!isPerformanceHome && selectedMenuState && !animateMenuOnArrival && !(sessionStorage.getItem("dunst-menu-group") === selectedMenuState.label && sessionStorage.getItem("dunst-menu-open") === "false")) {
  setGroupOpen(selectedMenuState, true);
}
restoreMenuScroll();
let menuInitialized = false;
function finishMenuInitialization() {
  if (menuInitialized) return;
  menuInitialized = true;
  menuRoot.classList.remove("menu-initializing");
  restoreMenuScroll();
  requestAnimationFrame(restoreMenuScroll);
  if (!isPerformanceHome && animateMenuOnArrival && selectedMenuState) setTimeout(() => setGroupOpen(selectedMenuState, true), 50);
}
requestAnimationFrame(() => requestAnimationFrame(finishMenuInitialization));
setTimeout(finishMenuInitialization, 100);

const attribution = document.createElement("div");
attribution.className = "menu-attribution";
const designerLink = document.createElement("a");
designerLink.href = "https://dennisagerblad.dk/";
designerLink.textContent = "dennisagerblad.dk";
attribution.append("webdesign:", document.createElement("br"), designerLink);

const activistBox = document.createElement("section");
activistBox.className = "home-utility-box menu-activist";
const activistHeading = document.createElement("h2");
activistHeading.textContent = "dunst Activist";
activistBox.append(activistHeading, createPispisLogin(() => location.assign("pispis.html")));

const statisticsButton = document.createElement("button");
statisticsButton.className = "menu-statistics";
statisticsButton.type = "button";
statisticsButton.textContent = "Cookieindstillinger";
statisticsButton.dataset.statisticsIgnore = "";
statisticsButton.hidden = true;
statisticsButton.addEventListener("click", () => {
  if (mobileMenuQuery.matches) setDrawerOpen(false, true);
});
menuRoot.append(activistBox, attribution, statisticsButton);

const simpleFront = orderedMenu.find((section) => !section.children.length &&
  new URL(section.url).pathname === currentArchivePath);
if (simpleFront) {
  document.body.classList.add("dims-front");
  const dims = document.createElement("a");
  dims.className = "dunst-dims";
  dims.href = "pis.html";
  dims.setAttribute("aria-label", "Pis mig i num-sen");
  const figure = document.createElement("img");
  figure.src = "/dunst/0/images/pik.gif";
  figure.width = 10;
  figure.height = 17;
  figure.alt = "";
  dims.append(figure);
  document.body.append(dims);
}

const drawer = document.getElementById("site-menu");
const backdrop = document.getElementById("menu-backdrop");
const toggle = document.getElementById("menu-toggle");
const close = document.getElementById("menu-close");
const reducedDrawerMotion = matchMedia("(prefers-reduced-motion: reduce)");
let drawerNavigating = false;

menuRoot.addEventListener("click", (event) => {
  if (event.defaultPrevented || !isPlainClick(event) || !mobileMenuQuery.matches ||
      !document.body.classList.contains("menu-open")) return;
  const link = event.target.closest("a[href]");
  if (!link || link.target || link.hasAttribute("download")) return;
  if (reducedDrawerMotion.matches) {
    setDrawerOpen(false);
    return;
  }
  event.preventDefault();
  if (drawerNavigating) return;
  drawerNavigating = true;
  const go = () => {
    clearTimeout(fallback);
    drawer.removeEventListener("transitionend", onSlideEnd);
    location.assign(link.href);
  };
  const onSlideEnd = (transition) => {
    if (transition.target === drawer && transition.propertyName === "transform") go();
  };
  const fallback = setTimeout(go, 260);
  drawer.addEventListener("transitionend", onSlideEnd);
  setDrawerOpen(false);
});

function setDrawerOpen(open, moveFocus = false) {
  document.body.classList.toggle("menu-open", open);
  backdrop.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  const hiddenOnMobile = !open && mobileMenuQuery.matches;
  drawer.setAttribute("aria-hidden", String(hiddenOnMobile));
  drawer.inert = hiddenOnMobile;
  if (moveFocus) (open ? close : toggle).focus({preventScroll: true});
}

toggle.addEventListener("click", (event) => setDrawerOpen(true, event.detail === 0));
close.addEventListener("click", (event) => setDrawerOpen(false, event.detail === 0));
backdrop.addEventListener("click", () => setDrawerOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) setDrawerOpen(false, true);
});
mobileMenuQuery.addEventListener("change", (event) => {
  if (!event.matches) {
    document.body.classList.remove("menu-open");
    backdrop.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    drawer.removeAttribute("aria-hidden");
    drawer.inert = false;
  } else {
    const closed = !document.body.classList.contains("menu-open");
    drawer.setAttribute("aria-hidden", String(closed));
    drawer.inert = closed;
  }
});
if (mobileMenuQuery.matches) {
  drawer.setAttribute("aria-hidden", "true");
  drawer.inert = true;
}

// A mobile link closes the menu before leaving. Restore interactivity after Back.
window.addEventListener("pageshow", (event) => {
  if (event.persisted) drawerNavigating = false;
});
