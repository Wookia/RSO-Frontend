
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

export function getAllTables() {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/table/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function getAllReservations() {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/reservation/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export async function addReservation(data) {
    return await 
        fetch(root + '/api/reservation/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
}

export async function realizeReservation(id) {
    return await 
        fetch(`${root}/api/reservation/${id}/realize`, {
            method: 'PUT',
        })
}

export async function deleteReservation(id) {
    return await 
        fetch(`${root}/api/reservation/${id}`, {
            method: 'DELETE',
        })
}


export function callOrders() {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/orders/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export function getMenuItems() {
    return new Promise((resolve, reject) => {
        fetch(root + '/api/menu/')
            .then(response => resolve(response))
            .catch(err => reject(err))
    });
}

export async function addOrder(order) {
    return await fetch(root + '/api/orders/', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: headers
        });
}

export function deleteDish(orderId, dishId) {
    return new Promise((resolve, reject) => {
        fetch(`${root}/api/orders/${orderId}/dish`, {
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
    return await
        fetch(`${root}/api/user/${body.id}`, {
            method: 'PUT',
            headers: headersWithAuthorization(token),
            body: JSON.stringify(body)
        });
}