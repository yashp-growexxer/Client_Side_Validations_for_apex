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
