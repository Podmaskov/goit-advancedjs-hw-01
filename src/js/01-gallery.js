// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';
// Change code below this line

import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryWrap = document.querySelector('.gallery');

let galleryItemsTemplate = '';

galleryItems.forEach(({ original, preview, description }) => {
  return (galleryItemsTemplate += `
  <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    </li>
    `);
});

galleryWrap.insertAdjacentHTML('afterbegin', galleryItemsTemplate);

new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 250,
});
