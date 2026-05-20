// states, memories
let projects = [];
let searchTags = [];

// cache dom elements
const searchForm = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const tagsDiv = document.getElementById('tags');
const tbody = document.querySelector('tbody');
const loading = document.getElementById('loading');

// load search list (from session) + projects, then draw
fetchData();
async function fetchData() {
    const searchRes = await fetch('/api/search');
    searchTags = await searchRes.json();        // restore search list from session

    const res = await fetch('/api/rows');       // SQL: select * from projects
    const rows = await res.json();

    for (const row of rows) {                   // for each project, get its tags
        const tagsRes = await fetch(`/api/tags/${row.team}`);  // tags where team = ?
        const tags = await tagsRes.json();
        row.tags = tags.map(t => t.tagName);     // ["health","social","web"]  meaning "take this object t, give back just its tagName
    }
    projects = rows;
    render();
}

function render() {
    renderSearchTags();
    renderTable();
}

// search tag chips with "✕" to delete
function renderSearchTags() {
    tagsDiv.innerHTML = '';
    searchTags.forEach(tag => {
        tagsDiv.innerHTML += `
            <span class="tag">${tag}
                <a href="#" class="remove" data-tag="${tag}">&#10005;</a>
            </span>`;
    });
}

function renderTable() {
    tbody.innerHTML = '';
    projects.forEach(p => {
        // Q2c filter: show a project only if it shares at least one search tag (OR)
        let found = false;
        for (const myTag of p.tags) {
            for (const searchTag of searchTags) {
                if (myTag === searchTag) {
                    found = true;
                }
            }
        }
        // skip the project when we're searching but nothing matched
        if (searchTags.length > 0 && !found) {
            return;
        }

        let tagsHtml = '';
        p.tags.forEach(tag => {
            tagsHtml += `<a href="#" class="tag" data-tag="${tag}">${tag}</a> `;
        });

        const heart = p.likeit ? '&#128153;' : '&#129293;';

        tbody.innerHTML += `
            <tr>
                <td>${p.team}</td>
                <td>${p.name}</td>
                <td>${p.supervisor}</td>
                <td>${tagsHtml}</td>
                <td class="center">
                    <a href="/api/like/${p.team}" class="heart" data-team="${p.team}">${heart}</a>
                </td>
            </tr>`;
    });
}

// Enter in the search box submits (no button)
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();                         // we send it ourselves, no page reload
    const tag = searchInput.value;
    const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag })           // add it to the session list
    });
    searchTags = await res.json();              // server returns the updated list
    searchInput.value = '';
    render();
});

// click a project tag -> add to search; click a heart -> toggle like (ajax)
tbody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('tag')) {
        e.preventDefault();
        const tag = e.target.dataset.tag;
        const res = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag })
        });
        searchTags = await res.json();
        render();

    } else if (e.target.classList.contains('heart')) {
        e.preventDefault(); // href is the no-ajax fallback
        const team = e.target.dataset.team;

        loading.style.display = 'inline-block';
        const res = await fetch(`/api/like/${team}`, { method: 'POST' });
        const data = await res.json();
        loading.style.display = 'none';

        const index = projects.findIndex(p => p.team === data.team);
        projects[index].likeit = data.likeit;
        e.target.innerHTML = data.likeit ? '&#128153;' : '&#129293;';
    }
});

// click "✕" -> remove a tag from the search list
tagsDiv.addEventListener('click', async (e) => {
    if (e.target.classList.contains('remove')) {
        e.preventDefault();
        const tag = e.target.dataset.tag;
        const res = await fetch(`/api/search/${tag}`, { method: 'DELETE' });
        searchTags = await res.json();
        render();
    }
});
