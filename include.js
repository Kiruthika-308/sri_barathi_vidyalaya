function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      if (id === "header") {
        setTimeout(() => {
          initHeader();
          setActiveMenu();
        }, 0);
      }
    });
}

// ✅ All header + sidebar logic here
function initHeader() {
  const burger = document.getElementById("burgerMenu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeSidebar");
  const header = document.getElementById("mainHeader");

  if (!burger || !sidebar || !overlay || !header) return;

  // Open/Close toggle
  const toggleMenu = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    burger.classList.toggle("active");

    const isOpen = burger.classList.contains("active");

    burger.textContent = isOpen ? "✖" : "☰";
    document.body.classList.toggle("no-scroll", isOpen);

    document.body.classList.toggle("no-scroll", isOpen);

  // 🔥 FORCE REPAINT FIX (THIS FIXES YOUR ISSUE)
  sidebar.style.transform = "translateZ(0)";
  };

  burger.addEventListener("click", toggleMenu);

  // Close function
  const closeMenu = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    burger.classList.remove("active");
    burger.textContent = "☰";
    document.body.classList.remove("no-scroll");

    header.style.transform = "translateY(0)";
  };

  overlay.addEventListener("click", closeMenu);

  document.querySelectorAll("#sidebar a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }
}

// Sidebar dropdown
function toggleDropdown(icon) {
  const parent = icon.closest(".sidebar-drop-link");
  const menu = parent.nextElementSibling;

  // Close others
  document.querySelectorAll(".sidebar-dropdown-content").forEach(item => {
    if (item !== menu) {
      item.classList.remove("show");
    }
  });

  document.querySelectorAll(".sidebar-drop-link").forEach(link => {
    if (link !== parent) {
      link.classList.remove("active");
    }
  });

  // Toggle current
  menu.classList.toggle("show");
  parent.classList.toggle("active");
}

function setActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop();

  // ===== DESKTOP NAV =====
  document.querySelectorAll("#mainHeader nav a").forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");

      // If inside dropdown
      const dropdown = link.closest(".nav-dropdown");
      if (dropdown) {
        const parent = dropdown.querySelector(".nav-drop-link");
        if (parent) parent.classList.add("active");
      }
    }
  });

  // ===== SIDEBAR =====
  document.querySelectorAll("#sidebar a").forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");

      // If inside sidebar dropdown
      const dropdown = link.closest(".sidebar-dropdown");
      if (dropdown) {
        const content = dropdown.querySelector(".sidebar-dropdown-content");
        const parent = dropdown.querySelector(".sidebar-drop-link");

        if (content) content.classList.add("show");
        if (parent) parent.classList.add("active-parent");
      }
    }
  });
}

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");