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

  
  let slideIndex = 1;
  showSlides(slideIndex = 1);

  function changeSlide(n) {
      showSlides(slideIndex += n);
  }

  function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
  
    
    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}
  
    let currentSlideIndex = slideIndex - 1; 
  
    
    let previousSlideIndex = (currentSlideIndex === 0 ? slides.length : currentSlideIndex) - 1;
    slides[previousSlideIndex].style.transition = 'opacity 1s';
    slides[previousSlideIndex].style.opacity = 0;

    
    setTimeout(() => {
      slides[previousSlideIndex].style.display = 'none';
    }, 1000);
  
    
    let nextSlide = slides[slideIndex - 1];
    nextSlide.style.display = "flex";
    nextSlide.style.opacity = 0;
  
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextSlide.style.opacity = 1;
  
        
        attachZoomListener(nextSlide);
      });
    });
  }

  function attachZoomListener(slide) {
    let images = slide.querySelectorAll('img');
    images.forEach(img => {
      
      img.removeEventListener('click', zoomFunction);

      
      img.addEventListener('click', zoomFunction);
    });
  }

  function zoomFunction() {
    let img = this;
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

    let modalImages = document.querySelectorAll(".carousel-item img");
    modalImages.forEach(otherImg => {
      if (otherImg !== img) {
        otherImg.style.transform = '';
        otherImg.classList.remove('zoom-in');
        otherImg.style.cursor = 'zoom-in';
      }
    });
  }

  function resetZoom() {
    let modalImages = document.querySelectorAll(".carousel-item img");
    modalImages.forEach(img => {
      img.style.transform = '';
      img.classList.remove('zoom-in');
      img.style.cursor = 'zoom-in';
    });
  }

  document.getElementById('myImgLink-securevault').onclick = function() {
    resetZoom();
    showSlides(slideIndex = 1); 
    let modal = document.getElementById('myModal-securevault');
    modal.style.display = "flex";
    
    requestAnimationFrame(() => {
      modal.classList.add('show'); 
    });
    document.body.style.overflow = 'hidden';
  }

  
  document.getElementsByClassName('close')[0].onclick = function() {
    let modal = document.getElementById('myModal-securevault');
    modal.classList.remove('show'); 
    
    setTimeout(function() {
      modal.style.display = "none";
    }, 500);
    document.body.style.overflow = 'auto';
  }

  
  window.onclick = function(event) {
    if (event.target == document.getElementById('myModal-securevault')) {
      let modal = document.getElementById('myModal-securevault');
      modal.classList.remove('show'); 
      
      setTimeout(function() {
        modal.style.display = "none";
      }, 500);
      document.body.style.overflow = 'auto';
    }
  }

  
  document.querySelector('.prev').addEventListener('click', function() {
    changeSlide(-1);
  });

  document.querySelector('.next').addEventListener('click', function() {
    changeSlide(1);
  });

  
  const modal2 = document.getElementById("myModal-architecture");
  const imgLink2 = document.getElementById("myImgLink-architecture");
  const span2 = document.getElementsByClassName("close")[1];

  imgLink2.onclick = function() {
    resetZoomOnImages();
    modal2.classList.add("active");
    document.body.style.overflow = 'hidden';
  };

  span2.onclick = function() {
    modal2.classList.remove("active");
    document.body.style.overflow = 'auto';
  };

  modal2.addEventListener('click', function(event) {
    if (event.target === modal2) {
      modal2.classList.remove("active");
      document.body.style.overflow = 'auto';
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