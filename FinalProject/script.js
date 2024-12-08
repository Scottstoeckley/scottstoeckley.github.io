/**
 * Logs a message when the script is loaded.
 */
console.log("Script is loaded.");

/**
 * @description Automatically cycles through slideshow slides.
 */
let slideIndex = 0;
showSlides();

/**
 * Displays the current slide and advances to the next slide after a timeout.
 * @function
 */
function showSlides() {
    const slides = document.querySelectorAll(".slideshow .slide");
    slides.forEach(slide => slide.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length; // Loop through slides
    slides[slideIndex].classList.add("active");
    setTimeout(showSlides, 3000);
}

/**
 * Filters and sorts news articles based on user selection.
 * @function
 */
function filterNews() {
    const filterValue = document.getElementById("filter").value;
    const articles = Array.from(document.querySelectorAll(".news-list article"));

    // Sort articles based on the filter selection
    if (filterValue === "latest") {
        articles.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    } else if (filterValue === "events") {
        articles.sort((a, b) => (a.dataset.category === "events") ? -1 : 1);
    }

    const newsList = document.getElementById("news-list");
    newsList.innerHTML = "";
    articles.forEach(article => newsList.appendChild(article));

    articles.forEach(article => {
        article.style.display = (filterValue === "all" || article.dataset.category === filterValue) ? "block" : "none";
    });
}

/**
 * Adds a post to the community page and saves it to local storage.
 * @function
 * @returns {boolean} Returns false to prevent default form submission.
 */
function addPost() {
    const username = document.getElementById("username").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!username || !message) {
        alert("Both fields are required!");
        return false;
    }

    const post = { username, message };
    savePostToLocal(post);
    displayPost(post);
    document.getElementById("submission-form").reset();
    return false;
}

/**
 * Saves a post to local storage.
 * @function
 * @param {Object} post - The post to save.
 * @param {string} post.username - The username of the poster.
 * @param {string} post.message - The content of the post.
 */
function savePostToLocal(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

/**
 * Loads all posts from local storage and displays them on the page.
 * @function
 */
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(displayPost);
}

/**
 * Displays a post on the page.
 * @function
 * @param {Object} post - The post to display.
 * @param {string} post.username - The username of the poster.
 * @param {string} post.message - The content of the post.
 * @example
 * displayPost({ username: "John", message: "Hello World!" });
 */
function displayPost(post) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");
    postContainer.innerHTML = `
        <strong>${post.username}</strong>
        <p>${post.message}</p>
    `;
    document.getElementById("posts-container").appendChild(postContainer);
}
