/* Clipento v2 site behaviour. No tracking, no third-party calls. */
(function () {
  // Old links (App Store Connect, the app, store descriptions) point at clipento.com/#privacy and #terms.
  var hash = window.location.hash;
  if (document.body.dataset.page === 'home' && /^#(privacy|terms|p-[\w-]+|t-[\w-]+)$/.test(hash)) {
    window.location.replace('/legal/' + hash);
    return;
  }

  // The full walkthrough on YouTube. Leave empty to hide every walkthrough link until it is public.
  var WALKTHROUGH_URL = '';
  document.querySelectorAll('[data-walkthrough]').forEach(function (el) {
    if (!WALKTHROUGH_URL) { el.hidden = true; return; }
    el.querySelectorAll('a[data-t]').forEach(function (a) {
      var sep = WALKTHROUGH_URL.indexOf('?') === -1 ? '?' : '&';
      a.href = WALKTHROUGH_URL + sep + 't=' + a.dataset.t;
    });
  });

  // Pain-point videos: play only while on screen, never with sound unless asked.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var videos = document.querySelectorAll('video[data-loop]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.play().catch(function () {}); }
        else { e.target.pause(); }
      });
    }, { threshold: 0.4 });
    videos.forEach(function (v) { io.observe(v); });
  }

  document.querySelectorAll('.sound-btn').forEach(function (btn) {
    var video = btn.parentElement.querySelector('video');
    btn.addEventListener('click', function () {
      var turnOn = video.muted;
      videos.forEach(function (v) { v.muted = true; });
      document.querySelectorAll('.sound-btn').forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
        b.setAttribute('aria-label', 'Play with sound');
      });
      if (turnOn) {
        video.muted = false;
        video.currentTime = 0;
        video.play().catch(function () {});
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', 'Mute');
      }
    });
  });
})();
