/* =========================================================
   BLOOM METHOD — QUIZ + SALES FUNNEL LOGIC
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. QUESTION DATA
     Each question: { id, type: 'single'|'text', title, eyebrow, options?, placeholder?, required? }
  --------------------------------------------------------- */
  const questions = [
    {
      id: "goal",
      eyebrow: "Question 1 of 14",
      title: "What is your primary goal right now?",
      type: "single",
      options: [
        { icon: "⚖️", label: "Lose weight" },
        { icon: "💪", label: "Tone my body" },
        { icon: "🎯", label: "Lose belly fat" },
        { icon: "✨", label: "Feel more confident" },
      ],
    },
    {
      id: "age",
      eyebrow: "Question 2 of 14",
      title: "How old are you?",
      type: "single",
      options: [
        { icon: "🌱", label: "18–29" },
        { icon: "🌸", label: "30–39" },
        { icon: "🌷", label: "40–49" },
        { icon: "🌺", label: "50+" },
      ],
    },
    {
      id: "height",
      eyebrow: "Question 3 of 14",
      title: "What is your height?",
      type: "single",
      options: [
        { icon: "📏", label: "Under 5'2\"" },
        { icon: "📏", label: "5'3\" – 5'6\"" },
        { icon: "📏", label: "5'7\" – 5'10\"" },
        { icon: "📏", label: "Over 5'10\"" },
      ],
    },
    {
      id: "weight",
      eyebrow: "Question 4 of 14",
      title: "What is your current weight range?",
      type: "single",
      options: [
        { icon: "🌸", label: "Under 140 lbs" },
        { icon: "🌸", label: "140 – 170 lbs" },
        { icon: "🌸", label: "170 – 200 lbs" },
        { icon: "🌸", label: "Over 200 lbs" },
      ],
    },
    {
      id: "poundsToLose",
      eyebrow: "Question 5 of 14",
      title: "How many pounds would you like to lose?",
      type: "single",
      options: [
        { icon: "✿", label: "Under 10 lbs" },
        { icon: "✿", label: "10 – 20 lbs" },
        { icon: "✿", label: "20 – 40 lbs" },
        { icon: "✿", label: "40+ lbs" },
      ],
    },
    {
      id: "duration",
      eyebrow: "Question 6 of 14",
      title: "How long have you been trying to lose weight?",
      type: "single",
      options: [
        { icon: "🕐", label: "Just starting out" },
        { icon: "🕑", label: "A few months" },
        { icon: "🕒", label: "1 – 2 years" },
        { icon: "🕓", label: "3+ years" },
      ],
    },
    {
      id: "challenge",
      eyebrow: "Question 7 of 14",
      title: "What is your biggest challenge?",
      type: "single",
      options: [
        { icon: "😔", label: "Emotional eating" },
        { icon: "⏰", label: "Lack of time" },
        { icon: "🍬", label: "Sugar cravings" },
        { icon: "🔋", label: "Poor motivation" },
        { icon: "🛋️", label: "Sedentary lifestyle" },
      ],
    },
    {
      id: "exercise",
      eyebrow: "Question 8 of 14",
      title: "Do you exercise regularly?",
      type: "single",
      options: [
        { icon: "🚫", label: "Never" },
        { icon: "🌤️", label: "Rarely" },
        { icon: "🏃‍♀️", label: "1 – 2 times a week" },
        { icon: "🔥", label: "3+ times a week" },
      ],
    },
    {
      id: "eatingHabits",
      eyebrow: "Question 9 of 14",
      title: "How would you describe your eating habits?",
      type: "single",
      options: [
        { icon: "🥗", label: "Mostly healthy" },
        { icon: "🍽️", label: "Somewhat balanced" },
        { icon: "🍔", label: "Lots of processed food" },
        { icon: "🤷‍♀️", label: "I don't really track" },
      ],
    },
    {
      id: "bodyFocus",
      eyebrow: "Question 10 of 14",
      title: "Which part of your body bothers you the most?",
      type: "single",
      options: [
        { icon: "🎯", label: "Belly" },
        { icon: "🦵", label: "Thighs & legs" },
        { icon: "💪", label: "Arms" },
        { icon: "🪞", label: "My overall body" },
      ],
    },
    {
      id: "timeline",
      eyebrow: "Question 11 of 14",
      title: "How quickly would you like to achieve your goal?",
      type: "single",
      options: [
        { icon: "⚡", label: "ASAP — I'm ready now" },
        { icon: "📅", label: "Within 2–3 months" },
        { icon: "🐢", label: "No rush, steady progress" },
        { icon: "👀", label: "Just exploring for now" },
      ],
    },
    {
      id: "energy",
      eyebrow: "Question 12 of 14",
      title: "How are your energy levels day to day?",
      type: "single",
      options: [
        { icon: "🔋", label: "Exhausted most days" },
        { icon: "🙂", label: "Okay, could be better" },
        { icon: "😊", label: "Pretty good" },
        { icon: "🌟", label: "Great" },
      ],
    },
    {
      id: "name",
      eyebrow: "Question 13 of 14",
      title: "What is your name?",
      type: "text",
      placeholder: "Enter your first name",
      required: true,
    },
    {
      id: "email",
      eyebrow: "Question 14 of 14",
      title: "What is your best email address?",
      hint: "Optional — we'll send your personalized plan here.",
      type: "text",
      placeholder: "you@example.com",
      required: false,
      inputType: "email",
    },
  ];

  const loadingMessages = [
    "✔ Analyzing your metabolism...",
    "✔ Identifying your body profile...",
    "✔ Comparing your answers with thousands of women...",
    "✔ Building your personalized strategy...",
  ];

  /* ---------------------------------------------------------
     2. STATE
  --------------------------------------------------------- */
  const state = { current: 0, answers: {} };

  /* ---------------------------------------------------------
     3. DOM REFERENCES
  --------------------------------------------------------- */
  const screens = {
    intro: document.getElementById("screen-intro"),
    question: document.getElementById("screen-question"),
    loading: document.getElementById("screen-loading"),
    results: document.getElementById("screen-results"),
    transition: document.getElementById("screen-transition"),
  };
  const quizHeader = document.getElementById("quiz-header");
  const progressFill = document.getElementById("progress-fill");
  const progressCurrent = document.getElementById("progress-current");
  const progressTotal = document.getElementById("progress-total");
  const progressbar = document.getElementById("progressbar");
  const questionContainer = document.getElementById("question-container");
  const salesPage = document.getElementById("sales-page");
  const quizApp = document.getElementById("quiz-app");

  progressTotal.textContent = questions.length;

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  /* ---------------------------------------------------------
     4. INTRO -> START
  --------------------------------------------------------- */
  document.getElementById("btn-start-quiz").addEventListener("click", () => {
    quizHeader.hidden = false;
    state.current = 0;
    renderQuestion();
    showScreen("question");
  });

  /* ---------------------------------------------------------
     5. RENDER QUESTION
  --------------------------------------------------------- */
  function renderQuestion() {
    const q = questions[state.current];
    progressCurrent.textContent = state.current + 1;
    const pct = Math.round(((state.current) / questions.length) * 100);
    progressFill.style.width = pct + "%";
    progressbar.setAttribute("aria-valuenow", pct);

    let html = `<p class="q-eyebrow">${q.eyebrow}</p><h2 class="q-title">${q.title}</h2>`;

    if (q.type === "single") {
      html += `<div class="q-options">`;
      q.options.forEach((opt, i) => {
        const selected = state.answers[q.id] === opt.label ? "selected" : "";
        html += `<button class="q-option ${selected}" data-label="${opt.label.replace(/"/g, "&quot;")}">
                    <span class="q-option-icon">${opt.icon}</span> ${opt.label}
                  </button>`;
      });
      html += `</div>`;
    } else if (q.type === "text") {
      const val = state.answers[q.id] || "";
      html += `<input class="q-input" type="${q.inputType || "text"}" id="text-answer" placeholder="${q.placeholder}" value="${val.replace(/"/g, "&quot;")}">`;
      if (q.hint) html += `<p class="q-hint">${q.hint}</p>`;
      html += `<button class="btn btn-primary btn-large btn-full" id="btn-text-continue">Continue →</button>`;
    }

    html += `<div class="q-nav">`;
    html += state.current > 0 ? `<button class="q-back" id="btn-back">← Back</button>` : `<span></span>`;
    html += `</div>`;

    questionContainer.innerHTML = html;

    if (q.type === "single") {
      questionContainer.querySelectorAll(".q-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.answers[q.id] = btn.dataset.label;
          goNext();
        });
      });
    } else {
      const input = document.getElementById("text-answer");
      input.focus();
      const continueBtn = document.getElementById("btn-text-continue");
      const submit = () => {
        const value = input.value.trim();
        if (q.required && value === "") {
          input.style.borderColor = "#B85C5C";
          return;
        }
        if (q.inputType === "email" && value !== "") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            input.style.borderColor = "#B85C5C";
            return;
          }
        }
        state.answers[q.id] = value;
        goNext();
      };
      continueBtn.addEventListener("click", submit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submit();
      });
    }

    const backBtn = document.getElementById("btn-back");
    if (backBtn) backBtn.addEventListener("click", goBack);
  }

  function goNext() {
    if (state.current < questions.length - 1) {
      state.current++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  function goBack() {
    if (state.current > 0) {
      state.current--;
      renderQuestion();
    }
  }

  /* ---------------------------------------------------------
     6. LOADING SEQUENCE
  --------------------------------------------------------- */
  function finishQuiz() {
    quizHeader.hidden = true;
    showScreen("loading");
    const msgEl = document.getElementById("loading-messages");
    const barFill = document.getElementById("loading-bar-fill");
    const totalDuration = 5000;
    const stepDuration = totalDuration / loadingMessages.length;

    let i = 0;
    msgEl.textContent = loadingMessages[0];
    barFill.style.width = "0%";

    const interval = setInterval(() => {
      i++;
      if (i < loadingMessages.length) {
        msgEl.textContent = loadingMessages[i];
      }
    }, stepDuration);

    // animate the bar smoothly
    requestAnimationFrame(() => {
      barFill.style.transition = `width ${totalDuration}ms linear`;
      barFill.style.width = "100%";
    });

    setTimeout(() => {
      clearInterval(interval);
      showResults();
    }, totalDuration);
  }

  /* ---------------------------------------------------------
     7. RESULTS SCREEN
  --------------------------------------------------------- */
  function showResults() {
    showScreen("results");
    const name = state.answers.name || "there";
    const goal = (state.answers.goal || "lose weight").toLowerCase();

    document.getElementById("results-title").textContent = `Congratulations, ${name}!`;
    document.getElementById("results-copy").textContent =
      `Based on your answers, we've identified that you have a highly favorable body profile for reaching your goal to ${goal}. Your biggest obstacle isn't a lack of motivation — it's simply using the wrong strategy. With the right method, you can absolutely achieve the lean, confident body you're working toward.`;

    // Compute a "match score" from answers (feels personalized, stays in a strong range)
    let score = 88;
    if (state.answers.challenge === "Poor motivation") score -= 3;
    if (state.answers.exercise === "3+ times a week") score += 4;
    if (state.answers.timeline === "ASAP — I'm ready now") score += 3;
    score = Math.max(85, Math.min(98, score));
    state.matchScore = score;

    animateScoreRing(score);

    document.querySelectorAll(".metric-fill").forEach((el) => {
      const target = el.dataset.fill;
      requestAnimationFrame(() => {
        el.style.width = target + "%";
      });
    });
  }

  function animateScoreRing(score) {
    const circle = document.getElementById("score-ring-fill");
    const numberEl = document.getElementById("score-number");
    const circumference = 540;
    const offset = circumference - (score / 100) * circumference;
    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = offset;
    });

    let current = 0;
    const duration = 1600;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = score / steps;
    const counter = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(counter);
      }
      numberEl.textContent = Math.round(current);
    }, stepTime);
  }

  document.getElementById("btn-see-plan").addEventListener("click", () => {
    showScreen("transition");
  });

  /* ---------------------------------------------------------
     8. TRANSITION -> SALES PAGE
  --------------------------------------------------------- */
  document.getElementById("btn-show-offer").addEventListener("click", () => {
    hydrateSalesPage();
    quizApp.hidden = true;
    salesPage.hidden = false;
    window.scrollTo(0, 0);
    initScrollReveal();
    animateHeroStats();
  });

  function hydrateSalesPage() {
    const name = state.answers.name || "friend";
    const score = state.matchScore || 92;
    document.getElementById("hero-name").textContent = name;
    document.getElementById("hero-score").textContent = score;
    document.getElementById("final-name").textContent = name;
  }

  /* ---------------------------------------------------------
     9. SALES PAGE INTERACTIONS
  --------------------------------------------------------- */

  // Animated counters for hero stats
  function animateHeroStats() {
    document.querySelectorAll(".stat-num").forEach((el) => {
      if (el.dataset.animated) return;
      el.dataset.animated = "true";
      const target = parseFloat(el.dataset.count);
      const isDecimal = target % 1 !== 0;
      let current = 0;
      const duration = 1400;
      const steps = duration / 16;
      const increment = target / steps;
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        el.textContent = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString();
      }, 16);
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((it) => it.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });

  // Scroll-reveal for cards/sections
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      ".benefit-card, .pas-card, .how-step, .testi-card, .bonus-card, .ba-card, .timeline-item"
    );
    targets.forEach((el) => el.classList.add("reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  // Countdown timer (urgency)
  function startCountdown() {
    let seconds = 14 * 60 + 59;
    const el = document.getElementById("countdown");
    if (!el) return;
    setInterval(() => {
      if (seconds <= 0) return;
      seconds--;
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      el.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    }, 1000);
  }
  startCountdown();

  // Buy button (placeholder — wire up to real checkout provider)
  document.getElementById("btn-buy").addEventListener("click", (e) => {
    e.preventDefault();
    alert("This is a demo funnel. Connect this button to your checkout provider (Stripe, PayPal, etc.) to accept real payments.");
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
