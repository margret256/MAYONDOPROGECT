function renderSalesTable() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const tbody = document.getElementById("salesBody");
  if (!tbody) return;

  if (sales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9">No sales recorded.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  sales.forEach((sale, index) => {
    const transportText = sale.transport === "yes" ? "5% Transport" : "No";

    tbody.innerHTML += `
      <tr>
        <td>${sale.customer}</td>
        <td>${sale.product}</td>
        <td>${sale.qty}</td>
        <td>${sale.date}</td>
        <td>${sale.payment}</td>
        <td>${sale.agent}</td>
        <td>${transportText}</td>
        <td>${sale.total}</td>
        <td>
          <button onclick="editSale(${index})">✏️ Edit</button>
          <button onclick="deleteSale(${index})">🗑️ Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteSale(index) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  if (confirm("Are you sure you want to delete this sale record?")) {
    sales.splice(index, 1);
    localStorage.setItem("sales", JSON.stringify(sales));
    renderSalesTable();
  }
}

function editSale(index) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  const s = sales[index];

  const newCustomer = prompt("Customer Name:", s.customer) || s.customer;
  const newProduct = prompt("Product:", s.product) || s.product;
  const newQty = parseInt(prompt("Quantity:", s.qty)) || s.qty;
  const newPrice = parseFloat(prompt("Price per Item:", s.price)) || s.price;
  const newDate = prompt("Date:", s.date) || s.date;
  const newPayment = prompt("Payment Type:", s.payment) || s.payment;
  const newAgent = prompt("Sales Agent:", s.agent) || s.agent;
  const newTransport = prompt("Transport (yes/no):", s.transport) || s.transport;

  let total = newQty * newPrice;
  if (newTransport === "yes") total += total * 0.05;

  sales[index] = {
    customer: newCustomer,
    product: newProduct,
    qty: newQty,
    price: newPrice,
    date: newDate,
    payment: newPayment,
    agent: newAgent,
    transport: newTransport,
    total: `Shs. ${total.toFixed(2)}`
  };

  localStorage.setItem("sales", JSON.stringify(sales));
  alert("✅ Sale updated successfully!");
  renderSalesTable();
}

document.addEventListener("DOMContentLoaded", renderSalesTable);
