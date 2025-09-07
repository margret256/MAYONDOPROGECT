let products = JSON.parse(localStorage.getItem("products")) || [];
const tbody = document.getElementById("stockBody");

// Render the stock table
function renderStockTable() {
  if (!tbody) return;

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">No stock available.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  products.forEach((p, index) => {
    // Apply low-stock styling to the quantity cell
    const lowStockClass = p.qty < 5 ? "low-stock" : "";
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.type}</td>
        <td>$${p.cost}</td>
        <td>$${p.sale}</td>
        <td class="${lowStockClass}">${p.qty}</td>
        <td>
          <input type="number" id="qty-${index}" value="1" min="1" style="width: 50px;">
          <button onclick="updateStock(${index}, true)">Add</button>
          <button onclick="updateStock(${index}, false)">Reduce</button>
        </td>
      </tr>`;
  });

  // Show alert only once per session
  if (products.some(p => p.qty < 5) && !sessionStorage.getItem("lowStockAlertShown")) {
    alert("⚠️ Warning: Some products are low in stock!");
    sessionStorage.setItem("lowStockAlertShown", "true");
  }
}

// Function to update stock
function updateStock(index, isAdd) {
  const input = document.getElementById(`qty-${index}`);
  let amount = parseInt(input.value);

  if (isNaN(amount) || amount < 1) {
    alert("Enter a valid quantity!");
    return;
  }

  if (!isAdd && products[index].qty - amount < 0) {
    alert("Cannot reduce stock below 0!");
    return;
  }

  products[index].qty = isAdd ? products[index].qty + amount : products[index].qty - amount;

  // Save to localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Refresh table
  renderStockTable();
}

// Initial render
renderStockTable();
