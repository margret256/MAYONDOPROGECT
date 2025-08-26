// Handle Add Sale Form (with localStorage)
document.getElementById("saleForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const sale = {
    customer: document.getElementById("customerName").value,
    product: document.getElementById("product").value,
    qty: document.getElementById("quantity").value,
    date: document.getElementById("date").value,
    payment: document.getElementById("paymentType").value,
    agent: document.getElementById("agent").value,
    total: document.getElementById("totalPrice").value
  };

  // Save to localStorage
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));

  alert(`✅ Sale recorded for ${sale.customer}`);
  document.getElementById("saleForm").reset();
  window.location.href = "sales.html";
});

