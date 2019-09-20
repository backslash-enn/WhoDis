var contactlist = [
    {name: "It's working!", number: "(904) 607 - 3083", color: "red", address: "1234 The Street"},
    {name: "Cat", number: "(786) 009 - 2089", color: "pink", address: "4321 Waterbay Creek"},
    {name: "Time Arrow", number: "(000) 000 - 1994", color: "orange", address: "1234 The Street"}
]

document.addEventListener("DOMContentLoaded", function(event) { 

    var itemlist = document.getElementById("contactitemlist");
    var contactitemtemplate = document.getElementById("contactitemtemplate");
    var contactletterdivtemplate = document.getElementById("contactletterdivtemplate");

    displayContacts();

    function displayContacts() {
        
        while (itemlist.firstChild) {
            itemlist.removeChild(itemlist.firstChild);
        }

        for(let i = 0; i < contactlist.length; i++) {
            var clon = contactitemtemplate.content.cloneNode(true);
            clon.children[0].children[0].innerHTML = `${contactlist[i].name}<br><span>${contactlist[i].number}</span>`;
            clon.children[0].children[0].style.backgroundColor = contactlist[i].color;
            clon.children[0].children[0].style.color = contactlist[i].color;
            clon.children[0].id = i;

            itemlist.appendChild(clon);
        }
    }
}, false);


function displayContactInfo(b){

    var contact_details = document.getElementById('contactdetails');
    var welcome_msg = document.getElementById('welcome');
    var left_panel = document.getElementById('leftpanel');

    let i = b.parentNode.id;
    console.log(i);

    // Animate in
    if (b.id == "logo")
    {
        left_panel.style.animation = 'none';
        left_panel.offsetHeight;

        left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
        left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

        setTimeout(function() {
            contact_details.style.display = "none";
            welcome_msg.style.display = "block";
        }, 100);
    }
    else
    {
        left_panel.style.animation = 'none';
        left_panel.offsetHeight;
        
        left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
        left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

        setTimeout(function() {
            contact_details.style.display = "block";
            welcome_msg.style.display = "none";
            document.getElementById('address').value = contactlist[i].address;
            document.getElementById('phone').value = contactlist[i].number;
        }, 100);
    } 
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
        console.log("enabled");
    }
    else{
        document.getElementById("notes").disabled = true;
        document.getElementById("phone").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("address").disabled = true;
        document.getElementById("color").disabled = true;
        document.getElementById("birthday").disabled = true;
        console.log("disabled");
    }

}