const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const codeOutput = document.querySelector("[data-code-output]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const codeTokens = [
  { text: "public class ", className: "code-keyword" },
  { text: "Jejo", className: "code-type" },
  { text: " {\n  " },
  { text: "void ", className: "code-keyword" },
  { text: "launch", className: "code-method" },
  { text: "() {\n    " },
  { text: "build", className: "code-method" },
  { text: "(" },
  { text: "\"smart web\"", className: "code-string" },
  { text: ");\n  }\n}" },
];

const closeMenu = () => {
  nav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const typeCode = () => {
  if (!codeOutput) return;

  codeOutput.textContent = "";

  if (prefersReducedMotion) {
    codeTokens.forEach((token) => {
      const span = document.createElement("span");
      if (token.className) span.className = token.className;
      span.textContent = token.text;
      codeOutput.append(span);
    });
    return;
  }

  let tokenIndex = 0;
  let charIndex = 0;
  let currentSpan = null;

  const writeNext = () => {
    const token = codeTokens[tokenIndex];

    if (!token) {
      window.setTimeout(typeCode, 2400);
      return;
    }

    if (charIndex === 0) {
      currentSpan = document.createElement("span");
      if (token.className) currentSpan.className = token.className;
      codeOutput.append(currentSpan);
    }

    const character = token.text[charIndex];
    currentSpan.textContent += character;
    charIndex += 1;

    if (charIndex >= token.text.length) {
      tokenIndex += 1;
      charIndex = 0;
    }

    window.setTimeout(writeNext, character === "\n" ? 180 : 34);
  };

  writeNext();
};

typeCode();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Tack! Vi har tagit emot din idé och återkommer så snart vi kan.";
  form.reset();
});
