import{d as s,r as n}from"./relativeTime-C_3v0EPj.js";import{h as l,o as a,f as r,b as i,t as o,u as d,a as m,w as u,d as h,j as x}from"./app-BKrfffZD.js";const f={class:"mt-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"},w={class:"flex flex-row justify-between"},k={class:"dark:text-white"},g={key:0,class:"text-right text-gray-900 dark:text-slate-200"},b={key:1,class:"text-right dark:text-white"},N={__name:"Index",props:{item:Object},setup(e){const{item:t}=e,c=l(()=>t.type==="deck"?route("deck.show",{deck:t.id}):t.type==="group"?route("group.show",{group:t.id}):"#");return s.extend(n),(y,p)=>(a(),r("div",f,[i("div",w,[i("span",k,"Created: "+o(d(s)(e.item.created_at).fromNow()),1)]),m(d(x),{href:c.value,as:"button",class:"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},{default:u(()=>[h(o(e.item.title),1)]),_:1},8,["href"]),e.item.lastviewed!==null?(a(),r("span",g,"Last Viewed: "+o(d(s)(e.item.lastviewed).fromNow()),1)):(a(),r("span",b,"Not Viewed"))]))}};export{N as default};