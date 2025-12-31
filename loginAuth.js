
   
document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault()

    const loginEmail = document.getElementById("login-email").value.trim()
const loginPassword = document.getElementById("login-password").value.trim()
   
    const storedUser = JSON.parse(localStorage.getItem("user"))
    
    if(
        storedUser &&
        loginEmail === storedUser.email &&
        loginPassword === storedUser.password
    ) {
        localStorage.setItem("isLoggedIn","true")
        window.location.href = "dashboard.html"
    } else {
        alert("invalid login cridentials")
    }
})