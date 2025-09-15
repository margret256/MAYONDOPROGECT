document.getElementById("productForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const product = {
    productName: document.getElementById("productName").value,
    productType: document.getElementById("productType").value,
    costPrice: document.getElementById("costPrice").value,
    salePrice: document.getElementById("salePrice").value,
    quantity: document.getElementById("quantity").value,
    supplier: document.getElementById("supplier").value,
    date: document.getElementById("date").value
  };

  // Save to localStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert(`✅ Product "${product.productName}" added successfully!`);
  document.getElementById("productForm").reset();
  window.location.href = "inventory"; // redirect to Inventory page
});
