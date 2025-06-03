# Client_Side_Validations_for_apex
// apex-validations.js

// Utility to show an inline error on a page item
function showItemError(itemName, message) {
  apex.message.clearErrors();
  apex.message.showErrors([
    {
      type: "error",
      location: "inline",
      pageItem: itemName,
      message: message,
      unsafe: false,
    },
  ]);
}

// 1. Validate Required Field
function validateRequiredField(itemName) {
  var val = $v(itemName);
  if (!val || val.trim() === "") {
    showItemError(itemName, "This field is required.");
    return false;
  }
  return true;
}

// 2. Validate Email Format
function validateEmail(itemName) {
  var val = $v(itemName);
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(val)) {
    showItemError(itemName, "Please enter a valid email address.");
    return false;
  }
  return true;
}

// 3. Validate Numeric Only
function validateNumeric(itemName) {
  var val = $v(itemName);
  if (!/^\d+$/.test(val)) {
    showItemError(itemName, "Only numeric values allowed.");
    return false;README
  }
  return true;
}

// 4. Validate Decimal (max 2 decimal places)
function validateDecimal(itemName) {
  var val = $v(itemName);
  if (!/^\d+(\.\d{1,2})?$/.test(val)) {
    showItemError(itemName, "Only decimal values up to 2 digits allowed.");
    return false;
  }
  return true;
}

// 5. Validate No Special Characters
function validateNoSpecialCharacters(itemName) {
  var val = $v(itemName);
  if (/[^a-zA-Z0-9_]/.test(val)) {
    showItemError(itemName, "Special characters are not allowed.");
    return false;
  }
  return true;
}

// 6. Validate Length (min and max)
function validateLength(itemName, min, max) {
  var val = $v(itemName);
  if (val.length < min || val.length > max) {
    showItemError(
      itemName,
      `Length must be between ${min} and ${max} characters.`
    );
    return false;
  }
  return true;
}

// 7. Validate Matching Fields (e.g., password and confirm)
function validateMatchFields(item1, item2, errorMsg) {
  if ($v(item1) !== $v(item2)) {
    showItemError(item2, errorMsg || "Fields do not match.");
    return false;
  }
  return true;
}

// 8. Validate Checkbox Checked
function validateCheckboxChecked(itemName) {
  if (!$x(itemName).checked) {
    showItemError(itemName, "You must check this box.");
    return false;
  }
  return true;
}

// 9. Validate Radio Button Selected
function validateRadioSelected(itemName) {
  if (!$v(itemName)) {
    showItemError(itemName, "Please select an option.");
    return false;
  }
  return true;
}

// 10. Validate Select List Not Default
function validateSelectNotDefault(itemName, defaultValue = "") {
  if ($v(itemName) === defaultValue) {
    showItemError(itemName, "Please select a valid option.");
    return false;
  }
  return true;
}

// 11. Validate Date Range (start before end)
function validateDateRange(startItem, endItem) {
  var start = new Date($v(startItem));
  var end = new Date($v(endItem));
  if (start > end) {
    showItemError(endItem, "End date must be after start date.");
    return false;
  }
  return true;
}

// 12. Validate File Name Alphanumeric
function validateFileNameAlphanumeric(itemName) {
  var fileInput = $x(itemName);
  if (!fileInput || !fileInput.value) {
    showItemError(itemName, "Please upload a file.");
    return false;
  }
  var fileName = fileInput.value.split("\\").pop();
  var valid = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(fileName);
  if (!valid) {
    showItemError(itemName, "Filename must be alphanumeric.");
    fileInput.value = "";
    return false;
  }
  return true;
}

// 13. Validate File Extension
function validateFileExtension(
  itemName,
  allowedExtensions = ["jpg", "png", "pdf"]
) {
  var fileInput = $x(itemName);
  if (!fileInput || !fileInput.value) {
    showItemError(itemName, "Please upload a file.");
    return false;
  }
  var fileName = fileInput.value.split("\\").pop();
  var ext = fileName.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    showItemError(itemName, "Invalid file type.");
    fileInput.value = "";
    return false;
  }
  return true;
}

// 14. Validate Password Strength
function validatePasswordStrength(itemName) {
  var val = $v(itemName);
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(val)) {
    showItemError(
      itemName,
      "Password must include upper, lower, number, special char, and be 8+ chars."
    );
    return false;
  }
  return true;
}

// 15. Validate Greater Than Zero
function validateGreaterThanZero(itemName) {
  var val = parseFloat($v(itemName));
  if (isNaN(val) || val <= 0) {
    showItemError(itemName, "Value must be greater than zero.");
    return false;
  }
  return true;
}

// 16. Validate No Leading or Trailing Whitespace
function validateNoWhitespaceEdges(itemName) {
  var val = $v(itemName);
  if (val !== val.trim()) {
    showItemError(itemName, "Leading or trailing spaces are not allowed.");
    return false;
  }
  return true;
}

// 17. Validate At Least One Checkbox in Group Checked
function validateGroupCheckboxChecked(groupName) {
  if (!$(`input[name="${groupName}"]:checked`).length) {
    apex.message.clearErrors();
    apex.message.showPageErrors("Please select at least one option.");
    return false;
  }
  return true;
}

----------------------------------------------------------------------------------------------------------------------------
wysiwyg:
// validations/wysiwyg_editor.js
function validateWysiwygNotEmpty(itemName, messageText) {
  var editorContent = $v(itemName);
  var plainText = $('<div>').html(editorContent).text().trim();
 
  if (!plainText) {
    apex.message.clearErrors();
    apex.message.showErrors([{
      type: "error",
      location: "inline",
      pageItem: itemName,
      message: messageText || "Content cannot be empty.",
      unsafe: false
    }]);
    apex.event.gCancelEvent = true;
    return false;
  }
 
  return true;
}
 
// Example usage:
// validateWysiwygNotEmpty('P1_EDITOR');
---------------------------------------------------------------------------------------------------------------------------------

// Oracle APEX Client-Side Validations with Topics

---

// ## 🔹 1. Text Field Should Not Be Empty
if ($v('P1_NAME').trim() === '') {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_NAME",
    message: "This field cannot be empty.",
    unsafe: false
  }]);
}


// ## 🔹 2. File Upload Should Only Allow Letters/Numbers in Name
var val = $v('P1_FILE');
if (!/^[a-zA-Z0-9_.-]+$/.test(val)) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_FILE",
    message: "Filename must only contain letters, numbers, underscores, or hyphens.",
    unsafe: false
  }]);
}


// ## 🔹 3. Dropdown / Radio / Checkbox Must Be Selected
if (!$v('P1_OPTION')) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_OPTION",
    message: "Please make a selection.",
    unsafe: false
  }]);
}


// ## 🔹 4. Restrict Special Characters in Text Input
var val = $v('P1_USERNAME');
if (/[^a-zA-Z0-9_]/.test(val)) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_USERNAME",
    message: "No special characters allowed.",
    unsafe: false
  }]);
}


// ## 🔹 5. No Leading or Trailing Spaces
var val = $v('P1_TEXT');
if (val !== val.trim()) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_TEXT",
    message: "No leading or trailing spaces allowed.",
    unsafe: false
  }]);
}


// ## 🔹 6. Validate Decimal Number (Max 2 Decimal Places)
var val = $v('P1_PRICE');
if (!/^\d+(\.\d{1,2})?$/.test(val)) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_PRICE",
    message: "Only 2 decimal places allowed.",
    unsafe: false
  }]);
}


// ## 🔹 7. Validate File Selected
if ($v('P1_FILE') === '') {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_FILE",
    message: "Please upload a file.",
    unsafe: false
  }]);
}



// ## 🔹 8. Restrict File Extensions

var val = $v('P1_FILE');
if (!/\.(jpg|jpeg|png|pdf)$/i.test(val)) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_FILE",
    message: "Only JPG, PNG, or PDF files allowed.",
    unsafe: false
  }]);
}


// ## 🔹 9. Validate Textarea Length
var val = $v('P1_DESCRIPTION');
if (val.length > 500) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_DESCRIPTION",
    message: "Maximum 500 characters allowed.",
    unsafe: false
  }]);
}

// ## 🔹 10. Ensure Two Select Lists Are Not the Same
if ($v('P1_FROM') === $v('P1_TO')) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_FROM",
    message: "From and To values must be different.",
    unsafe: false
  }]);
}

// ## 🔹 11. Validate Date Range
var start = new Date($v('P1_START_DATE'));
var end = new Date($v('P1_END_DATE'));
if (start > end) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_END_DATE",
    message: "End date must be after start date.",
    unsafe: false
  }]);
}

// ## 🔹 12. At Least One Checkbox Checked
if (!$('input[name="f01"]:checked').length) {
  apex.message.showPageErrors("Please select at least one option.");
}

// ## 🔹 13. Password Complexity
var val = $v('P1_PASSWORD');
if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(val)) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_PASSWORD",
    message: "Password must be at least 8 characters with upper, lower, digit and special character.",
    unsafe: false
  }]);
}

// ## 🔹 14. Numeric Field Greater Than Zero
var val = parseFloat($v('P1_QUANTITY'));
if (val <= 0) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_QUANTITY",
    message: "Value must be greater than zero.",
    unsafe: false
  }]);
}

// ## 🔹 15. Checkbox Must Be Checked for Terms
if (!$v('P1_TERMS')) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_TERMS",
    message: "You must accept the Terms and Conditions.",
    unsafe: false
  }]);
}

// ## 🔹 16. Disable Submit Button Unless Valid
Use a Dynamic Action with conditions on required fields, and JavaScript:
if ($v('P1_NAME') && $v('P1_EMAIL')) {
  apex.item('P1_SUBMIT').enable();
} else {
  apex.item('P1_SUBMIT').disable();
}

// ## 🔹 17. Prevent Copy/Paste in Field
$("#P1_PASSWORD").on('copy paste', function(e) {
  e.preventDefault();
  apex.message.showPageErrors("Copy-paste not allowed.");
});

// ## 🔹 18. Force Uppercase Input
$('#P1_NAME').on('input', function() {
  this.value = this.value.toUpperCase();
});

// ## 🔹 19. Prevent SQL/Script Injection (Basic)
var val = $v('P1_COMMENT');
if (/(;|--|\b(SELECT|DROP|INSERT|DELETE|UPDATE)\b)/i.test(val)) {
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: "P1_COMMENT",
    message: "Input contains invalid SQL/script characters.",
    unsafe: false
  }]);
}

// ## 🔹 20. Reusable Error Function
function showItemError(item, msg) {
  apex.message.clearErrors();
  apex.message.showErrors([{
    type: "error",
    location: "inline",
    pageItem: item,
    message: msg,
    unsafe: false
  }]);
}

// Usage:
if ($v('P1_FIELD').trim() === '') {
  showItemError('P1_FIELD', 'This field cannot be empty');
}
