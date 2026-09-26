const TRANSITION_DURATION = 0.3;

export const slider = () => {
  const slider = document.querySelector('.slider');
  const track = slider.querySelector('.slider__track');
  const bullets = slider.querySelectorAll('.slider__bullet');
  const leftArrow = slider.querySelector('.slider__left-btn');
  const rightArrow = slider.querySelector('.slider__right-btn');

  const totalSlides = bullets.length;
  const firstClonedSlideNumber = 0;
  const lastClonedSlideNumber = totalSlides + 1;
  let slideNumber = 1;
  let animating = false;

  const setActiveBullet = (realSlideIndex) => {
    bullets.forEach((bullet, index) =>
      bullet.classList.toggle('slider__bullet_active', index === realSlideIndex)
    );
  }

  const moveTo = (nextSlideNumber) => {
    if (animating) {
      return;
    }

    animating = true;

    track.style.transition = `transform ${TRANSITION_DURATION}s`;

    slideNumber = nextSlideNumber;
    track.style.transform = `translateX(-${slideNumber * 100}%)`;

    const realSlideIndex = (slideNumber - 1 + totalSlides) % totalSlides;
    setActiveBullet(realSlideIndex);
  }

  const resetAnimationPosition = () => {
    animating = false;

    let shouldJump = false;

    if (slideNumber === lastClonedSlideNumber) {
      slideNumber = 1;
      shouldJump = true;
    } else if (slideNumber === firstClonedSlideNumber) {
      slideNumber = totalSlides;
      shouldJump = true;
    }

    if (shouldJump) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slideNumber * 100}%)`;

      void track.offsetWidth;
      track.style.transition = `transform ${TRANSITION_DURATION}s`;
    }
  }

  setActiveBullet(0);

  rightArrow.addEventListener('click', () => moveTo(slideNumber + 1));
  leftArrow.addEventListener('click',  () => moveTo(slideNumber - 1));
  track.addEventListener('transitionend', resetAnimationPosition);
}