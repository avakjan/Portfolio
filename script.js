document.addEventListener('DOMContentLoaded', () => {
    // Options for the IntersectionObserver
    const options = {
      root: null, // Use the viewport as the root
      threshold: 0.3, // Percentage of target's visibility the observer's callback should execute
      rootMargin: "0px" // Margin around the root
    };
  
    // Callback function for IntersectionObserver
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        // If the entry is intersecting (visible)
        if (entry.isIntersecting) {
          // Add the 'visible' class to the target
          entry.target.classList.add('visible');
          // Optional: Unobserve the target to prevent future invocations
          // observer.unobserve(entry.target);
        }
      });
    };
  
    // Create the observer instance and pass in the options and the callback
    const observer = new IntersectionObserver(callback, options);
  
    // Target elements to observe
    const targets = document.querySelectorAll('.fade-in-scroll');
  
    // Observe each target
    targets.forEach(target => {
      observer.observe(target);
    });

    //MODAL
    var modal1 = document.getElementById("myModal-securevault");
    var imgLink1 = document.getElementById("myImgLink-securevault");
    var span = document.getElementsByClassName("close")[0];

    imgLink1.onclick = function(event) {
      event.preventDefault(); // Prevent default anchor action
      modal1.style.display = "flex"; // Use 'flex' to enable center alignment
      document.body.style.overflow = 'hidden'; // Disable body scroll
    }

    span.onclick = function() {
      modal1.style.display = "none";
      document.body.style.overflow = 'auto'; // Re-enable body scroll
    }

    //MODAL2
    var modal2 = document.getElementById("myModal-architecture");
    var imgLink2 = document.getElementById("myImgLink-architecture");
    var span2 = document.getElementsByClassName("close")[1]; // Assuming the second modal's close button is the next in the array

    imgLink2.onclick = function(event) {
      event.preventDefault();
      modal2.classList.add("active"); // Use 'active' class to show modal
      document.body.style.overflow = 'hidden';
    };

    span2.onclick = function() {
      modal2.classList.remove("active");
      document.body.style.overflow = 'auto';
    };

    // Updated close modal when clicking outside
    window.onclick = function(event) {
      if (event.target === modal2) {
        modal2.classList.remove("active");
        document.body.style.overflow = 'auto';
      }
    };
}); 

function copyEmailToClipboard() {
  // Create a dummy input to copy the email address from
  var dummy = document.createElement('input'),
      text = window.getSelection().toString();
  
  document.body.appendChild(dummy);
  dummy.value = text.length > 0 ? text : 'german@avakjan.ee'; // In case user selects some text, that will be copied instead of the email.
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  
  // Show the notification
  var notification = document.getElementById('emailCopyNotification');
  notification.style.display = 'block';
  
  // After 2 seconds, hide the notification
  setTimeout(function() {
    notification.style.display = 'none';
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function() {
  var images = document.querySelectorAll('.modal-content-architecture img');

  images.forEach(function(img) {
      img.style.cursor = 'zoom-in'; // Set initial cursor to indicate zoom-in action
      img.addEventListener('click', function() {
          // Get the bounding rectangle of the image
          var rect = img.getBoundingClientRect();
          // Get the center point of the viewport
          var viewportCenterX = window.innerWidth / 2;
          var viewportCenterY = window.innerHeight / 2;

          // Determine the transform-origin based on the position relative to the center
          var originX = (rect.left + rect.width / 2) > viewportCenterX ? '100%' : '0%';
          var originY = (rect.top + rect.height / 2) > viewportCenterY ? '100%' : '0%';

          // Set the transform-origin based on the position
          img.style.transformOrigin = `${originX} ${originY}`;

          // Check if the image is already zoomed-in
          if (img.classList.contains('zoomed-in')) {
              // If zoomed-in, zoom out
              img.classList.remove('zoomed-in');
              img.style.cursor = 'zoom-in';
          } else {
              // Remove zoom from all images
              images.forEach(function(innerImg) {
                  innerImg.classList.remove('zoomed-in');
                  innerImg.style.cursor = 'zoom-in';
              });
              // Zoom in the clicked image
              img.classList.add('zoomed-in');
              img.style.cursor = 'zoom-out';
          }
      });
  });

  // Close zoom on clicking elsewhere in the modal
  var modal = document.getElementById("myModal-architecture");
  modal.addEventListener('click', function(event) {
      if (!event.target.classList.contains('zoomed-in')) {
          images.forEach(function(img) {
              img.classList.remove('zoomed-in');
              img.style.cursor = 'zoom-in';
          });
      }
  });
});