const TRANSITION_DURATION = 0.3;

export const slider = () => {
  const slider = document.querySelector('.slider');
  const track = slider.querySelector('.slider__track');
  const bullets = slider.querySelectorAll('.slider__bullet');
  const leftArrow = slider.querySelector('.slider__left-btn');
  const rightArrow = slider.querySelector('.slider__right-btn');
  const wrapper = slider.querySelector('.slider__wrapper');

  const totalSlides = bullets.length;
  const firstClonedSlideNumber = 0;
  const lastClonedSlideNumber = totalSlides + 1;
  let slideNumber = 1;
  let animating = false;
  const swipeMediaQuery = window.matchMedia('(max-width: 650px)');

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

  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => moveTo(index + 1));
  });

  const LOCK_RATIO  = 0.05;
  const SWIPE_RATIO = 0.1;
  const MIN_LOCK_PX  = 10;
  const MIN_SWIPE_PX = 30;

  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;
  let directionLocked = false;

  function onPointerDown(e) {
    if (!swipeMediaQuery.matches) {
      return;
    }

    if (e.target.closest('.slider__bullet, .slider__left-btn, .slider__right-btn')) {
      return;
    }

    if (animating) {
      return;
    }

    if (e.pointerType === 'mouse' && e.button !== 0) {
      return;
    }

    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    currentX = startX;
    currentY = startY;
    isDragging = false;
    directionLocked = false;

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (e.pointerId !== pointerId) {
      return;
    }

    currentX = e.clientX;
    currentY = e.clientY;

    const dx = currentX - startX;
    const dy = currentY - startY;

    if (!directionLocked) {
      const lockPx = Math.max(MIN_LOCK_PX, wrapper.offsetWidth * LOCK_RATIO);

      if (Math.abs(dx) < lockPx && Math.abs(dy) < lockPx) return;

      directionLocked = true;

      if (Math.abs(dy) > Math.abs(dx)) {
        cleanup();
        return;
      }

      isDragging = true;
      track.style.transition = 'none';
    }

    if (!isDragging) {
      return;
    }

    const basePercent = -slideNumber * 100;
    const dxPercent = (dx / wrapper.offsetWidth) * 100;

    track.style.transform = `translateX(${basePercent + dxPercent}%)`;
  }

  function onPointerUp(e) {
    if (e.pointerId !== pointerId) {
      return;
    }

    currentX = e.clientX;
    currentY = e.clientY;

    const dx = currentX - startX;
    const wasDragging = isDragging;

    cleanup();

    if (!wasDragging) {
      return;
    }

    const swipePx = Math.max(MIN_SWIPE_PX, wrapper.offsetWidth * SWIPE_RATIO);

    if (Math.abs(dx) >= swipePx) {
      if (dx < 0) {
        moveTo(slideNumber + 1);
      } else {
        moveTo(slideNumber - 1);
      }
    } else {
      track.style.transition = `transform ${TRANSITION_DURATION}s`;
      track.style.transform = `translateX(${-slideNumber * 100}%)`;
    }
  }

  function cleanup() {
    pointerId = null;
    isDragging = false;
    directionLocked = false;
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointercancel', onPointerUp);
  }

  wrapper.addEventListener('pointerdown', onPointerDown);
}