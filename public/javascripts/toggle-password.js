function showPassword() {
    const passwordInputs = document.querySelectorAll('.password-input');
    passwordInputs.forEach(input => {
        input.type = input.type === 'password' ? 'text' : 'password'
    });
}