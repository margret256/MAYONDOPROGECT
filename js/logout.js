window.onload = function() {
  localStorage.removeItem("currentUser");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}
