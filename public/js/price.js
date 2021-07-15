let formQuanList = Array.from(document.querySelectorAll('.wyld-form-mix input[type=number]'));
let formCustomQuanList = Array.from(document.querySelectorAll('.order input'));
let formCheckList = Array.from(document.querySelectorAll('.wyld-form-mix input[type=checkbox]'));
let bulkDiscount = document.querySelector('.bulk-discount-pane');

let bulkMaxBool = false;

function bulkMax() {
    bulkMaxBool = true;

    formQuanList.forEach((item, i) => {
        if (i !== formCheckList.length - 1) {
            if (formCheckList[i].checked === true) {
                item.value = "1";
            } else {
                item.value = "";
            }
            item.max = "1";
        }
    });

    formCustomQuanList.forEach((item) => {
        if (Number(item.value) > 0) {
            item.value = "1";
        } else {
            item.value = "";
        }
        item.max = "1";
    });
    // getTotalCustom();
    getPriceTotal(2);
}

function bulkMaxOff() {

    if (bulkMaxBool === true) {

        formQuanList.forEach((item, i) => {
            if (formCheckList[i].checked === false) {
                item.value = "";
            } else {
                item.value = "1";
            }
            item.max = "3";
        });

        formCustomQuanList.forEach((item) => {
            if (Number(item.value) > 0) {
                item.value = "1";
            } else {
                item.value = "";
            }
            item.max = "3";
        });

    }

    bulkMaxBool = false;
    // getTotalCustom();
    getPriceTotal(1);

}

function discountDisplayHandler() {
    displayBulkDiscount();
    hideBulkDiscount();
}

function displayBulkDiscount() {
    bulkDiscount.style.display = "block";
}

function hideBulkDiscount() {
    let discountBool = false
    let temp = [...formQuanList];
    temp.pop();
    let list = temp.concat(formCustomQuanList);
    list.forEach((item) => {
        if (Number(item.value) === 3) {
            discountBool = true;
        }
    });
    if (discountBool === false) {
        bulkDiscount.style.display = "none";
    }
}


function getPriceTotal(id) {
    
    let planPrice;
    let price;
    
    function getPlanPrice(input) {
        planPrice = input;
    }
    
    getTotalCustom();
    formCheckWeekly.checked === true && getPlanPrice(10);
    formCheckOnetime.checked === true && getPlanPrice(12);
    formCheckBulk.checked === true && getPlanPrice(30);
    
    
    let checkList = Array.from(document.querySelectorAll('.wyld-form-mix input[type=number]'));
    let totalQuantity = 0;
    
    for (let i = 0; i <= checkList.length - 1; i++) {
        
        totalQuantity += Number(checkList[i].value);
    }
    console.log(`${id}: ${totalQuantity}`);
    
    
    price = totalQuantity * planPrice;

    formTotalPrice.value = price;
}