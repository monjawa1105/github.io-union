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
  "SSR大吉✨ 推しが尊すぎる日",
  "UR中吉💖 神引き来るかも",
  "R小吉⭐ 推しを眺めよう",
  "N吉😊 まったり推し活",
  "爆死注意⚠️ でも推しは最高"
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

