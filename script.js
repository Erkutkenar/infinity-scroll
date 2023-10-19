const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API 
const count = 10;
const apiKey =`tVrXXqvgoQXsAF_QXnLxXdf5_YL1ev-J09B3dty-nSI`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get photos from splash API

function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for phot

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Put <img> inside <a> then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        console.log(photosArray);
        displayPhotos();
    }catch (error) {
        // catch Error here
    }
}

// on load 

getPhotos();