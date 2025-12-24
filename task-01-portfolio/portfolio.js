// TYPING ANIMATION FOR NAME
function typeWriter() {
    const textToType = "Bhavesh Chandrakant Mundye";
    const typingElement = document.getElementById('typing-text');
    let charIndex = 0;
    
    typingElement.textContent = '';
    
    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 500);
}


// SMOOTH SCROLLING
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
           
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// SCROLL TO TOP BUTTON

function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Show button when user scrolls down 300px
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// FORM VALIDATION

function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('form-success');
    

    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    //Validates email field
     
    function validateEmail() {
        const email = emailInput.value.trim();
        //email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    //Validates message field
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageError.textContent = 'Message is required';
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }
    
    // Real-time validation on input blur (when user leaves field)
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();
        
        // Clear previous success message
        successMessage.textContent = '';
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // Check if all validations passed
        if (isNameValid && isEmailValid && isMessageValid) {
           
            successMessage.textContent = 'Message sent successfully! (Demo mode - no actual submission)';
            
            // Reset form after 2 seconds
            setTimeout(function() {
                form.reset();
                successMessage.textContent = '';
            }, 3000);
        }
    });
}


// INTERSECTION OBSERVER FOR ANIMATIONS

function initScrollAnimations() {
    // Options for the observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };
    
    // Create the observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // If element is in viewport
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.project-card, .skill-badge, .education-card');
    
    // Set initial styles and observe each element
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// NAVBAR SCROLL EFFECT

function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
}


// INITIALIZE ALL FUNCTIONS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    typeWriter();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
    
    console.log('Portfolio initialized successfully! 🚀');
});

