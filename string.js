// User database for login - username can be Employee ID or Name
const USERS = [
  {
    username: "ADMIN SBV",
    password: "SBV123",
    role: "admin",
    nama: "School Administrator"
  },
  {
    username: "TCH001",
    password: "SBV123",
    role: "user",
    nama: "Anitha Sharma, M.A., B.Ed"
  },
  {
    username: "TCH002",
    password: "SBV123",
    role: "user",
    nama: "Ravi Kumar, M.Sc., B.Ed"
  },
  {
    username: "TCH003",
    password: "SBV123",
    role: "user",
    nama: "Priya Lakshmi, B.A., B.Ed"
  },
  {
    username: "TCH004",
    password: "SBV123",
    role: "user",
    nama: "Suresh Babu, M.Com"
  }
];

// Login function
function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const err = document.getElementById("loginError");
  const card = document.querySelector(".login-card");

  // Find user in database
  const user = USERS.find(x => x.username === u && x.password === p);

  // If user not found
  if (!user) {
    err.style.display = "block";
    card.classList.add("error");
    setTimeout(() => card.classList.remove("error"), 1000);
    return;
  }

  // User found - save to localStorage and redirect
  err.style.display = "none";
  localStorage.setItem("loginUser", JSON.stringify({
    username: user.username,
    role: user.role,
    nama: user.nama
  }));

  // Redirect based on role
  if (user.role === "admin") {
    location.href = "admin.html";
  } else {
    location.href = "teachers.html";
  }
}