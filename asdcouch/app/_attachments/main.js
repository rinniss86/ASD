//Rich Inniss
//ASD 0712
//Week 2.
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
    }); //Saves Data


   // displayLink.on("click", getData); // Displays Data when pressed
   // clearLink.on("click", clearLocal); // Clears Data when pressed

    // ******************* Functions ********************


 


    //******** Set Radio for Edit *********
    var setRadio = function (myRadio) {
        if (myRadio === 'Chinese') {
            console.log("Picked Chinese");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        } else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Spanish') {
            console.log("Picked Spanish");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        } else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Indian') {
            console.log("Picked Indian");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        } else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'American') {
            console.log("Picked American");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        } else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Italian') {
            console.log("Picked Italian");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        } else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

        if (myRadio === 'Other') {
            console.log("Picked Other");
            $('input:radio[name=crave]:nth(0)').attr('checked', true);
            $('input:radio[name=crave]').checkboxradio("refresh");
        } else {
            $('input:radio[name=crave]')[1].checked = true;
            $('input:radio[name=crave]').checkboxradio("refresh");
        }

    };

    


    var setCheckBoxes = function (myBox) {
        console.log("box is: " + myBox);
        if (myBox === "Yes") {
            $('input[name=favorite]nth(0)').attr('checked', true);
            $('input[name=favorite]').checkboxradio("refresh");
        }
    };


});






var storeData = function (key) {

	//************ Get Check Box Value ************

    var getCheckBoxValue = function () {
        console.log("Selected");
        console.log($('input:checkbox[name=favorite]:checked').val());

        if ($('input:checkbox[name=favorite]:checked').val() === "Yes") {
            return ($('input:checkbox[name=favorite]:checked').val());
        } else {
            return ("No");
        }
    };


	// ******* Get Radio Function
	var getRadio = function () {
        console.log($('input:radio[name=crave]:checked').val());
        return ($('input:radio[name=crave]:checked').val());
    };

	var oForm = $('#form');
    oForm.validate();
    if (oForm.valid()) {
        console.log("Save the order");
        var id = Math.floor(Math.random() * 9999999);

        var item = {
            '_id': 'order:' + id
        };

        item.name = ["Name: " + ($('#name').val())];
        //item.email = ["Email: ", ($('#email').val())];
        item.age = ["Age: " + ($('#age').val())];
        item.crave = ["Craving: " + getRadio()];
        item.fav = ["Favorite? :" + getCheckBoxValue()];
        item.hunger = ["How Hungry: " + ($('#hungry').val())];
        item.date = ["Date:" + ($('#date').val())];
        item.select = ["Where: " + ($('#select').val())];
        item.comment = ["Instructions: " + ($('#instructions').val())];
		
		
		
        $.couch.db('asdproject').saveDoc(item, {
            success: function (data) {
                console.log(status);
                $.mobile.changePage('#dataPage');
            } //close success
        }); //close couch call
    }
    alert("Order Saved");
};
