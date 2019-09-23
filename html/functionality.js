//contactlist[lastClicked].contact_id

let contactlist = [
    {name: "Cat", number: "(786) 009 - 2089", email: "familyfriendly@ottmail.com", color: "Pink", address: "4321 Waterbay Creek", notes: "", favorite: true, contact_id: 1000, birthday: "10/3", pp_index: 0},
    {name: "Otty Osbourne", number: "(904) 607 - 3083", email: "otty@yahoo.com", color: "Red", address: "1234 The Street", notes: "Will die for his guitar. Owes me $5", favorite: false, contact_id: 1001, birthday: "9/2", pp_index: 0},
    {name: "Time Arrow", number: "(000) 000 - 1994", email: "test@gmail.com", color: "Orange", address: "1234 The Street", notes: 'Was kidnapped and is now being forced to say nice things about Apple', favorite: false, contact_id: 1002, birthday: "10/10", pp_index: 0},
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "Yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false, contact_id: 1003, birthday: "9/27", pp_index: 0},
    {name: "Uri", number: "(123) 123 - 1234", email: "ok@fuby.com", color: "Blue", address: "1234 The Street", notes: 'Wishes he had more time on the last test. Might drop out and sell crack. Apparently it pays pretty well.', favorite: true, contact_id: 1004, birthday: "", pp_index: 0},
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "Yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false, contact_id: 1005, birthday: "", pp_index: 0},
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "Yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false, contact_id: 1006, birthday: "", pp_index: 0}
]

    let myvar = localStorage.getItem("user_id_val");
    let name = localStorage.getItem("name_val");
    var right_panel;
    var contactitemtemplate;
    var contactletterdivtemplate;
    var itemlist;
    var seenContacts = new Set();

    var search_box;
    var left_panel;
    var left_panel_cover;
    var login_panel;
    var login_form;
    var register_form;
    var contact_details;
    var welcome_msg;
    var welcome_name;
    var fav_button;
    var edit_button;
    var cancel_button;
    var save_button;
    var delete_button;
    var login_tab;
    var register_tab;

    var pp_editbutton;
    var pp_detail;
    var name_detail;
    var phone_detail;
    var email_detail;
    var address_detail;
    var color_detail;
    var birthday_detail;
    var birthday_dd_detail;
    var birthday_mm_detail;
    var notes_detail;

    var favoritesOnly = false;
    var firstLogin = true;
    var jsonObject2;
    var loggedIn = false;
    var currentLoginTab = "";
    var currentlyEditing = false;

    var popup;
    var delete_contact_popup;
    var choose_pp_popup;
    var current_pp;
    var generic_message_popup;
    var generic_message;

    var lastClicked;
    var ppIndex = 0;

// Don't do certain things until the DOM has finished loading
document.addEventListener("DOMContentLoaded", function(event) { 
    // Get document elements
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
    edit_button = document.getElementById("edit");
    cancel_button = document.getElementById("cancel");
    save_button = document.getElementById("save");
    delete_button = document.getElementById("delete");
    welcome_msg = document.getElementById('welcome');
    welcome_name = document.getElementById('welcomename');
    left_panel = document.getElementById('leftpanel');
    welcome_msg = document.getElementById('welcome');

    pp_editbutton = document.getElementById('ppeditbutton');
    pp_detail = document.getElementById('pp');
    name_detail = document.getElementById('name');
    phone_detail = document.getElementById('phone');
    email_detail = document.getElementById('email');
    address_detail = document.getElementById('address');
    color_detail = document.getElementById("color");
    birthday_dd_detail = document.getElementById("birthday_dd");
    birthday_mm_detail = document.getElementById("birthday_mm");
    notes_detail = document.getElementById('notes');

    login_tab = document.getElementById('logintab');
    register_tab = document.getElementById('registertab');

    popup = document.getElementById("popup");
    delete_contact_popup = document.getElementById("deletecontactpopup");
    choose_pp_popup = document.getElementById("choosepppopup");
    current_pp = document.getElementById("currentpp");
    generic_message_popup = document.getElementById("genericmessagepopup");
    generic_message = document.getElementById("genericmessage");

    // This responsive design function is called every time the screen is resized, but must also be called initially
    adaptToScreen();

    // Initialize login page
    changeLoginTab("login");
    if(myvar != '' && myvar != "" && myvar != -1 && myvar != "-1" && myvar != null){
        login_panel.style.display = "none";
        welcome_msg.style.display = "block";
        right_panel.style.display = "initial";


        welcome_name.innerHTML = name;
//        contactlist.sort(compare);
        displayContacts("");
    }
    
}, false);

function fetchContacts(){
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
                          for(i = 0; i < jsonObject2.results.length; i++)
                                {
                                    var fav_db = jsonObject2.results[i]["favorite"];
                                    var fav = false;
                                    if(fav_db == 0){
                                        fav = false;
                                    }
                                    else{
                                        fav = true;
                                    }
//                                    console.log(jsonObject2.results[i]["name"]);
//                                    console.log(add);
                                    var add = {name: jsonObject2.results[i]["name"], number: jsonObject2.results[i]["phone_number"], email: jsonObject2.results[i]["email"], color: jsonObject2.results[i]["fav_color"], address: jsonObject2.results[i]["primary_street_addr"], notes: jsonObject2.results[i]["notes"], favorite: fav, contact_id: jsonObject2.results[i]["contact_id"], birthday: jsonObject2.results[i]["birthday"], pp_index: jsonObject2.results[i]["pp_index"]};
                                    contactlist.push(add);
//                                    console.log("fetch");
//                                    console.log(add);
                                }
                    }
                
            }
            xhr2.send(JSONPayload2);
            
        }
        catch (err)
        {
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
    var username_login = document.getElementById("username_login");
    var password_login = document.getElementById("password_login");
    var error;
    var JSONPayload =            '{ "username" : "' + username_login.value + 
                                '", "password" : "' +  password_login.value + '"}';
            var url = "https://managerofcontacts.live/api/Login.php";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
    try {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
                {
                    var jsonObject = JSON.parse( xhr.responseText );
//                            console.log("login log: ");
//                            console.log(jsonObject);
                    error = jsonObject.error;
                    if(error === "No records found" || error === "Failure"){
                        openPopup("Invalid credentials. Please try again.")
                    }
                    else{
                        document.getElementById("password_login").value = "";
                        myvar = 15;
                        name = jsonObject.name;
                        localStorage.setItem("user_id_val", myvar);
                        localStorage.setItem("name_val", name);
                        login_panel.style.display = "none";
                        welcome_msg.style.display = "block";
                        right_panel.style.display = "initial";


                        welcome_name.innerHTML = name;
//                        contactlist.sort(compare);
                        displayContacts("");
                    }

                }
        }
        xhr.send(JSONPayload);
    }
    catch (err)
    {
        email_detail.value = "error while creating contact";
    }

    getUpcomingBirthdays();
}

function getRegistered() {
    var username_register = document.getElementById("username_register");
    var password_register = document.getElementById("password_register");
    var name_register = document.getElementById("name_register")
    
    if((username_register.value != "" && username_register.value != " " && username_register.value !== "" && username_register.value) && 
       (password_register.value != "" && password_register.value != " " && password_register.value !== "" && password_register.value) && 
       (name_register.value != "" && name_register.value != " " && name_register.value !== "" && name_register.value)) {

            var JSONPayload =            '{ "username" : "' + username_register.value + 
                                        '", "password" : "' +  password_register.value + 
                                        '", "name" : "' + name_register.value + '"}';
                    var url = "https://managerofcontacts.live/api/Add.php";
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

            try {
                xhr.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status == 200)
                        {
                            var jsonObject = JSON.parse( xhr.responseText );
//                            console.log("logout log: ");
//                            console.log(jsonObject);
                            var error = jsonObject.error;
                            if(error === "Username already in use." || error === "Unable to add user."){
                                openPopup(error + " Please try again.");
                            }
                            else{
                                openPopup("Regristration Successful! Please Login!");
                                setTimeout("location.reload(true);", 1500);
                            }
                        }
                }
                xhr.send(JSONPayload);
            }
            catch (err)
            {
                email_detail.value = "error while creating contact";
            }
    }
    else
    {
        openPopup("Registration failed. One of the fields does not have a valid input!");
    }
}

function getLoggedOut() {

    var JSONPayload = '{"message" : "sent"}';
    var url = "https://managerofcontacts.live/api/Logout.php";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
                {
                    var jsonObject = JSON.parse( xhr.responseText );
//                            console.log("logout log: ");
//                            console.log(jsonObject);
                    localStorage.setItem("user_id_val", -1);
                    localStorage.setItem("name_val", "");
                }
        }
        xhr.send(JSONPayload);
    }
    catch (err)
    {
        email_detail.value = "error while creating contact";
    }
    name = "";
    user_id = -1;
    login_panel.style.display = "initial";
    welcome_msg.style.display = "none";
    right_panel.style.display = "none";

    contactlist = [];
    displayContacts("");
}

async function displayContacts(searchString) {
    contactlist = [];
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 750)
    });
    fetchContacts();
    let result = await promise;
    getUpcomingBirthdays();
    while (itemlist.firstChild) {
        itemlist.removeChild(itemlist.firstChild);
    }
    contactlist.sort(compare);
    let lastChar = '@';
    let currentChar = '@';

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
        clon.children[0].children[1].src = "img/ppics/pp-" + contactlist[i].pp_index.toString() + ".jpg";
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

        if(!seenContacts.has(contactlist[i].contact_id)) {
            seenContacts.add(contactlist[i].contact_id);
            lastClicked = i;
        }
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
    lastClicked = i;

    // Animate in
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;
    
    left_panel.style.animation = "swap-leftpanel-slide .4s forwards";

    setTimeout(function() {
        contact_details.style.display = "block";
        welcome_msg.style.display = "none";

        console.log("PLEASE PLEASE PLEASE one last thing");
        console.log(i);


        pp_detail.src = "img/ppics/pp-" + contactlist[i].pp_index.toString() + ".jpg"; 
        name_detail.value = contactlist[i].name;
        phone_detail.value = contactlist[i].number;
        email_detail.value = contactlist[i].email;
        address_detail.value = contactlist[i].address;
        notes_detail.value = contactlist[i].notes;
        color_detail.value = contactlist[i].color;

        var slash = contactlist[i].birthday.indexOf("/");

        if(slash == -1)
            return;

        var length = contactlist[i].birthday.length;

        birthday_mm_detail.value = (contactlist[i].birthday.substring(0,slash));
        birthday_dd_detail.value = (contactlist[i].birthday.substring(slash + 1, length));
        if(birthday_mm_detail.value.length == 1)
        birthday_mm_detail.value = "0" + birthday_mm_detail.value;
        if(birthday_dd_detail.value.length == 1)
            birthday_dd_detail.value = "0" + birthday_dd_detail.value;
    }, 100); 
}

function select_fav(b) {
    let i = b.parentNode.id; 

    contactlist[i].favorite = !contactlist[i].favorite;

    if(contactlist[i].favorite == true)
    {
        b.style.backgroundImage =  'url("img/favoriteiconpink.png")';
        var JSONPayload = '{ "favorite" : "1", "contact_id" : "' + contactlist[i].contact_id + '"}';
//        console.log("contact id IS: " + contactlist[i].contact_id);
        var url = "https://managerofcontacts.live/api/Favorite.php";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                    {
                        var jsonObject = JSON.parse( xhr.responseText );
//                        console.log("favorite log: ");
//                        console.log(jsonObject);
                    }
            }
            xhr.send(JSONPayload);
        }
        catch (err)
        {
            email_detail.value = "error while favoriting";
        }
    }
    else
    {
        b.style.backgroundImage =  'url("img/favoriteiconyellow.png")';
        var JSONPayload = '{ "favorite" : "0", "contact_id" : "' + contactlist[i].contact_id+ '"}';
        var url = "https://managerofcontacts.live/api/Favorite.php";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                    {
                        var jsonObject = JSON.parse( xhr.responseText );
//                        console.log("favorite log: ");
//                        console.log(jsonObject);
                    }
            }
            xhr.send(JSONPayload);
        }
        catch (err)
        {
            email_detail.value = "error while favoriting";
        } 
    }
}

function displayWelcomePanel(b) {
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;

    left_panel.style.animation = "swap-leftpanel-slide .4s forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    setTimeout(function() {
        contact_details.style.display = "none";
        welcome_msg.style.display = "block";
        getUpcomingBirthdays();
    }, 100);
}

function deletecontactinfo(b){
    if (b.id == "delete") {
        openPopup("deletecontactpopup");
    }
    else if (b.id == "abort") {
        closePopup();
    }
    else if (b.id == "yes") {

        var JSONPayload = '{ "contact_id" : "' + contactlist[lastClicked].contact_id + '"}';
        var url = "https://managerofcontacts.live/api/Delete.php";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                    {
                        var jsonObject = JSON.parse( xhr.responseText );
//                        console.log("delete log: ");
//                        console.log(jsonObject);
                    }
            }
            xhr.send(JSONPayload);
        }
        catch (err)
        {
            email_detail.value = "error while deleting";
        }

        setTimeout("location.reload(true);", 250);
    }

}

function canceledit(){
    if (lastClicked === -1){
        // cancel editing for a new contact
        // does not create new contact, and instead goes to welcome page
        left_panel.style.animation = 'none';
        left_panel.offsetHeight;

        contact_details.style.display = "none";
        left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
        left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

        document.getElementById('name_errormsg').style.display = 'none';
        document.getElementById('phone_errormsg').style.display = 'none'; 

        setTimeout(function() {
            welcome_msg.style.display = "block";
            getUpcomingBirthdays();
        }, 100);   
        
    }
    else {
        document.getElementById('name_errormsg').style.display = 'none';
        document.getElementById('phone_errormsg').style.display = 'none'; 
        // cancel editing for an existing contact
        name_detail.value = contactlist[lastClicked].name;
        phone_detail.value = contactlist[lastClicked].number;
        email_detail.value = contactlist[lastClicked].email;
        address_detail.value = contactlist[lastClicked].address;
        color_detail.value = contactlist[lastClicked].color;
        notes_detail.value = contactlist[lastClicked].notes;

        var slash = contactlist[lastClicked].birthday.indexOf("/");

        var length = contactlist[lastClicked].birthday.length;

        birthday_mm_detail.value = (contactlist[lastClicked].birthday.substring(0,slash));
        birthday_dd_detail.value = (contactlist[lastClicked].birthday.substring(slash + 1, length));
        if(birthday_mm_detail.value.length == 1)
        birthday_mm_detail.value = "0" + birthday_mm_detail.value;
        if(birthday_dd_detail.value.length == 1)
            birthday_dd_detail.value = "0" + birthday_dd_detail.value;
    }

    //disables text fields, so user cannot keep editing them
    pp_editbutton.style.display = "none";
    name_detail.disabled = true;
    phone_detail.disabled = true;
    email_detail.disabled = true;
    address_detail.disabled = true;
    color_detail.disabled = true;
    birthday_dd_detail.disabled = true;
    birthday_mm_detail.disabled = true;
    notes_detail.disabled = true;
    save_button.disabled = false;

    currentlyEditing = false;

    //hide save and cancel buttons after user clicks cancel button
    save_button.style.display = "none";
    cancel_button.style.display = "none";

    //reveal edit and delete buttons after user clicks cancel button
    edit_button.style.display = "block";
    delete_button.style.display = "block";

    left_panel_cover.style.display = "none";
}

function editcontactinfo(){

    // animations
    var editmode = notes_detail.disabled;

    edit_button.style.display = 'none';
    delete_button.style.display = 'none';

    cancel_button.style.display = 'block';
    save_button.style.display = 'block';
    save_button.style.display = "block";

    //birthday_detail.style.display = 'block';

    left_panel_cover.style.display = "initial";
    left_panel_cover.style.opacity = "0.8";
    left_panel.style.zIndex = "8";

    left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";
    
    if (editmode){
        pp_editbutton.style.display = "initial";
        phone_detail.disabled = false;
        email_detail.disabled = false;
        address_detail.disabled = false;
        color_detail.disabled = false;
        birthday_dd_detail.disabled = false;
        birthday_mm_detail.disabled = false;
        name_detail.disabled = false;
        notes_detail.disabled = false;

        currentlyEditing = true;

        //reveals placeholders when editing
        name_detail.placeholder = "Name";
        phone_detail.placeholder = "(XXX) XXX - XXXX";
        email_detail.placeholder = "Otty@Otmail.com";
        address_detail.placeholder = "1234 The Address";
        birthday_mm_detail.placeholder = "MM"
        birthday_dd_detail.placeholder = "DD"
    }
    else{
        name_detail.disabled = true;
        phone_detail.disabled = true;
        email_detail.disabled = true;
        address_detail.disabled = true;
        color_detail.disabled = true;
        birthday_dd_detail.disabled = true;
        birthday_mm_detail.disabled = true;
        notes_detail.disabled = true;
        save_button.disabled = false;

        currentlyEditing = false;
    }
}


function savecontactinfo(){
        if (lastClicked === -1)
        {
            // Save changes for a new Contact
            var name_taken = name_detail.value;
            var phone_taken = phone_detail.value;
            var error;
            if(name_taken != "" && name_taken != " " && name_taken !== "" && phone_taken != "" && phone_taken != " " && phone_taken !== "" && name_taken && phone_taken){
                var JSONPayload = '{ "name" : "' + name_detail.value + 
                                    '", "fav_color" : "' + color_detail.value + 
                                    '", "notes" : "' + notes_detail.value + 
                                    '", "email" : "' + email_detail.value +
                                    '", "primary_street_addr" : "'+address_detail.value+'", "phone_number" : "' + phone_detail.value + '", "birthday" : "' + birthday_detail +'", "favorite" : "0", "pp_index" : "' + ppIndex + '"}';
                var url = "https://managerofcontacts.live/api/Create.php";
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

                try {
                    xhr.onreadystatechange = function()
                    {
                        if (this.readyState == 4 && this.status == 200)
                            {
                                var jsonObject = JSON.parse( xhr.responseText );
//                            console.log("logout log: ");
//                            console.log(jsonObject);
                                error = jsonObject.error;

                                if(error === "User not logged in." || error === "Unable to create contact.")
                                {
                                    openPopup(error);
                                }
                            }
                    }
                    xhr.send(JSONPayload);
                }
                catch (err)
                {
                    email_detail.value = "error while creating contact";
                }

                if (name_detail.value !== "" && phone_detail.value !== "") {
                    pp_editbutton.style.display = "none";
                    name_detail.disabled = true;
                    phone_detail.disabled = true;
                    email_detail.disabled = true;
                    address_detail.disabled = true;
                    color_detail.disabled = true;
                    birthday_dd_detail.disabled = true;
                    birthday_mm_detail.disabled = true;
                    notes_detail.disabled = true;

                    currentlyEditing = false;

                    new_contact = {
                        name: "", 
                        number: "", 
                        email: "", 
                        color: "", 
                        address: "", 
                        notes: "", 
                        birthday: "",
                        contact_id: "",
                        favorite: false,
                        pp_index: 0
                    };
                    birthday_detail = birthday_mm_detail.value + "/" + birthday_dd_detail.value;

                    new_contact.name = name_detail.value;
                    new_contact.number = phone_detail.value;
                    new_contact.email = email_detail.value;
                    new_contact.address = address_detail.value;
                    new_contact.color = color_detail.value;
                    new_contact.birthday = birthday_detail;
                    new_contact.notes = notes_detail.value;
                    new_contact.pp_index = ppIndex;

                    //hide save and cancel buttons after user clicks save
                    save_button.style.display = "none";
                    cancel_button.style.display = "none";
                    document.getElementById('name_errormsg').style.display = 'none';
                    document.getElementById('phone_errormsg').style.display = 'none';

                    //reveal edit and delete buttons after user clicks save
                    edit_button.style.display = "block";
                    delete_button.style.display = "block";
                }
                else if (name_detail.value == "") {
                    document.getElementById('name_errormsg').style.display = 'block';
                    document.getElementById('phone_errormsg').style.display = 'none';            
                }
                else if (phone_detail.value == "") {
                    document.getElementById('name_errormsg').style.display = 'none';
                    document.getElementById('phone_errormsg').style.display = 'block'; 
                }
            }
            else {
                openPopup("Cannot leave phone or name field empty. Everyone has a name!");
            }
        }
        else {
            var error;
//            console.log("existing contact");
            // Save changes to an existing contact
            if (name_detail.value !== "" && phone_detail.value !== "") {
                pp_editbutton.style.display = "none";
                name_detail.disabled = true;
                phone_detail.disabled = true;
                email_detail.disabled = true;
                address_detail.disabled = true;
                color_detail.disabled = true;
                birthday_dd_detail.disabled = true;
                birthday_mm_detail.disabled = true;
                notes_detail.disabled = true;

                birthday_detail = birthday_mm_detail.value + "/" + birthday_dd_detail.value;

                currentlyEditing = false;


//                contactlist[lastClicked].name = name_detail.value;
//                contactlist[lastClicked].number = phone_detail.value;
//                contactlist[lastClicked].email = email_detail.value;
//                contactlist[lastClicked].address = address_detail.value;
//                contactlist[lastClicked].color = color_detail.value;
//                contactlist[lastClicked].birthday = birthday_detail;
//                contactlist[lastClicked].notes = notes_detail.value;
//                contactlist[lastClicked].pp_index = ppIndex;


                //birthday_detail.value = "1999-29-01";
//                console.log("birthday value after edit is: " + birthday_detail);
 
                //hide save and cancel buttons after user clicks save
                save_button.style.display = "none";
                cancel_button.style.display = "none";
                document.getElementById('name_errormsg').style.display = 'none';
                document.getElementById('phone_errormsg').style.display = 'none';

                //reveal edit and delete buttons after user clicks save
                edit_button.style.display = "block";
                delete_button.style.display = "block";

                 // Save changes for a new Contact
           var JSONPayload = '{ "name" : "' + name_detail.value + 
                          '", "fav_color" : "' + color_detail.value + 
                          '", "notes" : "' + notes_detail.value + 
                          '", "email" : "' + email_detail.value + 
                          '", "primary_street_addr" : "' + address_detail.value + '", "phone_number" : "' + phone_detail.value + 
                          '", "birthday" : "' + birthday_detail +
                          '", "favorite" : "1", "contact_id" : "' + contactlist[lastClicked].contact_id + '", "pp_index" : "' + ppIndex + '"}';
            var url = "https://managerofcontacts.live/api/Edit.php";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

            try {
                xhr.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status == 200)
                        {
                            var jsonObject = JSON.parse( xhr.responseText );
                            error = jsonObject.error;
//                            console.log("save log:");
//                            console.log(JSONPayload);

                            if(error === "User not logged in." || error === "Unable to edit contact.")
                                {
                                    left_panel_cover.style.display = "initial";
                                    left_panel_cover.style.opacity = "0.8";
                                    document.getElementById("deletemsg").textContent = error;
                                    document.getElementById("yes").textContent = "NO";
                                    document.getElementById("yes").style.visibility = "hidden";
                                    document.getElementById("yes").onclick = function() {deletecontactinfo(this);}
                                    document.getElementById("abort").textContent = "Try again";
                                    document.getElementById("abort").onclick = function() {deletecontactinfo(this);}
                                    openPopup(error);
                                }
                        
                        }
                }
                xhr.send(JSONPayload);
            }
            catch (err)
            {
                email_detail.value = "error while saving";
            }

            }
            else if (name_detail.value == "") {
                document.getElementById('name_errormsg').style.display = 'block'; 
                document.getElementById('phone_errormsg').style.display = 'none';                
            }
            else if (phone_detail.value == "") {
                document.getElementById('name_errormsg').style.display = 'none';
                document.getElementById('phone_errormsg').style.display = 'block'; 
            }
        }
        
        //hide placeholders if user does not input anything in the field
        if (email_detail.value === "")
            email_detail.placeholder = "";
        if (address_detail.value === "")
            address_detail.placeholder = "";
        if (color_detail.value === "")
            color_detail.placeholder = "";
        if (birthday_mm_detail.value === "" || birthday_dd_detail.value === ""){
            birthday_mm_detail.placeholder = "";
            birthday_dd_detail.placeholder = "";
        }

        //load right panel with updated contact list
//        contactlist.sort(compare);
        console.log("repopulating");
        displayContacts("");
        search_box.value = "";

        left_panel_cover.style.display = "none";
        left_panel_cover.style.opacity = "0";
        left_panel.style.zIndex = "7";
}

function addcontactinfo() {
    // animation
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;
    contact_details.style.display = "none";
    lastClicked = -1;

    document.getElementById("welcome").style.display = "none";
    document.getElementById("edit").style.display = "none";

    left_panel_cover.style.display = "initial";
    left_panel_cover.style.opacity = "0.8";
    left_panel.style.zIndex = "8";

    left_panel.style.animation = "swap-leftpanel-slide .4s forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    // makes sure welcome msg is not displayed
    document.getElementById('welcome').style.display = "none"; 

    // empties the text fields, so user can type in new values
    name_detail.value = "";
    phone_detail.value = "";
    email_detail.value = "";
    address_detail.value = "";
    birthday_dd_detail.value = "";
    birthday_mm_detail.value = "";        
    notes_detail.value = "";

    // creates placeholders, so users know what each input field is
    name_detail.placeholder = "Name";
    phone_detail.placeholder = "(XXX) XXX - XXXX";
    email_detail.placeholder = "Otty@Otmail.com";
    address_detail.placeholder = "1234 The Address";
    birthday_dd_detail.placeholder = "DD";
    birthday_mm_detail.placeholder = "MM";

    setTimeout(function() {
        contact_details.style.display = "initial";
        edit_button.style.display = 'none';
        delete_button.style.display = 'none';

        cancel_button.style.display = 'block';
        save_button.style.display = 'block';
    }, 100);   

    pp_editbutton.style.display = "initial";
    name_detail.disabled = false;
    phone_detail.disabled = false;
    email_detail.disabled = false;
    address_detail.disabled = false;
    color_detail.disabled = false;
    birthday_dd_detail.disabled = false;
    birthday_mm_detail.disabled = false;
    notes_detail.disabled = false;

    currentlyEditing = true;
    //disable the right panel so changes can not be made to other contacts 
    //change visibility of the save btn to true 
    //pls do these 


    save_button.style.display = 'block';

    ppIndex = 0;

    document.getElementById("rightpanel").disabled = true;
    setTimeout(function() {
        contact_details.style.display = "initial";
        name_detail.defaultValue;
        phone_detail.defaultValue;
        email_detail.defaultValue;
        address_detail.defaultValue; 
        birthday_dd_detail.defaultValue;
        birthday_mm_detail.defaultValue;     
        notes_detail.defaultValue;

    }, 100);    
}

function getUpcomingBirthdays() {
    var today = new Date();
    var curMonth = (today.getMonth()) + 1;
    var curDate = (today.getDate()) + 1;
    var length = contactlist.length;
    var slash;
    var count = 0;

    var m = "";
    var d = "";

    var tempBdays = [];

    document.getElementById("birthdays").innerHTML = "";

    //collects all the contacts who have a birthday coming up within the next 30 days 
    for (let i = 0; i < length; i++) {
        slash = contactlist[i].birthday.indexOf("/");
        if (slash === -1)
            continue;

        m = contactlist[i].birthday.substring(0,slash);
        d = contactlist[i].birthday.substring(slash + 1, length);

        if((m == curMonth && d >= curDate || m == (((curMonth-1)+1)%12) + 1 && d < curDate)) {
            let newBday = {
                name: contactlist[i].name,
                month: m,
                day: d 
            };
            tempBdays.push(newBday);
        }
    }
    tempBdays.sort(compareBirthdays);
    
    for (let i = 0; i < tempBdays.length; i++) {

            if(tempBdays[i].month.length == 1)
                tempBdays[i].month = "0" + tempBdays[i].month;
            if(tempBdays[i].day.length == 1)
                tempBdays[i].day = "0" + tempBdays[i].day;

            document.getElementById("birthdays").innerHTML += (i == 0 ? "" : "<br>") + " <span>" + tempBdays[i].month + "/" + tempBdays[i].day + "</span> " + tempBdays[i].name;

        if (i === 3) {
            break;
        }
    }
}

function changePPIndex(num) {
    ppIndex += num;
    if(ppIndex < 0) ppIndex += 16;
    if(ppIndex >= 16) ppIndex -= 16;
    current_pp.src = "img/ppics/pp-" + ppIndex.toString() + ".jpg"; 
}

function setPPIndex() {
    pp_detail.src = "img/ppics/pp-" + ppIndex.toString() + ".jpg"; 
    closePopup();
}

function openPopup(message) {

    if(message == "choosepppopup") {
        delete_contact_popup.style.display = "none";
        choose_pp_popup.style.display = "initial";
        generic_message_popup.style.display = "none";
    }
    else if(message == "deletecontactpopup") {
        delete_contact_popup.style.display = "initial";
        choose_pp_popup.style.display = "none";
        generic_message_popup.style.display = "none";
    }    else {
        delete_contact_popup.style.display = "none";
        choose_pp_popup.style.display = "none";
        generic_message_popup.style.display = "initial";

        generic_message.innerText = message;
    }

    popup.style.display = "block";

    popup.style.animation = 'none';
    left_panel.offsetHeight;

    popup.style.animation = "popup-grace-the-room-with-its-presence .4s forwards";
    popup.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    left_panel.style.zIndex = "7";
    left_panel_cover.style.display = "initial";
    left_panel_cover.style.opacity = "0.8";
}

function closePopup() {
    popup.style.display = "none";
    left_panel.style.zIndex = "8";

    if(currentlyEditing) { 
        left_panel_cover.style.display = "initial";
        left_panel_cover.style.opacity = "0.8";
    }
    else {
        left_panel_cover.style.display = "none";
        left_panel_cover.style.opacity = "0";
    }
}


function compare(a, b) {
    return a.name.localeCompare(b.name);
}

function compareBirthdays(a, b) {
    let aBirthNum = (Number(a.month) * 1000) + Number(a.day);
    let bBirthNum = (Number(b.month) * 1000) + Number(b.day);

console.log(a.name + ": " + aBirthNum);
console.log(b.name + ": " + bBirthNum);
    return aBirthNum - bBirthNum;
}

function adaptToScreen() {
    // Make left panel width proportional to height
    left_panel.style.width = left_panel.offsetHeight.toString() + "px";
}