document.addEventListener("DOMContentLoaded", () => {

  /* Elements */

  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page]");

  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menuButton");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const themeButton = document.getElementById("themeButton");

  const languageButton = document.getElementById("languageButton");
  const languageMenu = document.getElementById("languageMenu");

  const searchButton = document.getElementById("searchButton");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const closeSearchButton = document.getElementById("closeSearch");

  const profileButton = document.getElementById("profileButton");
  const profileMenu = document.getElementById("profileMenu");


  /* Sidebar */

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
      playground: "Playground"
    },

    ar: {
      docs: "التوثيق",
      components: "المكونات",
      utilities: "الأدوات",
      playground: "التجربة"
    }
  };

  function setLanguage(language) {
    const translation = translations[language];

    if (!translation) return;

    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll(".nav-links [data-page]")
      .forEach(link => {

        const page = link.dataset.page;

        if (translation[page]) {
          link.textContent = translation[page];
        }
      });

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


  /* Dropdown */

  document
    .querySelectorAll(".demo-dropdown")
    .forEach(dropdown => {

      const button =
        dropdown.querySelector(".dropdown-button");

      const menu =
        dropdown.querySelector(".dropdown-menu");

      button?.addEventListener("click", event => {
        event.stopPropagation();

        menu?.classList.toggle("active");
      });

    });


  /* Tabs */

  document
    .querySelectorAll(".tabs-demo")
    .forEach(tabs => {

      const buttons =
        tabs.querySelectorAll(".tab-button");

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
            tabs.querySelector(
              `[data-tab-content="${target}"]`
            );

          targetContent?.classList.add("active");

        });

      });

    });


  /* Modal */

  document
    .querySelectorAll(".open-modal")
    .forEach(button => {

      button.addEventListener("click", () => {

        const modal =
          document.querySelector(".demo-modal");

        modal?.classList.add("active");

      });

    });

  document
    .querySelectorAll(".close-modal")
    .forEach(button => {

      button.addEventListener("click", () => {

        const modal =
          document.querySelector(".demo-modal");

        modal?.classList.remove("active");

      });

    });

  document
    .querySelector(".demo-modal")
    ?.addEventListener("click", event => {

      if (
        event.target.classList.contains("demo-modal")
      ) {
        event.target.classList.remove("active");
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


  /* Playground */

  const playgroundCode =
    document.getElementById("playgroundCode");

  const playgroundPreview =
    document.querySelector(
      "#playground .preview-content"
    );

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

      document
        .querySelector(".demo-modal")
        ?.classList.remove("active");

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

    if (window.innerWidth > 700) {
      closeSidebar();
    }

  });


  /* Start */

  loadPage();

});
