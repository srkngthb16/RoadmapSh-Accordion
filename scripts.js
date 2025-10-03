// Accordion behavior: only one item open at a time, keyboard accessible
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.accordion-item'));

  function closeAll(except = null) {
    items.forEach(item => {
      if (item === except) return;
      const btn = item.querySelector('.accordion-header');
      const panel = item.querySelector('.accordion-panel');
      btn.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = null;
      item.classList.remove('open');
    });
  }

  function openItem(item) {
    const btn = item.querySelector('.accordion-header');
    const panel = item.querySelector('.accordion-panel');
    btn.setAttribute('aria-expanded', 'true');
    item.classList.add('open');
    // set maxHeight to allow transition (use scrollHeight)
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  function toggleItem(item) {
    const btn = item.querySelector('.accordion-header');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      item.classList.remove('open');
      const panel = item.querySelector('.accordion-panel');
      panel.style.maxHeight = null;
    } else {
      closeAll(item);
      openItem(item);
    }
  }

  // attach handlers
  items.forEach(item => {
    const btn = item.querySelector('.accordion-header');
    const panel = item.querySelector('.accordion-panel');
    // ensure panels are collapsed initially
    panel.style.maxHeight = null;

    btn.addEventListener('click', () => toggleItem(item));

    // keyboard support: Enter and Space toggle
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        toggleItem(item);
      }
    });
  });

  // keep open panel height in sync on resize
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const open = document.querySelector('.accordion-item.open .accordion-panel');
      if (open) open.style.maxHeight = open.scrollHeight + 'px';
    }, 120);
  });
});
