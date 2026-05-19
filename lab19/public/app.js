// Counter (runs independently)
let counter = 0;
const counterEl = document.getElementById('counter-value');
setInterval(() => {
  counter++;
  counterEl.textContent = counter;
}, 1000);

// Load exchange rates
const loading = document.getElementById('loading');
function loadRates() {
  loading.style.display = 'inline-block';
  setTimeout(async () => {
    await fetchRates();
    loading.style.display = 'none';
  }, 10);
}   

const tbody = document.querySelector('tbody');
async function fetchRates() { 
  try {
    const res = await fetch('/api/exchange');
    const data = await res.json(); //Parses it as json
    tbody.innerHTML = '';
    data.forEach(rate => {
        tbody.innerHTML += `
           <tr>
                <td>${rate.cur}</td>
                <td>${rate.buy.toFixed(2)}</td>
                <td>${rate.sell.toFixed(2)}</td>
            </tr>
        `;
    });
  } catch (err) {
    console.error("Error fetching rates:", err);
 }   
}

// Button click
document.getElementById('refresh-btn')
  .addEventListener('click', loadRates);

// Initial load
loadRates();