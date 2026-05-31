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

  openButton.href = window.location.href;
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
})();