const hero = document.querySelector(".hero");
const sharedBackdrop = document.querySelector(".shared-backdrop");

if (hero && sharedBackdrop) {
  const heroImages = ["image1.png.png", "image2.png.png"];
  const primaryLayer = sharedBackdrop.querySelector(".shared-backdrop-primary");
  const secondaryLayer = sharedBackdrop.querySelector(".shared-backdrop-secondary");
  let currentIndex = 0;

  const setLayerBackground = (layer, imagePath) => {
    layer.style.backgroundImage = `url("${imagePath}")`;
  };

  if (primaryLayer && secondaryLayer) {
    setLayerBackground(primaryLayer, heroImages[currentIndex]);
  }

  if (heroImages.length > 1 && primaryLayer && secondaryLayer) {
    setInterval(() => {
      const nextIndex = (currentIndex + 1) % heroImages.length;
      setLayerBackground(secondaryLayer, heroImages[nextIndex]);
      sharedBackdrop.classList.add("is-transitioning");

      window.setTimeout(() => {
        setLayerBackground(primaryLayer, heroImages[nextIndex]);
        sharedBackdrop.classList.remove("is-transitioning");
        secondaryLayer.style.backgroundImage = "";
      }, 1400);

      currentIndex = nextIndex;
    }, 5000);
  }
}

window.addEventListener("scroll", () => {
  if (hero) {
    const scrollAmount = Math.min(window.scrollY, window.innerHeight);
    hero.style.setProperty("--hero-text-shift", `${scrollAmount * -0.35}px`);
    hero.style.setProperty("--hero-text-opacity", `${Math.max(0, 1 - scrollAmount / 420)}`);
  }

  document.querySelectorAll(".box").forEach((box) => {
    box.style.transform = "scale(1.02)";
  });
});

window.addEventListener("load", () => {
  window.dispatchEvent(new Event("scroll"));
});

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  const defaultTiltY = card.classList.contains("right") ? 3 : -3;

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    const rotateY = (offsetX - 0.5) * 12 + defaultTiltY;
    const rotateX = (0.5 - offsetY) * 10 + 3;

    card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--glow-x", `${(offsetX * 100).toFixed(1)}%`);
    card.style.setProperty("--glow-y", `${(offsetY * 100).toFixed(1)}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--tilt-x", "3deg");
    card.style.setProperty("--tilt-y", `${defaultTiltY}deg`);
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  });
});

const eventPicker = document.querySelector(".event-picker");

if (eventPicker) {
  const eventValue = eventPicker.querySelector(".event-picker-value");
  const eventButtons = eventPicker.querySelectorAll(".event-option");
  const customEventInput = eventPicker.querySelector(".custom-event-input");
  let selectedEvent = "";

  const updateEventLabel = () => {
    if (selectedEvent === "Etc." && customEventInput.value.trim()) {
      eventValue.textContent = customEventInput.value.trim();
      return;
    }

    eventValue.textContent = selectedEvent || "Click to choose";
  };

  eventButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedEvent = button.dataset.value || "";

      eventButtons.forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");

      const showCustomEvent = selectedEvent === "Etc.";
      customEventInput.hidden = !showCustomEvent;

      if (showCustomEvent) {
        customEventInput.focus();
      } else {
        customEventInput.value = "";
        eventPicker.removeAttribute("open");
      }

      updateEventLabel();
    });
  });

  if (customEventInput) {
    customEventInput.addEventListener("input", updateEventLabel);
  }

  updateEventLabel();
}

const budgetDetails = document.querySelector(".budget-details");
const customBudgetInput = document.querySelector(".custom-budget-input");

if (budgetDetails && customBudgetInput) {
  const budgetValue = budgetDetails.querySelector(".budget-value");
  const budgetButtons = budgetDetails.querySelectorAll(".budget-option");
  let selectedBudget = "";

  const updateBudgetLabel = () => {
    if (selectedBudget === "Etc." && customBudgetInput.value.trim()) {
      budgetValue.textContent = customBudgetInput.value.trim();
      return;
    }

    budgetValue.textContent = selectedBudget || "Choose budget";
  };

  budgetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedBudget = button.dataset.value || "";

      budgetButtons.forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");

      const showCustomBudget = selectedBudget === "Etc.";
      customBudgetInput.hidden = !showCustomBudget;

      if (showCustomBudget) {
        customBudgetInput.focus();
      } else {
        customBudgetInput.value = "";
        budgetDetails.removeAttribute("open");
      }

      updateBudgetLabel();
    });
  });

  customBudgetInput.addEventListener("input", updateBudgetLabel);
  updateBudgetLabel();
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const eventSummary =
      document.querySelector(".event-picker-value")?.textContent?.trim() || "";
    const budgetSummary =
      document.querySelector(".budget-value")?.textContent?.trim() || "";
    const weddingDate =
      document.querySelector("#wedding-date-display")?.value?.trim() || "";

    const messageLines = [
      "New Wedding Inquiry",
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Wedding Date: ${weddingDate}`,
      `Event Type: ${eventSummary}`,
      `Budget: ${budgetSummary}`,
    ];

    const message = encodeURIComponent(messageLines.join("\n"));
    window.open(`https://wa.me/919315971839?text=${message}`, "_blank");
  });
}

const datePicker = document.querySelector(".date-picker");

if (datePicker) {
  const dateDisplay = datePicker.querySelector("#wedding-date-display");
  const dateValue = datePicker.querySelector("#wedding-date-value");
  const popup = datePicker.querySelector(".date-picker-popup");
  const title = datePicker.querySelector(".date-picker-title");
  const grid = datePicker.querySelector(".date-grid");
  const prevBtn = datePicker.querySelector('[data-direction="prev"]');
  const nextBtn = datePicker.querySelector('[data-direction="next"]');
  const clearBtn = datePicker.querySelector('[data-action="clear"]');
  const todayBtn = datePicker.querySelector('[data-action="today"]');

  const today = new Date();
  const minMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedDate = null;
  let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);

  const formatDisplayDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatValueDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isSameDate = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const renderCalendar = () => {
    prevBtn.disabled = viewDate <= minMonthDate;

    title.textContent = viewDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (let i = 0; i < 42; i += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "date-day";

      let isOutsideMonth = false;
      let cellDate;
      if (i < startDay) {
        cellDate = new Date(year, month - 1, daysInPrevMonth - startDay + i + 1);
        isOutsideMonth = true;
      } else if (i >= startDay + daysInMonth) {
        cellDate = new Date(year, month + 1, i - startDay - daysInMonth + 1);
        isOutsideMonth = true;
      } else {
        cellDate = new Date(year, month, i - startDay + 1);
      }

      if (isOutsideMonth) {
        button.classList.add("is-hidden");
        button.disabled = true;
        grid.appendChild(button);
        continue;
      }

      button.textContent = cellDate.getDate();

      if (isSameDate(cellDate, today)) {
        button.classList.add("is-today");
      }

      if (isSameDate(cellDate, selectedDate)) {
        button.classList.add("is-selected");
      }

      button.addEventListener("click", () => {
        selectedDate = cellDate;
        viewDate = new Date(cellDate.getFullYear(), cellDate.getMonth(), 1);
        dateDisplay.value = formatDisplayDate(cellDate);
        dateValue.value = formatValueDate(cellDate);
        popup.hidden = true;
        renderCalendar();
      });

      grid.appendChild(button);
    }
  };

  dateDisplay.addEventListener("click", () => {
    popup.hidden = !popup.hidden;
    if (!popup.hidden) {
      renderCalendar();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (viewDate <= minMonthDate) {
      return;
    }

    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar();
  });

  clearBtn.addEventListener("click", () => {
    selectedDate = null;
    dateDisplay.value = "";
    dateValue.value = "";
    renderCalendar();
  });

  todayBtn.addEventListener("click", () => {
    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    dateDisplay.value = formatDisplayDate(selectedDate);
    dateValue.value = formatValueDate(selectedDate);
    renderCalendar();
  });

  document.addEventListener("click", (event) => {
    if (!datePicker.contains(event.target)) {
      popup.hidden = true;
    }
  });

  renderCalendar();
}

const hangingColumns = Array.from(document.querySelectorAll(".hanging-column"));
const columnPhotos = Array.from(document.querySelectorAll(".column-photo"));
const featuredPhoto = document.querySelector(".featured-photo");

if (hangingColumns.length || featuredPhoto) {
  const galleryScene = document.querySelector(".gallery-scene");
  const SHARED_IDLE_AMPLITUDE = 0.48;
  const SHARED_IDLE_SPEED = 0.48;
  const SHARED_MAX_SWING = 2.8;
  const SHARED_TENSION = 0.048;
  const SHARED_DAMPING = 0.944;
  const HOVER_BOOST = 1.5;
  const PROXIMITY_RADIUS = 170;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let scenePointerX = pointerX;
  let scenePointerY = pointerY;
  const photoUnits = [];
  const charmUnits = [];
  let animationFrame = null;
  let startTime = performance.now();

  const seedPhotoImages = (root) => {
    root.querySelectorAll("[data-image]").forEach((item) => {
      const image = item.querySelector(".photo-image");
      const imagePath = item.dataset.image;
      if (image && imagePath) {
        image.style.backgroundImage = `url("${imagePath}")`;
      }
    });
  };

  hangingColumns.forEach((column) => {
    seedPhotoImages(column);

    charmUnits.push({
      charm: column.querySelector(".chain-charm"),
      pupils: Array.from(column.querySelectorAll(".pupil")),
      pupilX: 0,
      pupilY: 0,
    });
  });

  columnPhotos.forEach((photo, index) => {
    photoUnits.push({
      element: photo,
      animatedElement: photo.querySelector(".column-photo-wrap"),
      angle: 0,
      velocity: 0,
      target: 0,
      shiftY: 0,
      shiftX: 0,
      scale: 1,
      hoverBoost: 0,
      pointerActive: false,
      depth: Number(photo.dataset.depth || 0.8),
      idlePhase: index * 0.45,
    });
  });

  if (featuredPhoto) {
    seedPhotoImages(featuredPhoto);

    photoUnits.push({
      element: featuredPhoto,
      animatedElement: featuredPhoto.querySelector(".featured-photo-wrap"),
      rope: featuredPhoto.querySelector(".featured-rope"),
      ropePath: featuredPhoto.querySelector(".featured-rope-path"),
      angle: 0,
      velocity: 0,
      target: 0,
      shiftY: 0,
      shiftX: 0,
      scale: 1,
      curve: 0,
      hoverBoost: 0,
      pointerActive: false,
      depth: 1,
      idlePhase: 2.2,
    });

    charmUnits.push({
      charm: featuredPhoto.querySelector(".chain-charm"),
      pupils: Array.from(featuredPhoto.querySelectorAll(".pupil")),
      pupilX: 0,
      pupilY: 0,
    });
  }

  const animateUnits = (timestamp) => {
    const elapsed = (timestamp - startTime) / 1000;
    scenePointerX += (pointerX - scenePointerX) * 0.035;
    scenePointerY += (pointerY - scenePointerY) * 0.035;

    const viewportWidth = window.innerWidth || 1;
    const viewportHeight = window.innerHeight || 1;
    const normalizedX = (scenePointerX / viewportWidth - 0.5) * 2;
    const normalizedY = (scenePointerY / viewportHeight - 0.5) * 2;

    photoUnits.forEach((item) => {
      const { element, animatedElement, depth } = item;
      const isHovered = element.matches(":hover");
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = pointerX - centerX;
      const dy = pointerY - centerY;
      const distance = Math.hypot(dx, dy);
      const proximity = Math.max(0, 1 - distance / PROXIMITY_RADIUS);
      const directionX = rect.width ? dx / rect.width : 0;
      const idleAngle =
        Math.sin(elapsed * SHARED_IDLE_SPEED + item.idlePhase) * SHARED_IDLE_AMPLITUDE;
      const parallaxX = normalizedX * 1.6 * depth;
      const sceneLiftY = normalizedY * 1.2 * depth;
      const proximitySwing = directionX * proximity * 0.18;
      const hoverTarget = item.hoverBoost * HOVER_BOOST;
      const targetAngle = Math.max(
        -SHARED_MAX_SWING,
        Math.min(
          SHARED_MAX_SWING,
          idleAngle + proximitySwing + hoverTarget
        )
      );

      item.target += (targetAngle - item.target) * 0.065;
      item.hoverBoost += ((item.pointerActive ? 1 : 0) - item.hoverBoost) * 0.08;
      item.shiftY += ((isHovered ? -1.4 : 0) - item.shiftY) * 0.07;
      item.shiftX += ((isHovered ? directionX * 1.4 : parallaxX) - item.shiftX) * 0.05;

      const acceleration = (item.target - item.angle) * SHARED_TENSION;
      item.velocity = (item.velocity + acceleration) * SHARED_DAMPING;
      item.angle += item.velocity;
      item.angle = Math.max(-SHARED_MAX_SWING, Math.min(SHARED_MAX_SWING, item.angle));
      item.scale += ((isHovered ? 1.018 : 1) - item.scale) * 0.06;

      if (animatedElement) {
        animatedElement.style.setProperty("--photo-shift-x", `${item.shiftX.toFixed(2)}px`);
        animatedElement.style.setProperty("--photo-shift-y", `${(sceneLiftY + item.shiftY).toFixed(2)}px`);
        animatedElement.style.setProperty("--photo-rotate", `${item.angle.toFixed(2)}deg`);
        animatedElement.style.setProperty("--photo-scale", item.scale.toFixed(3));
      }
    });

    charmUnits.forEach((item) => {
      if (item.charm && item.pupils.length) {
        const charmRect = item.charm.getBoundingClientRect();
        const charmCenterX = charmRect.left + charmRect.width / 2;
        const charmCenterY = charmRect.top + charmRect.height / 2;
        const lookX = pointerX - charmCenterX;
        const lookY = pointerY - charmCenterY;
        const lookLength = Math.max(1, Math.hypot(lookX, lookY));
        const normalizedX = lookX / lookLength;
        const normalizedY = lookY / lookLength;
        const maxOffsetX = 3.8;
        const maxOffsetY = 4.4;
        const targetPupilX = normalizedX * maxOffsetX;
        const targetPupilY = normalizedY * maxOffsetY;

        item.pupilX += (targetPupilX - item.pupilX) * 0.24;
        item.pupilY += (targetPupilY - item.pupilY) * 0.24;

        item.pupils.forEach((pupil) => {
          pupil.style.transform = `translate(-50%, -50%) translate(${item.pupilX.toFixed(2)}px, ${item.pupilY.toFixed(2)}px)`;
        });
      }
    });

    animationFrame = window.requestAnimationFrame(animateUnits);
  };

  const updateScenePointer = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  };

  if (galleryScene) {
    galleryScene.addEventListener("pointermove", updateScenePointer, { passive: true });
  }

  photoUnits.forEach((item) => {
    const { element } = item;

    element.addEventListener("mouseenter", () => {
      element.classList.add("is-hovered");
      item.pointerActive = true;
    });

    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      item.target += offsetX * 0.16;
      pointerX = event.clientX;
      pointerY = event.clientY;
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove("is-hovered");
      item.pointerActive = false;
    });
  });

  animationFrame = window.requestAnimationFrame(animateUnits);

  window.addEventListener("beforeunload", () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
  });
}

const revealCards = Array.from(document.querySelectorAll(".reveal-card"));
const INITIAL_VISIBLE_GALLERY_COUNT = 12;
const LOAD_MORE_BATCH_SIZE = 6;

if (revealCards.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  const observeVisibleCards = () => {
    revealCards
      .filter((card) => !card.classList.contains("is-hidden-card"))
      .forEach((card, index) => {
        card.style.setProperty("--stagger", `${index * 70}ms`);
        revealObserver.observe(card);
      });
  };

  revealCards.forEach((card, index) => {
    if (index >= INITIAL_VISIBLE_GALLERY_COUNT) {
      card.classList.add("is-hidden-card");
    }
  });

  observeVisibleCards();

  const loadMoreButton = document.querySelector(".load-more-btn");

  if (loadMoreButton) {
    const updateLoadMoreState = () => {
      const remainingCards = revealCards.filter((card) => card.classList.contains("is-hidden-card"));

      if (!remainingCards.length) {
        loadMoreButton.textContent = "No More Images";
        loadMoreButton.classList.add("is-finished");
        loadMoreButton.hidden = true;
        return;
      }

      loadMoreButton.textContent = "Load More Stories";
      loadMoreButton.classList.remove("is-finished");
    };

    updateLoadMoreState();

    loadMoreButton.addEventListener("click", () => {
      const nextBatch = revealCards
        .filter((card) => card.classList.contains("is-hidden-card"))
        .slice(0, LOAD_MORE_BATCH_SIZE);

      if (!nextBatch.length) {
        updateLoadMoreState();
        return;
      }

      nextBatch.forEach((card) => {
        card.classList.remove("is-hidden-card");
        card.classList.remove("is-visible");
      });

      observeVisibleCards();
      updateLoadMoreState();
    });
  }
}

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const backdrop = lightbox.querySelector(".lightbox-backdrop");
  const prevButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");
  const storyCards = Array.from(document.querySelectorAll(".story-card"));
  let activeStoryIndex = -1;

  const updateLightboxImage = (index) => {
    const storyCard = storyCards[index];

    if (!storyCard || !lightboxImage) {
      return;
    }

    const imagePath = storyCard.dataset.lightboxImage;
    const imageElement = storyCard.querySelector("img");
    lightboxImage.src = imagePath || "";
    lightboxImage.alt = imageElement?.alt || "Expanded wedding gallery image";
    activeStoryIndex = index;
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    activeStoryIndex = -1;
    if (lightboxImage) {
      lightboxImage.src = "";
    }
  };

  const navigateLightbox = (direction) => {
    if (!storyCards.length) {
      return;
    }

    const nextIndex =
      activeStoryIndex < 0
        ? 0
        : (activeStoryIndex + direction + storyCards.length) % storyCards.length;

    updateLightboxImage(nextIndex);
  };

  storyCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (!lightboxImage) {
        return;
      }

      updateLightboxImage(index);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  backdrop?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", () => navigateLightbox(-1));
  nextButton?.addEventListener("click", () => navigateLightbox(1));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }

    if (event.key === "ArrowLeft" && !lightbox.hidden) {
      navigateLightbox(-1);
    }

    if (event.key === "ArrowRight" && !lightbox.hidden) {
      navigateLightbox(1);
    }
  });
}
