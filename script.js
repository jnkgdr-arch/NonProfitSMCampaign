const bar = document.querySelector('#progressBar');
const reveals = document.querySelectorAll('.reveal');

addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = `${scrollable ? (scrollY / scrollable) * 100 : 0}%`;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach((item) => observer.observe(item));

const dialog = document.querySelector('#imageDialog');
document.querySelectorAll('[data-viewer]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#dialogImage').src = button.dataset.viewer;
    dialog.showModal();
  });
});
document.querySelector('#dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
