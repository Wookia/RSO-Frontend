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

function callSecondary(){
    callAjax(root+':8000/secondary/', function(resposne){
        console.log(resposne);
    })
}