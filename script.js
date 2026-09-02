document.addEventListener("DOMContentLoaded", () => {

  /* Pages */

  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page]");

  function showPage(pageId, updateHash = true) {
    const targetPage = document.getElementById(pageId);

    if (!targetPage) {
      showPage("home", false);
      return;
    }

    pages.forEach(page => {
      page.classList.remove("active");
    });

    targetPage.classList.add("active");

    document.querySelectorAll(".sidebar-link").forEach(link => {
      link.classList.toggle(
        "active",
        link.dataset.page === pageId
      );
    });

    if (updateHash) {
      history.replaceState(null, "", `#${pageId}`);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    closeSidebar();
    closeLanguageMenu();
    closeProfileMenu();
  }

  pageLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const page = link.dataset.page;

      if (page) {
        showPage(page);
      }
    });
  });


  /* Hash Navigation */

  function loadPageFromHash() {
    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
      showPage(hash, false);
    } else {
      showPage("home", false);
    }
  }

  window.addEventListener("hashchange", loadPageFromHash);

  loadPageFromHash();


  /* Sidebar */

  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menuButton");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  function openSidebar() {
    if (!sidebar) return;

    sidebar.classList.add("open");
    sidebarOverlay?.classList.add("active");
    document.body.classList.add("sidebar-open");
  }

  function closeSidebar() {
    if (!sidebar) return;

    sidebar.classList.remove("open");
    sidebarOverlay?.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }

  menuButton?.addEventListener("click", openSidebar);
  closeSidebarButton?.addEventListener("click", closeSidebar);
  sidebarOverlay?.addEventListener("click", closeSidebar);


  /* Theme */

  const themeButton = document.getElementById("themeButton");

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-mode");

      if (themeButton) {
        themeButton.textContent = "☀️";
        themeButton.setAttribute("aria-label", "Switch to dark mode");
      }
    } else {
      document.body.classList.remove("light-mode");

      if (themeButton) {
        themeButton.textContent = "🌙";
        themeButton.setAttribute("aria-label", "Switch to light mode");
      }
    }

    localStorage.setItem("meowsab-theme", theme);
  }

  const savedTheme = localStorage.getItem("meowsab-theme") || "dark";

  setTheme(savedTheme);

  themeButton?.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");

    setTheme(isLight ? "dark" : "light");
  });


  /* Language */

  const languageButton = document.getElementById("languageButton");
  const languageMenu = document.getElementById("languageMenu");

  function openLanguageMenu() {
    languageMenu?.classList.add("active");
  }

  function closeLanguageMenu() {
    languageMenu?.classList.remove("active");
  }

  languageButton?.addEventListener("click", event => {
    event.stopPropagation();

    if (languageMenu?.classList.contains("active")) {
      closeLanguageMenu();
    } else {
      openLanguageMenu();
    }
  });


  /* Language Switch */

  const translations = {
    en: {
      docs: "Docs",
      components: "Components",
      utilities: "Utilities",
      playground: "Playground"
    },

    ar: {
      docs: "التوثيق",
      components: "المكونات",
      utilities: "الأدوات",
      playground: "التجربة"
    }
  };

  function changeLanguage(language) {
    const translation = translations[language];

    if (!translation) return;

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll(".nav-links [data-page]").forEach(link => {
      const page = link.dataset.page;

      if (translation[page]) {
        link.textContent = translation[page];
      }
    });

    localStorage.setItem("meowsab-language", language);

    closeLanguageMenu();
  }

  document.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => {
      changeLanguage(button.dataset.language);
    });
  });

  const savedLanguage =
    localStorage.getItem("meowsab-language") || "en";

  changeLanguage(savedLanguage);


  /* Search */

  const searchButton = document.getElementById("searchButton");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const closeSearchButton = document.getElementById("closeSearch");

  function openSearch() {
    searchOverlay?.classList.add("active");

    setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  function closeSearch() {
    searchOverlay?.classList.remove("active");

    if (searchInput) {
      searchInput.value = "";
    }

    clearSearchResults();
  }

  searchButton?.addEventListener("click", openSearch);
  closeSearchButton?.addEventListener("click", closeSearch);


  /* Search Data */

  const searchPages = [
    {
      id: "introduction",
      title: "Introduction",
      category: "Getting Started"
    },
    {
      id: "installation",
      title: "Installation",
      category: "Getting Started"
    },
    {
      id: "configuration",
      title: "Configuration",
      category: "Getting Started"
    },

    {
      id: "colors",
      title: "Colors",
      category: "Foundation"
    },
    {
      id: "typography",
      title: "Typography",
      category: "Foundation"
    },
    {
      id: "spacing",
      title: "Spacing",
      category: "Foundation"
    },
    {
      id: "layout",
      title: "Layout",
      category: "Foundation"
    },
    {
      id: "breakpoints",
      title: "Breakpoints",
      category: "Foundation"
    },

    {
      id: "buttons",
      title: "Buttons",
      category: "Components"
    },
    {
      id: "cards",
      title: "Cards",
      category: "Components"
    },
    {
      id: "inputs",
      title: "Inputs",
      category: "Components"
    },
    {
      id: "select",
      title: "Select",
      category: "Components"
    },
    {
      id: "checkbox",
      title: "Checkbox",
      category: "Components"
    },
    {
      id: "radio",
      title: "Radio",
      category: "Components"
    },
    {
      id: "badge",
      title: "Badge",
      category: "Components"
    },
    {
      id: "alerts",
      title: "Alerts",
      category: "Components"
    },
    {
      id: "modal",
      title: "Modal",
      category: "Components"
    },
    {
      id: "dropdown",
      title: "Dropdown",
      category: "Components"
    },
    {
      id: "tabs",
      title: "Tabs",
      category: "Components"
    },
    {
      id: "navbar",
      title: "Navbar",
      category: "Components"
    },
    {
      id: "sidebar-component",
      title: "Sidebar",
      category: "Components"
    },

    {
      id: "flex",
      title: "Flex",
      category: "Utilities"
    },
    {
      id: "grid",
      title: "Grid",
      category: "Utilities"
    },
    {
      id: "position",
      title: "Position",
      category: "Utilities"
    },
    {
      id: "display",
      title: "Display",
      category: "Utilities"
    },
    {
      id: "shadows",
      title: "Shadows",
      category: "Utilities"
    },
    {
      id: "borders",
      title: "Borders",
      category: "Utilities"
    },
    {
      id: "effects",
      title: "Effects",
      category: "Utilities"
    },
    {
      id: "responsive",
      title: "Responsive",
      category: "Utilities"
    },

    {
      id: "dark-mode",
      title: "Dark Mode",
      category: "Advanced"
    },
    {
      id: "rtl",
      title: "RTL",
      category: "Advanced"
    },
    {
      id: "customization",
      title: "Customization",
      category: "Advanced"
    },
    {
      id: "plugins",
      title: "Plugins",
      category: "Advanced"
    },

    {
      id: "playground",
      title: "Playground",
      category: "Tools"
    }
  ];


  function clearSearchResults() {
    const results = document.querySelector(".search-results");

    if (results) {
      results.remove();
    }
  }

  function showSearchResults(query) {
    clearSearchResults();

    if (!query.trim()) return;

    const results = document.createElement("div");

    results.className = "search-results";

    const normalizedQuery = query.toLowerCase().trim();

    const matches = searchPages.filter(page => {
      return (
        page.title.toLowerCase().includes(normalizedQuery) ||
        page.category.toLowerCase().includes(normalizedQuery)
      );
    });

    if (matches.length === 0) {
      results.innerHTML = `
        <div class="search-empty">
          No results found
        </div>
      `;
    } else {
      matches.forEach(page => {
        const result = document.createElement("button");

        result.className = "search-result";

        result.innerHTML = `
          <span class="search-result-title">
            ${page.title}
          </span>

          <span class="search-result-category">
            ${page.category}
          </span>
        `;

        result.addEventListener("click", () => {
          closeSearch();
          showPage(page.id);
        });

        results.appendChild(result);
      });
    }

    document.querySelector(".search-box")?.appendChild(results);
  }

  searchInput?.addEventListener("input", () => {
    showSearchResults(searchInput.value);
  });


  /* Profile */

  const profileButton = document.getElementById("profileButton");
  const profileMenu = document.getElementById("profileMenu");

  function closeProfileMenu() {
    profileMenu?.classList.remove("active");
  }

  profileButton?.addEventListener("click", event => {
    event.stopPropagation();

    profileMenu?.classList.toggle("active");

    closeLanguageMenu();
  });


  /* Dropdown Demo */

  document.querySelectorAll(".demo-dropdown").forEach(dropdown => {
    const button = dropdown.querySelector(".dropdown-button");
    const menu = dropdown.querySelector(".dropdown-menu");

    button?.addEventListener("click", event => {
      event.stopPropagation();

      menu?.classList.toggle("active");
    });
  });


  /* Tabs Demo */

  document.querySelectorAll(".tabs-demo").forEach(tabs => {
    const buttons = tabs.querySelectorAll(".tab-button");
    const contents = tabs.querySelectorAll(".tab-content");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;

        buttons.forEach(item => {
          item.classList.remove("active");
        });

        contents.forEach(content => {
          content.classList.remove("active");
        });

        button.classList.add("active");

        const targetContent = tabs.querySelector(
          `[data-tab-content="${target}"]`
        );

        targetContent?.classList.add("active");
      });
    });
  });


  /* Modal Demo */

  const modal = document.querySelector(".demo-modal");
  const openModalButton = document.querySelector(".open-modal");
  const closeModalButtons =
    document.querySelectorAll(".close-modal");

  function openModal() {
    modal?.classList.add("active");
  }

  function closeModal() {
    modal?.classList.remove("active");
  }

  openModalButton?.addEventListener("click", openModal);

  closeModalButtons.forEach(button => {
    button.addEventListener("click", closeModal);
  });

  modal?.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });


  /* Copy Code */

  document.querySelectorAll(".copy-code").forEach(button => {
    button.addEventListener("click", async () => {
      const codeBlock = button.closest(".code-block");

      const code = codeBlock?.querySelector("code");

      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText);

        const originalText = button.textContent;

        button.textContent = "Copied!";

        setTimeout(() => {
          button.textContent = originalText;
        }, 1500);

      } catch (error) {
        console.error("Copy failed:", error);
      }
    });
  });


  /* Playground */

  const playgroundCode =
    document.getElementById("playgroundCode");

  const playgroundPreview =
    document.querySelector(".preview-content");

  function updatePlayground() {
    if (!playgroundCode || !playgroundPreview) return;

    playgroundPreview.innerHTML = playgroundCode.value;
  }

  playgroundCode?.addEventListener(
    "input",
    updatePlayground
  );

  updatePlayground();


  /* Keyboard */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeSearch();
      closeSidebar();
      closeLanguageMenu();
      closeProfileMenu();
      closeModal();
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

    document.querySelectorAll(".demo-dropdown").forEach(dropdown => {
      const menu = dropdown.querySelector(".dropdown-menu");

      if (
        menu &&
        !dropdown.contains(event.target)
      ) {
        menu.classList.remove("active");
      }
    });
  });


  /* Mobile */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeSidebar();
    }
  });

});
