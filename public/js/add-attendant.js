
    // Load attendants from localStorage on page load
    window.onload = function() {
      const attendants = JSON.parse(localStorage.getItem("attendants")) || [];
      attendants.forEach(attendant => addRowToTable(attendant));
    };

    function saveAttendant() {
      const name = document.getElementById("attendantName").value;
      const email = document.getElementById("attendantEmail").value;
      const phone = document.getElementById("attendantPhone").value;

      const attendant = { name, email, phone };

      // Save to localStorage
      let attendants = JSON.parse(localStorage.getItem("attendants")) || [];
      attendants.push(attendant);
      localStorage.setItem("attendants", JSON.stringify(attendants));

      // Add to table
      addRowToTable(attendant);

      // Clear form
      document.getElementById("attendantForm").reset();

      alert("Attendant " + name + " has been added successfully!");
    }

    function addRowToTable(attendant) {
      const table = document.getElementById("attendantsTable").getElementsByTagName("tbody")[0];
      const newRow = table.insertRow();

      newRow.innerHTML = `
        <td>${attendant.name}</td>
        <td>${attendant.email}</td>
        <td>${attendant.phone}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editAttendant(this)">Edit</button>
          <button class="action-btn remove-btn" onclick="removeAttendant(this)">Remove</button>
        </td>
      `;
    }

    function removeAttendant(button) {
      const row = button.parentNode.parentNode;
      const name = row.cells[0].innerText;

      // Remove from localStorage
      let attendants = JSON.parse(localStorage.getItem("attendants")) || [];
      attendants = attendants.filter(a => a.name !== name);
      localStorage.setItem("attendants", JSON.stringify(attendants));

      // Remove from table
      row.parentNode.removeChild(row);
    }

    function editAttendant(button) {
      const row = button.parentNode.parentNode;
      const cells = row.getElementsByTagName("td");

      const name = cells[0].innerText;
      const email = cells[1].innerText;
      const phone = cells[2].innerText;

      // Put values into form for editing
      document.getElementById("attendantName").value = name;
      document.getElementById("attendantEmail").value = email;
      document.getElementById("attendantPhone").value = phone;

      // Remove from localStorage
      let attendants = JSON.parse(localStorage.getItem("attendants")) || [];
      attendants = attendants.filter(a => a.name !== name);
      localStorage.setItem("attendants", JSON.stringify(attendants));

      // Remove row from table
      row.parentNode.removeChild(row);
    }
  