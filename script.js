/* Navigation */

const pages = document.querySelectorAll(".page");
const pageLinks = document.querySelectorAll("[data-page]");

function showPage(pageId) {
  const target = document.getElementById(pageId);

  if (!target) return;

  pages.forEach(page => {
    page.classList.remove("active");
  });

  target.classList.add("active");

  document.querySelectorAll(".sidebar a").forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageId
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeSidebar();
  closeMenus();
}


/* Page Links */

pageLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const page = link.dataset.page;

    if (page) {
      showPage(page);
    }
  });
});


/* Sidebar */

const menuButton = document.getElementById("menuButton");
const closeSidebarButton = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

menuButton?.addEventListener("click", openSidebar);
closeSidebarButton?.addEventListener("click", closeSidebar);
sidebarOverlay?.addEventListener("click", closeSidebar);


/* Theme */

const themeButton = document.getElementById("themeButton");

function updateThemeIcon() {
  if (!themeButton) return;

  if (document.body.classList.contains("light-mode")) {
    themeButton.innerHTML = `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
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
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3
        A7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("meowsab-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  updateThemeIcon();
}

themeButton?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");

  localStorage.setItem(
    "meowsab-theme",
    isLight ? "light" : "dark"
  );

  updateThemeIcon();
});

loadTheme();


/* Language */

const languageButton = document.getElementById("languageButton");
const languageMenu = document.getElementById("languageMenu");

languageButton?.addEventListener("click", event => {
  event.stopPropagation();

  languageMenu.classList.toggle("active");

  document.getElementById("profileMenu")?.classList.remove("active");
});

document.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;

    if (language === "ar") {
      setArabic();
    } else {
      setEnglish();
    }

    languageMenu.classList.remove("active");
  });
});


/* Arabic */

function setArabic() {
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";

  document.querySelector('.nav-links a[data-page="docs"]').textContent =
    "التوثيق";

  document.querySelector('.nav-links a[data-page="components"]').textContent =
    "المكونات";

  document.querySelector('.nav-links a[data-page="utilities"]').textContent =
    "الأدوات";

  document.querySelector('.nav-links a[data-page="playground"]').textContent =
    "التجربة";

  document.querySelector('.sidebar-title:nth-child(1)');

  document.querySelectorAll(".sidebar-title")[0].textContent =
    "البداية";

  document.querySelectorAll(".sidebar-title")[1].textContent =
    "الأساسيات";

  document.querySelectorAll(".sidebar-title")[2].textContent =
    "المكونات";

  document.querySelectorAll(".sidebar-title")[3].textContent =
    "الأدوات";

  const translations = {
    introduction: "مقدمة",
    installation: "التثبيت",
    colors: "الألوان",
    typography: "الخطوط",
    spacing: "المسافات",
    layout: "التخطيط",
    buttons: "الأزرار",
    cards: "البطاقات",
    inputs: "حقول الإدخال",
    alerts: "التنبيهات",
    modal: "النافذة",
    flex: "Flex",
    grid: "Grid",
    position: "Position",
    effects: "Effects"
  };

  Object.entries(translations).forEach(([page, text]) => {
    const link = document.querySelector(
      `.sidebar a[data-page="${page}"]`
    );

    if (link) {
      link.textContent = text;
    }
  });

  localStorage.setItem("meowsab-language", "ar");
}


/* English */

function setEnglish() {
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";

  const navTranslations = {
    docs: "Docs",
    components: "Components",
    utilities: "Utilities",
    playground: "Playground"
  };

  Object.entries(navTranslations).forEach(([page, text]) => {
    const link = document.querySelector(
      `.nav-links a[data-page="${page}"]`
    );

    if (link) {
      link.textContent = text;
    }
  });

  const titles = [
    "Getting Started",
    "Foundation",
    "Components",
    "Utilities"
  ];

  document.querySelectorAll(".sidebar-title").forEach((title, index) => {
    if (titles[index]) {
      title.textContent = titles[index];
    }
  });

  const translations = {
    introduction: "Introduction",
    installation: "Installation",
    colors: "Colors",
    typography: "Typography",
    spacing: "Spacing",
    layout: "Layout",
    buttons: "Buttons",
    cards: "Cards",
    inputs: "Inputs",
    alerts: "Alerts",
    modal: "Modal",
    flex: "Flex",
    grid: "Grid",
    position: "Position",
    effects: "Effects"
  };

  Object.entries(translations).forEach(([page, text]) => {
    const link = document.querySelector(
      `.sidebar a[data-page="${page}"]`
    );

    if (link) {
      link.textContent = text;
    }
  });

  localStorage.setItem("meowsab-language", "en");
}


/* Load Language */

const savedLanguage = localStorage.getItem("meowsab-language");

if (savedLanguage === "ar") {
  setArabic();
}


/* Search */

const searchButton = document.getElementById("searchButton");
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");
const searchBox = document.querySelector(".search-box");

let searchResults;


function createSearchResults() {
  searchResults = document.createElement("div");

  searchResults.className = "search-results";

  searchBox.appendChild(searchResults);
}

createSearchResults();


function openSearch() {
  searchOverlay.classList.add("active");

  setTimeout(() => {
    searchInput?.focus();
  }, 100);
}


function closeSearchMenu() {
  searchOverlay.classList.remove("active");

  if (searchInput) {
    searchInput.value = "";
  }

  if (searchResults) {
    searchResults.innerHTML = "";
  }
}


searchButton?.addEventListener("click", openSearch);
closeSearch?.addEventListener("click", closeSearchMenu);


searchOverlay?.addEventListener("click", event => {
  if (event.target === searchOverlay) {
    closeSearchMenu();
  }
});


/* Search Filter */

const searchablePages = [
  {
    id: "home",
    name: "Home",
    type: "Page"
  },
  {
    id: "docs",
    name: "Docs",
    type: "Documentation"
  },
  {
    id: "components",
    name: "Components",
    type: "UI"
  },
  {
    id: "utilities",
    name: "Utilities",
    type: "Tools"
  },
  {
    id: "playground",
    name: "Playground",
    type: "Interactive"
  },
  {
    id: "introduction",
    name: "Introduction",
    type: "Getting Started"
  },
  {
    id: "installation",
    name: "Installation",
    type: "Getting Started"
  },
  {
    id: "colors",
    name: "Colors",
    type: "Foundation"
  },
  {
    id: "typography",
    name: "Typography",
    type: "Foundation"
  },
  {
    id: "spacing",
    name: "Spacing",
    type: "Foundation"
  },
  {
    id: "layout",
    name: "Layout",
    type: "Foundation"
  },
  {
    id: "buttons",
    name: "Buttons",
    type: "Components"
  },
  {
    id: "cards",
    name: "Cards",
    type: "Components"
  },
  {
    id: "inputs",
    name: "Inputs",
    type: "Components"
  },
  {
    id: "alerts",
    name: "Alerts",
    type: "Components"
  },
  {
    id: "modal",
    name: "Modal",
    type: "Components"
  },
  {
    id: "flex",
    name: "Flex",
    type: "Utilities"
  },
  {
    id: "grid",
    name: "Grid",
    type: "Utilities"
  },
  {
    id: "position",
    name: "Position",
    type: "Utilities"
  },
  {
    id: "effects",
    name: "Effects",
    type: "Utilities"
  }
];


searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  searchResults.innerHTML = "";

  if (!query) return;

  const results = searchablePages.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  if (!results.length) {
    searchResults.innerHTML = `
      <div class="search-result">
        <span>No results found</span>
        <small>Try another search</small>
      </div>
    `;

    return;
  }

  results.forEach(item => {
    const result = document.createElement("button");

    result.className = "search-result";

    result.innerHTML = `
      <span>${item.name}</span>
      <small>${item.type}</small>
    `;

    result.addEventListener("click", () => {
      showPage(item.id);
      closeSearchMenu();
    });

    searchResults.appendChild(result);
  });
});


/* Keyboard */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeSearchMenu();
    closeSidebar();
    closeMenus();
  }

  if (
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k"
  ) {
    event.preventDefault();
    openSearch();
  }
});


/* Profile */

const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");

profileButton?.addEventListener("click", event => {
  event.stopPropagation();

  profileMenu.classList.toggle("active");
  languageMenu?.classList.remove("active");
});


/* Outside Click */

document.addEventListener("click", event => {
  if (
    profileMenu &&
    !profileMenu.contains(event.target) &&
    !profileButton.contains(event.target)
  ) {
    profileMenu.classList.remove("active");
  }

  if (
    languageMenu &&
    !languageMenu.contains(event.target) &&
    !languageButton.contains(event.target)
  ) {
    languageMenu.classList.remove("active");
  }
});


/* Menus */

function closeMenus() {
  profileMenu?.classList.remove("active");
  languageMenu?.classList.remove("active");
}


/* Playground */

const playgroundEditor = document.querySelector(
  ".editor textarea"
);

const playgroundPreview = document.querySelector(
  ".preview-content"
);


function updatePlayground() {
  if (!playgroundEditor || !playgroundPreview) return;

  playgroundPreview.innerHTML = playgroundEditor.value;
}


playgroundEditor?.addEventListener(
  "input",
  updatePlayground
);

updatePlayground();


/* Start */

showPage("home");
