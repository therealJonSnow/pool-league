import{r as T,o as i,c as d,a,b as f,i as A,O as S,M as w,q as M,d as g,l as O,v as x,A as D,w as V,T as B,e as u,f as y,g as F,F as h,h as b,t as c,j as v,k as L,m as N,y as C,n as j,p as R,s as U,u as q}from"./vendor.1ad84b73.js";const G=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};G();var p=(l,t)=>{for(const[o,n]of t)l[o]=n;return l};const H={},K={class:"background relative h-screen w-screen"};function W(l,t){const o=T("router-view");return i(),d("div",null,[a("main",K,[f(o)])])}var $=p(H,[["render",W],["__scopeId","data-v-786b1190"]]);console.log({}.VITE_API_KEY);const Y={apiKey:{}.VITE_API_KEY,authDomain:{}.VITE_AUTH_DOMAIN,projectId:{}.VITE_PROJECT_ID,storageBucket:{}.VITE_STORAGE_BUCKET,messagingSenderId:{}.VITE_MESSAGING_SENDER_ID,appId:{}.VITE_APP_ID},z=A(Y),m=S(z);async function k(l){const t=w(g(l,"users"),M("points","desc")),o=await O(t),n=[];return o.forEach(e=>{n.push({name:e.id,record:e.data()})}),n}async function I(l,t,o){const n=x(l,"users",t);try{await D(l,async e=>{const r=await e.get(n);if(!r.exists())throw"Document does not exist!";e.update(n,{played:r.data().played+1}),o&&e.update(n,{win:r.data().win+1}),o||e.update(n,{loss:r.data().loss+1})}),console.log("Transaction successfully committed!")}catch(e){console.log("Transaction failed: ",e)}}async function E(l,t,o){const n=x(l,"users",t);try{await D(l,async e=>{const r=await e.get(n);if(!r.exists())throw"Document does not exist!";e.update(n,{points:r.data().points+o})}),console.log("Transaction successfully committed!")}catch(e){console.log("Transaction failed: ",e)}}const J={data(){return{showForm:!1,player1:null,player2:null,winner:null,loser:null,honestyBox:!1}},props:{leaderboardData:Object},computed:{activePlayers(){return[this.player1?this.player1:null,this.player2?this.player2:null]}},mounted(){},methods:{subForm(){if(this.honestyBox){this.loser=this.player1!==this.winner?this.player1:this.player2,I(m,this.winner,!0),I(m,this.loser,!1);const l=this.leaderboardData.findIndex(s=>s.name===this.winner),t=this.leaderboardData.findIndex(s=>s.name===this.loser);this.leaderboardData[l].record.points,this.leaderboardData[t].record.points;let o=0,n=0;for(let s=Math.min(l,t)+1;s<Math.max(l,t);s++)this.leaderboardData[s].record.points!==o&&(o=this.leaderboardData[s].record.points,n+=1);n=Math.max(n,1);let e,r;l<t?(r=3,e=-3):l>t?(r=n*3,e=-(n*3)):(r=3,e=-3),E(m,this.winner,r),E(m,this.loser,e),this.showForm=!1}else alert("BE HONEST")}}},Q={class:""},X={key:"form",class:"fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-items-center items-center bg-slate-200 px-16 py-12 rounded-xl"},Z=a("label",{class:"block",for:"player1"},"Player 1:",-1),ee=["value"],te=a("label",{class:"block",for:"player1"},"Player 2:",-1),se=["value"],re=a("label",{class:"block",for:"player1"},"Winner:",-1),oe=["value"],ae=["value"],ne={class:"flex justify-start items-center mb-6 w-max"},le=a("label",{class:"block",for:"I promise I'm not cheating"},"I promise I'm not cheating",-1);function ie(l,t,o,n,e,r){return i(),d("div",Q,[a("div",{onClick:t[0]||(t[0]=s=>e.showForm=!0),class:"background custom-shadow relative cursor-pointer rounded w-max mx-auto py-3 px-4"},"Add Result"),f(B,{name:"fade"},{default:V(()=>[u(a("div",{key:"background",onClick:t[1]||(t[1]=F(s=>e.showForm=!1,["self"])),class:"fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gray-600 bg-opacity-90"},null,512),[[y,e.showForm]]),u(a("div",X,[Z,u(a("select",{class:"block custom-shadow bg-slate-200 border-0 w-full rounded m-0 mb-3",name:"Player1","onUpdate:modelValue":t[2]||(t[2]=s=>e.player1=s),id:"player1"},[(i(!0),d(h,null,b(o.leaderboardData,s=>u((i(),d("option",{key:s.name,value:s.name},c(s.name),9,ee)),[[y,s.name!==e.player2]])),128))],512),[[v,e.player1]]),te,u(a("select",{class:"block custom-shadow bg-slate-200 border-0 w-full rounded m-0 mb-3",name:"Player2","onUpdate:modelValue":t[3]||(t[3]=s=>e.player2=s),id:"player2"},[(i(!0),d(h,null,b(o.leaderboardData,s=>u((i(),d("option",{key:s.name,value:s.name},c(s.name),9,se)),[[y,s.name!==e.player1]])),128))],512),[[v,e.player2]]),re,u(a("select",{class:"block custom-shadow bg-slate-200 border-0 w-full rounded m-0 mb-6",name:"Winner","onUpdate:modelValue":t[4]||(t[4]=s=>e.winner=s),id:"winner"},[a("option",{value:r.activePlayers[0]},c(r.activePlayers[0]),9,oe),a("option",{value:r.activePlayers[1]},c(r.activePlayers[1]),9,ae)],512),[[v,e.winner]]),a("div",ne,[u(a("input",{"onUpdate:modelValue":t[5]||(t[5]=s=>e.honestyBox=s),class:"mr-4 rounded-full",type:"checkbox",name:"I promise I'm not cheating"},null,512),[[L,e.honestyBox]]),le]),a("div",{onClick:t[6]||(t[6]=(...s)=>r.subForm&&r.subForm(...s)),class:"background custom-shadow cursor-pointer block rounded w-max mx-auto py-3 px-4"},"Submit Result")],512),[[y,e.showForm]])]),_:1})])}var de=p(J,[["render",ie]]);const ce={data(){return{}},props:{user:{type:Object}}},ue={class:"grid grid-cols-5 grid-rows-1 items-center justify-items-center mb-1"};function me(l,t,o,n,e,r){return i(),d("div",ue,[a("div",null,c(o.user.name),1),a("div",null,c(o.user.record.played),1),a("div",null,c(o.user.record.win),1),a("div",null,c(o.user.record.loss),1),a("div",null,c(o.user.record.points),1)])}var pe=p(ce,[["render",me]]);const _e={data(){return{}},props:{leaderboardData:Array}},fe={class:"w-96 mx-auto"},ye=a("div",{class:"grid grid-cols-5 grid-rows-1 items-center justify-items-center font-bold border-b-2 border-b-pink-500 mb-2"},[a("div",null,"name"),a("div",null,"played"),a("div",null,"win"),a("div",null,"loss"),a("div",null,"points")],-1);function he(l,t,o,n,e,r){const s=pe;return i(),d("div",fe,[ye,(i(!0),d(h,null,b(o.leaderboardData,_=>(i(),N(s,{key:_.name,user:_},null,8,["user"]))),128))])}var be=p(_e,[["render",he]]);const ve={data(){return{leaderboardData:null,show:!1}},computed:{isDataLoaded(){return this.leaderboardData!==null?(console.log("computed",this.leaderboardData),!0):!1}},mounted(){console.log(this.leaderboardData),setTimeout(()=>{this.show=!0},1e3),k(m).then(t=>{this.leaderboardData=t});const l=w(g(m,"users"));C(l,t=>{k(m).then(o=>{this.leaderboardData=o})})}},we={key:0,class:"background absolute top-1/2 left-1/2 rounded-3xl transform -translate-x-1/2 -translate-y-1/2 custom-shadow flex flex-col items-center justify-center p-10"},ge=a("h1",{class:"text-3xl mb-6"},"POPCOMMS P\u{1F3B1}\u{1F3B1}L LEAGUE",-1);function xe(l,t,o,n,e,r){const s=be,_=de;return r.isDataLoaded?(i(),d("div",we,[ge,f(s,{class:"mb-6",leaderboardData:e.leaderboardData},null,8,["leaderboardData"]),f(_,{leaderboardData:e.leaderboardData},null,8,["leaderboardData"])])):j("",!0)}var De=p(ve,[["render",xe]]);const ke=[{path:"/",component:De,meta:{title:"Home"}}],P=R($),Ie=U({history:q(),routes:ke});P.use(Ie);P.mount("#app");