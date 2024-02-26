document.addEventListener('DOMContentLoaded', () => {

  const options = {
    root: null,
    threshold: 0.3,
    rootMargin: "0px"
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  const targets = document.querySelectorAll('.fade-in-scroll');
  targets.forEach(target => observer.observe(target));

  //MODAL1
  const modal1 = document.getElementById("myModal-securevault");
  const imgLink1 = document.getElementById("myImgLink-securevault");
  const span1 = document.getElementsByClassName("close")[0];

  imgLink1.onclick = function() {
    modal1.style.display = "flex";
    document.body.style.overflow = 'hidden';
  };

  span1.onclick = function() {
    modal1.style.display = "none";
    document.body.style.overflow = 'auto';
  };

  //MODAL2
  const modal2 = document.getElementById("myModal-architecture");
  const imgLink2 = document.getElementById("myImgLink-architecture");
  const span2 = document.getElementsByClassName("close")[1];

  imgLink2.onclick = function() {
    modal2.classList.add("active");
    document.body.style.overflow = 'hidden';
  };

  span2.onclick = function() {
    modal2.classList.remove("active");
    document.body.style.overflow = 'auto';
    resetZoomOnImages();
  };

  modal2.addEventListener('click', function(event) {
    if (event.target === modal2) {
      modal2.classList.remove("active");
      document.body.style.overflow = 'auto';
      resetZoomOnImages();
    }
  });

  document.querySelector(".modal-content-architecture").addEventListener('click', function(event) {
    if (event.currentTarget === event.target) {
      modal2.classList.remove("active");
      document.body.style.overflow = 'auto';
      resetZoomOnImages();
    }
  });

  document.querySelectorAll(".modal-content-architecture img").forEach(img => {
    img.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });

  const images = document.querySelectorAll('.modal-content-architecture img');

  images.forEach(function(img) {
    img.addEventListener('click', function() {

      if (!img.classList.contains('zoom-in')) {

        var imgRect = img.getBoundingClientRect();
        var centerX = (window.innerWidth / 2) - (imgRect.left + imgRect.width / 2);
        var centerY = (window.innerHeight / 2) - (imgRect.top + imgRect.height / 2);

        img.style.transform = `translate(${centerX}px, ${centerY}px) scale(2)`;
        img.style.transition = 'transform 0.5s ease-in-out';
        img.classList.add('zoom-in');
        img.style.cursor = 'zoom-out';
      } else {

        img.style.transform = '';
        img.classList.remove('zoom-in');
        img.style.cursor = 'zoom-in';
      }

      images.forEach(otherImg => {
        if (otherImg !== img) {
          otherImg.style.transform = '';
          otherImg.classList.remove('zoom-in');
          otherImg.style.cursor = 'zoom-in';
        }
      });
    });
  });

  function resetZoomOnImages() {
    const images = document.querySelectorAll('.modal-content-architecture img');
    images.forEach(img => {
      img.classList.remove('zoom-in');
      img.style.transform = '';
      img.style.cursor = 'zoom-in';
    });
  }

  const carouselSlide = document.querySelector('.carousel-slide');
  const slides = Array.from(document.querySelectorAll('.modal-content-securevault img'));
  const totalSlides = slides.length;
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentSlideIndex = 1; // Assuming the first slide is a clone of the last

  // Calculate the width of a slide based on the carousel's width
  const slideWidth = carouselSlide.clientWidth / 2; // Assuming 2 slides visible at a time

  // Move the carousel to the start position (first original slide)
  carouselSlide.style.transform = `translateX(-${slideWidth}px)`;

  function moveSlide(step) {
      currentSlideIndex += step;
      let newTransformValue = -(slideWidth * currentSlideIndex);

      // Check for the end of the carousel and loop back
      if (currentSlideIndex >= totalSlides - 1) {
          currentSlideIndex = 1; // Reset to the first original slide
          newTransformValue = -(slideWidth * currentSlideIndex);
      } else if (currentSlideIndex <= 0) {
          currentSlideIndex = totalSlides - 2; // Jump to the last original slide
          newTransformValue = -(slideWidth * currentSlideIndex);
      }

      carouselSlide.style.transform = `translateX(${newTransformValue}px)`;
  }

  prevButton.addEventListener('click', () => moveSlide(-1));
  nextButton.addEventListener('click', () => moveSlide(1));

  // Listen for the end of transitions
  carouselSlide.addEventListener('transitionend', () => {
      // "Jump" to the clone slide without transition for infinite loop illusion
      if (currentSlideIndex === totalSlides - 1) {
          carouselSlide.style.transition = 'none';
          currentSlideIndex = 1;
          carouselSlide.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
      } else if (currentSlideIndex === 0) {
          carouselSlide.style.transition = 'none';
          currentSlideIndex = totalSlides - 2;
          carouselSlide.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
      }

      // Re-enable transition after "jump"
      setTimeout(() => carouselSlide.style.transition = 'transform 0.5s ease-in-out', 0);
  });

  // Resetting carousel when modal is closed
  const closeBtn1 = modal1.querySelector('.close');
  closeBtn1.addEventListener('click', () => {
    modal1.style.display = "none";
    document.body.style.overflow = 'auto';
    resetCarouselPosition(); // Ensure the carousel is reset properly
  });

  modal1.addEventListener('click', (event) => {
    if (event.target === modal1) {
      modal1.style.display = 'none';
      document.body.style.overflow = 'auto';
      resetCarouselPosition();
    }
  });

  slidesContainer.addEventListener('click', (event) => event.stopPropagation());

}); 

function copyEmailToClipboard() {

  var dummy = document.createElement('input'),
      text = window.getSelection().toString();
  
  document.body.appendChild(dummy);
  dummy.value = text.length > 0 ? text : 'german@avakjan.ee';
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  
  var notification = document.getElementById('emailCopyNotification');
  notification.style.display = 'block';
  
  setTimeout(function() {
    notification.style.display = 'none';
  }, 2000);
}