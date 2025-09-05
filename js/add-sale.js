// js/add-sales.js
document.getElementById("saleForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const customerName = document.getElementById("customerName").value;
  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value;
  const date = document.getElementById("date").value;
  const paymentType = document.getElementById("paymentType").value;
  const agent = document.getElementById("agent").value;
  const totalPrice = document.getElementById("totalPrice").value;

  // Create sale object
  const newSale = {
    customerName,
    product,
    quantity,
    date,
    paymentType,
    agent,
    totalPrice,
  };

  // Get existing sales from localStorage
  let sales = JSON.parse(localStorage.getItem("sales")) || [];

  // Add new sale
  sales.push(newSale);

  // Save back to localStorage
  localStorage.setItem("sales", JSON.stringify(sales));

  alert(`✅ Sale recorded for ${customerName}`);

  // Redirect back to sales page
  window.location.href = "sales.html";
});
