const themeSelect = document.querySelector('#theme-select');
const body = document.body;

themeSelect.addEventListener('change', changeTheme);

function changeTheme() {
  const theme = themeSelect.value;

  if (theme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}
