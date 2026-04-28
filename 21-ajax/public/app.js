alert("frontend app")
let count = 0
const countEl = document.getElementById("counter-value")

setInterval( () => {
    count++;
    countEl.textContent = count;
})

//Ajax stuff
document.getElementById("refresh-btn").
    addEventListener("click", loadRates)

function loadRates() {
    alert("start ajax")
    fetchRates()
}

const tbody = document.querySelector("tbody")
async function fetchRates() {
    const res = await fetch("/api/exchange")
    const data = await res.json()
    //console.log(data)
    tbody.innerHTML = "";
    for( let rate of data) {
        tbody.innerHTML += ``
    }
}