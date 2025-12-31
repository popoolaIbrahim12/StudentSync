
console.log("auth js is loaded");

// signup

    document.getElementById("signUpForm").addEventListener("submit", e => {

    e.preventDefault()

    
    const name = document.getElementById("name-input").value.trim()
    const email = document.getElementById("email-input").value.trim()
    const password = document.getElementById("password-input").value.trim()


        if (name === "" || email === "" || password === "") {
        alert("All fields are required");
        return;
    }

    const user = {
          email:email,
         name:name,
         password:password
    }

    localStorage.setItem("user",JSON.stringify(user))
   
    

    alert("account created succesfully")

    window.location.href =  "login.html"
    })

    const loginEmail = document.getElementById("login-email").value
const loginPassword = document.getElementById("login-password").value

document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault()

    const storedUser = JSON.parse(localStorage.getItem("user"))
    
    if(
        storedUser &&
        loginEmail.value === storedUser.email &&
        loginPassword.value === storedUser.password
    ) {
        localStorage.setItem("isLoggedIn","true")
        window.location.href = "dashboard.html"
    } else {
        alert("invalid login cridentials")
    }
})
