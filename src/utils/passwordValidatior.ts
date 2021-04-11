var passwordValidator = require("password-validator");

// Create a schema
var schema = new passwordValidator();

// Add properties to it
export const passwordValidation = schema
  .is()
  .min(4) // Minimum length 8
  .is()
  .max(25) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces(); // Should not have spaces
