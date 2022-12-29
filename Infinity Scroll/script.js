const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImg = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "NztS-2wD6lnmucHD5MWAQfbjZtcsdGCeh5EZlZOH8mg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if img is loaded
function imgLoaded() {
  imageLoaded++;
  if (imageLoaded === totalImg) {
    ready = true;
    loader.hidden = true;
  }
}

// Create elements for links & photos
function displayPhotos() {
  imageLoaded = 0;
  totalImg = photosArray.length;
  photosArray.forEach((photo) => {
    //Create <a> link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // create <img>
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imgLoaded);
    // put <img> inside <a>
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// get photos from api
async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

// Check if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
