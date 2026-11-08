document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".track");document.querySelectorAll(".arrows button").forEach(b=>b.addEventListener("click",()=>{if(t){const c=t.querySelector("blockquote");t.scrollBy({left:Number(b.dataset.dir)*(c.getBoundingClientRect().width+16),behavior:"smooth"})}}))});
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".nav-toggle").forEach(btn=>btn.addEventListener("click",e=>{e.preventDefault();const d=btn.closest(".nav-dropdown");const open=d.classList.toggle("is-open");btn.setAttribute("aria-expanded",String(open))}));document.addEventListener("click",e=>{if(!e.target.closest(".nav-dropdown"))document.querySelectorAll(".nav-dropdown.is-open").forEach(d=>{d.classList.remove("is-open");d.querySelector(".nav-toggle")?.setAttribute("aria-expanded","false")})})});
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".mobile-menu-toggle").forEach(btn=>{const nav=document.getElementById(btn.getAttribute("aria-controls"));if(!nav)return;btn.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");btn.setAttribute("aria-expanded",String(open));btn.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú")});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-label","Abrir menú")}))})});

document.addEventListener("DOMContentLoaded",()=>{const track=document.getElementById("products-carousel");if(!track)return;document.querySelectorAll("[data-products-dir]").forEach(btn=>btn.addEventListener("click",()=>{const card=track.querySelector(".product");if(!card)return;const gap=parseFloat(getComputedStyle(track).gap)||0;track.scrollBy({left:Number(btn.dataset.productsDir)*(card.getBoundingClientRect().width+gap),behavior:"smooth"})}))});

document.addEventListener("DOMContentLoaded",()=>{const track=document.getElementById("works-carousel");if(!track)return;document.querySelectorAll("[data-works-dir]").forEach(btn=>btn.addEventListener("click",()=>{const card=track.querySelector(".work-card");if(!card)return;const gap=parseFloat(getComputedStyle(track).gap)||0;track.scrollBy({left:Number(btn.dataset.worksDir)*(card.getBoundingClientRect().width+gap),behavior:"smooth"})}))});

document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("reviews-native-track");if(!t)return;document.querySelectorAll("[data-reviews-dir]").forEach(b=>b.addEventListener("click",()=>{const c=t.querySelector(".review-real-card");if(!c)return;t.scrollBy({left:Number(b.dataset.reviewsDir)*(c.getBoundingClientRect().width+(parseFloat(getComputedStyle(t).gap)||0)),behavior:"smooth"})}))});

/* Visor de fotos: instalaciones, programación y fichas de modelos. */
document.addEventListener("DOMContentLoaded",()=>{
 const selector="#works-carousel .work-card, #instalacion .arte-install-photo img, #programacion img, .t15-carousel-track .t15-slide img";
 const items=[...document.querySelectorAll(selector)].filter(el=>el.tagName==="IMG"||el.querySelector("img"));
 if(!items.length)return;
 const style=document.createElement("style");
 style.textContent=".arte-photo-viewer{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.94);padding:55px 48px;box-sizing:border-box}.arte-photo-viewer.is-open{display:flex}.arte-photo-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:5px}.arte-photo-viewer button{position:absolute;border:0;color:white;background:rgba(60,60,60,.75);cursor:pointer;width:42px;height:42px;border-radius:50%;font-size:28px}.arte-photo-close{top:12px;right:12px}.arte-photo-prev{left:8px;top:50%}.arte-photo-next{right:8px;top:50%}@media(max-width:600px){.arte-photo-viewer{padding:58px 12px}.arte-photo-viewer button{width:38px;height:38px}.arte-photo-prev{left:5px}.arte-photo-next{right:5px}}";
 document.head.append(style);
 const overlay=document.createElement("div");overlay.className="arte-photo-viewer";overlay.setAttribute("role","dialog");overlay.setAttribute("aria-modal","true");overlay.setAttribute("aria-label","Visor de fotografías");
 overlay.innerHTML='<button type="button" class="arte-photo-close" aria-label="Cerrar imagen">×</button><button type="button" class="arte-photo-prev" aria-label="Foto anterior">‹</button><img alt=""><button type="button" class="arte-photo-next" aria-label="Foto siguiente">›</button>';
 document.body.append(overlay);
 const photo=overlay.querySelector("img");let current=0;let previousFocus=null;let startX=null;
 function show(n){current=(n+items.length)%items.length;const item=items[current],img=item.tagName==="IMG"?item:item.querySelector("img");photo.src=img.currentSrc||img.src;photo.alt=img.alt||"Fotografía de Cerrajería Arte";}
 function close(){overlay.classList.remove("is-open");document.body.style.overflow="";photo.removeAttribute("src");if(previousFocus)previousFocus.focus();}
 function move(n){show(current+n);}
 items.forEach((item,i)=>{item.style.cursor="zoom-in";if(item.tagName==="IMG"){item.setAttribute("tabindex","0");item.setAttribute("role","button");item.setAttribute("aria-label","Ampliar imagen");}
 item.addEventListener("click",e=>{e.preventDefault();previousFocus=document.activeElement;show(i);overlay.classList.add("is-open");document.body.style.overflow="hidden";overlay.querySelector(".arte-photo-close").focus();});
 item.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();item.click();}});
 if(item.tagName==="A"){item.removeAttribute("target");}
 });
 overlay.querySelector(".arte-photo-close").addEventListener("click",close);
 overlay.querySelector(".arte-photo-prev").addEventListener("click",()=>move(-1));
 overlay.querySelector(".arte-photo-next").addEventListener("click",()=>move(1));
 overlay.addEventListener("click",e=>{if(e.target===overlay)close();});
 document.addEventListener("keydown",e=>{if(!overlay.classList.contains("is-open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1);});
 overlay.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;},{passive:true});
 overlay.addEventListener("touchend",e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)move(dx<0?1:-1);startX=null;},{passive:true});
});
