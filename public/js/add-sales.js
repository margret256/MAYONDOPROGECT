const saleForm = document.getElementById("saleForm");
const totalPriceEl = document.getElementById("totalprice");

function calculateTotal() {
  const qty = parseFloat(document.getElementById("quantity").value) || 0;
  const price = parseFloat(document.getElementById("price").value) || 0;
  const transport = document.getElementById("transport").value;
  let total = qty * price;
  if (transport === "yes") total += total * 0.05;
  totalPriceEl.textContent = `Shs. ${total.toFixed(2)}`;
  return total;
}

document.getElementById("quantity").addEventListener("input", calculateTotal);
document.getElementById("price").addEventListener("input", calculateTotal);
document.getElementById("transport").addEventListener("change", calculateTotal);

saleForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const sales = JSON.parse(localStorage.getItem("sales")) || [];

  const customer = document.getElementById("customerName").value;
  const product = document.getElementById("product").value;
  const qty = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);
  const payment = document.getElementById("paymentType").value;
  const agent = document.getElementById("agent").value;
  const date = document.getElementById("date").value;
  const transport = document.getElementById("transport").value;

  let total = qty * price;
  if (transport === "yes") total += total * 0.05;

  sales.push({
    customer,
    product,
    qty,
    price,
    payment,
    agent,
    date,
    transport,
    total: `Shs. ${total.toFixed(2)}`
  });

  localStorage.setItem("sales", JSON.stringify(sales));
  alert("✅ Sale recorded successfully!");
  window.location.href = "sales.html"; // redirect to sales page
});
