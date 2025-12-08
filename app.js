// DOM Elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const toggleSwitches = document.querySelectorAll('.switch input');
const modeToggles = document.querySelectorAll('.mode-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');

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
// Navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');
    showPage(pageId);
  });
});

// Toggle switches
toggleSwitches.forEach(switchEl => {
  switchEl.addEventListener('change', (e) => {
    const deviceId = e.target.id.replace('-switch', '');
    toggleDevice(deviceId, e.target.checked);
  });
});

// Mode toggles
modeToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const mode = toggle.getAttribute('data-mode');
    const isActive = !toggle.classList.contains('active');
    toggleMode(mode, isActive);
  });
});

// Mobile menu button
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
    sidebar.classList.remove('active');
  }
});

// Initialize
showPage('dashboard');

// Responsive adjustments
function handleResize() {
  if (window.innerWidth >= 1024) {
    sidebar.classList.remove('active');
  }
}

window.addEventListener('resize', handleResize);
handleResize();
