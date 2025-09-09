  
    function redirectToRole() {
      const role = document.getElementById('loginRole').value;

      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else if (role === "manager") {
        window.location.href = "manager-dashboard.html";
      } else if (role === "attendant") {
        window.location.href = "attendant-dashboard.html";
      } else {
        alert("Please select a role.");
      }
    }
  

