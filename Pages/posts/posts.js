const API_URL = 'https://kool.krister.ee/chat/heapuderfoorum';

async function loadPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topicId');

    const response = await fetch(API_URL);
    const allData = await response.json();
    const posts = allData.filter(item => item.type === 'post' && item.topicId === topicId);

    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p><strong>${post.author}</strong> (${post.date}):</p>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

loadPosts();

const postForm = document.getElementById('post-form');
const postText = document.getElementById('post-text');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = postText.value.trim();
    if (!content) {
        alert('Postitus ei tohi olla tühi');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topicId');
    const author = sessionStorage.getItem("username") || "Anonüümne";

    const post = {
        type: "post",
        content,
        author,
        date: new Date().toLocaleString(),
        topicId
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    postText.value = '';
    loadPosts();
});
