(function(){
"use strict";
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
var MOB=matchMedia("(max-width:820px),(max-height:430px)");
var HASH0=parseInt((location.hash||"").slice(1),10);
var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;

/* ------------------------------------------------ cursor em dois tons */
var cur=$("#cur"),dot=$("#dot"),glows=$$(".glw");
var tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty,gx=tx,gy=ty;
addEventListener("mousemove",function(e){
  tx=e.clientX;ty=e.clientY;
  dot.style.transform="translate3d("+tx+"px,"+ty+"px,0)";
},{passive:true});
(function loop(){
  cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;
  cur.style.transform="translate3d("+cx+"px,"+cy+"px,0)";
  if(glows.length&&!MOB.matches){
    gx+=(tx-gx)*.055;gy+=(ty-gy)*.055;
    var st=$("#stage"),r=st?st.getBoundingClientRect():null;
    if(r&&r.width){var sc=r.width/1600,
        tf="translate3d("+((gx-r.left)/sc)+"px,"+((gy-r.top)/sc)+"px,0)";
      glows[i]&&(glows[i].style.transform=tf);}
  }
  requestAnimationFrame(loop);
})();
var HOT="button,a,[data-go],[data-tab],[data-lb],[data-cen],[data-sig],[data-canal],[data-kit],[data-sabor],[data-w],[data-mode],[data-gate],[data-q]";
addEventListener("mouseover",function(e){
  var t=e.target.closest(HOT);
  document.body.classList.toggle("hot",!!t);
  document.body.classList.toggle("zoom",!!(t&&t.hasAttribute("data-lb")));
},{passive:true});

/* ------------------------------------------------ palco */
var stage=$("#stage");
function fit(){
  if(MOB.matches){stage.style.transform="none";return;}
  var s=Math.min(innerWidth/1600,innerHeight/900);if(!(s>0))s=1;
  stage.style.transform="translate(-50%,-50%) scale("+s+")";
}
addEventListener("resize",fit);fit();

/* ------------------------------------------------ capitulos */
var CHAP=[
  {t:"O desafio",     a:0, b:3},
  {t:"As entregas",   a:4, b:5},
  {t:"O caminho",     a:6, b:6},
  {t:"O investimento",a:7, b:8}
];
var TITLES=[
 "Em 2014 vocês instalaram um canal","6.200 freezers, 2.800 à vista",
 "O problema real por trás do pedido","O shopper decide em segundos",
 "Entregas: pensar e criar","Entregas: levar e rastrear",
 "Cronograma do ano","Valor por entrega","Cenários de investimento"
];

var slides=$$(".slide"),N=slides.length,i=0,busy=false;
function chapOf(k){for(var c=0;c<CHAP.length;c++)if(k>=CHAP[c].a&&k<=CHAP[c].b)return c;return 0}

function chrome(){
  var dark=slides[i].classList.contains("dark")&&!MOB.matches;
  ["#top","#bot","#grain",".hint"].forEach(function(s){var el=$(s);if(el)el.classList.toggle("inv",dark)});
  var ll=$("#logoLL"),l75=$("#logo75");
  if(ll) ll.src=dark?LL_W:LL_I;
  if(l75) l75.src=dark?L75_P:L75_B;
  $("#prog").style.width=((i+1)/N*100)+"%";
  $("#count").innerHTML="<b>"+String(i+1).padStart(2,"0")+"</b> / "+N;
  var c=chapOf(i);
  $("#partlbl").innerHTML="<i>"+["I","II","III","IV"][c]+"</i> · "+CHAP[c].t;
  $$("#mgrid button").forEach(function(b,k){b.classList.toggle("cur",k===i)});
  var h=$("#hint");if(h)h.style.opacity=i===0?1:0;
  var mc=$("#mobCount");if(mc)mc.textContent=String(i+1).padStart(2,"0")+" / "+N;
  if(history.replaceState)history.replaceState(null,"","#"+(i+1));
}
function go(n){
  if(MOB.matches){
    var el=slides[Math.max(0,Math.min(N-1,n))];
    if(el)el.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
    closeMenu();return;
  }
  n=Math.max(0,Math.min(N-1,n));if(n===i||busy)return;busy=true;
  var old=slides[i];old.classList.remove("on");old.classList.add("out");
  setTimeout(function(){old.classList.remove("out")},380);
  i=n;slides[i].classList.add("on");chrome();enter(slides[i]);
  setTimeout(function(){busy=false},380);
}

/* ------------------------------------------------ count-up */
function countup(el){
  var end=parseFloat(el.dataset.cu),dec=+(el.dataset.cuDec||0),
      pre=el.dataset.cuPre||"",suf=el.dataset.cuSuf||"",t0=null,dur=+(el.dataset.cuDur||1000);
  if(RM){el.textContent=pre+fmt(end,dec)+suf;return;}
  function fmt(v,d){
    var s=v.toFixed(d);
    var p=s.split(".");
    p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return p.join(",");
  }
  function step(ts){
    if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=pre+fmt(end*e,dec)+suf;
    if(p<1)requestAnimationFrame(step);
  }
  el.textContent=pre+fmt(0,dec)+suf;requestAnimationFrame(step);
}
function enter(sec){
  $$("[data-cu]",sec).forEach(countup);
  $$(".draw",sec).forEach(function(p){
    try{var L=p.getTotalLength();p.style.setProperty("--len",Math.ceil(L))}catch(e){}
  });
}

/* ------------------------------------------------ matriz de pontos */
$$("[data-matrix]").forEach(function(el){
  var t=+el.dataset.matrix,lit=+el.dataset.lit,h="";
  for(var k=0;k<t;k++)h+='<i class="'+(k<lit?"lit":"")+'" style="--k:'+k+'"></i>';
  el.innerHTML=h;
});

/* ------------------------------------------------ abas genericas */
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-tab]");if(!b)return;
  var g=b.closest("[data-tabs]");if(!g)return;
  var k=b.dataset.tab;
  $$("[data-tab]",g).forEach(function(x){x.classList.toggle("sel",x===b)});
  $$("[data-panel]",g).forEach(function(p){p.classList.toggle("on",p.dataset.panel===k)});
  $$("[data-cu]",g).forEach(function(el){
    if(el.closest("[data-panel]")&&el.closest("[data-panel]").classList.contains("on"))countup(el);
  });
  var cb=g.querySelector("[data-tabcb]");
  if(cb&&window[cb.dataset.tabcb])window[cb.dataset.tabcb](k);
});

/* ------------------------------------------------ lightbox */
var lb=$("#lb"),lbimg=$("#lbimg"),lbcap=$("#lbcap"),gal=[],gi=0;
function openLb(src,cap,list,idx){
  gal=list||[src];gi=idx||0;
  lbimg.removeAttribute("hidden");lbimg.src=src;lbcap.textContent=cap||"";
  lb.classList.add("on");
  $("#lbp").style.display=$("#lbn").style.display=gal.length>1?"grid":"none";
  lbimg.focus&&lbimg.focus();
}
function closeLb(){lb.classList.remove("on");lbimg.removeAttribute("src");lbimg.setAttribute("hidden","")}
function lbGo(d){
  if(gal.length<2)return;
  gi=(gi+d+gal.length)%gal.length;
  lbimg.src=gal[gi].src;lbcap.textContent=gal[gi].cap;
  lbimg.style.animation="none";void lbimg.offsetWidth;lbimg.style.animation="";
}
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-lb]");if(!t)return;
  var img=t.querySelector("img")||t;
  var scope=t.closest("[data-gal]");
  var list=[],idx=0;
  if(scope){
    $$("[data-lb]",scope).forEach(function(n,k){
      var im=n.querySelector("img")||n;
      list.push({src:im.dataset.full||im.src,cap:n.dataset.lb||im.alt||""});
      if(n===t)idx=k;
    });
  } else list=[{src:img.dataset.full||img.src,cap:t.dataset.lb||img.alt||""}];
  openLb(list[idx].src,list[idx].cap,list,idx);
});
$("#lbx").addEventListener("click",closeLb);
$("#lbp").addEventListener("click",function(e){e.stopPropagation();lbGo(-1)});
$("#lbn").addEventListener("click",function(e){e.stopPropagation();lbGo(1)});
lb.addEventListener("click",function(e){if(e.target===lb||e.target===lbimg.parentNode)closeLb()});

/* ------------------------------------------------ indice */
function closeMenu(){$("#menu").classList.remove("on")}
(function buildMenu(){
  var h="";
  CHAP.forEach(function(c,ci){
    h+='<section><h4>'+["I","II","III","IV"][ci]+' · '+c.t+'</h4>';
    for(var k=c.a;k<=c.b;k++)
      h+='<button data-go="'+k+'"><b>'+String(k+1).padStart(2,"0")+'</b><span>'+TITLES[k]+'</span></button>';
    h+='</section>';
  });
  $("#mgrid").innerHTML=h;
})();
$("#bMenu").addEventListener("click",function(){$("#menu").classList.add("on")});
$("#bClose").addEventListener("click",closeMenu);
var bp=$("#bPrint");if(bp)bp.addEventListener("click",function(){window.print()});

/* ------------------------------------------------ navegacao */
document.addEventListener("click",function(e){
  var g=e.target.closest("[data-go]");
  if(g){e.preventDefault();go(+g.dataset.go);closeMenu();}
});
var prevB=$("#prev"),nextB=$("#next");
if(prevB)prevB.addEventListener("click",function(){go(i-1)});
if(nextB)nextB.addEventListener("click",function(){go(i+1)});
var mp=$("#mobPrev"),mn=$("#mobNext");
if(mp)mp.addEventListener("click",function(){go(i-1)});
if(mn)mn.addEventListener("click",function(){go(i+1)});
addEventListener("keydown",function(e){
  if(lb.classList.contains("on")){
    if(e.key==="Escape")closeLb();
    else if(e.key==="ArrowRight")lbGo(1);
    else if(e.key==="ArrowLeft")lbGo(-1);
    return;
  }
  if(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" "){e.preventDefault();go(i+1)}
  else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();go(i-1)}
  else if(e.key==="Home"){e.preventDefault();go(0)}
  else if(e.key==="End"){e.preventDefault();go(N-1)}
  else if(e.key==="m"||e.key==="M"){$("#menu").classList.toggle("on")}
  else if(e.key==="Escape"){closeMenu()}
});
var wl=0;
addEventListener("wheel",function(e){
  if(MOB.matches||lb.classList.contains("on")||$("#menu").classList.contains("on"))return;
  var now=Date.now();if(now-wl<720)return;
  if(Math.abs(e.deltaY)<22&&Math.abs(e.deltaX)<22)return;
  wl=now;go(i+((e.deltaY||e.deltaX)>0?1:-1));
},{passive:true});
var sx=0,sy=0;
addEventListener("touchstart",function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
addEventListener("touchend",function(e){
  if(MOB.matches)return;
  var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>54&&Math.abs(dx)>Math.abs(dy))go(dx<0?i+1:i-1);
},{passive:true});

/* ------------------------------------------------ modo mobile: rolagem */
function mobSetup(){
  if(!MOB.matches)return;
  slides.forEach(function(s){s.classList.add("on")});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){
        var k=slides.indexOf(en.target);
        if(k>=0&&k!==i){i=k;chrome();enter(en.target);}
      }
    });
  },{threshold:.35});
  slides.forEach(function(s){io.observe(s)});
}


/* ------------------------------------------------ tela 05 · portao de producao */
(function(){
  var qbs=$$("[data-q]"),st=$("#gst");if(!qbs.length||!st)return;
  function upd(){
    var n=0;qbs.forEach(function(b){if(b.classList.contains("on"))n++});
    st.textContent=n+" de 4 respondidas · "+(n===4?"produção liberada":"produção bloqueada");
    st.classList.toggle("ok",n===4);
  }
  qbs.forEach(function(b){b.addEventListener("click",function(){b.classList.toggle("on");upd()})});
  upd();
})();

/* ------------------------------------------------ tela 15 · opportunity score */
(function(){
  var ws=$$("[data-w]");if(!ws.length)return;
  var C=2*Math.PI*52;
  var BANDS=[
    {min:70,tag:"Entra no backlog prioritário",col:"var(--coral2)",
     txt:"Acima de 70, a iniciativa recebe estimativa de produção e entra na fila de pilotos."},
    {min:50,tag:"Otimizar antes de produzir",col:"var(--teal)",
     txt:"Entre 50 e 69, a ideia volta para ajuste de escopo, canal ou custo."},
    {min:0,tag:"Fica em observação",col:"rgba(18,20,28,.4)",
     txt:"Abaixo de 50, fica no backlog de observação junto às apostas de risco."}
  ];
  function upd(){
    var t=0,W=0;
    ws.forEach(function(r){
      var w=+r.dataset.w;t+=(+r.value)*w;W+=w;
      var v=r.parentNode.querySelector(".v");if(v)v.textContent=r.value;
    });
    var sc=Math.round(t/(W||1)*10);
    $("#scoreVal").textContent=sc;
    $("#ringArc").setAttribute("stroke-dashoffset",(C*(1-sc/100)).toFixed(1));
    var b=BANDS.find(function(x){return sc>=x.min})||BANDS[2];
    $("#ringArc").setAttribute("stroke",b.col);
    var tg=$("#scoreTag");tg.textContent=b.tag;
    tg.style.background=b.col;tg.style.borderColor=b.col;
    tg.style.color=sc>=50?"var(--ink)":"var(--paper)";
    $("#scoreTxt").textContent=b.txt;
  }
  ws.forEach(function(r){r.addEventListener("input",upd)});
  $("#ringArc").setAttribute("stroke-dasharray",C.toFixed(1));
  upd();
})();

/* ------------------------------------------------ arranque */
if(MOB.matches){mobSetup();chrome();slides.forEach(enter);}
else{slides[0].classList.add("on");chrome();enter(slides[0]);}
if(HASH0>0&&HASH0<=N)go(HASH0-1);
window.__deck={go:go,at:function(){return i}};
})();
