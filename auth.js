// document.getElementById("signUpForm").addEventListener("submit",e => {
//     e.preventDefault()


// })

// signup

    document.getElementById("signUpForm").addEventListener("submit",e => {

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

    localStorage.setItem(user,JSON.stringify(user))
    console.log(user);
    

    alert("account created succesfully")

    window.location.href =  "login.html"
    })

// login
    document.getElementById("loginForm").addEventListener("submit",e => {
        e.preventDefault() 

        const loginMail = document.getElementById("login-email").value
        const loginPass = document.getElementById("login-password").value

        const storedUser = localStorage.getItemItem("user")

        if(storedUser === null){
            alert("account not found.please signup")
            return
        }
        const user = JSON.parse(storedUser)

        if(loginMail === user.email && loginPass === user.password){
            localStorage.setItem("isLoogedIn","true")

            window.location.href = "dashboard.html"
        } else{
            alert("wrong email or password")
        }
    })