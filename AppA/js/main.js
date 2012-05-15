window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function
	function s(x){
		var theElement = document.getElementById(x);
		return theElement;
	};

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
				s('order').style.display = "none";
				s('clear').style.display = "inline";
				s('displayLink').style.display = "none";
				s('addNew').style.display = "inline";
				break;
			case "off":
				s('order').style.display = "block";
				s('clear').style.display = "inline";
				s('displayLink').style.display = "inline";
				s('addNew').style.display = "none";
				s('items').style.display = "none";
				break;
			default:
				return false;
		}
	}

	function storeData (key){

		function getSelectedRadio(){
			var radios = document.forms[0].food;
			for(var i=0; i<radios.length; i++){
				if(radios[i].checked){
				craveValue = radios[i].value;
				}
			}
		}

	function getCheckBoxValue(){
		if(s('fav').checked){
			favValue = s('fav').value;
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
 			  item.name			= ["Name: ", s('name').value]; 		
 			  //item.pword		= ["Password: ", $('pword').value]; 		
 			  item.email		= ["Email: ", s('email').value];			
 			  item.age			= ["Age: ", s('age').value];
 			  item.crave		= ["Craving: ", craveValue];
 			  item.fav			= ["Favorite? :", favValue];
 			  item.hunger		= ["How Hungry: ", s('hungry').value];
 			  item.date			= ["Date:", s('date').value];
 			  item.select		= ["Where: ", s('select').value];
 			  item.comment		= ["Instructions: ", s('instructions').value];
 			  
 			  
 			  	
 
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
		var makeDiv = document.getElementById('previewInfo');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		//$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage valueback to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.select[1], makeSubList);
			for(var n in obj){
				console.log(obj[n]);
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/links for each item in local storage.
		}
	}

	//Get the Image For the Right Category
	function getImage(catName, makeSubList){
	console.log("category name is:" + catName);
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src","images/"+ catName +".png");
		imageLi.appendChild(newImg);
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
		s('name').value = item.name[1];
		//$('pword').value = item.pword[1];
		s('email').value = item.email[1];
		s('age').value = item.age[1];
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
			s('fav').setAttribute("checked", "checked");
		}


		if(item.fav[1] == "Yes"){
			s('fav').setAttribute("checked", "checked");
		}
		}	

		s('date').value = item.date[1];
		s('select').value = item.select[1];
		s('instructions').value = item.comment[1];

		//Remove the initial listener from the input 'save lunch ' button
		save.removeEventListener("click", storeData);
		//change Submit Button Value to Edit Button
		s('submit').value = "Edit Order";
		var editSubmit = s('submit');
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

$(document).ready(function(){

	var oform = $('#form');
	

	oform.validate({
		invalidHandler: function(form, validator){
			
					},
		submitHandler: function(){
			var data = oform.serializeArray();
			parseOrderForm(data);
		}
	});



});



	/*function validate(e){
		//define the elements we want to check
		var getName = s('name');
		var getEmail = s('email');
		var getDate = s('date');
		var getGroup = s('group');
		
		//Reset Error Messages
		errMsg.innerHTML = "";
			getGroup.style.border = "1 px solid black";
			getName.style.border = "1 px solid black";
			getEmail.style.border = "1 px solid black";
			getDate.style.border = "1 px solid black";
		//Get Error Message
		var messageAry = [];
		//Group Validation
		if(getGroup.value ==="--Where to Eat--"){
			var groupError = "Choose where to eat.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		//Name Validation
		if(getName.value ===""){
			var nameError = "Please enter a name."
			getName.style.border = "1 px solid red";
			messageAry.push(nameError);
		}
		
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		//Date Validation
		if(getDate.value ==="date"){
		var dateError = "Enter a date";
		getDate.style.border = "1 px solid red";
		messageAry.push(dateError);
		}
		
		//If there were errors, display them on the screen
		if(messageAry.length >= 1){
			for(var i = 0, j = messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
		return false;
	}else{
	//If all is OK, save our data! Send the key value (which came from the editData Function).
	// Remember this key value was passed through the editSubmit event listener as a property.
		storeData(this.key);
	}
		
	}
	
	//Slider Value Displayed
	function hungerLevel(){
		hVal = s('hungry').value;
			console.log(hVal);
		var makeDiv = document.getElementById("hungerNum");
		makeDiv.innerHTML = hVal;
	}
*/


	//Variable defaults
	var whereToEat = ["--Where to Eat--", "Sit Down", "Pick Up", "Delivery", "Cook Your Own"],
		craveVaule,
		faveValue = "No",
		errMsg = s('errors');
	//makeCats();

	//Set Links & Submit Click Events
	var displayLink = s('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = s('clear');
	clearLink.addEventListener("click", clearLocal); 
	var save = s('submit');
	//save.addEventListener("click", validate);
	var hungerNum = s('hungry');
	//hungerNum.addEventListener("change", hungerLevel);
});