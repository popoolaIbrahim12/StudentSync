
let students = JSON.parse(localStorage.getItem("students")) || []
const addTask = document.getElementById("addTask")
const searchInput = document.getElementById("searchInput")
const clearSearch = document.getElementById("clearSearch")

addTask.addEventListener("click",Addstudents)

function Addstudents () {
    
  const name = document.getElementById("studentName").value
  const email = document.getElementById("studentEmail").value
  const score = document.getElementById("studentScore").value

  if(!name || !email || !score){
    alert("please fill all fields")
    return
  }

  const student = {
    id:Date.now(),
    name,
    email,
    score

  }

  students.push(student )
  localStorage.setItem("students",JSON.stringify(students))
  console.log(student);
  
  renderStudents()
  clearInputs()
}

function renderStudents (list = students) {
 const table = document.getElementById("studentTable")
 table.innerHTML = ""

 list.forEach(student => {
    table.innerHTML += `
    <tr>
             <td>${student.id}</td>
          <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.score}</td>
                <td>
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
    `
 })

 updateStats()
 }

 renderStudents()


 function deleteStudent (id) {
  students = students.filter(student => student.id !== id);
  localStorage.setItem("students",JSON.stringify(students))
  renderStudents()
 }

 function editStudent (id) {
 const student = students.find(s => s.id === id);
  
 document.getElementById("studentName").value = student.name
 document.getElementById("studentEmail").value = student.email
 document.getElementById("studentScore").value = student.score

 deleteStudent(id)
 }

 searchInput.addEventListener("input",searchStudent)

 function searchStudent () {
    const searchValue = document.getElementById("searchInput").value.toLowerCase().trim()

     const filtered = students.filter((student) => 
      student.name.toLowerCase().includes(searchValue) ||
     student.email.toLowerCase().includes(searchValue)
    )

    renderStudents(filtered)
 }

 clearSearch.addEventListener("click",clearSearch)
 function clearSearch () {
    document.getElementById("serachInput").value = ""
    renderStudents()
 }