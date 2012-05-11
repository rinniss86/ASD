$('#construction').live('pageinit', function(){
    $('#json').on("click", function () {
        console.log("button clicked");
        //******************************************** load json
        $.ajax({
            url:'/xhr/data.json', //this is where my json is located
            type:'GET', //What do we want to do?  get or post
            dataType:'json', //what type of data?  this one is json
            success :function(resp) {                     //if we find the file properly- do this
                console.log("This is my JSON: ", resp);
                for (var i = 0, len = resp.request.length; i < len; i++) {
                    var item = resp.request[i];
                    console.log('Item is: ', item);
                    $('#json').after(' ' +
                        '<p>' + item.pName[1] +
                        ', ' + item.email[1] +
                        ', ' + item.age[1] +
                        ', ' + item.crave[1] +
                        ', ' + item.fav[1] +
                        ', ' + item.hunger[1] +
                        ', ' + item.date[1] +
                        ', ' + item.select[1] +
                        ', ' + item.comment[1] +
                        '</p>');
                }
            }
        });

    });
});