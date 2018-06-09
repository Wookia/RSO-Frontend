
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

const headersWithAuthorization = (token) => (Object.assign(headers, { Authorization: `Bearer ${token}` }))

export const root = 'https://' + window.location.hostname;

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

export function getAllTables(token) {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/table/', {headers: headersWithAuthorization(token)})
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function getAllTablesNoToken() {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/table/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function getAllReservations(token) {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/reservation/', {headers: headersWithAuthorization(token)})
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export async function addReservation(data, token) {
    return await fetch(root + '/api/reservation/', {
        method: 'POST',
        headers: headersWithAuthorization(token),
        body: JSON.stringify(data)
    })
}

export async function realizeReservation(id, token) {
    return await fetch(`${root}/api/reservation/${id}/realize`, {
        method: 'PUT',
        headers: headersWithAuthorization(token)
    })
}

export async function deleteReservation(id, token) {
    return await fetch(`${root}/api/reservation/${id}`, {
        method: 'DELETE',
        headers: headersWithAuthorization(token)
    })
}


export function callOrders(token) {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/orders/', { headers: headersWithAuthorization(token) })
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function getMenuItems(token) {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/menu/', { headers: headersWithAuthorization(token) })
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function getMenuItemsNoToken() {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/menu/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function addOrder(order, token) {
    return fetch(root + '/api/orders/', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: headersWithAuthorization(token)
    });
}

export function updateOrder(order, token) {
    return fetch(root + '/api/orders/' + order.id, {
        method: 'PUT',
        body: JSON.stringify(order),
        headers: headersWithAuthorization(token)
    });
}

export function deleteDish(orderId, dishId, token) {
    return new Promise((resolve, reject) => {
        fetch(`${root}/api/orders/${orderId}/dish`, {
            method: 'DELETE',
            body: JSON.stringify({ dish: dishId }),
            headers: headersWithAuthorization(token)
        })
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function callGetUsers(token) {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/user/', {
            headers: headersWithAuthorization(token)
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });
}

export async function putUpdatedUser(token, body) {
    return await fetch(`${root}/api/user/${body.id}`, {
        method: 'PUT',
        headers: headersWithAuthorization(token),
        body: JSON.stringify(body)
    });
}