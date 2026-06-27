const projects = [

 {
    title: "PlayNexa (Gaming platform)",
    description: "My latest practice project — PlayNexa, a gaming website built using HTML, CSS, JavaScript,PHP, and MySQL.",
    imageUrl: "./images/logo_playnexa1.jpg",
    liveUrl: "https://playnexa.kesug.com", // Replace with your actual deployed URL when ready
    codeUrl: "https://github.com/ankush-kashyap/PalyNexa.git" // Replace with your actual GitHub repo
  },

  {
    title: "E-commerce Website Concept",
    description: "A concept design and front-end implementation for an e-commerce platform. Focused on a clean UI, responsive product grids, and a streamlined checkout process using modern CSS techniques.",
    imageUrl: "./images/logo_weather.jpg", // Make sure to add this image to your 'images' folder!
    liveUrl: "#", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/your-username/ecommerce-repo" // Replace with your repo link
  },

  {
    title: "Habit tracker",
    description: "A client-side task management application built with vanilla JavaScript. Allows users to add, edit, delete, and mark tasks as complete, with all data saved to localStorage.",
    imageUrl: "./images/logo_habit_tracker1.jpg",
    liveUrl: "https://habitrackeranx.netlify.app/",
    codeUrl: "https://github.com/ankush-kashyap/habit_tracker.git" 
  }
];

const themeToggle = document.querySelector('#theme-toggle');
const htmlElement = document.documentElement;
const projectsContainer = document.querySelector('.projects-container');
const contactForm = document.querySelector('#contact');
const formStatus = document.querySelector('#form-status');


const renderProjects = () => {
  let allProjectsHTML = '';

  projects.forEach(project => {
    allProjectsHTML += `
      <div class="project-card">
        <div class="project-image-container">
          <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a href="${project.liveUrl}" class="btn" target="_blank">Live Demo</a>
            <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank">View Code</a>
          </div>
        </div>
      </div>
    `;
  });

  projectsContainer.innerHTML = allProjectsHTML;
};

document.addEventListener('DOMContentLoaded', () => {

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      // This is a modern way to get all form fields.
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; // You could add an .info style for this
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        // We tell Formspree we want to receive a JSON response.
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if (response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        // Re-enable the submit button regardless of success or failure.
        submitButton.disabled = false;
      });
    });
  }

   renderProjects();
});

themeToggle.addEventListener('click', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

(() => {
  const savedTheme = localStorage.getItem('theme');
 if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
  }
})();


const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});