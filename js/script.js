

// Auto-redirect if trying to access dashboard without login
window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf("/") + 1);
  const role = localStorage.getItem("userRole");

  if((file.includes("admin-dashboard") || file.includes("manager-dashboard") || file.includes("attendant-dashboard")) 
     && !role) {
    alert("⚠️ Please login first.");
    window.location.href = "login.html";
  }
});
