//Rich Inniss
//ASD 0712
//Week 1.

//Variables
var whereToEat = ["--Where to Eat--", "Sit Down", "Pick Up", "Delivery", "Cook Your Own"],
    craveVaule,
    faveValue = "No",
    errMsg = $('#errors');

//Links and Submit Events
var save = $('#submit');
var displayLink = $('#displayLink');
var clearLink = $('#clearLink');

//********************** Main Function ***********************

//********************* Form is Live ***************************
$('#order').live('pageinit', function () {
    console.log("Form is Live");

    save.on("click", function () {
        console.log("It Saved");
        storeData();
    }); 						//Saves Data


    displayLink.on("click", getData); // Displays Data when pressed
    clearLink.on("click", clearLocal); // Clears Data when pressed

    //toggleControl("on");

    //*************Functions****************

    /* function toggleControl$(n) {
     switch (n) {
     case "on":
     $('#order').hide();
     $('#clear').show();
     $('#displayLink').hide();
     $('#addNew').show();
     break;
     case "off":
     $('#order').show();
     $('#clear').show();
     $('#displayLink').show();
     $('#addNew').hide();
     $('#items').hide();
     break;
     default:
     return false;
     }
     } */


    //*********** Get Radio Value ************
    var getRadio = function () {
        console.log($('input:radio[name=crave]:checked').val());
        return($('input:radio[name=crave]:checked').val());
    };

    //******** Set Radio for Edit *********
    var setRadio = function (myRadio) {
        if (myRadio === 'Chinese') {
            console.log("Picked Chinese");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        }
        else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Spanish') {
            console.log("Picked Spanish");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        }
        else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Indian') {
            console.log("Picked Indian");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        }
        else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'American') {
            console.log("Picked American");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        }
        else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Italian') {
            console.log("Picked Italian");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        }
        else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Other') {
            console.log("Picked Other");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        }
        else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

    };

    //************ Get Check Box Value ************

    var getCheckBoxValue = function () {
        console.log("Selected");
        console.log($('input:checkbox[name=favorite]:checked').val());

        if ($('input:checkbox[name=favorite]:checked').val() === "Yes") {
            return($('input:checkbox[name=favorite]:checked').val());
        }
        else {
            return("No");
        }
    };

	var setCheckBoxes = function (myBox){
		console.log("box is: " + myBox);
		if(myBox === "Yes"){
			$('input[name=favorite]nth(0)').attr('checked', true);
			$('input[name=favorite]').checkboxradio("refresh");
		}
	}
    

//*********** Display Data ************
    function getData() {
        // toggleControl$("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage so default data was added.");
            autoFillData();
        }
        //Write Data from Local Storage to Browser.
        // Append an Unordered List

        var makeDiv = $('#previewInfo');
        makeDiv.attr("data-role", "content");
        makeDiv.append("<ul id=" + "makeList");
        var makeList = $('#dataList');
        makeList.attr({
            dataRole:"listview",
            dataInset:"true",
            dataFilter:"true"
        });

        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeLi = $("<li></li>"); // create list item
            var linksLi = $("<li></li>");// create list item
            makeList.append(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert the string from local storage valueback to an object using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = $('<ul></ul>');
            makeli.append(makeSubList);

            //add pictures to items
            getImage(obj.select[1], makeSubList);
            for (var n in obj) {
                var optSubText = obj[n][0] + " " + obj[n][1];  //Separate label with value
                var makeSubli = $("<li></li>");
                console.log(obj[n]);
                makeSubList.append(optSubText);
                makeSubList.append(makeSubli);
                makeSubli.append(linksLi);
            }
            //Create our edit and delete buttons/links for each item in local storage.

            makeItemLinks(localStorage.key(i), linksLi);
        }
    }


});


//Auto Populate Local Storage
function autoFillData(){
    //The actual JSON OBJECT data required for this to work is coming from our json.js file, which is laoded from our HTML page
    //Store the JSON OBJECT into Local Storage.
    for (var n in json){
        var id = Math.floor(Math.random() * 9999999);
        localStorage.setItem(id, JSON.stringify(json[n]));
    }
    getData();
    getData();

};
// Adds Image to each item
var getImage = function(catName, makeSubList){      //image added to the item
	var imageLi = $("<li></li>");					//create a list item for the image
	makeSubList.append(imageLi);					//makeSubList is from getData
	var newImg = $("<img />");						//add image tag
	newImg.attr('src', "images/" + catname ".png");	//image name matches dropbox selection
	imageLi.append(newImg);							//add image to the list

};
//Make Item Links
//Create the edit and delete links for each stored item when displayed.
var makeItemLinks = function (key, linksLi){
	var myKey = key;
	var editLink = $("<a></a>");  //edit single item
	var breakTag = $("</br>");
	var editText = "Edit Order";
	//set attributes for link
	editLink.attr({
		href: "#form",
		key: myKey,
		class: "editEntry"
	});
	
	editLink.html(editText);						// add text to link
	linksLi.append(editLink);
	linksLi.append(breakTag);						// puts link at bottom of order
	
	$('.editEntry', linksLi).on('click', function(){
		editForm(myKey);
	});												//listen for click to edit order

    //add delete single item link
    var deleteLink = $("<a></a>");					//add anchor tag
    var deleteText = "Delete Order";				//set tag for anchor to delete
    deleteLink.attr({								//set attributes for delete anchor
    	href: "#",
    	key: myKey,
    	class: ".deleteEntry"
    });
	deleteLink.html(deleteText)label				//adds text to link
	linksLi.append(deleteLink);						//adds button to bottom of order
	$('.deleteEntry', linksLi).on('click', function(){
		deleteItem(myKey);
	});
};

function deleteItem = function (myKey){
	var ask = confirm("Are you sure you want to delete this order?");
	
	if(ask){										//if you clicked "ok"
		localStorage.removeitem(myKey)				//deleteItem has access to key through makeItemLink
		alert("Order deleted");						//confirmation popup
		window.location.reload();					//reload window to empty form page
	}
	else{
		alert("Order was not deleted");				//canceled deletion
	}
};

function editItem() {
    //grab the data from our item local storage.
    var value = localStorage.getItem(myKey);
    var item = JSON.parse(value);					//conver string to object

    //show the form
    

    //populate the form fields with the current localStorage values.
    $('#name').val(item.name[1]);
    $('#email').val(item.email[1]);
    $('#age').val(item.age[1]);
    setRadio(item.food[1]);								//set appropriate radio
    if(item.fav[1] =="Yes"){							//populate checkbox if selected
    	$('#fav').attr("checked", "checked");
    }
    console.log("its your fav: " + item.fav[1]);
    setCheckBoxes.(item.fav);	
    $('#date').val(item.date[1]);
    $('#select').val(item.select[1]);
    $('#instructions').val(item.comment[1]);

    //Remove the initial listener from the input 'save lunch ' button
    submit.off("click", storeData);
    //change Submit Button Value to Edit Button
    $('#submit').text = "Edit Order";
    var editSubmit = $('#submit');
    //save the key value established in this function as a property of the editSubmit event
    //so we can use that value when we save the data we edited.
    editSubmit.on("click", function(){
    	oform.validate();
    	console.log("validating form");
    	if (oform.isValid){
    		console.log("Form is valid");
    		storeData();
    	}
    });
    editSubmit.key = this.key;
};


function clearLocal() {
    if (localStorage.length === 0) {
        alert("There is no data to clear.");

    } else {
        localStorage.clear();
        alert("Goodbye Hunger");
        window.location.reload();
        return false;
    }
};


var parseOrderForm = function (data) {
    // uses form data here;
    console.log(data);
};

var storeData - function(key){
	oForm.validate();
	if(oForm.valid()){
	var id;
	if(!key){
		id = math.floor(Math.random()*9999999);
	}
	else{
		id = key;
	}
	console.log(key);
	
	var item = {};
	
		item.name = ["Name: ", ($('#name').val())];
        item.email = ["Email: ", ($('#email').val())];
        item.age = ["Age: ", ($('#age').val())];
        item.crave = ["Craving: ", getRadio()];
        item.fav = ["Favorite? :", getCheckBoxValue()];
        item.hunger = ["How Hungry: ", ($('#hungry').val())];
        item.date = ["Date:", ($('#date').val())];
        item.select = ["Where: ", ($('#select').val())];
        item.comment = ["Instructions: ", ($('#instructions').val())];
        
        alert("Order Saved");
	}
};



});
