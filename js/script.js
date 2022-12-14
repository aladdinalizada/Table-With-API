let tbody = document.querySelector("tbody");
let search = document.querySelector("#search");

const customersApi = "https://northwind.vercel.app/api/customers";

// Fetch data from API
async function getCustomers() {
  let response = await fetch(customersApi);
  let data = await response.json();
  return data;
}

// Render data to table
async function renderCustomers() {
  let customers = await getCustomers();
  let html = "";
  customers.forEach((customer) => {
    html += `
        <tr>
            <td>${customer.id}</td>
            <td>${customer.companyName}</td>
            <td>${customer.contactName}</td>
            <td>${customer.contactTitle}</td>
            <td><button class="editBtn">Edit</button></td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>

        `;
  });
  tbody.innerHTML = html;
}
renderCustomers();

// Search
search.addEventListener("keyup", (e) => {
  let searchValue = e.target.value.toLowerCase();
  let customers = document.querySelectorAll("tbody tr");
  customers.forEach((customer) => {
    let customerName = customer.children[1].innerText.toLowerCase();
    if (customerName.includes(searchValue)) {
      customer.style.display = "table-row";
    } else {
      customer.style.display = "none";
    }
  });
});

let editBtn = document.querySelectorAll(".editBtn");
let deleteBtn = document.querySelectorAll(".deleteBtn");

// Edit;
editBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let id = e.target.parentElement.parentElement.children[0].innerText;
    let companyName =
      e.target.parentElement.parentElement.children[1].innerText;
    let contactName =
      e.target.parentElement.parentElement.children[2].innerText;
    let contactTitle =
      e.target.parentElement.parentElement.children[3].innerText;

    document.querySelector("#id").value = id;
    document.querySelector("#companyName").value = companyName;
    document.querySelector("#contactName").value = contactName;
    document.querySelector("#contactTitle").value = contactTitle;
  });
});

// Delete
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.remove();
  });
});

let showBtn = document.querySelector(".showBtn");

showBtn.addEventListener("click", () => {
  let editTable = document.querySelector(".edit-table");
  if (editTable.style.display === "none") {
    editTable.style.display = "block";
  } else {
    editTable.style.display = "none";
  }
});
