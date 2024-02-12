document.addEventListener('DOMContentLoaded', () => {
    // Options for the IntersectionObserver
    const options = {
      root: null, // Use the viewport as the root
      threshold: 0, // Percentage of target's visibility the observer's callback should execute
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


    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the link that opens the modal
    var imgLink = document.getElementById("myImgLink");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the image, open the modal
    imgLink.onclick = function(event) {
      event.preventDefault(); // Prevent default anchor action
      modal.style.display = "flex"; // Use 'flex' to enable center alignment
      document.body.style.overflow = 'hidden'; // Disable body scroll
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
      document.body.style.overflow = 'auto'; // Re-enable body scroll
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // Re-enable body scroll
      }
    }
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