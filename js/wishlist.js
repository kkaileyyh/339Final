// wishlist.js

function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p id="emptyList">Your wishlist is empty.</p>';
        return;
    }

    wishlist.forEach(perfume => {
        const perfumeElement = document.createElement('section');
        perfumeElement.classList.add('perf');
        perfumeElement.setAttribute('data-id', perfume.id);

        perfumeElement.innerHTML = `
            <div class="perf-content">
                <p class="perf-title">${perfume.title}</p>
                <p class="perf-brand">${perfume.brand}</p>
                <p class="perf-price">${perfume.price}</p>
            </div>
            <div id="perf-image-wishlist" class="perf-image-container">
                <img src="${perfume.imageSrc}" alt="${perfume.title}" class="perf-image">
            </div>
            <div class="perf-button">
                <button class="remove-wishlist"><i class="fa-solid fa-heart"></i> Remove from Wishlist</button>
            </div>
        `;

        wishlistContainer.appendChild(perfumeElement);
    });

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-wishlist');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const perfumeSection = this.closest('.perf');
            const perfumeId = perfumeSection.getAttribute('data-id');
            removePerfumeFromWishlist(perfumeId);
            perfumeSection.remove();

            // If wishlist is empty after removal, display message
            if (wishlistContainer.children.length === 0) {
                wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
            }
        });
    });
}

// Reuse the remove function
function removePerfumeFromWishlist(perfumeId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== perfumeId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

document.addEventListener('DOMContentLoaded', displayWishlist);


// Back to top Button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}