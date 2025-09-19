gsap.registerPlugin(ScrollTrigger);

// ===================== NAVBAR & PROGRESS BAR =====================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");

// Mobile Navbar Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Progress Bar Scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});

// About Section Cards
gsap.fromTo(
  ".left-card",
  { x: -200, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-container",
      start: "top 80%",
      once: true,
    },
  }
);

gsap.fromTo(
  ".right-card",
  { x: 200, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
    scrollTrigger: {
      trigger: ".about-container",
      start: "top 80%",
      once: true,
    },
  }
);

// Skill Cards
gsap.fromTo(
  ".skill-card",
  { y: 40, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: { trigger: ".skills-grid", start: "top 80%", once: true },
  }
);

// Project Cards (Left & Right)
document.querySelectorAll(".project").forEach((project) => {
  const left = project.querySelector(".left-card");
  const right = project.querySelector(".right-card");

  gsap.fromTo(
    left,
    { x: -200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: project, start: "top 85%" },
    }
  );

  gsap.fromTo(
    right,
    { x: 200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: project, start: "top 85%", once: true },
    }
  );
});

// Certifications Cards
gsap.to(".cert-card", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: { trigger: ".cert-grid", start: "top 85%", once: true },
});

// Coursework Cards
gsap.to(".coursework-card", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".coursework-grid", start: "top 85%", once: true },
});

// Contact Section
gsap.from("#contact .section-title", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: { trigger: "#contact", start: "top 90%", once: true },
});

gsap.from("#contactForm", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.2,
  scrollTrigger: { trigger: "#contact", start: "top 85%", once: true },
});

gsap.from(".contact-footer a", {
  y: 30,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: { trigger: "#contact", start: "top 80%", once: true },
});

// ===================== MODAL & PROJECT MEDIA =====================
let currentIndex = 0;
let currentProject = "";

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");
const body = document.body;

// Media Assets
const projectMedia = {
  quiz: [
    { type: "img", src: "assets/quiz1.png" },
    { type: "img", src: "assets/quiz2.png" },
    { type: "img", src: "assets/quiz3.png" },
    { type: "img", src: "assets/quiz4.png" },
    { type: "img", src: "assets/quiz5.png" },
    { type: "img", src: "assets/quiz6.png" },
  ],
  blog: [
    { type: "img", src: "assets/blogs1.png" },
    { type: "img", src: "assets/blogs2.png" },
    { type: "img", src: "assets/blogs3.png" },
    { type: "img", src: "assets/blogs4.png" },
    { type: "img", src: "assets/blogs5.png" },
    { type: "img", src: "assets/blogs6.png" },
  ],
  freelancing: [{ type: "video", src: "assets/freelance_app.mp4" }],
  solar: [
    { type: "img", src: "assets/solar1.png" },
    { type: "img", src: "assets/solar2.png" },
    { type: "img", src: "assets/solar3.png" },
    { type: "img", src: "assets/solar4.png" },
    { type: "img", src: "assets/solar5.png" },
    { type: "img", src: "assets/solar6.png" },
    { type: "img", src: "assets/solar7.png" },
  ],
};

function openModal(index, project) {
  currentIndex = index;
  currentProject = project;
  showMedia();

  // Lock scroll
  const scrollY = window.scrollY;
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";

  modal.style.display = "flex";
  modal.setAttribute("tabindex", "-1");
  modal.focus({ preventScroll: true });
}

function closeModal() {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.currentTime = 0;

  // Restore scroll
  const scrollY = Math.abs(parseInt(body.style.top || "0"));
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  window.scrollTo(0, scrollY);
}

// Show Media
function showMedia() {
  const media = projectMedia[currentProject][currentIndex];

  if (media.type === "img") {
    modalImage.style.display = "block";
    modalVideo.style.display = "none";
    modalImage.src = media.src;
  } else if (media.type === "video") {
    modalImage.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = media.src;
    modalVideo.autoplay = true;
    modalVideo.controls = true;
    modalVideo.currentTime = 0;
    modalVideo.play().catch((err) => console.log("Video play error:", err));
  }
}

// Navigate Media (Prev/Next)
function changeImage(step) {
  const total = projectMedia[currentProject].length;
  currentIndex = (currentIndex + step + total) % total;
  showMedia();
}

// Show All from Start
function showAllImages(project) {
  openModal(0, project);
}

// Autoplay muted previews
document.querySelectorAll(".preview-video").forEach((video) => {
  video.muted = true;
  video.loop = true;
  video.play().catch((err) => console.log("Preview video error:", err));
});

// Optional: close modal if clicked outside media
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const closeBtn = document.querySelector(".close-btn");

if (prevBtn) prevBtn.addEventListener("click", () => changeImage(-1));
if (nextBtn) nextBtn.addEventListener("click", () => changeImage(1));
if (closeBtn) closeBtn.addEventListener("click", closeModal);

// ===================== CONTACT FORM (EmailJS) =====================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: `Occupation: ${document.getElementById("occupation").value}\n\n${
      document.getElementById("message").value
    }`,
  };

  emailjs
    .send("service_q2b0v0a", "template_ag3y1lu", formData, "w-eVWSKn_DvRN-tYj")
    .then(() => {
      alert("Message sent successfully!");
      contactForm.reset();
    })
    .catch((error) => {
      alert("Failed to send message. Try again later.");
      console.error("EmailJS Error:", error);
    });
});
