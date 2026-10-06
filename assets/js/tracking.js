(() => {
  'use strict';
  const config = window.MIMAMORI_CONFIG;
  if (!config) return;
  window.dataLayer = window.dataLayer || [];
  const storageKey = 'mimamori-attribution-v1';
  const params = new URLSearchParams(location.search);
  let stored = {};
  try { stored = JSON.parse(sessionStorage.getItem(storageKey) || '{}'); } catch (_) {}
  if (!stored || typeof stored !== 'object' || Date.now() - (stored.saved_at || 0) > 86400000) stored = {};
  const isNewVisit = config.PARAM_KEYS.some(key => params.has(key));
  const values = isNewVisit ? {} : stored;
  for (const key of config.PARAM_KEYS) {
    values[key] = (params.get(key) || values[key] || '').slice(0, 512);
  }
  values.lpv ||= 'A';
  values.lp_path = location.pathname;
  // No query strings from referrers: they can contain personal information.
  try { const u = new URL(document.referrer); values.referrer ||= u.origin + u.pathname; } catch (_) { values.referrer ||= ''; }
  values.saved_at = Date.now();
  try { sessionStorage.setItem(storageKey, JSON.stringify(values)); } catch (_) {}
  for (const key of [...config.PARAM_KEYS, 'lp_path', 'referrer']) {
    const input = document.getElementById('trk-' + key);
    if (input) input.value = values[key] || '';
  }
})();
