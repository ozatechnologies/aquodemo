// form-handler.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('form[id^="contactForm"]');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                if (result.success) {
                    showSuccessMessage(form, submitBtn, originalBtnText);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showErrorMessage(form, submitBtn, originalBtnText);
                console.error('Error:', error);
            }
        });
    });

    function showSuccessMessage(form, submitBtn, originalBtnText) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        form.style.display = 'none';
        form.reset();
        
        setTimeout(() => {
            successMessage.remove();
            form.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, 5000);
    }

    function showErrorMessage(form, submitBtn, originalBtnText) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'There was an error sending your message. Please try again.';
        form.parentNode.insertBefore(errorMessage, form.nextSibling);
        
        setTimeout(() => {
            errorMessage.remove();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, 5000);
    }
});