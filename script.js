// メニュー
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

btn.onclick = () =>{
 menu.style.display = 
 menu.style.display === "block" ? "none" : "block";
};

// スクロール
document.querySelectorAll("nav a").forEach(a=>{
 a.onclick = e=>{
  e.preventDefault();
  document.querySelector(a.getAttribute("href"))
  .scrollIntoView({behavior:"smooth"});
  menu.style.display="none";
 };
});

// トップへ
document.getElementById("topBtn").onclick=()=>{
 window.scrollTo({top:0,behavior:"smooth"});
};

// 経過日数
document.querySelectorAll(".days").forEach(el=>{
 const start = new Date(el.dataset.date);
 const now = new Date();
 const diff = Math.floor((now-start)/(1000*60*60*24));
 el.textContent = diff;
});
// ✨キラキラアニメ
const canvas = document.getElementById("sparkle");
const ctx = canvas.getContext("2d");

function resize(){
 canvas.width = innerWidth;
 canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const sparkles = [];

for(let i=0;i<80;i++){
 sparkles.push({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  size:Math.random()*2+1,
  speed:Math.random()*0.5+0.2,
  alpha:Math.random()
 });
}

function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);

 sparkles.forEach(s=>{
  ctx.beginPath();
  ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
  ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
  ctx.fill();

  s.y -= s.speed;
  if(s.y < 0){
    s.y = canvas.height;
    s.x = Math.random()*canvas.width;
  }
 });

 requestAnimationFrame(animate);
}

animate();

// スクロール表示
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  reveals.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    const winH = window.innerHeight;

    if(top < winH - 100){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==== おみくじ（1日1回） ====
const fortuneBtn = document.getElementById("fortuneBtn");
const fortuneResult = document.getElementById("fortuneResult");

if(fortuneBtn && fortuneResult){

 const fortunes=[
  "大吉 神引き確定！",
  "吉 イシツブテポーズ確定！",
  "中吉 儀式確定！",
  "小吉 KPゲットだぜ！",
  "半吉 顎が出ている",
  "末吉 （壁によりかかる）",
  "末小吉 様子がおかしい",
  "凶 セブンスドゲザーフ確定！",
  "大凶 えれみーた時空発生！"
 ];

 const today = new Date().toDateString();
 const savedDate = localStorage.getItem("fortuneDate");
 const savedResult = localStorage.getItem("fortuneResult");

 if(savedDate === today && savedResult){
  fortuneResult.textContent = savedResult;
  fortuneBtn.disabled = true;
  fortuneBtn.textContent = "今日はもう引きました";
 }

 fortuneBtn.addEventListener("click",()=>{
  if(fortuneBtn.disabled) return;

  const f = fortunes[Math.floor(Math.random()*fortunes.length)];
  fortuneResult.textContent = f;

  localStorage.setItem("fortuneDate", today);
  localStorage.setItem("fortuneResult", f);

  fortuneBtn.disabled = true;
  fortuneBtn.textContent = "今日はもう引きました";
 });

}
const cursor = document.getElementById("emojiCursor");

document.addEventListener("mousemove", (e)=>{
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

function createHearts(x, y){
  const colors = ['#ff4fbf','#ff69b4','#ffd700','#ff7ad9']; // カラフル
  const count = 40; // ハートの数
  for(let i=0; i<count; i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '♡';
    heart.style.color = colors[Math.floor(Math.random()*colors.length)];

    // ランダムに飛ぶ
    const randX = (Math.random() - 0.5) * 400; // 左右
    const randY = -Math.random() * 400 - 100;  // 上方向
    const randScale = Math.random() * 0.8 + 0.8; // 0.8〜1.6倍
    const randRotate = Math.random() * 360 + 'deg'; // 回転

    heart.style.setProperty('--x', randX + 'px');
    heart.style.setProperty('--y', randY + 'px');
    heart.style.setProperty('--scale', randScale);
    heart.style.setProperty('--rotate', randRotate);

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    document.body.appendChild(heart);

    setTimeout(()=> heart.remove(), 1500); // 1.5秒で消える
  }
}

document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',(e)=>{
    const rect = card.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    createHearts(x, y);
  });
});

function createPoos(x, y){
  const count = 30; // 💩の数
  for(let i=0; i<count; i++){
    const poo = document.createElement('div');
    poo.className = 'poo';
    poo.textContent = '💩';

    // ランダムに飛ばす
    const randX = (Math.random() - 0.5) * 400; // 左右
    const randY = -Math.random() * 400 - 100;  // 上方向
    const randScale = Math.random() * 0.8 + 0.8;
    const randRotate = Math.random() * 360 + 'deg';

    poo.style.setProperty('--x', randX + 'px');
    poo.style.setProperty('--y', randY + 'px');
    poo.style.setProperty('--scale', randScale);
    poo.style.setProperty('--rotate', randRotate);

    poo.style.left = x + 'px';
    poo.style.top = y + 'px';

    document.body.appendChild(poo);

    // 1.5秒後に削除
    setTimeout(()=> poo.remove(), 1500);
  }
}

// 用語集カードにクリックイベント
document.querySelectorAll('.glossary-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const rect = card.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    createPoos(x, y);
  });
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      if(entry.target.classList.contains('card-left-init')){
        entry.target.classList.add('left-show');
      } else if(entry.target.classList.contains('card-right-init')){
        entry.target.classList.add('right-show');
      } else if(entry.target.classList.contains('glossary-card-left')){
        entry.target.classList.add('left-show');
      } else if(entry.target.classList.contains('glossary-card-right')){
        entry.target.classList.add('right-show');
      }
      observer.unobserve(entry.target); // 一度だけ発動
    }
  });
}, { threshold: 0.2 }); // 20%見えたら発火

document.querySelectorAll('.card').forEach(card => observer.observe(card));

document.querySelectorAll('.glossary-card').forEach(card => observer.observe(card));

// 🌠 流れ星生成
setInterval(()=>{
  if(Math.random() < 0.3){ // 出現確率
    createStar();
  }
},5000);

function createStar(){
  const star = document.createElement("div");
  star.className = "shooting-star";
  star.textContent = "⭐";

  star.style.top = Math.random()*50 + "vh";

  star.addEventListener("click",()=>{
    star.remove();
    triggerStarEffect();
  });

  document.body.appendChild(star);
  setTimeout(()=>star.remove(),5000);
}

// ✨ クリック時の特殊演出
function triggerStarEffect(){

  // 画面フラッシュ
  const flash = document.createElement("div");
  flash.className = "star-effect";
  document.body.appendChild(flash);
  setTimeout(()=>flash.remove(),800);

  // ハート大量発生
  for(let i=0;i<40;i++){
    const heart = document.createElement("span");
    heart.textContent = "🌟";
    heart.className = "heart";

    heart.style.left = Math.random()*100+"vw";
    heart.style.top = Math.random()*100+"vh";

    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),1500);
  }

}

let currentSlide = 0;

const slidesTrack = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

document.querySelector(".next").addEventListener("click",()=>{
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

document.querySelector(".prev").addEventListener("click",()=>{
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

function updateSlide(){
  slidesTrack.style.transform =
    `translateX(-${currentSlide * 100}%)`;
}



document.addEventListener("DOMContentLoaded",()=>{

  /* ===== ランダム並び替え ===== */

  const slidesContainer = document.querySelector(".slides");
  const slideElems = Array.from(document.querySelectorAll(".slide"));

  function shuffle(array){
    for(let i=array.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [array[i],array[j]] = [array[j],array[i]];
    }
  }

  shuffle(slideElems);

  slideElems.forEach(slide=>{
    slidesContainer.appendChild(slide);
  });

  // X埋め込み再読み込み
  if(window.twttr){
    twttr.widgets.load();
  }

  /* ===== スライド処理 ===== */

  let currentSlide = 0;
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  document.querySelector(".next").addEventListener("click",()=>{
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  });

  document.querySelector(".prev").addEventListener("click",()=>{
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  });

  function updateSlide(){
    slides.style.transform =
      `translateX(-${currentSlide * 100}%)`;
  }

});

window.addEventListener("load",()=>{

  setTimeout(()=>{
    document
      .getElementById("loadingScreen")
      .classList.add("fade-out");

    // ★ユニオン文字起動
    startLogoAnimation();

  },1500);

});
//localStorage.clear()
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("gachaBtn");
  const result = document.getElementById("gachaResult");
  const imgContainer = document.getElementById("gachaImageContainer");

  const images = [
    //"img/IMG_2241.JPG",
    "img/IMG_2243.JPG",
    //"img/IMG_2244.JPG",
    "img/IMG_2245.JPG",
    "img/IMG_2246.JPG",
    "img/IMG_2247.JPG",
    "img/IMG_2248.JPG",
    "img/IMG_2278.JPG",
    "img/IMG_2279.JPG",
    "img/IMG_2280.JPG",
    "img/IMG_2281.JPG",
    "img/IMG_2282.JPG",
    "img/IMG_2283.JPG",
    "img/IMG_2364.JPG",
    "img/IMG_2365.JPG",
    "img/IMG_2366.JPG",
    "img/IMG_2367.JPG",
    "img/IMG_2368.JPG",
    "img/IMG_2369.JPG",
    "img/IMG_2370.JPG",
    "img/IMG_2371.JPG",
    "img/IMG_2372.JPG"
  ];

  const today = new Date().toLocaleDateString("sv-SE");
  const savedDate = localStorage.getItem("gachaDate");
  const savedImg = localStorage.getItem("gachaImg");

  function showGacha(imgSrc) {
  imgContainer.innerHTML = "";
  result.textContent = "";

  const card = document.createElement("div");
  card.className = "gacha-card float glow rainbow-glow";

  const img = document.createElement("img");
  img.src = imgSrc;
  img.style.maxWidth = "400px";
  img.style.transform = "rotate(0deg)";

  card.appendChild(img);
  imgContainer.appendChild(card);

  // 作者名
const name = document.createElement("p");
name.textContent = "作者：らんらんるぅー";
name.className = "gacha-author";

// Xリンク
const link = document.createElement("a");
link.href = "https://x.com/ranranru_nikke";
link.target = "_blank";
link.textContent = "Xはこちら";
link.className = "gacha-xlink";

// 👉 カードの外に追加
imgContainer.appendChild(name);
imgContainer.appendChild(link);


  // 🌈 虹色紙吹雪
  const colors = ["#ff0000","#ff7f00","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"];

  const rect = card.getBoundingClientRect();

  for(let i=0;i<40;i++){
    const p = document.createElement("span");
    p.className = "gacha-particle";
    p.textContent = "☆";

    p.style.color = colors[Math.floor(Math.random()*colors.length)];

    p.style.left = rect.left + rect.width/2 + "px";
    p.style.top  = rect.top  + rect.height/2 + "px";

    p.style.setProperty("--x",(Math.random()*300-150)+"px");
    p.style.setProperty("--y",(Math.random()*300-150)+"px");
    p.style.setProperty("--r",(Math.random()*360)+"deg");
    p.style.setProperty("--s",(Math.random()*1+0.5));

    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1500);
  }

  setTimeout(() => card.classList.remove("glow"), 1000);
}



  // すでに引いている場合
  if(savedDate === today && savedImg){
    showGacha(savedImg);
    btn.textContent = "今日はもう引きました";
    btn.disabled = true;
  } else {
    result.textContent = "ボタンを押してね！";
  }

  // ボタンクリック
  btn.addEventListener("click", () => {
    const randomImg = images[Math.floor(Math.random()*images.length)];

    showGacha(randomImg);

    // 保存
    localStorage.setItem("gachaDate", today);
    localStorage.setItem("gachaImg", randomImg);

    btn.textContent = "今日はもう引きました";
    btn.disabled = true;
  });
});


let tapCount = 0;
let startY = 0;

// 指を置いた位置
document.addEventListener("touchstart", e=>{
  startY = e.touches[0].clientY;
},{ passive:true });

// 指を離した時
document.addEventListener("touchend", e=>{
  const endY = e.changedTouches[0].clientY;

  // 動きが小さければタップ
  if(Math.abs(endY - startY) < 10){
    poopTap();
  }
},{ passive:true });

// PCクリック
document.addEventListener("click", poopTap);

function poopTap(){
  tapCount++;

  if(tapCount === 5){
    spawnBigPoop();
  }

  if(tapCount === 10){
    spawnPoopRain();
    tapCount = 0;
  }
}

// 💩中央にドーン
function spawnBigPoop(){
  const poop = document.createElement("div");
  poop.textContent = "💩";
  poop.className = "big-poop";
  document.body.appendChild(poop);
  setTimeout(()=>poop.remove(),1500);
}

// 💩上から大量落下
function spawnPoopRain(){
  for(let i=0;i<40;i++){
    const poop = document.createElement("span");
    poop.textContent = "💩";
    poop.className = "poop-fall";
    poop.style.left = Math.random()*100 + "vw";
    poop.style.animationDelay = Math.random()*0.5 + "s";
    document.body.appendChild(poop);
    setTimeout(()=>poop.remove(),2000);
  }
}


const union = document.getElementById("logo");

union.addEventListener("click", ()=>{

  const love = document.createElement("div");
  love.textContent = "(    ᷄ᾥ ᷅  🫶🏻) 𝑩𝑰𝑮 𝑳𝑶𝑽𝑬______💓";
  love.className = "big-love";
  document.body.appendChild(love);

  setTimeout(()=>love.remove(),1500);
});


const kiriTargets = [
  // 100の倍数
  100,200,300,400,500,600,700,800,900,1000,
  1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,
  2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,
  3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,
  4100,4200,4300,4400,4500,4600,4700,4800,4900,5000,
  5100,5200,5300,5400,5500,5600,5700,5800,5900,6000,
  6100,6200,6300,6400,6500,6600,6700,6800,6900,7000,
  7100,7200,7300,7400,7500,7600,7700,7800,7900,8000,
  8100,8200,8300,8400,8500,8600,8700,8800,8900,9000,
  9100,9200,9300,9400,9500,9600,9700,9800,9900,10000,

  // ゾロ目
  111,222,333,444,555,666,777,888,999,
  1111,2222,3333,4444,5555,6666,7777,8888,9999,

  404,810,912,1234,4321,2525,4649,3281,1104,801,2424,
];

function showKiriBan(num){
  document.getElementById("kiriNumber").textContent =
    `${num} 人目の訪問者です！`;

  document.getElementById("kiriOverlay").style.display = "flex";
}

function closeKiri(){
  document.getElementById("kiriOverlay").style.display = "none";
}

