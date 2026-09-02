/* MeowSab */

document.addEventListener("DOMContentLoaded", () => {

  /* Elements */

  const body = document.body;
  const html = document.documentElement;

  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page]");

  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menuButton");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const themeButton = document.getElementById("themeButton");

  const languageButton = document.getElementById("languageButton");
  const languageMenu = document.getElementById("languageMenu");

  const profileButton = document.getElementById("profileButton");
  const profileMenu = document.getElementById("profileMenu");

  const searchButton = document.getElementById("searchButton");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchBox = document.querySelector(".search-box");
  const searchInput = document.getElementById("searchInput");
  const closeSearchButton = document.getElementById("closeSearch");

  const playgroundEditor = document.querySelector(".editor textarea");
  const playgroundPreview = document.querySelector(".preview-content");


  /* State */

  let currentLanguage =
    localStorage.getItem("meowsab-language") || "en";

  let currentTheme =
    localStorage.getItem("meowsab-theme") || "dark";


  /* Pages */

  const pageData = {

    home: {
      name: "Home",
      category: "Main"
    },

    docs: {
      name: "Docs",
      category: "Documentation"
    },

    components: {
      name: "Components",
      category: "UI"
    },

    utilities: {
      name: "Utilities",
      category: "Utilities"
    },

    playground: {
      name: "Playground",
      category: "Interactive"
    },

    introduction: {
      name: "Introduction",
      category: "Getting Started"
    },

    installation: {
      name: "Installation",
      category: "Getting Started"
    },

    configuration: {
      name: "Configuration",
      category: "Getting Started"
    },

    colors: {
      name: "Colors",
      category: "Foundation"
    },

    typography: {
      name: "Typography",
      category: "Foundation"
    },

    spacing: {
      name: "Spacing",
      category: "Foundation"
    },

    layout: {
      name: "Layout",
      category: "Foundation"
    },

    breakpoints: {
      name: "Breakpoints",
      category: "Foundation"
    },

    buttons: {
      name: "Buttons",
      category: "Components"
    },

    cards: {
      name: "Cards",
      category: "Components"
    },

    inputs: {
      name: "Inputs",
      category: "Components"
    },

    select: {
      name: "Select",
      category: "Components"
    },

    checkbox: {
      name: "Checkbox",
      category: "Components"
    },

    radio: {
      name: "Radio",
      category: "Components"
    },

    badge: {
      name: "Badge",
      category: "Components"
    },

    alerts: {
      name: "Alerts",
      category: "Components"
    },

    modal: {
      name: "Modal",
      category: "Components"
    },

    dropdown: {
      name: "Dropdown",
      category: "Components"
    },

    tabs: {
      name: "Tabs",
      category: "Components"
    },

    navbar: {
      name: "Navbar",
      category: "Components"
    },

    "sidebar-component": {
      name: "Sidebar",
      category: "Components"
    },

    flex: {
      name: "Flex",
      category: "Utilities"
    },

    grid: {
      name: "Grid",
      category: "Utilities"
    },

    position: {
      name: "Position",
      category: "Utilities"
    },

    display: {
      name: "Display",
      category: "Utilities"
    },

    shadows: {
      name: "Shadows",
      category: "Utilities"
    },

    borders: {
      name: "Borders",
      category: "Utilities"
    },

    effects: {
      name: "Effects",
      category: "Utilities"
    },

    responsive: {
      name: "Responsive",
      category: "Utilities"
    },

    "dark-mode": {
      name: "Dark Mode",
      category: "Advanced"
    },

    rtl: {
      name: "RTL",
      category: "Advanced"
    },

    customization: {
      name: "Customization",
      category: "Advanced"
    },

    plugins: {
      name: "Plugins",
      category: "Advanced"
    }

  };


  /* Navigation */

  function showPage(pageId, updateHash = true) {

    const page = document.getElementById(pageId);

    if (!page) {
      showPage("home");
      return;
    }

    pages.forEach(item => {
      item.classList.remove("active");
    });

    page.classList.add("active");


    document
      .querySelectorAll(".sidebar a[data-page]")
      .forEach(link => {

        link.classList.toggle(
          "active",
          link.dataset.page === pageId
        );

      });


    if (updateHash) {

      history.replaceState(
        null,
        "",
        `#${pageId}`
      );

    }


    closeSidebar();
    closeMenus();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* Navigation Links */

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

  function loadPageFromHash() {

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
      showPage(hash, false);
    } else {
      showPage("home", false);
    }

  }

  loadPageFromHash();


  window.addEventListener("hashchange", () => {

    const hash =
      window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
      showPage(hash, false);
    }

  });


  /* Sidebar */

  function openSidebar() {

    sidebar?.classList.add("active");
    sidebarOverlay?.classList.add("active");

    body.style.overflow = "hidden";

  }


  function closeSidebar() {

    sidebar?.classList.remove("active");
    sidebarOverlay?.classList.remove("active");

    body.style.overflow = "";

  }


  menuButton?.addEventListener(
    "click",
    openSidebar
  );


  closeSidebarButton?.addEventListener(
    "click",
    closeSidebar
  );


  sidebarOverlay?.addEventListener(
    "click",
    closeSidebar
  );


  /* Theme */

  function setTheme(theme) {

    currentTheme = theme;

    if (theme === "light") {

      body.classList.add("light-mode");

    } else {

      body.classList.remove("light-mode");

    }

    localStorage.setItem(
      "meowsab-theme",
      theme
    );

    updateThemeIcon();

  }


  function updateThemeIcon() {

    if (!themeButton) return;

    if (currentTheme === "light") {

      themeButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">

          <circle cx="12" cy="12" r="4"></circle>

          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>

          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>

          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>

          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>

        </svg>
      `;

    } else {

      themeButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">

          <path
            d="M21 12.79A9 9 0 1 1 11.21 3
            A7 7 0 0 0 21 12.79z">
          </path>

        </svg>
      `;

    }

  }


  themeButton?.addEventListener(
    "click",
    () => {

      setTheme(
        currentTheme === "dark"
          ? "light"
          : "dark"
      );

    }
  );


  setTheme(currentTheme);


  /* Language */

  const translations = {

    en: {

      nav: [
        "Docs",
        "Components",
        "Utilities",
        "Playground"
      ],

      groups: [
        "Getting Started",
        "Foundation",
        "Components",
        "Utilities",
        "Advanced",
        "Playground"
      ],

      pages: {

        introduction: "Introduction",
        installation: "Installation",
        configuration: "Configuration",

        colors: "Colors",
        typography: "Typography",
        spacing: "Spacing",
        layout: "Layout",
        breakpoints: "Breakpoints",

        buttons: "Buttons",
        cards: "Cards",
        inputs: "Inputs",
        select: "Select",
        checkbox: "Checkbox",
        radio: "Radio",
        badge: "Badge",
        alerts: "Alerts",
        modal: "Modal",
        dropdown: "Dropdown",
        tabs: "Tabs",
        navbar: "Navbar",
        "sidebar-component": "Sidebar",

        flex: "Flex",
        grid: "Grid",
        position: "Position",
        display: "Display",
        shadows: "Shadows",
        borders: "Borders",
        effects: "Effects",
        responsive: "Responsive",

        "dark-mode": "Dark Mode",
        rtl: "RTL",
        customization: "Customization",
        plugins: "Plugins",

        playground: "Playground"

      }

    },


    ar: {

      nav: [
        "التوثيق",
        "المكونات",
        "الأدوات",
        "التجربة"
      ],

      groups: [
        "البداية",
        "الأساسيات",
        "المكونات",
        "الأدوات",
        "متقدم",
        "التجربة"
      ],

      pages: {

        introduction: "مقدمة",
        installation: "التثبيت",
        configuration: "الإعدادات",

        colors: "الألوان",
        typography: "الخطوط",
        spacing: "المسافات",
        layout: "التخطيط",
        breakpoints: "نقاط التوقف",

        buttons: "الأزرار",
        cards: "البطاقات",
        inputs: "حقول الإدخال",
        select: "القائمة",
        checkbox: "خانة الاختيار",
        radio: "الاختيارات",
        badge: "الشارة",
        alerts: "التنبيهات",
        modal: "النافذة",
        dropdown: "القائمة المنسدلة",
        tabs: "علامات التبويب",
        navbar: "شريط التنقل",
        "sidebar-component": "الشريط الجانبي",

        flex: "Flex",
        grid: "Grid",
        position: "Position",
        display: "Display",
        shadows: "Shadows",
        borders: "Borders",
        effects: "Effects",
        responsive: "Responsive",

        "dark-mode": "الوضع الداكن",
        rtl: "RTL",
        customization: "التخصيص",
        plugins: "الإضافات",

        playground: "التجربة"

      }

    }

  };


  function setLanguage(language) {

    currentLanguage = language;

    const data =
      translations[language];

    if (!data) return;


    html.lang = language;
    html.dir =
      language === "ar"
        ? "rtl"
        : "ltr";


    /* Navbar */

    document
      .querySelectorAll(".nav-links a")
      .forEach((link, index) => {

        if (data.nav[index]) {
          link.textContent =
            data.nav[index];
        }

      });


    /* Sidebar Groups */

    document
      .querySelectorAll(".sidebar-title")
      .forEach((title, index) => {

        if (data.groups[index]) {
          title.textContent =
            data.groups[index];
        }

      });


    /* Sidebar Links */

    document
      .querySelectorAll(".sidebar a[data-page]")
      .forEach(link => {

        const pageId =
          link.dataset.page;

        if (data.pages[pageId]) {
          link.textContent =
            data.pages[pageId];
        }

      });


    localStorage.setItem(
      "meowsab-language",
      language
    );

  }


  languageButton?.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      languageMenu?.classList.toggle(
        "active"
      );

      profileMenu?.classList.remove(
        "active"
      );

    }
  );


  document
    .querySelectorAll("[data-language]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          setLanguage(
            button.dataset.language
          );

          languageMenu?.classList.remove(
            "active"
          );

        }
      );

    });


  setLanguage(currentLanguage);


  /* Search */

  let searchResults =
    document.querySelector(".search-results");


  if (!searchResults) {

    searchResults =
      document.createElement("div");

    searchResults.className =
      "search-results";

    searchBox?.appendChild(
      searchResults
    );

  }


  function openSearch() {

    searchOverlay?.classList.add(
      "active"
    );

    setTimeout(() => {
      searchInput?.focus();
    }, 100);

  }


  function closeSearch() {

    searchOverlay?.classList.remove(
      "active"
    );

    if (searchInput) {
      searchInput.value = "";
    }

    if (searchResults) {
      searchResults.innerHTML = "";
    }

  }


  searchButton?.addEventListener(
    "click",
    openSearch
  );


  closeSearchButton?.addEventListener(
    "click",
    closeSearch
  );


  searchOverlay?.addEventListener(
    "click",
    event => {

      if (
        event.target === searchOverlay
      ) {
        closeSearch();
      }

    }
  );


  /* Search Results */

  function getSearchResults(query) {

    return Object.entries(pageData)
      .filter(([id, page]) => {

        const name =
          page.name.toLowerCase();

        return (
          name.includes(query) ||
          id.includes(query)
        );

      });

  }


  function renderSearchResults(query) {

    if (!searchResults) return;

    searchResults.innerHTML = "";

    if (!query) return;


    const results =
      getSearchResults(query);


    if (!results.length) {

      searchResults.innerHTML = `
        <div class="search-result">
          <span>No results found</span>
          <small>Try another search</small>
        </div>
      `;

      return;

    }


    results.forEach(([id, data]) => {

      const result =
        document.createElement("button");

      result.className =
        "search-result";

      result.innerHTML = `
        <span>${data.name}</span>
        <small>${data.category}</small>
      `;


      result.addEventListener(
        "click",
        () => {

          showPage(id);

          closeSearch();

        }
      );


      searchResults.appendChild(
        result
      );

    });

  }


  searchInput?.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();

      renderSearchResults(query);

    }
  );


  /* Keyboard Search */

  document.addEventListener(
    "keydown",
    event => {

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
        document.activeElement?.tagName !== "TEXTAREA"
      ) {

        event.preventDefault();

        openSearch();

      }


      if (event.key === "Escape") {

        closeSearch();
        closeSidebar();
        closeMenus();

      }

    }
  );


  /* Profile */

  profileButton?.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      profileMenu?.classList.toggle(
        "active"
      );

      languageMenu?.classList.remove(
        "active"
      );

    }
  );


  /* Menus */

  function closeMenus() {

    profileMenu?.classList.remove(
      "active"
    );

    languageMenu?.classList.remove(
      "active"
    );

  }


  document.addEventListener(
    "click",
    event => {

      if (
        profileMenu &&
        profileButton &&
        !profileMenu.contains(event.target) &&
        !profileButton.contains(event.target)
      ) {

        profileMenu.classList.remove(
          "active"
        );

      }


      if (
        languageMenu &&
        languageButton &&
        !languageMenu.contains(event.target) &&
        !languageButton.contains(event.target)
      ) {

        languageMenu.classList.remove(
          "active"
        );

      }

    }
  );


  /* Playground */

  function updatePlayground() {

    if (
      !playgroundEditor ||
      !playgroundPreview
    ) {
      return;
    }


    playgroundPreview.innerHTML =
      playgroundEditor.value;

  }


  playgroundEditor?.addEventListener(
    "input",
    updatePlayground
  );


  updatePlayground();


  /* Demo Buttons */

  document
    .querySelectorAll(".demo-button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          button.classList.add(
            "clicked"
          );

          setTimeout(() => {

            button.classList.remove(
              "clicked"
            );

          }, 180);

        }
      );

    });


  /* Resize */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 700) {
        closeSidebar();
      }

    }
  );


  /* Start */

  showPage(
    window.location.hash
      ? window.location.hash.replace("#", "")
      : "home",
    false
  );

});
