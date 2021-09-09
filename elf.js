function padelivery() {
    let table = document.querySelector("body > form > div.max-boxss.pt20 > div.elf-section-box > table");
    let trs = table.getElementsByTagName('tbody')[0].getElementsByTagName("tr")

    let Data = [];
    for(var i=0;i<trs.length;++i){
        let tds = trs[i].getElementsByTagName('td')
        let subData = {};
        for(let j=0;j<tds.length;++j){
            subData[tds[j].getAttribute('data-label')] = tds[j].innerText;
        }
        Data.push(subData)
    }

    // console.log(JSON.stringify(Data))
    // console.log(Data)
    return Data;
}

send = function() {
    let trs = document.querySelectorAll("#tbdetail > tbody > tr");

    let Data = [];
    for(var i=0;i<trs.length;++i){
        let tds = trs[i].getElementsByTagName('td')
        let subData = {};
        for(let j=0;j<tds.length;++j){
            subData[tds[j].getAttribute('data-label')] = tds[j].innerText;
            // console.log(tds[j].getAttribute('data-label'), tds[j].innerText)
        }
        Data.push(subData)
    }
    // console.log(Data)
    return Data;
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
        console.log("request", request);
        if (request.greeting == "Who are you"){
            var title = "elf";
            let url = new URL(window.location);
            if(url.pathname == "/cn/padelivery.aspx"){
                title = "elfpadelivery"
            }else if(url.pathname == "/cn/send.aspx"){
                title = "elfsend";
            }
            // getData().then(sendResponse);
            sendResponse(title)
        }else if(request.greeting == "getPadelivery"){
            sendResponse(padelivery())
        }else if(request.greeting == "getSend") {
            sendResponse(send())
        }
});
console.log("elf.js is inject")