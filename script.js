let allPosts = [];

let likes = JSON.parse(localStorage.getItem("likes")) || {};

let views = JSON.parse(localStorage.getItem("views")) || {};


// =========================
// تحميل البيانات
// =========================
fetch("posts.json")
  .then(res => res.json())
  .then(data => {

    allPosts = data;

    displayPosts(allPosts);

    showFeatured(allPosts);

  });


// =========================
// عرض البوستات
// =========================
function displayPosts(posts){

    let container = document.querySelector(".posts");

    container.innerHTML = "";

    posts.forEach((post, index) => {

        container.innerHTML += `

        <div class="post-card" data-category="${post.category}">

            <img src="${post.image}" alt="${post.title}">

            <h3>${post.title}</h3>

            <p>${post.description}</p>

            <div class="post-info">

                <span class="category-tag">
                    ${post.category}
                </span>

                <span class="views">
                    👁 ${views[index] || 0}
                </span>

            </div>

            <div class="actions">

                <button onclick="likePost(${index})" class="like-btn">

                    ❤️ 
                    <span id="like-${index}">
                        ${likes[index] || 0}
                    </span>

                </button>

                <button onclick="openPost(${index})" class="read-btn">
                    Read More
                </button>

            </div>

        </div>

        `;
    });

}


// =========================
// فتح المقال
// =========================
function openPost(id){

    addView(id);

    window.location.href = "post.html?id=" + id;

}


// =========================
// زيادة المشاهدات
// =========================
function addView(id){

    if(!views[id]){

        views[id] = 0;

    }

    views[id]++;

    localStorage.setItem("views", JSON.stringify(views));

}


// =========================
// اللايك
// =========================
function likePost(id){

    if(!likes[id]){

        likes[id] = 0;

    }

    likes[id]++;

    localStorage.setItem("likes", JSON.stringify(likes));

    document.getElementById("like-" + id).innerText = likes[id];

}


// =========================
// فلترة البوستات
// =========================
function filterPosts(category){

    if(category === "all"){

        displayPosts(allPosts);

    } else {

        let filtered = allPosts.filter(post =>
            post.category === category
        );

        displayPosts(filtered);

    }

}


// =========================
// البحث
// =========================
document.querySelector(".search")
.addEventListener("input", function(e){

    let value = e.target.value.toLowerCase();

    let filtered = allPosts.filter(post =>

        post.title.toLowerCase().includes(value)

        ||

        post.description.toLowerCase().includes(value)

    );

    displayPosts(filtered);

});


// =========================
// Featured Article
// =========================
function showFeatured(posts){

    let featured = posts[0];

    let container = document.getElementById("featured");

    if(!container) return;

    container.innerHTML = `

        <img src="${featured.image}">

        <div class="featured-content">

            <h2>🔥 Featured Article</h2>

            <h3>${featured.title}</h3>

            <p>${featured.description}</p>

            <button onclick="openPost(0)">
                Read Full Article
            </button>

        </div>

    `;

}


// =========================
// Dark / Light Mode
// =========================
document.addEventListener("DOMContentLoaded", function(){

    let button = document.getElementById("toggleMode");

    if(button){

        button.addEventListener("click", function(){

            document.body.classList.toggle("light");

            if(document.body.classList.contains("light")){

                button.innerText = "☀️";

            } else {

                button.innerText = "🌙";

            }

        });

    }

});