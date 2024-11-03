const user = new URLSearchParams(window.location.search);
const Username = user.get('name');
const vehicleType = user.get('vehicleType');
const mobileNumber = user.get('mobileNumber');

function price(){
    if(vehicleType === 'Non-Electronic Vehicles'){
        return 50;
    } else if(vehicleType === 'Electronic Vehicles'){
        return 50;
    } else if(vehicleType === 'Electronic Vehicles   Charging'){
        return 70;
    } else if(vehicleType === 'Two Wheller Vehicles'){
        return 30;
    }
    
}

const dateInput = document.getElementById('parking-date');
const today = new Date();

// Get today's date in YYYY-MM-DD format
const todayStr = today.toISOString().split('T')[0];

// Get date 30 days from today
const maxDate = new Date();
maxDate.setDate(today.getDate() + 30);
const maxDateStr = maxDate.toISOString().split('T')[0];

// Set the min and max attributes
dateInput.setAttribute('min', todayStr);
dateInput.setAttribute('max', maxDateStr);

// Handle form submission
const form = document.getElementById('parking-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const parkingDate = document.getElementById('parking-date').value;

    // Hide the booking form and show the booking details
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-details').style.display = 'block';
    document.getElementById('booking-pdf').style.display = 'none';

    // Populate booking details
    document.getElementById('details-name').textContent = `Name: ${Username}`;
    document.getElementById('details-date').textContent = `Date: ${parkingDate}`;
    document.getElementById('details-time').textContent = `Time: 10:00 AM to 10:00 PM`;
    document.getElementById('details-price').textContent = `Price: ₹${price()}`;
});

// Reset form to edit booking
function resetForm() {
    document.getElementById('booking-form').style.display = 'block';
    document.getElementById('booking-details').style.display = 'none';
}


var options = {
    "key": "****************",  // Replace with your Razorpay Key ID
    "amount": price()*100 || 5000,  // Amount in paise (50000 paise = INR 500)
    "currency": "INR",
    "name": "Parking Website",  // Your website or company name
    "description": "Parking Payment",  // Description of the transaction
    "image": "https://your-logo-url.com",  // Optional: URL of your logo
    "handler": function (response) {
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;

        console.log("Payment ID:", paymentId);
        // console.log("Order ID:", orderId);
        // console.log("Signature:", signature);

        const params = new URLSearchParams(window.location.search);
        const buttonId = params.get('buttonId');

        const buttonIds = JSON.parse(localStorage.getItem('buttonIds')) || [];

        buttonIds.push(buttonId);


        const user = {
            Name: Username,
            ButtonId: buttonId,
            PaymentId : paymentId,
            paymentSuccess: true,
            Booking_Date: todayStr
        }
    
        // Store payment success status in sessionStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('buttonIds', JSON.stringify(buttonIds));

        // Redirect to the first page
        // window.location.href = '../parkingmap/parkingmap.html?buttonId=' + buttonId; // Pass button ID if needed
        afterPayment(buttonId, paymentId);
    },
    "prefill": {
        "name": "Sachin",
        "email": "sachin@example.com",
        "contact": "8210333838"
    },
    "notes": {
        "address": "Some address"
    },
    "theme": {
        "color": "#3399cc"
    }
};

// Create a Razorpay instance
var rzp1 = new Razorpay(options);

// Add event listener to the "Pay Now" button to trigger the Razorpay checkout
document.getElementById('rzp-button1').onclick = function(e) {
    rzp1.open();
    e.preventDefault();
}

function afterPayment(buttonId, paymentId){

    let count = 10;
    
    setTimeout(() => {
        const intervalId = setInterval(() => {
            document.getElementById('homepage').innerHTML = `Homepage ${count}`;
            count--;
    
            if (count < 0) {
                clearInterval(intervalId);
                window.location.href = '../homepage/homepage.html';
            }
        }, 1000); 
    }, 10000); 

    const parkingDate = document.getElementById('parking-date').value;

    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-details').style.display = 'none';
    document.getElementById('booking-pdf').style.display = `block`;

    document.getElementById('booking-name').textContent = `Name: ${Username}`;
    document.getElementById('booking-id').textContent = `Payment Id: ${paymentId}`;
    document.getElementById('booking-slot').textContent = `Slot No: ${buttonId}`;
    document.getElementById('booking-date').textContent = `Parking Date: ${parkingDate}`;
    document.getElementById('booking-phoneNo').textContent = `Phone No: ${mobileNumber}`;
    document.getElementById('booking-vehicle').textContent = `Vehicle Type: ${vehicleType}`;
    document.getElementById('booking-signature').textContent = `Digitally signed by parking.in ${todayStr}`;

    

}

function downloadPDF() {
    const element = document.getElementById('content');
    const options = {
      margin:       1,
      filename:     'booking_details.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // Generate PDF from the specified element
    html2pdf().set(options).from(element).save();
  }
  

//   window.onload = downloadPDF;
  if(document.getElementById('booking-pdf').style.display === `block`){
    downloadPDF();
  }