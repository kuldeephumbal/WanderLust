// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'
  
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')
  
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
  
      form.classList.add('was-validated')
    }, false)
  })
})();


//Password Hide/Show Functionality
document.addEventListener('DOMContentLoaded', function() {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  
  togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle eye icon
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
  });
});

//Stars Rating
document.addEventListener('DOMContentLoaded', () => {
  // Handle star rating for the review form
  const starRatingForm = document.querySelector('.star-rating');
  const ratingInput = document.querySelector('#rating');

  starRatingForm.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-star')) {
      const index = parseInt(e.target.getAttribute('data-index'), 10) + 1;
      ratingInput.value = index;

      starRatingForm.querySelectorAll('.fa-star').forEach((star, i) => {
        if (i < index) {
          star.classList.add('checked');
        } else {
          star.classList.remove('checked');
        }
      });
    }
  });
});