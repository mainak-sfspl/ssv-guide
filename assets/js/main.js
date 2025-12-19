
// Active nav highlight + scroll reveal + particles.
(function(){
  // active nav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a=>{
    const href = (a.getAttribute("href")||"").split("/").pop();
    if(href===path) a.classList.add("active");
  });

  // scroll reveal
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("visible");
    });
  }, {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

  // particles (very lightweight)
  const wrap = document.querySelector(".particles");
  if(wrap){
    const n = 22;
    for(let i=0;i<n;i++){
      const s=document.createElement("span");
      s.style.left = Math.random()*100 + "vw";
      s.style.animationDelay = (Math.random()*10) + "s";
      s.style.animationDuration = (10 + Math.random()*10) + "s";
      s.style.opacity = (0.12 + Math.random()*0.25).toFixed(2);
      wrap.appendChild(s);
    }
  }
})();
