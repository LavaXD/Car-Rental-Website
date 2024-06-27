let cars = null;
let i = 1;
// get data from file json
fetch('cars.json')
    .then(response => response.json())
    .then(data => {
        cars = data;
        addCarsToHTML();
        addBrandToTHML();
        addTypeToTHML();
        //add cars into local storage
        // cars.forEach(car => {
        //     localStorage.setItem(i, JSON.stringify(car));
        //     i++;
        // });
    });

function clickRent(car) {

    sessionStorage.setItem('car', car);
    sessionStorage.setItem('qty', 1);
    window.location.href = 'reservation.html';
}

// show datas product in list
function addCarsToHTML() {
    // remove datas default from HTML
    let Card = document.querySelector('.layout');
    Card.innerHTML = '';

    // add new datas
    if (cars != null) // if has data
    {
        cars.forEach(car => {
            let strCar = JSON.stringify(car).replace(/"/g, '&quot;');
            let newCar = document.createElement('div');
            newCar.classList.add('Card');
            newCar.innerHTML =
                `<div class="card-h">
                    <span>${car.name}</span>
                </div>
                <div class="card-inner">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <img src="${car.image}" alt="">
                    </div>
                    <div style="display: flex;align-items: center;">
                        <ul>
                            <li>${car.mode}</li>
                            <li>${car.seats} Seat</li>
                            <li>${car.quantity} Left</li>
                        </ul>
                    </div>
                </div>
                <div class="card-foot">
                    $&nbsp;<span style="font-size: 40px;font-weight: bold;"> ${car.price} </span> &nbsp;/ Day
                </div>`;
            //check if qty == 0, if yes use disabled button format
            if (car.quantity == 0) {
                let btnHTML = `
                <div class="selectBtn">
                    <button class="disable">OUT OF STOCK</button>
                </div>
                `;
                newCar.innerHTML += btnHTML;
            } else {
                let btnHTML = `
                <div class="selectBtn">
                    <button id="normal" onclick="clickRent(' ${strCar} ');">RENT</button>
                </div>
                `;
                newCar.innerHTML += btnHTML;
            }
            Card.appendChild(newCar);

        });
    }

}
function addBrandToTHML() {

    // remove datas default from HTML
    let categories = document.querySelector('.brands');
    categories.innerHTML = '';

    //remove duplicate brands
    let brands = new Array(0);
    if (cars != null) {
        cars.forEach(car => {
            brands.push(car.brand);
        });
    }
    let uniqueBrands = [...new Set(brands)];
    // add new datas
    if (uniqueBrands != null) {// if has data
        uniqueBrands.forEach(brand => {

            let newCategory = document.createElement('button');
            newCategory.classList.add('btn');
            newCategory.classList.add('btn-secondary');
            newCategory.classList.add('btn-lg');
            newCategory.innerHTML = brand;

            //add click event to every brand btn
            newCategory.addEventListener('click', function () {
                let Card = document.querySelector('.layout');
                Card.innerHTML = '';

                // add new datas
                if (cars != null) // if has data
                {
                    cars.forEach(car => {
                        if (brand == car.brand) {
                            let strCar = JSON.stringify(car).replace(/"/g, '&quot;');
                            let newCar = document.createElement('div');
                            newCar.classList.add('Card');
                            newCar.innerHTML =
                                `<div class="card-h">
                    <span>${car.name}</span>
                </div>
                <div class="card-inner">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <img src="${car.image}" alt="">
                    </div>
                    <div style="display: flex;align-items: center;">
                        <ul>
                            <li>${car.mode}</li>
                            <li>${car.seats} Seat</li>
                            <li>${car.quantity} Left</li>
                        </ul>
                    </div>

                </div>
                <div class="card-foot">
                    $&nbsp;<span style="font-size: 40px;font-weight: bold;"> ${car.price} </span> &nbsp;/ Day
                </div>`;
                            //check if qty == 0, if yes use disabled button format
                            if (car.quantity == 0) {
                                let btnHTML = `
                <div class="selectBtn">
                    <button class="disable" onclick="clickRent(' ${strCar} ');">OUT OF STOCK</button>
                </div>
                `;
                                newCar.innerHTML += btnHTML;
                            } else {
                                let btnHTML = `
                <div class="selectBtn">
                    <button id="normal" onclick="clickRent(' ${strCar} ');">RENT</button>
                </div>
                `;
                                newCar.innerHTML += btnHTML;
                            }

                            Card.appendChild(newCar);
                        }
                    });
                }
            });

            categories.appendChild(newCategory);
        });
    }
}
function addTypeToTHML() {

    // remove datas default from HTML
    let types = document.querySelector('.types');
    types.innerHTML = '';

    //remove duplicate brands
    let type = new Array(0);
    if (cars != null) {
        cars.forEach(car => {
            type.push(car.type);
        });
    }
    let uniqueTypess = [...new Set(type)];
    // add new datas
    if (uniqueTypess != null) {// if has data
        uniqueTypess.forEach(type => {

            let newType = document.createElement('button');
            newType.classList.add('btn');
            newType.classList.add('btn-secondary');
            newType.classList.add('btn-lg');
            newType.innerHTML = type;
            newType.addEventListener('click', function () {
                let Card = document.querySelector('.layout');
                Card.innerHTML = '';

                // add new datas
                if (cars != null) // if has data
                {
                    cars.forEach(car => {
                        if (type == car.type) {
                            let strCar = JSON.stringify(car).replace(/"/g, '&quot;');
                            let newCar = document.createElement('div');
                            newCar.classList.add('Card');
                            newCar.innerHTML =
                                `<div class="card-h">
                    <span>${car.name}</span>
                </div>
                <div class="card-inner">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <img src="${car.image}" alt="">
                    </div>
                    <div style="display: flex;align-items: center;">
                        <ul>
                            <li>${car.mode}</li>
                            <li>${car.seats} Seat</li>
                            <li>${car.quantity} Left</li>
                        </ul>
                    </div>

                </div>
                <div class="card-foot">
                    $&nbsp;<span style="font-size: 40px;font-weight: bold;"> ${car.price} </span> &nbsp;/ Day
                </div>`;
                            //check if qty == 0, if yes use disabled button format
                            if (car.quantity == 0) {
                                let btnHTML = `
                <div class="selectBtn">
                    <button class="disable" onclick="clickRent(' ${strCar} ');">OUT OF STOCK</button>
                </div>
                `;
                                newCar.innerHTML += btnHTML;
                            } else {
                                let btnHTML = `
                <div class="selectBtn">
                    <button id="normal" onclick="clickRent(' ${strCar} ');">RENT</button>
                </div>
                `;
                                newCar.innerHTML += btnHTML;
                            }

                            Card.appendChild(newCar);
                        }
                    });
                }
            });

            types.appendChild(newType);
        });
    }
}










