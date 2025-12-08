console.log('app.js loaded successfully!');

// DOM Elements
let pages = [];
let navLinks = [];
let toggleSwitches = [];
let modeToggles = [];
let mobileMenuBtn = null;
let sidebar = null;

// Initialize DOM elements
function initElements() {
  pages = document.querySelectorAll('.page');
  navLinks = document.querySelectorAll('.nav-link');
  toggleSwitches = document.querySelectorAll('.switch input');
  modeToggles = document.querySelectorAll('.mode-toggle');
  mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  sidebar = document.querySelector('.sidebar');
}

// Show page function
function showPage(pageId) {
  // Hide all pages
  pages.forEach(page => page.classList.remove('active'));
  
  // Show the selected page
  const activePage = document.getElementById(`page-${pageId}`);
  if (activePage) {
    activePage.classList.add('active');
  }
  
  // Update active nav link
  navLinks.forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Update page title
  const pageTitle = document.getElementById('page-title');
  if (pageTitle) {
    pageTitle.textContent = document.querySelector(`.nav-link[data-page="${pageId}"]`).textContent;
  }
  
  // Close mobile menu if open
  if (window.innerWidth < 1024) {
    sidebar.classList.remove('active');
  }
}

// Toggle device on/off
function toggleDevice(deviceId, isOn) {
  const device = document.getElementById(deviceId);
  if (device) {
    if (isOn) {
      device.classList.add('on');
    } else {
      device.classList.remove('on');
    }
  }
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
