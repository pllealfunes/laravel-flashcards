import{d as t,r as i}from"./relativeTime-CiwzQXIg.js";import{h as u,o as s,f as r,b as d,t as a,u as o,a as c,w as n,d as h,j as x}from"./app-DBJs8iBK.js";const f={class:"mt-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},w={class:"flex flex-row justify-between"},k={class:"dark:text-white"},m={key:0,class:"text-right text-gray-900 dark:text-slate-200"},g={key:1,class:"text-right dark:text-white"},j={__name:"Index",props:{result:Object},setup(e){const l=u(()=>e.result.type==="deck"?route("deck.show",{deck:e.result.id}):e.result.type==="group"?route("group.show",{group:e.result.id}):"#");return t.extend(i),(b,y)=>(s(),r("div",f,[d("div",w,[d("span",k,"Created: "+a(o(t)(e.result.created_at).fromNow()),1)]),c(o(x),{href:l.value,as:"button",class:"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},{default:n(()=>[h(a(e.result.title),1)]),_:1},8,["href"]),e.result.lastviewed!==null?(s(),r("span",m,"Last Viewed: "+a(o(t)(e.result.lastviewed).fromNow()),1)):(s(),r("span",g,"Not Viewed"))]))}};export{j as default};
