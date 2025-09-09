// Get form elements
const form = document.getElementById("saleForm");
const qtyInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const transportSelect = document.getElementById("transport");
const totalDisplay = document.getElementById("totalprice");

// Function to calculate live total
function calculateTotal() {
  const price = parseFloat(priceInput.value) || 0;
  const qty = parseInt(qtyInput.value) || 0;
  const transportValue = transportSelect.value;

  let total = price * qty;
  if (transportValue === "yes") total += total * 0.05; // add 5%

  totalDisplay.textContent = `Shs. ${total.toFixed(2)}`;
}

// Update total live
qtyInput.addEventListener("input", calculateTotal);
priceInput.addEventListener("input", calculateTotal);
transportSelect.addEventListener("change", calculateTotal);

// Handle form submission
form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const sale = {
    customer: document.getElementById("customerName").value,
    product: document.getElementById("product").value,
    qty: parseInt(qtyInput.value),
    price: parseFloat(priceInput.value),
    date: document.getElementById("date").value,
    payment: document.getElementById("paymentType").value,
    agent: document.getElementById("agent").value,
    transport: transportSelect.value,
    total: totalDisplay.textContent
  };

  // Save to localStorage
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));

  alert(`✅ Sale recorded for ${sale.customer}. Total: ${sale.total}`);

  // Reset form
  form.reset();
  totalDisplay.textContent = "Shs. 0.00";

  // Redirect
  window.location.href = "sales.html";
});
