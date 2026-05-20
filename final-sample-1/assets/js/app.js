const loading = document.getElementById('loading');
let filterArray = {}
let htmlInner = '';

function searchTag() {
    loading.style.display = 'inline-block';
    setTimeout(async () => {
        await fetchInfo();
        loading.style.display="none";
    }, 1000);
}
const srcInp = document.getElementById('search-input');
srcInp.addEventListener('keydown', function (event)  {
    if (event.key === "Enter" && srcInp.value);
    {
        fetchInfo();
    }

})

const tbody = document.querySelector('tbody');
async function fetchInfo() {
    try {
        const res = await fetch("/api/rows")
        const rows = await res.json(); 
        let showIt = 0;

        let tags;
        tbody.innerHTML = '';
        
        for (const row of rows){
            const tagsRes = await fetch(`/api/tags/${row.team}`);
            tags = await tagsRes.json();

            if (filterArray.length()){
            filterArray.forEach(filt => {
                tags.forEach(tag => {
                    if (filt === tag){
                        showIt=1;
                }
                })
                
            }
            )
        }
            if (!filterArray.length() || showIt){
            htmlInner += `
            <tr>
            <td>${row.team}</td>
            <td>${row.name}</td>
            <td>${row.supervisor}</td>
            <td>` 

            tags.forEach(tag => 
                htmlInner +=
            ` <div class="tag">
                ${tag.tagName}
            </div>
            `)
             htmlInner +=
            `</td>
            <td>`
                if( !row.likeit){
                    htmlInner +=
                `<a href="/likeit/${row.team}">
                    <img src="/assets/img/empty.jpg" alt="">
                </a>`
                }
                if( row.likeit){
                    htmlInner +=
                `<a href="/dislikeit/${row.team}">
                    <img src="/assets/img/full.jpg" alt="">
                </a>`
                }
                htmlInner += `</td> 
        </tr>
            
            `
        
        } }
        tbody.innerHTML += htmlInner;
        
    }
    catch{
        alert("error");
    }
}



fetchInfo();