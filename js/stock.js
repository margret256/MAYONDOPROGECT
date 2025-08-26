// Populate Stock Table
if(document.getElementById("stockBody")) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("stockBody");

  if(products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No stock available.</td></tr>`;
  } else {
    tbody.innerHTML = "";
    products.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td>${p.name}</td>
          <td>${p.type}</td>
          <td>$${p.cost}</td>
          <td>$${p.sale}</td>
          <td>${p.qty}</td>
        </tr>`;
    });
  }
}


// Populate Stock Table with Low Stock Alerts
if(document.getElementById("stockBody")) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("stockBody");

  if(products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No stock available.</td></tr>`;
  } else {
    tbody.innerHTML = "";
    products.forEach(p => {
      const lowStockClass = p.qty < 5 ? "low-stock" : "";
      tbody.innerHTML += `
        <tr class="${lowStockClass}">
          <td>${p.name}</td>
          <td>${p.type}</td>
          <td>$${p.cost}</td>
          <td>$${p.sale}</td>
          <td>${p.qty}</td>
        </tr>`;
    });
  }
}
// Show alert if any product is low in stock
if(products.some(p => p.qty < 5)) {
  alert("⚠️ Warning: Some products are low in stock!");
}
