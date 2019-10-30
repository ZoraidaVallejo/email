/* eslint-disable node/no-unsupported-features/es-syntax */

function initOpacitySlider(mockupImg, opacitySlider) {
    const initialMockupOpacity = Number(localStorage.getItem('mockupOpacity')) || 0;

    function changeMockupOpacity(value) {
        // eslint-disable-next-line no-param-reassign
        mockupImg.style.opacity = value;
        localStorage.setItem('mockupOpacity', value);
    }

    changeMockupOpacity(initialMockupOpacity);

    // eslint-disable-next-line no-param-reassign
    opacitySlider.value = initialMockupOpacity;
    opacitySlider.addEventListener('input', (event) => changeMockupOpacity(event.target.value));
}

export default initOpacitySlider;
