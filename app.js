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
function setupNavigation() {
  // Add click event to all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      if (pageId) {
        showPage(pageId);
      }
    });
  });

  // Toggle switches
  document.querySelectorAll('.switch input').forEach(switchEl => {
    switchEl.addEventListener('change', function(e) {
      const deviceId = this.id.replace('-switch', '');
      toggleDevice(deviceId, this.checked);
    });
  });

  // Mode toggles
  document.querySelectorAll('.mode-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const mode = this.getAttribute('data-mode');
      const isActive = !this.classList.contains('active');
      toggleMode(mode, isActive);
    });
  });

  // Mobile menu button
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelector('.sidebar').classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });

  // Handle page load with hash
  const hash = window.location.hash.substring(1);
  if (hash) {
    showPage(hash);
  } else {
    showPage('dashboard');
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupNavigation();
  
  // Responsive adjustments
  function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth >= 1024) {
      sidebar.classList.remove('active');
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize();
});
