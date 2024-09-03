"use strict";

// Constant
const MAX_SCALE = 3;

// JavaScript for handling image popup, zoom, and drag
const galleryImages = document.querySelectorAll('.gallery-image');
const imagePopup = document.getElementById('image-popup');
const popupImage = document.getElementById('popup-image');
const closeButton = document.querySelector('.close');

// Open popup on image click
galleryImages.forEach(image => {
    image.addEventListener('click', function() {
        imagePopup.style.display = 'flex';
        popupImage.src = this.src;
        resetImagePosition();

        const imgRect = popupImage.getBoundingClientRect();
        setImageBoundaryOrigin(imgRect);
        setImageBoundaryMax(imgRect);

        setPopupImageLimit();
    });
});

// Close popup on close button click
closeButton.addEventListener('click', function() {
    imagePopup.style.display = 'none';
});

// Zoom functionality
let scale = 1;
popupImage.addEventListener('wheel', function(event) {
    event.preventDefault();
    scale += event.deltaY * -0.01;

    // Restrict scale
    scale = Math.min(Math.max(1, scale), MAX_SCALE);

    // Apply scale transform
    popupImage.style.width = `${imgWidthOrigin * scale}px`;

    // Calculating image boundary
    setImageBoundaryMax(popupImage.getBoundingClientRect());

    // Set img position with bounds
    const imgRect = popupImage.getBoundingClientRect();
    setImgPosition(imgRect.top, imgRect.left);
});

// Drag functionality
let isDragging = false;
let startX, startY, initialX, initialY;

popupImage.addEventListener('mousedown', startDragging);
popupImage.addEventListener('touchstart', startDragging);

function startDragging(event) {
    event.preventDefault();
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX;
    startY = event.clientY || event.touches[0].clientY;
    initialX = popupImage.offsetLeft;
    initialY = popupImage.offsetTop;
    popupImage.style.cursor = 'grabbing';
}

document.addEventListener('mousemove', dragImage);
document.addEventListener('touchmove', dragImage);

function dragImage(event) {
    if (isDragging) {
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;

        // Restrict coordinates
        let currentTop = initialY + dy;
        let currentLeft = initialX + dx;

        setImgPosition(currentTop, currentLeft);
    }
}

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function stopDragging() {
    isDragging = false;
    popupImage.style.cursor = 'grab';
}

// Calculating image boundary
let imgWidthOrigin, imgHeightOrigin;
let imgTopOrigin, imgLeftOrigin;
function setImageBoundaryOrigin(imgRect) {
    imgHeightOrigin = imgRect.height;
    imgWidthOrigin = imgRect.width;
    imgTopOrigin = imgRect.top;
    imgLeftOrigin = imgRect.left;
}

let imgTopMax, imgLeftMax;
function setImageBoundaryMax(imgRect) {
    imgTopMax = imgTopOrigin - (imgRect.height - imgHeightOrigin);
    imgLeftMax = imgLeftOrigin - (imgRect.width - imgWidthOrigin);
}

function setImgPosition(currentTop, currentLeft) {
    if (currentTop > imgTopOrigin) {
        popupImage.style.top = getPx(imgTopOrigin);
    } else if (currentTop < imgTopMax) {
        popupImage.style.top = getPx(imgTopMax);
    } else {
        popupImage.style.top = getPx(currentTop);
    }

    if (currentLeft > imgLeftOrigin) {
        popupImage.style.left = getPx(imgLeftOrigin);
    } else if (currentLeft < imgLeftMax) {
        popupImage.style.left = getPx(imgLeftMax);
    } else {
        popupImage.style.left = getPx(currentLeft);
    }
}

function getPx(val) {
    return `${val}px`;
}

function setPopupImageLimit() {
    const popupImageUpperLimit = document.getElementById('popup-image-top-limit');
    const popupImageLowerLimit = document.getElementById('popup-image-bottom-limit');
    popupImageUpperLimit.style.height = `${imgTopOrigin}px`;
    popupImageLowerLimit.style.height = `${imgTopOrigin}px`;

    popupImageUpperLimit.addEventListener('click', function() {
        imagePopup.style.display = 'none';
    });
    popupImageLowerLimit.addEventListener('click', function() {
        imagePopup.style.display = 'none';
    });
}

function resetImagePosition() {
    popupImage.style.removeProperty('left');
    popupImage.style.removeProperty('top');
    popupImage.style.width = `${imgWidthOrigin}px`;
    scale = 1;
}