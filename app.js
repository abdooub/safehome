console.log('app.js loaded successfully!');

// DOM Elements
let pages = [];
let navLinks = [];
let toggleSwitches = [];
let modeToggles = [];
let mobileMenuBtn = null;
let sidebar = null;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initElements();
  setupEventListeners();
  showPage('dashboard');
});

// Initialize DOM elements
function initElements() {
  pages = document.querySelectorAll('.page');
  navLinks = document.querySelectorAll('.nav-link');
  toggleSwitches = document.querySelectorAll('.switch input');
  modeToggles = document.querySelectorAll('.mode-toggle');
  mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  sidebar = document.querySelector('.sidebar');
}

// Set up event listeners
function setupEventListeners() {
  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      if (pageId) {
        showPage(pageId);
      }
    });
  });

  // Mobile menu button
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
      sidebar.classList.remove('active');
    }
  });

  // Toggle switches
  toggleSwitches.forEach(switchEl => {
    switchEl.addEventListener('change', handleSwitchChange);
  });

  // Mode toggles
  modeToggles.forEach(toggle => {
    toggle.addEventListener('change', handleModeToggle);
  });
}

// Initialize DOM elements
function initElements() {
  pages = document.querySelectorAll('.page');
  navLinks = document.querySelectorAll('.nav-link');
  toggleSwitches = document.querySelectorAll('.switch input');
  modeToggles = document.querySelectorAll('.mode-toggle');
// Show page function
function showPage(pageId) {
  try {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    pages.forEach(page => {
      page.style.display = 'none';
      page.classList.remove('active');
    });
    
    // Show the selected page
    const activePage = document.getElementById(`page-${pageId}`);
    if (activePage) {
      activePage.style.display = 'block';
      activePage.classList.add('active');
      console.log('Page shown:', pageId);
    } else {
      console.error('Page not found:', `page-${pageId}`);
      // Fallback to dashboard if page not found
      if (pageId !== 'dashboard') {
        showPage('dashboard');
        return;
      }
    }
    
    // Update active nav link
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Update URL hash
    window.location.hash = pageId;
    
    // Close mobile menu if open
    if (window.innerWidth < 1024 && sidebar) {
      sidebar.classList.remove('active');
    }
  } catch (error) {
    console.error('Error in showPage:', error);
  }
}

// Toggle device on/off
function toggleDevice(deviceId, isOn) {
  const device = document.getElementById(deviceId);
  if (device) {
    if (isOn) {
      device.classList.add('on');
      device.setAttribute('aria-checked', 'true');
    } else {
      device.classList.remove('on');
      device.setAttribute('aria-checked', 'false');
    }
    // Here you would typically send a request to your backend
    console.log(`Device ${deviceId} is now ${isOn ? 'on' : 'off'}`);
  }
}

// Handle switch changes
function handleSwitchChange(e) {
  const switchEl = e.target;
  const deviceId = switchEl.id.replace('-switch', '');
  toggleDevice(deviceId, switchEl.checked);
}

// Handle mode toggle changes
function handleModeToggle(e) {
  const modeToggle = e.target;
  const mode = modeToggle.getAttribute('data-mode');
  const isActive = modeToggle.checked;
  
  // Update UI
  if (isActive) {
    document.body.classList.add(`mode-${mode}`);
  } else {
    document.body.classList.remove(`mode-${mode}`);
  }
  
  // Here you would typically send a request to your backend
  console.log(`Mode ${mode} is now ${isActive ? 'active' : 'inactive'}`);
}

// Toggle mode (Night/Away)
function toggleMode(mode, isActive) {
  const modeElement = document.getElementById(`mode-${mode}`);
  if (modeElement) {
    if (isActive) {
      modeElement.classList.add('active');
    } else {
      modeElement.classList.remove('active');
    }
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  sidebar.classList.toggle('active');
}

// Event Listeners
function setupEventListeners() {
  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Mobile menu button
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when clicking outside
  document.addEventListener('click', handleClickOutside);

  // Handle window resize
  window.addEventListener('resize', handleResize);

  // Toggle switches
  toggleSwitches.forEach(switchEl => {
    switchEl.addEventListener('change', handleSwitchChange);
  });

  // Mode toggles
  modeToggles.forEach(toggle => {
    toggle.addEventListener('click', handleModeToggle);
  });
}

// Navigation click handler
function handleNavClick(e) {
  e.preventDefault();
  const pageId = this.getAttribute('data-page');
  if (pageId) {
    showPage(pageId);
    // Close mobile menu after navigation
    if (window.innerWidth < 1024) {
      sidebar.classList.remove('active');
    }
  }
}

// Handle switch change
function handleSwitchChange(e) {
  const deviceId = this.id.replace('-switch', '');
  toggleDevice(deviceId, this.checked);
}

// Handle mode toggle
function handleModeToggle(e) {
  e.preventDefault();
  const mode = this.getAttribute('data-mode');
  const isActive = !this.classList.contains('active');
  toggleMode(mode, isActive);
}
}

// Handle window resize
function handleResize() {
  if (window.innerWidth >= 1024) {
    sidebar.classList.remove('active');
  }
}

// Handle clicks outside of sidebar
function handleClickOutside(e) {
  if (!sidebar.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
    sidebar.classList.remove('active');
  }
}

// Toggle mobile menu
function toggleMobileMenu(e) {
  if (e) e.stopPropagation();
  sidebar.classList.toggle('active');
}

// Handle switch change
function handleSwitchChange(e) {
  const deviceId = this.id.replace('-switch', '');
  toggleDevice(deviceId, this.checked);
}

// Handle mode toggle
function handleModeToggle(e) {
  e.preventDefault();
  const mode = this.getAttribute('data-mode');
  const isActive = !this.classList.contains('active');
  toggleMode(mode, isActive);
}

// Initialize the application
function init() {
  try {
    initElements();
    setupEventListeners();
    handleResize();
    
    // Show dashboard by default
    const hash = window.location.hash.substring(1);
    showPage(hash || 'dashboard');
    
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
