import{o as s,c as l,a as i,u as r,b as e,d as c,w as o,F as g,e as h,f as u,g as t,Z as m,i as d}from"./app-CR7DxkEp.js";const x={class:"bg-white border-gray-200 dark:bg-gray-900 sm:right-0"},f={class:"flex justify-between items-center mx-auto max-w-screen-xl p-4"},y=u('<div class="flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6 mr-1"><path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"></path><path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd"></path></svg><a href="#"><span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flash</span></a></div>',1),b={class:"w-full md:w-auto",id:"navbar-default"},p={key:0,class:"text-end sm:top-0 sm:right-0 p-6 text-end"},w=u('<section class="relative flex justify-center items-center bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white py-10"><div class="grid max-w-screen-xl px-4 py-8 w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"><div class="text-center"><h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"> Study Smarter Not Harder. </h1><p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"> Study in a flash with decks, quizzes, and games. Let us help you get ready for the big day. </p></div><img class="lg:mx-5" src="/images/study.png" alt="A backpack with a computer on its left and a open notebook with pencil on the right"></div></section><section class="p-10 mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 place-items-center"><div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"><a href="#"><img class="rounded-t-lg" src="/images/Studying-cuate.png" alt="Studying Education illustrations by Storyset"></a><div class="p-5"><a href="#"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Create Flashacards </h5></a><p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Create decks, organize them by subject, and search for the one you need for your next study session. </p></div></div><div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"><a href="#"><img class="rounded-t-lg" src="/images/Online-test-bro.png" alt="Online Test People Illustrations by Storyset"></a><div class="p-5"><a href="#"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Quiz Yourself </h5></a><p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Quiz yourself before the big day is of the best ways to get ready for the big day. Walk out of the test with a smile. </p></div></div><div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"><a href="#"><img class="rounded-t-lg" src="/images/Online-games-addiction-bro.png" alt="Online Games Addiction Bro by Storyset"></a><div class="p-5"><a href="#"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Learning is Fun </h5></a><p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Learning is more fun with games. Study with your decks and have fun doing it with one of our games. </p></div></div></section>',2),k={class:"shadow dark:bg-gray-900 mt-10"},v={class:"mx-auto p-4 md:py-8"},_={class:"sm:flex sm:items-end sm:justify-end"},S={class:"flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-3"},B=e("li",null,[e("a",{href:"https://github.com/pllealfunes/laravel-flashcards",class:"hover:underline me-4 md:me-6"},"GitHub")],-1),F=e("hr",{class:"my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"},null,-1),L=e("span",{class:"block text-sm text-gray-500 sm:text-center dark:text-gray-400"},[t("© 2024 "),e("a",{href:"#",class:"hover:underline"},"Flash™"),t(". All Rights Reserved.")],-1),z={__name:"Welcome",props:{canLogin:{type:Boolean},canRegister:{type:Boolean}},setup(n){return(a,N)=>(s(),l(g,null,[i(r(m),{title:"Welcome"}),e("nav",x,[e("div",f,[y,e("div",b,[n.canLogin?(s(),l("div",p,[a.$page.props.auth.user?(s(),c(r(d),{key:0,href:a.route("dashboard"),class:"font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:o(()=>[t("Dashboard")]),_:1},8,["href"])):(s(),l(g,{key:1},[i(r(d),{href:a.route("login"),class:"font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:o(()=>[t("Log in")]),_:1},8,["href"]),n.canRegister?(s(),c(r(d),{key:0,href:a.route("register"),class:"ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:o(()=>[t("Register")]),_:1},8,["href"])):h("",!0)],64))])):h("",!0)])])]),w,e("footer",k,[e("div",v,[e("div",_,[e("ul",S,[i(r(d),{href:a.route("about"),class:"font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:o(()=>[t("About")]),_:1},8,["href"]),B])]),F,L])])],64))}};export{z as default};