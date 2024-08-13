document.addEventListener('turbo:load', () => {
    const flashMessages = document.querySelectorAll('.flash-message');
  
    flashMessages.forEach((message) => {
  
      setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
          message.style.display = 'none';
        }, 300); 
      }, 3000);
  
      const closeButton = message.querySelector('button[aria-label="Close"]');
      closeButton.addEventListener('click', () => {
        message.classList.remove('show');
        setTimeout(() => {
          message.style.display = 'none';
        }, 300);
      });
    });
  });
  