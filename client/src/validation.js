export function validateName(name) {
  // Validate the name. It should contain only alphabets and spaces.
  return /^[a-zA-Z\s]+$/.test(name);
}

export function validateEmail(email) {
  // Validate the email address. It should match a typical email pattern.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  // Validate the password. It should contain at least 8 characters, including at least one uppercase letter,
  // one lowercase letter, one number, and one special character.
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
    password
  );
}

export function validatePasswordAgain(passwordAgain) {
  // Validate that the passwordAgain field is not empty
  return passwordAgain.trim() !== '';
}
