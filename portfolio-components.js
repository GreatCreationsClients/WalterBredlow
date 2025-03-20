// Component generator for portfolio items
export function createPortfolioItem(section, index, title, imagePath) {
  const item = document.createElement('div');
  item.className = 'portfolio-item';
  item.dataset.section = section;
  item.dataset.index = index;
  
  item.innerHTML = `
    <div class="portfolio-thumbnail">
      <img src="${imagePath}" alt="${title}">
    </div>
    <h3>${title}</h3>
  `;
  
  return item;
}

// Component generator for modal content
export function updateModalContent(data) {
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  
  modalTitle.textContent = data.title;
  modalImage.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
  modalDescription.innerHTML = data.description;
}

