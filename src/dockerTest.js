
const headers = (token) => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
});

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
        fetch(root+':8000/table/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function callOrders(){
    return new Promise((resolve, reject) => {
        fetch(root+':8000/orders/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function callGetUsers(token){
    return new Promise((resolve, reject) => {
        fetch(root+':8000/user/', {
            headers: headers(token)
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });
}