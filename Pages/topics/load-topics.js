const API_URL = 'https://kool.krister.ee/chat/heapuderfoorum';

async function loadTopics() {
    const response = await fetch(API_URL);
    const allData = await response.json();
    const topics = allData.filter(item => item.type === "topic");

    const topicsContainer = document.querySelector('.topics');
    topicsContainer.innerHTML = '';

    topics.forEach(topic => {
        const topicElement = document.createElement('div');
        topicElement.innerHTML = `<a href="../posts/posts.html?topicId=${topic.id}">${topic.title}</a>`;
        topicsContainer.appendChild(topicElement);
    });
}

loadTopics();

const form = document.getElementById('topic-form');
const titleInput = document.getElementById('title');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const author = sessionStorage.getItem("username") || "Anonüümne";

    if (!title) {
        alert('Lisa pealkiri');
        return;
    }


    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "topic",
            title,
            author
        })
    });

    titleInput.value = "";
    loadTopics();
});
