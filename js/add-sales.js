// Get form elements
const form = document.getElementById("saleForm");
const qtyInput = document.getElementById("quantity");
const priceInput = document.getElementById("pricePerItem");
const discountSelect = document.getElementById("discount");
const totalDisplay = document.getElementById("totalPrice");

// Function to calculate live total
function calculateTotal() {
  const price = parseFloat(priceInput.value) || 0;
  const qty = parseInt(qtyInput.value) || 0;
  const discountValue = discountSelect.value;

  let total = price * qty;
  if (discountValue === "Transport5") total -= total * 0.05;

  totalDisplay.textContent = total.toFixed(2);
}

// Update total live on input/change
qtyInput.addEventListener("input", calculateTotal);
priceInput.addEventListener("input", calculateTotal);
discountSelect.addEventListener("change", calculateTotal);

// Handle form submission
form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const sale = {
    customer: document.getElementById("customerName").value,
    product: document.getElementById("product").value,
    qty: parseInt(qtyInput.value),
    date: new Date().toLocaleDateString(),
    payment: document.getElementById("paymentType").value,
    agent: document.getElementById("agent").value,
    discount: discountSelect.value,       // "Transport5" or "No"
    total: totalDisplay.textContent       // live calculated total
  };

  // Save to localStorage
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));

  alert(`✅ Sale recorded for ${sale.customer}. Total: ${sale.total}`);
  
  // Reset form
  form.reset();
  totalDisplay.textContent = "0.00";

  // Redirect to sales page
  window.location.href = "sales.html";
});
