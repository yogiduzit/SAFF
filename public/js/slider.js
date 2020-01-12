// Javascript File for slider with location info

const slide = document.getElementById('slide');
const slider = document.getElementById('slider');

slide.addEventListener('click', e => {
	e.preventDefault();
	slider.classList.add('expand');
});