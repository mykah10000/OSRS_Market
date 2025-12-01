const params = new URLSearchParams(window.location.search);
const itemId = params.get("item_id") || 2;
async function loadImage(item_id = 2){
    document.getElementById("image").src = `https://services.runescape.com/m=itemdb_rs/obj_sprite.gif?id=${item_id}`;
}
async function loadItems(item_id = 2){
    const response = await fetch(`http://74.140.130.238:8080/api/item_details?item_id=${item_id}`);
    const data = await response.json();
    const details = data[0];
    document.getElementById("item_limit").innerHTML = `Item Limit is: ${details.item_limit}`;
    document.getElementById("high_alch").innerHTML = `High Alch: ${details.high_alch}`;
    document.getElementById("low_alch").innerHTML = `Low Alch: ${details.low_alch}`;
    document.getElementById("item_name").innerHTML = `${details.item_name}`;
    document.getElementById("item_examine").innerHTML = `Examine: ${details.item_examine}`;
    document.getElementById("item_id").innerHTML = `Item Id: ${details.item_id}`;
    document.getElementById("members").innerHTML = `Is Members: ${details.members}`;
    document.getElementById("price").innerHTML = `Price: ${details.price}`;
    document.getElementById("volume").innerHTML = `Volume: ${details.volume}`;
    document.getElementById("updated_at").innerHTML = `Updated At: ${details.updated_at}`;
}
loadImage(itemId);
loadItems(itemId);