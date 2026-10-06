(() => {
  let sent = false;
  try {
    const receipt = JSON.parse(sessionStorage.getItem('mimamori-submission') || 'null');
    sent = Boolean(receipt && Date.now() - receipt.at < 1800000);
  } catch (_) {}
  sent ||= location.hash === '#sent';
  document.getElementById('thanks-sent').hidden = !sent;
  document.getElementById('thanks-direct').hidden = sent;
  // Conversion is emitted on the form page only, never on thanks page views.
})();
