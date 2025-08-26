// Populate Sales Table
if(document.getElementById("salesBody")) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  const tbody = document.getElementById("salesBody");

  if(sales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">No sales recorded.</td></tr>`;
  } else {
    tbody.innerHTML = "";
    sales.forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td>${s.customer}</td>
          <td>${s.product}</td>
          <td>${s.qty}</td>
          <td>${s.date}</td>
          <td>${s.payment}</td>
          <td>${s.agent}</td>
          <td>$${s.total}</td>
        </tr>`;
    });
  }
}



// Handle Add Sale Form (with stock update)
document.getElementById("saleForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const sale = {
    customer: document.getElementById("customerName").value,
    product: document.getElementById("product").value,
    qty: parseInt(document.getElementById("quantity").value),
    date: document.getElementById("date").value,
    payment: document.getElementById("paymentType").value,
    agent: document.getElementById("agent").value,
    total: document.getElementById("totalPrice").value
  };

  // Save to sales
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));

  // Update stock (reduce quantity from products list)
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.map(p => {
    if(p.name.toLowerCase() === sale.product.toLowerCase()) {
      p.qty = Math.max(0, parseInt(p.qty) - sale.qty); // prevent negative stock
    }
    return p;
  });
  localStorage.setItem("products", JSON.stringify(products));

  alert(`✅ Sale recorded for ${sale.customer}. Stock updated.`);
  document.getElementById("saleForm").reset();
  window.location.href = "sales.html";
});


// Populate Sales Table with Delete Option
if(document.getElementById("salesBody")) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  const tbody = document.getElementById("salesBody");

  if(sales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">No sales recorded.</td></tr>`;
  } else {
    tbody.innerHTML = "";
    sales.forEach((s, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${s.customer}</td>
          <td>${s.product}</td>
          <td>${s.qty}</td>
          <td>${s.date}</td>
          <td>${s.payment}</td>
          <td>${s.agent}</td>
          <td>$${s.total}</td>
          <td><button onclick="deleteSale(${index})" class="delete-btn">🗑️ Delete</button></td>
        </tr>`;
    });
  }
}

// Delete Sale Function
function deleteSale(index) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  if(confirm(`Are you sure you want to delete this sale record?`)) {
    sales.splice(index, 1);
    localStorage.setItem("sales", JSON.stringify(sales));
    location.reload();
  }
}


// Edit Sale
function editSale(index) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  const s = sales[index];

  const newCustomer = prompt("Customer Name:", s.customer);
  const newProduct = prompt("Product:", s.product);
  const newQty = prompt("Quantity:", s.qty);
  const newDate = prompt("Date:", s.date);
  const newPayment = prompt("Payment Type:", s.payment);
  const newAgent = prompt("Sales Agent:", s.agent);
  const newTotal = prompt("Total Price:", s.total);

  sales[index] = {
    customer: newCustomer || s.customer,
    product: newProduct || s.product,
    qty: newQty || s.qty,
    date: newDate || s.date,
    payment: newPayment || s.payment,
    agent: newAgent || s.agent,
    total: newTotal || s.total
  };

  localStorage.setItem("sales", JSON.stringify(sales));
  location.reload();
}