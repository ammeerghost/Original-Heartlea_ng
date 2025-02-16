      // Get all detail buttons
      const detailButtons = document.querySelectorAll('.details-btn');

      detailButtons.forEach(button => {
          button.addEventListener('click', function() {
              const detailsDiv = this.nextElementSibling;
              detailsDiv.style.display = detailsDiv.style.display === 'block' ? 'none' : 'block';
          });
      });