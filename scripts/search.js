export function setupSearchBar() {
  const searchButton = document.querySelector('.js-search-button');
  const searchBar = document.querySelector('.js-search-bar');

  if (searchButton && searchBar) {
    searchButton.addEventListener('click', () => {
      const search = searchBar.value.trim();
      if (search) {
        window.location.href = `amazon.html?search=${search}`;
      }
    });

    searchBar.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const search = searchBar.value.trim();
        if (search) {
          window.location.href = `amazon.html?search=${search}`;
        }
      }
    });
  }
}
