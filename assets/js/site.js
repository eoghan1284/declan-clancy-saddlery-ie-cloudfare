const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-site-nav]');
const header = document.querySelector('.site-header');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });

document.querySelectorAll('[data-lightbox]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox-dialog';
    dialog.innerHTML = `<div class="lightbox-dialog__wrap"><button class="lightbox-dialog__close" type="button" aria-label="Close image">Close</button><img src="${link.href}" alt="${link.dataset.alt || ''}"></div>`;
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (dialogEvent) => { if (dialogEvent.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => dialog.remove());
    document.body.append(dialog);
    dialog.showModal();
  });
});

document.querySelectorAll('[data-current-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
