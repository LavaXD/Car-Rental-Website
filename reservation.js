
// ------- RESERVATION PAGE -----

if (sessionStorage.length == 0) {
    document.querySelector('.all').innerHTML = 'No reserved car!';
}

$(function () {
    $("#pickUpPicker").datepicker({
        dateFormat: "yy-mm-dd"
    });
});
$(function () {
    $("#returnPicker").datepicker({
        dateFormat: "yy-mm-dd"
    });
});

let dayDiff = 0;
$("#returnPicker").change(function () {
    //check if pickup date is selected
    if ($("#pickUpPicker").val() == '') {
        sessionStorage.removeItem('return');
        location.reload();
        alert('Must select a pick up time first!');
        return;
    }
    let pickDate = new Date($("#pickUpPicker").val());
    let returnDate = new Date($("#returnPicker").val());

    //save dates info into session
    sessionStorage.setItem('pickup', pickDate);
    sessionStorage.setItem('return', returnDate);

    let diff = returnDate - pickDate;
    dayDiff = Math.ceil(diff / (1000 * 3600 * 24));
    //check if pickup date is before return date
    if (dayDiff < 1) {
        alert('Return date must be at least one day after pick up date!')
        dayDiff = 0;
        sessionStorage.removeItem('pickup');
        sessionStorage.removeItem('return');
        location.reload();
    }

    sessionStorage.setItem('dayDiff', dayDiff);
    //calculate subtotal
    subtotal.innerText = '$' + qty.innerText * price.innerText * dayDiff;
    sessionStorage.setItem('subtotal', subtotal.innerText);

});

//format date
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

//if dates of a car already in session, save the dates info for further use
if (sessionStorage.getItem('return') != null) {
    document.getElementById('pickUpPicker').value = formatTimestamp(sessionStorage.getItem('pickup'));
    document.getElementById('returnPicker').value = formatTimestamp(sessionStorage.getItem('return'));
}

let cars = null;
// get data from file json
fetch('cars.json')
    .then(response => response.json())
    .then(data => {
        cars = data;
    });

//get car's name from the id passed from index.html and local storage
const carName = document.querySelector('.reserveH h2');
carName.innerHTML = JSON.parse(sessionStorage.getItem('car')).name;

//get cars'img
const img = document.querySelector('.reserveB img');
img.src = JSON.parse(sessionStorage.getItem('car')).image;

//get car's price
const price = document.querySelector('.carInfo span');
price.innerHTML = JSON.parse(sessionStorage.getItem('car')).price;

//get other info
const mode = document.querySelector('.otherInfo #mode');
mode.innerHTML = JSON.parse(sessionStorage.getItem('car')).mode;

// const seats = document.querySelector('.otherInfo #seats');
seats.innerHTML = JSON.parse(sessionStorage.getItem('car')).seats + ' Seats';
const bags = document.querySelector('.otherInfo #bags');
bags.innerHTML = JSON.parse(sessionStorage.getItem('car')).seats + ' Bags';
const color = document.querySelector('.otherInfo #color');
color.innerHTML = JSON.parse(sessionStorage.getItem('car')).color;
const brand = document.querySelector('.otherInfo #brand');
brand.innerHTML = JSON.parse(sessionStorage.getItem('car')).brand;
const mile = document.querySelector('.otherInfo #milage');
mile.innerHTML = JSON.parse(sessionStorage.getItem('car')).mileage + ' Miles';

//get totoal price element and qty element
const subtotal = document.querySelector('.subtotal');
const qty = document.getElementById('qty');

//change qty
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');

minus.addEventListener('click', function () {
    if (qty.innerText == 1 || qty.innerText == 0) {
        window.location.href = 'index.html';
    }
    sessionStorage.setItem('qty', qty.innerText - 1);
    qty.innerText = sessionStorage.getItem('qty');
    dayDiff = sessionStorage.getItem('dayDiff');
    //calculate subtotal
    subtotal.innerText = '$' + qty.innerText * price.innerText * dayDiff;
    // sessionStorage.setItem('subtotal', subtotal.innerText);
});

plus.addEventListener('click', function () {

    //check if qty > stock
    if (qty.innerText == JSON.parse(sessionStorage.getItem('car')).quantity) {
        alert('Reach the maximum amount !');
        return;
    }
    sessionStorage.setItem('qty', +qty.innerText + 1);
    qty.innerText = sessionStorage.getItem('qty');
    dayDiff = sessionStorage.getItem('dayDiff');
    //calculate subtotal
    subtotal.innerText = '$' + qty.innerText * price.innerText * dayDiff;
    // sessionStorage.setItem('subtotal', subtotal.innerText);
});

function cancel() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

//form validation
let number = document.getElementById('validationNumber');
number.addEventListener('blur', function () {
    const regx = /^\d{10}$/;
    if (!regx.test(number.value)) {
        alert('Mobile number must be 10 digits!');
    }
    return;
});

let n = document.getElementById('validationName');
n.addEventListener('blur', function () {
    const regx = /^[A-Za-z\s]*$/;
    if (!regx.test(n.value)) {
        alert('Name must be letters only!');
    }
    return;
});

//when submitting form
const form = document.querySelector('.infoForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    //check if dates are selected
    if (document.getElementById('pickUpPicker').value == '' || document.getElementById('pickUpPicker').value == '') {
        alert('Must choose the pick up and return date!');
        return;
    }

    //recheck qty
    let c = cars.find(car => car.name == JSON.parse(sessionStorage.getItem('car')).name);
    if (c.quantity < sessionStorage.getItem('qty')) {
        alert(sessionStorage.getItem('qty') + ' ' + c.name + ' is unavailable due to insufficient stock!');
    }

    const currentTime = new Date().getTime();
    //send ajax request to php file to save data into DB
    let email = document.getElementById('exampleFormControlInput1');
    $.ajax({
        url: "orderDetail.php",
        type: "GET",
        contentType: "application/json",
        data: ({
            'currentTime': currentTime,
            'name': n.value,
            'number': number.value,
            'email': email.value,
            'carName': c.name,
            'carImg': c.image,
            'pickup': formatTimestamp(sessionStorage.getItem('pickup')),
            'return': formatTimestamp(sessionStorage.getItem('return')),
            'qty': sessionStorage.getItem('qty'),
            'subtotal': sessionStorage.getItem('subtotal')
        }),
        success: function (response) {
            window.location.href = `confirm.php?currentTime=${currentTime}&name=${n.value}&number=${number.value}&email=${email.value}&carName=${c.name}&carImg=${c.image}&pickup=${formatTimestamp(sessionStorage.getItem('pickup'))}&return=${formatTimestamp(sessionStorage.getItem('return'))}&qty=${sessionStorage.getItem('qty')}&subtotal=${sessionStorage.getItem('subtotal') }`;
            alert(response);
        },
    });

});

