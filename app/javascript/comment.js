document.addEventListener('turbo:load', function() {
  document.querySelectorAll('.select-user').forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.preventDefault();
      var userId = this.dataset.userId;
      var userName = this.dataset.userName;
      document.getElementById('user_id_field').value = userId;

      // Show tooltip with user name
      var tooltip = document.getElementById('user_selected_tooltip');
      tooltip.textContent = userName + 'を選択中';
      tooltip.classList.remove('hidden');
    });
  });

  document.getElementById('comment_form').addEventListener('submit', function(event) {
    var userId = document.getElementById('user_id_field').value;
    if (!userId) {
      event.preventDefault();
      Swal.fire({
        icon: 'error',
        title: "ユーザ名が選択されていません",
        color: "#33333",
        timer: 1200,
        timerProgressBar: true,
        willOpen: (popup) => {
          const title = popup.querySelector('.swal2-title');
          popup.style.borderRadius = '15px';
          const confirmButton = popup.querySelector('.swal2-confirm');
          confirmButton.style.borderRadius = '10px';
        }
      });
    } else {
      // Hide tooltip after comment is submitted
      var tooltip = document.getElementById('user_selected_tooltip');
      tooltip.textContent = userName + 'を選択中';
      tooltip.classList.remove('hidden');
    }
  });
});