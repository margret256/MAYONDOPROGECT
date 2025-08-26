// Handle Register with localStorage
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const user = {
    name: document.getElementById("regName").value,
    email: document.getElementById("regEmail").value,
    password: document.getElementById("regPassword").value,
    role: document.getElementById("regRole").value
  };

  // Get existing users or empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent duplicate email
  if(users.some(u => u.email === user.email)) {
    alert("⚠️ Email already registered. Please login.");
    window.location.href = "login.html";
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Registration successful! You can now login.");
  window.location.href = "login.html";
});

function registerAndRedirect() {
  const role = document.getElementById('role').value;

  if (role === "manager") {
    window.location.href = "manager-dashboard.html";
  } else if (role === "employee") {
    window.location.href = "employee-dashboard.html";
  } else if (role === "customer") {
    window.location.href = "customer-dashboard.html";
  } else {
    alert("Please select a role.");
  }
}
