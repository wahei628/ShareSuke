document.addEventListener('turbo:load', function() {
  document.querySelectorAll('.select-user').forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.preventDefault();
      var userId = this.dataset.userId;
      var userName = this.dataset.userName;
      document.getElementById('user_id_field').value = userId;

      document.querySelectorAll('.arrow-icon').forEach(function(arrow) {
        arrow.remove();
      });

      var arrow = document.createElement('i');
      arrow.classList.add('fa-solid', 'fa-caret-down', 'arrow-icon', 'absolute');

      var parent = this.parentNode;
      parent.appendChild(arrow);

      arrow.style.color = '#5B5B5B';
      arrow.style.top = '-18px';
      parent.style.display = 'grid';
      parent.style.placeItems = 'center';
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
          popup.style.borderRadius = '15px';
          const confirmButton = popup.querySelector('.swal2-confirm');
          confirmButton.style.borderRadius = '10px';
        }
      });
    } else {
      setTimeout(function() {
        event.target.reset();
      }, 100);
    }
  });
});