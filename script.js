let allPosts = [];
let likes = JSON.parse(localStorage.getItem("likes")) || {};
let views = JSON.parse(localStorage.getItem("views")) || {};

fetch("posts.json")
  .then(res => res.json())
  .then(data => {
    allPosts = data;
    displayPosts(allPosts);
    showFeatured(allPosts);
    document.getElementById("loader").style.display = "none";
  })
  .catch(err => {
    console.error("Error loading JSON:", err);
    document.getElementById("loader").style.display = "none";
  });

function displayPosts(posts){
    let container = document.querySelector(".posts");
    if(!container) return; 
    container.innerHTML = "";

    posts.forEach((post) => {
        let actualIndex = allPosts.indexOf(post); 
        container.innerHTML += `
        <div class="post-card" data-category="${post.category}">
            <img src="${post.image}" alt="${post.title}">
            <a href="post.html?id=${actualIndex}" style="text-decoration:none; color:inherit;">
                <h3>${post.title}</h3>
            </a>
            <p>${post.description}</p>
            <div class="post-info" style="display:flex; justify-content:space-between; padding:0 10px; color:#aaa; font-size:14px;">
                <span class="category-tag">${post.category}</span>
                <span class="views">👁 ${views[actualIndex] || 0}</span>
            </div>
            <div class="actions">
                <button onclick="likePost(${actualIndex})" class="like-btn">
                    ❤️ <span id="like-${actualIndex}">${likes[actualIndex] || 0}</span>
                </button>
                <a href="post.html?id=${actualIndex}" class="read-btn" style="text-decoration:none;">
                    Read More
                </a>
            </div>
        </div>
        `;
    });
}

function likePost(id){
    if(!likes[id]) likes[id] = 0;
    likes[id]++;
    localStorage.setItem("likes", JSON.stringify(likes));
    let likeSpan = document.getElementById("like-" + id);
    if(likeSpan) likeSpan.innerText = likes[id];
}

function filterPosts(category){
    if(category === "all"){
        displayPosts(allPosts);
    } else {
        let filtered = allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        displayPosts(filtered);
    }
}

function showFeatured(posts){
    let featured = posts[0];
    let container = document.getElementById("featured");
    if(!container || !featured) return;
    container.innerHTML = `
        <img src="${featured.image}">
        <div class="featured-content" style="padding: 20px;">
            <h2>🔥 Featured Article</h2>
            <h3>${featured.title}</h3>
            <p>${featured.description}</p>
            <a href="post.html?id=0" style="padding:10px 20px; background:#00ff88; border:none; border-radius:10px; text-decoration:none; color:black; display:inline-block;">
                Read Full Article
            </a>
        </div>
    `;
}
