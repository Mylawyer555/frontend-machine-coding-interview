console.log("hello World");


let employees = [];

const listOfEmployees = document.querySelector(".employees_list");
const employeeDetails = document.querySelector(".employee_info")
const addBtn = document.querySelector(".createEmployee")


const fetchData = async ()=>{
    try {
        const response = await fetch("src/employees.json");
        if (!response.ok) throw new Error("Network response was not ok");
        employees = await response.json();
        renderEmployeeList();
    } catch (error) {
        console.error("Error loading employees:", error);
        
    }
}

fetchData();

function renderEmployeeList(){

    listOfEmployees.querySelectorAll(".employee-item").forEach(item => item.remove())

    employees.forEach(emp =>{
        const list = document.createElement("li");
        list.classList.add('employee-item');
        list.textContent = `${emp.firstName} ${emp.lastName}`;
        list.addEventListener("click", () =>showEmployeeDetails(emp.id))
        listOfEmployees.appendChild(list);
    })
}

function showEmployeeDetails (id){
    const emp = employees.find(e => e.id === id);
    if(!emp) return;

    employeeDetails.innerHTML= `
    <img src="${emp.imageUrl}" alt="${emp.firstName}" width="80" />
    <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
    <p><strong>Email:</strong> ${emp.email}</p>
    <p><strong>Contact:</strong> ${emp.contactNumber}</p>
    <p><strong>Age:</strong> ${emp.age}</p>
    <p><strong>DOB:</strong> ${emp.dob}</p>
    <p><strong>Salary:</strong> $${emp.salary}</p>
    <p><strong>Address:</strong> ${emp.address}</p>
    <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
}

function deleteEmployee (id){
    const emp = employees.filter((e) => e.id !== id);

    renderEmployeeList(); // re-rendering the employees
    employeeDetails.innerHTML = `<h3>Employee Information</h3>`
}

const modal = document.getElementById("employeeModal");
const openBtn = document.querySelector(".createEmployee");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("employeeForm");

openBtn.onclick = () => {
  modal.style.display = "block";
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newEmployee = {
    id: Date.now(), // simple unique ID
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    contactNumber: formData.get("contactNumber"),
    age: formData.get("age"),
    dob: formData.get("dob"),
    salary: formData.get("salary"),
    address: formData.get("address"),
    imageUrl: formData.get("imageUrl") || "https://cdn-icons-png.flaticon.com/512/0/93.png"
  };
  employees.push(newEmployee);
  renderEmployeeList();
  modal.style.display = "none";
  form.reset();
});
