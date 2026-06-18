// Jewelry Stock Data
const JEWELRY_STOCK = [
  {
    code: "SKJ-G-101",
    name: "Antique Gold Necklace",
    category: "Gold",
    weight: "42.50 g",
    purity: "22K BIS Hallmarked",
    stockStatus: "In Stock",
    image: "assets/images/gold_necklace.png",
    imageClass: "img-antique"
  },
  {
    code: "SKJ-D-201",
    name: "Diamond Bridal Set",
    category: "Diamond",
    weight: "14.20 ct",
    purity: "VVS-VS E-F Certified",
    stockStatus: "Limited Stock",
    image: "assets/images/bridal_set.png",
    imageClass: ""
  },
  {
    code: "SKJ-P-301",
    name: "Pearl Choker",
    category: "Pearl",
    weight: "28.00 g",
    purity: "Natural Basra Pearls",
    stockStatus: "In Stock",
    image: "assets/images/pearl_choker.png",
    imageClass: ""
  },
  {
    code: "SKJ-G-102",
    name: "Temple Jewellery Set",
    category: "Gold",
    weight: "68.20 g",
    purity: "22K Antique Finish",
    stockStatus: "In Stock",
    image: "assets/images/gold_necklace.png",
    imageClass: "img-antique"
  },
  {
    code: "SKJ-G-103",
    name: "Gold Bangles Set",
    category: "Gold",
    weight: "34.00 g",
    purity: "22K BIS Hallmarked",
    stockStatus: "In Stock",
    image: "assets/images/gold_bangles.png",
    imageClass: ""
  },
  {
    code: "SKJ-D-202",
    name: "Solitaire Diamond Ring",
    category: "Diamond",
    weight: "1.50 ct",
    purity: "IF D-Color Excellent Cut",
    stockStatus: "Limited Stock",
    image: "assets/images/diamond_ring.png",
    imageClass: ""
  },
  {
    code: "SKJ-S-401",
    name: "Premium Silver Puja Thali Set",
    category: "Silver",
    weight: "320.00 g",
    purity: "925 Sterling Silver",
    stockStatus: "In Stock",
    image: "assets/images/gold_bangles.png",
    imageClass: "img-silver"
  },
  {
    code: "SKJ-P-302",
    name: "Royal Pearl Drop Earrings",
    category: "Pearl",
    weight: "12.50 g",
    purity: "South Sea Pearls & Gold",
    stockStatus: "In Stock",
    image: "assets/images/pearl_choker.png",
    imageClass: "img-rose-gold"
  },
  {
    code: "SKJ-S-402",
    name: "Designer Silver Kada",
    category: "Silver",
    weight: "45.00 g",
    purity: "925 Sterling Silver",
    stockStatus: "In Stock",
    image: "assets/images/gold_bangles.png",
    imageClass: "img-silver"
  },
  {
    code: "SKJ-D-203",
    name: "Diamond Floral Pendant",
    category: "Diamond",
    weight: "3.45 ct",
    purity: "VVS-VS Certified",
    stockStatus: "Limited Stock",
    image: "assets/images/diamond_ring.png",
    imageClass: "img-rose-gold"
  }
];

// WhatsApp Global Config
const WHATSAPP_NUMBER = "9652424876";

// -------------------------------------------------------------
// Common Navigation & Scroll Behaviors
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initRevealOnScroll();
  
  // Conditionally init based on which page is active
  if (document.querySelector(".carousel-track")) {
    initTestimonialCarousel();
  }
  if (document.querySelector(".gallery-grid")) {
    initGalleryLightbox();
  }
  if (document.getElementById("products-catalog-grid")) {
    initProductsCatalog();
  }
  if (document.getElementById("best-sellers-grid")) {
    renderBestSellers();
  }
  
  initWhatsAppLinks();
});

// Navbar logic: scroll coloring & burger menu
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky color swap on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  });

  // Close menu on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.classList.remove("overflow-hidden");
    });
  });
}

// Reveal elements on scroll (subtle fade in)
function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);
  reveals.forEach(el => observer.observe(el));
}

// -------------------------------------------------------------
// Testimonials Slider (Auto Carousel)
// -------------------------------------------------------------
function initTestimonialCarousel() {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const dotsContainer = document.querySelector(".carousel-dots");
  
  let currentIndex = 0;
  let autoSlideTimer;

  // Create dot indicators
  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (idx === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Slide ${idx + 1}`);
    dotsContainer.appendChild(dot);
    
    dot.addEventListener("click", () => {
      goToSlide(idx);
      resetAutoSlide();
    });
  });

  const dots = Array.from(dotsContainer.children);

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots[currentIndex].classList.remove("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 5000); // 5 seconds interval
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  startAutoSlide();
}

// -------------------------------------------------------------
// Gallery Lightbox Modal
// -------------------------------------------------------------
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const captionText = item.querySelector("h3").innerText;
      
      lightboxImg.src = img.src;
      lightboxCaption.innerText = captionText;
      
      lightbox.classList.add("active");
      document.body.classList.add("overflow-hidden");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// -------------------------------------------------------------
// WhatsApp Message Builder
// -------------------------------------------------------------
function initWhatsAppLinks() {
  // Update floating button
  const floatBtn = document.querySelector(".floating-whatsapp");
  if (floatBtn) {
    const text = encodeURIComponent("Hello Sampatraj Kantilal Jain Jewellers, I would like to enquire about your jewellery collection.");
    floatBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }
}

function buildWhatsAppMessage(product) {
  const text = `Hello Sampatraj Kantilal Jain Jewellers, I would like to enquire about your jewellery item:
- Name: ${product.name}
- Code: ${product.code}
- Category: ${product.category}
- Weight: ${product.weight}
- Purity: ${product.purity}

Please share details and current pricing.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// -------------------------------------------------------------
// Best Sellers Rendering (Home page)
// -------------------------------------------------------------
function renderBestSellers() {
  const grid = document.getElementById("best-sellers-grid");
  if (!grid) return;
  
  // Pick first 6 items
  const bestSellers = JEWELRY_STOCK.slice(0, 6);
  grid.innerHTML = "";
  
  bestSellers.forEach(prod => {
    const cardHtml = `
      <article class="product-card reveal">
        <div class="product-img-wrapper">
          <img src="${prod.image}" alt="${prod.name}" class="${prod.imageClass || ''}" loading="lazy">
          <span class="product-badge">${prod.stockStatus}</span>
        </div>
        <div class="product-info">
          <span class="product-category">${prod.category} Jewellery</span>
          <h3 class="product-name">${prod.name}</h3>
          <div class="product-specs">
            <div>
              <span>Weight:</span>
              <span class="product-spec-val">${prod.weight}</span>
            </div>
            <div>
              <span>Purity:</span>
              <span class="product-spec-val">${prod.purity.split(" ")[0]}</span>
            </div>
          </div>
          <a href="${buildWhatsAppMessage(prod)}" target="_blank" class="product-enquire-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.904 7.904 0 0 0 1.08 3.971L0 16l4.23-1.11a7.9 7.9 0 0 0 3.758.955h.001c4.4 0 7.96-3.558 7.967-7.93a7.882 7.882 0 0 0-2.356-5.589zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.1-1.198-.591-1.385-.658-.187-.067-.323-.1-.459.1-.137.2-.53.63-.649.763-.119.13-.24.147-.442.047-1.767-.88-2.894-1.811-3.385-2.655-.119-.2-.016-.307.083-.406.09-.088.202-.23.303-.346.101-.115.137-.195.205-.327.068-.13.035-.245-.018-.346-.053-.1-.459-1.107-.63-1.513-.166-.399-.333-.344-.459-.35-.12-.005-.258-.006-.395-.006a.78.78 0 0 0-.56.26c-.202.222-.77.751-.77 1.83 0 1.077.78 2.122.89 2.272.11.15 1.528 2.33 3.7 3.27.518.224.924.358 1.24.457.52.165.992.141 1.365.086.417-.061 1.198-.49 1.367-.963.17-.472.17-.878.119-.963-.05-.084-.188-.133-.39-.232z"/>
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </article>
    `;
    grid.insertAdjacentHTML("beforeend", cardHtml);
  });
  
  // Re-run observer since elements were dynamically added
  initRevealOnScroll();
}

// -------------------------------------------------------------
// Products Catalog Stock Page Logic (products.html)
// -------------------------------------------------------------
function initProductsCatalog() {
  const grid = document.getElementById("products-catalog-grid");
  const searchInput = document.getElementById("product-search");
  const filterBtns = document.querySelectorAll(".filter-btn");
  
  let currentFilter = "All";
  let searchQuery = "";

  function renderCatalog() {
    grid.innerHTML = "";
    
    // Filter array
    const filtered = JEWELRY_STOCK.filter(prod => {
      const matchesCategory = (currentFilter === "All" || prod.category === currentFilter);
      const matchesSearch = (prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             prod.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             prod.purity.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-products-msg">No products found matching your search. Please contact us for custom designs.</div>`;
      return;
    }

    filtered.forEach(prod => {
      const cardHtml = `
        <article class="product-card reveal active">
          <div class="product-img-wrapper">
            <img src="${prod.image}" alt="${prod.name}" class="${prod.imageClass || ''}" loading="lazy">
            <span class="product-badge ${prod.stockStatus.toLowerCase().includes('limited') ? 'limited' : ''}">${prod.stockStatus}</span>
          </div>
          <div class="product-info">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="product-category">${prod.category} Jewellery</span>
              <span style="font-size:0.7rem; color:#888; font-weight:600;">${prod.code}</span>
            </div>
            <h3 class="product-name">${prod.name}</h3>
            <div class="product-specs">
              <div>
                <span>Weight:</span>
                <span class="product-spec-val">${prod.weight}</span>
              </div>
              <div>
                <span>Purity:</span>
                <span class="product-spec-val">${prod.purity.split(" ")[0]}</span>
              </div>
            </div>
            <a href="${buildWhatsAppMessage(prod)}" target="_blank" class="product-enquire-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.904 7.904 0 0 0 1.08 3.971L0 16l4.23-1.11a7.9 7.9 0 0 0 3.758.955h.001c4.4 0 7.96-3.558 7.967-7.93a7.882 7.882 0 0 0-2.356-5.589zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.1-1.198-.591-1.385-.658-.187-.067-.323-.1-.459.1-.137.2-.53.63-.649.763-.119.13-.24.147-.442.047-1.767-.88-2.894-1.811-3.385-2.655-.119-.2-.016-.307.083-.406.09-.088.202-.23.303-.346.101-.115.137-.195.205-.327.068-.13.035-.245-.018-.346-.053-.1-.459-1.107-.63-1.513-.166-.399-.333-.344-.459-.35-.12-.005-.258-.006-.395-.006a.78.78 0 0 0-.56.26c-.202.222-.77.751-.77 1.83 0 1.077.78 2.122.89 2.272.11.15 1.528 2.33 3.7 3.27.518.224.924.358 1.24.457.52.165.992.141 1.365.086.417-.061 1.198-.49 1.367-.963.17-.472.17-.878.119-.963-.05-.084-.188-.133-.39-.232z"/>
              </svg>
              Enquire on WhatsApp
            </a>
          </div>
        </article>
      `;
      grid.insertAdjacentHTML("beforeend", cardHtml);
    });
  }

  // Live Search
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderCatalog();
  });

  // Filter category buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderCatalog();
    });
  });

  // Initial render
  renderCatalog();
}
