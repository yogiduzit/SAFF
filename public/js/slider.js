// Javascript File for slider with location info

const slide = document.getElementById('slide');
const slider = document.getElementById('slider');

slide.addEventListener('click', e => {
    e.preventDefault();
    if(slider.classList.contains('expand')){
        slider.classList.remove('expand');
    } else {
    slider.classList.add('expand');
    }
});