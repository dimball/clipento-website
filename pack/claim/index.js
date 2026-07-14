(function () {
  var params = new URLSearchParams(window.location.search);
  var token = params.get('token');
  var pack = params.get('pack');
  var openButton = document.getElementById('open-app');
  var status = document.getElementById('status');
  var title = document.getElementById('title');
  var lede = document.getElementById('lede');
  var meta = document.getElementById('meta');

  function setStatus(label, message) {
    var strong = document.createElement('strong');
    strong.textContent = label;

    status.replaceChildren(strong, document.createTextNode(message));
  }

  function isAndroid() {
    return /Android/i.test(window.navigator.userAgent || '');
  }

  function isIOS() {
    return /iPhone|iPad|iPod/i.test(window.navigator.userAgent || '');
  }

  function buildAndroidIntentUrl(targetUrl) {
    var url = new URL(targetUrl);
    var path = url.pathname.replace(/^\/+/, '');
    var scheme = url.protocol.replace(':', '');
    var fallback = encodeURIComponent(targetUrl);

    return (
      'intent://' +
      url.host +
      '/' +
      path +
      url.search +
      url.hash +
      '#Intent;scheme=' +
      scheme +
      ';package=com.hng.markit;action=android.intent.action.VIEW;S.browser_fallback_url=' +
      fallback +
      ';end'
    );
  }

  function buildIOSCustomSchemeUrl() {
    var url = new URL(window.location.href);
    return 'clipento://' + url.pathname + url.search;
  }

  if (isIOS()) {
    openButton.href = buildIOSCustomSchemeUrl();
  } else {
    openButton.href = window.location.href;
  }
  openButton.referrerPolicy = 'no-referrer';

  if (!token) {
    title.textContent = 'This invite link is incomplete.';
    lede.textContent = 'The link opened on clipento.com, but it does not contain a teaching pack token that the app can claim.';
    setStatus(
      'Invite missing',
      'This page needs a valid teaching pack invite URL with a token.',
    );
    openButton.classList.add('hidden');
    return;
  }

  if (!pack) {
    if (isAndroid()) {
      openButton.href = buildAndroidIntentUrl(window.location.href);
    }
    openButton.addEventListener('click', function (event) {
      if (isAndroid()) {
        event.preventDefault();
        setStatus(
          'Opening app',
          'Android should now hand this invite to the installed Clipento app.',
        );
        window.location.assign(buildAndroidIntentUrl(window.location.href));
      }
    });
    return;
  }

  var normalizedPack = pack.trim().slice(0, 128);
  if (!normalizedPack) {
    return;
  }

  meta.classList.remove('hidden');
  meta.textContent = 'Pack reference: ';

  var code = document.createElement('code');
  code.textContent = normalizedPack;
  meta.appendChild(code);

  if (isAndroid()) {
    openButton.href = buildAndroidIntentUrl(window.location.href);
  }

  openButton.addEventListener('click', function (event) {
    if (isAndroid()) {
      event.preventDefault();
      setStatus(
        'Opening app',
        'Android should now hand this invite to the installed Clipento app.',
      );
      window.location.assign(buildAndroidIntentUrl(window.location.href));
    }
  });
})();