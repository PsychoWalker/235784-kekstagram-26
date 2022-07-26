import {checkEscapeEnter} from './utils.js';
import {pristine} from './validate.js';

const IMAGE_SCALE_COUNT = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const bodyElement = document.body;
const uploadFileElement= document.querySelector('#upload-file');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const scaleControlElement = document.querySelector('.scale__control--value');
const closeBtnElement = document.querySelector('.img-upload__cancel');
const validateTextCommentElement = document.querySelector('.text__description');
const validateTagElement = document.querySelector('.text__hashtags');
const previePicturesElement = document.querySelector('.img-upload__preview-image');

const onCloseFromEscape = (evt) => {
  if(checkEscapeEnter(evt)) {
    evt.preventDefault();
    closeModalHandler();
  }
};

const openUploadPopup = () => {
  bodyElement.classList.add('modal-open');
  uploadModalElement.classList.remove('hidden');
  scaleControlElement.value = `${IMAGE_SCALE_COUNT}%`;
  bodyElement.addEventListener('keydown', onCloseFromEscape);
};

function closeModalHandler() {
  bodyElement.classList.remove('modal-open');
  uploadModalElement.classList.add('hidden');
  scaleControlElement.value = `${IMAGE_SCALE_COUNT}%`;
  uploadFileElement.value = '';
  bodyElement.removeEventListener('keydown', onCloseFromEscape);
  pristine.reset();
  validateTextCommentElement.value = '';
  validateTagElement.value = '';
}

uploadFileElement.addEventListener('change', () => {
  openUploadPopup();
  const fileElement = uploadFileElement.files[0];
  const fileNameElement = fileElement.name.toLowerCase();
  const matchesElement = FILE_TYPES.some((it) => fileNameElement.endsWith(it));

  if (matchesElement) {
    previePicturesElement.src = URL.createObjectURL(fileElement);
  }
});

closeBtnElement.addEventListener('click', closeModalHandler);

export {uploadFileElement, closeModalHandler, openUploadPopup};
