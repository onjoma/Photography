// Update copyright year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;
});

// Function to initialize testimonials
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    console.log('Found testimonials:', testimonials.length);
    
    if (testimonials.length > 0) {
        let currentIndex = 0;

        function showNextTestimonial() {
            console.log('Showing testimonial:', currentIndex);
            
            // Remove active class from all testimonials
            testimonials.forEach(card => {
                card.classList.remove('active');
            });

            // Add active class to current testimonial
            testimonials[currentIndex].classList.add('active');

            // Update index for next testimonial
            currentIndex = (currentIndex + 1) % testimonials.length;

            // Wait for current animation to complete (10s) before showing next
            setTimeout(showNextTestimonial, 10000);
        }

        // Start the testimonial rotation
        showNextTestimonial();
    }
}

// Load footer content and initialize testimonials
document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer.html');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            // Initialize testimonials after footer is loaded
            setTimeout(initializeTestimonials, 100); // Small delay to ensure DOM is updated
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});
