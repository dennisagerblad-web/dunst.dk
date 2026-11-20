/* GA4 Standard: basic consent mode, no Google request before opt-in. */
(() => {
  'use strict';
  if (window.SiteStatistics) return;
  const script = document.currentScript;
  const measurementId = script?.dataset.measurementId;
  const site = script?.dataset.site;
  const preview = ['localhost', '127.0.0.1'].includes(location.hostname);
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '') || !/^[a-z0-9.-]+\.dk$/.test(site || '')) return;
  if (!preview && (location.protocol !== 'https:' || ![site, 'www.' + site].includes(location.hostname))) return;
  const analyticsAllowed = !navigator.globalPrivacyControl && navigator.doNotTrack !== '1';
  const consentKey = `site-statistics-consent-v1:${site}`;
  const maxAge = 180 * 24 * 60 * 60 * 1000;
  let consent = false, started = false, banner, preferenceButton, lastFocus;
  const cleanUrl = (raw, base = location.href) => {
    if (!raw) return '';
    try {
      const url = new URL(raw, base);
      if (!['http:', 'https:'].includes(url.protocol)) return '';
      const route = url.searchParams.get('path');
      if (site === 'dunst.dk' && url.origin === location.origin && /\/archive\.html$/.test(url.pathname) &&
          route && /^\/dunst\/[a-z0-9_./-]+\.html?$/i.test(route) && !route.includes('..')) return url.origin + route;
      return url.origin + url.pathname;
    } catch { return ''; }
  };
  function readConsent() {
    try {
      const saved = JSON.parse(localStorage.getItem(consentKey));
      return saved?.version === 1 && Date.now() - saved.time < maxAge ? saved.choice : null;
    } catch { return null; }
  }
  function canSend() { return consent && analyticsAllowed; }
  function track(name, params = {}) {
    if (!canSend()) return;
    const data = {send_to: measurementId, ...params};
    if (preview) { window.dispatchEvent(new CustomEvent('statistics-preview', {detail:{name, params:data}})); return; }
    window.gtag?.('event', name, data);
  }
  function clearCookies() {
    const domains = ['', location.hostname, '.' + location.hostname.replace(/^www\./, '')];
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0].trim();
      if (!/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) continue;
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? '; domain='+domain : ''}`;
    }
  }
  function start() {
    if (started || !canSend()) return;
    started = true;
    if (preview) { track('page_view', {page_location:cleanUrl(location.href), page_title:document.title}); return; }
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    window.gtag('consent', 'update', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {page_location:cleanUrl(location.href), page_referrer:cleanUrl(document.referrer), allow_google_signals:false, allow_ad_personalization_signals:false, cookie_flags:'SameSite=Lax;Secure'});
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.append(tag);
  }
  function choose(choice) {
    const hadConsent = consent;
    consent = choice === 'granted' && analyticsAllowed;
    try { localStorage.setItem(consentKey, JSON.stringify({version:1,choice,time:Date.now()})); } catch {}
    banner.hidden = true;
    preferenceButton.hidden = false;
    if (consent && !hadConsent) {
      window['ga-disable-' + measurementId] = false;
      if (started) {
        if (!preview) window.gtag?.('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
        track('page_view', {page_location:cleanUrl(location.href), page_title:document.title});
      } else start();
    }
    else if (!consent) {
      if (started && !preview) {
        window['ga-disable-' + measurementId] = true;
        window.gtag?.('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      }
      clearCookies();
    }
    (lastFocus?.isConnected ? lastFocus : preferenceButton).focus();
    lastFocus = null;
    if (consent && !hadConsent) recordOpenFrames();
  }
  function show() {
    lastFocus = document.activeElement;
    banner.hidden = false;
    banner.querySelector('button').focus();
  }
  function attachInteractions(doc) {
    doc.addEventListener('click', event => {
      const target = event.target?.nodeType === 1 ? event.target : null;
      const control = target?.closest('a,button,[role="button"],summary');
      if (!control || control.closest('[data-statistics-ignore],form') || control.matches('[disabled]')) return;
      if (control.closest('.menu-activist,.pispis-layout,.pispis-preview')) return;
      const href = control.getAttribute('href');
      const url = href ? cleanUrl(href, doc.baseURI) : '';
      const contact = /^(mailto|tel):/i.test(href || '');
      if (url && /\/pispis(?:[/.]|$)/i.test(new URL(url).pathname)) return;
      const publicControl = control.closest('.face-menu,.timeline-groups,#full-menu,.tunga-menu');
      const label = contact ? 'Kontakt' : publicControl
        ? (control.getAttribute('aria-label') || control.textContent || '').trim().replace(/\s+/g,' ').slice(0,100)
        : '';
      if (!url && !label) return;
      let destination = url || label;
      if (url) {
        const link = new URL(url);
        if (link.origin === location.origin) {
          const fragment = new URL(href, doc.baseURI).hash;
          destination = link.pathname + (/^#[a-z][a-z0-9_-]{0,59}$/i.test(fragment) ? fragment : '');
        }
      }
      const clickDestination = destination.slice(0,100);
      track('select_content', {
        content_type:contact ? 'contact' : url ? 'link' : 'menu',
        content_id:clickDestination,
        click_destination:clickDestination,
        page_location:cleanUrl(doc.location.href)
      });
    }, {capture:true});
    doc.addEventListener('play', event => {
      if (!['VIDEO','AUDIO'].includes(event.target?.tagName)) return;
      track(event.target.tagName === 'VIDEO' ? 'video_start' : 'audio_start', {content_id:cleanUrl(event.target.currentSrc),page_location:cleanUrl(doc.location.href)});
    }, {capture:true});
  }
  // The top document handles same-origin frames, including frames loaded before this script.
  try { if (window !== window.top && window.top.location.origin === location.origin) return; } catch { return; }
  const frameDocuments = new Map();
  function recordOpenFrames() {
    for (const [frame, doc] of frameDocuments) {
      if (!frame.isConnected || frame.contentDocument !== doc) { frameDocuments.delete(frame); continue; }
      track('page_view',{page_location:cleanUrl(doc.location.href),page_title:doc.title});
    }
  }
  function init() {
    if (!document.body || document.body.tagName === 'FRAMESET' || !analyticsAllowed) return;
    window.SiteStatistics = { showPreferences: show };
    const host = document.createElement('div');
    host.dataset.statisticsIgnore = '';
    host.id = 'site-statistics-consent';
    document.body.append(host);
    const root=host.attachShadow({mode:'open'});
    root.innerHTML = `<style>
      :host{all:initial;font:16px/1.5 Arial,sans-serif;color:#111;position:relative;z-index:2147483000}*{box-sizing:border-box}[hidden]{display:none!important}
      section{position:fixed;inset:auto 16px 16px;max-width:760px;margin:auto;padding:20px;background:#fff;color:#111;border:2px solid #333;box-shadow:0 4px 24px #0003;max-height:85dvh;overflow:auto}
      h2{font-size:20px;margin:0 0 8px}p{margin:0 0 12px}a{color:#1348a3;text-decoration:underline}details{margin:0 0 14px}summary{cursor:pointer;min-height:40px}button{font:inherit;padding:10px 16px;min-height:44px;border:1px solid #333;background:#fff;color:#111;cursor:pointer}button:focus-visible,summary:focus-visible,a:focus-visible{outline:3px solid #0a66cc;outline-offset:3px}.choices{display:flex;flex-wrap:wrap;gap:12px}.choices button{flex:1 1 170px}.settings{position:fixed;bottom:8px;left:8px;padding:5px 10px;background:#fff;color:#111;font-size:14px}
      @media(max-width:500px){section{inset:auto 8px 8px;padding:16px}.choices{gap:8px}}
    </style><section role="region" aria-label="Valg af statistikcookies" hidden>
      <h2>Statistik på ${site}</h2>
      <p>Vi vil gerne bruge Google Analytics til at se besøg, lande, hvilke sider der bliver set, og hvilke links der bliver brugt. Google får først statistikdata, hvis du vælger Tillad statistik. Du kan bruge hele hjemmesiden uden statistik.</p>
      <details><summary>Om statistik og dit valg</summary>
        <p>Google Analytics bruger cookies til besøgsstatistik. Oplysninger om enhed, omtrentligt land, trafikkilde og brug af siden behandles af Google. Vi sender ikke tekst fra formularer, søgefelter eller adgangskoder, og bruger ikke målingen til personlige annoncer.</p>
        <p>Dit valg huskes i denne browser i op til 180 dage. Du kan ændre det via Statistikvalg. Ved afvisning eller tilbagetrækning stopper vores måling; allerede indsamlede data slettes ikke automatisk.</p>
        <p><a href="https://policies.google.com/technologies/partner-sites?hl=da" target="_blank" rel="noopener noreferrer">Sådan behandler Google oplysninger</a></p>
      </details><div class="choices"><button type="button" data-choice="denied">Afvis statistik</button><button type="button" data-choice="granted">Tillad statistik</button></div>
    </section><button type="button" class="settings" hidden>Statistikvalg</button>`;
    banner=root.querySelector('section');preferenceButton=root.querySelector('.settings');
    root.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.choice)));
    preferenceButton.addEventListener('click',show);
    const choice=readConsent();
    consent=choice==='granted';
    start();
    if (!choice) banner.hidden=false;else preferenceButton.hidden=false;
    attachInteractions(document);
    const seenFrames = new WeakSet();
    function attachFrame(frame) {
      try {
        const doc = frame.contentDocument;
        if (!doc || seenFrames.has(doc) || frame.contentWindow.location.origin !== location.origin) return;
        seenFrames.add(doc);
        attachInteractions(doc);
        // The embedded menu is navigation. Only content documents count as pages.
        if (!/\/tunga_menu\.html$/i.test(doc.location.pathname)) {
          frameDocuments.set(frame, doc);
          track('page_view',{page_location:cleanUrl(doc.location.href),page_title:doc.title});
        }
        doc.addEventListener('load',event=>{if (event.target?.tagName==='IFRAME') attachFrame(event.target);},true);
        doc.querySelectorAll('iframe').forEach(attachFrame);
      } catch {}
    }
    if (site === 'tungamusik.dk') {
      document.addEventListener('load',event=>{if(event.target?.tagName==='IFRAME') attachFrame(event.target);},true);
      document.querySelectorAll('iframe').forEach(attachFrame);
    }
    let previousPopup='';
    const observeContent=()=>{
      const popup=document.querySelector('.timeline-overlay .timeline-popup,.video-overlay [role="dialog"],.literature-overlay [role="dialog"]');
      const title=popup?.getAttribute('aria-label') || popup?.querySelector('h1,h2,h3')?.textContent || '';
      const date=popup?.querySelector('time[datetime],.timeline-popup-date[datetime]')?.getAttribute('datetime') || '';
      const key=popup ? title+'|'+date : '';
      if (key && key!==previousPopup) track('view_content',{content_type:'popup',content_id:key.slice(0,100),page_location:cleanUrl(location.href)});
      previousPopup=key;
    };
    let observerTimer;
    if (site === 'dennisagerblad.dk') {
      new MutationObserver(()=>{clearTimeout(observerTimer);observerTimer=setTimeout(observeContent,150);}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','aria-label','datetime']});
    }
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
