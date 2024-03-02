const discussContainer = document.getElementById("discuss-container");
const titleContainer = document.getElementById("title-container");
const markCount = document.getElementById("mark-count");
const latestPostContainer = document.getElementById("latest-post-container");

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
    postCard.className =
      "bg-[#F3F3F5] flex flex-col gap-10 p-8 rounded-xl md:flex-row";
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
          <div class="flex flex-col md:items-center md:justify-between gap-4 mt-5 md:flex-row">
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

const loadLatestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );

  const data = await res.json();

  data.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.className = "p-5 border-2 rounded-xl";

    postCard.innerHTML = `
        <img
            src="${post.cover_image}"
            alt="img"
            class="rounded-2xl"
        />
        <div class="flex gap-2 mx-2 my-4">
            <img src="./images/Frame.png" alt="" />
            <p class="text-[#12132d93] font-medium">${
              post.author.posted_date
                ? post.author.posted_date
                : "No publish date"
            }</p>
        </div>
        <h2 class="text-xl font-bold text-[#12132D]">
           ${post.title}
        </h2>
        <p class="my-3 mr-8 text-gray-500">
           ${post.description}
        </p>

        <div class="flex gap-4 mt-4">
            <img
            src="${post.profile_image}"
            alt=""
            class="w-16 h-16 rounded-full"
            />
            <div>
            <h3 class="text-lg font-semibold">${post.author.name}</h3>
            <p class="text-gray-500">${
              post.author.designation ? post.author.designation : "Unknown"
            }</p>
            </div>
        </div>
    `;

    latestPostContainer.appendChild(postCard);
  });
};

loadLatestPost();
loadPosts();
