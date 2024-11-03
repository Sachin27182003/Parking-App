
document.querySelector('.img__btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s--signup');
});


  function getdata(){

    const data = JSON.parse(localStorage.getItem("data"))  || {"dataList": []};
    console.log(data);
    return data;
  }

  const emailExist = (email) => {
    const data = getdata();
    return data.dataList.some(item => item.Email === email);
  }



  const login_validate = (email, password) => {
     const data = getdata();
     return data.dataList.some((item) => item.Email === email && item.Password === password )
  }



  function addToLocalStorage(info){
    const data = getdata();


    data.dataList.push(info);
    localStorage.setItem("data", JSON.stringify(data));
  }


  document.addEventListener("DOMContentLoaded", () => {
   //login
   const signIn_button = document.getElementById("sign-in");
   const email_in = document.getElementById("email_in");
   const password_in = document.getElementById("password_in");


   const validateLoginForm = () => {

    const email_test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@_#$!%*&])[a-zA-Z0-9@#$!%*&]{8,}$/


    if(email_in.value === ''){
      return false;
    } else if (password_in.value === ''){
      alert("Please Enter Password");
      return false;
    } else if (!email_test.test(email_in.value)){
      alert("Invalid Email Address");
      return false;
    } else if (!password_test.test(password_in.value)){
      alert("Invalid Password");
      return false;
    } else if (!login_validate(email_in.value, password_in.value)){
      alert("Either Email or Password is wrong")
      return false;
    } else {
      return true;
    }
   }

   password_in.addEventListener("keydown", (event)=> {
    if(event.key === "Enter" && validateLoginForm()){
      addToSessionStorage();
      login();

    }
   })


   signIn_button.addEventListener("click", (event)=>{
        if(validateLoginForm()){
          addToSessionStorage();
          login();
        }
   })

   async function addToSessionStorage(){

    const email_in = document.getElementById("email_in");
    const password_in = document.getElementById("password_in");

    const Email_in = email_in.value;
    const Password_in = password_in.value;

    const loginuser = {Email: Email_in, Password: Password_in};
    await sessionStorage.setItem('loginuser', JSON.stringify(loginuser));

   }

   const login = () => {
      email_in.value = '';
      password_in.value = '';

      const message_element = document.getElementById("signinMessage");
      message_element.style.display = 'block';


      setTimeout(()=> {
        const spinner_element = document.getElementById("loadingSpinner1");
        message_element.style.display = 'block';
        spinner_element.style.display = 'block';

      }, 100);

      setTimeout( ()=> {
        window.location.href = "../homepage/homepage.html";
      }, 1000);

   }



     //signup

     const signup_button = document.getElementById("sign-up");
     const name_up = document.getElementById("name_up");
     const email_up = document.getElementById("email_up");
     const password_up = document.getElementById("password_up");


   const validateSignUpForm = () => {

    const SignUp_Button = document.getElementById("SignIn_Button");
    const Already_Exist_Message = document.getElementById("Already_Exist_Message");


    const email_test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*&_])[a-zA-Z0-9@#$!%*&]{8,}$/;

    

    if(name_up.value === '' ){
         alert("name can't be blank");
         return false;
    } else if (email_up.value === ''){
         alert("email can't be blank");
         return false;
    }else if (!email_test.test(email_up.value)){
          alert("Invalid Email address");

          return false;
    } else if (emailExist(email_up.value)){
          // alert("Email Already Exist \nPlease Login!!");
          Already_Exist_Message.style.display = 'block';
          setTimeout(()=>{
            SignUp_Button.click();
          }, 2000);
          
          return false;
    } else if (password_up.value === '' ){
         alert("password can't be blank");
         return false;
    } else if (!password_test.test(password_up.value)){
        alert("password must contain 8 characters incuding atleast a digit an aphabet combination of upper and lower case")
        return false;
    } else {
      return true;
     }

   }

   password_up.addEventListener("keydown", (event) => {
    if(event.key === "Enter" && validateSignUpForm()){
        signUP(); 
    }
})

  signup_button.addEventListener("click", (event) => {
      if(validateSignUpForm()){
        signUP();
      }
  })


  function signUP() {
    const name__up = name_up.value;
    const email__up = email_up.value; 
    const password__up = password_up.value;

    addToLocalStorage({Name: name__up, Email: email__up, Password: password__up});

    const loginuser = { Email: 'email_up', Password: 'password__up'};
    sessionStorage.setItem('loginuser', JSON.stringify(loginuser));


    // Clear the input fields
    name_up.value = '';
    email_up.value = '';
    password_up.value = '';

    // Show the signup success message
    const messageElement = document.getElementById('signupMessage');
    messageElement.style.display = 'block';

    setTimeout(() => {
      const spinnerElement = document.getElementById('loadingSpinner2');
      messageElement.style.display = 'block';  
      spinnerElement.style.display = 'block';
    }, 100);
    

    setTimeout(() => {
        window.location.href = '../homepage/homepage.html'
    }, 1000);
   }
  }
)

const params = new URLSearchParams(window.location.search);

const signup = params.get('signup');

if(signup){
  SignUp_Button.click();
}



  