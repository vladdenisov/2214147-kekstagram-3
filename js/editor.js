// Image editor

const imagePreview = document.querySelector('.img-upload__preview > img');

imagePreview.style.filter = '';

const changeScale = (toBigger = true) => {
  const control = document.querySelector('.scale__control--value');

  let value = parseInt(control.value, 10) + (toBigger ? 25 : -25);

  if (value < 25) {
    value = 25;
  }
  if (value > 100) {
    value = 100;
  }

  control.value = `${value}%`;

  imagePreview.style.transform = `scale(${value / 100})`;
};

document.querySelector('.scale__control--smaller').addEventListener('click', () => changeScale(false));
document.querySelector('.scale__control--bigger').addEventListener('click', () => changeScale(true));

const radioButtons = document.querySelectorAll('.effects__radio');

const slider = document.querySelector('.effect-level__slider');

noUiSlider.create(slider, {
  start: 0.5,
  step: 0.1,
  range: {
    'min': 0,
    'max': 1
  },
}
);

let currentFilter = 'none';

const addEffect = (value) => {
  switch (currentFilter) {
    case 'chrome': {
      imagePreview.style.filter = `grayscale(${value})`;
      break;
    }
    case 'sepia':{
      imagePreview.style.filter = `sepia(${value})`;
      break;
    }
    case 'marvin': {
      imagePreview.style.filter = `invert(${value}%)`;
      break;
    }
    case 'phobos': {
      imagePreview.style.filter = `blur(${value}px)`;
      break;
    }
    case 'heat':{
      imagePreview.style.filter = `brightness(${value})`;
      break;
    }
    default: {
      imagePreview.style.filter = '';
      break;
    }
  }
};

const levelInput = document.querySelector('.effect-level__value');

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  addEffect(value);
  levelInput.value = value;
});

radioButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const img = document.querySelector('.img-upload__preview > img');
    img.classList.remove(...img.classList);
    img.classList.add(`effects__preview--${e.target.value}`);
    currentFilter = e.target.value;
    switch(e.target.value) {
      case 'sepia':
      case 'chrome': {
        slider.noUiSlider.updateOptions({
          start: 0.5,
          step: 0.1,
          range: {
            'min': 0,
            'max': 1
          },
        });
        break;
      }
      case 'marvin': {
        slider.noUiSlider.updateOptions({
          start: 30,
          step: 1,
          range: {
            'min': 0,
            'max': 100
          },
        });
        break;
      }
      case 'phobos': {
        slider.noUiSlider.updateOptions({
          start: 1.5,
          step: 0.1,
          range: {
            'min': 0,
            'max': 3
          },
        });
        break;
      }
      case 'heat': {
        slider.noUiSlider.updateOptions({
          start: 2,
          step: 0.1,
          range: {
            'min': 1,
            'max': 3
          },
        });
        break;
      }
      case 'none': {
        imagePreview.style.filter = '';
        break;
      }
    }
  });
});
