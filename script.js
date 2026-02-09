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
  fortuneBtn.textContent = "今日は引きました";
 }

 fortuneBtn.addEventListener("click",()=>{
  if(fortuneBtn.disabled) return;

  const f = fortunes[Math.floor(Math.random()*fortunes.length)];
  fortuneResult.textContent = f;

  localStorage.setItem("fortuneDate", today);
  localStorage.setItem("fortuneResult", f);

  fortuneBtn.disabled = true;
  fortuneBtn.textContent = "今日は引きました";
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

