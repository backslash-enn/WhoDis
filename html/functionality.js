var contactlist = [
    {name: "Cat", number: "(786) 009 - 2089", email: "familyfriendly@ottmail.com", color: "pink", address: "4321 Waterbay Creek", notes: "", favorite: true, contact_id: 1000},
    {name: "Otty Osbourne", number: "(904) 607 - 3083", email: "otty@yahoo.com", color: "red", address: "1234 The Street", notes: "Will die for his guitar. Owes me $5", favorite: false, contact_id: 1001},
    {name: "Time Arrow", number: "(000) 000 - 1994", email: "test@gmail.com", color: "orange", address: "1234 The Street", notes: 'Was kidnapped and is now being forced to say nice things about Apple', favorite: false, contact_id: 1002},
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false, contact_id: 1003},
    {name: "Uri", number: "(123) 123 - 1234", email: "ok@fuby.com", color: "blue", address: "1234 The Street", notes: 'Wishes he had more time on the last test. Might drop out and sell crack. Apparently it pays pretty well.', favorite: true, contact_id: 1004}
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false, contact_id: 1005},
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false, contact_id: 1006}
]
//<script language="javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.1.min.js"></script>

    var right_panel;
    var contactitemtemplate;
    var contactletterdivtemplate;
    var itemlist;

    var search_box;
    var left_panel;
    var left_panel_cover;
    var login_panel;
    var login_form;
    var register_form;
    var contact_details;
    var welcome_msg;
    var fav_button;
    var save_button;
    var login_tab;
    var register_tab;
    var popup;

    var name_detail;
    var phone_detail;
    var email_detail;
    var address_detail;
    var color_detail;
    var birthday_detail;
    var notes_detail;
    var contact_id_detail;

    var favoritesOnly = false;
    var firstLogin = true;
    var jsonObject2;
    var loggedIn = false;
    var currentLoginTab = "";

// Don't do certain things until the DOM has finished loading
document.addEventListener("DOMContentLoaded", function(event) { 

    right_panel = document.getElementById('rightpanel');
    search_box = document.getElementById("searchbox");
    contactitemtemplate = document.getElementById("contactitemtemplate");
    contactletterdivtemplate = document.getElementById("contactletterdivtemplate");
    itemlist = document.getElementById("contactitemlist");
    
    left_panel = document.getElementById('leftpanel');
    login_panel = document.getElementById('login');
    login_form = document.getElementById('loginform');
    register_form = document.getElementById('registerform');    
    left_panel_cover = document.getElementById('leftpanelcover');
    contact_details = document.getElementById('contactdetails');
    fav_button = document.getElementById("favorites");
    save_button = document.getElementById("save");
    welcome_msg = document.getElementById('welcome');
    popup = document.getElementById("popup");
    left_panel = document.getElementById('leftpanel');
    welcome_msg = document.getElementById('welcome');

    name_detail = document.getElementById('name');
    phone_detail = document.getElementById('phone');
    email_detail = document.getElementById('email');
    address_detail = document.getElementById('address');
    color_detail = document.getElementById("color");
    birthday_detail = document.getElementById("birthday");
    notes_detail = document.getElementById('notes');
    contact_id_detail = document.getElementById('contact_id');


    login_tab = document.getElementById('logintab');
    register_tab = document.getElementById('registertab');

    changeLoginTab("login");
}, false);

function fetchContacts(){
//    var add2 = {name: "Dog", number: "(111) 119 - 0000", email: "owl@ottmail.com", color: "red", address: "not address", notes: "aa", favorite: false};
//    console.log(contactlist);
//    
////    contactlist.push(add2);
    var JSONPayload2 = '{ "search" : ""}';
        var url = "https://managerofcontacts.live/api/Search.php";
        var xhr2 = new XMLHttpRequest();
        xhr2.open("POST", url, true);
        xhr2.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
            xhr2.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                    {
                        jsonObject2 = JSON.parse( xhr2.responseText );
//                        console.log(jsonObject2);
                          for(i = 0; i < jsonObject2.results.length; i++)
                                {
                                    var add = {name: jsonObject2.results[i]["name"], number: jsonObject2.results[i]["phone_number"], email: jsonObject2.results[i]["email"], color: jsonObject2.results[i]["fav_color"], address: jsonObject2.results[i]["primary_street_addr"], notes: jsonObject2.results[i]["notes"], favorite: false, contact_id: jsonObject2.results[i]["contact_id"]};
                                    console.log(jsonObject2.results[i]["name"]);
                                    console.log(add);
                                    contactlist.push(add);
                                    console.log("here");
                                }
                    }
                
            }
            xhr2.send(JSONPayload2);
            
        }
        catch (err)
        {
//            document.getElementById("email").value = err.message;
            document.getElementById("email").value = "error while editing";
        }
    return true;
}
function changeLoginTab(newLoginTab) {
    if(newLoginTab == currentLoginTab) {
        return;
    }

    currentLoginTab = newLoginTab;

    login_form.style.animation = 'none';
    login_form.offsetHeight;
    register_form.style.animation = 'none';
    register_form.offsetHeight;
    

    if(currentLoginTab == "login") {
        login_tab.style.borderColor = "#ffe760";
        register_tab.style.borderColor = "#232323";
        login_form.style.animation = "loginform-in .4s forwards";
        if(firstLogin == false) {
            register_form.style.animation = "registerform-out .4s forwards";
        }
        else{
            firstLogin = false;
        }
    }
    else {
        login_tab.style.borderColor = "#232323";
        register_tab.style.borderColor = "#ffe760";
        login_form.style.animation = "loginform-out .4s forwards";
        register_form.style.animation = "registerform-in .4s forwards";
    }
}

function getLoggedIn() {
    login_panel.style.display = "none";
    welcome_msg.style.display = "block";
    right_panel.style.display = "initial";

    // LOAD CONTACTS FROM DATABASE 

    displayContacts("");
}

async function displayContacts(searchString) {
    
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 350)
    });
    if(!fetchContacts()){
        console.log("fakse");
    }
    else{
        console.log("true");
    }
    let result = await promise;
//    alert(result);
    
    while (itemlist.firstChild) {
        itemlist.removeChild(itemlist.firstChild);
    }

    let lastChar = 'A';
    let currentChar = 'A';

    for(let i = 0; i < contactlist.length; i++) {
        if(searchString.length > 0) {
            let lowerCaseSearchString = searchString.toLowerCase();
            if(!contactlist[i].name.toLowerCase().includes(lowerCaseSearchString) &&
               !contactlist[i].number.toLowerCase().includes(lowerCaseSearchString) &&
               !contactlist[i].email.toLowerCase().includes(lowerCaseSearchString) &&
               !contactlist[i].address.toLowerCase().includes(lowerCaseSearchString) &&
               !contactlist[i].notes.toLowerCase().includes(lowerCaseSearchString)) 
               { continue };
        }

        if(favoritesOnly == true && contactlist[i].favorite == false) {
            continue;
        }

        let clon = contactitemtemplate.content.cloneNode(true);
        clon.children[0].children[0].innerHTML = `${contactlist[i].name}<br><span>${contactlist[i].number}</span>`;
        clon.children[0].children[0].style.backgroundColor = contactlist[i].color;
        clon.children[0].children[0].style.color = contactlist[i].color;
        clon.children[0].id = i;
        if(contactlist[i].favorite == true) {
            clon.children[0].children[2].style.backgroundImage = 'url("img/favoriteiconpink.png")'; 
        }

        currentChar = contactlist[i].name[0].toUpperCase();
        if(lastChar != currentChar) {
            let clon2 = contactletterdivtemplate.content.cloneNode(true);
            clon2.children[0].children[0].innerHTML = currentChar;
            itemlist.append(clon2);
            lastChar = currentChar;
        }

        itemlist.appendChild(clon);
    }
}

function toggleFavoritesOnly(searchString) {
    favoritesOnly = !favoritesOnly;
    fav_button.style.boxShadow = (
        favoritesOnly == true ? 
        "0 0 5px 2px #5da4e1" : 
        "0 0 4px -1px #040404");

    displayContacts(searchString);
}

function displayContactInfo(b){

    let i = b.parentNode.id;

    // Animate in
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;
    
    left_panel.style.animation = "swap-leftpanel-slide .4s forwards";

    setTimeout(function() {
        contact_details.style.display = "block";
        welcome_msg.style.display = "none";

        name_detail.value = contactlist[i].name;
        phone_detail.value = contactlist[i].number;
        email_detail.value = contactlist[i].email;
        address_detail.value = contactlist[i].address;
        notes_detail.value = contactlist[i].notes;
        contact_id_detail.value = contactlist[i].contact_id;
        

        //scaleFontSize('name contact_detailsitem');
    }, 100); 
}

function select_fav(b) {
    let i = b.parentNode.id; 

    contactlist[i].favorite = !contactlist[i].favorite;
    b.style.backgroundImage = 
        contactlist[i].favorite ?
        'url("img/favoriteiconpink.png")' :
        'url("img/favoriteiconyellow.png")';
}

function displayWelcomePanel(b) {
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;

    left_panel.style.animation = "swap-leftpanel-slide .4s forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    setTimeout(function() {
        contact_details.style.display = "none";
        welcome_msg.style.display = "block";
    }, 100);
}

function deletecontactinfo(b){
    if (b.id == "deleteicon") {
        left_panel_cover.style.display = "initial";
        left_panel_cover.style.opacity = "0.8";
        popup.style.display = "block";

        popup.style.animation = 'none';
        left_panel.offsetHeight;
        
        popup.style.animation = "popup-grace-the-room-with-its-presence .4s forwards";
        popup.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";
    }
    else if (b.id == "abort") {
        popup.style.display = "none";
        left_panel_cover.style.display = "none";
        left_panel_cover.style.opacity = "0";
    }
    else if (b.id == "yes") {
        setTimeout("location.reload(true);", 250);
    }

}

function editcontactinfo(){

    var editmode = notes_detail.disabled;
    
    if (editmode){
        phone_detail.disabled = false;
        email_detail.disabled = false;
        address_detail.disabled = false;
        color_detail.disabled = false;
        birthday_detail.disabled = false;
        name_detail.disabled = false;
        notes_detail.disabled = false;
    }
    else{        
        console.log("cc: " + contact_id_detail.value);
        var JSONPayload = '{ "name" : "' + name_detail.value + 
                          '", "fav_color" : "' + color_detail.value + 
                          '", "notes" : "' + notes_detail.value + 
                          '", "email" : "' + email_detail.value + 
                          '", "primary_street_addr" : "' + address_detail.value + '", "phone_number" : "' + phone_detail.value + 
                          '", "birthday" : "' + birthday_detail.value +
                          '", "favorite" : "1", "contact_id" : "' + contact_id_detail.value + '" }';
        var url = "https://managerofcontacts.live/api/Edit.php";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
            
//            xhr.send(JSONPayload);
//            document.getElementById("address").value = "ttt";
//            var jsonObject = JSON.parse( xhr.responseText );
//            email_detail.value = "aaa";
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                    {
                        //set some success message
//                        document.getElementById("email").value = "bb";
                        var jsonObject = JSON.parse( xhr.responseText );
//                        email_detail.value = "aa";
                        console.log(jsonObject);
                    }
            }
            xhr.send(JSONPayload);
            
        }
        catch (err)
        {
            email_detail.value = "errow while diting";
        }
        
        name_detail.disabled = true;
        phone_detail.disabled = true;
        email_detail.disabled = true;
        address_detail.disabled = true;
        color_detail.disabled = true;
        birthday_detail.disabled = true;
        notes_detail.disabled = true;
        save_button.disabled = false;
    }

}

function savecontactinfo(){
        name_detail.disabled = true;
        phone_detail.disabled = true;
        email_detail.disabled = true;
        address_detail.disabled = true;
        color_detail.disabled = true;
        birthday_detail.disabled = true;
        notes_detail.disabled = true;

        //testing
        var JSONPayload = '{ "name" : "' + name_detail.value + 
                              '", "fav_color" : "' + color_detail.value + 
                              '", "notes" : "' + notes_detail.value + 
                              '", "email" : "' + email_detail.value + 
                              '", "primary_street_addr" : "' +address_detail.value+ '", "phone_number" : "' + phone_detail.value + 
                              '", "birthday" : "' + birthday_detail.value +'", "favorite" : "0"}';
            var url = "https://managerofcontacts.live/api/Create.php";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

            try {

    //            xhr.send(JSONPayload);
    //            document.getElementById("address").value = "ttt";
    //            var jsonObject = JSON.parse( xhr.responseText );
    //            email_detail.value = "aaa";
                xhr.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status == 200)
                        {
                            //set some success message
    //                        document.getElementById("email").value = "bb";
                            var jsonObject = JSON.parse( xhr.responseText );
    //                        email_detail.value = "aa";
                            console.log(jsonObject);
                        }
                }
                xhr.send(JSONPayload);

            }
            catch (err)
            {
                email_detail.value = "error while creating contact";
            }

        var new_contact = {
            name: "", 
            number: "", 
            email: "", 
            color: "", 
            address: "", 
            notes: "", 
            birthday: "",
            favorite: false,
            contact_id: ""
        };

        new_contact.name = document.getElementById("name").value;
        new_contact.number = document.getElementById("phone").value;
        new_contact.email = document.getElementById("email").value;
        new_contact.address = document.getElementById("address").value;
        new_contact.color = document.getElementById("color").value;
        new_contact.birthday = document.getElementById("birthday").value;
        new_contact.notes = document.getElementById("notes").value;
        new_contact.contact_id = document.getElementById("contact_id").value;
        
        name_detail.value = new_contact.name;
        phone_detail.value = new_contact.number;
        email_detail.value = new_contact.email;
        address_detail.value = new_contact.address;
        color_detail.value = new_contact.color;
        birthday_detail.value = new_contact.birthday;        
        notes_detail.value = new_contact.notes;
        contact_id_detail.value = new_contact.contact_id;

        console.log("name = " + name_detail.value);
        console.log("phone = " + phone_detail.value);
        console.log("email = " + email_detail.value);
        console.log("address = " + address_detail.value);
        console.log("fav color = " + color_detail.value);
        console.log("birthday = " + birthday_detail.value); 
        console.log("notes = " + notes_detail.value);
        console.log("cotact_id = " + contact_id_detail.value);

        contactlist.push(new_contact);
        contactlist.sort(compare);
        save_button.style.display = "none";
        displayContacts("");
        search_box.value = "";

        left_panel_cover.style.display = "none";
        left_panel_cover.style.opacity = "0";
        left_panel.style.zIndex = "7";
}

function compare(a, b) {
    return a.name.localeCompare(b.name);
}

function addcontactinfo() {
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;
    contact_details.style.display = "none";
    document.getElementById("welcome").style.display = "none";
    left_panel_cover.style.display = "initial";
    left_panel_cover.style.opacity = "0.8";
    left_panel.style.zIndex = "8";

    left_panel.style.animation = "swap-leftpanel-slide .4s forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    document.getElementById('welcome').style.display = "none"; 

    name_detail.value = "";
    phone_detail.value = "";
    email_detail.value = "";
    address_detail.value = "";
    birthday_detail.value = "";        
    notes_detail.value = "";
    contact_id_detail.value = "";

    setTimeout(function() {
        contact_details.style.display = "initial";
    }, 100);   

    name_detail.disabled = false;
    phone_detail.disabled = false;
    email_detail.disabled = false;
    address_detail.disabled = false;
    color_detail.disabled = false;
    birthday_detail.disabled = false;
    notes_detail.disabled = false;
    //disable the right panel so changes can not be made to other contacts 
    //change visibility of the save btn to true 
    //pls do these 


    
    save_button.style.display = 'block';
   /*
    document.getElementById("rightpanel").disabled = true;*/

    console.log("hello");

    document.getElementById("rightpanel").disabled = true;    */
    setTimeout(function() {
        contact_details.style.display = "initial";
        name_detail.defaultValue;
        phone_detail.defaultValue;
        email_detail.defaultValue;
        address_detail.defaultValue;
        birthday_detail.defaultValue;        
        notes_detail.defaultValue;

    }, 100);    
}