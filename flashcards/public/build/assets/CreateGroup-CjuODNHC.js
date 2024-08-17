import{Q as w,l as D,T as j,o as r,c as a,a as b,u as o,w as C,F as p,Z as M,b as e,h as $,m as k,d as f,e as n,g as m,t as g,k as h,p as B,v as S}from"./app-DqCWJOKh.js";import{_ as V}from"./AuthenticatedLayout-Czi820B5.js";import{_ as x}from"./ErrorToast--a9rrwXi.js";import{_ as L}from"./NewPagination-BFwffxIF.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const N={class:"flex justify-center items-center"},T={key:1,class:"mt-5 mb-2 bg-red-400 text-black font-bold p-3 border-red-600 border-2 border-solid flex flex-row gap-2 justify-center items-center"},Z=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"})],-1),G={key:2,class:"mt-2 mb-2 bg-red-400 text-black font-bold p-3 border-red-600 border-2 border-solid flex flex-row gap-2 justify-center items-center"},U=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"})],-1),A={class:"rounded-lg border-sky-950 p-5 bg-sky-950 mb-5"},E=e("label",{for:"title",class:"block mb-2 font-bold text-slate-50"},"Group Title :",-1),F={class:"w-full"},H={class:"relative overflow-x-auto shadow-md rounded-lg mb-10"},O={class:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-10"},Q=e("thead",{class:"text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-10"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 text-slate-50"}," Deck Title "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 text-slate-50 text-right"}," Available Decks ")])],-1),q={class:"px-6 py-4 text-black"},z={class:"px-6 py-4 text-black text-right"},I={for:"checkbox",class:"text-black"},J=["id","value"],K={class:"flex justify-center items-center"},P={class:"flex justify-center items-center"},R=["disabled"],se={__name:"CreateGroup",props:{availableDecks:Object},setup(i){const v=w(),d=D([]),_=l=>{router.visit(l,{preserveState:!0,preserveScroll:!0,replace:!0})},t=j({title:"",decks:[]}),y=async()=>{try{t.decks=d,await t.post(route("group.store"),{onSuccess:()=>t.reset()})}catch(l){v.props.flash.error=`Unable to create group. Error: ${l}`}};return(l,c)=>(r(),a(p,null,[b(o(M),{title:"Create Group"}),b(V,null,{default:C(()=>[e("div",N,[e("form",{onSubmit:$(y,["prevent"]),class:"mt-8 w-full mx-3 md:w-1/2 lg:w-1/2"},[(r(!0),a(p,null,k(l.$page.props.errors,(s,u)=>(r(),a("span",{key:u},[s?(r(),f(x,{key:0,message:s,class:"mb-3"},null,8,["message"])):n("",!0)]))),128)),l.$page.props.flash.error?(r(),f(x,{key:0,message:l.$page.props.flash.error,class:"mb-3"},null,8,["message"])):n("",!0),o(t).errors.title?(r(),a("div",T,[Z,m(" "+g(o(t).errors.title),1)])):n("",!0),o(t).errors.decks?(r(),a("div",G,[U,m(" "+g(o(t).errors.decks),1)])):n("",!0),e("div",A,[E,h(e("input",{"data-testid":"title-input-group",type:"text","onUpdate:modelValue":c[0]||(c[0]=s=>o(t).title=s),class:"w-full text-lg font-medium",name:"title",id:"title-group"},null,512),[[B,o(t).title]])]),e("div",F,[e("div",H,[e("table",O,[Q,e("tbody",null,[(r(!0),a(p,null,k(i.availableDecks.data,s=>(r(),a("tr",{key:s.id,class:"border-b border-gray-200 dark:border-gray-700 text-black"},[e("td",q,g(s.title),1),e("td",z,[e("label",I,[h(e("input",{"data-testid":"checkbox-deck",type:"checkbox",id:"checkbox-"+s.id,"onUpdate:modelValue":c[1]||(c[1]=u=>d.value=u),value:s.id},null,8,J),[[S,d.value]]),m(" Add to Group ")])])]))),128))])]),e("div",K,[b(L,{links:i.availableDecks.links,onNavigate:_,from:i.availableDecks.from,to:i.availableDecks.to,total:i.availableDecks.total},null,8,["links","from","to","total"])])])]),e("div",P,[e("button",{"data-testid":"group-submit-btn",id:"submit",type:"submit",disabled:o(t).processing,class:"w-full block mt-5 font-bold uppercase focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}," Submit ",8,R)])],32)])]),_:1})],64))}};export{se as default};
