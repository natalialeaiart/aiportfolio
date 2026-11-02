// Email buttons show the address and copy it on click.
// The mailto link still opens a mail app where one is set up;
// where none is, the copied address is the fallback.
document.querySelectorAll('[data-copy-email]').forEach(btn => {
  const label = btn.textContent;
  btn.addEventListener('click', () => {
    const email = btn.getAttribute('href').replace('mailto:', '');
    const done = () => {
      btn.textContent = 'Copied ✓';
      setTimeout(() => { btn.textContent = label; }, 2000);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(done, () => {});
    } else {
      const t = document.createElement('textarea');
      t.value = email;
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      t.remove();
    }
  });
});
