
  
    let stock = [];
    let sales = [];

    // Add to Stock
    document.getElementById("stockForm").addEventListener("submit", function(e){
      e.preventDefault();
      let product = {
        name: document.getElementById("pname").value,
        type: document.getElementById("ptype").value,
        supplier: document.getElementById("supplier").value,
        cost: parseFloat(document.getElementById("cost").value),
        price: parseFloat(document.getElementById("price").value),
        qty: parseInt(document.getElementById("qty").value)
      };
      stock.push(product);
      updateStockTable();
      updateSaleDropdown();
      this.reset();
    });

    // Record Sale
    document.getElementById("salesForm").addEventListener("submit", function(e){
      e.preventDefault();
      let productName = document.getElementById("saleProduct").value;
      let qty = parseInt(document.getElementById("saleQty").value);
      let transport = document.getElementById("transport").checked;
      let payment = document.getElementById("payment").value;

      let product = stock.find(p => p.name === productName);
      if(product && product.qty >= qty){
        let total = product.price * qty;
        if(transport) total *= 1.05; // add 5%
        sales.push({name: productName, qty, total, payment});
        product.qty -= qty; // update stock

        document.getElementById("saleTotal").innerText = total.toFixed(2);
        updateStockTable();
        updateSalesTable();
        this.reset();
      } else {
        alert("Not enough stock available!");
      }
    });

    function updateStockTable(){
      let tbody = document.querySelector("#stockTable tbody");
      tbody.innerHTML = "";
      stock.forEach(p=>{
        tbody.innerHTML += `<tr>
          <td>${p.name}</td><td>${p.type}</td><td>${p.supplier}</td>
          <td>${p.cost}</td><td>${p.price}</td><td>${p.qty}</td>
        </tr>`;
      });
    }

    function updateSalesTable(){
      let tbody = document.querySelector("#salesTable tbody");
      tbody.innerHTML = "";
      sales.forEach(s=>{
        tbody.innerHTML += `<tr>
          <td>${s.name}</td><td>${s.qty}</td><td>${s.total.toFixed(2)}</td><td>${s.payment}</td>
        </tr>`;
      });
    }

    function updateSaleDropdown(){
      let select = document.getElementById("saleProduct");
      select.innerHTML = "";
      stock.forEach(p=>{
        select.innerHTML += `<option value="${p.name}">${p.name}</option>`;
      });
    }
  
