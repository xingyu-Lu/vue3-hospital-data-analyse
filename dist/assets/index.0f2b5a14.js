var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,n=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r;import{K as o,u as i,r as d,j as p,h as c,t as u,P as b,i as h,E as m,Q as g,R as y,O as f,T as k,F as j,w,o as P,d as _,U as C,c as O,b as v,e as x}from"./vendor.1e67c67e.js";/* empty css                        *//* empty css                *//* empty css                    */import"./index.639a1bdf.js";const E={name:"menu_list",setup(){const e=o(null),m=i(),g=d({loading:!1,tableData:[]});p((()=>{y()}));const y=()=>{g.loading=!0,c.get("/api/back/menus",{params:{page:g.currentPage,page_size:g.pageSize}}).then((e=>{g.tableData=e.data,g.loading=!1}))};return f=((e,a)=>{for(var t in a||(a={}))l.call(a,t)&&n(e,t,a[t]);if(r)for(var t of r(a))s.call(a,t)&&n(e,t,a[t]);return e})({},u(g)),a(f,t({multipleTable:e,changePage:e=>{g.currentPage=e,y()},handleAdd:()=>{m.push({path:"/menu-add"})},handleEdit:e=>{m.push({path:"/menu-add",query:{id:e}})},handleStatus:(e,a)=>{c.put("/api/back/menus/status",{id:e,is_enabled:a}).then((()=>{h.success("修改成功"),y()}))},Plus:b}));var f}},S=x("新增菜单"),A={key:0,style:{color:"#67C23A"}},D={key:1,style:{color:"#E6A23C"}},z=["onClick"],T=["onClick"],q=["onClick"];E.render=function(e,a,t,r,l,s){const n=m,o=g,i=y,d=f,p=k;return P(),j(d,{style:{"min-height":"100%"}},{header:w((()=>[_(n,{type:"primary",icon:r.Plus,onClick:r.handleAdd},{default:w((()=>[S])),_:1},8,["icon","onClick"])])),default:w((()=>[C(_(i,{data:e.tableData,stripe:"",style:{width:"100%"}},{default:w((()=>[_(o,{prop:"name",label:"名称"}),_(o,{prop:"url",label:"路由"}),_(o,{prop:"status",label:"状态"},{default:w((e=>[1==e.row.is_enabled?(P(),O("span",A,"启用中")):(P(),O("span",D,"禁用"))])),_:1}),_(o,{prop:"sort",label:"排序"}),_(o,{prop:"created_at",label:"创建时间"}),_(o,{label:"操作",width:"100"},{default:w((e=>[v("a",{style:{cursor:"pointer","margin-right":"10px"},onClick:a=>r.handleEdit(e.row.id)},"修改",8,z),1==e.row.is_enabled?(P(),O("a",{key:0,style:{cursor:"pointer","margin-right":"10px"},onClick:a=>r.handleStatus(e.row.id,0)},"禁用",8,T)):(P(),O("a",{key:1,style:{cursor:"pointer","margin-right":"10px"},onClick:a=>r.handleStatus(e.row.id,1)},"启用",8,q))])),_:1})])),_:1},8,["data"]),[[p,e.loading]])])),_:1})};export{E as default};
