var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r;import{K as d,u as n,r as i,j as p,h as c,t as b,P as u,E as h,Q as f,R as m,O as y,T as g,F as j,w as O,o as w,d as P,U as k,b as v,e as _}from"./vendor.1d1ee131.js";/* empty css                        *//* empty css                *//* empty css                    */import"./index.884957e6.js";const x={name:"admin-list",setup(){d(!0),d(null);const e=n(),h=i({loading:!1,tableData:[]});p((()=>{f()}));const f=()=>{h.loading=!0,c.get("/api/back/roles").then((e=>{h.tableData=e.data,h.loading=!1}))};return m=((e,a)=>{for(var t in a||(a={}))l.call(a,t)&&s(e,t,a[t]);if(r)for(var t of r(a))o.call(a,t)&&s(e,t,a[t]);return e})({},b(h)),a(m,t({handleAdd:()=>{e.push({path:"/role-add"})},handleEdit:a=>{e.push({path:"/role-add",query:{id:a}})},Plus:u}));var m}},C=_("新增角色"),D=["onClick"];x.render=function(e,a,t,r,l,o){const s=h,d=f,n=m,i=y,p=g;return w(),j(i,{style:{"min-height":"100%"}},{header:O((()=>[P(s,{type:"primary",icon:r.Plus,onClick:r.handleAdd},{default:O((()=>[C])),_:1},8,["icon","onClick"])])),default:O((()=>[k(P(n,{data:e.tableData,stripe:"",style:{width:"100%"}},{default:O((()=>[P(d,{prop:"id",label:"id"}),P(d,{prop:"name",label:"角色名字"}),P(d,{prop:"guard_name",label:"守卫"}),P(d,{prop:"created_at",label:"创建时间"}),P(d,{label:"操作",width:"100"},{default:O((e=>[v("a",{style:{cursor:"pointer","margin-right":"10px"},onClick:a=>r.handleEdit(e.row.id)},"修改",8,D)])),_:1})])),_:1},8,["data"]),[[p,e.loading]])])),_:1})};export{x as default};
