import{k as c,o as n,f as i,b as e,i as h,p as b,e as v,h as x,n as u,F as k,m,t as y}from"./app-ClAM8AZN.js";const p=e("label",{for:"default-search",class:"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"},"Search",-1),w={class:"relative"},_=e("div",{class:"absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"},[e("svg",{class:"w-4 h-4 text-gray-500 dark:text-gray-400","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})])],-1),f=e("button",{type:"submit",class:"text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}," Search ",-1),V={__name:"SearchBar",emits:["search"],setup(g,{emit:t}){const s=c(""),l=t,a=()=>{l("search",s.value)};return(d,o)=>(n(),i("form",{onSubmit:v(a,["prevent"]),class:"max-w-lg mx-auto"},[p,e("div",w,[_,h(e("input",{type:"search",id:"default-search","onUpdate:modelValue":o[0]||(o[0]=r=>s.value=r),onInput:a,class:"block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",required:""},null,544),[[b,s.value]]),f])],32))}},C={"aria-label":"Page navigation example"},$={class:"flex items-center -space-x-px h-10 text-base"},B={href:"#",class:"flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"},j=["disabled"],P=e("svg",{class:"w-3 h-3 rtl:rotate-180","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 1 1 5l4 4"})],-1),S=["onClick"],M={href:"#",class:"flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"},F=["disabled"],z=e("svg",{class:"w-3 h-3 rtl:rotate-180","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 9 4-4-4-4"})],-1),D=10,q={__name:"Pagination",props:["results"],setup(g){const t=c(1),{results:s}=g;console.log(s);const l=d=>{t.value=d},a=x(()=>Math.ceil(s.length/D));return(d,o)=>(n(),i("div",null,[e("nav",C,[e("ul",$,[e("li",null,[e("a",B,[e("button",{onClick:o[0]||(o[0]=r=>l(t.value-1)),disabled:t.value===1,class:u({"text-white":t.value!==1,"cursor-not-allowed":t.value===1})}," Previous ",10,j),P])]),(n(!0),i(k,null,m(Math.min(a.value,10),r=>(n(),i("li",{key:r,onClick:I=>l(r),class:u(["flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",{"bg-yellow-800":t.value===r}])},[e("button",null,y(r),1)],10,S))),128)),e("li",null,[e("a",M,[e("button",{onClick:o[1]||(o[1]=r=>l(t.value+1)),disabled:t.value===a.value,class:u({"text-white":t.value!==a.value,"cursor-not-allowed":t.value===a.value})}," Next ",10,F),z])])])])]))}};export{V as _,q as a};