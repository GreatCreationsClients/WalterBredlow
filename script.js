import { portfolioData } from './config.js';
import { createPortfolioItem, updateModalContent } from './portfolio-components.js';

document.addEventListener('DOMContentLoaded', () => {
  // Modal functionality
  const modal = document.getElementById('portfolioModal');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  let currentSection = '';
  let currentIndex = 0;
  
  // Initialize portfolio sections
  initializePortfolioSections();
  
  // Open modal when clicking on portfolio items
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      const index = parseInt(item.dataset.index);
      openModal(section, index);
    });
  });
  
  // Close modal when clicking on close button or outside the modal
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Navigate through modal items
  prevBtn.addEventListener('click', showPrevItem);
  nextBtn.addEventListener('click', showNextItem);
  
  // Support keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'flex') return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      showPrevItem();
    } else if (e.key === 'ArrowRight') {
      showNextItem();
    }
  });
  
  // Toggle employment history items
  const toggleEmploymentBtn = document.getElementById('toggle-employment');
  const toggleItems = document.querySelectorAll('.toggle-item');
  
  toggleEmploymentBtn.addEventListener('click', () => {
    toggleItems.forEach(item => {
      item.classList.toggle('hidden');
    });
    
    toggleEmploymentBtn.textContent = 
      toggleEmploymentBtn.textContent === 'Show More' ? 'Show Less' : 'Show More';
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });
  
  // Helper functions for modal
  function openModal(section, index) {
    currentSection = section;
    currentIndex = index;
    updateModalContent(portfolioData[currentSection][currentIndex]);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Update navigation button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === portfolioData[currentSection].length - 1;
  }
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  function showPrevItem() {
    if (currentIndex > 0) {
      currentIndex--;
      updateModalContent(portfolioData[currentSection][currentIndex]);
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = false;
    }
  }
  
  function showNextItem() {
    if (currentIndex < portfolioData[currentSection].length - 1) {
      currentIndex++;
      updateModalContent(portfolioData[currentSection][currentIndex]);
      prevBtn.disabled = false;
      nextBtn.disabled = currentIndex === portfolioData[currentSection].length - 1;
    }
  }
  
  // Initialize portfolio sections dynamically
  function initializePortfolioSections() {
    // Populate each portfolio section
    Object.keys(portfolioData).forEach(section => {
      const sectionGrid = document.querySelector(`#${section} .portfolio-grid`);
      if (sectionGrid) {
        sectionGrid.innerHTML = ''; // Clear existing content
        
        portfolioData[section].forEach((item, index) => {
          const portfolioItem = createPortfolioItem(section, index, item.title, item.image);
          sectionGrid.appendChild(portfolioItem);
        });
      }
    });
  }
  
  // Add active class to current nav item 
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('.portfolio-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Validate inputs
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would normally send the form data to a server
      // For this demo, we'll just show a success message
      // In a real implementation, you would send an email to waloiddd@gmail.com
      alert(`Thank you for your message, ${nameInput.value}! We'll get back to you soon.`);
      
      // Clear the form
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    });
  }
});