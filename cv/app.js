// Theme Management System
const initTheme = () => {
  let savedTheme = localStorage.getItem('theme') || localStorage.getItem('cv-theme');
  if (!savedTheme) {
    savedTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  setTheme(savedTheme);
};

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  localStorage.setItem('cv-theme', theme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Cross-tab synchronization
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' || e.key === 'cv-theme') {
      const newTheme = e.newValue || 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  });

  // System OS preference change listener
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme') && !localStorage.getItem('cv-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
});
