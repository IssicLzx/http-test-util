function post(url, type, params){

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