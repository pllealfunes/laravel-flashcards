import{_ as w}from"./AuthenticatedLayout-z7y-MNx4.js";import{k as f,l as $,h as b,o as e,f as r,a as i,u as L,w as _,F as m,Z as B,b as c,c as l,g as d,m as h}from"./app-ClAM8AZN.js";import g from"./Index-igkNaEW5.js";import{_ as C}from"./SuccessToast-DvKvjr2u.js";import{_ as D,a as y}from"./Pagination-B5SkXA9v.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./relativeTime-BXuHrXUI.js";const j={class:"flex justify-between items-center"},N=c("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Dashboard ",-1),S={class:"md:w-80"},V={key:1,class:"flex flex-wrap justify-center items-center gap-4"},A={key:2,class:"flex flex-wrap justify-center items-center gap-4"},H={__name:"Dashboard",props:{decks:Array,groups:Array,successLogin:String},setup(k){const{decks:v,flashcards:F,groups:p,successLogin:E}=k,o=f([]),n=f("");$(async()=>{let s=v.filter(a=>!p.some(t=>t.id===a.group_id));o.value=[...s.map(a=>({...a,type:"deck"})),...p.map(a=>({...a,type:"group"}))]});const x=s=>{n.value=s},u=b(()=>o.value.filter(s=>s.title.toLowerCase().includes(n.value.toLowerCase())));return(s,a)=>(e(),r(m,null,[i(L(B),{title:"Dashboard"}),i(w,null,{header:_(()=>[c("div",j,[N,c("div",S,[i(D,{onSearch:x})])])]),default:_(()=>[s.$page.props.flash.success?(e(),l(C,{key:0,message:s.$page.props.flash.success},null,8,["message"])):d("",!0),n.value?(e(),r("div",V,[c("div",null,[(e(!0),r(m,null,h(u.value,t=>(e(),l(g,{key:t.id,item:t},null,8,["item"]))),128)),u.value.length>10?(e(),l(y,{key:0,results:u.value,class:"mt-5"},null,8,["results"])):d("",!0)])])):(e(),r("div",A,[(e(!0),r(m,null,h(o.value,t=>(e(),l(g,{key:t.id,item:t},null,8,["item"]))),128)),o.value.length>10?(e(),l(y,{key:0,results:"items",class:"mt-5"})):d("",!0)]))]),_:1})],64))}};export{H as default};