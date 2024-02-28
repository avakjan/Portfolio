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

  //MODAL SECUREVAULT

  let slideIndex = 1;
  showSlides(slideIndex = 1);

  function changeSlide(n) {
      showSlides(slideIndex += n);
  }

  function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");

    // Correcting slideIndex boundaries
    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}

    // Immediately start fading out visible slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
    }

    // After a fade-out, hide all slides, then immediately show the next slide without delay
    setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        // Display the next slide and start fading it in
        let nextSlide = slides[slideIndex - 1];
        nextSlide.style.display = "flex";
        // Use requestAnimationFrame to ensure display changes are applied before starting the opacity transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                nextSlide.style.opacity = 1;
            });
        });
    }, 1000); // The timeout duration should match your CSS transition duration
  }


  document.getElementById('myImgLink-securevault').onclick = function() {
    document.getElementById('myModal-securevault').style.display = "flex";
    showSlides(slideIndex = 1); // Reset carousel to first slide when modal is opened
  }

  // When the user clicks on <span> (x), close the modal
  document.getElementsByClassName('close')[0].onclick = function() {
      document.getElementById('myModal-securevault').style.display = "none";
  }

      // Add event listeners for the carousel buttons
  document.querySelector('.prev').addEventListener('click', function() {
    changeSlide(-1);
  });

  document.querySelector('.next').addEventListener('click', function() {
    changeSlide(1);
  });
  /*
  
  
  
  here goes the modal securevault
  
  
  
  */

  //MODAL ARCHITECTURE
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