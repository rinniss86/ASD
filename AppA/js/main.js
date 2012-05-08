$('#order').live('pageinit', function(){


	//Create select field element and populate with options.


	/*function makeCats(){
		var formTag = document.getElementsByTagName("form");
		var selectLi = s('select');
		selectLi.setAttribute("id","group");

		for(var i=0, j=whereToEat.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = whereToEat[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			console.log("option is:" + makeOption.text);
			selectLi.appendChild(makeOption);
			};
	};*/


	function toggleControls(n){
		switch(n){
			case "on":
				$('#order').hide;
				$('#clear').show;
				$('#displayLink').hide;
				$('#addNew').show;
				break;
			case "off":				
				$('#clear').show;
				$('#displayLink').hide;
				$('#addNew').hide;
				$('#items').hide;
				break;
			default:
				return false;
		}
	}

	function storeData (key){

		function getSelectedRadio(){
			var radios = $('form');
			for(var i=0; i<radios.length; i++){
				if(radios[i].checked){
				craveValue = radios[i].value;
				}
			}
		}

	function getCheckBoxValue(){
		if($('#fav').checked){
			favValue = $('#fav').value;
		}else{
			favValue = "No";
		}
	}
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){

 		var id = Math.floor(Math.random()*9999999);
 		}else{
 			//Set the id to the existing key we;re editing so that it will save over the data.
 			//The key is the same key that's been passed along from the editSubmit event handler
 			//to the validate function, and then passed here into the storeData function.
 			id = key;
 		}
 		// Gather up all our form field values and store in an object.
 		//Object properties contain array with the form label and input value.
 		getSelectedRadio();
 		getCheckBoxValue();
 		console.log(id);
 		
 		var item 				= {};
 			  item.name			= ["Name: ", $('#name')]; 		 		
 			  item.email		= ["Email: ", $('#email')];			
 			  item.age			= ["Age: ", $('#age')];
 			  item.crave		= ["Craving: ", craveValue];
 			  item.fav			= ["Favorite? :", favValue];
 			  item.hunger		= ["How Hungry: ", $('#hungry')];
 			  item.date			= ["Date:", $('#date')];
 			  item.select		= ["Where: ", $('#select')];
 			  item.comment		= ["Instructions: ", $('#instructions')];
 			  
 			  
 			  	
 
  		//save to local storage: use stringify to convert 
 		localStorage.setItem(id, JSON.stringify(item));
 		alert("Form Submitted");
 	}; 

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		//Write Data from Local Storage to Browser.
		//var makeDiv = document.createElement('div');
		
		var makeDiv = $('#showOrder');
		makeDiv.attr("data-role", "content");
		makeDiv.append("<ul id=" + "orderList" + "></ul>");
		var makeList= $('#orderList');
		makeList.attr({
			dataRole: "listview",
			dataInset: "true",
			dataFilter: "true"
		});
		/*var makeDiv = document.getElementById('previewInfo');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);*/
		
		
		//$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = $("<li></li>");
			var linksLi = $("<li></li>");
			makeLis.append(makeLi);
			var key = localStorage.key(i);
			var value = locaStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul></ul>');
			makeLi.append(makeSubList); 
			
			/*var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage valueback to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.select[1], makeSubList);*/
			
			for(var n in obj){
				var makeSubLi = $("<li></li>");
				makeSubList.append(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubLi.append(linksLi);
				}
				makeItemLinks(localStorage.key(i), linksLi);
				/*console.log(obj[n]);
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);*/ //Create our edit and delete buttons/links for each item in local storage.
		}
	}

	//Get the Image For the Right Category
	function getImage(catName, makeSubList){
		var imageLI = $("<li></li>");
		makeSubList.append(imageLi);
		var newImg = $("<img></img>");
		//var setSrc = $(
	
	/*console.log("category name is:" + catName);
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src","images/"+ catName +".png");
		imageLi.appendChild(newImg); */
	}


	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT data required for this to work is coming from our json.js file, which is laoded from our HTML page
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*9999999);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}

	}

	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
	//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Lunch";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);


		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Lunch";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);

	}

	function editItem(){
		//grab the data from our item local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//show the form
		toggleControls("off");

		//populate the form fields with the current localStorage values.
		$('#name') = item.name[1];
		//$('pword').value = item.pword[1];
		$('#email') = item.email[1];
		$('#age') = item.age[1];
		var radios = document.forms[0].food;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "chinese" && item.crave[1] == "chinese"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "spanish" && item.crave[1] == "spanish"){
				radios[i].setAttribute("checked", "checked");
			}

			if(radios[i].value == "indian" && item.crave[1] == "indian"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "american" && item.crave[1] == "american"){
				radios[i].setAttribute("checked", "checked");
			}
			if(radios[i].value == "italian" && item.crave[1] == "italian"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "other" && item.crave[1] == "other"){
				radios[i].setAttribute("checked", "checked");
			}

		if(item.fav[1] == "Yes"){
			$('#fav').setAttribute("checked", "checked");
		}


		if(item.fav[1] == "Yes"){
			$('#fav').setAttribute("checked", "checked");
		}
		}	

		$('#date') = item.date[1];
		$('#select') = item.select[1];
		$('#instructions') = item.comment[1];

		//Remove the initial listener from the input 'save lunch ' button
		save.removeEventListener("click", storeData);
		//change Submit Button Value to Edit Button
		$('#submit') = "Edit Order";
		var editSubmit = $('#submit');
		//save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this order?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Order was deleted.");
			window.location.reload();
		}else{
			alert("Order was NOT deleted");
		}
	}

	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");

		}else{
			localStorage.clear();
			alert("Goodbye Hunger");
			window.location.reload();
			return false;
		}
	}



	var parseOrderForm = function(data){
	// uses form data here;
	console.log(data);
};

//validation

	var oform = $('#form');
	

	oform.validate({
		invalidHandler: function(form, validator){
			
					},
		submitHandler: function(){
			var data = oform.serializeArray();
			parseOrderForm(data);
		}
	


});



	//Variable defaults
	var whereToEat = ["--Where to Eat--", "Sit Down", "Pick Up", "Delivery", "Cook Your Own"],
		craveVaule,
		faveValue = "No",
		errMsg = $('#errors');
	//makeCats();

	//Set Links & Submit Click Events
	var displayLink = $('#displayLink');
	//displayLink.addEventListener("click", getData);
	var clearLink = $('#clear');
	//clearLink.addEventListener("click", clearLocal); 
	var save = $('#submit');
	//save.addEventListener("click", validate);
	var hungerNum = $('#hungry');
	//hungerNum.addEventListener("change", hungerLevel);
});