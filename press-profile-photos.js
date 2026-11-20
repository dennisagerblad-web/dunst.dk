const dunstPressPhotoSources = {
  romeo: {
    title: "Nr. 19 - April 2004",
    article: "/dunst/press/2004/04_04_01_romeo_om_dunst/04_04_01_romeo_om_dunst.html",
    folder: "/dunst/press/2004/04_04_01_romeo_om_dunst/",
  },
  dansk: {
    title: "Dansk Magazine - Edition #04 - Spring 2004",
    article: "/dunst/press/2004/04_02_01_dansk/04_02_01_dansk.html",
    folder: "/dunst/press/2004/04_02_01_dansk/",
  },
};

const dunstPressProfilePhotos = {
  "/dunst/01_performere/03_dennis-agerblad/index.html": [
    { source: "dansk", files: ["01_dennis.jpg", "02_dennis.jpg"], alt: "Dennis Agerblad" },
  ],
  "/dunst/01_performere/05_hairwerk/index.html": [
    { source: "romeo", files: ["romeo_julie_hairwerk.jpg"], alt: "Hairwerk" },
  ],
  "/dunst/01_performere/01_ramona_macho/index.html": [
    { source: "romeo", files: ["romeo_julie_ramona.jpg"], alt: "Ramona Macho" },
    { source: "dansk", files: ["03_ramona.jpg", "10_ramona.jpg"], alt: "Ramona Macho" },
  ],
  "/dunst/01_performere/14_madam/index.html": [
    { source: "romeo", files: ["romeo_julie_adam_thom.jpg"], alt: "mAdam og The Thom" },
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
    const heading = document.createElement("h2");
    heading.className = "legacy-box-heading";
    heading.textContent = source.title;
    const photos = document.createElement("div");
    photos.className = "performer-press-images";
    for (const filename of entry.files) {
      const image = document.createElement("img");
      image.src = new URL(`${source.folder}${filename}`, location.href).href;
      image.alt = entry.alt;
      image.loading = "lazy";
      photos.append(image);
    }
    const link = document.createElement("a");
    link.className = "performer-press-source";
    link.href = menuDestination(`https://dunst.dk${source.article}`);
    link.textContent = `Læs artiklen: ${source.title}`;
    card.append(heading, photos, link);
    gallery.append(card);
  }
  return gallery;
}
