// Opening and closing modal

const uploadFile = document.querySelector('#upload-file');

const img = document.querySelector('.img-upload__preview > img');

uploadFile.addEventListener('change', (e) => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  img.src = window.URL.createObjectURL(e.target.files[0]);
});


const closeModal = () => {
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  img.style.filter = 'none';
  img.classList.remove(...img.classList);
  img.classList.add('effects__preview--none');
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

const cancelButton = document.querySelector('#upload-cancel');

cancelButton.addEventListener('click', () => closeModal());
