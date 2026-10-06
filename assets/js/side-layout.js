/* Mark the section currently being read without moving focus. */
(() => {
 const links = [...document.querySelectorAll('.rail-nav a')];
 const sections = links.map(a => document.querySelector(a.hash)).filter(Boolean);
 let scheduled = false;
 const update = () => {
  scheduled = false;
  const readingLine = innerHeight * .35;
  let current = null;
  for (const section of sections) {
   const box = section.getBoundingClientRect();
   if (box.top <= readingLine && box.bottom > 0) current = section.id;
  }
  for (const link of links) {
   if (link.hash === '#' + current) link.setAttribute('aria-current','location');
   else link.removeAttribute('aria-current');
  }
 };
 addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
 }, {passive:true});
 addEventListener('resize', update);
 update();
})();
