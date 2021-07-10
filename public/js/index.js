// Main JavaScript file for "LumberJack"


// MOCK PAGE MENU

// function mockPage(input) {
//     let host = window.location.hostname;
//     console.log(host);
//     console.log(input);
//     if ( host === 'localhost' ) {
//         window.location.href = 'http://' + host + ':3000/' + input
//     } else {
//         window.location.href = window.location.protocol + '//' + host + '/' + input;
//     }
// }



// LIGHTBOX

let lightboxBool = false;
let lightboxPane = document.querySelector('.lightbox');

function lightbox() {
    if (lightboxBool === true) {
        lightboxPane.style.opacity = "0";
        lightboxPane.pointerEvents = 'none';

    } else if (lightboxBool === false) {
        lightboxPane.pointerEvents = 'auto';
        lightboxPane.style.opacity = "1";
    }
    lightboxBool = !lightboxBool;
}

function runLightbox(input) {
    lightboxPane.pointerEvents = 'auto';

    document.querySelector('.lightbox img').attributes.src.value = `/images/greens/${input}`;
    lightbox();
}

function lightboxOff() {
    lightbox();
    console.log('hi');
}



// ADD CHECK TO FORM

function addToOrder(input) {
    document.querySelector(`[name="${input}"]`).checked = true;
}

function clearPlansForm() {
    document.querySelector('[name=weekly]').checked = false;
    document.querySelector('[name=bulk]').checked = false;
    document.querySelector('[name=one_time]').checked = false;
}

// PLAN SELECTION BUTTONS

let weeklyPane = document.querySelector('#weekly-pane');
let weeklyOrderBtn = document.querySelector('#weekly-order-btn');
let weeklyAdded = document.querySelector('#weekly-added');

let oneTimePane = document.querySelector('#one_time-pane');
let oneTimeOrderBtn = document.querySelector('#one_time-order-btn');
let oneTimeAdded = document.querySelector('#one_time-added');

let bulkPane = document.querySelector('#bulk-pane');
let bulkOrderBtn = document.querySelector('#bulk-order-btn');
let bulkAdded = document.querySelector('#bulk-added');

function weeklyOpen() {
    weeklyPane.classList.add('plan-btn-pane-open');
    weeklyOrderBtn.classList.add('center-btn-clicked');
    weeklyAdded.classList.add('plan-added-clicked');
}

function weeklyClose() {
    weeklyDelBool = false;

    weeklyPane.classList.remove('plan-btn-pane-open');
    weeklyOrderBtn.classList.remove('center-btn-clicked');
    weeklyAdded.classList.remove('plan-added-clicked');
}

function oneTimeOpen() {
    oneTimePane.classList.add('plan-btn-pane-open');
    oneTimeOrderBtn.classList.add('sides-btn-clicked');
    oneTimeAdded.classList.add('plan-added-clicked');
}

function oneTimeClose() {
    oneTimeDelBool = false;

    oneTimePane.classList.remove('plan-btn-pane-open');
    oneTimeOrderBtn.classList.remove('sides-btn-clicked');
    oneTimeAdded.classList.remove('plan-added-clicked');
}

function bulkOpen() {
    bulkPane.classList.add('plan-btn-pane-open');
    bulkOrderBtn.classList.add('sides-btn-clicked');
    bulkAdded.classList.add('plan-added-clicked');
}

function bulkClose() {
    bulkDelBool = false;

    bulkPane.classList.remove('plan-btn-pane-open');
    bulkOrderBtn.classList.remove('sides-btn-clicked');
    bulkAdded.classList.remove('plan-added-clicked');
}




let weeklyDelBool = false;

function weeklyDel() {
    if (weeklyDelBool === false) {
        weeklyDelBool = !weeklyDelBool;
        weeklyOpen();
        oneTimeClose();
        bulkClose();
        document.querySelector('.weekly-btn-check').style.display = "block";
        document.querySelector('.one_time-btn-check').style.display = "none";
        document.querySelector('.bulk-btn-check').style.display = "none";
        hideBulkDiscount();
        bulkMaxOff();
        clearPlansForm();
        addToOrder('weekly');
        getPriceTotal();

    } else if (weeklyDelBool === true) {
        weeklyDelBool = !weeklyDelBool;
        weeklyClose();
        clearPlansForm();
        if ( formCheckWeekly.checked === false && formCheckBulk === false && formCheckOnetime === false ) {
            formTotalPrice.value = '0';
        }
        getPriceTotal();

    }
}

let formQuanList = Array.from(document.querySelectorAll('.wyld-form-mix input[type=number]'));
let formCheckList = Array.from(document.querySelectorAll('.wyld-form-mix input[type=checkbox]'));


let bulkMaxBool = false;
function bulkMax() {
    bulkMaxBool = true;
    

    formQuanList.forEach( (item, i) => {
        if ( formCheckList[i].checked === true ) {
            item.value = "1";
        } else {
            item.value = "";
        }
        item.max = "1";
    });

}

function bulkMaxOff() {
  
    
    if ( bulkMaxBool === true ) {

        formQuanList.forEach( (item, i) => {
            if ( formCheckList[i].checked === false ) {
                item.value = "";
            } else {
                item.value = "1";
            }
            item.max = "3";
        });
        
    }

    bulkMaxBool = false;
}

let bulkDiscount = document.querySelector('.bulk-discount-pane');
let bulkDelBool = false;

function bulkDel() {
    if (bulkDelBool === false) { // turns ON bulk delivery options
        bulkDelBool = !bulkDelBool;
        weeklyClose();
        bulkOpen();
        oneTimeClose();
        document.querySelector('.weekly-btn-check').style.display = "none";
        document.querySelector('.one_time-btn-check').style.display = "none";
        document.querySelector('.bulk-btn-check').style.display = "block";
        clearPlansForm();
        addToOrder('bulk');
        displayBulkDiscount();
        bulkMax();
        
        getPriceTotal();
    } else if (bulkDelBool === true) { // turns OFF bulk delivery options
        bulkDelBool = !bulkDelBool;
        clearPlansForm();
        bulkClose();
        if ( formCheckWeekly.checked === false && formCheckBulk === false && formCheckOnetime === false ) {
            formTotalPrice.value = '0';
        }
        hideBulkDiscount();
        bulkMaxOff();
        getPriceTotal();
    }
}

let oneTimeDelBool = false;

function oneTimeDel() {
    if (oneTimeDelBool === false) {
        oneTimeDelBool = !oneTimeDelBool;
        weeklyClose();
        bulkClose();
        oneTimeOpen();
        document.querySelector('.weekly-btn-check').style.display = "none";
        document.querySelector('.one_time-btn-check').style.display = "block";
        document.querySelector('.bulk-btn-check').style.display = "none";
        hideBulkDiscount();
        bulkMaxOff();
        clearPlansForm();
        addToOrder('one_time');
        getPriceTotal();
    } else if (oneTimeDelBool === true) {
        oneTimeDelBool = !oneTimeDelBool;
        oneTimeClose();
        clearPlansForm();
        if ( formCheckWeekly.checked === false && formCheckBulk === false && formCheckOnetime === false ) {
            formTotalPrice.value = '0';
        }
        getPriceTotal();

    }
}

// CUSTOM MIX FORM

let customOrderBtn = document.querySelector(".custom-order-button");
let hiddenBtn = document.querySelector(".custom-order-hidden");
let ingredChecks = document.querySelectorAll('.custom-check');
let orderBox = document.querySelector('.ingred-box');
let customClose = document.querySelector('.custom-close');
let orderWrap = document.querySelector('.ingred-wrap');
let customQuanP = document.querySelector('.custom-quantity p');
let customQuanCheck = document.querySelector('.custom-btn-check');
let customQuanCross = document.querySelector('.custom-btn-cross');
let customNew = document.querySelector('.custom-new');
let customQuanInput = document.querySelector('.custom-quantity input');
let customRemove = document.querySelector('.custom-remove');

function customOrderOn() { // open pane, apply styles
    customOrderBtn.innerText = "Pick up to 4";
    customOrderBtn.classList.add('custom-order-btn-clicked');
    customOrderBtn.style.pointerEvents = 'none';

    hiddenBtn.classList.add('custom-order-hidden-clicked');
    orderWrap.classList.add('custom-order-shadow');
    hiddenBtn.style.pointerEvents = 'none';
    hiddenBtn.style.color = 'grey';
    customClose.classList.add('custom-close-clicked');
    for (i = 0; i < ingredChecks.length; i++) {
        ingredChecks[i].style.opacity = '1';
        ingredChecks[i].disabled = false;
        ingredChecks[i].style.cursor = "pointer";
        document.querySelectorAll('.custom-ingredients label')[i].style.cursor = "pointer";
        document.querySelectorAll('.custom-ingredients label')[i].style.pointerEvents = "auto";
    }
}

function customOrderOff() { // close pane
    customQuanBool = false;
    currentOrderSubmitted = false;

    customOrderBtn.classList.remove('custom-order-btn-clicked');
    hiddenBtn.classList.remove('custom-order-hidden-clicked');
    orderWrap.classList.remove('custom-order-shadow');
    customClose.classList.remove('custom-close-clicked');
    customNew.classList.remove('custom-close-clicked');
    customQuanCheck.style.display = "none";
    customQuanP.style.opacity = "1";

    customOrderBtn.innerText = "Start A New Custom Order";
    customOrderBtn.style.pointerEvents = 'auto';
    document.querySelector('.custom-btn-slider').classList.remove('custom-btn-slider-anim');
    hiddenBtn.innerText = "Create Mix!"
    customQuanInput.value = 1;

    for (i = 0; i < ingredChecks.length; i++) {
        ingredChecks[i].style.opacity = '0.4';
        ingredChecks[i].disabled = true;
        ingredChecks[i].checked = false;
        ingredChecks[i].style.cursor = "default";
        document.querySelectorAll('.custom-ingredients label')[i].style.cursor = "default";
    }
}

// function customRemoveOrder() {
//     customQuanBool = false;
//     customUpdateBool = false;
//     currentOrderSubmitted = false;

//     customOrderArray.pop();


//     customQuanCheck.style.display = "none";
//     customQuanInput.value = "0";
//     hiddenBtn.innerText = "Deleted from Order";
//     customQuanP.style.opacity = "0";
//     customQuanCross.style.display = "block";
//     customRemove.style.pointerEvents = "none";
//     customNew.style.pointerEvents = "none";
//     document.querySelector("#details-body").value = customOrderArray.join();

//     setTimeout(() => {
//         customOrderOff();
//         customRemove.classList.remove('custom-remove-clicked');
//         customNew.classList.remove('custom-remove-clicked');
//     }, 2000);
//     setTimeout(() => {
//         customQuanCross.style.display = "none";
//         customQuanP.style.opacity = "1";
//         customQuanInput.value = "1";
//         customClose.style.pointerEvents = "auto";
//     }, 2300);
//     getTotalCustom();

// }

function customNewOrder() {
    customQuanBool = false;
    customUpdateBool = false;
    currentOrderSubmitted = false;
    customNew.classList.remove('custom-remove-clicked');
    // customRemove.classList.remove('custom-remove-clicked');
    customOrderOff();
    getTotalCustom();
    checkCustomQuantities();
}


let currentOrderSubmitted = false;

function customUpdate() { // apply styles if data already sent to form
    if (Number(customQuanInput.value) > 3 || Number(customQuanInput.value) === 0) {
        customQuanP.style.opacity = "1";
        customQuanCheck.style.display = "none";
        customQuanP.innerHTML = "Max 3<br>per week";
        customQuanP.style.left = "23px";
        hiddenBtn.style.pointerEvents = "none";

    } else if (Number(customQuanInput.value) >= 1 || Number(customQuanInput.value) <= 3) {
        customQuanP.innerHTML = "How<br>Many?";
        customQuanP.style.left = "31px";
        hiddenBtn.style.pointerEvents = "auto";

        if (currentOrderSubmitted === true) {
            customUpdateBool = true;
            customQuanP.style.opacity = "1";
            customQuanCheck.style.display = "none";
            hiddenBtn.innerText = "Update Quantity";
            hiddenBtn.style.pointerEvents = "auto";
        }
    }

}

function ingredCheck() {
    let customChecks = document.querySelectorAll('.custom-check');
    let count = 0;
    for (i = 0; i < customChecks.length; i++) {
        if (customChecks[i].checked == true) {
            count++;
        }
    }

    if (count > 4) {
        customOrderBtn.style.pointerEvents = 'none';
        customOrderBtn.innerText = "Too many!";
        hiddenBtn.style.pointerEvents = "none";
        hiddenBtn.style.color = 'grey';
        document.querySelector(".custom-quantity p").innerText = "Too Many Items!";
        // document.querySelector(".custom-quantity p").style.left = "px";
        document.querySelector(".custom-quantity p").style.top = "15px";
        document.querySelector(".custom-quantity input").style.display = "none";

    } else if (count > 0 && count <= 4) {
        customOrderBtn.innerText = "Pick up to 4";
        customOrderBtn.style.pointerEvents = 'none';
        hiddenBtn.style.pointerEvents = "auto";
        hiddenBtn.style.color = '#222';
        document.querySelector(".custom-quantity p").innerHTML = "How<br>Many?";
        document.querySelector(".custom-quantity p").style.left = "31px";
        document.querySelector(".custom-quantity p").style.top = "7px";
        document.querySelector(".custom-quantity input").style.display = "inline-block";

    } else if (count === 0) {
        hiddenBtn.style.pointerEvents = "none";

    }
}

let customQuanBool = false;
let customUpdateBool = false;

let customOrder1 = {
    quantity: 0,
    ingredients: ""
};
let customOrder2 = {
    quantity: 0,
    ingredients: ""
};
let customOrder3 = {
    quantity: 0,
    ingredients: ""
};

function checkCustomQuantities() {
    if (customOrder1.quantity + customOrder2.quantity + customOrder3.quantity >= 3) {
        console.log('max');
        customOrderBtn.style.pointerEvents = "none";
        customOrderBtn.innerHTML = "Max 3 per week<br>Please Check Quantity On Form"
    } else {
        customOrderBtn.style.pointerEvents = "auto";
        customOrderBtn.innerHTML = "Start A New Custom Order";
    }
}

function getTotalCustom() {
    let total = customOrder1.quantity + customOrder2.quantity + customOrder3.quantity;

    document.querySelector(".wyld-form-mix input[name=custom-num]").value = total;

    if (total > 3) {
        customOrderBtn.style.pointerEvents = "none";
        customOrderBtn.innerHTML = "Max 3 per week<br>Please Check Quantity On Form";
    }

}

function order1Input() {
    customOrder1.quantity = Number(document.querySelector('.num-1 input').value);
    customNewOrder();
    getTotalCustom();
}

function order2Input() {
    customOrder2.quantity = Number(document.querySelector('.num-2 input').value);
    customNewOrder();
    getTotalCustom();
}

function order3Input() {
    customOrder3.quantity = Number(document.querySelector('.num-3 input').value);
    customNewOrder();
    getTotalCustom();
}

function customQuantityVerify() { // NEEDS to check if pane is open before applying styles
    let total = Number(document.querySelector(".wyld-form-mix input[name=custom-num]").value);

    if (total >= 3) {
        // console.log('more')
        customOrderBtn.style.pointerEvents = "none";
        customOrderBtn.innerHTML = "Max 3 per week<br>Please Check Quantity On Form";

    } else if (total <= 2) {
        customOrderBtn.style.pointerEvents = "auto";
        customOrderBtn.innerHTML = "Start A New Custom Order";
        // console.log('less');
    }
    // console.log('input');
    getPriceTotal();

}

function customObjectHandling(quantity, ingredients) {
    if (customOrder1.ingredients === "") {
        customOrder1.quantity = quantity;
        customOrder1.ingredients = ingredients;
        checkCustomQuantities();
    } else if (customOrder2.ingredients === "") {
        customOrder2.quantity = quantity;
        customOrder2.ingredients = ingredients;
        checkCustomQuantities();
    } else if (customOrder3.ingredients === "") {
        customOrder3.quantity = quantity;
        customOrder3.ingredients = ingredients;
        checkCustomQuantities();
    }
}

function newCustomDisplay() {
    document.querySelector(".num-1 p").innerHTML = `Custom order with the following:<br>  - ${customOrder1.ingredients}`;
    document.querySelector(".num-1 input").value = customOrder1.quantity.toString();
    document.querySelector(".num-2 p").innerHTML = `Custom order with the following:<br>  - ${customOrder2.ingredients}`;
    document.querySelector(".num-2 input").value = customOrder2.quantity.toString();
    document.querySelector(".num-3 p").innerHTML = `Custom order with the following:<br>  - ${customOrder3.ingredients}`;
    document.querySelector(".num-3 input").value = customOrder3.quantity.toString();
}

function customObjectUpdate(quantity) {
    if (customOrder2.ingredients === "") {
        customOrder1.quantity = quantity;
    } else if (customOrder2.ingredients !== "") {
        if (customOrder3.ingredients === "") {
            customOrder2.quantity = quantity;
        } else {
            customOrder3.quantity = quantity;
        }
    }
}

function sendCustomData(update) {

    currentOrderSubmitted = true;
    hiddenBtn.innerText = "Added to Order!";
    hiddenBtn.style.pointerEvents = "none";
    customQuanP.style.opacity = "0";
    customQuanCheck.style.display = "block";
    document.querySelector(".wyld-form-mix input[name=custom-num]").value = customQuanInput.value;
    addToOrder('mix_custom');

    // data gathering and packaging

    let boxVar = "box";
    let newOrderQuan = Number(customQuanInput.value);
    let itemList = [];

    for (i = 0; i < ingredChecks.length; i++) {
        ingredChecks[i].checked === true && itemList.push(ingredChecks[i].name);
    }
    if (Number(customQuanInput.value) > 1) {
        boxVar = "boxes";
    }

    // custom order object update
    if (update === true) {
        customObjectUpdate(newOrderQuan);
    } else {
        // custom order object handling
        customObjectHandling(newOrderQuan, itemList);
    }

    getTotalCustom();
    newCustomDisplay();
}

function promptQuantity() {

    if (customUpdateBool === true) { // if updating quantity - data already sent to form
        sendCustomData(true);
    } else if (customUpdateBool === false) {

        if (customQuanBool === true) { // action when quantity box displayed and ingredients selected - data submission
            customQuanBool = false;

            // update form checkbox
            addToOrder('mix_custom');
            sendCustomData();

            // display new option buttons
            customNew.classList.add('custom-remove-clicked');
            customClose.classList.remove('custom-close-clicked');
            customNew.style.pointerEvents = "auto";

            // turn off ingredient selection
            for (i = 0; i < ingredChecks.length; i++) {
                ingredChecks[i].style.cursor = "default";
                if (ingredChecks[i].checked === false) {
                    ingredChecks[i].style.opacity = '0.5';
                }
                document.querySelectorAll('.custom-ingredients label')[i].style.pointerEvents = "none";
            }

        } else if (customQuanBool === false) { // first click after adding ingredient
            if (bulkDelBool === true) {
                customQuanP.innerHTML = "Bulk<br>Order";
                customQuanInput.value = "4";
            }
            customQuanBool = true;
            hiddenBtn.innerText = "Add to Order Form";
            document.querySelector('.custom-btn-slider').classList.add('custom-btn-slider-anim');
            hiddenBtn.style.right = "1px";
        }
    }
}

function addIngredientForm1() {
    window.location.href = "#ingred-box";
    window.scrollBy(0, -50);
}
// MIX SELECTION BUTTONS

// 'Farmers Mix' order button control booleans
let farmersBool = false;
let farmersUpdateBool = false;

// DOM variables
let farmersOrderBtn = document.querySelector("#farmers-order-btn");
let farmersPane = document.querySelector("#farmers-pane");
let farmersQuan = document.querySelector("#farmers-quantity");
let farmersClose = document.querySelector('.farmers-remove');
let farmersQuanP = document.querySelector("#farmers-quantity p");
let farmersQuanCheck = document.querySelector("#farmers-quantity img");
let farmersQuanCross = document.querySelector('.farmers-btn-cross');
let farmersQuanInput = document.querySelector("#farmers-quantity input");


function farmersMix() { // primary button
    if (farmersUpdateBool === true) { // if updating quantity - data already sent to form
        sendFarmerData();

    } else if (farmersUpdateBool === false) { // if first data submission

        if (farmersBool === false) { // open slider
            farmersBool = !farmersBool;
            farmersOrderBtn.innerText = "Add to Order Form";
            farmersPane.classList.add("mix-btn-pane-open");
            farmersOrderBtn.classList.add('mix-button-clicked');
            farmersQuan.classList.add('mix-quantity-clicked');
            farmersClose.classList.add('mix-remove-clicked');
            setTimeout(() => {
                farmersPane.style.transition = "box-shadow .1s ease-out";
            }, 400);
        } else if (farmersBool === true) { // send to form after quantity selection
            farmersBool = !farmersBool;
            sendFarmerData();
            farmersClose.innerText = "Remove";
        }
    }
}

function farmersUpdate() { // apply styles if data already sent to form
    if (Number(farmersQuanInput.value) > 3 || Number(farmersQuanInput.value) === 0) {
        farmersQuanP.style.opacity = "1";
        farmersQuanCheck.style.display = "none";
        farmersQuanP.innerHTML = "Max 3<br>per week";
        farmersQuanP.style.left = "18px";
        farmersOrderBtn.style.pointerEvents = "none";

    } else if (Number(farmersQuanInput.value) >= 1 || Number(farmersQuanInput.value) <= 3) {
        farmersQuanP.innerHTML = "How<br>Many?";
        farmersQuanP.style.left = "23px";
        farmersOrderBtn.style.pointerEvents = "auto";

        if (document.querySelector('[name=mix_farmers]').checked === true) {
            farmersUpdateBool = true;
            farmersQuanP.style.opacity = "1";
            farmersQuanCheck.style.display = "none";
            farmersOrderBtn.innerText = "Update Quantity";
            farmersOrderBtn.style.pointerEvents = "auto";
        }
    }

}

function farmersCloseBtn() { // hidden tab close button
    farmersBool = false;
    farmersUpdateBool = false;

    function panelClose() { // close button panel
        farmersOrderBtn.innerText = "Place Order";
        farmersPane.classList.remove("mix-btn-pane-open");
        farmersOrderBtn.classList.remove('mix-button-clicked');
        farmersQuan.classList.remove('mix-quantity-clicked');
        farmersClose.classList.remove('mix-remove-clicked');
        setTimeout(() => {
            farmersPane.style.transition = "border .25s ease-out .1s, box-shadow .25s ease-out .1s";
        }, 200);
    }

    if (farmersClose.innerText === "Remove") { // if product already added
        document.querySelector(".wyld-form-mix input[name=farmers-num]").value = "0";
        document.querySelector('[name=mix_farmers]').checked = false;
        farmersQuanCheck.style.display = "none";
        farmersQuanInput.value = "0";
        farmersOrderBtn.innerText = "Deleted from Order";
        farmersQuanP.style.opacity = "0";
        farmersQuanCross.style.display = "block";
        farmersClose.style.pointerEvents = "none";
        setTimeout(() => {
            farmersOrderBtn.style.pointerEvents = "auto";
            panelClose();
        }, 2000);
        setTimeout(() => {
            farmersQuanCross.style.display = "none";
            farmersQuanP.style.opacity = "1";
            farmersQuanInput.value = "1";
            farmersClose.innerText = "Close";
            farmersClose.style.pointerEvents = "auto";
        }, 2300);
    } else { // if no product added
        panelClose();
    }
}

function sendFarmerData() {
    farmersOrderBtn.innerText = "Added to Order!";
    farmersOrderBtn.style.pointerEvents = "none";
    farmersQuanP.style.opacity = "0";
    farmersQuanCheck.style.display = "block";
    document.querySelector(".wyld-form-mix input[name=farmers-num]").value = farmersQuanInput.value;
    addToOrder('mix_farmers');
}





// 'Spicy Mix' order button control booleans
let spicyBool = false;
let spicyUpdateBool = false;

// DOM variables
let spicyOrderBtn = document.querySelector("#spicy-order-btn");
let spicyPane = document.querySelector("#spicy-pane");
let spicyQuan = document.querySelector("#spicy-quantity");
let spicyClose = document.querySelector('.spicy-remove');
let spicyQuanP = document.querySelector("#spicy-quantity p");
let spicyQuanCheck = document.querySelector("#spicy-quantity img");
let spicyQuanCross = document.querySelector('.spicy-btn-cross');
let spicyQuanInput = document.querySelector("#spicy-quantity input");


function spicyMix() { // primary button
    if (spicyUpdateBool === true) { // if updating quantity - data already sent to form
        sendSpicyData();

    } else if (spicyUpdateBool === false) { // if first data submission

        if (spicyBool === false) { // open slider
            spicyBool = !spicyBool;
            spicyOrderBtn.innerText = "Add to Order Form";
            spicyPane.classList.add("mix-btn-pane-open");
            spicyOrderBtn.classList.add('mix-button-clicked');
            spicyQuan.classList.add('mix-quantity-clicked');
            spicyClose.classList.add('mix-remove-clicked');
            setTimeout(() => {
                spicyPane.style.transition = "box-shadow .1s ease-out";
            }, 400);
        } else if (spicyBool === true) { // send to form after quantity selection
            spicyBool = !spicyBool;
            sendSpicyData();
            spicyClose.innerText = "Remove";
        }
    }
}

function spicyUpdate() { // apply styles if data already sent to form
    if (Number(spicyQuanInput.value) > 3 || Number(spicyQuanInput.value) === 0) {
        spicyQuanP.style.opacity = "1";
        spicyQuanCheck.style.display = "none";
        spicyQuanP.innerHTML = "Max 3<br>per week";
        spicyQuanP.style.left = "18px";
        spicyOrderBtn.style.pointerEvents = "none";

    } else if (Number(spicyQuanInput.value) >= 1 || Number(spicyQuanInput.value) <= 3) {
        spicyQuanP.innerHTML = "How<br>Many?";
        spicyQuanP.style.left = "23px";
        spicyOrderBtn.style.pointerEvents = "auto";

        if (document.querySelector('[name=mix_spicy]').checked === true) {
            spicyUpdateBool = true;
            spicyQuanP.style.opacity = "1";
            spicyQuanCheck.style.display = "none";
            spicyOrderBtn.innerText = "Update Quantity";
            spicyOrderBtn.style.pointerEvents = "auto";
        }
    }

}

function spicyCloseBtn() { // hidden tab close button
    spicyBool = false;
    spicyUpdateBool = false;

    function panelClose() { // close button panel
        spicyOrderBtn.innerText = "Place Order";
        spicyPane.classList.remove("mix-btn-pane-open");
        spicyOrderBtn.classList.remove('mix-button-clicked');
        spicyQuan.classList.remove('mix-quantity-clicked');
        spicyClose.classList.remove('mix-remove-clicked');
        setTimeout(() => {
            spicyPane.style.transition = "border .25s ease-out .1s, box-shadow .25s ease-out .1s";
        }, 200);
    }

    if (spicyClose.innerText === "Remove") { // if product already added
        document.querySelector(".wyld-form-mix input[name=spicy-num]").value = "0";
        document.querySelector('[name=mix_spicy]').checked = false;
        spicyQuanCheck.style.display = "none";
        spicyQuanInput.value = "0";
        spicyOrderBtn.innerText = "Deleted from Order";
        spicyQuanP.style.opacity = "0";
        spicyQuanCross.style.display = "block";
        spicyClose.style.pointerEvents = "none";
        setTimeout(() => {
            spicyOrderBtn.style.pointerEvents = "auto";
            panelClose();
        }, 2000);
        setTimeout(() => {
            spicyQuanCross.style.display = "none";
            spicyQuanP.style.opacity = "1";
            spicyQuanInput.value = "1";
            spicyClose.innerText = "Close";
            spicyClose.style.pointerEvents = "auto";
        }, 2300);
    } else { // if no product added
        panelClose();
    }
}

function sendSpicyData() {
    spicyOrderBtn.innerText = "Added to Order!";
    spicyOrderBtn.style.pointerEvents = "none";
    spicyQuanP.style.opacity = "0";
    spicyQuanCheck.style.display = "block";
    document.querySelector(".wyld-form-mix input[name=spicy-num]").value = spicyQuanInput.value;
    addToOrder('mix_spicy');
}







// 'Salad Mix' order button control booleans
let saladBool = false;
let saladUpdateBool = false;

// DOM variables
let saladOrderBtn = document.querySelector("#salad-order-btn");
let saladPane = document.querySelector("#salad-pane");
let saladQuan = document.querySelector("#salad-quantity");
let saladClose = document.querySelector('.salad-remove');
let saladQuanP = document.querySelector("#salad-quantity p");
let saladQuanCheck = document.querySelector("#salad-quantity img");
let saladQuanCross = document.querySelector('.salad-btn-cross');
let saladQuanInput = document.querySelector("#salad-quantity input");


function saladMix() { // primary button
    if (saladUpdateBool === true) { // if updating quantity - data already sent to form
        sendSaladData();

    } else if (saladUpdateBool === false) { // if first data submission

        if (saladBool === false) { // open slider
            saladBool = !saladBool;
            saladOrderBtn.innerText = "Add to Order Form";
            saladPane.classList.add("mix-btn-pane-open");
            saladOrderBtn.classList.add('mix-button-clicked');
            saladQuan.classList.add('mix-quantity-clicked');
            saladClose.classList.add('mix-remove-clicked');
            setTimeout(() => {
                saladPane.style.transition = "box-shadow .1s ease-out";
            }, 400);
        } else if (saladBool === true) { // send to form after quantity selection
            saladBool = !saladBool;
            sendSaladData();
            saladClose.innerText = "Remove";
        }
    }
}

function saladUpdate() { // apply styles if data already sent to form
    if (Number(saladQuanInput.value) > 3 || Number(saladQuanInput.value) === 0) {
        saladQuanP.style.opacity = "1";
        saladQuanCheck.style.display = "none";
        saladQuanP.innerHTML = "Max 3<br>per week";
        saladQuanP.style.left = "18px";
        saladOrderBtn.style.pointerEvents = "none";

    } else if (Number(saladQuanInput.value) >= 1 || Number(saladQuanInput.value) <= 3) {
        saladQuanP.innerHTML = "How<br>Many?";
        saladQuanP.style.left = "23px";
        saladOrderBtn.style.pointerEvents = "auto";

        if (document.querySelector('[name=mix_salad]').checked === true) {
            saladUpdateBool = true;
            saladQuanP.style.opacity = "1";
            saladQuanCheck.style.display = "none";
            saladOrderBtn.innerText = "Update Quantity";
            saladOrderBtn.style.pointerEvents = "auto";
        }
    }

}

function saladCloseBtn() { // hidden tab close button
    saladBool = false;
    saladUpdateBool = false;

    function panelClose() { // close button panel
        saladOrderBtn.innerText = "Place Order";
        saladPane.classList.remove("mix-btn-pane-open");
        saladOrderBtn.classList.remove('mix-button-clicked');
        saladQuan.classList.remove('mix-quantity-clicked');
        saladClose.classList.remove('mix-remove-clicked');
        setTimeout(() => {
            saladPane.style.transition = "border .25s ease-out .1s, box-shadow .25s ease-out .1s";
        }, 200);
    }

    if (saladClose.innerText === "Remove") { // if product already added
        document.querySelector(".wyld-form-mix input[name=salad-num]").value = "0";
        document.querySelector('[name=mix_salad]').checked = false;
        saladQuanCheck.style.display = "none";
        saladQuanInput.value = "0";
        saladOrderBtn.innerText = "Deleted from Order";
        saladQuanP.style.opacity = "0";
        saladQuanCross.style.display = "block";
        saladClose.style.pointerEvents = "none";
        setTimeout(() => {
            saladOrderBtn.style.pointerEvents = "auto";
            panelClose();
        }, 2000);
        setTimeout(() => {
            saladQuanCross.style.display = "none";
            saladQuanP.style.opacity = "1";
            saladQuanInput.value = "1";
            saladClose.innerText = "Close";
            saladClose.style.pointerEvents = "auto";
        }, 2300);
    } else { // if no product added
        panelClose();
    }
}

function sendSaladData() {
    saladOrderBtn.innerText = "Added to Order!";
    saladOrderBtn.style.pointerEvents = "none";
    saladQuanP.style.opacity = "0";
    saladQuanCheck.style.display = "block";
    document.querySelector(".wyld-form-mix input[name=salad-num]").value = saladQuanInput.value;
    addToOrder('mix_salad');
}









// 'Healthy Mix' order button control booleans
let healthyBool = false;
let healthyUpdateBool = false;

// DOM variables
let healthyOrderBtn = document.querySelector("#healthy-order-btn");
let healthyPane = document.querySelector("#healthy-pane");
let healthyQuan = document.querySelector("#healthy-quantity");
let healthyClose = document.querySelector('.healthy-remove');
let healthyQuanP = document.querySelector("#healthy-quantity p");
let healthyQuanCheck = document.querySelector("#healthy-quantity img");
let healthyQuanCross = document.querySelector('.healthy-btn-cross');
let healthyQuanInput = document.querySelector("#healthy-quantity input");


function healthyMix() { // primary button
    if (healthyUpdateBool === true) { // if updating quantity - data already sent to form
        sendHealthyData();

    } else if (healthyUpdateBool === false) { // if first data submission

        if (healthyBool === false) { // open slider
            healthyBool = !healthyBool;
            healthyOrderBtn.innerText = "Add to Order Form";
            healthyPane.classList.add("mix-btn-pane-open");
            healthyOrderBtn.classList.add('mix-button-clicked');
            healthyQuan.classList.add('mix-quantity-clicked');
            healthyClose.classList.add('mix-remove-clicked');
            setTimeout(() => {
                healthyPane.style.transition = "box-shadow .1s ease-out";
            }, 400);
        } else if (healthyBool === true) { // send to form after quantity selection
            healthyBool = !healthyBool;
            sendHealthyData();
            healthyClose.innerText = "Remove";
        }
    }
}

function healthyUpdate() { // apply styles if data already sent to form
    if (Number(healthyQuanInput.value) > 3 || Number(healthyQuanInput.value) === 0) {
        healthyQuanP.style.opacity = "1";
        healthyQuanCheck.style.display = "none";
        healthyQuanP.innerHTML = "Max 3<br>per week";
        healthyQuanP.style.left = "18px";
        healthyOrderBtn.style.pointerEvents = "none";

    } else if (Number(healthyQuanInput.value) >= 1 || Number(healthyQuanInput.value) <= 3) {
        healthyQuanP.innerHTML = "How<br>Many?";
        healthyQuanP.style.left = "23px";
        healthyOrderBtn.style.pointerEvents = "auto";

        if (document.querySelector('[name=mix_healthy]').checked === true) {
            healthyUpdateBool = true;
            healthyQuanP.style.opacity = "1";
            healthyQuanCheck.style.display = "none";
            healthyOrderBtn.innerText = "Update Quantity";
            healthyOrderBtn.style.pointerEvents = "auto";
        }
    }

}

function healthyCloseBtn() { // hidden tab close button
    healthyBool = false;
    healthyUpdateBool = false;

    function panelClose() { // close button panel
        healthyOrderBtn.innerText = "Place Order";
        healthyPane.classList.remove("mix-btn-pane-open");
        healthyOrderBtn.classList.remove('mix-button-clicked');
        healthyQuan.classList.remove('mix-quantity-clicked');
        healthyClose.classList.remove('mix-remove-clicked');
        setTimeout(() => {
            healthyPane.style.transition = "border .25s ease-out .1s, box-shadow .25s ease-out .1s";
        }, 200);
    }

    if (healthyClose.innerText === "Remove") { // if product already added
        document.querySelector(".wyld-form-mix input[name=healthy-num]").value = "0";
        document.querySelector('[name=mix_healthy]').checked = false;
        healthyQuanCheck.style.display = "none";
        healthyQuanInput.value = "0";
        healthyOrderBtn.innerText = "Deleted from Order";
        healthyQuanP.style.opacity = "0";
        healthyQuanCross.style.display = "block";
        healthyClose.style.pointerEvents = "none";
        setTimeout(() => {
            healthyOrderBtn.style.pointerEvents = "auto";
            panelClose();
        }, 2000);
        setTimeout(() => {
            healthyQuanCross.style.display = "none";
            healthyQuanP.style.opacity = "1";
            healthyQuanInput.value = "1";
            healthyClose.innerText = "Close";
            healthyClose.style.pointerEvents = "auto";
        }, 2300);
    } else { // if no product added
        panelClose();
    }
}

function sendHealthyData() {
    healthyOrderBtn.innerText = "Added to Order!";
    healthyOrderBtn.style.pointerEvents = "none";
    healthyQuanP.style.opacity = "0";
    healthyQuanCheck.style.display = "block";
    document.querySelector(".wyld-form-mix input[name=healthy-num]").value = healthyQuanInput.value;
    addToOrder('mix_healthy');
}

function displayBulkDiscount() {
    bulkDiscount.style.display = "block"
}

function hideBulkDiscount() {
    bulkDiscount.style.display = "none"
}

let farmersCheck = document.querySelector(".mix-wrap input[name=mix_farmers]");

function farmersCheckbox() {
    if (farmersCheck.checked === false) {
        farmersCloseBtn();
    } else if (farmersCheck.checked === true) {
        farmersMix();
        farmersMix();
    }
    getPriceTotal();
}

function farmersInput() {
    if (Number(document.querySelector(".mix-wrap input[name=farmers-num]").value) >= 4) {
        document.querySelector(".mix-wrap input[name=farmers-num]").value = "3";
    }

    if ( bulkMaxBool === true ) {
        if (Number(document.querySelector(".mix-wrap input[name=farmers-num]").value) >= 1) {
            document.querySelector(".mix-wrap input[name=farmers-num]").value = "1";
        }
    }

    if (farmersCheck.checked === false) {
        farmersMix();
        farmersMix();

    } else if (farmersCheck.checked === true) {
        farmersQuanInput.value = document.querySelector(".mix-wrap input[name=farmers-num]").value;
    }
    Number(formFarmersQuan.value) === 3 ? displayBulkDiscount() : hideBulkDiscount();
    getPriceTotal();

}

let spicyCheck = document.querySelector(".mix-wrap input[name=mix_spicy]");

function spicyCheckbox() {
    if (spicyCheck.checked === false) {
        spicyCloseBtn();
    } else if (spicyCheck.checked === true) {
        spicyMix();
        spicyMix();
    }
    getPriceTotal();

}

function spicyInput() {

    if (Number(document.querySelector(".mix-wrap input[name=spicy-num]").value) >= 4) {
        document.querySelector(".mix-wrap input[name=spicy-num]").value = "3";
    }

    if ( bulkMaxBool === true ) {
        if (Number(document.querySelector(".mix-wrap input[name=spicy-num]").value) >= 1) {
            document.querySelector(".mix-wrap input[name=spicy-num]").value = "1";
        }
    }

    if (spicyCheck.checked === false) {
        spicyMix();
        spicyMix();

    } else if (spicyCheck.checked === true) {
        spicyQuanInput.value = document.querySelector(".mix-wrap input[name=spicy-num]").value;
    }
    Number(formSpicyQuan.value) === 3 ? displayBulkDiscount() : hideBulkDiscount();
    getPriceTotal();

}

let saladCheck = document.querySelector(".mix-wrap input[name=mix_salad]");

function saladCheckbox() {
    if (saladCheck.checked === false) {
        saladCloseBtn();
    } else if (saladCheck.checked === true) {
        saladMix();
        saladMix();
    }
    getPriceTotal();

}

function saladInput() {
    if (Number(document.querySelector(".mix-wrap input[name=salad-num]").value) >= 4) {
        document.querySelector(".mix-wrap input[name=salad-num]").value = "3";
    }

    if ( bulkMaxBool === true ) {
        if (Number(document.querySelector(".mix-wrap input[name=salad-num]").value) >= 1) {
            document.querySelector(".mix-wrap input[name=salad-num]").value = "1";
        }
    }


    if (saladCheck.checked === false) {
        saladMix();
        saladMix();

    } else if (saladCheck.checked === true) {
        saladQuanInput.value = document.querySelector(".mix-wrap input[name=salad-num]").value;
    }
    Number(formSaladQuan.value) === 3 ? displayBulkDiscount() : hideBulkDiscount();
    getPriceTotal();

}

let healthyCheck = document.querySelector(".mix-wrap input[name=mix_healthy]");

function healthyCheckbox() {
    if (healthyCheck.checked === false) {
        healthyCloseBtn();
    } else if (healthyCheck.checked === true) {
        healthyMix();
        healthyMix();
    }
    getPriceTotal();

}

function healthyInput() {

    if (Number(document.querySelector(".mix-wrap input[name=healthy-num]").value) >= 4) {
        document.querySelector(".mix-wrap input[name=healthy-num]").value = "3";
    }

    if ( bulkMaxBool === true ) {
        if (Number(document.querySelector(".mix-wrap input[name=healthy-num]").value) >= 1) {
            document.querySelector(".mix-wrap input[name=healthy-num]").value = "1";
        }
    }

    if (healthyCheck.checked === false) {
        healthyMix();
        healthyMix();

    } else if (healthyCheck.checked === true) {
        healthyQuanInput.value = document.querySelector(".mix-wrap input[name=healthy-num]").value;
    }
    Number(formHealthyQuan.value) === 3 ? displayBulkDiscount() : hideBulkDiscount();
    getPriceTotal();

}

// function bulkPriceDisplay() {
//     if (formCheckBulk.checked === true) {
//         formFarmersQuan.value = "3";
//         formHealthyQuan.value = "3";
//         formSaladQuan.value = "3";
//         formSpicyQuan.value = "3";
//         formCustomQuan.value = "3";
//         document.querySelector('.num-2').style.opacity = "0";
//         document.querySelector('.num-3').style.opacity = "0";
//     } else {
//         // formFarmersQuan.value = "";
//         // formHealthyQuan.value = "";
//         // formSaladQuan.value = "";
//         // formSpicyQuan.value = "";
//         // formCustomQuan.value = "";
//         document.querySelector('.num-2').style.opacity = "1";
//         document.querySelector('.num-3').style.opacity = "1";
//     }
// }

let formCheckWeekly = document.querySelector('[name=weekly]');
let formCheckOnetime = document.querySelector('[name=one_time]');
let formCheckBulk = document.querySelector('[name=bulk]');
let formFarmersQuan = document.querySelector('[name=farmers-num]');
let formHealthyQuan = document.querySelector('[name=healthy-num]');
let formSaladQuan = document.querySelector('[name=salad-num]');
let formSpicyQuan = document.querySelector('[name=spicy-num]');
let formCustomQuan = document.querySelector('[name=custom-num]');
let formTotalPrice = document.querySelector('[name=total-num]');

function getPriceTotal() {
    let planPrice;
    function getPlanPrice(input) {
        planPrice = input;
    }

    formCheckWeekly.checked === true && getPlanPrice(10);
    formCheckOnetime.checked === true && getPlanPrice(12);
    formCheckBulk.checked === true && getPlanPrice(30);

 

    function getTotalQuantity() {
        let checkList = Array.from(document.querySelectorAll('.wyld-form-mix input[type=number]'));
        let totalQuantity = 0;
        // console.log(checkList.value)

        for ( let i = 0; i <= checkList.length - 2; i++ ) {
           
            totalQuantity += Number(checkList[i].value);
        } 
        return totalQuantity;

    }
    // getTotalQuantity();
    let price = getTotalQuantity() * planPrice;

    formTotalPrice.value = price;
}


// || Contact form check for field input then change button color 

function formFieldCheck() {
    let name = document.forms["contact"]["user_name"].value;
    let email = document.forms["contact"]["user_email"].value;
    let message = document.forms["contact"]["message"].value;
    let elem = document.getElementById("contact-button");

    if (name == "" || email == "" || message == "") {
        elem.style.backgroundColor = "var(--primary-light)";
        elem.style.pointerEvents = "none";
        elem.style.color = "var(--copy-dark)";

    } else {
        elem.style.backgroundColor = "var(--primary-color)";
        elem.style.pointerEvents = "auto";
        elem.style.color = "var(--highlight)";
    }
}

function sendingText() {
    let elem = document.getElementById("contact-button");
    elem.innerText = "Sending";
}


// || Hamburger Menu for "LumberJack"


function hamburger() {

    let bar1 = document.getElementById("h-bar1");
    let bar2 = document.getElementById("h-bar2");
    let bar3 = document.getElementById("h-bar3");
    let menu = document.getElementById("h-menu");

    function menuOpen() {

        let barsPos = 0;
        let barsRot = 0;
        let bar2Vis = 1;
        let menuPos = 20;

        let animA = setInterval(barMid, 8);

        // middle bar disappear
        function barMid() {
            if (bar2Vis < 0.1) {
                // normally clearInterval would be executed when value reaches 0, but due to bit arithmetic 
                // 0.1 - 0.1 is displayed in extended notation. 
                clearInterval(animA);
                // reset opacity to typical value for consistency.
                bar2Vis = 0;
                bar2.style.opacity = bar2Vis;
            } else {
                bar2Vis = bar2Vis - 0.1;
                bar2.style.opacity = bar2Vis;
            }
        }

        // top and bottom bars move and rotate
        setTimeout(function () {

            let animB = setInterval(barMove, 30);

            function barMove() {
                if (barsPos == 8) {
                    clearInterval(animB);
                } else {
                    barsPos++;
                    bar1.style.top = barsPos + "px";
                    bar3.style.bottom = barsPos + "px";
                }
            }

            setTimeout(function () {

                let animC = setInterval(barRotation, 2);

                function barRotation() {
                    if (barsRot == 45) {
                        clearInterval(animC);
                    } else {
                        barsRot++;
                        bar1.style.transform = "rotate(" + barsRot + "deg)";
                        bar3.style.transform = "rotate(-" + barsRot + "deg)";
                    }
                }
            }, 70);

        }, 50);

        let animD = setInterval(menuAppear, 1);

        function menuAppear() {
            if (menuPos == 65) {
                clearInterval(animD);
            } else {
                menuPos++;
                menu.style.top = menuPos + "px";
            }
        }

    }

    function menuClose() {
        let barsPos = 8;
        let barsRot = 45;
        let bar2Vis = 0;
        let menuPos = 65;

        setTimeout(function () {

            let animA = setInterval(barMid, 8);

            function barMid() {
                if (bar2Vis > 0.9) {
                    clearInterval(animA);
                } else {
                    bar2Vis = bar2Vis + 0.1;
                    bar2.style.opacity = bar2Vis;
                }
            }
        }, 150);

        let animB = setInterval(barMove, 30);

        function barMove() {
            if (barsPos == 0) {
                clearInterval(animB);
            } else {
                barsPos--;
                bar1.style.top = barsPos + "px";
                bar3.style.bottom = barsPos + "px";
            }
        }

        setTimeout(function () {
            let animC = setInterval(barRotation, 2);

            function barRotation() {
                if (barsRot == 0) {
                    clearInterval(animC);
                } else {
                    barsRot--;
                    bar1.style.transform = "rotate(" + barsRot + "deg)";
                    bar3.style.transform = "rotate(-" + barsRot + "deg)";
                }
            }
        }, 30);

        let animD = setInterval(menuAppear, 1);

        function menuAppear() {
            if (menuPos == 20) {
                clearInterval(animD);
            } else {
                menuPos--;
                menu.style.top = menuPos + "px";
            }
        }

    }

    // Boolean check for menu checkbox 

    if (document.getElementById("h-menu-input").checked == true) {
        menuOpen();
        document.getElementById("h-box").style.backgroundColor = "var(--highlight)";
    } else {
        menuClose();
        document.getElementById("h-box").style.backgroundColor = "var(--primary-pale)";
    }

}

document.querySelector("#plan-button").addEventListener('click', () => {
    window.location.href = "#pick-plan";
    window.scrollBy(0, -50);
});

document.querySelector("#mix-button").addEventListener('click', () => {
    window.location.href = "#pick-mix";
    window.scrollBy(0, -50);
});

document.querySelector("#order-button").addEventListener('click', () => {
    window.location.href = "#order-form";
    window.scrollBy(0, -50);
});

// || Blog Main hover event - Needs refactor. Does not work in firefox, produces error if inspector is open.

function mouseHover(event) {
    let path = event.path;
    let parent;
    let btn;

    path.forEach(findName);

    function findName(item) {
        if (item.className == "card card--blog-main") {
            parent = item;
            btn = parent.children[0].children[1].children[0].children[2];
            btn.style.backgroundColor = "var(--secondary-color)";
            btn.style.color = "white";
            parent.addEventListener("mouseout", function () {
                btn.style.backgroundColor = "var(--secondary-pale)";
                btn.style.color = "var(--copy-dark)";
            })
        }

    }

}


// || Footer Social Share Menu 

let shareBool = true;
let menuPos = 0;

function footerShare() {

    let shareMenu = document.getElementById("share-menu");
    let menuButton = document.getElementById("footer-share");

    function shareOpen() {

        let shareAnimA = setInterval(menuOn, 1);

        function menuOn() {
            if (menuPos == -56) {
                clearInterval(shareAnimA);
                shareBool = false;
            } else {
                menuPos--
                shareMenu.style.top = menuPos + "px";
            }
        }
    }

    function shareClose() {

        let shareAnimB = setInterval(menuOff, 1);

        function menuOff() {
            if (menuPos == 0) {
                clearInterval(shareAnimB);
                shareBool = true;
            } else {
                menuPos++;
                shareMenu.style.top = menuPos + "px";
            }
        }
    }

    if (shareBool == true) {
        shareOpen();
        menuButton.style.backgroundColor = "var(--primary-color)";
    } else {
        shareClose();
        menuButton.style.backgroundColor = "var(--secondary-light)";
    }

}


// || Open share menu on load 

function shareIfBlog() {
    let check = document.title;
    if (check == "Blog Post" || check == "Blog") {
        footerShare();
    }
}



// || Blog post url character matching - Not working.

// function postReplace(x) {
//     let objA = "location.href='./posts/"
//     let temp = x.replace(/ /g, "-").replace(/\'/g, "").replace(/\,/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\./g, "").replace(/\//g, "").replace(/\"/g, "");
//     let z = objA + temp;
//     console.log(z);
//     return z
// }

/* || END of document  */