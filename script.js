// ==================================================
// ✅ FORM SUBMISSION (Burrah Integration)
// ==================================================
document.addEventListener("DOMContentLoaded", function () {
  // Handle scroll issues when returning from product pages
  if (window.location.hash) {
    // Remove any hash from URL to prevent scroll issues
    window.history.replaceState(null, null, window.location.pathname);
  }

  // Ensure page starts at top
  window.scrollTo(0, 0);

  const form = document.getElementById("myForm");

  if (!form) return; // Exit if form doesn't exist

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fd = new FormData(form);

    try {
      const res = await fetch("https://burrah.51development.shop/submit.php", {
        method: "POST",
        body: fd,
      });

      const ct = res.headers.get("content-type") || "";
      let data;
      if (ct.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      // ✅ Toast on success
      if (data && data.message === "Data successfully inserted") {
        showBurrahToast("🎉 Your form has been submitted!", "success");
        form.reset();
      } else {
        showBurrahToast("Something went wrong. Please try again.", "error");
      }
    } catch (err) {
      console.error("Burrah Form Error:", err);
      showBurrahToast("Network error. Please check your connection.", "error");
    }
  });
});

// ===== Toast Function =====
function showBurrahToast(msg, type = "info") {
  const toast = document.getElementById("burrahToast");
  if (!toast) return; // Exit if toast doesn't exist

  toast.textContent = msg;
  toast.className = `show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 6000); // Increased from 3 seconds to 6 seconds for better readability
}

// ==================================================
// ✅ SOCIAL MEDIA LINKS
// ==================================================
const instagramEl = document.getElementById("instagram");
if (instagramEl) {
  instagramEl.addEventListener("click", function () {
    window.open(
      "https://www.instagram.com/sipburrah?igsh=cnEzbTd0dzBweHVw",
      "_blank"
    );
  });
}

const facebookEl = document.getElementById("facebook");
if (facebookEl) {
  facebookEl.addEventListener("click", function () {
    window.open("https://www.facebook.com/share/19GYamXkgC/", "_blank");
  });
}

const linkedinEl = document.getElementById("linkedin");
if (linkedinEl) {
  linkedinEl.addEventListener("click", function () {
    window.open(
      "https://www.linkedin.com/in/prepuni?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      "_blank"
    );
  });
}

// ==================================================
// ✅ LOCOMOTIVE + SCROLLTRIGGER SETUP
// ==================================================

// Scroll to top on reload (optional)
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
// // ===== Init Locomotive Function =====
function initLoco() {
  const scrollEl = document.querySelector(".main");

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    getDirection: true,
    inertia: 0.8, // desktop inertia
    multiplier: 1.8, // ⬅️ desktop scroll speed fast

    smoothMobile: true,
    smartphone: {
      smooth: true,
      inertia: 0.9,
      multiplier: 2.2, // ⬅️ mobile scroll speed faster
    },
    tablet: {
      smooth: true,
      inertia: 0.6,
      multiplier: 2, // ⬅️ tablet scroll speed faster
    },
  });

  // ===== GSAP + Locomotive Integration =====
  gsap.registerPlugin(ScrollTrigger);
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollEl, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollEl.style.transform ? "transform" : "fixed",
  });

  // ===== Refresh scroll & trigger =====
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
}

// ===== Initialize Locomotive =====
let locoScroll = initLoco();

// ===== Extra fixes for reloads & iOS =====
function locoUpdateFix() {
  setTimeout(() => {
    if (locoScroll) {
      locoScroll.update();
      ScrollTrigger.refresh();
    }
  }, 500);
}

// Force update after page is fully loaded to ensure footer is scrollable
window.addEventListener("load", function () {
  locoUpdateFix();
  // Additional update after a longer delay to catch any dynamic content
  setTimeout(() => {
    if (locoScroll) {
      locoScroll.update();
      ScrollTrigger.refresh();
    }
  }, 1000);
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) locoUpdateFix();
});
window.addEventListener("orientationchange", locoUpdateFix);

// Update scroll on resize to ensure proper height calculation
window.addEventListener("resize", function () {
  if (locoScroll) {
    setTimeout(() => {
      locoScroll.update();
      ScrollTrigger.refresh();
    }, 100);
  }
});

// ===== Force scroll to top on refresh =====
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// ==================================================
// ✅ HERO SECTION (Video + Content Animations)
// ==================================================
ScrollTrigger.matchMedia({
  // ----- Desktop -----
  "(min-width: 601px)": function () {
    gsap.to(".video", {
      y: 300,
      rotate: 10,
      scale: 0.75,
      scrollTrigger: {
        trigger: ".hero",
        start: "center center",
        end: "bottom+=450 top",
        scrub: true,
        scroller: ".main",
      },
      ease: "power1.out",
    });

    gsap.to(".content", {
      y: 300,
      rotate: 10,
      scale: 0.75,
      scrollTrigger: {
        trigger: ".hero",
        start: "center center",
        end: "bottom+=450 top",
        scrub: true,
        scroller: ".main",
      },
      ease: "power1.out",
    });
  },

  // ----- Mobile -----
  "(max-width: 600px)": function () {
    gsap.to(".hero", {
      x: 15,
      y: 100,
      rotate: 10,
      scale: 0.9,
      scrollTrigger: {
        trigger: ".hero",
        start: "center center",
        end: "bottom+=300 top",
        scrub: true,
        scroller: ".main",
      },
      ease: "power1.out",
    });

    gsap.to(".content", {
      y: 100,
      rotate: 10,
      scale: 0.9,
      scrollTrigger: {
        trigger: ".hero",
        start: "center center",
        end: "bottom+=300 top",
        scrub: true,
        scroller: ".main",
      },
      ease: "power1.out",
    });
  },
});

// ==================================================
// ✅ HERO SECTION (Text Animations)
// ==================================================

// ===== Split h1 text into spans =====
var text = document.querySelector(".content h1");
if (text) {
  var textkacontent = text.textContent;
  var splitedtext = textkacontent.split("");
  var splitedtag = "";

  function breakthetext() {
    splitedtext.forEach((elem) => {
      splitedtag += `<span>${elem}</span>`;
    });
    text.innerHTML = splitedtag;
  }

  breakthetext();
}

// ===== GSAP animations for h1, h3, p =====
ScrollTrigger.matchMedia({
  // ----- Desktop -----
  "(min-width: 601px)": function () {
    // Bharat KA - unique quick tighten + slide-in
    gsap.fromTo(
      ".bharat-text",
      { opacity: 0, y: -12, scale: 0.98, letterSpacing: "1.6vw" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        letterSpacing: "1vw",
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bharat-text",
          start: "top 85%",
          scroller: ".main",
        },
      }
    );

    // h1 letters
    gsap.from(".content h1 span", {
      opacity: 0,
      y: 100,
      delay: 0.2,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".content h1",
        start: "top 80%",
        scroller: ".main",
      },
    });

    // Bubbles fade-in after heading
    gsap.to(".hero-bubbles", {
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
      delay: 0.9, // roughly after h1 letters complete
      scrollTrigger: {
        trigger: ".content h1",
        start: "top 80%",
        scroller: ".main",
        once: true,
      },
    });

    // h3
    gsap.from(".content h3", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".content h3",
        start: "top 85%",
        scroller: ".main",
      },
    });

    // paragraph
    gsap.from(".content p", {
      opacity: 0,
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-200, 200),
      rotate: () => gsap.utils.random(-90, 90),
      duration: 1.2,
      ease: "back.out(2)",
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".content p",
        start: "top 85%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
        scroller: ".main",
      },
    });
  },

  // ----- Mobile -----
  "(max-width: 600px)": function () {
    // Bharat KA - mobile quick tighten + slide-in
    gsap.fromTo(
      ".bharat-text",
      { opacity: 0, y: -10, scale: 0.985, letterSpacing: "1.6vw" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        letterSpacing: "1vw",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bharat-text",
          start: "top 90%",
          scroller: ".main",
        },
      }
    );

    // h1 letters
    gsap.from(".content h1 span", {
      opacity: 0,
      y: 50,
      duration: 2,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".content h1",
        start: "top 85%",
        scroller: ".main",
      },
    });

    // Bubbles fade-in after heading (mobile)
    gsap.to(".hero-bubbles", {
      opacity: 1,
      duration: 0.7,
      ease: "power1.out",
      delay: 0.9,
      scrollTrigger: {
        trigger: ".content h1",
        start: "top 85%",
        scroller: ".main",
        once: true,
      },
    });

    // h3
    gsap.from(".content h3", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".content h3",
        start: "top 90%",
        scroller: ".main",
      },
    });

    // paragraph
    gsap.from(".content p ", {
      opacity: 0,
      x: () => gsap.utils.random(-100, 100),
      y: () => gsap.utils.random(-80, 80),
      rotate: () => gsap.utils.random(-45, 45),
      duration: 1,
      ease: "back.out(2)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".content p",
        start: "top 90%",
        end: "bottom 70%",
        toggleActions: "play none none reverse",
        scroller: ".main",
      },
    });
  },
});

// ==================================================
// ✅ STORY COVER SECTION - Interactive Slider
// ==================================================
let currentSlide = 0;
const totalSlides = 5;
let autoSlideInterval;
let userInteractionTimeout;
let isAutoSlidePaused = false;

// Initialize Story Cover
function initStoryCover() {
  const slides = document.querySelectorAll(".story_slide");
  const dots = document.querySelectorAll(".nav_dot");
  const prevBtn = document.querySelector(".prev_btn");
  const nextBtn = document.querySelector(".next_btn");
  const playPauseBtn = document.querySelector("#playPauseBtn");
  const progressBar = document.querySelector(".progress_bar");

  // Debug: Check if elements are found
  console.log("Story Cover Elements Found:", {
    slides: slides.length,
    dots: dots.length,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn,
    progressBar: !!progressBar,
  });

  // Update slide display
  function updateSlide() {
    console.log("Updating slide to:", currentSlide);

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    // Update progress bar
    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
    }

    // Update navigation buttons
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }
  }

  // Go to specific slide
  function goToSlide(slideIndex) {
    console.log("goToSlide called with index:", slideIndex);
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      currentSlide = slideIndex;
      console.log("goToSlide, new current slide:", currentSlide);
      updateSlide();
    }
  }

  // Next slide
  function nextSlide() {
    console.log("Next slide called, current:", currentSlide);
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0; // Loop back to first slide
    }
    console.log("Next slide, new current:", currentSlide);
    updateSlide();
  }

  // Previous slide
  function prevSlide() {
    console.log("Prev slide called, current:", currentSlide);
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1; // Loop to last slide
    }
    console.log("Prev slide, new current:", currentSlide);
    updateSlide();
  }

  // Auto slide functionality
  function startAutoSlide() {
    if (isAutoSlidePaused) {
      console.log("Auto slide is paused - not starting");
      return;
    }
    console.log("Starting auto slide, current slide:", currentSlide);

    // Start the first slide cycle
    startSlideCycle();
  }

  function startSlideCycle() {
    // Reset progress bar
    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      // Force reflow
      progressBar.offsetHeight;
    }

    // Animate progress bar to 100% over 3 seconds
    if (progressBar) {
      progressBar.style.transition = "width 3s linear";
      progressBar.style.width = "100%";
    }

    // Change slide after exactly 3 seconds
    autoSlideInterval = setTimeout(() => {
      console.log("Auto slide triggered, current slide:", currentSlide);
      nextSlide();
      // Start next cycle
      startSlideCycle();
    }, 3000);

    console.log("Auto slide timeout set:", autoSlideInterval);
  }

  function stopAutoSlide() {
    console.log("Stopping auto slide");
    if (autoSlideInterval) {
      clearTimeout(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  function handleUserInteraction() {
    console.log("User interaction detected - stopping auto slide");
    stopAutoSlide();

    // Clear any existing timeout
    if (userInteractionTimeout) {
      clearTimeout(userInteractionTimeout);
    }

    // Only restart auto slide if not manually paused
    if (!isAutoSlidePaused) {
      userInteractionTimeout = setTimeout(() => {
        console.log("User inactive for 5 seconds - restarting auto slide");
        startAutoSlide();
      }, 5000);
    }
  }

  function togglePlayPause() {
    const icon = playPauseBtn.querySelector("i");

    if (isAutoSlidePaused) {
      // Resume auto slide
      isAutoSlidePaused = false;
      icon.className = "ri-pause-line";
      playPauseBtn.classList.remove("paused");
      startAutoSlide();
      console.log("Auto slide resumed");
    } else {
      // Pause auto slide
      isAutoSlidePaused = true;
      icon.className = "ri-play-line";
      playPauseBtn.classList.add("paused");
      stopAutoSlide();
      // Clear any pending restart timeout
      if (userInteractionTimeout) {
        clearTimeout(userInteractionTimeout);
        userInteractionTimeout = null;
      }
      console.log("Auto slide paused");
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      handleUserInteraction(); // Stop auto slide and restart after inactivity
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      handleUserInteraction(); // Stop auto slide and restart after inactivity
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", togglePlayPause);
  }

  // Add interactive click effects for all slide elements
  // Slide 1 elements
  const storyTitle = document.querySelector(".story_title");
  const storySubtitle = document.querySelector(".story_subtitle");
  const storyHighlight = document.querySelector(".story_highlight");

  // Slide 2 elements
  const brandTitle = document.querySelector(".brand_title");
  const brandSubtitle = document.querySelector(".brand_subtitle");
  const featureItems = document.querySelectorAll(".feature_item");

  // Slide 3 elements
  const flavorsTitle = document.querySelector(".flavors_title");
  const flavorCards = document.querySelectorAll(".flavor_card");
  const flavorsFooter = document.querySelector(".flavors_footer");

  // Slide 4 elements
  const inclusivityTitle = document.querySelector(".inclusivity_title");
  const inclusivityText = document.querySelector(".inclusivity_text");
  const scenarios = document.querySelectorAll(".scenario_item");
  const inclusivityTags = document.querySelectorAll(".tag");
  const inclusivityFooter = document.querySelector(".inclusivity_footer");

  // Slide 5 elements
  const ctaTitle = document.querySelector(".cta_title");
  const testimonial = document.querySelector(".testimonial");
  const ctaText = document.querySelector(".cta_text");
  const finalCtaH2 = document.querySelector(".final_cta h2");
  const ctaValues = document.querySelectorAll(".cta_values span");
  const ctaHighlight = document.querySelector(".cta_highlight");

  // Add click effects for all slides
  // Slide 1 click effects
  if (storyTitle) {
    storyTitle.addEventListener("click", () => {
      storyTitle.style.animation = "none";
      storyTitle.offsetHeight;
      storyTitle.style.animation = "bounce 0.6s ease-in-out";
    });
  }

  if (storySubtitle) {
    storySubtitle.addEventListener("click", () => {
      storySubtitle.style.animation = "none";
      storySubtitle.offsetHeight;
      storySubtitle.style.animation = "slideInUp 0.6s ease-out";
    });
  }

  if (storyHighlight) {
    storyHighlight.addEventListener("click", () => {
      storyHighlight.style.animation = "none";
      storyHighlight.offsetHeight;
      storyHighlight.style.animation = "bounce 0.8s ease-in-out";
    });
  }

  // Slide 2 click effects
  if (brandTitle) {
    brandTitle.addEventListener("click", () => {
      brandTitle.style.animation = "none";
      brandTitle.offsetHeight;
      brandTitle.style.animation = "slideInScale 0.6s ease-out";
    });
  }

  if (brandSubtitle) {
    brandSubtitle.addEventListener("click", () => {
      brandSubtitle.style.animation = "none";
      brandSubtitle.offsetHeight;
      brandSubtitle.style.animation = "slideInUp 0.6s ease-out";
    });
  }

  featureItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      item.style.animation = "none";
      item.offsetHeight;
      item.style.animation = `bounce 0.6s ease-in-out ${index * 0.1}s`;
    });
  });

  // Slide 3 click effects
  if (flavorsTitle) {
    flavorsTitle.addEventListener("click", () => {
      flavorsTitle.style.animation = "none";
      flavorsTitle.offsetHeight;
      flavorsTitle.style.animation = "bounce 0.6s ease-in-out";
    });
  }

  flavorCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      card.style.animation = "none";
      card.offsetHeight;
      card.style.animation = `bounce 0.8s ease-in-out ${index * 0.2}s`;
    });
  });

  if (flavorsFooter) {
    flavorsFooter.addEventListener("click", () => {
      flavorsFooter.style.animation = "none";
      flavorsFooter.offsetHeight;
      flavorsFooter.style.animation = "slideInUp 0.6s ease-out";
    });
  }

  // Slide 4 click effects
  if (inclusivityTitle) {
    inclusivityTitle.addEventListener("click", () => {
      inclusivityTitle.style.animation = "none";
      inclusivityTitle.offsetHeight;
      inclusivityTitle.style.animation = "bounce 0.6s ease-in-out";
    });
  }

  if (inclusivityText) {
    inclusivityText.addEventListener("click", () => {
      inclusivityText.style.animation = "none";
      inclusivityText.offsetHeight;
      inclusivityText.style.animation = "slideInUp 0.6s ease-out";
    });
  }

  scenarios.forEach((scenario, index) => {
    scenario.addEventListener("click", () => {
      scenario.style.animation = "none";
      scenario.offsetHeight;
      scenario.style.animation = `bounce 0.5s ease-in-out ${index * 0.1}s`;
    });
  });

  inclusivityTags.forEach((tag, index) => {
    tag.addEventListener("click", () => {
      tag.style.animation = "none";
      tag.offsetHeight;
      tag.style.animation = `bounce 0.5s ease-in-out ${index * 0.1}s`;
    });
  });

  if (inclusivityFooter) {
    inclusivityFooter.addEventListener("click", () => {
      inclusivityFooter.style.animation = "none";
      inclusivityFooter.offsetHeight;
      inclusivityFooter.style.animation = "slideInUp 0.6s ease-out";
    });
  }

  // Slide 5 click effects
  if (ctaTitle) {
    ctaTitle.addEventListener("click", () => {
      ctaTitle.style.animation = "none";
      ctaTitle.offsetHeight;
      ctaTitle.style.animation = "bounce 0.6s ease-in-out";
    });
  }

  if (testimonial) {
    testimonial.addEventListener("click", () => {
      testimonial.style.animation = "none";
      testimonial.offsetHeight; // Force reflow
      testimonial.style.animation = "slideInScale 0.6s ease-out";
    });
  }

  if (ctaText) {
    ctaText.addEventListener("click", () => {
      ctaText.style.animation = "none";
      ctaText.offsetHeight; // Force reflow
      ctaText.style.animation = "slideInUp 0.6s ease-out";
    });
  }

  if (finalCtaH2) {
    finalCtaH2.addEventListener("click", () => {
      finalCtaH2.style.animation = "none";
      finalCtaH2.offsetHeight; // Force reflow
      finalCtaH2.style.animation = "bounce 0.8s ease-in-out";
    });
  }

  ctaValues.forEach((span, index) => {
    span.addEventListener("click", () => {
      span.style.animation = "none";
      span.offsetHeight; // Force reflow
      span.style.animation = `bounce 0.6s ease-in-out ${index * 0.1}s`;
    });
  });

  if (ctaHighlight) {
    ctaHighlight.addEventListener("click", () => {
      ctaHighlight.style.animation = "none";
      ctaHighlight.offsetHeight; // Force reflow
      ctaHighlight.style.animation = "bounce 1s ease-in-out";
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      handleUserInteraction(); // Stop auto slide and restart after inactivity
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      nextSlide();
      handleUserInteraction(); // Stop auto slide and restart after inactivity
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
      handleUserInteraction(); // Stop auto slide and restart after inactivity
    }
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;

    const diffX = startX - endX;
    const diffY = startY - endY;

    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
      handleUserInteraction(); // Stop auto slide and restart after inactivity
    }
  });

  // Pause auto slide on hover
  const storyCover = document.querySelector(".story_cover");
  if (storyCover) {
    storyCover.addEventListener("mouseenter", stopAutoSlide);
    storyCover.addEventListener("mouseleave", startAutoSlide);
  }

  // Initialize
  updateSlide();
  startAutoSlide();

  // Test: Add manual next slide trigger for debugging
  window.testNextSlide = nextSlide;
  window.testPrevSlide = prevSlide;
  console.log(
    "Test functions available: window.testNextSlide() and window.testPrevSlide()"
  );
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the about page
  const storyCover = document.querySelector(".story_cover");
  if (storyCover) {
    initStoryCover();
  }
});

// Floating elements animation
function animateFloatingElements() {
  const bottles = document.querySelectorAll(".floating_bottle");
  const fruits = document.querySelectorAll(".floating_fruit");

  bottles.forEach((bottle, index) => {
    gsap.to(bottle, {
      y: -30,
      rotation: 10,
      duration: 3 + index,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.5,
    });
  });

  fruits.forEach((fruit, index) => {
    gsap.to(fruit, {
      y: -20,
      rotation: 15,
      duration: 2 + index,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.3,
    });
  });
}

// Initialize floating animations
document.addEventListener("DOMContentLoaded", animateFloatingElements);

// ==================================================
// Story Cover Show/Hide Functionality (Removed - now separate page)
// ==================================================

// ==================================================
// ✅ SECOND SECTION (Word Animations)
// ==================================================

// ===== Split h1 text into words =====
document.querySelectorAll(".second_section h1").forEach((h1) => {
  let content = h1.innerHTML;
  let wrapped = "";

  content.split(/(<br\s*\/?>)/gi).forEach((part) => {
    if (part.match(/<br\s*\/?>/i)) {
      wrapped += part;
    } else {
      part.split(" ").forEach((word, i, arr) => {
        if (word.trim() !== "") {
          wrapped += `<span class="word">${word}</span>`;
        }
        if (i < arr.length - 1) wrapped += " ";
      });
    }
  });

  h1.innerHTML = wrapped;
});

// ===== GSAP word color animation =====
ScrollTrigger.matchMedia({
  "(min-width: 601px)": function () {
    gsap.to(".second_section h1 .word", {
      color: "#f9e6d6",
      stagger: { amount: 2, from: "start" },
      ease: "none",
      scrollTrigger: {
        trigger: ".second_section",
        scroller: ".main",
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
  },

  "(max-width: 600px)": function () {
    gsap.to(".second_section h1 .word", {
      color: "#f9e6d6",
      stagger: { amount: 1, from: "start" },
      ease: "none",
      scrollTrigger: {
        trigger: ".second_section",
        scroller: ".main",
        start: "top 90%",
        end: "bottom 60%",
        scrub: true,
      },
    });
  },
});

// ==================================================
// ✅ THIRD SECTION (Horizontal Scroll + Text Animations)
// ==================================================

// ===== Horizontal scroll (desktop) & vertical flow (mobile) =====
ScrollTrigger.matchMedia({
  "(min-width: 601px)": function () {
    const slider = document.querySelector(".slider-lower");
    if (!slider) return;
    let totalScroll = slider.scrollWidth - window.innerWidth;

    gsap.to(slider, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: ".third_section",
        start: "top top",
        end: () => "+=" + totalScroll,
        scrub: 1,
        scroller: ".main",
        pin: true,
        anticipatePin: 1,
      },
    });
  },

  "(max-width: 600px)": function () {
    const slider = document.querySelector(".slider-lower");
    if (!slider) return;
    gsap.set(slider, { clearProps: "transform" });
  },
});

// ===== Text animations (third section) =====
ScrollTrigger.matchMedia({
  "(min-width: 601px)": function () {
    gsap.from(".slider-lower h1", {
      opacity: 0,
      y: 20,
      duration: 1.8,
      scrollTrigger: {
        trigger: ".slider-lower h1",
        start: "top 80%",
        scrub: true,
        scroller: ".main",
      },
    });

    gsap.from(".slider-lower span", {
      clipPath: "inset(0 50% 0 50%)",
      duration: 1,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".slider-lower span",
        start: "top 85%",
        scrub: true,
        scroller: ".main",
      },
    });

    gsap.to("#slide_1", {
      x: -100,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#slide_1",
        start: "top 10%",
        scrub: true,
        scroller: ".main",
      },
    });
  },

  "(max-width: 600px)": function () {
    gsap.from(".slider-lower h1 ", {
      opacity: 0,
      y: 50,
      duration: 2,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slider-lower h1",
        start: "top 85%",
        scrub: true,
        scroller: ".main",
      },
    });

    gsap.from(".slider-lower span", {
      clipPath: "inset(0 50% 0 50%)",
      duration: 1,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".slider-lower span",
        start: "top 85%",
        scrub: true,
        scroller: ".main",
      },
    });
  },
});

// ==================================================
// ✅ FOURTH SECTION (Fruits + Bottle Parallax + Text)
// ==================================================
// ===== Mousemove parallax effect =====
const slides = document.querySelectorAll(".slide");
slides.forEach((slide) => {
  const fruits = slide.querySelector(".fruits");
  const bottle = slide.querySelector(".bottle");
  if (!fruits || !bottle) return;

  if (window.innerWidth > 768) {
    slide.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = slide.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      gsap.to(bottle, {
        x: x * 0.05,
        y: y * 0.05,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto", // prevent jumpy effect
      });
      gsap.to(fruits, {
        x: -x * 0.05,
        y: -y * 0.05,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    slide.addEventListener("mouseleave", () => {
      gsap.to([fruits, bottle], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }
});

// ===== Split h1 into words =====
var fourthH1 = document.querySelector(".fourth_section h1");
if (fourthH1) {
  var h1Text = fourthH1.textContent.trim();
  var words = h1Text.split(" ");
  var rebuilt = "";

  function splitFourthH1() {
    words.forEach((word, i) => {
      rebuilt += `<span>${word}</span>`;
      if (i < words.length - 1) rebuilt += " ";
    });
    fourthH1.innerHTML = rebuilt;
  }

  splitFourthH1();
}

// ===== GSAP animations for h1 + p =====
ScrollTrigger.matchMedia({
  "(min-width: 601px)": function () {
    gsap.from(".fourth_section h1 span", {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        scrub: true,
        trigger: ".fourth_section h1",
        start: "top 80%",
        scroller: ".main",
      },
    });

    gsap.from(".fourth_section p", {
      opacity: 0,
      y: 10,
      ease: "back.out(2)",
      scrollTrigger: {
        scrub: true,
        trigger: ".fourth_section p",
        start: "top 65%",
        end: "bottom 50%",
        toggleActions: "play none none reverse",
        scroller: ".main",
      },
    });
  },

  "(max-width: 600px)": function () {
    gsap.from(".fourth_section h1 span", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        scrub: true,
        trigger: ".fourth_section h1",
        start: "top 85%",
        scroller: ".main",
      },
    });

    gsap.from(".fourth_section p", {
      opacity: 0,
      duration: 1,
      ease: "back.out(2)",
      stagger: 0.2,
      scrollTrigger: {
        scrub: true,
        trigger: ".fourth_section p",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
        scroller: ".main",
      },
    });
  },
});

// ==================================================
// ✅ FIFTH SECTION (Advantages Animations)
// ==================================================
ScrollTrigger.matchMedia({
  "(min-width: 601px)": function () {
    gsap.from(".fifth_section .adv-block", {
      clipPath: "inset(0 50% 0 50%)",
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.3,
      scrollTrigger: {
        scrub: true,
        trigger: ".fifth_section .advantages",
        start: "top 80%",
        end: "bottom 80%",
        scroller: ".main",
      },
    });
  },

  "(max-width: 600px)": function () {
    gsap.from(".fifth_section .adv-block", {
      clipPath: "inset(0 50% 0 50%)",
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.25,
      scrollTrigger: {
        scrub: true,
        trigger: ".fifth_section .advantages",
        start: "top 85%",
        end: "bottom 60%",
        scroller: ".main",
      },
    });
  },
});

gsap.registerPlugin(ScrollTrigger);
// ================================
// ✅ Timeline for layer + 7th section
// ================================
ScrollTrigger.matchMedia({
  "(min-width: 601px)": function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sixth_section",
        start: "top top",
        end: "+=150%",
        pin: ".video_wrapper",
        pinSpacing: true,
        scrub: true,
        scroller: ".main",
        // markers: true
      },
    });

    tl.to(".layer", {
      "--r": "150vmax",
      delay: 0,
      ease: "none",
      duration: 10,
    });

    gsap.to(".circular-text", {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  },

  "(max-width: 600px)": function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sixth_section",
        start: "top 0%",
        end: "+=150%",
        pin: ".video_wrapper",
        pinSpacing: true,
        scrub: true,
        scroller: ".main",
        // markers: true
      },
    });

    tl.to(".layer", {
      "--r": "150vmax",
      delay: 0,
      ease: "none",
      duration: 10,
    });

    gsap.to(".circular-text", {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  },
});

gsap.registerPlugin(ScrollTrigger);

// ================================
// ✅ Seventh Section Animations
// ================================
gsap.from(".seventh_section h1:nth-child(1)", {
  x: -200,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".seventh_section",
    start: "top 80%",
    scrub: true,
    scroller: ".main",
  },
});

gsap.from(".seventh_section h1:nth-child(2)", {
  x: 100,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".seventh_section",
    start: "top 80%",
    scrub: true,
    scroller: ".main",
  },
});

gsap.from(".seventh_section h1:nth-child(3)", {
  x: 200,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".seventh_section",
    start: "top 80%",
    scrub: true,
    scroller: ".main",
  },
});

// ================================
// ✅ Reel Boxes Animations (Desktop + Mobile)
// ================================
ScrollTrigger.matchMedia({
  // 💻 Desktop (601px and up)
  "(min-width: 601px)": function () {
    gsap.from(".reel_box", {
      x: 0,
      y: () => window.innerHeight,
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".inner_container",
        start: "top 100%",
        end: "top 20%",
        scrub: true,
        pin: true,
        scroller: ".main",
        // markers: true,
      },
    });
  },

  // 📱 Mobile (600px and below)
  "(max-width: 600px)": function () {
    gsap.from(".reel_box", {
      x: 200, // right side se thoda aaye
      y: () => window.innerHeight, // bottom se aaye
      xPercent: -50,
      yPercent: -30, // thoda kam shift mobile ke liye
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".inner_container",
        start: "top 78%",
        end: "top 20%",
        scrub: true,
        pin: true,
        scroller: ".main",
        // markers: true,
      },
    });
  },
});

// ================================
// ✅ Form Section Animations
// ================================
gsap.utils.toArray("#formSection .inputbox").forEach((input, i) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: input,
      start: "top 90%",
      end: "top 75%",
      toggleActions: "play none none reverse",
      scroller: ".main",
      scrub: true,
      // markers:true,
    },
  });

  tl.from(input, {
    borderBottomColor: "transparent",
    borderBottomWidth: 2,
    duration: 0.1,
    ease: "power2.out",
  });

  tl.from(
    input,
    {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.4"
  );
});

// ================================
// ✅ DISTRIBUTOR MODAL FUNCTIONALITY
// ================================
document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("openDistributorModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const distributorModal = document.getElementById("distributorModal");
  const distributorForm = document.getElementById("distributorForm");

  // Open modal
  if (openModalBtn) {
    openModalBtn.addEventListener("click", function () {
      distributorModal.style.display = "flex";
      // Force reflow to ensure display change is applied
      distributorModal.offsetHeight;
      distributorModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close modal functions
  function closeModal() {
    distributorModal.classList.add("closing");
    distributorModal.classList.remove("active");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      distributorModal.classList.remove("closing");
      distributorModal.style.display = "none";
      document.body.style.overflow = ""; // Restore scrolling
    }, 300); // Match the animation duration
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (distributorModal && distributorModal.classList.contains("active")) {
        closeModal();
      } else if (contactModal && contactModal.classList.contains("active")) {
        closeContactModal();
      }
    }
  });

  // Form submission
  if (distributorForm) {
    distributorForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(distributorForm);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Basic validation - email and gst_number are optional, business_name removed (merged with full_name)
      const requiredFields = [
        "full_name",
        "phone",
        "address",
        "monthly_sales_volume",
        "interested_in",
        "preferred_category",
      ];
      let isValid = true;
      let firstInvalidField = null;

      requiredFields.forEach((field) => {
        const input = distributorForm.querySelector(`[name="${field}"]`);
        if (!data[field] || data[field].trim() === "") {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = input;
          input.style.borderColor = "#ff4444";
        } else {
          input.style.borderColor = "#e0e0e0";
        }
      });

      // Email validation - only validate if email is provided (optional field)
      const emailInput = distributorForm.querySelector('[name="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        data.email &&
        data.email.trim() !== "" &&
        !emailRegex.test(data.email)
      ) {
        isValid = false;
        emailInput.style.borderColor = "#ff4444";
        if (!firstInvalidField) firstInvalidField = emailInput;
      } else if (emailInput) {
        // Reset border color if email is valid or empty (since it's optional)
        emailInput.style.borderColor = "#e0e0e0";
      }

      // Phone validation
      const phoneInput = distributorForm.querySelector('[name="phone"]');
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (data.phone && !phoneRegex.test(data.phone.replace(/\s/g, ""))) {
        isValid = false;
        phoneInput.style.borderColor = "#ff4444";
        if (!firstInvalidField) firstInvalidField = phoneInput;
      }

      // GST Number validation - only validate if GST is provided (optional field)
      const gstInput = distributorForm.querySelector('[name="gst_number"]');
      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (
        data.gst_number &&
        data.gst_number.trim() !== "" &&
        !gstRegex.test(data.gst_number)
      ) {
        isValid = false;
        gstInput.style.borderColor = "#ff4444";
        if (!firstInvalidField) firstInvalidField = gstInput;
      } else if (gstInput) {
        // Reset border color if GST is valid or empty (since it's optional)
        gstInput.style.borderColor = "#e0e0e0";
      }

      // Monthly Sales validation
      const salesInput = distributorForm.querySelector(
        '[name="monthly_sales_volume"]'
      );
      if (
        data.monthly_sales_volume &&
        (isNaN(data.monthly_sales_volume) ||
          parseFloat(data.monthly_sales_volume) < 0)
      ) {
        isValid = false;
        salesInput.style.borderColor = "#ff4444";
        if (!firstInvalidField) firstInvalidField = salesInput;
      }

      if (!isValid) {
        // Focus on first invalid field
        if (firstInvalidField) {
          firstInvalidField.focus();
          firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        showBurrahToast(
          "Please fill in all required fields correctly",
          "error"
        );
        return;
      }

      // Show loading state
      const submitBtn = distributorForm.querySelector(".submit_btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;

      // Send data to distributor API as form-data
      const apiFormData = new FormData();

      // Add all form fields to FormData with correct field names
      Object.keys(data).forEach((key) => {
        // Map interested_in to the correct field name for backend
        const fieldName = key === "interested_in" ? "interested_in" : key;
        apiFormData.append(fieldName, data[key]);
        console.log(`Sending ${fieldName}:`, data[key]);
      });

      console.log("Complete form data being sent:", data);

      fetch("https://sipburrah.com/admin/distributor_api.php", {
        method: "POST",
        body: apiFormData, // Send as FormData instead of JSON
        mode: "cors", // Add CORS mode
        credentials: "omit", // Add credentials handling
      })
        .then(async (response) => {
          console.log("Response status:", response.status);
          console.log("Response headers:", response.headers);

          // Get response text first
          const responseText = await response.text();
          console.log("Raw response length:", responseText.length);
          console.log("Raw response content:", responseText);

          if (!response.ok) {
            // Show user-friendly error messages based on status code
            let errorMessage = "Something went wrong. Please try again.";

            if (response.status === 400) {
              errorMessage = "Please check your information and try again.";
            } else if (response.status === 401) {
              errorMessage = "Please refresh the page and try again.";
            } else if (response.status === 403) {
              errorMessage = "Access denied. Please contact support.";
            } else if (response.status === 404) {
              errorMessage =
                "Service temporarily unavailable. Please try again later.";
            } else if (response.status === 422) {
              errorMessage = "Please fill in all required fields correctly.";
            } else if (response.status === 429) {
              errorMessage =
                "Too many requests. Please wait a moment and try again.";
            } else if (response.status >= 500) {
              errorMessage =
                "Our servers are busy. Please try again in a few minutes.";
            }

            throw new Error(errorMessage);
          }

          // If we get here, response is successful (200)
          console.log(
            "✅ Success! API returned 200 status - data processed successfully"
          );

          // Always show user-friendly success message regardless of API response
          let successMessage =
            "Your distributor application has been submitted successfully! We will contact you soon.";

          return {
            success: true,
            message: successMessage,
            status: response.status,
            hasResponseContent: responseText.length > 0,
          };
        })
        .then((result) => {
          console.log("Success:", result);

          // Reset form
          distributorForm.reset();

          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;

          // Close modal
          closeModal();

          // Show success message (200 status means success)
          showBurrahToast(result.message, "success");
        })
        .catch((error) => {
          console.error("Detailed error:", error);
          console.error("Error name:", error.name);
          console.error("Error message:", error.message);

          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;

          // Show user-friendly error messages
          let errorMessage = "Something went wrong. Please try again.";

          if (
            error.name === "TypeError" &&
            error.message.includes("Failed to fetch")
          ) {
            errorMessage =
              "Please check your internet connection and try again.";
          } else if (error.message.includes("Please check your information")) {
            errorMessage = error.message;
          } else if (error.message.includes("Please refresh the page")) {
            errorMessage = error.message;
          } else if (error.message.includes("Access denied")) {
            errorMessage = error.message;
          } else if (
            error.message.includes("Service temporarily unavailable")
          ) {
            errorMessage = error.message;
          } else if (
            error.message.includes("Please fill in all required fields")
          ) {
            errorMessage = error.message;
          } else if (error.message.includes("Too many requests")) {
            errorMessage = error.message;
          } else if (error.message.includes("Our servers are busy")) {
            errorMessage = error.message;
          } else if (error.message && error.message.trim()) {
            // Use the actual error message if it's user-friendly
            errorMessage = error.message;
          }

          showBurrahToast(errorMessage, "error");
        });
    });
  }

  // ================= CONTACT US MODAL =================
  const contactUsBtn = document.querySelector(".contact_us_btn");
  const closeContactModalBtn = document.getElementById("closeContactModal");
  const contactModalOverlay = document.getElementById("contactModalOverlay");
  const contactModal = document.getElementById("contactModal");
  const contactForm = document.getElementById("contactForm");

  // Open contact modal
  if (contactUsBtn) {
    contactUsBtn.addEventListener("click", function () {
      contactModal.style.display = "flex";
      // Force reflow to ensure display change is applied
      contactModal.offsetHeight;
      contactModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close contact modal functions
  function closeContactModal() {
    contactModal.classList.add("closing");
    contactModal.classList.remove("active");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      contactModal.classList.remove("closing");
      contactModal.style.display = "none";
      document.body.style.overflow = ""; // Restore scrolling
    }, 300); // Match the animation duration
  }

  if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener("click", closeContactModal);
  }

  if (contactModalOverlay) {
    contactModalOverlay.addEventListener("click", closeContactModal);
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Basic validation - email is optional
      const requiredFields = ["name", "phone", "message"];
      let isValid = true;
      let firstInvalidField = null;

      requiredFields.forEach((field) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!data[field] || data[field].trim() === "") {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = input;
          input.style.borderColor = "#ff4444";
        } else {
          input.style.borderColor = "";
        }
      });

      // Email validation - only validate if email is provided (optional field)
      const emailInput = contactForm.querySelector('[name="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        data.email &&
        data.email.trim() !== "" &&
        !emailRegex.test(data.email)
      ) {
        isValid = false;
        emailInput.style.borderColor = "#ff4444";
        if (!firstInvalidField) firstInvalidField = emailInput;
      } else if (emailInput) {
        // Reset border color if email is valid or empty (since it's optional)
        emailInput.style.borderColor = "";
      }

      // Phone validation
      const phoneInput = contactForm.querySelector('[name="phone"]');
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (data.phone && !phoneRegex.test(data.phone.replace(/\s/g, ""))) {
        isValid = false;
        phoneInput.style.borderColor = "#ff4444";
        if (!firstInvalidField) firstInvalidField = phoneInput;
      }

      if (!isValid) {
        // Focus on first invalid field
        if (firstInvalidField) {
          firstInvalidField.focus();
          firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        showBurrahToast(
          "Please fill in all required fields correctly",
          "error"
        );
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector(".submit_btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // For now, just show success message (you can add API endpoint later)
      setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Close modal
        closeContactModal();

        // Show success message
        showBurrahToast(
          "Your message has been sent successfully! We will get back to you soon.",
          "success"
        );
      }, 1000);
    });
  }
});
