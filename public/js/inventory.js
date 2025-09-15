window.onload = function() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const tbody = document.getElementById('inventoryBody');

  tbody.innerHTML = ''; // Clear existing rows

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">No products available.</td></tr>`;
    return;
  }

  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.productName}</td>
      <td>${product.productType}</td>
      <td>$${product.costPrice}</td>
      <td>$${product.salePrice}</td>
      <td>${product.quantity}</td>
      <td>${product.supplier}</td>
      <td>${product.date}</td>
      <td>
        <button onclick="editProduct(${index})">✏️ Edit</button>
        <button onclick="deleteProduct(${index})">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
};

function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  if(confirm(`Are you sure you want to delete "${products[index].productName}"?`)) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
  }
}

function editProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  const p = products[index];

  const newName = prompt("Product Name:", p.productName);
  const newType = prompt("Type:", p.productType);
  const newCost = prompt("Cost Price:", p.costPrice);
  const newSale = prompt("Sale Price:", p.salePrice);
  const newQty = prompt("Quantity:", p.quantity);
  const newSupplier = prompt("Supplier:", p.supplier);
  const newDate = prompt("Date Added:", p.date);

  products[index] = {
    productName: newName || p.productName,
    productType: newType || p.productType,
    costPrice: newCost || p.costPrice,
    salePrice: newSale || p.salePrice,
    quantity: newQty || p.quantity,
    supplier: newSupplier || p.supplier,
    date: newDate || p.date
  };

  localStorage.setItem('products', JSON.stringify(products));
  location.reload();
}
