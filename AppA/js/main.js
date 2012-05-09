//Rich Inniss
//ASD 1205

//Variables
	var whereToEat = ["--Where to Eat--", "Sit Down", "Pick Up", "Delivery", "Cook Your Own"],
		craveVaule,
		faveValue = "No",
		errMsg = $('#errors');

	//displayLink.addEventListener("click", getData);
	var clearLink = $('#clear');
	//clearLink.addEventListener("click", clearLocal); 
	var save = $('#submit');
	//save.addEventListener("click", validate);
	var hungerNum = $('#hungry');
	//hungerNum.addEventListener("change", hungerLevel);
	var displayLink = $('#displayLink');
	var oform = $("form");


$('#form').live('pageinit', function(){			//Start



		save.bind("click" , storeData);
		displayLink.bind("click" , getData);
		clearLink.bind("click" , clearLocal);

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


	function toggleControls(n){		// toggleControls Start
		switch(n){					// switch Start
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
		}							// switch End
	}								//toggleControls End

	function storeData (key){		//storeData Start

		function getSelectedRadio(){ //getSelectedRadio Start
			var radios = document.forms[0].food;
			for(var i=0; i<radios.length; i++){ //radio loop start
				if(radios[i].checked){			//radio if start
				craveValue = radios[i].value;
				}					//radio if End
			}						//radio Loop End
		}							//getSelectedRadio End

	function getCheckBoxValue(){ 	//getCheckBoxValue Start
		if($('#fav').checked){		//getCheckBoxValue Loop Start
			favValue = $('#fav').value;
			}						// GCBV if End
			else{					// GCBV else start	
			favValue = "No";
		}							// GCBV else End
	}								// GCBV End
	
	
		//If there is no key, this means this is a brand new item and we need a new key.
		
		if(!key){									//if Start
 		var id = Math.floor(Math.random()*9999999);
 		}											//if End
 		else{										//else Start
 			//Set the id to the existing key we;re editing so that it will save over the data.
 			//The key is the same key that's been passed along from the editSubmit event handler
 			//to the validate function, and then passed here into the storeData function.
 			id = key;
 		}											//else End
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
 	 

	$("#displayLink").bind('click', function(){				//getData Start
		toggleControls("on");
		if(localStorage.length === 0){		//localStorage loop start
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}							//localStorage loop end
		//Write Data from Local Storage to Browser.
		//var makeDiv = document.createElement('div');
		
		var makeDiv = $('#showOrder');
		makeDiv.attr("data-role", "content");
		makeDiv.append("<ul id=" + "orderList" + "></ul>");
		var makeList= $('#orderList');
		makeList.attr({				//makeList start
			dataRole: "listview",
			dataInset: "true",
			dataFilter: "true"
		});							//makeList End
		
		
		
		
		//$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){		//For Loop Start
			var makeLi = $("<li></li>");
			var linksLi = $("<li></li>");
			makeLis.append(makeLi);
			var key = localStorage.key(i);
			var value = locaStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul></ul>');
			makeLi.append(makeSubList); 
			
			
			
			for(var n in obj){						//for loop in a for loop start
				var makeSubLi = $("<li></li>");
				makeSubList.append(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubLi.append(linksLi);
				};									//for loop in a for loop end
				makeItemLinks(localStorage.key(i), linksLi);
				 //Create our edit and delete buttons/links for each item in local storage.
		}											//For Loop End
	};												//getData End

	//Get the Image For the Right Category
	function getImage(catName, makeSubList){		//getImage Start
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
	}												//getImage End


	//Auto Populate Local Storage
	function autoFillData(){						//autoFillData Start
		//The actual JSON OBJECT data required for this to work is coming from our json.js file, which is laoded from our HTML page
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){							//autoFillData for loop start
			var id = Math.floor(Math.random()*9999999);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}											//autoFillData for loop end

	}												//autoFilldata End

	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){			//makeItemLinks Start
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

	}												//makeItemLinks End

	function editItem(){							//editItem Start
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
		for(var i=0; i<radios.length; i++){			//editItem raido loop start
			if(radios[i].value == "chinese" && item.crave[1] == "chinese"){	//chinese if start
				radios[i].setAttribute("checked", "checked");
			}
			else if(radios[i].value == "spanish" && item.crave[1] == "spanish"){	//chinese if end, spanish else start
				radios[i].setAttribute("checked", "checked");
			}																		//spanish else ends

			if(radios[i].value == "indian" && item.crave[1] == "indian"){			//indian if starts
				radios[i].setAttribute("checked", "checked");
			}
			else if(radios[i].value == "american" && item.crave[1] == "american"){	//indian if ends, american else start
				radios[i].setAttribute("checked", "checked");
			}																		//american else ends
			if(radios[i].value == "italian" && item.crave[1] == "italian"){			//italian if starts
				radios[i].setAttribute("checked", "checked");
			}
			else if(radios[i].value == "other" && item.crave[1] == "other"){		//italian if ends, other else starts
				radios[i].setAttribute("checked", "checked");
			}																		//other else ends
		};																			//editItem radio loop ends

		if(item.fav[1] == "Yes"){								//item.fav if start
			$('#fav').setAttribute("checked", "checked");
		}														//item.fav if end


													
		

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
	};															//editItem End

	function deleteItem(){										//deleteItem Start
		var ask = confirm("Are you sure you want to delete this order?");
		if(ask){												//deleteItem if Start
			localStorage.removeItem(this.key);
			alert("Order was deleted.");
			window.location.reload();
		}														//deleteItem if end
		else{													//deleteItem else start
			alert("Order was NOT deleted");
		}														//deleteItem else end
	};															//deleteItem End

	function clearLocal(){										//clearLocal Start
		if(localStorage.length === 0){							//clearLocal if Start
			alert("There is no data to clear.");

		}														//clearLocal if End
		else{													//clearLocal else Start
			localStorage.clear();
			alert("Goodbye Hunger");
			window.location.reload();
			return false;
		}														//clearLocal else End
	};															//clearLocal End

		//Click Event Function
		$('#submit').on('click' , function(){ 				//Submit Click Event Start		
			alert('working');
			edit
			return false;
		};														//Submit Click Event End

	/*var parseOrderForm = function(data){						//parseOrderForm Start
	// uses form data here;
	console.log(data);
	};	*/														//parseOrderForm End

//validation

	
	

	oform.validate({											// Form Validation Start
		invalidHandler: function(form, validator){				// invalidHandler Start
			
					},											// invalidHandler End
		submitHandler: function(){								//submitHandler Start
			var data = oform.serializeArray();
			parseOrderForm(data);
		}														//submitHandler End
		
		
	});															//Form Validation End


});  				// End