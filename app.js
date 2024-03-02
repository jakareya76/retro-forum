const discussContainer = document.getElementById("discuss-container");
const titleContainer = document.getElementById("title-container");
const markCount = document.getElementById("mark-count");

let mark = 0;
markCount.innerHTML = mark;

const loadPosts = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );

  const data = await res.json();

  const posts = data.posts;

  displayPosts(posts);
};

const displayPosts = (posts) => {
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.className = "bg-[#F3F3F5] flex gap-10 p-8 rounded-xl";
    postCard.innerHTML = `
        <!-- Profile -->
        <div>
          <div class="avatar ${post.isActive ? "online" : "offline"}">
            <div class="w-24 h-24 rounded-full">
              <img
                src="${post.image}"
              />
            </div>
          </div>
        </div>
      
        <!-- Text Area -->
        <div class="w-full">
          <!-- Top Area -->
          <div class="flex gap-5">
            <p class="text-[#12132de0] font-semibold"># ${post.category}</p>
            <p class="text-[#12132de0] font-semibold">
              Author : ${post.author.name}
            </p>
          </div>
          <h2 class="text-2xl text-[#12132D] font-semibold my-3">
           ${post.title}
          </h2>
          <p class="max-w-[550px] text-[#12132da1]">
           ${post.description}
          </p>
      
          <div class="w-full pb-5 border-b border-dashed"></div>
      
          <!-- Bottom Area -->
          <div class="flex items-center justify-between mt-5">
            <div class="flex gap-8">
              <div class="flex items-center gap-2">
                <img src="./images/icon-2.png" alt="icon" />
                <p class="text-xl text-gray-500">${post.comment_count}</p>
              </div>
              <div class="flex items-center gap-2">
                <img src="./images/tabler-icon-eye.png" alt="icon" />
                <p class="text-xl text-gray-500">${post.view_count}</p>
              </div>
              <div class="flex items-center gap-2">
                <img src="./images/icon.png" alt="icon" />
                <p class="text-xl text-gray-500"><span>${
                  post.posted_time
                }</span> min</p>
              </div>
            </div>
            <button onclick="markAsRead('${post.title}')">
              <img
                src="./images/email.png"
                alt="email"
                class="object-cover w-10"
              />
            </button>
          </div>
        </div>
        `;

    discussContainer.appendChild(postCard);
  });
};

const markAsRead = (title) => {
  const element = document.createElement("div");
  element.className =
    "flex items-center justify-between p-4 my-5 bg-white rounded-xl";

  element.innerHTML = `
    <h2 class="font-semibold">
        ${title}
    </h2>
    <div class="flex gap-1">
        <img src="./images/tabler-icon-eye.png" alt="eye" />
        <span>1,568</span>
    </div>
    `;

  mark++;
  markCount.innerHTML = mark;

  titleContainer.appendChild(element);
};

loadPosts();
