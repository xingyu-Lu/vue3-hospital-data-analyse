var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,r=(a,t,l)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[t]=l;import{K as i,u as d,r as s,j as p,q as c,h as m,t as f,P as u,_ as b,$ as h,a4 as g,E as y,Q as w,R as _,O as j,T as k,F as v,w as x,o as O,b as D,d as E,c as P,G as C,H as V,U as F,e as R}from"./vendor.206eb2e4.js";/* empty css                        *//* empty css                *//* empty css                    *//* empty css                     *//* empty css                       *//* empty css                 *//* empty css                  */import{a as U}from"./index.80ae0dda.js";let L=U("userinfo").name;"root"==L&&(L="口腔科");const Y={name:"admin-list",setup(){i(!0),i(null),d();const e=s({date:[(new Date).getFullYear()+"-1",(new Date).getFullYear()+"-"+((new Date).getMonth()+1)],office_name:L,office_list:[],charge_subclass:"",loading:!1,tableData:[],multipleSelection:[]});p((()=>{h(),b()})),c((()=>{}));const b=()=>{e.loading=!0,m.get("/api/back/billingRanks",{params:{office_name:e.office_name,date:e.date}}).then((a=>{e.tableData=a.data,e.loading=!1}))},h=()=>{m.get("/api/back/offices",{params:{is_lc:1,indicator:1}}).then((a=>{e.office_list=a.data}))};return g=((e,a)=>{for(var t in a||(a={}))o.call(a,t)&&r(e,t,a[t]);if(l)for(var t of l(a))n.call(a,t)&&r(e,t,a[t]);return e})({},f(e)),a(g,t({handleOption:()=>{b()},handleExport:()=>{m.get("/api/back/billingRanks/export",{params:{office_name:e.office_name,date:e.date},responseType:"blob"}).then((a=>{let t=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=window.URL.createObjectURL(t),o=document.createElement("a");o.style.display="none",o.href=l,o.setAttribute("id","downloadLink");let n=new Date(e.date[0]).getFullYear()+"/"+(new Date(e.date[0]).getMonth()+1),r=new Date(e.date[1]).getFullYear()+"/"+(new Date(e.date[1]).getMonth()+1);o.setAttribute("download",e.office_name+"-开单排名-"+n+"-"+r+".xlsx"),document.body.appendChild(o),o.click();let i=document.getElementById("downloadLink");document.body.removeChild(i)}))},Plus:u}));var g}},M=R("搜索"),A=R("导出Excel");Y.render=function(e,a,t,l,o,n){const r=b,i=h,d=g,s=y,p=w,c=_,m=j,f=k;return O(),v(m,{style:{"min-height":"100%"}},{header:x((()=>[D("div",null,[E(i,{modelValue:e.office_name,"onUpdate:modelValue":a[0]||(a[0]=a=>e.office_name=a),placeholder:"请选择",filterable:"",style:{"margin-bottom":"20px","margin-right":"10px"}},{default:x((()=>[(O(!0),P(V,null,C(e.office_list,(e=>(O(),v(r,{key:e.id,label:e.value,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),E(d,{modelValue:e.date,"onUpdate:modelValue":a[1]||(a[1]=a=>e.date=a),type:"monthrange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"]),E(s,{type:"primary",onClick:l.handleOption,style:{"margin-left":"10px"}},{default:x((()=>[M])),_:1},8,["onClick"]),E(s,{type:"primary",onClick:l.handleExport},{default:x((()=>[A])),_:1},8,["onClick"])])])),default:x((()=>[F(E(c,{data:e.tableData,stripe:"",style:{width:"100%"}},{default:x((()=>[E(p,{prop:"rank",label:"金额排名",width:"100"}),E(p,{prop:"charge_name",label:"收费项目名称",width:"800"}),E(p,{prop:"money",label:"金额(元)"}),E(p,{prop:"ratio",label:"占科室收入比例"})])),_:1},8,["data"]),[[f,e.loading]])])),_:1})};export{Y as default};
