var a=Object.defineProperty,t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,s=(t,e,n)=>e in t?a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;import{r as l,j as r,h as u,t as o,a1 as i,a2 as p,a3 as d,c,b as y,d as b,w as h,H as m,e as g,o as f,G as _,F as v,n as j}from"./vendor.206eb2e4.js";import"./index.0b1d56ef.js";const x={name:"Introduce",setup(){const a=l({update_log:[]});r((()=>{i()}));const i=async()=>{const t=await u.get("/api/back/updatelogs/index");a.update_log=t.data};return((a,l)=>{for(var r in l||(l={}))e.call(l,r)&&s(a,r,l[r]);if(t)for(var r of t(l))n.call(l,r)&&s(a,r,l[r]);return a})({},o(a))}},O=g("后台代码仓库："),k=g("https://github.com/xingyu-Lu/vue3-hospital-data-analyse"),w=g("api代码仓库："),L=g("https://github.com/xingyu-Lu/hospital_data_analyse_api"),P=y("h3",null,"更新记录",-1),I={class:"block"};x.render=function(a,t,e,n,s,l){const r=i,u=p,o=d;return f(),c(m,null,[y("h3",null,[O,b(r,{type:"primary",underline:!1,target:"_blank",href:"https://github.com/xingyu-Lu/vue3-hospital-data-analyse"},{default:h((()=>[k])),_:1})]),y("h3",null,[w,b(r,{type:"primary",underline:!1,target:"_blank",href:"https://github.com/xingyu-Lu/hospital_data_analyse_api"},{default:h((()=>[L])),_:1})]),P,y("div",I,[b(o,null,{default:h((()=>[(f(!0),c(m,null,_(a.update_log,((a,t)=>(f(),v(u,{key:t,timestamp:a.timestamp},{default:h((()=>[g(j(a.content),1)])),_:2},1032,["timestamp"])))),128))])),_:1})])],64)};export{x as default};
