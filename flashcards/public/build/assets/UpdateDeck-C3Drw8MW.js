import{Q as G,s as Y,x as ee,y as te,j as P,T,o as n,d as z,a as y,w as U,k as m,b as e,z as L,h,A as E,n as se,u as t,p as v,c as i,t as a,e as c,q,B as oe,l as M,F as A,Z as le,g as O,m as Q,C as H}from"./app-DqCWJOKh.js";import{_ as ae}from"./AuthenticatedLayout-Czi820B5.js";import{_ as ne,a as re}from"./SearchBar-DXLO8nAf.js";import{_ as ie}from"./ErrorToast--a9rrwXi.js";import{_ as W}from"./DeleteModal-4_qx0I4p.js";import{_ as R}from"./NewPagination-BFwffxIF.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const de={class:"fixed inset-0 overflow-y-auto flex justify-center items-center z-50"},ce={class:"flex justify-center items-center"},ue={class:"relative p-4 w-full max-w-md max-h-full"},pe={class:"relative bg-white rounded-lg shadow"},me=e("h3",{class:"mx-4 py-4 text-lg font-semibold text-gray-900"}," Add Card : ",-1),he=e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),fe=e("span",{class:"sr-only"},"Close modal",-1),be=[he,fe],xe=e("hr",null,null,-1),ge={class:"grid gap-4 mb-4 grid-cols-2"},_e={class:"col-span-2"},ye=e("label",{for:"question",class:"block mb-2 uppercase font-bold text-xs m-1"},"* Question :",-1),ve={key:0,class:"text-red-500 mb-2"},we=e("label",{for:"answer",class:"block mb-2 uppercase font-bold text-xs m-1"},"* Answer :",-1),ke={key:1,class:"text-red-500 mb-2"},Ce=e("label",{for:"hint",class:"block mb-2 uppercase font-bold text-xs m-1 w-full"},"Hint :",-1),$e={key:2,class:"text-red-500 mb-2"},je=e("label",{for:"difficulty",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"Difficulty level :",-1),Me=e("option",{disabled:"",value:""}," Please select one ",-1),qe=e("option",null,"easy",-1),Ue=e("option",null,"medium",-1),Ve=e("option",null,"hard",-1),Ze=[Me,qe,Ue,Ve],Se={key:3,class:"text-red-500 mb-2"},Be=e("label",{for:"points",class:"block mb-2 uppercase font-bold text-xs m-1"},"Points :",-1),De=e("option",{disabled:"",value:""}," Please select one ",-1),Le=e("option",null,"1",-1),Ee=e("option",null,"3",-1),Ae=e("option",null,"5",-1),He=[De,Le,Ee,Ae],Pe={key:4,class:"text-red-500 mb-2"},Te={class:"flex justify-center items-center"},ze=["disabled"],Ne={__name:"CreateCardModal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},deckId:{type:Number},deckUser:{type:Number}},emits:["close"],setup(u,{emit:$}){const V=G(),x=u,k=$;Y(()=>x.show,()=>{x.show?document.body.style.overflow="hidden":document.body.style.overflow=null});const j=()=>{x.closeable&&k("close")},b=g=>{g.key==="Escape"&&x.show&&j()};ee(()=>document.addEventListener("keydown",b)),te(()=>{document.removeEventListener("keydown",b),document.body.style.overflow=null});const w=P(()=>({sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"})[x.maxWidth]),d=T({deck_id:x.deckId,deck_user:x.deckUser,question:"",answer:"",hint:"",difficulty:"",points:""}),B=async()=>{try{await d.post(route("flashcard.store"),{preserveState:g=>Object.keys(g.props.errors).length>0},{onSuccess:()=>{cardForm.clearErrors(),cardForm.reset(),k("close")}})}catch(g){V.props.flash.error=`Error Deleting Card: ${g}`}};return(g,f)=>(n(),z(oe,{to:"body"},[y(L,{"leave-active-class":"duration-200"},{default:U(()=>[m(e("div",de,[y(L,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:U(()=>[m(e("div",{class:"fixed inset-0 bg-gray-500 opacity-75",onClick:h(j,["stop"])},null,512),[[E,u.show]])]),_:1}),y(L,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:U(()=>[m(e("div",{class:se(["mb-6 rounded-lg overflow-hidden transform transition-all sm:w-full sm:mx-auto",w.value])},[e("div",ce,[e("div",ue,[e("div",pe,[me,e("button",{type:"button",class:"absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",onClick:h(j,["stop"])},be),xe,e("form",{class:"p-4",onSubmit:h(B,["prevent"])},[e("div",ge,[e("div",_e,[ye,m(e("input",{"data-testid":"question-input",id:"question",name:"question",type:"text","onUpdate:modelValue":f[0]||(f[0]=_=>t(d).question=_),class:"mb-2 w-full text-black"},null,512),[[v,t(d).question]]),t(d).errors.question?(n(),i("p",ve,a(t(d).errors.question),1)):c("",!0),we,m(e("input",{"data-testid":"answer-input",id:"answer",name:"answer",type:"text","onUpdate:modelValue":f[1]||(f[1]=_=>t(d).answer=_),class:"mb-2 w-full text-black"},null,512),[[v,t(d).answer]]),t(d).errors.answer?(n(),i("p",ke,a(t(d).errors.answer),1)):c("",!0),Ce,m(e("input",{"data-testid":"hint-input",id:"hint",name:"hint",type:"text","onUpdate:modelValue":f[2]||(f[2]=_=>t(d).hint=_),class:"mb-2 w-full text-black"},null,512),[[v,t(d).hint]]),t(d).errors.hint?(n(),i("p",$e,a(t(d).errors.hint),1)):c("",!0),je,m(e("select",{"data-testid":"difficulty-select","onUpdate:modelValue":f[3]||(f[3]=_=>t(d).difficulty=_),name:"difficulty",class:"mb-2 text-black"},Ze,512),[[q,t(d).difficulty]]),t(d).errors.difficulty?(n(),i("p",Se,a(t(d).errors.difficulty),1)):c("",!0),Be,m(e("select",{"data-testid":"points-select",id:"points","onUpdate:modelValue":f[4]||(f[4]=_=>t(d).points=_),name:"points"},He,512),[[q,t(d).points]]),t(d).errors.points?(n(),i("p",Pe,a(t(d).errors.points),1)):c("",!0)])]),e("div",Te,[e("button",{"data-testid":"new-card-submit",type:"submit",disabled:t(d).processing,class:"block mt-5 font-bold uppercase focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}," Submit ",8,ze)])],32)])])])],2),[[E,u.show]])]),_:1})],512),[[E,u.show]])]),_:1})]))}},Fe={class:"flex flex-row flex-wrap justify-between items-center"},Ie={class:"flex flex-col"},Oe={class:"flex flex-row justify-center items-center gap-2"},Qe={class:"font-semibold text-xl text-gray-800 leading-tight"},We=e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"black",class:"w-5 h-5 cursor-pointer"},[e("path",{d:"M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"}),e("path",{d:"M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"})],-1),Re=[We],Ge={key:0,class:"absolute mt-5"},Je={class:"relative mt-2 z-10"},Ke={class:"relative bg-white rounded-lg shadow dark:bg-gray-700"},Xe={class:"flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"},Ye=e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white"}," Edit Deck Title : ",-1),et=e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),tt=e("span",{class:"sr-only"},"Close modal",-1),st=[et,tt],ot={class:"grid gap-4 mb-4 grid-cols-2"},lt={class:"col-span-2"},at={for:"title",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},nt={key:0,class:"text-red-300 font-bold mt-1"},rt=["disabled"],it={class:"md:w-80"},dt={class:"flex flex-row justify-evenly items-center"},ct=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})],-1),ut=e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-6 h-6"},[e("path",{"fill-rule":"evenodd",d:"M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z","clip-rule":"evenodd"})],-1),pt={id:"flashcardsList",class:"mt-10 p-5 md:p-10"},mt={class:"flex flex-wrap justify-center items-center"},ht={class:"relative overflow-x-auto shadow-md rounded-lg mb-10"},ft={key:0},bt={class:"w-full text-sm text-left rtl:text-right p-10"},xt=e("thead",{class:"text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-10"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Question "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Answer "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Hint "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Level "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 text-slate-50"}," Points "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 text-slate-50"}," Actions ")])],-1),gt={class:"px-6 py-4"},_t={class:"px-6 py-4"},yt={class:"px-6 py-4"},vt={class:"px-6 py-4"},wt={class:"px-11"},kt={class:"px-6 py-4"},Ct={class:"flex space-x-2"},$t=["onClick"],jt=e("span",null,"Delete Card",-1),Mt=e("span",{class:"ml-1"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-4 h-4"},[e("path",{"fill-rule":"evenodd",d:"M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z","clip-rule":"evenodd"})])],-1),qt=[jt,Mt],Ut=["onClick"],Vt=e("span",null,"Update Card",-1),Zt=e("span",{class:"ml-1"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"black",class:"w-5 h-5 cursor-pointer"},[e("path",{d:"M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"}),e("path",{d:"M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"})])],-1),St=[Vt,Zt],Bt={key:0,class:"fixed inset-0 z-50 overflow-y-auto"},Dt={class:"flex items-center justify-center min-h-screen"},Lt={class:"relative bg-white rounded-lg shadow-lg w-full max-w-md"},Et={class:"flex justify-between items-center p-4 border-b"},At=e("h3",{class:"text-lg font-semibold text-gray-900"}," Edit Card : ",-1),Ht=["onClick"],Pt=e("svg",{class:"w-5 h-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1),Tt=e("span",{class:"sr-only"},"Close modal",-1),zt=[Pt,Tt],Nt={class:"grid gap-4 mb-4 grid-cols-2"},Ft={class:"col-span-2"},It=e("label",{for:"question",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"* Question : ",-1),Ot={key:0,class:"text-red-500 mb-2"},Qt=e("label",{for:"answer",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"* Answer : ",-1),Wt={key:1,class:"text-red-500 mb-2"},Rt=e("label",{for:"hint",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"Hint :",-1),Gt={key:2,class:"text-red-500 mb-2"},Jt=e("label",{for:"difficulty",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"Difficulty level :",-1),Kt=e("option",{disabled:"",value:""}," Please select one ",-1),Xt=e("option",null," easy ",-1),Yt=e("option",null," medium ",-1),es=e("option",null," hard ",-1),ts=[Kt,Xt,Yt,es],ss={key:3,class:"text-red-500 mb-2"},os=e("label",{for:"points",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"Points :",-1),ls=e("option",{disabled:"",value:""}," Please select one ",-1),as=e("option",null," 1 ",-1),ns=e("option",null," 3 ",-1),rs=e("option",null," 5 ",-1),is=[ls,as,ns,rs],ds={key:4,class:"text-red-500 mb-2"},cs=["disabled"],us={class:"flex justify-center items-center"},ps={key:1},ms={class:"w-full text-sm text-left rtl:text-right p-10"},hs=e("thead",{class:"text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-10"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Question "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Answer "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Hint "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"}," Level "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 text-slate-50"}," Points "),e("th",{scope:"col",class:"px-6 py-3 bg-gray-800 text-slate-50"}," Actions ")])],-1),fs={class:"px-6 py-4"},bs={class:"px-6 py-4"},xs={class:"px-6 py-4"},gs={class:"px-6 py-4"},_s={class:"px-11"},ys={class:"px-6 py-4"},vs={class:"flex space-x-2"},ws=["onClick"],ks=e("span",null,"Delete Card",-1),Cs=e("span",{class:"ml-1"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-4 h-4"},[e("path",{"fill-rule":"evenodd",d:"M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z","clip-rule":"evenodd"})])],-1),$s=[ks,Cs],js=["onClick"],Ms=e("span",null,"Update Card",-1),qs=e("span",{class:"ml-1"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"black",class:"w-5 h-5 cursor-pointer"},[e("path",{d:"M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"}),e("path",{d:"M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"})])],-1),Us=[Ms,qs],Vs={key:0,"data-testid":"update-card-modal",class:"fixed inset-0 z-50 overflow-y-auto"},Zs={class:"flex items-center justify-center min-h-screen"},Ss={class:"relative bg-white rounded-lg shadow-lg w-full max-w-md"},Bs={class:"flex justify-between items-center p-4 border-b"},Ds=e("h3",{class:"text-lg font-semibold text-gray-900"}," Edit Card : ",-1),Ls=["onClick"],Es=e("svg",{class:"w-5 h-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1),As=e("span",{class:"sr-only"},"Close modal",-1),Hs=[Es,As],Ps={class:"grid gap-4 mb-4 grid-cols-2"},Ts={class:"col-span-2"},zs=e("label",{for:"question",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"* Question : ",-1),Ns={key:0,class:"text-red-500 mb-2"},Fs=e("label",{for:"answer",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"* Answer : ",-1),Is={key:1,class:"text-red-500 mb-2"},Os=e("label",{for:"hint",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"Hint :",-1),Qs={key:2,class:"text-red-500 mb-2"},Ws=e("label",{for:"difficulty",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"Difficulty level :",-1),Rs=e("option",{disabled:"",value:""}," Please select one ",-1),Gs=e("option",null," easy ",-1),Js=e("option",null," medium ",-1),Ks=e("option",null," hard ",-1),Xs=[Rs,Gs,Js,Ks],Ys={key:3,class:"text-red-500 mb-2"},eo=e("label",{for:"points",class:"block mb-2 text-sm font-medium text-gray-900 text-black"},"Points :",-1),to=e("option",{disabled:"",value:""}," Please select one ",-1),so=e("option",null," 1 ",-1),oo=e("option",null," 3 ",-1),lo=e("option",null," 5 ",-1),ao=[to,so,oo,lo],no={key:4,class:"text-red-500 mb-2"},ro=["disabled"],io={class:"flex justify-center items-center"},co={key:0,class:"flex flex-col justify-center items-center mt-36"},uo=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"purple",class:"size-40"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"})],-1),po={class:"mt-11 text-2xl font-bold"},yo={__name:"UpdateDeck",props:{deck:Object,flashcards:Object},setup(u){const $=G(),V=M(!1),x=M(!1),k=M(!1),j=M(!1),b=M(null),w=M(""),d=l=>{H.visit(l,{preserveState:!0,preserveScroll:!0,replace:!0})},B=l=>{w.value=l.trim()},g=P(()=>u.flashcards.data.filter(l=>l.question.toLowerCase().includes(w.value.toLowerCase()))),f=P(()=>{const o=g.value.length,p=g.value.length;return{from:1,to:o,total:p}}),_=()=>{j.value=!j.value},C=T({title:u.deck.title}),Z=M(!1),N=()=>{Z.value=!Z.value,C.clearErrors(),C.reset()},J=async()=>{try{await C.patch(route("deck.updateTitle",{deck:u.deck.id}),{onSuccess:()=>{Z.value=!1}})}catch(l){$.props.flash.error=`Unable to update card. Error: ${l}`}};let s={};const S=l=>{b.value=l,s=T({question:l.question,answer:l.answer,hint:l.hint,difficulty:l.difficulty,points:l.points}),k.value=!k.value},F=async()=>{try{await s.put(route("flashcard.update",{flashcard:b.value}),{preserveState:l=>Object.keys(l.props.errors).length>0},{onSuccess:()=>{k.value=!1,s.clearErrors(),b.value=null}})}catch(l){$.props.flash.error=`Unable to update card. Error: ${l}`}},I=()=>{V.value=!V.value},K=async()=>{try{await H.delete(route("deck.destroy",{deck:u.deck.id}))}catch(l){$.props.flash.error=`Unable to delete deck. Error: ${l}`}},D=l=>{b.value=l,x.value=!x.value},X=async()=>{try{u.flashcards.data.findIndex(o=>o.id===b.value.id)!==-1?(u.flashcards.data.splice(b.value,1),await H.delete(route("flashcard.destroy",{flashcard:b.value}),{preserveState:o=>Object.keys(o.props.errors).length>0},{onSuccess:()=>{x.value=!1,b.value=null}})):$.props.flash.error="Unable to delete card or deck does not contain 2 cards."}catch(l){$.props.flash.error=`Error Deleting Card: ${l}`}};return(l,o)=>(n(),i(A,null,[y(t(le),null,{default:U(()=>[e("title",null,"Update "+a(u.deck.title),1)]),_:1}),y(ae,null,{header:U(()=>[e("div",Fe,[e("div",Ie,[e("div",Oe,[e("h2",Qe,a(u.deck.title),1),e("div",{"data-testid":"edit-deck-title-icon",onClick:h(N,["stop"])},Re)]),Z.value?(n(),i("div",Ge,[e("div",Je,[e("div",Ke,[e("div",Xe,[Ye,e("button",{onClick:h(N,["stop"]),type:"button",class:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"},st)]),e("form",{class:"p-4 md:p-5",onSubmit:h(J,["prevent"])},[e("div",ot,[e("div",lt,[e("label",at,a(u.deck.title),1),m(e("input",{"data-testid":"edit-deck-input",type:"text",class:"mb-2 w-full text-black","onUpdate:modelValue":o[0]||(o[0]=p=>t(C).title=p),name:"title",id:"title"},null,512),[[v,t(C).title]]),t(C).errors.title?(n(),i("div",nt,a(t(C).errors.title),1)):c("",!0)])]),e("button",{"data-testid":"edit-deck-title-btn",type:"submit",disabled:t(C).processing,class:"text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}," Submit ",8,rt)],32)])])])):c("",!0)]),e("div",it,[y(ne,{onSearch:B,value:w.value.value},null,8,["value"])]),e("div",dt,[e("button",{"data-testid":"add-card-deck-btn",class:"flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-700 dark:hover:bg-purple-500 dark:focus:ring-purple-900",onClick:h(_,["stop"])},[ct,O(" Add Card ")]),e("button",{"data-testid":"delete-deck-btn",class:"flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",onClick:h(I,["stop"])},[O(" Delete Deck "),ut])]),y(Ne,{show:j.value,onClose:_,deckId:u.deck.id,deckUser:u.deck.user_id},null,8,["show","deckId","deckUser"])])]),default:U(()=>[y(W,{show:V.value,onClose:I,deleteFunction:K,message:"Are you sure you want to delete this deck?"},null,8,["show"]),y(W,{show:x.value,onClose:D,deleteFunction:X,message:"Are you sure you want to delete this card?"},null,8,["show"]),l.$page.props.flash.success?(n(),z(re,{key:0,message:l.$page.props.flash.success},null,8,["message"])):c("",!0),l.$page.props.flash.error?(n(),z(ie,{key:1,message:l.$page.props.flash.error},null,8,["message"])):c("",!0),e("section",pt,[e("div",mt,[e("div",ht,[w.value&&g.value.length>0?(n(),i("div",ft,[e("table",bt,[xt,e("tbody",null,[(n(!0),i(A,null,Q(g.value,p=>(n(),i("tr",{key:p.id,class:"border-b border-gray-200 dark:border-gray-700 text-black"},[e("td",gt,a(p.question),1),e("td",_t,a(p.answer),1),e("td",yt,a(p.hint),1),e("td",vt,a(p.difficulty),1),e("td",wt,a(p.points),1),e("td",kt,[e("div",Ct,[e("button",{class:"flex p-4 flex-row justify-center items-center focus:outline-none text-white font-dark bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",onClick:h(r=>D(p),["stop"])},qt,8,$t),e("button",{type:"button",id:"updateCardBtn",onClick:h(r=>S(p),["stop"]),class:"flex p-4 flex-row justify-center items-center focus:outline-none text-black font-dark bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"},St,8,Ut)])]),k.value?(n(),i("div",Bt,[e("div",Dt,[e("div",Lt,[e("div",Et,[At,e("button",{onClick:h(r=>S(p),["stop"]),type:"button",class:"text-gray-400 hover:text-gray-900"},zt,8,Ht)]),e("form",{class:"p-4",onSubmit:o[6]||(o[6]=h(r=>F(b.value),["prevent"]))},[e("div",Nt,[e("div",Ft,[It,m(e("input",{type:"text",name:"question",id:"question",class:"mb-2 w-full text-black","onUpdate:modelValue":o[1]||(o[1]=r=>t(s).question=r)},null,512),[[v,t(s).question]]),t(s).errors.question?(n(),i("p",Ot,a(t(s).errors.question),1)):c("",!0),Qt,m(e("input",{type:"text",name:"answer",id:"answer",class:"mb-2 w-full text-black","onUpdate:modelValue":o[2]||(o[2]=r=>t(s).answer=r)},null,512),[[v,t(s).answer]]),t(s).errors.answer?(n(),i("p",Wt,a(t(s).errors.answer),1)):c("",!0),Rt,m(e("input",{type:"text",name:"hint",id:"hint",class:"mb-2 w-full text-black","onUpdate:modelValue":o[3]||(o[3]=r=>t(s).hint=r)},null,512),[[v,t(s).hint]]),t(s).errors.hint?(n(),i("p",Gt,a(t(s).errors.hint),1)):c("",!0),Jt,m(e("select",{"onUpdate:modelValue":o[4]||(o[4]=r=>t(s).difficulty=r),name:"difficulty",id:"difficulty",class:"mb-2 text-black"},ts,512),[[q,t(s).difficulty]]),t(s).errors.difficulty?(n(),i("p",ss,a(t(s).errors.difficulty),1)):c("",!0),os,m(e("select",{"onUpdate:modelValue":o[5]||(o[5]=r=>t(s).points=r),name:"points",id:"points",class:"text-black"},is,512),[[q,t(s).points]]),t(s).errors.points?(n(),i("p",ds,a(t(s).errors.points),1)):c("",!0)])]),e("button",{type:"submit",disabled:t(s).processing,class:"text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}," Submit ",8,cs)],32)])])])):c("",!0)]))),128))])]),e("div",us,[y(R,{links:u.flashcards.links,onNavigate:d,from:f.value.from,to:f.value.to,total:f.value.total},null,8,["links","from","to","total"])])])):c("",!0),!w.value&&u.flashcards.data.length>0?(n(),i("div",ps,[e("table",ms,[hs,e("tbody",null,[(n(!0),i(A,null,Q(u.flashcards.data,p=>(n(),i("tr",{"data-testid":"flashcard-item",key:p.id,class:"border-b border-gray-200 dark:border-gray-700 text-black"},[e("td",fs,a(p.question),1),e("td",bs,a(p.answer),1),e("td",xs,a(p.hint),1),e("td",gs,a(p.difficulty),1),e("td",_s,a(p.points),1),e("td",ys,[e("div",vs,[e("button",{"data-testid":"delete-card-btn",class:"flex p-4 flex-row justify-center items-center focus:outline-none text-white font-dark bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",onClick:h(r=>D(p),["stop"])},$s,8,ws),e("button",{type:"button",id:"updateCardBtn","data-testid":"update-card-btn",onClick:h(r=>S(p),["stop"]),class:"flex p-4 flex-row justify-center items-center focus:outline-none text-black font-dark bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"},Us,8,js)])]),k.value?(n(),i("div",Vs,[e("div",Zs,[e("div",Ss,[e("div",Bs,[Ds,e("button",{onClick:h(r=>S(p),["stop"]),type:"button",id:"updateCardBtn",class:"text-gray-400 hover:text-gray-900"},Hs,8,Ls)]),e("form",{class:"p-4",onSubmit:o[12]||(o[12]=h(r=>F(b.value),["prevent"]))},[e("div",Ps,[e("div",Ts,[zs,m(e("input",{"data-testid":"question-input",type:"text",id:"question",name:"question",class:"mb-2 w-full text-black","onUpdate:modelValue":o[7]||(o[7]=r=>t(s).question=r)},null,512),[[v,t(s).question]]),t(s).errors.question?(n(),i("p",Ns,a(t(s).errors.question),1)):c("",!0),Fs,m(e("input",{"data-testid":"answer-input",type:"text",id:"answer",name:"answer",class:"mb-2 w-full text-black","onUpdate:modelValue":o[8]||(o[8]=r=>t(s).answer=r)},null,512),[[v,t(s).answer]]),t(s).errors.answer?(n(),i("p",Is,a(t(s).errors.answer),1)):c("",!0),Os,m(e("input",{"data-testid":"hint-input",type:"text",name:"hint",id:"hint",class:"mb-2 w-full text-black","onUpdate:modelValue":o[9]||(o[9]=r=>t(s).hint=r)},null,512),[[v,t(s).hint]]),t(s).errors.hint?(n(),i("p",Qs,a(t(s).errors.hint),1)):c("",!0),Ws,m(e("select",{"onUpdate:modelValue":o[10]||(o[10]=r=>t(s).difficulty=r),name:"difficulty",id:"difficulty",class:"mb-2 text-black"},Xs,512),[[q,t(s).difficulty]]),t(s).errors.difficulty?(n(),i("p",Ys,a(t(s).errors.difficulty),1)):c("",!0),eo,m(e("select",{"onUpdate:modelValue":o[11]||(o[11]=r=>t(s).points=r),name:"points",id:"points",class:"text-black"},ao,512),[[q,t(s).points]]),t(s).errors.points?(n(),i("p",no,a(t(s).errors.points),1)):c("",!0)])]),e("button",{"data-testid":"submit-update-card",type:"submit",disabled:t(s).processing,class:"text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}," Submit ",8,ro)],32)])])])):c("",!0)]))),128))])]),e("div",io,[y(R,{links:u.flashcards.links,onNavigate:d,from:u.flashcards.from,to:u.flashcards.to,total:u.flashcards.total},null,8,["links","from","to","total"])])])):c("",!0)]),w.value&&g.value.length===0?(n(),i("div",co,[uo,e("p",po,' No matching Results for "'+a(w.value)+'" ',1)])):c("",!0)])])]),_:1})],64))}};export{yo as default};
