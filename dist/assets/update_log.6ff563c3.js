var a=Object.defineProperty,t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,n=(t,e,r)=>e in t?a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;import{r as s,j as o,h as u,t as l,a1 as i,c as p,b as c,d,w as y,H as h,e as b,o as g}from"./vendor.474d5cdf.js";import"./index.0514862f.js";const f={name:"Introduce",setup(){const a=s({update_log:[]});o((()=>{i()}));const i=async()=>{const t=await u.get("/api/back/updatelogs/index");a.update_log=t.data};return((a,s)=>{for(var o in s||(s={}))e.call(s,o)&&n(a,o,s[o]);if(t)for(var o of t(s))r.call(s,o)&&n(a,o,s[o]);return a})({},l(a))}},m=b("后台代码仓库："),_=b("https://github.com/xingyu-Lu/vue3-hospital-data-analyse"),j=b("api代码仓库："),v=b("https://github.com/xingyu-Lu/hospital_data_analyse_api");f.render=function(a,t,e,r,n,s){const o=i;return g(),p(h,null,[c("h3",null,[m,d(o,{type:"primary",underline:!1,target:"_blank",href:"https://github.com/xingyu-Lu/vue3-hospital-data-analyse"},{default:y((()=>[_])),_:1})]),c("h3",null,[j,d(o,{type:"primary",underline:!1,target:"_blank",href:"https://github.com/xingyu-Lu/hospital_data_analyse_api"},{default:y((()=>[v])),_:1})])],64)};export{f as default};
