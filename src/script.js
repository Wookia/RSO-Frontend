var root = location.protocol + '//' + location.hostname;

function callAjax(url, callback){
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function callAuth(){
    callAjax(root+':8000/auth/', function(resposne){
        console.log(resposne);
    })
}

function callReservations(){
    callAjax(root+':8000/reservations/', function(resposne){
        console.log(resposne);
    })
}

function callOrders(){
    callAjax(root+':8000/orders/', function(resposne){
        console.log(resposne);
    })
}