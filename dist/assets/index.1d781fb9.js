var a=Object.defineProperty,e=Object.defineProperties,t=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,d=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;import{K as s,u as n,r as i,j as p,h as c,t as b,P as u,E as f,Q as h,R as m,O as y,T as j,F as g,w as O,o as w,d as P,U as k,b as v,e as _}from"./vendor.81ef1ad3.js";/* empty css                        *//* empty css                *//* empty css                    *//* empty css                     */import"./index.ccd2722b.js";const x={name:"admin-list",setup(){s(!0),s(null);const a=n(),f=i({loading:!1,tableData:[]});p((()=>{h()}));const h=()=>{f.loading=!0,c.get("/api/back/roles").then((a=>{f.tableData=a.data,f.loading=!1}))};return m=((a,e)=>{for(var t in e||(e={}))l.call(e,t)&&d(a,t,e[t]);if(r)for(var t of r(e))o.call(e,t)&&d(a,t,e[t]);return a})({},b(f)),e(m,t({handleAdd:()=>{a.push({path:"/role-add"})},handleEdit:e=>{a.push({path:"/role-add",query:{id:e}})},Plus:u}));var m}},C=_("新增角色"),D=["onClick"];x.render=function(a,e,t,r,l,o){const d=f,s=h,n=m,i=y,p=j;return w(),g(i,{style:{"min-height":"100%"}},{header:O((()=>[P(d,{type:"primary",icon:r.Plus,onClick:r.handleAdd},{default:O((()=>[C])),_:1},8,["icon","onClick"])])),default:O((()=>[k(P(n,{data:a.tableData,stripe:"",style:{width:"100%"}},{default:O((()=>[P(s,{prop:"id",label:"id"}),P(s,{prop:"name",label:"角色名字"}),P(s,{prop:"guard_name",label:"守卫"}),P(s,{prop:"created_at",label:"创建时间"}),P(s,{label:"操作",width:"100"},{default:O((a=>[v("a",{style:{cursor:"pointer","margin-right":"10px"},onClick:e=>r.handleEdit(a.row.id)},"修改",8,D)])),_:1})])),_:1},8,["data"]),[[p,a.loading]])])),_:1})};export{x as default};
