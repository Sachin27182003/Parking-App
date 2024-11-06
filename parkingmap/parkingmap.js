// Check for payment success status on page load
const details = new URLSearchParams(window.location.search);
const vehicleType = details.get('vehicleType');
const name = details.get('name');
const phone = details.get('mobileNumber');

console.log(vehicleType)
window.addEventListener('load', function() {
    const buttonIds = JSON.parse(localStorage.getItem('buttonIds'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (buttonIds) {
        buttonIds.forEach(buttonId =>{

        const responseButton = document.getElementById(buttonId);
        if (responseButton) {
            responseButton.style.backgroundColor = 'red'; // Change button color to red
        }

    })
    }

    const NEV1 = document.getElementsByClassName('spaces');
    const NEV2 = document.getElementsByClassName('spaces2');
    const NEV3 = document.getElementsByClassName('spaces3');
    const NEV4 = document.getElementsByClassName('spaces4');
    const EVC = document.getElementsByClassName('spaces5');
    const EV1 = document.getElementsByClassName('spaces6');
    const EV2 = document.getElementsByClassName('spaces7');
    const B1 = document.getElementsByClassName('spaces8');
    const B2 = document.getElementsByClassName('spaces9');
    const B3 = document.getElementsByClassName('spaces10');
    const B4 = document.getElementsByClassName('spaces11');

   if(vehicleType === "Non-Electronic Vehicles"){

    
    for (let i = 0; i < 13; i++) {
        
        EVC[i].style.backgroundColor = 'red';
        EV1[i].style.backgroundColor = 'red';
        EV2[i].style.backgroundColor = 'red';
    }
    for (let i = 0; i < 20; i++) {    
        B1[i].style.backgroundColor = 'red';
        B2[i].style.backgroundColor = 'red';
        B3[i].style.backgroundColor = 'red';
        B4[i].style.backgroundColor = 'red';
    }

   } else if(vehicleType === 'Electronic Vehicles'){
    
    for (let j = 0; j < 20; j++) { 
        B1[j].style.backgroundColor = 'red';
        B2[j].style.backgroundColor = 'red';
        B3[j].style.backgroundColor = 'red';
        B4[j].style.backgroundColor = 'red';
    }
    for (let i = 0; i < 15; i++) {
        NEV1[i].style.backgroundColor = 'red';
    }
    for (let i = 0; i < 13; i++) {
        NEV2[i].style.backgroundColor = 'red';
        NEV3[i].style.backgroundColor = 'red';
        NEV4[i].style.backgroundColor = 'red';
        EVC[i].style.backgroundColor = 'red';
    }
   
   } else if(vehicleType == "Electronic Vehicles   Charging"){

    for (let i = 0; i < 15; i++) {
        NEV1[i].style.backgroundColor = 'red';
    }
    for (let i = 0; i < 13; i++) {
        NEV2[i].style.backgroundColor = 'red';
        NEV3[i].style.backgroundColor = 'red';
        NEV4[i].style.backgroundColor = 'red';
        EV1[i].style.backgroundColor = 'red';
        EV2[i].style.backgroundColor = 'red';
    }
    for (let i = 0; i < 20; i++) { 
        B1[i].style.backgroundColor = 'red';
        B2[i].style.backgroundColor = 'red';
        B3[i].style.backgroundColor = 'red';
        B4[i].style.backgroundColor = 'red';
    }

   } else if(vehicleType === 'Two Wheller Vehicles'){
    
    for (let i = 0; i < 15; i++) {
        NEV1[i].style.backgroundColor = 'red';
    }
    for (let i = 0; i < 13; i++) {
       
        NEV2[i].style.backgroundColor = 'red';
        NEV3[i].style.backgroundColor = 'red';
        NEV4[i].style.backgroundColor = 'red';
        EVC[i].style.backgroundColor = 'red';
        EV1[i].style.backgroundColor = 'red';
        EV2[i].style.backgroundColor = 'red';
    }

   }

});

    window.addEventListener('load', function() {
});

// The rest of your previous parkingmap.js code
let button;
let buttonId;

function handleButtonClick(event) {
    button = event.target.closest('button');

    if (button) {
        buttonId = button.id;

        const responseButton = document.getElementById(buttonId);

        if(responseButton.style.backgroundColor === 'red'){
            alert('This space is already Booked');
        } else {
            window.location.href = `../payment/payment.html?buttonId=${buttonId}&vehicleType=${vehicleType}&name=${name}&mobileNumber=${phone}`; // Pass button ID to the next page
        }
       
    }
}

// Select all buttons with class 'spaces' and other classes
const buttonClasses = ['spaces', 'spaces2', 'spaces3', 'spaces4', 'spaces5', 'spaces6', 'spaces7', 'spaces8', 'spaces9', 'spaces10', 'spaces11'];
buttonClasses.forEach(className => {
    const buttons = document.querySelectorAll(`.${className}`);
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});

// Existing form and booking logic...
