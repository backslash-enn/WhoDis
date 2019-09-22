var contactlist = [
    {name: "Cat", number: "(786) 009 - 2089", email: "familyfriendly@ottmail.com", color: "pink", address: "4321 Waterbay Creek", notes: "", favorite: true},
    {name: "Otty Osbourne", number: "(904) 607 - 3083", email: "otty@yahoo.com", color: "red", address: "1234 The Street", notes: "Will die for his guitar. Owes me $5", favorite: false},
    {name: "Time Arrow", number: "(000) 000 - 1994", email: "test@gmail.com", color: "orange", address: "1234 The Street", notes: 'Was kidnapped and is now being forced to say nice things about Apple', favorite: false},
    {name: "Toffeny", number: "(000) 000 - 1994", email: "lostinthetoff@aol.com", color: "yellow", address: "1234 The Street", notes: "Claims she finished the database. We'll see.", favorite: false},
    {name: "Uri", number: "(123) 123 - 1234", email: "ok@fuby.com", color: "blue", address: "1234 The Street", notes: 'Wishes he had more time on the last test. Might drop out and sell crack. Apparently it pays pretty well.', favorite: true}
]

    var itemlist;
    var contactitemtemplate;
    var contactletterdivtemplate;
    var fav_button;

    var favoritesOnly = false;
    var jsonObject2;

document.addEventListener("DOMContentLoaded", function(event) { 
    itemlist = document.getElementById("contactitemlist");
    contactitemtemplate = document.getElementById("contactitemtemplate");
    contactletterdivtemplate = document.getElementById("contactletterdivtemplate");
    fav_button = document.getElementById("favorites");

    displayContacts("");
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
                                    var add = {name: jsonObject2.results[i]["name"], number: jsonObject2.results[i]["phone_number"], email: jsonObject2.results[i]["email"], color: jsonObject2.results[i]["fav_color"], address: jsonObject2.results[i]["primary_street_addr"], notes: jsonObject2.results[i]["notes"], favorite: false};
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

    var contact_details = document.getElementById('contactdetails');
    var left_panel = document.getElementById('leftpanel');
    var welcome_msg = document.getElementById('welcome');

    let i = b.parentNode.id;
    console.log(i);

    // Animate in
    left_panel.style.animation = 'none';
    left_panel.offsetHeight;
    
    left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
    left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

    setTimeout(function() {
        contact_details.style.display = "block";
        welcome_msg.style.display = "none";

        document.getElementById('name').value = contactlist[i].name;
        document.getElementById('phone').value = contactlist[i].number;
        document.getElementById('email').value = contactlist[i].email;
        document.getElementById('address').value = contactlist[i].address;
        document.getElementById('notes').value = contactlist[i].notes;
    }, 100); 
}

function displayWelcomePanel(b) {
    var left_panel = document.getElementById('leftpanel');
    var contact_details = document.getElementById('contactdetails');
    var welcome_msg = document.getElementById('welcome');

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
    var contact_details = document.getElementById('contactdetails');
    var welcome_msg = document.getElementById('welcome');
    var itemlist = document.getElementById("contactitemlist");


    contact_details.style.display = "none";
    welcome_msg.style.display = "block";
}

function editcontactinfo(){

    var editmode = document.getElementById("notes").disabled;
    
    if (editmode){
        document.getElementById("notes").disabled = false;
        document.getElementById("phone").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("address").disabled = false;
        document.getElementById("color").disabled = false;
        document.getElementById("birthday").disabled = false;
        document.getElementById("name").disabled = false;
    }
    else{
        
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var color = document.getElementById("color").value;
        var birthday = document.getElementById("birthday").value;
        var notes = document.getElementById("notes").value;
        
        var JSONPayload = '{ "name" : "' + name + '", "fav_color" : "' + color + '", "notes" : "' + notes + '", "primary_street_addr" : "", "phone_number" : "' + phone + '", "birthday" : "'+birthday+'", "favorite" : "1", "contact_id" : "12" }';
        var url = "https://managerofcontacts.live/api/Edit.php";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
            
//            xhr.send(JSONPayload);
//            document.getElementById("address").value = "ttt";
//            var jsonObject = JSON.parse( xhr.responseText );
//            document.getElementById("email").value = "aaa";
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                    {
                        //set some success message
//                        document.getElementById("email").value = "bb";
                        var jsonObject = JSON.parse( xhr.responseText );
                        document.getElementById("email").value = "aa";
                        console.log(jsonObject);
                    }
            }
            xhr.send(JSONPayload);
            
        }
        catch (err)
        {
//            document.getElementById("email").value = err.message;
            document.getElementById("email").value = "error while editing";
        }
        
        document.getElementById("notes").disabled = true;
        document.getElementById("phone").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("address").disabled = true;
        document.getElementById("color").disabled = true;
        document.getElementById("birthday").disabled = true;
        document.getElementById("name").disabled = true;
    }

}
