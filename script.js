// ==================================================
// ✅ FORM SUBMISSION (Burrah Integration)
// ==================================================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");

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
        showBurrahToast("🎉 Your form has been submitted!");
        form.reset();
      }
    } catch (err) {
      console.error("Burrah Form Error:", err);
    }
  });
});

// ===== Toast Function =====
function showBurrahToast(msg) {
  const toast = document.getElementById("burrahToast");
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ==================================================
// ✅ SOCIAL MEDIA LINKS
// ==================================================
document.getElementById("instagram").addEventListener("click", function () {
  window.open("https://www.instagram.com/sipburrah?igsh=cnEzbTd0dzBweHVw", "_blank");
});

document.getElementById("facebook").addEventListener("click", function () {
  window.open("https://www.facebook.com/share/19GYamXkgC/", "_blank");
});




// ==================================================
// ✅ LOCOMOTIVE + SCROLLTRIGGER SETUP
// ==================================================

// Scroll to top on reload (optional)
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
// ===== Init Locomotive Function =====
function initLoco() {
  const scrollEl = document.querySelector(".main");

  const locoScroll = new LocomotiveScroll({
    el: scrollEl,
    smooth: true,
    smoothMobile: true,
    inertia: 0.8,
    getDirection: true,
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
    locoScroll.update();
    ScrollTrigger.refresh();
  }, 500);
}
window.addEventListener("load", locoUpdateFix);
window.addEventListener("pageshow", (event) => {
  if (event.persisted) locoUpdateFix();
});
window.addEventListener("orientationchange", locoUpdateFix);

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

// ===== GSAP animations for h1, h3, p =====
ScrollTrigger.matchMedia({
  // ----- Desktop -----
  "(min-width: 601px)": function () {
    // h1 letters
    gsap.from(".content h1 span", {
      opacity: 0,
      y: 100,
      duration: 3,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".content h1",
        start: "top 80%",
        scroller: ".main",
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
      });
      gsap.to(fruits, {
        x: -x * 0.05,
        y: -y * 0.05,
        duration: 0.3,
        ease: "power2.out",
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

gsap.registerPlugin(ScrollTrigger);

// ================================
// ✅ Form Section Animations
// ================================
gsap.utils.toArray("#formSection .inputbox").forEach((input, i) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: input,
      start: "top 90%",
      end:"top 75%", 
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
