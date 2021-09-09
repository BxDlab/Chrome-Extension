async function getData() {
    let data = {type: "taobaoTrade", products: []};
    data.time = Date.now().toLocaleString();
    
    data.trade_id = document.querySelector("#J_trade_imfor > div > ul > li:nth-child(3) > div.trade-imfor-dd > span").innerHTML;
    
    data.delivery_id = document.querySelector("#appOrders > div > table > tbody > tr > td > ul > li > div > span:nth-child(4)").innerHTML;    
    
    let tables = document.querySelectorAll("#appOrders > div > table > tbody > tr > td > ul > li > table")
    tables = Array.apply(null, tables);
    data.products = tables.map(async table => {
        const product = await getTable(table);
        return product;
    });
    data.products = await Promise.all(data.products);

    data.trade_price = document.querySelector("#appAmount > div > table > tbody > tr > td.total-count > div > div:nth-child(1) > table > tbody > tr > td > span > div > div > span:nth-child(3)").innerText;

    data.delivery_price = document.querySelector("#appAmount > div > table > tbody > tr > td.total-count > div > div:nth-child(2) > table > tbody > tr > td > span > div > div > span:nth-child(3)").innerText;

    if (document.querySelectorAll("#appAmount > div > table > tbody > tr > td.total-count > div > div").length == 4) {
        data.deduct_price = document.querySelector("#appAmount > div > table > tbody > tr > td.total-count > div > div:nth-child(3) > table > tbody > tr > td > span > div > div > span:nth-child(3)").innerText;
        data.total_price = document.querySelector("#appAmount > div > table > tbody > tr > td.total-count > div > div:nth-child(4) > table > tbody > tr > td > span > div > div > span:nth-child(3)").innerText;
    }else{
        data.total_price = document.querySelector("#appAmount > div > table > tbody > tr > td.total-count > div > div:nth-child(3) > table > tbody > tr > td > span > div > div > span:nth-child(3)").innerText;
    }

    return data;
    // await chrome.storage.sync.set({time, trade_id, delivery_id, products, trade_price, delivery_price, total_price});
}

async function getTable(table) {
    let product = {
        name: table.querySelector("tbody > tr > td.header-item.order-item-info > div > div.item-meta > a").innerText, 
        type: table.querySelector("tbody > tr > td.header-item.order-item-info > div > div.item-meta > div > span:nth-child(1) > span.item-title-descrip > span").innerText, 
        // price: parseFloat(table.querySelector("tbody > tr > td.header-price.font-high-light > div > span").innerHTML), 
        price: table.querySelector("tbody > tr > td.header-price.font-high-light > div > span").innerHTML, 
        count: parseInt(table.querySelector("tbody > tr > td.header-count.font-high-light").innerHTML), 
        favorable: table.querySelector("tbody > tr > td.header-favorable").innerHTML
    };
    return product;
}

// // window.addEventListener("load", getData, false);
// document.addEventListener("load", getData, false);

// window.addEventListener("DOMContentLoaded", getData, false);
// document.addEventListener('DOMContentLoaded', getData, false);
chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

        if (request.greeting == "Who are you")
            sendResponse("taobaoTrade")
        else if(request.greeting == "loadTrade"){
            getData().then(sendResponse);
        }
});