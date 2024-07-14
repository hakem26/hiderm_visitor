// formHandler.js

// Function to reset form fields
function resetForm(formId) {
    document.getElementById(formId).reset();
}

// Function to validate form input fields
function validateForm(formId) {
    const form = document.getElementById(formId);
    return form.checkValidity();
}

// Function to handle form submission
function handleFormSubmit(formId, callback) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm(formId)) {
            callback();
        } else {
            alert('لطفاً تمامی فیلدهای ضروری را پر کنید.');
        }
    });
}

// Export functions for use in other modules if needed
export { resetForm, validateForm, handleFormSubmit };
