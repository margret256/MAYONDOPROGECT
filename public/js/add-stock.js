function saveStockToStorage(stockItem) {
  let stockData = JSON.parse(localStorage.getItem("stockData")) || [];

  let found = false;
  stockData = stockData.map((item) => {
    if (item.name === stockItem.name) {
      item.qty += stockItem.qty;
      found = true;
    }
    return item;
  });

  if (!found) {
    stockData.push(stockItem);
  }

  localStorage.setItem("stockData", JSON.stringify(stockData));
}

document.getElementById("stockForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const stockItem = {
    name: document.getElementById("productName").value.trim(),
    type: document.getElementById("productType").value.trim(),
    cost: "$" + document.getElementById("costPrice").value,
    sale: "$" + document.getElementById("salePrice").value,
    qty: parseInt(document.getElementById("quantity").value),
  };

  saveStockToStorage(stockItem);
  alert("Stock added successfully!");
  this.reset();
});
