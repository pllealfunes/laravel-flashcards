import{l as o,j as H,o as c,c as d,a as q,u as J,w as K,F as N,Z as P,b as s,t as f,e as w,m as Q,n as U,h as X,g as I}from"./app-CR7DxkEp.js";import{_ as ee}from"./AuthenticatedLayout-BGHLzLns.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const te={class:"mt-6 mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"},se={class:"flex flex-col justify-center items-center"},ae={key:0},le={key:0,class:"flex justify-center items-center mt-5"},oe={class:"w-[400px] h-[400px] py-11 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"},ne={class:"text-2xl font-bold m-5"},re=s("p",{class:"text-2xl font-bold m-5"},"Your Final Time Was :",-1),ue={class:"text-2xl font-bold m-5"},ie=s("p",{class:"text-2xl font-bold m-5"}," Number of Failed Attempts : ",-1),ce={class:"text-2xl font-bold m-5"},de={class:"flex flex-col justify-center items-center"},fe={key:0,class:"grid md:grid-cols-2 lg:grid-cols-4",id:"flashcardsDeck"},pe=["onClick"],ve={class:"flip-card backface-hidden w-full h-full rounded-lg"},me={class:"text-center text-md flex flex-col items-center justify-center h-full"},he={class:"text-small"},ge={key:1,class:"w-[400px] h-[400px] mt-7 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"},xe=s("p",{class:"text-justify p-14 font-bold"},[s("b",{class:"text-black"},"Rules of The Game :"),I(" Click on the New Game button to start a new game. Click on each card to try and match the questions to their answers. At the end of the game the total time it took you to finish will be displayed. ")],-1),ye=[xe],S=6,ke={__name:"MemoryGame",props:{deck:Object,flashcards:Array},setup(T){const p=T,v=o([]),a=o([]),k=o([]),G=o([]),i=o([]),C=o(null),m=o(!1),g=o(0),u=o(0),h=o(!1),x=o(""),y=o(!1),_=o([]),b=o(0),$=()=>{_.value=p.flashcards.length<=S?p.flashcards:A(p.flashcards,S),k.value=_.value.map(e=>({type:"answer",value:e.answer})),G.value=_.value.map(e=>({type:"question",value:e.question})),v.value=M([...k.value,...G.value]),console.log("Game Cards:",v.value)},A=(e,t)=>e.length<=t?e:M([...e]).slice(0,t),M=e=>{for(let t=e.length-1;t>0;t--){const l=Math.floor(Math.random()*(t+1));[e[t],e[l]]=[e[l],e[t]]}return e},D=()=>{h.value||(g.value=Date.now()-u.value,C.value=setInterval(R,10),h.value=!0)},F=()=>{h.value&&(clearInterval(C.value),u.value=Date.now()-g.value,h.value=!1)},W=()=>{clearInterval(C.value),g.value=0,u.value=0,h.value=!1,x.value="00:00:00:00"},R=()=>{const e=Date.now();u.value=e-g.value;const t=String(Math.floor(u.value/(1e3*60*60))).padStart(2,"0"),l=String(Math.floor(u.value/(1e3*60)%60)).padStart(2,"0"),n=String(Math.floor(u.value/1e3%60)).padStart(2,"0"),r=String(Math.floor(u.value%1e3/10)).padStart(2,"0");x.value=`${t}:${l}:${n}:${r}`},V=H(()=>a.value.every(e=>e.style==="hidden")),B=()=>{W(),_.value=[],i.value=[],y.value=!1,m.value=!0,b.value=0,$(),a.value=v.value.map(()=>({flipped:!1,style:"bg-sky-950"})),D()},O=()=>{V.value&&(m.value=!1,y.value=!0,F())},Y=(e,t)=>{a.value[e].flipped||i.value.length===2||(a.value[e].flipped=!a.value[e].flipped,z(e,t))};function z(e,t){i.value.length<2&&i.value.push({index:e,type:t}),i.value.length===2&&E()}const E=()=>{const[e,t]=i.value;if(e.type===t.type){j(e.index,t.index,"bg-red-500",2e3),b.value++;return}const l=e.type==="question"?e:t,n=e.type==="answer"?e:t,r=p.flashcards.find(Z=>Z.question===v.value[l.index].value),L=k.value[n.index];r.answer===L.value?j(e.index,t.index,"bg-green-500",2e3,"hidden"):(j(e.index,t.index,"bg-red-500",2e3),b.value++)},j=(e,t,l,n,r="bg-sky-950")=>{a.value[e].style=l,a.value[t].style=l,setTimeout(()=>{a.value[e].style=r,a.value[t].style=r,a.value[e].flipped=r==="bg-sky-950"?!1:a.value[e].flipped,a.value[t].flipped=r==="bg-sky-950"?!1:a.value[t].flipped,i.value=[],O()},n)};return(e,t)=>(c(),d(N,null,[q(J(P),{title:"Memory Game"}),q(ee,null,{default:K(()=>[s("h1",te," Memory Game: "+f(p.deck.title),1),s("div",se,[s("button",{"data-testid":"new-game-btn",type:"button",class:"focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",onClick:t[0]||(t[0]=l=>B())}," New Game "),m.value?(c(),d("div",ae,f(x.value),1)):w("",!0)]),y.value?(c(),d("div",le,[s("div",oe,[s("p",ne," You Did It "+f(e.$page.props.auth.user.name)+"! ",1),re,s("p",ue,f(x.value),1),ie,s("p",ce,f(b.value),1)])])):w("",!0),s("section",de,[m.value?(c(),d("div",fe,[(c(!0),d(N,null,Q(v.value,(l,n)=>(c(),d("div",{"data-testid":"memory-cards-display",key:l.id,class:"m-5 font-semibold flex flex-row justify-center items-center transition-transform duration-500 ease-in-out"},[s("div",{class:U(["w-[350px] h-[250px] dark:text-slate-200 border border-gray-200 rounded-lg shadow mb-2 flex flex-row justify-between cursor-pointer group perspective relative preserve-3d duration-1000",[{"flip-card":a.value[n].flipped},a.value[n].style]]),onClick:X(r=>Y(n,l.type),["stop"])},[s("div",ve,[s("div",me,[s("p",he,f(l.value),1)])])],10,pe)]))),128))])):w("",!0),!m.value&&!y.value?(c(),d("div",ge,ye)):w("",!0)])]),_:1})],64))}};export{ke as default};
