const admintoggal = document.querySelector('#admintoggal');
  const adminpassword = document.querySelector('#admin_password');

  admintoggal.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = adminpassword.getAttribute('type') === 'password' ? 'adminpassword' : 'password';
    adminpassword.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});