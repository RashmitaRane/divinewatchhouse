// --- Force Page to Top on Refresh ---
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
// --- Cart Logic ---
let cartCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById('cart-badge').innerText = cartCount;
  alert("Watch added to your cart!");
}

// --- Preload Images for Smooth Sliding ---
const imageUrls = [
  '../static/images/logo.png',
  '../static/images/img1.png',
  '../static/images/img2.png',
  '../static/images/img3.png',
  '../static/images/img4.png'
];

function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Preload images on page load
preloadImages(imageUrls);


// --- Sticky Header Logic ---
const header = document.querySelector('header');

function checkScroll() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Run the check when the user scrolls
window.addEventListener('scroll', checkScroll);

// Run the check IMMEDIATELY when the page refreshes!
checkScroll();


// --- Hero Slider Logic ---
let currentSlideIndex = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Make the very first slide active when the page loads
if(slides.length > 0) {
  slides[0].classList.add('active');
}

function updateSliderPosition() {
  // Move the slider visually
  slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  
  // Remove 'active' class from ALL slides
  slides.forEach(slide => slide.classList.remove('active'));
  
  // Force browser reflow to restart CSS animation, wait 10ms
  setTimeout(() => {
    slides[currentSlideIndex].classList.add('active');
  }, 10);
}

function moveSlide(direction) {
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }
  
  updateSliderPosition();
}


// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal, .reveal-card');

const revealOptions = {
  threshold: 0.15, // Triggers when 15% is visible
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); 
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});