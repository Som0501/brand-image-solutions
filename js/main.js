/* Brand Image Solutions - interactions */
(function(){
  "use strict";
  const $=(s,c)=>(c||document).querySelector(s), $$=(s,c)=>[...(c||document).querySelectorAll(s)];
  const V="videos/edited_media/";
  const poster=f=>V+"stills/"+f.replace(/^.*\//,"").replace(".mp4",".jpg");
  if(window.AOS) AOS.init({duration:800,easing:"ease-out-cubic",once:true,offset:60});

  /* nav */
  const nav=$("#nav"), burger=$("#burger");
  addEventListener("scroll",()=>{ nav.classList.toggle("is-stuck",scrollY>40);
    const h=document.documentElement; $("#progressFill").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"; },{passive:true});
  burger.addEventListener("click",()=>{ const o=nav.classList.toggle("is-open"); burger.setAttribute("aria-expanded",o); });
  $$(".menu a").forEach(a=>a.addEventListener("click",()=>{ nav.classList.remove("is-open"); burger.setAttribute("aria-expanded",false); }));

  /* lazy background video (craft) */
  new IntersectionObserver((es)=>es.forEach(e=>{ const v=e.target;
    if(e.isIntersecting){ if(v.dataset.src&&!v.src)v.src=v.dataset.src; v.play&&v.play().catch(()=>{}); } else v.pause&&v.pause();
  }),{threshold:.2}).observe($("video[data-lazy]"));

  /* data */
  const LIGHTS=[
    {src:"loops/06-absolut-neon-bottles.mp4",brand:"Absolut",type:"Neon bottle wall"},
    {src:"loops/08-absolut-equalizer.mp4",brand:"Absolut",type:"LED equaliser"},
    {src:"loops/07-ballantines-led-storefront.mp4",brand:"Ballantine's",type:"LED storefront"},
    {src:"loops/30-soorahi-led-sign.mp4",brand:"Soorahi",type:"Illuminated sign"},
    {src:"loops/27-seagrams-xclamation-neon.mp4",brand:"Seagram's Xclamation",type:"Neon"},
    {src:"loops/24-glenfiddich-logo.mp4",brand:"Glenfiddich",type:"Brand film"}
  ];
  const WORK=[
    {src:"loops/31-full-store-walkthrough.mp4",brand:"Premium Shops",type:"Complete fit-out",f:"shops"},
    {img:"images/site/hero-3-glenfiddich.jpg",brand:"Glenfiddich",type:"Event bar",f:"glenfiddich"},
    {src:"loops/05-jameson-solemates-podium.mp4",brand:"Jameson",type:"Illuminated podium",f:"jameson"},
    {img:"images/site/work-chivas.jpg",brand:"Chivas · Glenlivet",type:"Shop counter",f:"chivas"},
    {src:"loops/28-glenlivet-trolley.mp4",brand:"The Glenlivet",type:"Marble trolley",f:"glenlivet"},
    {src:"loops/33-hundred-pipers-wall.mp4",brand:"100 Pipers",type:"Backlit wall",f:"pipers"},
    {img:"images/site/work-blenders.jpg",brand:"Blenders Pride",type:"Retail aisle",f:"seagram"},
    {src:"loops/26-blenders-pride-expo.mp4",brand:"Blenders Pride",type:"Exhibition booth",f:"seagram"},
    {src:"loops/10-absolut-celebrate-cart.mp4",brand:"Absolut",type:"Celebrate bar cart",f:"absolut"},
    {img:"images/site/work-jameson.jpg",brand:"Jameson",type:"Shop interior",f:"jameson"},
    {src:"loops/17-shop-glass-displays.mp4",brand:"Premium Shops",type:"Glass displays",f:"shops"},
    {img:"images/site/work-talisker.jpg",brand:"Talisker",type:"Island display",f:"shops"},
    {src:"loops/30-soorahi-led-sign.mp4",brand:"Soorahi",type:"Illuminated sign",f:"soorahi"},
    {src:"loops/36-hundred-pipers-lounge.mp4",brand:"100 Pipers",type:"Lounge build",f:"pipers"},
    {img:"images/site/work-shopfloor.jpg",brand:"Premium Shops",type:"Duty-free floor",f:"shops"}
  ];
  const REELS=[
    ["reels/37-glenfiddich-lounge.mp4","Glenfiddich · Lounge"],
    ["reels/01-glenfiddich-stag-wall.mp4","Glenfiddich · Stag wall"],
    ["reels/21-absolut-infinity-mirror.mp4","Absolut · Infinity mirror"],
    ["reels/19-copper-pipe-craft.mp4","In-house · Copper craft"],
    ["reels/13-absolut-bottle-shelf.mp4","Absolut · Bottle shelf"],
    ["reels/04-soorahi-launch-stage.mp4","Soorahi · Launch stage"],
    ["reels/02-premium-shop-interior.mp4","Shops · Interior"]
  ];
  const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* build a landscape media tile (video or image) */
  function tile(item,list,i){
    const el=document.createElement("div"); el.className="m-tile"; if(item.f) el.dataset.f=item.f;
    const pos=item.img||poster(item.src);
    el.innerHTML=`<img src="${pos}" alt="${item.brand}, ${item.type}" loading="lazy">`+
      (item.src?`<video muted loop playsinline preload="none" poster="${pos}"></video><span class="m-tile__play">&#9654;</span>`:"")+
      `<div class="m-tile__cap"><span class="m-tile__brand">${item.brand}</span><span class="m-tile__type">${item.type}</span></div>`;
    if(item.src){ const v=el.querySelector("video");
      const play=()=>{ if(!v.src)v.src=V+item.src; v.play().then(()=>el.classList.add("is-playing")).catch(()=>{}); };
      const stop=()=>{ v.pause(); el.classList.remove("is-playing"); };
      if(fine){ el.addEventListener("mouseenter",play); el.addEventListener("mouseleave",stop); }
    }
    el.addEventListener("click",()=>openLbx(list,i));
    return el;
  }
  const lg=$("#lightsGrid"); LIGHTS.forEach((it,i)=>lg.appendChild(tile(it,LIGHTS,i)));
  const wg=$("#workGrid"); const wtiles=WORK.map((it,i)=>{ const t=tile(it,WORK,i); wg.appendChild(t); return t; });

  /* filters */
  $$(".chip").forEach(c=>c.addEventListener("click",()=>{
    $$(".chip").forEach(x=>{ x.classList.remove("is-on"); x.setAttribute("aria-pressed",false); });
    c.classList.add("is-on"); c.setAttribute("aria-pressed",true);
    const f=c.dataset.filter;
    wtiles.forEach((t,i)=>t.classList.toggle("is-hidden", !(f==="all"||WORK[i].f===f)));
  }));

  /* reels */
  const rt=$("#reelTrack");
  REELS.forEach(([src,cap],i)=>{
    const r=document.createElement("div"); r.className="reel";
    r.innerHTML=`<img src="${poster(src)}" alt="" loading="lazy"><video muted loop playsinline preload="none" poster="${poster(src)}"></video><span class="reel__cap">${cap}</span>`;
    const v=r.querySelector("video");
    const play=()=>{ if(!v.src)v.src=V+src; v.play().then(()=>r.classList.add("is-playing")).catch(()=>{}); };
    const stop=()=>{ v.pause(); r.classList.remove("is-playing"); };
    if(fine){ r.addEventListener("mouseenter",play); r.addEventListener("mouseleave",stop); }
    else new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?play():stop()),{threshold:.6}).observe(r);
    r.addEventListener("click",()=>openLbx(REELS.map(x=>({src:x[0],brand:x[1].split(" · ")[0],type:x[1].split(" · ")[1]||""})),i));
    rt.appendChild(r);
  });

  /* lightbox */
  const lbx=$("#lbx"),box=$("#lbxMedia"),lb=$("#lbxBrand"),lt=$("#lbxType"),lc=$("#lbxCount");
  let LIST=[],idx=0;
  function openLbx(list,i){ LIST=list; idx=i; render(); if(!lbx.open) lbx.showModal(); }
  function render(){ const it=LIST[idx]; box.innerHTML="";
    if(it.src){ const v=document.createElement("video"); v.src=V+it.src; v.controls=v.autoplay=v.loop=v.playsInline=true; v.poster=poster(it.src); box.appendChild(v); }
    else { const im=document.createElement("img"); im.src=it.img; im.alt=it.brand; box.appendChild(im); }
    lb.textContent=it.brand||""; lt.textContent=it.type||"";
    lc.textContent=LIST.length>1?String(idx+1).padStart(2,"0")+" / "+String(LIST.length).padStart(2,"0"):"";
  }
  const go=d=>{ idx=(idx+d+LIST.length)%LIST.length; render(); };
  $("#lbxNext").addEventListener("click",()=>go(1));
  $("#lbxPrev").addEventListener("click",()=>go(-1));
  $("#lbxClose").addEventListener("click",()=>lbx.close());
  lbx.addEventListener("click",e=>{ if(e.target===lbx) lbx.close(); });
  lbx.addEventListener("close",()=>box.innerHTML="");
  addEventListener("keydown",e=>{ if(!lbx.open)return; if(e.key==="ArrowRight")go(1); if(e.key==="ArrowLeft")go(-1); });

  /* contact -> WhatsApp */
  $("#form").addEventListener("submit",e=>{ e.preventDefault();
    const n=$("#f-name").value.trim(),c=$("#f-company").value.trim(),m=$("#f-msg").value.trim(),s=$("#formStatus");
    if(!n||!m){ s.textContent="Please add your name and a short brief."; return; }
    const t=`Hi Brand Image Solutions,%0A%0AName: ${encodeURIComponent(n)}%0A`+(c?`Brand/Company: ${encodeURIComponent(c)}%0A`:"")+`%0A${encodeURIComponent(m)}`;
    s.textContent="Opening WhatsApp...";
    window.open(`https://wa.me/919811040405?text=${t}`,"_blank","noopener");
    setTimeout(()=>{ s.textContent="Chat opened. If nothing happened, message us at +91 98110 40405."; },800);
  });

  $("#year").textContent=new Date().getFullYear();
})();
