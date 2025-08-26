// Handle Add Product Form
document.getElementById("add-productForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const type = document.getElementById("productType").value;
  const cost = document.getElementById("costPrice").value;
  const sale = document.getElementById("salePrice").value;
  const qty = document.getElementById("quantity").value;
  const supplier = document.getElementById("supplier").value;
  const date = document.getElementById("date").value;

  alert(`✅ Product Added:\n\nName: ${name}\nType: ${type}\nCost Price: $${cost}\nSale Price: $${sale}\nQuantity: ${qty}\nSupplier: ${supplier}\nDate: ${date}`);

  // Later we can push this data into localStorage or send to backend
  document.getElementById("productForm").reset();
});


// Handle Add Product Form (with localStorage)
document.getElementById("productForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const product = {
    name: document.getElementById("productName").value,
    type: document.getElementById("productType").value,
    cost: document.getElementById("costPrice").value,
    sale: document.getElementById("salePrice").value,
    qty: document.getElementById("quantity").value,
    supplier: document.getElementById("supplier").value,
    date: document.getElementById("date").value
  };

  // Save to localStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert(`✅ Product "${product.name}" added successfully!`);
  document.getElementById("productForm").reset();
  window.location.href = "inventory.html";
});


