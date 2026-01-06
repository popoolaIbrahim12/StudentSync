console.log("dashboard");


let students = []
let editingId = null

// Load students from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
     userName()
    protectDashboard()
   loadStudents()
  renderStudents()
  updateAnalytics()
  setupEventListeners()
})


// Setup event listeners
function setupEventListeners() {
  const form = document.getElementById("studentForm")
  const searchInput = document.getElementById("searchInput")
  const clearSearchBtn = document.getElementById("clearSearch")

  form.addEventListener("submit", handleFormSubmit)
  searchInput.addEventListener("input", handleSearch)
  clearSearchBtn.addEventListener("click", clearSearch)
}

// Load students from localStorage
function loadStudents() {
  const stored = localStorage.getItem("students")
  if (stored) {
    students = JSON.parse(stored)
  }
  }
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students))
}


function userName () {
 const user = JSON.parse(localStorage.getItem("user"))
 const body = document.body
 const add = document.getElementById("welcomeText").textContent =`welcome ${user.name}` 
// add.style.color = "#35469B"
// add.style.fontSize = "2rem"
// add.style.fontFamily = "sans-serif"
//  if(!user ) return
body.append(add)

//  console.log(add);

}
// userName()

function protectDashboard () {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if(isLoggedIn !== "true"){
        window.location.href = "login.html"
    }
}
// logout
document.getElementById("logoutBtn").addEventListener("click",() =>{
    localStorage.removeItem("isLoggedIn")
    window.location.href = "login.html"
})


// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault()

  const name = document.getElementById("studentName").value.trim()
  const email = document.getElementById("studentEmail").value.trim()
  const score = Number.parseInt(document.getElementById("studentScore").value)

   if (name === "" || email === "" || score === ""){
    return
   }

   if(isNaN(score) || score < 0 || score > 100){
    alert("score must be a number between 0 and 100")
    document.getElementById("studentScore").focus()
    return
   }
  if (editingId !== null) {
    // Update existing student
    const student = students.find((s) => s.id === editingId)
    student.name = name
    student.email = email
    student.score = score
    editingId = null
    document.getElementById("submitBtn").textContent = "Add Student"
    document.getElementById("submitBtn").classList.remove("edit-mode")
  } else {
    // Add new student
    const student = {
      id: Date.now(),
      name,
      email,
      score
    }
    students.push(student)
  }



  saveStudents()
  renderStudents()
  updateAnalytics()
  e.target.reset()
}

// Render students table
function renderStudents(filteredStudents = null) {
  const tbody = document.getElementById("studentTable")
  const studentsToRender = filteredStudents || students

  if (studentsToRender.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="no-data">No students found</td></tr>'
    return
  }

  tbody.innerHTML = studentsToRender
    .map(
      (student) => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.score}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editStudent(${student.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            </td>
        </tr>
    `,
    )

    .join("")
}

// Edit student
function editStudent(id) {
  const student = students.find((s) => s.id === id)
  if (!student) return

  document.getElementById("studentName").value = student.name
  document.getElementById("studentEmail").value = student.email
  document.getElementById("studentScore").value = student.score

  editingId = id
  document.getElementById("submitBtn").textContent = "Update Student"
  document.getElementById("submitBtn").classList.add("edit-mode")

  // Scroll to form
  document.getElementById("studentForm").scrollIntoView({ behavior: "smooth" })
}

// Delete student
function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    students = students.filter((s) => s.id !== id)
    saveStudents()
    renderStudents()
    updateAnalytics()
  }
}

// Handle search
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim()

  if (searchTerm === "") {
    renderStudents()
    return
  }

  const filtered = students.filter(
    (student) => student.name.toLowerCase().includes(searchTerm) || student.email.toLowerCase().includes(searchTerm),
  )

  renderStudents(filtered)
}

// Clear search
function clearSearch() {
  document.getElementById("searchInput").value = ""
  renderStudents()
}

// Update analytics
function updateAnalytics() {
  const totalStudents = students.length
  document.getElementById("totalStudents").textContent = totalStudents

  if (totalStudents === 0) {
    document.getElementById("AverageScore").textContent = "0"
    document.getElementById("HighestScore").textContent = "0"
    document.getElementById("TopStudent").text
      Content = "-"
    return
  }

  // Calculate average score
  const totalScore = students.reduce((sum, student) => sum + student.score, 0)
  const averageScore = (totalScore / totalStudents).toFixed(1)
  document.getElementById("AverageScore").textContent = averageScore

  // Find highest score
  const highestScore = Math.max(...students.map((s) => s.score))
  document.getElementById("HighestScore").textContent = highestScore

  // Find top student
  const topStudent = students.find((s) => s.score === highestScore)
  document.getElementById("TopStudent").textContent = topStudent ? topStudent.name : "-"
}

