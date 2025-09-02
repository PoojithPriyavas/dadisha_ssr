// // Select all disha-image-container elements
// const imageContainers = document.querySelectorAll('.disha-image-item');

// // Function to handle scroll event
// function handleScroll() {
//     // Get the current scroll position
//     const scrollY = window.scrollY;

//     // Loop through each image container
//     imageContainers.forEach((container, index) => {
//         // Calculate the amount to move the image
//         // You can adjust the multiplier value to increase or decrease the movement
//         const translateY = scrollY * 0.3 * (index % 2 === 0 ? -0.1 : 0.1);

//         // Apply the transform style to move the image
//         container.style.transform = `translateY(${translateY}px)`;
//     });
// }

// // Add scroll event listener to window
// window.addEventListener('scroll', handleScroll);



// Select all disha-image-container elements
const imageContainers = document.querySelectorAll('.disha-image-item');

// Store original transform values
const originalTransforms = [];

imageContainers.forEach((container) => {
    originalTransforms.push(container.style.transform);
});

// Function to handle scroll event
function handleScroll() {
    // Get the current scroll position
    const scrollY = window.scrollY;

    // Check device width
    if (window.innerWidth <= 570) {
        // Revert to original transform state
        imageContainers.forEach((container, index) => {
            container.style.transform = originalTransforms[index] || '';
        });
        return; // Exit the function if device width is <= 570
    }

    // Loop through each image container
    imageContainers.forEach((container, index) => {
        // Calculate the amount to move the image
        const translateY = scrollY * 0.3 * (index % 2 === 0 ? -0.1 : 0.1);

        // Apply the transform style to move the image
        container.style.transform = `translateY(${translateY}px)`;
    });
}

// Add scroll event listener to window
window.addEventListener('scroll', handleScroll);




// Select all disha-image-container elements
// const imageContainers = document.querySelectorAll('.disha-image-container');

// console.log(imageContainers); // Log the image containers to the console

// // Function to handle scroll event
// function handleScroll() {
//     // Get the current scroll position
//     const scrollY = window.scrollY;

//     // Loop through each image container
//     imageContainers.forEach((container, index) => {
//         // Calculate the amount to move the image
//         // Alternating direction for each image
//         const translateY = (index % 2 === 0 ? -5 : 5) * (scrollY % 20 === 0 ? -1 : 1);

//         // Apply the transform style to move the image
//         container.style.transform = `translateY(${translateY}px)`;
//     });
// }

// // Add scroll event listener to window
// window.addEventListener('scroll', handleScroll);
