document.addEventListener("DOMContentLoaded", () => {

  /* Elements */

  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page]");

  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menuButton");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const themeButton = document.getElementById("themeButton");
  const darkModeDemo = document.getElementById("darkModeDemo");

  const languageButton = document.getElementById("languageButton");
  const languageMenu = document.getElementById("languageMenu");

  const searchButton = document.getElementById("searchButton");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const closeSearchButton = document.getElementById("closeSearch");

  const profileButton = document.getElementById("profileButton");
  const profileMenu = document.getElementById("profileMenu");

  const rtlDemo = document.getElementById("rtlDemo");


  /* Sidebar (mobile) — CSS expects .sidebar.active, not .open */

  function openSidebar() {
    if (!sidebar) return;

    sidebar.classList.add("active");
    sidebarOverlay?.classList.add("active");
  }

  function closeSidebar() {
    if (!sidebar) return;

    sidebar.classList.remove("active");
    sidebarOverlay?.classList.remove("active");
  }

  menuButton?.addEventListener("click", openSidebar);
  closeSidebarButton?.addEventListener("click", closeSidebar);
  sidebarOverlay?.addEventListener("click", closeSidebar);


  /* Menus */

  function closeLanguageMenu() {
    languageMenu?.classList.remove("active");
  }

  function closeProfileMenu() {
    profileMenu?.classList.remove("active");
  }


  /* Pages */

  function showPage(pageId, updateHash = true) {
    const targetPage = document.getElementById(pageId);

    if (!targetPage) {
      pageId = "home";
    }

    pages.forEach(page => {
      page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (!page) return;

    page.classList.add("active");

    document.querySelectorAll("[data-page]").forEach(link => {
      link.classList.toggle(
        "active",
        link.dataset.page === pageId
      );
    });

    if (updateHash) {
      history.replaceState(null, "", `#${pageId}`);
    }

    closeSidebar();
    closeLanguageMenu();
    closeProfileMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  /* Page Links */

  pageLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const pageId = link.dataset.page;

      if (pageId) {
        showPage(pageId);
      }
    });
  });


  /* Hash */

  function loadPage() {
    const hash = window.location.hash.substring(1);

    if (hash && document.getElementById(hash)) {
      showPage(hash, false);
    } else {
      showPage("home", false);
    }
  }

  window.addEventListener("hashchange", loadPage);


  /* Theme */

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-mode");

      if (themeButton) {
        themeButton.textContent = "☀️";
      }
    } else {
      document.body.classList.remove("light-mode");

      if (themeButton) {
        themeButton.textContent = "🌙";
      }
    }

    localStorage.setItem("meowsab-theme", theme);
  }

  const savedTheme =
    localStorage.getItem("meowsab-theme") || "dark";

  setTheme(savedTheme);

  themeButton?.addEventListener("click", () => {
    const light =
      document.body.classList.contains("light-mode");

    setTheme(light ? "dark" : "light");
  });

  // The "Toggle Theme" button inside the Dark Mode docs page is a
  // separate element from the navbar theme button — wire it to the
  // same logic instead of leaving it dead.
  darkModeDemo?.addEventListener("click", () => {
    const light =
      document.body.classList.contains("light-mode");

    setTheme(light ? "dark" : "light");
  });


  /* Language */

  languageButton?.addEventListener("click", event => {
    event.stopPropagation();

    languageMenu?.classList.toggle("active");
    closeProfileMenu();
  });

  const translations = {
    en: {
      docs: "Docs",
      components: "Components",
      utilities: "Utilities",
      playground: "Playground",

      gettingStarted: "Getting Started",
      foundation: "Foundation",
      advanced: "Advanced",

      tagline: "A simple, modern toolkit for building clean interfaces.",
      getStarted: "Get Started",
      exploreComponents: "Explore Components",

      search: "Search",
      searchPlaceholder: "Search MeowSab...",

      myProfile: "My Profile",
      profileDesc: "Manage your MeowSab preferences.",
      settings: "Settings"
    },

    ar: {
      docs: "التوثيق",
      components: "المكونات",
      utilities: "الأدوات",
      playground: "التجربة",

      gettingStarted: "البداية",
      foundation: "الأساسيات",
      advanced: "متقدم",

      tagline: "أدوات بسيطة وحديثة لبناء واجهات نظيفة.",
      getStarted: "ابدأ الآن",
      exploreComponents: "استكشف المكونات",

      search: "بحث",
      searchPlaceholder: "ابحث في ميوساب...",

      myProfile: "ملفي الشخصي",
      profileDesc: "إدارة إعدادات وتفضيلات ميوساب.",
      settings: "الإعدادات"
    }
  };

  function setLanguage(language) {
    const translation = translations[language];

    if (!translation) return;

    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    // The CSS mirroring rules key off body.rtl, so keep it in sync —
    // previously only the dir attribute was set, so the RTL layout
    // rules never actually triggered.
    document.body.classList.toggle("rtl", language === "ar");

    document.querySelectorAll(".nav-links [data-page]")
      .forEach(link => {

        const page = link.dataset.page;

        if (translation[page]) {
          link.textContent = translation[page];
        }
      });

    // Generic pass for any element opted in via data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;

      if (translation[key]) {
        el.textContent = translation[key];
      }
    });

    if (searchInput && translation.searchPlaceholder) {
      searchInput.placeholder = translation.searchPlaceholder;
    }

    localStorage.setItem(
      "meowsab-language",
      language
    );

    closeLanguageMenu();
  }

  document
    .querySelectorAll("[data-language]")
    .forEach(button => {

      button.addEventListener("click", () => {
        setLanguage(button.dataset.language);
      });

    });

  const savedLanguage =
    localStorage.getItem("meowsab-language") || "en";

  setLanguage(savedLanguage);

  // Standalone "Toggle RTL" demo button on the RTL docs page —
  // was never bound to anything before.
  rtlDemo?.addEventListener("click", () => {
    const isRtl = document.body.classList.contains("rtl");
    setLanguage(isRtl ? "en" : "ar");
  });


  /* Search */

  function openSearch() {
    searchOverlay?.classList.add("active");

    setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  function clearSearchResults() {
    document
      .querySelector(".search-results")
      ?.remove();
  }

  function closeSearch() {
    searchOverlay?.classList.remove("active");

    if (searchInput) {
      searchInput.value = "";
    }

    clearSearchResults();
  }

  searchButton?.addEventListener("click", openSearch);
  closeSearchButton?.addEventListener(
    "click",
    closeSearch
  );


  /* Search Data */

  const searchPages = [
    ["introduction", "Introduction", "Getting Started"],
    ["installation", "Installation", "Getting Started"],
    ["configuration", "Configuration", "Getting Started"],

    ["colors", "Colors", "Foundation"],
    ["typography", "Typography", "Foundation"],
    ["spacing", "Spacing", "Foundation"],
    ["layout", "Layout", "Foundation"],
    ["breakpoints", "Breakpoints", "Foundation"],

    ["buttons", "Buttons", "Components"],
    ["cards", "Cards", "Components"],
    ["inputs", "Inputs", "Components"],
    ["select", "Select", "Components"],
    ["checkbox", "Checkbox", "Components"],
    ["radio", "Radio", "Components"],
    ["badge", "Badge", "Components"],
    ["alerts", "Alerts", "Components"],
    ["modal", "Modal", "Components"],
    ["dropdown", "Dropdown", "Components"],
    ["tabs", "Tabs", "Components"],
    ["navbar", "Navbar", "Components"],
    ["sidebar-component", "Sidebar", "Components"],

    ["flex", "Flex", "Utilities"],
    ["grid", "Grid", "Utilities"],
    ["position", "Position", "Utilities"],
    ["display", "Display", "Utilities"],
    ["shadows", "Shadows", "Utilities"],
    ["borders", "Borders", "Utilities"],
    ["effects", "Effects", "Utilities"],
    ["responsive", "Responsive", "Utilities"],

    ["dark-mode", "Dark Mode", "Advanced"],
    ["rtl", "RTL", "Advanced"],
    ["customization", "Customization", "Advanced"],
    ["plugins", "Plugins", "Advanced"],

    ["playground", "Playground", "Tools"]
  ];

  function search(query) {
    clearSearchResults();

    if (!query.trim()) return;

    const box =
      document.querySelector(".search-box");

    if (!box) return;

    const value = query.toLowerCase().trim();

    const results = searchPages.filter(item => {
      return (
        item[1].toLowerCase().includes(value) ||
        item[2].toLowerCase().includes(value)
      );
    });

    const container =
      document.createElement("div");

    container.className = "search-results";

    if (!results.length) {

      container.innerHTML = `
        <div class="search-empty">
          No results found
        </div>
      `;

    } else {

      results.forEach(item => {

        const button =
          document.createElement("button");

        button.className = "search-result";

        button.innerHTML = `
          <span class="search-result-title">
            ${item[1]}
          </span>

          <span class="search-result-category">
            ${item[2]}
          </span>
        `;

        button.addEventListener("click", () => {
          closeSearch();
          showPage(item[0]);
        });

        container.appendChild(button);
      });
    }

    box.appendChild(container);
  }

  searchInput?.addEventListener("input", () => {
    search(searchInput.value);
  });


  /* Profile */

  profileButton?.addEventListener("click", event => {
    event.stopPropagation();

    profileMenu?.classList.toggle("active");
    closeLanguageMenu();
  });


  /* Dropdown — HTML uses .demo-dropdown with a plain <button> trigger
     (there's no separate .dropdown-button class), so select the
     trigger button directly instead of a class that never existed. */

  document
    .querySelectorAll(".demo-dropdown")
    .forEach(dropdown => {

      const button =
        dropdown.querySelector(":scope > button");

      const menu =
        dropdown.querySelector(".dropdown-menu");

      button?.addEventListener("click", event => {
        event.stopPropagation();

        menu?.classList.toggle("active");
      });

    });


  /* Tabs — HTML uses .tab-btn (not .tab-button) and plain ids like
     id="tab1" that match data-tab="tab1" directly (there's no
     data-tab-content attribute in the markup). */

  document
    .querySelectorAll(".tabs-demo")
    .forEach(tabs => {

      const buttons =
        tabs.querySelectorAll(".tab-btn");

      const contents =
        tabs.querySelectorAll(".tab-content");

      buttons.forEach(button => {

        button.addEventListener("click", () => {

          const target =
            button.dataset.tab;

          buttons.forEach(item => {
            item.classList.remove("active");
          });

          contents.forEach(content => {
            content.classList.remove("active");
          });

          button.classList.add("active");

          const targetContent =
            tabs.querySelector(`#${target}`);

          targetContent?.classList.add("active");

        });

      });

    });


  /* Modal — HTML uses #openDemoModal / #closeDemoModal (class
     "modal-close"), not the .open-modal / .close-modal classes
     this used to look for. */

  const demoModal = document.querySelector(".demo-modal");

  document.getElementById("openDemoModal")
    ?.addEventListener("click", () => {
      demoModal?.classList.add("active");
    });

  document.getElementById("closeDemoModal")
    ?.addEventListener("click", () => {
      demoModal?.classList.remove("active");
    });

  demoModal?.addEventListener("click", event => {
    if (event.target === demoModal) {
      demoModal.classList.remove("active");
    }
  });


  /* Copy Code */

  document
    .querySelectorAll(".copy-code")
    .forEach(button => {

      button.addEventListener("click", async () => {

        const block =
          button.closest(".code-block");

        const code =
          block?.querySelector("code");

        if (!code) return;

        try {

          await navigator.clipboard.writeText(
            code.textContent
          );

          const oldText =
            button.textContent;

          button.textContent = "Copied!";

          setTimeout(() => {
            button.textContent = oldText;
          }, 1500);

        } catch (error) {

          const textarea =
            document.createElement("textarea");

          textarea.value =
            code.textContent;

          document.body.appendChild(textarea);

          textarea.select();

          document.execCommand("copy");

          textarea.remove();

          button.textContent = "Copied!";

          setTimeout(() => {
            button.textContent = "Copy";
          }, 1500);
        }

      });

    });


  /* Playground — HTML's preview element is #playgroundPreview
     (class "playground-preview"), not ".preview-content", and the
     Run button never had a click handler. */

  const playgroundCode =
    document.getElementById("playgroundCode");

  const playgroundPreview =
    document.getElementById("playgroundPreview");

  const runPlaygroundButton =
    document.getElementById("runPlayground");

  function updatePlayground() {

    if (
      !playgroundCode ||
      !playgroundPreview
    ) {
      return;
    }

    playgroundPreview.innerHTML =
      playgroundCode.value;

  }

  playgroundCode?.addEventListener(
    "input",
    updatePlayground
  );

  runPlaygroundButton?.addEventListener(
    "click",
    updatePlayground
  );

  updatePlayground();


  /* Outside Click */

  document.addEventListener("click", event => {

    if (
      languageMenu &&
      !languageMenu.contains(event.target) &&
      !languageButton?.contains(event.target)
    ) {
      closeLanguageMenu();
    }

    if (
      profileMenu &&
      !profileMenu.contains(event.target) &&
      !profileButton?.contains(event.target)
    ) {
      closeProfileMenu();
    }

    document
      .querySelectorAll(".demo-dropdown")
      .forEach(dropdown => {

        if (!dropdown.contains(event.target)) {

          dropdown
            .querySelector(".dropdown-menu")
            ?.classList.remove("active");

        }

      });

  });


  /* Keyboard */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeSearch();
      closeSidebar();
      closeLanguageMenu();
      closeProfileMenu();

      demoModal?.classList.remove("active");

    }

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();
      openSearch();

    }

    if (
      event.key === "/" &&
      document.activeElement !== searchInput &&
      document.activeElement !== playgroundCode
    ) {

      event.preventDefault();
      openSearch();

    }

  });


  /* Mobile */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
      closeSidebar();
    }

  });


  /* Syntax Highlighting */

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlightHtml(text) {
    const pattern = /(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][\w:-]*)|(\s[a-zA-Z_:][\w:-]*(?=\s*=))|(=)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\/?>)/g;

    return text.replace(pattern, (m, comment, tag, attr, eq, str, close) => {
      if (comment) return `<span class="tok-comment">${escapeHtml(m)}</span>`;
      if (tag) return `<span class="tok-tag">${escapeHtml(m)}</span>`;
      if (attr) {
        const ws = m.match(/^\s*/)[0];
        return `${ws}<span class="tok-attr">${escapeHtml(m.trim())}</span>`;
      }
      if (eq) return `<span class="tok-punct">${escapeHtml(m)}</span>`;
      if (str) return `<span class="tok-string">${escapeHtml(m)}</span>`;
      if (close) return `<span class="tok-tag">${escapeHtml(m)}</span>`;
      return escapeHtml(m);
    });
  }

  function highlightCss(text) {
    const pattern = /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@[\w-]+)|(--[\w-]+|\bvar\b)|(#[0-9a-fA-F]{3,8}\b)|(-?\d*\.?\d+(?:px|rem|em|%|vh|vw|s|ms|deg)?)|([.:#]?[a-zA-Z][\w-]*)(?=\s*[,{])|([a-zA-Z-]+)(?=\s*:)|([{}();:,])/g;

    return text.replace(pattern, (m, comment, str, atrule, variable, hex, number, selector, property, punct) => {
      if (comment) return `<span class="tok-comment">${escapeHtml(m)}</span>`;
      if (str) return `<span class="tok-string">${escapeHtml(m)}</span>`;
      if (atrule) return `<span class="tok-atrule">${escapeHtml(m)}</span>`;
      if (variable) return `<span class="tok-variable">${escapeHtml(m)}</span>`;
      if (hex) return `<span class="tok-hex">${escapeHtml(m)}</span>`;
      if (number) return `<span class="tok-number">${escapeHtml(m)}</span>`;
      if (selector) return `<span class="tok-selector">${escapeHtml(m)}</span>`;
      if (property) return `<span class="tok-property">${escapeHtml(m)}</span>`;
      if (punct) return `<span class="tok-punct">${escapeHtml(m)}</span>`;
      return escapeHtml(m);
    });
  }

  function highlightJs(text) {
    const keywords = "const|let|var|function|return|if|else|for|while|new|class|extends|import|export|default|from|async|await|true|false|null|undefined|this|typeof|of|in|break|continue|switch|case|try|catch|finally|throw";
    const pattern = new RegExp(
      `(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)|(\`(?:[^\`\\\\]|\\\\.)*\`|"(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')|(\\b(?:${keywords})\\b)|(\\b\\d+\\.?\\d*\\b)|([{}()\\[\\];:,.])`,
      "g"
    );

    return text.replace(pattern, (m, comment, str, keyword, number, punct) => {
      if (comment) return `<span class="tok-comment">${escapeHtml(m)}</span>`;
      if (str) return `<span class="tok-string">${escapeHtml(m)}</span>`;
      if (keyword) return `<span class="tok-keyword">${escapeHtml(m)}</span>`;
      if (number) return `<span class="tok-number">${escapeHtml(m)}</span>`;
      if (punct) return `<span class="tok-punct">${escapeHtml(m)}</span>`;
      return escapeHtml(m);
    });
  }

  document.querySelectorAll(".code-block").forEach(block => {
    const label = block.querySelector(".code-header span")?.textContent.trim().toLowerCase();
    const code = block.querySelector("code");

    if (!code || !label) return;

    const raw = code.textContent;

    if (label === "html") {
      code.innerHTML = highlightHtml(raw);
    } else if (label === "css") {
      code.innerHTML = highlightCss(raw);
    } else if (label === "js") {
      code.innerHTML = highlightJs(raw);
    }
  });


  /* Start */

  loadPage();

});
