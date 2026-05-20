// state: the whole snapshot from the server
let state = {};

// cache dom elements
const itemsDiv = document.getElementById('items');
const bagDiv = document.getElementById('bag');
const remainingEl = document.getElementById('remaining');
const valueEl = document.getElementById('value');
const maxValueEl = document.getElementById('maxValue');
const maxItemsDiv = document.getElementById('maxItems');
const spinner = document.getElementById('spinner');
const resetLink = document.getElementById('reset');

// load the current bag/items, then draw
fetchState();
async function fetchState() {
    const res = await fetch('/api/state');
    state = await res.json();
    render();
}

function render() {
    // max value header (req i)
    maxValueEl.textContent = `Maximum Value so far: $${state.maxValue}`;

    // bag status, in red (req f)
    remainingEl.textContent = state.remaining;
    valueEl.textContent = state.value;

    // left panel: items to pick from (req b)
    itemsDiv.innerHTML = '';
    state.items.forEach(it => {
        // fits -> show Add link; doesn't fit -> gray, no link (req e)
        const addLink = it.fits
            ? `<a href="#" class="add" data-id="${it.id}">Add</a>`
            : '';
        const disabled = it.fits ? '' : 'disabled';

        itemsDiv.innerHTML += `
            <div class="row ${disabled}">
                <img src="/assets/images/${it.image}">
                <span class="info">${it.name} — $${it.value}, ${it.weight} kg</span>
                ${addLink}
            </div>`;
    });

    // right panel: items inside the bag (req d)
    bagDiv.innerHTML = '';
    state.bagItems.forEach(it => {
        bagDiv.innerHTML += `
            <div class="row">
                <img src="/assets/images/${it.image}">
                <span class="info">${it.weight} kg — $${it.value}</span>
                <a href="#" class="remove" data-id="${it.id}">&#x2715;</a>
            </div>`;
    });
}

// click "Add" -> add item to the bag (req c)
itemsDiv.addEventListener('click', async (e) => {
    if (e.target.classList.contains('add')) {
        e.preventDefault();
        const id = e.target.dataset.id;
        const res = await fetch(`/api/bag/${id}`, { method: 'POST' });
        state = await res.json();
        render();
    }
});

// click "✕" -> remove item from the bag (req h)
bagDiv.addEventListener('click', async (e) => {
    if (e.target.classList.contains('remove')) {
        e.preventDefault();
        const id = e.target.dataset.id;
        const res = await fetch(`/api/bag/${id}`, { method: 'DELETE' });
        state = await res.json();
        render();
    }
});

// click "Reset" -> empty the bag (req g)
resetLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/bag', { method: 'DELETE' });
    state = await res.json();
    maxItemsDiv.innerHTML = '';
    render();
});

// click "Maximum Value so far" -> ajax fetch the winning items (req j)
maxValueEl.addEventListener('click', async () => {
    spinner.style.display = 'block';                 // show spinner
    const res = await fetch('/api/max');             // 1s delay on server
    const items = await res.json();
    spinner.style.display = 'none';                  // hide spinner

    maxItemsDiv.innerHTML = '';
    items.forEach(it => {
        maxItemsDiv.innerHTML += `<img src="/assets/images/${it.image}">`;
    });
});
