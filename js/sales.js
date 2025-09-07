// Render sales table
function renderSalesTable() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const tbody = document.getElementById("salesBody");
  if (!tbody) return; // only run on sales.html

  if (sales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">No sales recorded.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  sales.forEach((sale, index) => {
    const discountText = sale.discount === "Transport5" ? "5% Transport" : "No";

    tbody.innerHTML += `
      <tr>
        <td>${sale.customer}</td>
        <td>${sale.product}</td>
        <td>${sale.qty}</td>
        <td>${sale.date}</td>
        <td>${sale.payment}</td>
        <td>${sale.agent}</td>
        <td>Shs. ${sale.total}</td>
        <td>${discountText}</td>
        <td>
          <button onclick="editSale(${index})">✏️ Edit</button>
          <button onclick="deleteSale(${index})">🗑️ Delete</button>
        </td>
      </tr>
    `;
  });
}


// Delete sale
function deleteSale(index) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  if (confirm("Are you sure you want to delete this sale record?")) {
    sales.splice(index, 1);
    localStorage.setItem("sales", JSON.stringify(sales));
    renderSalesTable();
  }
}

// Edit sale
function editSale(index) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  const s = sales[index];

  const newCustomer = prompt("Customer Name:", s.customer) || s.customer;
  const newProduct = prompt("Product:", s.product) || s.product;
  const newQty = prompt("Quantity:", s.qty) || s.qty;
  const newDate = prompt("Date:", s.date) || s.date;
  const newPayment = prompt("Payment Type:", s.payment) || s.payment;
  const newAgent = prompt("Sales Agent:", s.agent) || s.agent;
  const newDiscount = prompt("Discount (No/Transport5):", s.discount) || s.discount;

  // Recalculate total if discount changed
  let pricePerItem = parseFloat(prompt("Price per item (needed for recalculation):", 0));
  let total = pricePerItem * parseInt(newQty);
  if (newDiscount === "Transport5") total -= total * 0.05;

  sales[index] = {
    customer: newCustomer,
    product: newProduct,
    qty: parseInt(newQty),
    date: newDate,
    payment: newPayment,
    agent: newAgent,
    discount: newDiscount,
    total: total.toFixed(2),
  };

  localStorage.setItem("sales", JSON.stringify(sales));
  alert("✅ Sale updated successfully!");
  renderSalesTable();
}

// Run on page load
document.addEventListener("DOMContentLoaded", renderSalesTable);
