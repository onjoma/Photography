// Update copyright year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;
});
