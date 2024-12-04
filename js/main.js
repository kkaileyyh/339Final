// main.js

// Function to extract perfume data
function extractPerfumeData(perfumeSection) {
    const id = perfumeSection.getAttribute('data-id');
    const title = perfumeSection.querySelector('.perf-title').innerText;
    const brand = perfumeSection.querySelector('.perf-brand').innerText;
    const price = perfumeSection.querySelector('.perf-price').innerText;
    const imageSrc = perfumeSection.querySelector('.perf-image').getAttribute('src');

    return { id, title, brand, price, imageSrc };
}

// Function to add perfume to wishlist
function addPerfumeToWishlist(perfume) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.find(item => item.id === perfume.id)) {
        wishlist.push(perfume);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

// Function to remove perfume from wishlist
function removePerfumeFromWishlist(perfumeId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== perfumeId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Toggle heart icon and manage wishlist
const wishlistButtons = document.querySelectorAll('.wishlist');

wishlistButtons.forEach(button => {
    const icon = button.querySelector('i');
    const perfumeSection = button.closest('.perf');
    const perfumeData = extractPerfumeData(perfumeSection);

    // Check if perfume is already in wishlist and update icon
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.find(item => item.id === perfumeData.id)) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        button.classList.add('in-wishlist');
    }

    button.addEventListener('click', function() {
        // Toggle icon classes
        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            addPerfumeToWishlist(perfumeData);
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            removePerfumeFromWishlist(perfumeData.id);
        }
        // Toggle wishlist state class
        button.classList.toggle('in-wishlist');
    });
});

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

// // Get references to the add button and the perfume grid
// const addPerfumeButton = document.getElementById("add-perfume-button");
// const perfumeGrid = document.querySelector(".perf-grid");

// // Function to add a new perfume
// function addPerfume() {
//   // Create a new perfume section
//   const newPerfume = document.createElement("section");
//   newPerfume.classList.add("perf");
//   newPerfume.dataset.id = `perfume${document.querySelectorAll(".perf").length + 1}`; // Dynamic ID

//   // Add the content for the new perfume
//   newPerfume.innerHTML = `
//     <div class="perf-content">
//       <p class="perf-title">New Perfume</p>
//       <p class="perf-brand">Brand Name</p>
//       <p class="perf-price">$Price</p>
//     </div>
//     <div class="perf-image-container">
//       <img src="/images/default-image.jpg" alt="New Perfume" class="perf-image">
//     </div>
//     <div class="perf-content">
//       <p class="perf-scentFam">Scent Family: Category</p>
//       <p class="perf-review">
//         <i class="fa-solid fa-star"></i> Rating
//         <a href="#">(0 reviews)</a>
//       </p>
//     </div>
//     <div class="perf-button">
//       <button class="wishlist"><i class="fa-regular fa-heart"></i> Wishlist</button>
//       <button class="compare"><i class="fa-solid fa-right-left"></i> Compare</button>
//     </div>
//   `;

//   // Append the new perfume to the grid
//   perfumeGrid.appendChild(newPerfume);
// }

// // Add an event listener to the button
// addPerfumeButton.addEventListener("click", addPerfume);
// References
const editButton = document.getElementById("edit-button");
const perfumeGrid = document.querySelector(".perf-grid");
let isEditMode = false;
let cancelButton; // Reference for the cancel button

// Toggle edit mode
editButton.addEventListener("click", () => {
  isEditMode = !isEditMode;
  toggleEditMode();
});

// Toggle Edit Mode Functionality
function toggleEditMode() {
  if (isEditMode) {
    editButton.textContent = "Save Changes"; // Switch to "Save Changes"
    showCancelButton(); // Show cancel button
    enableEditing();
  } else {
    editButton.textContent = "Edit"; // Switch back to "Edit"
    hideCancelButton(); // Hide cancel button
    disableEditing();
  }
}

// Enable editing mode
function enableEditing() {
  // Add "Delete" buttons to each perfume
  document.querySelectorAll(".perf").forEach((perf) => {
    if (!perf.querySelector(".delete-button")) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => perf.remove());
      perf.appendChild(deleteButton);
    }

    // Make text fields editable
    perf.querySelectorAll(".perf-content p").forEach((field) => {
      field.contentEditable = true;
      field.style.border = "1px dashed #ccc"; // Highlight editable fields
    });
  });

  // Add "Add New Perfume" section
  if (!document.getElementById("add-new-perfume-form")) {
    const addForm = document.createElement("div");
    addForm.id = "add-new-perfume-form";
    addForm.innerHTML = `
      <h3>Add New Perfume</h3>
      <input type="text" id="new-title" placeholder="Perfume Name">
      <input type="text" id="new-brand" placeholder="Brand">
      <input type="text" id="new-price" placeholder="Price">
      <button id="add-new-perfume-button">Add Perfume</button>
    `;
    perfumeGrid.appendChild(addForm);

    // Add event listener for adding a new perfume
    document.getElementById("add-new-perfume-button").addEventListener("click", addNewPerfume);
  }
}

// Disable editing mode
function disableEditing() {
  document.querySelectorAll(".perf").forEach((perf) => {
    // Remove "Delete" buttons
    const deleteButton = perf.querySelector(".delete-button");
    if (deleteButton) deleteButton.remove();

    // Disable text editing
    perf.querySelectorAll(".perf-content p").forEach((field) => {
      field.contentEditable = false;
      field.style.border = "none"; // Remove highlight
    });
  });

  // Remove "Add New Perfume" form
  const addForm = document.getElementById("add-new-perfume-form");
  if (addForm) addForm.remove();
}

// Add a new perfume
function addNewPerfume() {
  const title = document.getElementById("new-title").value;
  const brand = document.getElementById("new-brand").value;
  const price = document.getElementById("new-price").value;

  if (title && brand && price) {
    // Create new perfume section
    const newPerfume = document.createElement("section");
    newPerfume.classList.add("perf");
    newPerfume.dataset.id = `perfume${document.querySelectorAll(".perf").length + 1}`;
    newPerfume.innerHTML = `
      <div class="perf-content">
        <p class="perf-title">${title}</p>
        <p class="perf-brand">${brand}</p>
        <p class="perf-price">${price}</p>
      </div>
      <div class="perf-image-container">
        <img src="/images/default-image.jpg" alt="${title}" class="perf-image">
      </div>
      <div class="perf-content">
        <p class="perf-scentFam">Scent Family: Add Category</p>
        <p class="perf-review">
          <i class="fa-solid fa-star"></i> Rating
          <a href="#">(0 reviews)</a>
        </p>
      </div>
      <div class="perf-button">
        <button class="wishlist"><i class="fa-regular fa-heart"></i> Wishlist</button>
        <button class="compare"><i class="fa-solid fa-right-left"></i></i> Compare</button>
      </div>
    `;
    perfumeGrid.appendChild(newPerfume);

    // Clear the input fields
    document.getElementById("new-title").value = "";
    document.getElementById("new-brand").value = "";
    document.getElementById("new-price").value = "";
  } else {
    alert("Please fill in all fields!");
  }
}

// Show cancel button
function showCancelButton() {
    if (!cancelButton) {
      cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.id = "cancel-button";
      cancelButton.classList.add("cancel-mode");
      cancelButton.addEventListener("click", () => {
        isEditMode = false; // Exit edit mode
        editButton.textContent = "Edit";
        disableEditing();
        hideCancelButton();
      });
  
      // Insert the cancel button next to the edit button
      editButton.parentNode.insertBefore(cancelButton, editButton.nextSibling);
    }
  }
  

// Hide cancel button
function hideCancelButton() {
  if (cancelButton) {
    cancelButton.remove();
    cancelButton = null;
  }
}

const comparisonItems = document.querySelectorAll('.comparison-item');
let selectedPerfumes = [];

function updateComparisonSection() {
  comparisonItems.forEach((item, index) => {
    if (selectedPerfumes[index]) {
      const perfume = selectedPerfumes[index];
      item.innerHTML = `
        <img src="${perfume.imageSrc}" alt="${perfume.title}" class="comparison-image">
        <p class="perf-title">${perfume.title}</p>
        <p class="perf-brand">${perfume.brand}</p>
        <p class="perf-price">${perfume.price}</p>
        <p class="perf-scentFam">${perfume.scentFamily}</p>
      `;
    } else {
      item.innerHTML = '<p class="empty-text">Select a perfume to compare</p>';
    }
  });
}

function toggleCompare(perfumeData) {
  const index = selectedPerfumes.findIndex(p => p.id === perfumeData.id);
  if (index !== -1) {
    selectedPerfumes.splice(index, 1);
  } else if (selectedPerfumes.length < 3) {
    selectedPerfumes.push(perfumeData);
  } else {
    alert('You can only compare up to 3 perfumes at a time.');
    return;
  }
  updateComparisonSection();
}

// Update compare button event listeners
document.querySelectorAll('.compare').forEach(button => {
  button.addEventListener('click', function() {
    const perfumeSection = this.closest('.perf');
    const perfumeData = extractPerfumeData(perfumeSection);
    toggleCompare(perfumeData);
    
    // Toggle button appearance
    this.classList.toggle('selected');
    this.innerHTML = this.classList.contains('selected') 
      ? '<i class="fa-solid fa-check"></i> Compare'
      : '<i class="fa-solid fa-right-left"></i> Compare';
  });
});

// Function to extract perfume data (update to include scent family)
function extractPerfumeData(perfumeSection) {
  const id = perfumeSection.getAttribute('data-id');
  const title = perfumeSection.querySelector('.perf-title').innerText;
  const brand = perfumeSection.querySelector('.perf-brand').innerText;
  const price = perfumeSection.querySelector('.perf-price').innerText;
  const imageSrc = perfumeSection.querySelector('.perf-image').getAttribute('src');
  const scentFamily = perfumeSection.querySelector('.perf-scentFam').innerText.replace('Scent Family: ', '');

  return { id, title, brand, price, imageSrc, scentFamily };
}