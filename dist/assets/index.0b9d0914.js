var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,r=(a,t,l)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[t]=l;import{K as s,u as i,r as d,j as p,q as c,h as m,t as u,P as b,p as f,a as g,_ as h,$ as y,a4 as _,L as w,E as x,Q as v,R as j,O as k,T as O,F as D,w as V,o as E,b as P,d as C,c as A,G as I,H as L,U,e as F}from"./vendor.1d1ee131.js";/* empty css                        *//* empty css                *//* empty css                    *//* empty css                 *//* empty css                       *//* empty css                  */import"./index.bec09c6b.js";import{i as B}from"./index.b8aacb85.js";let M=null;const Y={name:"admin-list",setup(){s(!0),s(null),i();const e=d({date:[(new Date).getFullYear()+"-"+(new Date).getMonth(),(new Date).getFullYear()+"-"+((new Date).getMonth()+1)],office_name:"口腔科",office_list:[],charge_subclass:"",loading:!1,tableData:[],multipleSelection:[],option:{title:{text:""},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:[]},toolbox:{show:!0,orient:"vertical",left:"right",top:"center",feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar","stack"]},restore:{show:!0},saveAsImage:{show:!0}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!0,data:[]}],yAxis:[{type:"value"}],series:[]}});p((()=>{g(),f(),M=B(document.getElementById("zoom"))})),c((()=>{M.dispose()}));const f=()=>{e.loading=!0,m.get("/api/back/billingincomes",{params:{office_name:e.office_name,charge_subclass:e.charge_subclass,date:e.date}}).then((a=>{M.dispose(),M=B(document.getElementById("zoom")),e.tableData=a.data.data,e.loading=!1,e.option.title.text=a.data.title,e.option.legend.data=a.data.legend_arr,e.option.xAxis[0].data=a.data.date_arr,e.option.series=a.data.series_arr,M.setOption(e.option)}))},g=()=>{m.get("/api/back/offices").then((a=>{e.office_list=a.data}))};return h=((e,a)=>{for(var t in a||(a={}))o.call(a,t)&&r(e,t,a[t]);if(l)for(var t of l(a))n.call(a,t)&&r(e,t,a[t]);return e})({},u(e)),a(h,t({handleOption:()=>{f()},handleExport:()=>{m.get("/api/back/billingincomes/export",{params:{office_name:e.office_name,charge_subclass:e.charge_subclass,date:e.date},responseType:"blob"}).then((a=>{let t=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=window.URL.createObjectURL(t),o=document.createElement("a");o.style.display="none",o.href=l,o.setAttribute("id","downloadLink");let n=new Date(e.date[0]).getFullYear()+"/"+(new Date(e.date[0]).getMonth()+1),r=new Date(e.date[1]).getFullYear()+"/"+(new Date(e.date[1]).getMonth()+1);o.setAttribute("download",e.office_name+"-开单金额-"+n+"-"+r+".xlsx"),document.body.appendChild(o),o.click();let s=document.getElementById("downloadLink");document.body.removeChild(s)}))},Plus:b}));var h}};f("data-v-12c28b82");const z=F("搜索"),R=F("导出Excel"),T=P("div",{id:"zoom"},null,-1);g(),Y.render=function(e,a,t,l,o,n){const r=h,s=y,i=_,d=w,p=x,c=v,m=j,u=k,b=O;return E(),D(u,{style:{"min-height":"100%"}},{header:V((()=>[P("div",null,[C(s,{modelValue:e.office_name,"onUpdate:modelValue":a[0]||(a[0]=a=>e.office_name=a),placeholder:"请选择",filterable:"",style:{"margin-bottom":"20px","margin-right":"10px"}},{default:V((()=>[(E(!0),A(L,null,I(e.office_list,(e=>(E(),D(r,{key:e.id,label:e.value,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),C(i,{modelValue:e.date,"onUpdate:modelValue":a[1]||(a[1]=a=>e.date=a),type:"monthrange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"]),C(d,{style:{width:"200px","margin-top":"20px","margin-right":"10px","margin-left":"10px"},placeholder:"请输入收费项目",modelValue:e.charge_subclass,"onUpdate:modelValue":a[2]||(a[2]=a=>e.charge_subclass=a),clearable:""},null,8,["modelValue"]),C(p,{type:"primary",onClick:l.handleOption},{default:V((()=>[z])),_:1},8,["onClick"]),C(p,{type:"primary",onClick:l.handleExport},{default:V((()=>[R])),_:1},8,["onClick"])])])),default:V((()=>[T,U(C(m,{data:e.tableData,stripe:"",style:{width:"100%"}},{default:V((()=>[C(c,{prop:"date",label:"日期"}),C(c,{prop:"billing_dep",label:"开单科室"}),C(c,{prop:"patient_dep",label:"病人科室"}),C(c,{prop:"charge_subclass",label:"收费项目"}),C(c,{prop:"num",label:"数量"}),C(c,{prop:"money",label:"金额"})])),_:1},8,["data"]),[[b,e.loading]])])),_:1})},Y.__scopeId="data-v-12c28b82";export{Y as default};
