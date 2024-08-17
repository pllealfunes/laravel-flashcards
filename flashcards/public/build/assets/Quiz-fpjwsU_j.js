import{l as i,x as F,o as r,c as n,a as N,w as I,u as U,F as u,b as e,t as a,Z,n as M,e as C,m as _,g as z,k as S,A as Q,bA as G}from"./app-DqCWJOKh.js";import{_ as H}from"./AuthenticatedLayout-Czi820B5.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const J={class:"flex justify-center items-center"},K={class:"mt-6 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"},W={key:0,class:"flex justify-center items-center m-2"},X={class:"text-2xl font-bold m-2"},Y=e("span",{class:"text-2xl font-bold"},"/",-1),ee={class:"text-2xl font-bold m-2"},te={key:0,class:"quiz-container flex flex-col justify-center items-center"},se={"data-testid":"quiz-question",class:"w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},le={class:"text-slate-200 flex justify-end mt-3 mr-3"},oe={class:"w-full h-full p-4"},re={class:"flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"},ne={class:"answers-container"},ae={class:"flex flex-col justify-between items-center gap-3 mt-5"},ie=["for"],ce=["id","value","onUpdate:modelValue"],ue=["disabled"],de={key:1,class:"flex flex-col justify-center items-center"},fe={class:"results-container mt-8 flex flex-col justify-center items-center"},he={key:0,class:"m-4"},xe=e("svg",{class:"-mr-1 h-5 w-5 text-gray-400",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[e("path",{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z","clip-rule":"evenodd"})],-1),me={role:"menu","aria-orientation":"vertical","aria-labelledby":"menu-button"},ve={class:"w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},be={class:"text-slate-200 flex justify-end mt-3 mr-3"},ge={class:"w-full h-full p-4"},we={class:"flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"},pe={class:"answers-container"},_e={class:"flex flex-col justify-between items-center gap-3 mt-5"},ye={class:"w-[500px] p-11 text-gray-800 border border-green-200 rounded-lg shadow dark:bg-green-400 dark:border-green-400 mb-2"},ke={key:1,class:"m-4"},je=e("svg",{class:"-mr-1 h-5 w-5 text-gray-400",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[e("path",{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z","clip-rule":"evenodd"})],-1),Ae={role:"menu","aria-orientation":"vertical","aria-labelledby":"menu-button"},Ce={class:"w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},ze={class:"text-slate-200 flex justify-end mt-3 mr-3"},Se={class:"w-full h-full p-4"},Te={class:"flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"},qe={class:"answers-container"},Ne={class:"flex flex-col justify-between items-center gap-3 mt-5"},Ie={class:"w-[500px] p-11 text-gray-800 border border-red-200 rounded-lg shadow dark:bg-red-400 dark:border-red-400 mb-2"},Me={class:"w-[500px] p-11 text-gray-800 border border-green-200 rounded-lg shadow dark:bg-green-400 dark:border-green-400 mb-2"},Qe=2,Oe={__name:"Quiz",props:{deck:Object,flashcards:Object},setup(y){const k=i(!1),j=i([]),d=i([]),f=i(0),h=i(0),x=i(!1),m=i(!1),v=i([]),b=i([]),c=i(!1),g=i(!1),w=i(!1);F(()=>{T()});const p=s=>{for(let l=s.length-1;l>0;l--){const t=Math.floor(Math.random()*(l+1));[s[l],s[t]]=[s[t],s[l]]}return s},V=s=>{for(const l of s){const t=s.filter(o=>o!==l).map(o=>o.answer);l.answers=[...t],l.answers=p(l.answers.map(o=>o.toLowerCase()))}return p(s),s},B=(s,l)=>{let t=p([...l.answers.map(o=>o.toLowerCase())]).slice(0,Qe);return t.push(s),t=p(t),t},L=()=>{j.value.forEach((s,l)=>{const t=d.value[l];h.value+=parseInt(s.points),s.answer===t?(f.value+=parseInt(s.points),v.value.push(s)):b.value.push({card:s,userAnswer:t})}),O(),k.value=!1,$()},O=()=>{f.value/h.value*100>=70?(m.value=!1,x.value=!0,c.value=!0):(x.value=!1,m.value=!0,c.value=!0)},$=()=>{window.scrollTo({top:0,behavior:"smooth"})},T=()=>{j.value=V([...y.flashcards]).map(s=>({...s,answers:B(s.answer,s)})),k.value=!0},D=()=>{T(),d.value=[],f.value=0,h.value=0,x.value=!1,m.value=!1,v.value=[],b.value=[],c.value=!1,g.value=!1,w.value=!1},P=()=>{g.value=!g.value},R=()=>{w.value=!w.value};return(s,l)=>(r(),n(u,null,[N(U(Z),null,{default:I(()=>[e("title",null,"Quiz: "+a(y.deck.title),1)]),_:1}),N(H,null,{default:I(()=>[e("div",J,[e("h1",K," Quiz: "+a(y.deck.title),1),c.value?(r(),n("div",W,[e("div",{class:M(["w-16 h-16 p-11 rounded-full flex items-center justify-center text-white",{"bg-green-500":x.value,"bg-red-500":m.value}])},[e("span",X,a(f.value),1),Y,e("span",ee,a(h.value),1)],2)])):C("",!0)]),k.value?(r(),n("div",te,[(r(!0),n(u,null,_(j.value,(t,o)=>(r(),n("div",{key:t.id,class:"m-5 flex flex-col flex-wrap justify-center items-center"},[e("div",se,[e("p",le," POINTS: "+a(t.points),1),e("div",oe,[e("h3",re,a(t.question),1)])]),e("div",ne,[e("div",null,[e("ul",ae,[(r(!0),n(u,null,_(t.answers,(q,A)=>(r(),n("li",{key:A,class:"w-[500px] p-11 text-gray-800 border border-gray-200 rounded-lg shadow dark:bg-slate-400 dark:border-slate-400 mb-2 hover:bg-slate-500 hover:text-gray-200 hover:cursorpointer"},[e("label",{for:`answer-${o}-${A}`},[S(e("input",{type:"radio",id:`answer-${o}-${A}`,value:q,"onUpdate:modelValue":E=>d.value[o]=E},null,8,ce),[[G,d.value[o]]]),z(" "+a(q),1)],8,ie)]))),128))])])])]))),128)),e("button",{"data-testid":"submit-quiz-btn",type:"button",class:M(["mt-11 w-1/4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",{"cursor-not-allowed":c.value}]),disabled:c.value,onClick:L}," Submit ",10,ue)])):(r(),n("div",de,[e("button",{type:"button",class:"m-8 w-1/4 focus:outline-none font-black hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-400 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800",onClick:D}," Try Again "),e("div",fe,[v.value.length>0?(r(),n("div",he,[e("div",null,[e("button",{type:"button",class:"inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",id:"menu-button","aria-expanded":"true","aria-haspopup":"true",onClick:P},[z(" Correct Answers "),xe])]),S(e("div",me,[(r(!0),n(u,null,_(v.value,(t,o)=>(r(),n("div",{key:t.id,class:"m-5 flex flex-col flex-wrap justify-center items-center"},[e("div",ve,[e("p",be," POINTS: "+a(t.points),1),e("div",ge,[e("h3",we,a(t.question),1)])]),e("div",pe,[e("div",null,[e("ul",_e,[e("li",ye,a(t.answer),1)])])])]))),128))],512),[[Q,g.value]])])):C("",!0),b.value.length>0?(r(),n("div",ke,[e("div",null,[e("button",{type:"button",class:"inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",id:"menu-button","aria-expanded":"true","aria-haspopup":"true",onClick:R},[z(" Incorrect Answers "),je])]),S(e("div",Ae,[(r(!0),n(u,null,_(b.value,(t,o)=>(r(),n("div",{key:t.id,class:"m-5 flex flex-col flex-wrap justify-center items-center"},[e("div",Ce,[e("p",ze," POINTS: "+a(t.card.points),1),e("div",Se,[e("h3",Te,a(t.card.question),1)])]),e("div",qe,[e("div",null,[e("ul",Ne,[e("li",Ie,a(t.userAnswer),1),e("li",Me,a(t.card.answer),1)])])])]))),128))],512),[[Q,w.value]])])):C("",!0)])]))]),_:1})],64))}};export{Oe as default};