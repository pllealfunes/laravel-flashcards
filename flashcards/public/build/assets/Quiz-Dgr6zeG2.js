import{l as i,x as U,o as r,c as n,a as N,w as I,u as Z,F as u,b as e,t as a,Z as G,n as M,e as C,m as _,g as z,k as S,A as Q,bA as H}from"./app-CR7DxkEp.js";import{_ as J}from"./AuthenticatedLayout-BGHLzLns.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const K={class:"flex justify-center items-center"},W={class:"mt-6 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"},X={key:0,class:"flex justify-center items-center m-2"},Y={class:"text-2xl font-bold m-2"},ee=e("span",{class:"text-2xl font-bold"},"/",-1),te={class:"text-2xl font-bold m-2"},se={key:0,class:"quiz-container flex flex-col justify-center items-center"},le={"data-testid":"quiz-question",class:"w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},oe={class:"text-slate-200 flex justify-end mt-3 mr-3"},re={class:"w-full h-full p-4"},ne={class:"flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"},ae={class:"answers-container"},ie={class:"flex flex-col justify-between items-center gap-3 mt-5"},ce=["for"],ue=["id","value","onUpdate:modelValue"],de=["disabled"],fe={key:1,class:"flex flex-col justify-center items-center"},he={class:"results-container mt-8 flex flex-col justify-center items-center"},xe={key:0,class:"m-4"},me=e("svg",{class:"-mr-1 h-5 w-5 text-gray-400",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[e("path",{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z","clip-rule":"evenodd"})],-1),ve={role:"menu","aria-orientation":"vertical","aria-labelledby":"menu-button"},be={class:"w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},ge={class:"text-slate-200 flex justify-end mt-3 mr-3"},pe={class:"w-full h-full p-4"},we={class:"flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"},_e={class:"answers-container"},ye={class:"flex flex-col justify-between items-center gap-3 mt-5"},ke={class:"w-[500px] p-11 text-gray-800 border border-green-200 rounded-lg shadow dark:bg-green-400 dark:border-green-400 mb-2"},je={key:1,class:"m-4"},Ae=e("svg",{class:"-mr-1 h-5 w-5 text-gray-400",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[e("path",{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z","clip-rule":"evenodd"})],-1),Ce={role:"menu","aria-orientation":"vertical","aria-labelledby":"menu-button"},ze={class:"w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},Se={class:"text-slate-200 flex justify-end mt-3 mr-3"},Te={class:"w-full h-full p-4"},qe={class:"flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"},Ne={class:"answers-container"},Ie={class:"flex flex-col justify-between items-center gap-3 mt-5"},Me={class:"w-[500px] p-11 text-gray-800 border border-red-200 rounded-lg shadow dark:bg-red-400 dark:border-red-400 mb-2"},Qe={class:"w-[500px] p-11 text-gray-800 border border-green-200 rounded-lg shadow dark:bg-green-400 dark:border-green-400 mb-2"},Ve=2,$e={__name:"Quiz",props:{deck:Object,flashcards:Object},setup(V){const y=V,k=i(!1),j=i([]),d=i([]),f=i(0),h=i(0),x=i(!1),m=i(!1),v=i([]),b=i([]),c=i(!1),g=i(!1),p=i(!1);U(()=>{T()});const w=s=>{for(let l=s.length-1;l>0;l--){const t=Math.floor(Math.random()*(l+1));[s[l],s[t]]=[s[t],s[l]]}return s},B=s=>{for(const l of s){const t=s.filter(o=>o!==l).map(o=>o.answer);l.answers=[...t],l.answers=w(l.answers.map(o=>o.toLowerCase()))}return w(s),s},L=(s,l)=>{let t=w([...l.answers.map(o=>o.toLowerCase())]).slice(0,Ve);return t.push(s),t=w(t),t},O=()=>{j.value.forEach((s,l)=>{const t=d.value[l];h.value+=parseInt(s.points),s.answer===t?(f.value+=parseInt(s.points),v.value.push(s)):b.value.push({card:s,userAnswer:t})}),$(),k.value=!1,D()},$=()=>{f.value/h.value*100>=70?(m.value=!1,x.value=!0,c.value=!0):(x.value=!1,m.value=!0,c.value=!0)},D=()=>{window.scrollTo({top:0,behavior:"smooth"})},T=()=>{j.value=B([...y.flashcards]).map(s=>({...s,answers:L(s.answer,s)})),k.value=!0},P=()=>{T(),d.value=[],f.value=0,h.value=0,x.value=!1,m.value=!1,v.value=[],b.value=[],c.value=!1,g.value=!1,p.value=!1},R=()=>{g.value=!g.value},E=()=>{p.value=!p.value};return(s,l)=>(r(),n(u,null,[N(Z(G),null,{default:I(()=>[e("title",null,"Quiz: "+a(y.deck.title),1)]),_:1}),N(J,null,{default:I(()=>[e("div",K,[e("h1",W," Quiz: "+a(y.deck.title),1),c.value?(r(),n("div",X,[e("div",{class:M(["w-16 h-16 p-11 rounded-full flex items-center justify-center text-white",{"bg-green-500":x.value,"bg-red-500":m.value}])},[e("span",Y,a(f.value),1),ee,e("span",te,a(h.value),1)],2)])):C("",!0)]),k.value?(r(),n("div",se,[(r(!0),n(u,null,_(j.value,(t,o)=>(r(),n("div",{key:t.id,class:"m-5 flex flex-col flex-wrap justify-center items-center"},[e("div",le,[e("p",oe," POINTS: "+a(t.points),1),e("div",re,[e("h3",ne,a(t.question),1)])]),e("div",ae,[e("div",null,[e("ul",ie,[(r(!0),n(u,null,_(t.answers,(q,A)=>(r(),n("li",{key:A,class:"w-[500px] p-11 text-gray-800 border border-gray-200 rounded-lg shadow dark:bg-slate-400 dark:border-slate-400 mb-2 hover:bg-slate-500 hover:text-gray-200 hover:cursorpointer"},[e("label",{for:`answer-${o}-${A}`},[S(e("input",{type:"radio",id:`answer-${o}-${A}`,value:q,"onUpdate:modelValue":F=>d.value[o]=F},null,8,ue),[[H,d.value[o]]]),z(" "+a(q),1)],8,ce)]))),128))])])])]))),128)),e("button",{"data-testid":"submit-quiz-btn",type:"button",class:M(["mt-11 w-1/4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",{"cursor-not-allowed":c.value}]),disabled:c.value,onClick:O}," Submit ",10,de)])):(r(),n("div",fe,[e("button",{type:"button",class:"m-8 w-1/4 focus:outline-none font-black hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-400 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800",onClick:P}," Try Again "),e("div",he,[v.value.length>0?(r(),n("div",xe,[e("div",null,[e("button",{type:"button",class:"inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",id:"menu-button","aria-expanded":"true","aria-haspopup":"true",onClick:R},[z(" Correct Answers "),me])]),S(e("div",ve,[(r(!0),n(u,null,_(v.value,(t,o)=>(r(),n("div",{key:t.id,class:"m-5 flex flex-col flex-wrap justify-center items-center"},[e("div",be,[e("p",ge," POINTS: "+a(t.points),1),e("div",pe,[e("h3",we,a(t.question),1)])]),e("div",_e,[e("div",null,[e("ul",ye,[e("li",ke,a(t.answer),1)])])])]))),128))],512),[[Q,g.value]])])):C("",!0),b.value.length>0?(r(),n("div",je,[e("div",null,[e("button",{type:"button",class:"inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",id:"menu-button","aria-expanded":"true","aria-haspopup":"true",onClick:E},[z(" Incorrect Answers "),Ae])]),S(e("div",Ce,[(r(!0),n(u,null,_(b.value,(t,o)=>(r(),n("div",{key:t.id,class:"m-5 flex flex-col flex-wrap justify-center items-center"},[e("div",ze,[e("p",Se," POINTS: "+a(t.card.points),1),e("div",Te,[e("h3",qe,a(t.card.question),1)])]),e("div",Ne,[e("div",null,[e("ul",Ie,[e("li",Me,a(t.userAnswer),1),e("li",Qe,a(t.card.answer),1)])])])]))),128))],512),[[Q,p.value]])])):C("",!0)])]))]),_:1})],64))}};export{$e as default};