function addStudentToTable(index,student){
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    let div = document.createElement('div')
    let image = document.createElement('img')
    cell.setAttribute('scope','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.studentId
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gpa
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.appendChild(div)
    div.appendChild(image)
    image.setAttribute('src',student.image)
    image.style.height = '200px'
    image.classList.add('img-thumbnail')
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.penAmount
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.description
    row.appendChild(cell)

    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerText = 'delete'
    button.addEventListener('click',function(){
        let cf = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
        if(cf) {
            deleteStudent(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    tableBody.appendChild(row)
}

function addStudentList(studentlist){
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ' '
    for(student of studentlist){
        addStudentToTable(counter++ ,student)
    }
}
function addStudentData(student){
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)
    image.style.height = '200px'
}
function onLoad(){
    fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data =>{
            addStudentList(data)
        })
//    student = {
//     "studentId": "642110314",
//     "name": "Chanakarn",
//     "surname": "Hin-ngoen",
//     "gpa": 5.00,
//     "image": "https://www.techhub.in.th/wp-content/uploads/2021/05/118283916_b19c5a1f-162b-410b-8169-f58f0d153752.jpg"
//    }
//    addStudentToDB(student)     
}

document.getElementById('searchButton').addEventListener('click',() =>{
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`) // promise response's 
    .then(response =>{
        return response.json() // promise json's
    })
    .then(student =>{
        addStudentData(student)
    })
})

function addStudentToDB(student){
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        return response.json() 
    })
    .then(data => {
        console.log('success', data)
        showAllStudent()
    })
    .catch(err => {
        return null
    })
}

function deleteStudent(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`,{
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 200){
            return response.json()
        }
        else{
            throw new Error(response.status)
        }
    })
    .then(data => {
        alert(`student name ${data.name} is deleted`)
        showAllStudent()
    })
    .catch(error => { 
        alert('your input student id is not in the database')
    })
}

// function onLoad (){
//     deleteStudent(79)
//     fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
//         return response.json()
//     })
//     .then(data =>{
//         addStudentList(data)
//     })
// }

function onAddStudentClick() {
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    console.log(student)
    addStudentToDB(student)
}
document.getElementById('addButton').addEventListener('click', function(e) {
    onAddStudentClick()
})

function showAllStudent() {
    fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
    .then(data =>{
        addStudentList(data)
    })
}

// function onload(){
//     showAllStudent()
// }

