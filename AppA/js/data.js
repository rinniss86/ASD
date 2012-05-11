$('#construction').live('pageinit', function(){
    $('#json').on("click", function () {
        console.log("button clicked");
        //******************************************** load json
        $.ajax({
            url:'xhr/data.json', //this is where my json is located
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
      // XML
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
                '<p>' + itemList.pName[1] +
                ', ' + itemList.email[1] +
                ', ' + itemList.age[1] +
                ', ' + itemList.crave[1] +
                ', ' + itemList.fav[1] +
                ', ' + itemList.hunger[1] +
                ', ' + itemList.date[1] +
                ', ' + itemList.select[1] +
                ', ' + itemList.comment[1] +
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
    })

});