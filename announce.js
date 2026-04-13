document.addEventListener("DOMContentLoaded", () => {

  // ANNOUNCEMENT BAR

  const announcementBar = document.getElementById("announcementBar");

  if (announcementBar) {
    announcementBar.innerHTML = "Loading...";

    fetch("/api/announcements")
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          announcementBar.innerHTML = "No announcements available";
          return;
        }

        announcementBar.innerHTML = data
          .map(item => `<span>${item.message}</span>`)
          .join(" | ");
      })
      .catch(() => {
        announcementBar.innerHTML = "Failed to load announcements";
      });
  }

  // HERO CAROUSEL (DYNAMIC)
 
  const carouselContainer = document.getElementById("carouselSlides");

  let currentSlide = 0;
  let slides = [];

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  window.nextSlide = function () {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  window.prevSlide = function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  if (carouselContainer) {
    fetch("/api/banners")
      .then(res => res.json())
      .then(data => {
        carouselContainer.innerHTML = data.map((item, index) => `
          <div class="carousel-slide ${index === 0 ? "active" : ""}" 
               style="background-image: url('${item.image}')">
            <div class="carousel-overlay"></div>
          </div>
        `).join("");

        slides = document.querySelectorAll(".carousel-slide");

        setInterval(() => {
          window.nextSlide();
        }, 5000);
      })
      .catch(() => {
        carouselContainer.innerHTML = "<p style='color:white'>Failed to load banners</p>";
      });
  }

  // EVENTS SECTION

  const eventsContainer = document.getElementById("eventsContainer");

  if (eventsContainer) {
    eventsContainer.innerHTML = "Loading...";

    fetch("/api/events")
      .then(res => res.json())
      .then(events => {
        if (!events.length) {
          eventsContainer.innerHTML = "No events available";
          return;
        }

        eventsContainer.innerHTML = events.map(event => `
          <div class="event-card">
            <h3>${event.eventName}</h3>
            <p>${event.date}</p>
            <p>${event.description}</p>
          </div>
        `).join("");
      })
      .catch(() => {
        eventsContainer.innerHTML = "Failed to load events";
      });
  }

  // BOOKS SECTION

  const booksContainer = document.getElementById("booksContainer");

  if (booksContainer) {
    booksContainer.innerHTML = "Loading...";

    fetch("/api/books")
      .then(res => res.json())
      .then(books => {
        if (!books.length) {
          booksContainer.innerHTML = "No books available";
          return;
        }

        booksContainer.innerHTML = books.map(book => `
          <div class="book-card">
            <img src="${book.coverImage}" alt="${book.bookName}" />
            <h4>${book.bookName}</h4>
            <a href="${book.fileURL}" target="_blank">Read</a>
          </div>
        `).join("");
      })
      .catch(() => {
        booksContainer.innerHTML = "Failed to load books";
      });
  }

  // GALLERY PREVIEW

  const galleryPreview = document.getElementById("galleryPreview");

  if (galleryPreview) {
    galleryPreview.innerHTML = "Loading...";

    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          galleryPreview.innerHTML = "No images available";
          return;
        }

        galleryPreview.innerHTML = data.slice(0, 6).map(img => `
          <img src="${img.url}" class="gallery-img" />
        `).join("");
      })
      .catch(() => {
        galleryPreview.innerHTML = "Failed to load gallery";
      });
  }

  // CONTACT FORM (IF EXISTS)

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name")?.value,
        email: document.getElementById("email")?.value,
        message: document.getElementById("message")?.value
      };

      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        alert("Message sent successfully!");
        contactForm.reset();
      } catch {
        alert("Failed to send message");
      }
    });
  }

});