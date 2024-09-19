document.addEventListener('DOMContentLoaded', () => {
    loadHTML('menu.html', 'menu-placeholder');
    loadHTML('footer.html', 'footer-placeholder');
});

function loadHTML(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}
