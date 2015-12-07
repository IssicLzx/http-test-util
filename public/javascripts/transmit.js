function get(url, params){

    $.ajax({
        url: 'http://127.0.0.1:3000/post',
        method: 'post',
        dataType: 'json',
        data: {url : url , type: type, params : params},
        success: function (ret) {
            console.log('post success, and result : ');
            console.log(ret);
            alert('post success' , ret );
        },
        error: function(err){
            console.log('post fail , reason : %s', err);
            alert('post fail ');
        }
    })

}

function post(host , port, path, params){

    $.ajax({
        url: 'http://127.0.0.1:3000/post',
        method: 'post',
        dataType: 'json',
        data: {host : host, port: port, path: path , type: 'post', params : params},
        success: function (ret) {
            console.log('post success, and result : ');
            console.log(ret);
            alert('post success' , ret );
            add_result(ret);
        },
        error: function(err){
            console.log('post fail , reason : %s', err);
            alert('post fail ');
        }
    })

}

function add_result(object){
    var str = '<div class="col-lg-6"> <p> time :' + new Date() +
        ' result : </p>' +
        '<br/>';

    str += '<ul>';
    for(var key in object) {
        str += '<li> ' +
            key + ' : ' + object[key] + '\n\t'+
            '</li>'
    }

    str += '</ul>';
    str += '</div>'
    $('div#result').append(str);
}

function btn_transmit_click(){

    //var url = $('#la_url').val();
    //console.log('url :' , url);

    var type= $("select[name=type]").find("option:selected").val();
    console.log('type :' , type);
    var params = $('#la_params').val();
    console.log('params :' , params);

    var host = $('#la_host').val();
    var port = parseInt( $('#la_port').val() );
    var path =  $('#la_path').val();

    post(host , port, path, params);
}