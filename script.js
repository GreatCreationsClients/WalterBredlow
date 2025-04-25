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
  
  // Toggle education section
  const toggleEducationBtn = document.getElementById('toggle-education');
  const educationExtra = document.getElementById('education-extra');
  if (toggleEducationBtn && educationExtra) {
    toggleEducationBtn.addEventListener('click', () => {
      if (educationExtra.style.display === 'none' || educationExtra.style.display === '') {
        educationExtra.style.display = 'block';
        toggleEducationBtn.textContent = 'Show Less';
      } else {
        educationExtra.style.display = 'none';
        toggleEducationBtn.textContent = 'Show More';
      }
    });
  }
  
  // Handle form submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const toast = document.getElementById('toast');
  const toastMessage = document.querySelector('.toast-message');
  const toastClose = document.querySelector('.toast-close');
  
  // Function to show toast notifications
  function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = 'toast show';
    
    if (type !== 'success') {
      toast.classList.add(type);
    }
    
    // Automatically hide toast after 5 seconds
    setTimeout(() => {
      hideToast();
    }, 5000);
  }
  
  // Function to hide toast
  function hideToast() {
    toast.className = 'toast';
  }
  
  // Add event listener to toast close button
  if (toastClose) {
    toastClose.addEventListener('click', hideToast);
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      // Check if all required fields are filled
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        event.preventDefault();
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.className = 'form-status error';
        return;
      }
      
      // Show loading status
      formStatus.textContent = 'Sending message...';
      formStatus.className = 'form-status loading';
      
      // Set a timeout to show the success message after form submission
      // The form actually submits to the hidden iframe
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        showToast('Message sent successfully!');
        contactForm.reset();
      }, 1500);
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
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
});