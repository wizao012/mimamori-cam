(() => {
 const menu = document.querySelector('.header-menu');
 if (!menu) return;
 const trigger = menu.querySelector('summary');
 menu.addEventListener('toggle', () => {
  trigger.setAttribute('aria-label', menu.open ? 'メニューを閉じる' : 'メニューを開く');
 });
 menu.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  menu.open = false;
  const target = document.querySelector(link.hash);
  if (target) { target.setAttribute('tabindex', '-1'); target.focus({preventScroll:true}); }
 }));
 document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) { menu.open = false; trigger.focus(); }
 });
 document.addEventListener('click', event => {
  if (menu.open && !menu.contains(event.target)) menu.open = false;
 });
 matchMedia('(max-width:640px)').addEventListener('change', () => { menu.open = false; });
})();
