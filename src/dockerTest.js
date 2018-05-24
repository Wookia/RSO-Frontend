
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

const headersWithAuthorization = (token) => (Object.assign(headers, { Authorization: `Bearer ${token}` }))

export const root = window.location.protocol + '//' + window.location.hostname;

export function callAjax(url, callback) {
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

export function callReservations() {
    return new Promise((resolve, reject) => {
        fetch(root + ':8000/table/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function callOrders() {
    return new Promise((resolve, reject) => {
        fetch(root + ':8000/api/orders/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function getMenuItems() {
    return new Promise((resolve, reject) => {
        fetch(root + ':8000/api/menu/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function addOrder(order) {
    return new Promise((resolve, reject) => {
        fetch(root + ':8000/api/orders/', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: headers
        })
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function deleteDish(orderId, dishId) {
    return new Promise((resolve, reject) => {
        fetch(`${root}:8000/api/orders/${orderId}/dish`, {
            method: 'DELETE',
            body: JSON.stringify({ dish: dishId }),
            headers: headers
        })
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function callGetUsers(token) {
    return new Promise((resolve, reject) => {
        fetch(root + ':8000/user/', {
            headers: headersWithAuthorization(token)
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });
}