var contactlist = [
    {name: "Cat", number: "(786) 009 - 2089", email: "familyfriendly@ottmail.com", color: "pink", address: "4321 Waterbay Creek", notes: "", favorite: true},
    {name: "Otty Osbourne", number: "(904) 607 - 3083", email: "otty@yahoo.com", color: "red", address: "1234 The Street", notes: "Will die for his guitar. Owes me $5", favorite: false},
    {name: "Time Arrow", number: "(000) 000 - 1994", email: "test@gmail.com", color: "orange", address: "1234 The Street", notes: 'Was kidnapped and is now being forced to say nice things about Apple', favorite: false},
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false},
    {name: "Uri", number: "(123) 123 - 1234", email: "ok@fuby.com", color: "blue", address: "1234 The Street", notes: 'Wishes he had more time on the last test. Might drop out and sell crack. Apparently it pays pretty well.', favorite: true}
]
//<script language="javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.1.min.js"></script>

    var search_box;
    var contactitemtemplate;
    var contactletterdivtemplate;
    var itemlist;

    var left_panel;
    var left_panel_cover;
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

    var favoritesOnly = false;
    var loggedIn = false;
    var currentLoginTab = "";

// Don't do certain things until the DOM has finished loading
document.addEventListener("DOMContentLoaded", function(event) { 
    search_box = document.getElementById("searchbox");
    contactitemtemplate = document.getElementById("contactitemtemplate");
    contactletterdivtemplate = document.getElementById("contactletterdivtemplate");
    itemlist = document.getElementById("contactitemlist");
    
    left_panel = document.getElementById('leftpanel');
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


    //login_tab = document.getElementById('logintab');
    //register_tab = document.getElementById('registertab');

    displayContacts("");
    //changeLoginTab("login");
}, false);

function changeLoginTab(newLoginTab) {
    if(newLoginTab == currentLoginTab) {
        return;
    }

    currentLoginTab = newLoginTab;

    if(currentLoginTab == "login") {
        login_tab.style.borderColor = "#ffe760";
        register_tab.style.borderColor = "#232323";
    }
    else {
        login_tab.style.borderColor = "#232323";
        register_tab.style.borderColor = "#ffe760";
    }
}

function displayContacts(searchString) {
        
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
            clon.children[0].children[2].style.display = "initial";
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
    
    left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    setTimeout(function() {
        contact_details.style.display = "block";
        welcome_msg.style.display = "none";

        name_detail.value = contactlist[i].name;
        phone_detail.value = contactlist[i].number;
        email_detail.value = contactlist[i].email;
        address_detail.value = contactlist[i].address;
        notes_detail.value = contactlist[i].notes;

        //scaleFontSize('name contact_detailsitem');
    }, 100); 
}

function scaleFontSize(element) {
    var container = document.getElementById(element)

    container.style.fontSize = "100%"; 

    if (container.scrollWidth > container.clientWidth)
        container.style.fontSize = "%70"; 
}

function displayWelcomePanel(b) {
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;

    left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
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
        
        popup.style.animation = "popup-grace-the-room-with-its-presence .4s linear forwards";
        popup.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";
    }
    else if (b.id == "abort") {
        popup.style.display = "none";
        left_panel_cover.style.display = "none";
        left_panel_cover.style.opacity = "0";
    }
    else if (b.id == "yes") {
        setTimeout("location.reload(true);", 100);
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
        var JSONPayload = '{ "name" : "' + name_detail.value + 
                          '", "fav_color" : "' + color_detail.value + 
                          '", "notes" : "' + notes_detail.value + 
                          '", "primary_street_addr" : "", "phone_number" : "' + phone_detail.value + 
                          '", "birthday" : "2019-10-1", "favorite" : "1", "contact_id" : "12" }';

        var url = "https://managerofcontacts.live/api/Edit.php";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
            
//            xhr.send(JSONPayload);
            address_detail.value = "ttt";
//            var jsonObject = JSON.parse( xhr.responseText );
//            email_detail.value = "aaa";
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                    {
                        email_detail.value = "bb";
                        var jsonObject = JSON.parse( xhr.responseText );
//                        email_detail.value = xhr.responseText;
                    }
            }
            xhr.send(JSONPayload);
            
        }
        catch (err)
        {
//            email_detail.value = err.message;
            email_detail.value = "cc";
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

        var new_contact = {
            name: "", 
            number: "", 
            email: "", 
            color: "", 
            address: "", 
            notes: "", 
            birthday: "",
            favorite: false
        };

        new_contact.name = document.getElementById("name").value;
        new_contact.number = document.getElementById("phone").value;
        new_contact.email = document.getElementById("email").value;
        new_contact.address = document.getElementById("address").value;
        new_contact.color = document.getElementById("color").value;
        new_contact.birthday = document.getElementById("birthday").value;
        new_contact.notes = document.getElementById("notes").value;
        
        name_detail.value = new_contact.name;
        phone_detail.value = new_contact.number;
        email_detail.value = new_contact.email;
        address_detail.value = new_contact.address;
        color_detail.value = new_contact.color;
        birthday_detail.value = new_contact.birthday;        
        notes_detail.value = new_contact.notes;

        console.log("name = " + name_detail.value);
        console.log("phone = " + phone_detail.value);
        console.log("email = " + email_detail.value);
        console.log("address = " + address_detail.value);
        console.log("fav color = " + color_detail.value);
        console.log("birthday = " + birthday_detail.value); 
        console.log("notes = " + notes_detail.value);

        contactlist.push(new_contact);
        contactlist.sort(compare);
        save_button.style.display = "none";
        displayContacts("");
        search_box.value = "";
}

function compare(a, b) {
    return a.name.localeCompare(b.name);
}

function addcontactinfo() {
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;

    left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    name_detail.value = "";
    phone_detail.value = "";
    email_detail.value = "";
    address_detail.value = "";
    birthday_detail.value = "";        
    notes_detail.value = "";

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
    document.getElementById("rightpanel").disabled = true;    */
    console.log("hello");
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