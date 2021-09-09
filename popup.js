let type = "";
let app = document.getElementById("app");
let bLoad = document.getElementById("loading-page");
let title = document.getElementById("popup-title")


/* Data Loading */
function loadSend() {
    chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "getSend"}, function(response) {
            console.log(response);
            title.innerHTML = "elf 準備出貨"
            view_responseJson(response)
            // alert(response);
        });
    });
}

function loadDelivary() {
    chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "getPadelivery"}, function(response) {
            console.log(response);
            title.innerHTML = "elf 已到集貨站"
            view_responseJson(response)
            // alert(response);
        });
    });
}

function loadTrade() {
    chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "loadTrade"}, function(response) {
            console.log(response);
            tradeView(response);
            // alert(response);
        });
    });
}



/* Popup View */
// pre_elfSend = function(data) {
view_responseJson = function (data) {
    app.innerHTML = "";
    let textarea = document.createElement("div");
    textarea.className = "form-floating g-3";

        let dataarea = document.createElement("textarea");
        dataarea.id = "dataTextarea1";
        // dataarea.setAttribute("height", 10);
        dataarea.style.height = "100px"
        dataarea.classList.add("form-control");
        dataarea.innerHTML = JSON.stringify(data);
        
        let datalabel = document.createElement("label");
        datalabel.setAttribute("for", "dataTextarea1");
        datalabel.innerHTML = "JSON";
    
    textarea.append(dataarea);
    textarea.append(datalabel);

    app.appendChild(textarea);
}

function tradeView(data) {
    app.innerHTML = "";
    let textarea = document.createElement("div");
    textarea.className = "form-floating g-3";

        let dataarea = document.createElement("textarea");
        dataarea.id = "dataTextarea1";
        // dataarea.setAttribute("height", 10);
        dataarea.style.height = "100px"
        dataarea.classList.add("form-control");
        dataarea.innerHTML = JSON.stringify(data);
        
        let datalabel = document.createElement("label");
        datalabel.setAttribute("for", "dataTextarea1");
        datalabel.innerHTML = "JSON";
    
    textarea.append(dataarea);
    textarea.append(datalabel);


    let bgUpdate = document.createElement("div")
    bgUpdate.classList.add("input-group")
        let bUpdate = document.createElement("button")
        bUpdate.id = "loading-page";
        bUpdate.className = "btn btn-primary text-while";
        bUpdate.style.color = "rgb(255, 255, 255)";
        bUpdate.innerHTML = `<i class="bi bi-arrow-repeat"></i>`;
        bUpdate.addEventListener("click", loadTrade);

        bgUpdate.append(bUpdate);

    app.appendChild(textarea);
    app.appendChild(bgUpdate);
}



/* Start */
chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "Who are you"}, function(response) {
        if(typeof response === "string") {
            title.innerHTML = response;
            switch(response){
                case "taobaoTrade":
                    loadTrade();
                    break;
                case "elfpadelivery":
                    // pre_elfpadelivery();
                    loadDelivary();
                    break;
                case "elfsend":
                    // pre_elfpadelivery();
                    loadSend();
                    break;
            }
        }
        console.log(response);
    });
});

// chrome.storage.sync.get(
//     ["time", "trade_id", "delivery_id", "products", "trade_price", "delivery_price", "total_price"], 
//     ({time, trade_id, delivery_id, products, trade_price, delivery_price, total_price}) => {
//         console.log(trade_id, products);
//     }
// )