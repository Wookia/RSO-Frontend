export const root = window.location.protocol + '//' + window.location.hostname;

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

export function callReservations(){
    return new Promise((resolve, reject) => {
        callAjax(root+':8000/table/', function(response){
            resolve(response);
        })
    });
}

export function callOrders(){
    return new Promise((resolve, reject) => {
        callAjax(root+':8000/orders/', function(response){
            resolve(response);
        })
    });
}

export function callGetUsers(token){
    return new Promise((resolve, reject) => {
        fetch(root+':8000/user/',
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });
}