$('#others').live('pageinit', function(){
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
                    $('#listA').append(
                        '<li>' + item.pName[1] + '</p>' +
                        '<p> ' + item.email[1] + '</p>' +
                        '<p> ' + item.age[1] + '</p>' +
                        '<p> ' + item.crave[1] + '</p>' +
                        '<p>' + item.fav[1] + '</p>' +
                        '<p>' + item.hunger[1] + '</p>' +
                        '<p>' + item.date[1] + '</p>' +
                        '<p>' + item.select[1] + '</p>' +
                        '<p>' + item.comment[1] + '</p>' +
                        '</li>');
                }
                changePage("dataPage")
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

            $('#listA').append(' ' +
                '<li>' + itemList.pName + 
                '<p> ' + itemList.email + '</p>' +
                '<p>' + itemList.age + '</p>' +
                '<p>' + itemList.crave + '</p>' +
                '<p>' + itemList.fav + '</p>' +
                '<p>' + itemList.hunger + '</p>' +
                '<p>' + itemList.date + '</p>' +
                '<p> ' + itemList.select + '</p>' +
                '<p>' + itemList.comment + '</p>' +
                '</li>');



        });
		changePage("dataPage")
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

                    $('#listA').append('<li class="ui-li ui-li-static ui-body-a">'   +
                        '<p> Date Order: ' + columns[0] + 
                        ' Cook Your Own ' + columns[1] +
                        '&nbsp;&nbsp; Take Out' + columns[2] +
                        '&nbsp;&nbsp; Pick Up' + columns[3] +
                        '&nbsp;&nbsp; Delivery' + columns[4] +
                        '</p>' + '</li>');




                }
                changePage("dataPage")
            }

        })
    })
});

$('#dataPage').live('pageinit', function(){});

var changePage = function(page){
	console.log(page);
    $('#listA').listview('refresh');
	$.mobile.changePage($("#"+ page), {transition:"slide"});
};
