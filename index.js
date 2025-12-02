const params = new URLSearchParams(window.location.search);
let currentPage = params.get("page") || 1;
let search = params.get("search") || "";
let filterOrder = "asc";
let filter = "item_id";
let itemsLength = 0;


document.getElementById("search").addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        search = document.getElementById("search").value.trim();
        loadItems(1,search);
    }
})

document.getElementById("nextButton").addEventListener("click", () => {
    if (currentPage*50<itemsLength){
        currentPage++;
        loadItems(currentPage,search);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
})

document.getElementById("prevButton").addEventListener("click", () => {
    if (currentPage>1){
        currentPage--;
        loadItems(currentPage,search);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
})

document.getElementById("priceFilter").addEventListener("click", () => {
    if (filter == "price"){
        filterOrder = filterOrder === "desc" ? "asc" : "desc";
        if(filterOrder == "asc"){
            document.getElementById("priceFilter").innerHTML = `Price△`;
        }
        else{
            document.getElementById("priceFilter").innerHTML = `Price▽`;
        }
    }
    else{
        filterOrder = "asc"
        resetFilters();
        document.getElementById("priceFilter").innerHTML = `Price△`;
        filter = "price";
    }
    loadItems(currentPage,search,filter,filterOrder);
})

document.getElementById("nameFilter").addEventListener("click", () => {
    if (filter == "name"){
        filterOrder = filterOrder === "desc" ? "asc" : "desc";
        if(filterOrder == "asc"){
        document.getElementById("nameFilter").innerHTML = `Name△`;
        }
        else{
            document.getElementById("nameFilter").innerHTML = `Name▽`;
        }
    }
    else{
        filterOrder = "asc"
        resetFilters();
        document.getElementById("nameFilter").innerHTML = `Name△`;
        filter = "name";
    }
    loadItems(currentPage,search,filter,filterOrder);
})

document.getElementById("updatedFilter").addEventListener("click", () => {
    if (filter == "updated"){
        filterOrder = filterOrder === "desc" ? "asc" : "desc";
        if (filterOrder == "asc"){
            document.getElementById("updatedFilter").innerHTML = `Updated△`;
        }
        else{
            document.getElementById("updatedFilter").innerHTML = `Updated▽`;
        }
    }
    else{
        filterOrder = "asc"
        resetFilters();
        document.getElementById("updatedFilter").innerHTML = `Updated△`;
        filter = "updated";
    }
    loadItems(currentPage,search,filter,filterOrder);
})

document.getElementById("volumeFilter").addEventListener("click", () => {
    if (filter == "volume"){
        filterOrder = filterOrder === "desc" ? "asc" : "desc";
        if (filterOrder == "asc"){
            document.getElementById("volumeFilter").innerHTML = `Volume△`;
        }
        else{
            document.getElementById("volumeFilter").innerHTML = `Volume▽`;
        }
    }
    else{
        filterOrder = "asc"
        resetFilters();
        document.getElementById("volumeFilter").innerHTML = `Volume△`;
        filter = "volume";
    }
    loadItems(currentPage,search,filter,filterOrder);
})

async function resetFilters(){
    document.getElementById("priceFilter").innerHTML = `Price`;
    document.getElementById("nameFilter").innerHTML = `Name`;
    document.getElementById("updatedFilter").innerHTML = `Updated`;
    document.getElementById("volumeFilter").innerHTML = `Volume`;
}
async function loadItems(page = 1, searchContents = "") {
            // const response = await fetch(`/api/items?page=${page}&search=${searchContents}`);
            const response = await fetch(`https://api.osrs.market/api/items?page=${page}&search=${searchContents}&filter=${filter}&filterOrder=${filterOrder}`);
            const data = await response.json();
            itemsLength = data.total;
            const container = document.getElementById("items");
            container.innerHTML = "";

            (data.items).forEach(item => {
                container.innerHTML += `
                    <div class="item">
                        <a href="https://api.osrs.market/item?item_id=${item.item_id}"><strong>${item.item_name}</strong></a><br>
                        $${item.price}
                    </div>
                `;
            });
        }
loadItems(currentPage,search,filter,filterOrder);