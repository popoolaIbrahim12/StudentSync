// document.getElementById("signUpForm").addEventListener("submit",e => {
//     e.preventDefault()


// })
console.log("auth js is loaded");

// signup

    document.getElementById("signUpForm").addEventListener("submit", e => {

    e.preventDefault()

    
    const name = document.getElementById("name-input").value
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value


        if (name === "" || email === "" || password === "") {
        alert("All fields are required");
        return;
    }

    const user = {
        name:name,
        email:email,
        password:password
    }

    localStorage.setItem("user",JSON.stringify(user))
   
    

    alert("account created succesfully")

    window.location.href =  "login.html"
    })

// login
document.getElementById(loginForm).addEventListener("submit", e => {
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
