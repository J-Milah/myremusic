const musicData = [
  { title: "オレンジ - Orange", artist: "SPYAIR", category: "J-POP", img: "/images/spyair-orange.png" },
  { title: "Kizuna No Kiseki", artist: "MAN WITH A MISSION & milet", category: "J-POP", img: "/images/man with mission-kizuna no kiseki.png" },
  { title: "ぎゅっと。- Gyutto", artist: "Mosawo", category: "J-POP", img: "/images/mosawo-gyutto.png" },
  { title: "Akuma No Ko", artist: "Ai Higuchi", category: "J-POP", img: "/images/ai higuchi-akuman no ko.png" },
  { title: "風のとおり道", artist: "Tayori", category: "J-POP", img: "/images/tayori.png" },
  { title: "Dynamite", artist: "BTS", category: "K-POP", img: "https://i.imgur.com/sample1.jpg" },
  { title: "How You Like That", artist: "BLACKPINK", category: "K-POP", img: "https://i.imgur.com/sample2.jpg" }
];

let currentCategory = "J-POP";

function renderMusicList(filter = "") {
  const list = document.getElementById("musicList");
  if (!list) {
    console.error("Element with ID 'musicList' not found");
    return;
  }

  list.innerHTML = "";

  const filteredItems = musicData
    .map((item, index) => ({ ...item, index }))
    .filter(item =>
      item.category === currentCategory &&
      (item.title.toLowerCase().includes(filter.toLowerCase()) ||
       item.artist.toLowerCase().includes(filter.toLowerCase()))
    );

  if (filteredItems.length === 0) {
    list.innerHTML = `<div class="no-results">No music found matching your criteria</div>`;
    return;
  }

  filteredItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "music-card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title} cover" loading="lazy" />
      <div class="music-info">
        <div class="title">${item.title}</div>
        <div class="artist">${item.artist}</div>
      </div>
    `;
    card.onclick = () => {
      window.location.href = `player.html?id=${item.index}`;
    };
    list.appendChild(card);
  });
}

function searchMusic() {
  const query = document.getElementById("searchInput")?.value || "";
  renderMusicList(query);
}

function filterCategory(cat) {
  if (cat === currentCategory) return;

  currentCategory = cat;

  // Update active button
  document.getElementById("jpopBtn")?.classList.remove("active");
  document.getElementById("kpopBtn")?.classList.remove("active");
  document.getElementById(`${cat.toLowerCase()}Btn`)?.classList.add("active");

  document.getElementById("searchInput").value = "";
  renderMusicList();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("jpopBtn")?.classList.add("active");
  document.getElementById("searchInput")?.addEventListener('input', searchMusic);
  renderMusicList();
});
