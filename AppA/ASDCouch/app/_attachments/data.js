$('#construction').live('pageinit', function () {
    $('#json').on("click", function () {
        console.log("button clicked");
        //******************************************** load json
        $.ajax({
            url:'_view/orders', //this is where my json is located
            type:'GET', //What do we want to do?  get or post
            dataType:'json', //what type of data?  this one is json
            success:function (resp) {                     //if we find the file properly- do this
                console.log("This is my JSON: ", resp);
                $.each(resp.rows, function (item, order) {
                    var name = orders.value.name;
                    var email = orders.value.email;
                    var age = orders.value.age;
                    var crave = orders.value.crave;
                    var fav = orders.value.fav;
                    var hunger = orders.value.hunger;
                    var date = orders.value.date;
                    var select = orders.value.select;
                    var comment = orders.value.comment;
                    $("#json").append(
                        $('<ui>').append(
                            $('<a>').attr("href", "#").text(name)
                        )
                    )

                });
                $("#json").listview('refresh');
            }
        });

    });
    /* XML
     var parseXML = function (xml){
     console.log(xml);
     $(xml).find("item").each(function(){
     var itemList = {};
     itemList.pName          =   $(this).find("pName").text();
     itemList.email          =   $(this).find("email").text();
     itemList.age            =   $(this).find("age").text();
     itemList.crave          =   $(this).find("crave").text();
     itemList.fav            =   $(this).find("fav").text();
     itemList.hunger         =   $(this).find("hunger").text();
     itemList.date           =   $(this).find("date").text();
     itemList.select         =   $(this).find("select").text();
     itemList.comment        =   $(this).find("comment").text();
     console.log(itemList);

     $('#xml').after(' ' +
     '<p>' + itemList.pName +
     ', ' + itemList.email +
     ', ' + itemList.age +
     ', ' + itemList.crave +
     ', ' + itemList.fav +
     ', ' + itemList.hunger +
     ', ' + itemList.date +
     ', ' + itemList.select +
     ', ' + itemList.comment +
     '</p>');



     });

     };

     $('#xml').on("click", function(){
     //Retrieve the XML
     $.ajax({                           //access xml info
     type: "GET",                   //get the info
     url: "xhr/data.xml",           //link to xml data
     dataType: "xml",
     success: parseXML              //If Successful, call the parseXML Function
     })

     })
     // CSV

     $('#csv').on("click", function(){
     //load csv
     $.ajax({
     url: 'xhr/data.csv',
     type: 'GET',
     dataType: 'text',
     success: function(csvData){
     console.log("CSV Button works", csvData);
     var items = csvData.split("\n");
     for (var j=1; j < items.length; j++){
     var row = items[j];
     var columns = row.split(",");
     console.log("CSV:", columns);

     $('#csv').after(''   +
     '<p> Date Order: ' + columns[0] +
     'Cook Your Own ' + columns[1] +
     '&nbsp;&nbsp; Take Out' + columns[2] +
     '&nbsp;&nbsp; Pick Up' + columns[3] +
     '&nbsp;&nbsp; Delivery' + columns[4] +
     '&nbsp;&nbsp; Sit Down' + columns[5] +

     '</p>');




     }
     }

     })
     }) */

});