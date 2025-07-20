let selectedRating = 0;
const stars = document.querySelectorAll('.star');
const reviewsContainer = document.getElementById('reviewsContainer');
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Star click handler
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = star.getAttribute('data-value');
        stars.forEach(s => s.classList.toggle('selected', s.getAttribute('data-value') <= selectedRating));
    });
});

// Handle form submit
document.getElementById('rateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    if (!username || selectedRating === 0 || !feedback) {
        alert("Please fill out all fields and select a star rating.");
        return;
    }

    const review = { name: username, rating: selectedRating, feedback: feedback };
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    displayReviews();
    this.reset();
    stars.forEach(s => s.classList.remove('selected'));
    selectedRating = 0;

    const successMsg = document.createElement('div');
    successMsg.textContent = "✅ Thank you for your feedback!";
    successMsg.style.color = "#28a745";
    successMsg.style.fontFamily = "Roboto, sans-serif";
    successMsg.style.marginTop = "10px";
    successMsg.style.textAlign = "center";
    this.appendChild(successMsg);

    // Remove message after 3 seconds
    setTimeout(() => successMsg.remove(), 3000);

});

// Display all reviews
function displayReviews() {
    reviewsContainer.innerHTML = '<h3 style="font-family: Playfair Display, serif; color: #ff6f91;">💬 User Reviews</h3>';
    reviews.forEach(r => {
        const reviewEl = document.createElement('div');
        reviewEl.classList.add('review');
        reviewEl.innerHTML = `
            <strong style="color: #333;">${r.name}</strong>
            <div class="review-stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</div>
            <p>${r.feedback}</p>
        `;
        reviewsContainer.appendChild(reviewEl);
    });
}

displayReviews();