import{k as s,h as z,o as i,f as d,a as G,w as S,u as E,F as T,b as a,t as f,Z as L,g as _,m as Z,n as H,e as J,d as K}from"./app-LZ4iQJfl.js";import{_ as P}from"./AuthenticatedLayout-CkUu5K9-.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Q={class:"mt-6 mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"},U={class:"flex flex-col justify-center items-center"},X={key:0},ee={key:0,class:"flex justify-center items-center mt-5"},te={class:"w-[400px] h-[400px] py-11 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"},le={class:"text-2xl font-bold m-5"},ae=a("p",{class:"text-2xl font-bold m-5"},"Your Final Time Was :",-1),se={class:"text-2xl font-bold m-5"},ne={class:"flex flex-col justify-center items-center"},oe={key:0,class:"grid md:grid-cols-2 lg:grid-cols-4",id:"flashcardsDeck"},re=["onClick"],ue={class:"flip-card backface-hidden w-full h-full rounded-lg"},ie={class:"text-center text-md flex flex-col items-center justify-center h-full"},de={class:"text-small"},ce={key:1,class:"w-[400px] h-[400px] mt-7 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"},ve=a("p",{class:"text-justify p-14 font-bold"},[a("b",{class:"text-black"},"Rules of The Game :"),K(" Click on the New Game button to start a new game. Click on each card to try and match the questions to their answers. At the end of the game the total time it took you to finish will be displayed. ")],-1),fe=[ve],k=6,ye={__name:"MemoryGame",props:{deck:Object,flashcards:Object},setup(w){const{deck:pe,flashcards:p}=w,x=s([]),t=s([]),C=s([]),M=s([]),o=s([]),j=s(null),m=s(!1),y=s(0),u=s(0),h=s(!1),g=s(""),b=s(!1),c=s([]),q=()=>{if(p.length>=k){for(let e=0;e<k;e++)c.value.push(p[Math.floor(Math.random()*p.length)]);return c.value}else{let e=[];const l=[...p];for(;e.length<k;){const n=k-e.length;l.sort(()=>.5-Math.random()),e=[...e,...l.slice(0,n)]}return c.value=e}},$=()=>{h.value||(y.value=Date.now()-u.value,j.value=setInterval(F,10),h.value=!0)},N=()=>{h.value&&(clearInterval(j.value),u.value=Date.now()-y.value,h.value=!1)},D=()=>{clearInterval(j.value),y.value=0,u.value=0,h.value=!1,g.value="00:00:00:00"},F=()=>{const e=Date.now();u.value=e-y.value;let l=Math.floor(u.value/(1e3*60*60)),n=Math.floor(u.value/(1e3*60)%60),r=Math.floor(u.value/1e3%60),v=Math.floor(u.value%1e3%10);l=String(l).padStart(2,"0"),n=String(n).padStart(2,"0"),r=String(r).padStart(2,"0"),v=String(v).padStart(2,"0"),g.value=`${l}:${n}:${r}:${v}`},I=z(()=>t.value.every(e=>e.style==="hidden")),O=()=>{b.value=!1,c.value=[],o.value=[],m.value=!0,q(),D(),C.value=c.value.map(function(e){return{type:"answer",value:e.answer}}),M.value=c.value.map(function(e){return{type:"question",value:e.question}}),x.value=[...C.value,...M.value],t.value=x.value.map(()=>({flipped:!1,style:"bg-sky-950"})),$()},V=()=>{I.value&&(m.value=!1,b.value=!0,N())},W=(e,l)=>{t.value[e].flipped||o.value.length===2||(t.value[e].flipped=!t.value[e].flipped,A(e,l))};function A(e,l){o.value.length<2&&o.value.push({index:e,type:l}),o.value.length===2&&B()}function B(){const[e,l]=o.value;if(e.type===l.type){t.value[e.index].style="bg-red-500",t.value[l.index].style="bg-red-500",setTimeout(function(){t.value[e.index].flipped=!t.value[e.index].flipped,t.value[l.index].flipped=!t.value[l.index].flipped,o.value=[],t.value[e.index].style="bg-sky-950",t.value[l.index].style="bg-sky-950"},2e3);return}const n=e.type==="question"?e:l,r=e.type==="answer"?e:l,v=p.find(Y=>Y.question===x.value[n.index].value),R=C.value[r.index];if(v.answer===R.value){t.value[e.index].style="bg-green-500",t.value[l.index].style="bg-green-500",setTimeout(function(){t.value[e.index].style="hidden",t.value[l.index].style="hidden",o.value=[],V()},2e3);return}else{t.value[e.index].style="bg-red-500",t.value[l.index].style="bg-red-500",setTimeout(function(){t.value[e.index].flipped=!t.value[e.index].flipped,t.value[l.index].flipped=!t.value[l.index].flipped,o.value=[],t.value[e.index].style="bg-sky-950",t.value[l.index].style="bg-sky-950"},2e3);return}}return(e,l)=>(i(),d(T,null,[G(E(L),null,{default:S(()=>[a("title",null,"Memory Game: "+f(w.deck.title),1)]),_:1}),G(P,null,{default:S(()=>[a("h1",Q," Memory Game: "+f(w.deck.title),1),a("div",U,[a("button",{type:"button",class:"focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",onClick:l[0]||(l[0]=n=>O())}," New Game "),m.value?(i(),d("div",X,f(g.value),1)):_("",!0)]),b.value?(i(),d("div",ee,[a("div",te,[a("p",le," You Did It "+f(e.$page.props.auth.user.name)+"! ",1),ae,a("p",se,f(g.value),1)])])):_("",!0),a("section",ne,[m.value?(i(),d("div",oe,[(i(!0),d(T,null,Z(x.value,(n,r)=>(i(),d("div",{key:n.id,class:"m-5 font-semibold flex flex-row justify-center items-center transition-transform duration-500 ease-in-out"},[a("div",{class:H(["w-[350px] h-[250px] dark:text-slate-200 border border-gray-200 rounded-lg shadow mb-2 flex flex-row justify-between cursor-pointer group perspective relative preserve-3d duration-1000",[{"flip-card":t.value[r].flipped},t.value[r].style]]),onClick:J(v=>W(r,n.type),["stop"])},[a("div",ue,[a("div",ie,[a("p",de,f(n.value),1)])])],10,re)]))),128))])):_("",!0),!m.value&&!b.value?(i(),d("div",ce,fe)):_("",!0)])]),_:1})],64))}};export{ye as default};
