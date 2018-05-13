const root = window.location.protocol + '//' + window.location.hostname;

export function callAjax(url, callback){
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
export function callAuth(){
    callAjax(root+':8000/auth/', function(response){
        console.log(response);
    })
}

export function callReservations(){
    callAjax(root+':8000/reservations/', function(response){
        console.log(response);
    })
}

export function callOrders(){
    callAjax(root+':8000/orders/', function(response){
        console.log(response);
    })
}