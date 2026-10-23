"use strict";

// Replace with the business WhatsApp number in international format, without "+" or spaces.
const WHATSAPP_NUMBER = "5493435329149";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
const contactForm = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  }
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.hidden = filter !== "todos" && item.dataset.category !== filter;
    });
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (!WHATSAPP_NUMBER) {
    feedback.textContent = "El WhatsApp del estudio todavía no está configurado. Podés editarlo en script.js.";
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const service = formData.get("service").toString();
  const message = formData.get("message").toString().trim();
  const text = [
    `¡Hola! Soy ${name}.`,
    `Quería consultar por: ${service}.`,
    message ? `Mi consulta: ${message}` : ""
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
