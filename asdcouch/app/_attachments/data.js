$('#dataPage').live('pageinit', function () {});

var changePage = function (page) {
    console.log(page);
    $('#listA').listview('refresh');
    $.mobile.changePage($("#" + page), {
        transition: "slide"
    });
};


$('#order').live('pageinit', function () {
    $('#listA').empty();
    $('#json').on("click", function () {
        console.log("button clicked");
        //******************************************** load json
        $.ajax({
            url: "_view/orders", //this is where my json is located
            type: 'GET', //What do we want to do?  get or post
            dataType: 'json', //what type of data?  this one is json
            success: function (resp) { //if we find the file properly- do this
                $.each(resp.rows, function (index, item) {
                    console.log('Item ID is: ' + item.id);
                    console.log('Item is: ', item);
                    $('#listA').append('<li>' + item.value.name + '</p>' + 
                    //'<p> ' + item.value.mail + '</p>' + 
                    '<p> ' + item.value.age + '</p>' + 
                    '<p> ' + item.value.crave + '</p>' + 
                    '<p>' + item.value.fav + '</p>' + 
                    '<p>' + item.value.hunger + '</p>' + 
                    '<p>' + item.value.date + '</p>' + 
                    '<p>' + item.value.select + '</p>' + 
                    '<p>' + item.value.comment + '</p>' + 
                    '</li>');

                });


                changePage("dataPage")
            }

        });

    });
});

//*******Editable Page Creation
$('#editPage').live('pageshow', function(){
	console.log("edit is loaded");
	var orderID = {};						//1. This Will hold the id and rev#
	
	var setObject = function(object){		//5b. This will be used to set variables with the object key and rev
		console.log("set object is: ", object);
		orderID._id = object._id;
		orderID._rev = object._rev;
		console.log("id: ", orderID);		//This creates our ID and REV object for deleting data
	}
	
	var splitURL = function(){					//2. Take the ID out of the URL
		var urlData = document.URL;				// Get the URL of the page we're on
		console.log("url is " + urlData);		// Check the URL
		var urlParts = urlData.split('?');		// Divide the URL at the ?
		var urlVals = urlParts[1].split('&');	// Split at the & to get each part of the data
		var idVals = {};
		for (var i in urlVals){
			var keyValue = urlVals[i].split('=');
			var key = decodeURIComponent(keyValue[0]);
			var key = decodeURIComponent(keyValue[1]);
			idVals[key] = value;
		}
		console.log("successful split");
		console.log(idVals[key]);
		return(idVals[key]);					//3a. Return to a Variable (below)
	};
	
	var orderToManip = splitURL();				//3b. Set the ID from the URL to this var
	
	
	//*****************************				//4. Load JSON for that ID from URL
	var loadOrder = function (myOrder){
		$.couch.db('asdproject').openDoc(myOrder,{
			success: function(data){
				
				setObject(data);				//5a. Pass the entire object to setObject (2p up)
				console.log(data);
				$('#eName').html(data.eName).trigger('create');
				$('#eAge').html(data.eAge);
				$('#eCraving').html(data.eCraving);
				$('#eFavorite').html(data.eFavorite);
				$('#eHungry').html(data.eHungry);
				$('#eDate').html(data.eDate);
				$('#eSelect').html(data.eSelect);
				$('#eComment').html(data.eComment);
				
			}//close Success function
		});//close couchDB call
	}//close loadOrder
	
	loadOrder(orderToManip);					//Current order = the full data of the order
	
	//******************** deleteOrder function
	
	var deleteOrder = function(removeID){		//7a. Remove ID = our ID/REV from step 1
		var idToDelete = {};					//We need to get the revision before we can delete
		idToDelete._id = removeID._id;
		idToDelete._rev = removeID._rev;		//7b. Create a new object with the data to delete (not necassary but safe)
		console.log("We will remove: ", idToDelete);  //idToDelete must be an object of {id, rev}
		$.couch.db('asdproject').removeDoc(idToDelete,{	//7c. Call removeDoc, First argument is the ID/REV object; second is success call
		
			success: function(data){
				console.log("We've got TIGER BLOOD!. Winning!");
			}//close success
		})//close couchDB call
		
	}//close deleteOrder
	
	//****************Save the new information
		$('#update').on("click", function(){
			
			var updateItem = {};
			updateItem._id = orderID._id;
			updateItem._rev = orderID._rev;
			console.log("item in update is: ", orderID);
			console.log("ID is: ", updateItem._id, " rev is: ", updateItem._rev);
			console.log("item being sent: ", updateItem);
			
			updateItem.eName		= ['Name: ', $('#eName').html()];
			updateItem.eAge			= ['Age: ', $('#eAge').html()];
			updateItem.eCraving		= ['Craving: ', $('#eCraving').html()];
			updateItem.eFavorite	= ['Favorite: ', $('#eFavorite').html()];
			updateItem.eHungry		= ['How Hungry: ', $('#eHungry').html()];
			updateItem.eDate		= ['Date: ', $('#eDate').html()];
			updateItem.eSelect		= ['Where to Eat: ', $('#eSelect').html()];
			updateItem.eComment		= ['Special Instructions: ', $('#eComment').html()];
			
			$.couch.db('asdproject').saveDoc(updateItem,{
				success: function(data){
					console.log("We've got TIGER BLOOD! Winning!");
					console.log(status);
					$.mobile.changePage("index.html", {transition: "slidedown"});
				}//close success
			}); //close couch call
			
		});//closes update function
		
		$('p.editable').editable();
	
}); //close editPage Creation
