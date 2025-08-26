// Populate Inventory Table
if(document.getElementById("inventoryBody")) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("inventoryBody");

  if(products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">No products available.</td></tr>`;
  } else {
    tbody.innerHTML = "";
    products.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td>${p.name}</td>
          <td>${p.type}</td>
          <td>$${p.cost}</td>
          <td>$${p.sale}</td>
          <td>${p.qty}</td>
          <td>${p.supplier}</td>
          <td>${p.date}</td>
        </tr>`;
    });
  }
}


// Populate Inventory Table with Delete Option
if(document.getElementById("inventoryBody")) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("inventoryBody");

  if(products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">No products available.</td></tr>`;
  } else {
    tbody.innerHTML = "";
    products.forEach((p, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${p.name}</td>
          <td>${p.type}</td>
          <td>$${p.cost}</td>
          <td>$${p.sale}</td>
          <td>${p.qty}</td>
          <td>${p.supplier}</td>
          <td>${p.date}</td>
          <td><button onclick="deleteProduct(${index})" class="delete-btn">🗑️ Delete</button></td>
        </tr>`;
    });
  }
}

// Delete Product Function
function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  if(confirm(`Are you sure you want to delete "${products[index].name}"?`)) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    location.reload(); // Refresh table
  }
}


// Edit Product
function editProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const p = products[index];

  // Prompt user (quick solution)
  const newName = prompt("Product Name:", p.name);
  const newType = prompt("Type:", p.type);
  const newCost = prompt("Cost Price:", p.cost);
  const newSale = prompt("Sale Price:", p.sale);
  const newQty = prompt("Quantity:", p.qty);
  const newSupplier = prompt("Supplier:", p.supplier);
  const newDate = prompt("Date Added:", p.date);

  products[index] = {
    name: newName || p.name,
    type: newType || p.type,
    cost: newCost || p.cost,
    sale: newSale || p.sale,
    qty: newQty || p.qty,
    supplier: newSupplier || p.supplier,
    date: newDate || p.date
  };

  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}
