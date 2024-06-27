
const ul = document.querySelector('.searchResults');
const input = document.getElementById('searchInput');
let res = [];

//fuzzy query
input.addEventListener('input', function () {

    //each time user input, clear the res array
    res = [];
    ul.style.display = 'none';

    if (this.value.length != 0) {
        cars.forEach(car => {
            if (car.name.toLowerCase().includes(this.value)) {
                res.push(car.name);
                ul.style.display = 'block';
            }
        });

    }
    addResToHtml(res);
});

//add li to html
function addResToHtml(res) {
    //remove initial content
    ul.innerHTML = '';

    //add res
    if (res != null) {
        res.forEach(name => {
            let li = document.createElement('li');
            li.innerText = name;
            li.addEventListener('click', function () {
                input.value = name;
                ul.innerHTML = '';
                ul.style.display = 'none';
            });
            ul.appendChild(li);
        });
    }
}

//core function to check the value in input
document.querySelector('.search-box button').addEventListener('click', function () {

    let c = cars.find(car => car.name == input.value);

    if (c != undefined) {
        if (cars.find(car => car.name == input.value).quantity == 0) {
            alert('This car is currently unavailable due to insufficient stock!');
            return;
        }
        sessionStorage.setItem('car', JSON.stringify(c));
        location.href = 'reservation.html';
    } else {
        alert('NO SUCH ITEM!');
    }
});

//when mouse lose focus on input, clear ul
document.querySelector('.search-box').addEventListener('mouseleave', function () {
    //remove initial content
    input.value = '';
    ul.style.display = 'none';
    ul.innerHTML = '';
});

