// Contact form handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    emailjs.init('m1YqSqnV7dci_z3jW');
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Store original button text
            const originalButtonText = submitButton.innerHTML;
            
            // Reset previous errors and success messages
            document.querySelectorAll('.form-error, .form-success').forEach(el => {
                el.remove();
            });
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Change button to show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Get current time for the template
            const now = new Date();
            const formattedTime = now.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Prepare template parameters for your HTML template
            const templateParams = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                time: formattedTime,
                reply_to: emailInput.value.trim()
            };
            
            // Send email using EmailJS
            emailjs.send('service_4zap8na', 'template_l1meg8s', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    showSuccess(contactForm, 'Thank you for your message! I\'ll get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showError(contactForm, 'Sorry, there was an error sending your message. Please try again later or contact me directly at ahsan.naveed1999@gmail.com');
                })
                .finally(function() {
                    // Restore button to original state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        });
        
        function showError(input, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = message;
            errorDiv.style.cssText = 'display: block; color: var(--error); margin-top: 0.5rem; font-size: 0.875rem;';
            
            input.parentNode.appendChild(errorDiv);
            
            // Remove error after 5 seconds
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 5000);
        }
        
        function showSuccess(form, message) {
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.textContent = message;
            successDiv.style.cssText = 'display: block; color: var(--success); margin-bottom: 1.5rem; padding: 1rem; background-color: rgba(76, 175, 80, 0.1); border-radius: 0.5rem; border-left: 4px solid var(--success);';
            
            form.prepend(successDiv);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 5000);
        }
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }
});