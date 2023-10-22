const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false
let imagesLoaded = 0
let totalImages = 0;
let photosArray = [];

// Unsplash API 
const count = 10;
const apiKey =`tVrXXqvgoQXsAF_QXnLxXdf5_YL1ev-J09B3dty-nSI`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// chechk if all image were loaded
function imageLoaded(){
    // console.log('image loaded')
    imagesLoaded++;
    // console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}


// Helper Function to Set Attributes on DOM Elements

function setAtrributes(element, attribues) {
    for (const key in attribues) {
        element.setAttribute(key, attribues[key])
    }
}


function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAtrributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for phot

        const img = document.createElement('img');
        // Put <img> inside <a> then put both inside imageContainer
        setAtrributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description

        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// this is the longer version of the setAtrributes & displayPhotos functions 

// // Get photos from splash API

// function displayPhotos() {
//     Run function for each object in photosArray
//     photosArray.forEach((photo) => {
// //     Create <a> to link to Unsplash
//         const item = document.createElement('a');
//         item.setAttribute('href', photo.links.html);
//         item.setAttribute('target', '_blank');
//         create <img> for phot

//         const img = document.createElement('img');
//         img.setAttribute('src', photo.urls.regular);
//         img.setAttribute('alt', photo.alt_description);
//         img.setAttribute('title', photo.alt_description);
//         Put <img> inside <a> then put both inside imageContainer
//         item.appendChild(img);
//         imageContainer.appendChild(item);
//     });
// }


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

// check to see if scrolling near bottom of page , Load More photos

window.addEventListener('scroll', () => {
    // console.log('scrolled')

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
        && ready){ 
            ready = false;
            getPhotos();
    }
    // console.log('window.innerHeight:', window.innerHeight);
    // console.log('window.scrollY:', window.scrollY);
    // console.log('window.innerHeight + scrollY:', window.scrollY + window.innerHeight)
    // console.log('document.body.offsetHeight - 1000:' , document.body.offsetHeight -1000)
    console.log('load more')
});


// on load 

getPhotos();