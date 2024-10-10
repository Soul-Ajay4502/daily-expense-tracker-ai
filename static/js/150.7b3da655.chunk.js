(self.webpackChunkdaily_expense_tracker=self.webpackChunkdaily_expense_tracker||[]).push([[150],{7516:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>me});var i=t(5043),s=t(5218),r=t(8903),a=t(1906),o=t(7561),l=t(9190),d=t(9362),c=t(8988),p=t(5865),x=t(9650),u=t(1596),h=t(1806),m=t(4882),A=t(8076),g=t(39),j=t(3460),y=t(7392),b=t(35),v=t(6600),f=t(5316),T=t(8533),w=t(9347),S=t(3768),C=t(3003),R=t(446),I=t.n(R),k=t(2019),D=t(579);const F=e=>{let{filter:n}=e;const t=(0,C.wA)(),{items:s,status:r}=(0,C.d4)((e=>e.expenses)),[a,o]=(0,i.useState)(s),[l,d]=(0,i.useState)(!1),[c,R]=(0,i.useState)(null);(0,i.useEffect)((()=>{const e=I()();let t=s;"day"===n?t=s.filter((n=>{const t=n.date?n.date.toDate?n.date.toDate():new Date(n.date):null;return t&&I()(t).isSame(e,"day")})):"week"===n?t=s.filter((n=>{const t=n.date?n.date.toDate?n.date.toDate():new Date(n.date):null;return t&&I()(t).isSame(e,"week")})):"month"===n&&(t=s.filter((n=>{const t=n.date?n.date.toDate?n.date.toDate():new Date(n.date):null;return t&&I()(t).isSame(e,"month")}))),o(t)}),[n,s]);const F=()=>{d(!1),R(null)};return"loading"===r?(0,D.jsx)(p.A,{children:"Loading..."}):(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(x.A,{component:u.A,style:{marginTop:"20px"},children:(0,D.jsxs)(h.A,{children:[(0,D.jsx)(m.A,{children:(0,D.jsxs)(A.A,{children:[(0,D.jsx)(g.A,{children:"Date (MM-DD-YY)"}),(0,D.jsx)(g.A,{children:"Income Type"}),(0,D.jsx)(g.A,{children:"Income Amount"}),(0,D.jsx)(g.A,{children:"Expense Type"}),(0,D.jsx)(g.A,{children:"Expense Amount"}),(0,D.jsx)(g.A,{children:"Actions"})]})}),(0,D.jsxs)(j.A,{children:[a.map((e=>(0,D.jsxs)(A.A,{children:[(0,D.jsx)(g.A,{children:I()(e.date.toDate?e.date.toDate():new Date(e.date)).format("MM/DD/YYYY")}),(0,D.jsx)(g.A,{children:e.incomeType||"-"}),(0,D.jsx)(g.A,{children:e.incomeAmount||"-"}),(0,D.jsx)(g.A,{children:e.expenseType||"-"}),(0,D.jsx)(g.A,{children:e.expenseAmount||"-"}),(0,D.jsx)(g.A,{children:(0,D.jsx)(y.A,{"aria-label":"delete",onClick:()=>{return n=e.id,R(n),void d(!0);var n},children:(0,D.jsx)(S.A,{})})})]},e.id))),0===a.length&&(0,D.jsx)(A.A,{children:(0,D.jsx)(g.A,{colSpan:6,align:"center",children:"No records found."})})]})]})}),(0,D.jsxs)(b.A,{open:l,onClose:F,children:[(0,D.jsx)(v.A,{children:"Confirm Delete"}),(0,D.jsx)(f.A,{children:(0,D.jsx)(T.A,{children:"Are you sure you want to delete this expense? This action cannot be undone."})}),(0,D.jsxs)(w.A,{children:[(0,D.jsx)(y.A,{onClick:F,color:"primary",children:"Cancel"}),(0,D.jsx)(y.A,{onClick:()=>{c&&(t((0,k.Pw)(c)),d(!1),R(null))},color:"secondary",children:"Delete"})]})]})]})};var $=t(5795),E=t(3516),M=t(899);const L=["Salary","Bonus","Investment","Rental Income","Other"],N=["Rent","Food","Travel","Cosmetics","Bills","Other"],W=e=>{let{open:n,handleClose:t}=e;const i=(0,C.wA)(),{user:s}=(0,C.d4)((e=>e.auth)),o=M.Ik().shape({date:M.p6().required("Date is required."),incomeType:M.Yj().required("Income type is required."),incomeAmount:M.ai().required().typeError("Must be a number.").positive("Amount must be positive.").max(999999999,"Amount too large."),expenseType:M.Yj().required("Expense type is required."),expenseAmount:M.ai().required("Expense amount is required.").typeError("Must be a number.").positive("Amount must be positive.").max(999999999,"Amount too large.")}),l={date:I()().format("YYYY-MM-DD"),incomeType:"",incomeAmount:"",expenseType:"",expenseAmount:""};return(0,D.jsxs)(b.A,{open:n,onClose:t,children:[(0,D.jsx)(v.A,{children:"Add Income/Expense"}),(0,D.jsx)(f.A,{children:(0,D.jsx)(E.l1,{initialValues:l,validationSchema:o,onSubmit:(e,n)=>{let{resetForm:r}=n;const a={userId:s.uid,date:new Date(e.date),incomeType:e.incomeType,incomeAmount:e.incomeAmount?parseFloat(e.incomeAmount):0,expenseType:e.expenseType||null,expenseAmount:e.expenseAmount?parseFloat(e.expenseAmount):0};i((0,k.k5)(a)),t(),r()},children:e=>{let{handleChange:n,setFieldValue:i,values:s,errors:o,touched:l}=e;return(0,D.jsxs)(E.lV,{children:[(0,D.jsxs)(r.Ay,{container:!0,spacing:2,style:{marginTop:"10px"},children:[(0,D.jsx)(r.Ay,{item:!0,xs:12,children:(0,D.jsx)(E.D0,{as:$.A,label:"Date",type:"date",name:"date",fullWidth:!0,InputLabelProps:{shrink:!0},error:l.date&&!!o.date,helperText:l.date&&(0,D.jsx)(E.Kw,{name:"date"})})}),(0,D.jsx)(r.Ay,{item:!0,xs:6,children:(0,D.jsx)(E.D0,{as:$.A,select:!0,label:"Income Type",name:"incomeType",fullWidth:!0,onChange:n,helperText:l.incomeType&&(0,D.jsx)(E.Kw,{name:"incomeType"}),children:L.map((e=>(0,D.jsx)(c.A,{value:e,children:e},e)))})}),(0,D.jsx)(r.Ay,{item:!0,xs:6,children:(0,D.jsx)(E.D0,{as:$.A,label:"Income Amount",name:"incomeAmount",fullWidth:!0,error:l.incomeAmount&&!!o.incomeAmount,helperText:l.incomeAmount&&(0,D.jsx)(E.Kw,{name:"incomeAmount"}),disabled:!s.incomeType,title:s.incomeType?"":"Select any Income Type"})}),(0,D.jsx)(r.Ay,{item:!0,xs:6,children:(0,D.jsx)(E.D0,{as:$.A,select:!0,label:"Expense Type",name:"expenseType",fullWidth:!0,onChange:n,helperText:l.expenseType&&(0,D.jsx)(E.Kw,{name:"expenseType"}),children:N.map((e=>(0,D.jsx)(c.A,{value:e,children:e},e)))})}),(0,D.jsx)(r.Ay,{item:!0,xs:6,children:(0,D.jsx)(E.D0,{as:$.A,label:"Expense Amount",name:"expenseAmount",fullWidth:!0,error:l.expenseAmount&&!!o.expenseAmount,helperText:l.expenseAmount&&(0,D.jsx)(E.Kw,{name:"expenseAmount"}),disabled:!s.expenseType,title:s.expenseType?"":"Select any Expense Type"})})]}),(0,D.jsxs)(w.A,{children:[(0,D.jsx)(a.A,{onClick:t,color:"secondary",children:"Cancel"}),(0,D.jsx)(a.A,{type:"submit",color:"primary",variant:"contained",children:"Add"})]})]})}})})]})};var Y=t(7353),O=t(1637),P=t(108),q=t(2291),G=t(2185),K=t(6026),z=t(6150),B=t(8643),_=t(163),Z=t(4240),V=t(7869),Q=t(1327),H=t(6065);const U=()=>{const{items:e}=(0,C.d4)((e=>e.expenses)),n=(0,C.wA)(),{reportData:t,expenseData:s,incomeTotal:r,expenseTotal:o}=(0,C.d4)((e=>e.report)),[l,d]=(0,i.useState)(!1);return(0,D.jsxs)(u.A,{style:{padding:"20px",marginTop:"20px"},children:[(0,D.jsx)(p.A,{variant:"h2",textAlign:"center",borderRadius:"20px",sx:{boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.2)"},children:"Financial Report"}),(0,D.jsx)(a.A,{variant:"contained",color:"primary",onClick:()=>{d(!0);const t=e.reduce(((e,n)=>e+(n.incomeAmount||0)),0),i=e.reduce(((e,n)=>e+(n.expenseAmount||0)),0),s=t-i,r=e.reduce(((e,n)=>(n.expenseType&&(e[n.expenseType]=(e[n.expenseType]||0)+(n.expenseAmount||0)),e)),{}),a=Object.entries(r).map((e=>{let[n,t]=e;return{name:n,value:t}})),o=[{label:"Expense ",value:""},{label:"Total Income",value:`\u20b9${t.toFixed(2)}`},{label:"Total Expenses",value:`\u20b9${i.toFixed(2)}`},{label:"Net Savings",value:`\u20b9${s<0?0:s.toFixed(2)}`},{label:"Net Loss",value:`\u20b9${s>0?0:s.toFixed(2)}`},{label:"Expenses by Category",value:""},...Object.entries(r).map((e=>{let[n,t]=e;return{label:n,value:`\u20b9${t.toFixed(2)}`}})),{label:"Recommendations",value:""},...s<0?[{label:"1. Consider reducing discretionary spending to improve net savings.",value:""},{label:"2. Review recurring expenses and identify potential savings.",value:""}]:[{label:"1. Maintain current spending habits to sustain savings.",value:""},{label:"2. Consider investing surplus income for better financial growth.",value:""}]];n((0,H.jL)(o)),n((0,H.Zi)(a)),n((0,H._Z)(t)),n((0,H.PN)(i)),d(!1)},style:{marginTop:"10px"},children:"Generate Report"}),l&&(0,D.jsx)(Y.A,{position:"fixed",top:"0",left:"0",width:"100%",bgcolor:"rgba(255, 255, 255, 0.8)",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:(0,D.jsx)(O.A,{style:{marginLeft:"10px"}})}),t.length>0&&(0,D.jsxs)(Y.A,{style:{marginTop:"20px"},children:[(0,D.jsx)(Y.A,{sx:{borderRadius:1,p:2,bgcolor:"#ede8eb"},children:t.map(((e,n)=>(0,D.jsxs)(p.A,{variant:"body1",style:{marginBottom:"10px",fontWeight:""===e.value?"bold":"normal"},children:[e.label,e.value&&`: ${e.value}`]},n)))}),(0,D.jsx)("h2",{children:"Chart Representations"}),(0,D.jsxs)(Y.A,{sx:{borderRadius:1,p:2,bgcolor:"#ede8eb"},children:[(0,D.jsx)(P.u,{width:"100%",height:300,children:(0,D.jsxs)(q.E,{data:[{name:"Total Income",value:r},{name:"Total Expenses",value:o}],margin:{top:20,right:30,left:20,bottom:5},children:[(0,D.jsx)(G.W,{dataKey:"name",tick:{color:"#000",fontSize:14,fontWeight:"bold",fill:"#4a4a4a"}}),(0,D.jsx)(K.h,{tick:{color:"#000",fontSize:14,fontWeight:"bold",fill:"#4a4a4a"}}),(0,D.jsx)(z.m,{}),(0,D.jsx)(B.y,{dataKey:"value",fill:"#8884d8"})]})}),(0,D.jsxs)(P.u,{width:"100%",height:300,children:[(0,D.jsx)("div",{style:{textAlign:"center"},children:"Expenses by Category"}),(0,D.jsxs)(_.r,{children:[(0,D.jsx)(Z.F,{data:s,cx:"50%",cy:"50%",labelLine:!1,outerRadius:80,fill:"#8884d8",children:s.map(((e,n)=>(0,D.jsx)(V.f,{fill:`#${Math.floor(16777215*Math.random()).toString(16)}`},`cell-${n}`)))}),(0,D.jsx)(z.m,{}),(0,D.jsx)(Q.s,{})]})]})]})]})]})};var J=t(2211),X=t(2194);const ee=()=>{var e;const n=(0,C.wA)(),{items:t}=(0,C.d4)((e=>e.expenses)),{aiReportData:s,hasRisk:r}=(0,C.d4)((e=>e.aiReport)),[o,l]=(0,i.useState)(""),[d,c]=(0,i.useState)(!1),x=async e=>{const t=(e=>{const n=e.reduce(((e,n)=>e+(n.incomeAmount||0)),0),t=e.reduce(((e,n)=>e+(n.expenseAmount||0)),0);return{incomeTotal:n,expenseTotal:t,netSavings:n-t,expenseCategories:e.reduce(((e,n)=>(n.expenseType&&(e[n.expenseType]=(e[n.expenseType]||0)+(n.expenseAmount||0)),e)),{})}})(e),i=(()=>{const e=X.ilg();return e.add(X.ZFI.dense({inputShape:[2],units:16,activation:"relu"})),e.add(X.ZFI.dense({units:8,activation:"relu"})),e.add(X.ZFI.dense({units:1,activation:"sigmoid"})),e.compile({optimizer:"adam",loss:"binaryCrossentropy",metrics:["accuracy"]}),e})();await(async(e,n)=>{const{incomeTotal:t,expenseTotal:i}=n,s=X.KtR([[t,i]]),r=X.KtR([[.5]]);return await e.fit(s,r,{epochs:100,batchSize:1}),e})(i,t);const s=i.predict(X.KtR([[t.incomeTotal,t.expenseTotal]])).arraySync();return n((0,J.Im)(t.netSavings<0)),`Net Savings Prediction: ${t.netSavings>0?"Positive":"Negative"} \n\n      Your estimated savings trend is: ${s[0][0]>.5?"Favorable":"Needs Improvement"}.\n\n      Consider reviewing your expenses in categories such as ${Object.keys(t.expenseCategories).join(", ")}.`};return(0,D.jsxs)(u.A,{style:{padding:"20px",marginTop:"20px"},children:[(0,D.jsx)(p.A,{variant:"h2",textAlign:"center",borderRadius:"20px",sx:{boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.2)"},children:"AI-Powered Financial Report"}),(0,D.jsx)(a.A,{variant:"contained",color:"primary",onClick:async()=>{c(!0);try{const e=await x(t);l(e);const i=t.reduce(((e,n)=>e+(n.incomeAmount||0)),0),s=t.reduce(((e,n)=>e+(n.expenseAmount||0)),0),r=i-s,a=t.reduce(((e,n)=>(n.expenseType&&(e[n.expenseType]=(e[n.expenseType]||0)+(n.expenseAmount||0)),e)),{}),o=[{label:"Expense ",value:""},{label:"Total Income",value:`\u20b9${i.toFixed(2)}`},{label:"Total Expenses",value:`\u20b9${s.toFixed(2)}`},{label:"Net Savings",value:`\u20b9${r<0?0:r.toFixed(2)}`},{label:"Net Loss",value:`\u20b9${r>0?0:r.toFixed(2)}`},{label:"Expenses by Category",value:""},...Object.entries(a).map((e=>{let[n,t]=e;return{label:n,value:`\u20b9${t.toFixed(2)}`}}))];n((0,J.xt)({report:e,content:o})),n((0,J.sj)(i)),n((0,J.Dm)(s))}catch(e){console.error("Error generating report:",e),l("Failed to generate report. Please try again later.")}finally{c(!1)}},style:{marginTop:"10px"},children:"Generate AI Report"}),d&&(0,D.jsx)(Y.A,{position:"fixed",top:"0",left:"0",width:"100%",bgcolor:"rgba(255, 255, 255, 0.8)",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:(0,D.jsx)(O.A,{style:{marginLeft:"10px"}})}),o&&(0,D.jsx)(Y.A,{variant:"h6",bgcolor:null===r?"white":r?"#f5252f":"#28de4f",position:"relative",sx:{borderRadius:1,px:4,py:8,overflow:"hidden",whiteSpace:"pre-line",mt:2},children:o}),(null===(e=s.report)||void 0===e?void 0:e.length)>0&&(0,D.jsxs)(p.A,{variant:"body2",style:{marginTop:"20px"},children:[o?"Generated Report":"Last Generated Report",(0,D.jsxs)(Y.A,{sx:{borderRadius:1,p:2,bgcolor:null===r?"white":r?"#f5252f":"#28de4f"},children:[null!==r&&(0,D.jsx)(p.A,{variant:"h4",textAlign:"center",children:r?"Need Attension":"Good"}),s.content.map(((e,n)=>(0,D.jsxs)(p.A,{variant:"body1",style:{marginBottom:"10px",fontWeight:""===e.value?"bold":"normal"},children:[e.label,e.value&&`: ${e.value}`]},n))),!o&&(0,D.jsxs)(Y.A,{variant:"h6",bgcolor:"#58b9ed",position:"relative",sx:{borderRadius:1,px:2,py:8,overflow:"hidden",whiteSpace:"pre-line"},children:[(0,D.jsx)(Y.A,{position:"absolute",variant:"h6",bgcolor:"violet",sx:{left:"-5px",top:"20px",borderRadius:2,px:2,width:"120px",py:"4px"},children:"Model Suggestion"}),null===s||void 0===s?void 0:s.report]})]})]})]})};var ne=t(6240),te=t(2314),ie=t(3625),se=t(4056);function re(e){const{children:n,value:t,index:i,...s}=e;return(0,D.jsx)("div",{role:"tabpanel",hidden:t!==i,id:`full-width-tabpanel-${i}`,"aria-labelledby":`full-width-tab-${i}`,...s,children:t===i&&(0,D.jsx)(Y.A,{children:(0,D.jsx)(p.A,{children:n})})})}function ae(e){return{id:`full-width-tab-${e}`,"aria-controls":`full-width-tabpanel-${e}`}}function oe(e){let{Report:n,AiReport:t,OpenAiReport:s}=e;const r=(0,ne.A)(),[a,o]=i.useState(0);return(0,D.jsxs)(Y.A,{sx:{bgcolor:"background.paper",width:"100%"},children:[(0,D.jsx)(te.A,{position:"static",children:(0,D.jsxs)(ie.A,{value:a,onChange:(e,n)=>{o(n)},indicatorColor:"secondary",textColor:"inherit",variant:"fullWidth","aria-label":"full width tabs example",children:[(0,D.jsx)(se.A,{label:"Financial Report",...ae(0)}),(0,D.jsx)(se.A,{label:"AI Report (custom model)",...ae(1)}),(0,D.jsx)(se.A,{label:"openAI Report",...ae(2)})]})}),(0,D.jsx)(re,{value:a,index:0,dir:r.direction,children:(0,D.jsx)(n,{})}),(0,D.jsx)(re,{value:a,index:1,dir:r.direction,children:(0,D.jsx)(t,{})}),(0,D.jsx)(re,{value:a,index:2,dir:r.direction,children:(0,D.jsx)(s,{})})]})}var le=t(5263);const de=()=>(0,D.jsx)(te.A,{position:"static",children:(0,D.jsx)(le.A,{children:(0,D.jsx)(p.A,{variant:"h6",style:{flexGrow:1},children:"Developed by Ajayraj"})})});var ce=t(6213);var pe=t(4193);const xe=t.p+"static/media/ai.6b7a41158865e2353414.jpg",ue=t.p+"static/media/ai2.6840cb0592f071dde5f0.png",he=()=>{const{items:e}=(0,C.d4)((e=>e.expenses)),n=(0,C.wA)(),[t,s]=(0,i.useState)(""),[r,o]=(0,i.useState)(!1),[l,d]=(0,i.useState)(null),{openAiResponse:c}=(0,C.d4)((e=>e.openAi));return(0,D.jsxs)(u.A,{style:{padding:"20px",marginTop:"20px",backgroundImage:`url(${xe})`,backgroundSize:"cover",backgroundPosition:"center"},children:[(0,D.jsx)(p.A,{variant:"h2",textAlign:"center",borderRadius:"20px",sx:{boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.2)",backgroundImage:`url(${ue})`,backgroundSize:"cover",backgroundPosition:"center",border:"4px solid grey"},children:"OpenAI-Powered Financial Report"}),(0,D.jsx)(a.A,{variant:"contained",color:"primary",onClick:async()=>{o(!0),d(null);try{const t=await(async e=>{try{const n=await ce.A.post("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",{inputs:e},{headers:{Authorization:"Bearer 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","Content-Type":"application/json"}});return n.data.length>0?n.data[0].generated_text:"No response from AI"}catch(l){throw console.error("Error fetching AI response:",l),new Error("Failed to fetch AI response")}})((()=>{const n=e.reduce(((e,n)=>e+(n.incomeAmount||0)),0),t=e.reduce(((e,n)=>e+(n.expenseAmount||0)),0),i=n-t,s=e.reduce(((e,n)=>(n.expenseType&&(e[n.expenseType]=(e[n.expenseType]||0)+(n.expenseAmount||0)),e)),{});return`\n            I need a financial report based on the following data with your suggestions to improve saving habit please give full details:\n\n            1. **Total Income:** \u20b9${n.toFixed(2)}\n            2. **Total Expenses:** \u20b9${t.toFixed(2)}\n            3. **Net Savings:** \u20b9${i<0?0:i.toFixed(2)}\n            4. **Net Loss:** \u20b9${i>0?0:i.toFixed(2)}\n            5. **Expenses by Category:**\n            ${Object.entries(s).map((e=>{let[n,t]=e;return`   - ${n}: \u20b9${t.toFixed(2)}`})).join("\n")}\n            6. **Recommendations:**\n            ${i<0?'   - Consider reducing discretionary spending to improve net savings.\n   - Review recurring expenses and identify potential savings."cut"':'   - Maintain current spending habits to sustain savings.\n   - Consider investing surplus income for better financial growth."cut" '}\n        `})()),i=t.split('"cut"')[1].trim();s(i),n((0,pe.Um)(i))}catch(t){d(t.message)}finally{o(!1)}},disabled:r,style:{marginTop:"10px"},children:"Generate AI Report"}),r&&(0,D.jsx)(Y.A,{position:"fixed",top:"0",left:"0",width:"100%",bgcolor:"rgba(255, 255, 255, 0.8)",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:(0,D.jsx)(O.A,{style:{marginLeft:"10px"}})}),t?(0,D.jsxs)(Y.A,{sx:{marginTop:"20px",padding:"10px",backgroundColor:"#f0f0f0",borderRadius:"4px"},children:[(0,D.jsx)(p.A,{variant:"h6",children:"AI Suggestions:"}),(0,D.jsx)(p.A,{whiteSpace:"pre-line",children:t})]}):(0,D.jsxs)(Y.A,{sx:{marginTop:"20px",padding:"10px",backgroundColor:"#f0f0f0",borderRadius:"4px"},children:[c?(0,D.jsx)(p.A,{variant:"h6",children:"Previous AI Suggestions:"}):(0,D.jsx)(p.A,{variant:"h6",children:"Generate Report for getting suggessions"}),(0,D.jsx)(p.A,{whiteSpace:"pre-line",children:c})]}),l&&(0,D.jsxs)(p.A,{variant:"body1",color:"error",style:{marginTop:"10px"},children:["Error: ",l]})]})},me=()=>{const e=(0,C.wA)(),{user:n}=(0,C.d4)((e=>e.auth)),{items:t,status:p}=(0,C.d4)((e=>e.expenses)),[x,u]=(0,i.useState)(!1),[h,m]=(0,i.useState)("all");(0,i.useEffect)((()=>{n&&e((0,k.Yi)(n.uid))}),[e,n]);return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(s.A,{maxWidth:"lg",style:{marginTop:"20px",marginBottom:"20px",minHeight:"90vh"},children:[(0,D.jsxs)(r.Ay,{container:!0,spacing:3,style:{paddingTop:"14%"},children:[(0,D.jsxs)(r.Ay,{item:!0,xs:12,children:[(0,D.jsx)(a.A,{variant:"contained",color:"primary",onClick:()=>{u(!0)},children:"Add Income/Expense"}),(0,D.jsxs)(o.A,{size:"small",style:{marginLeft:"20px",minWidth:120},children:[(0,D.jsx)(l.A,{id:"filter-label",children:"Filter"}),(0,D.jsxs)(d.A,{labelId:"filter-label",value:h,label:"Filter",onChange:e=>{m(e.target.value)},children:[(0,D.jsx)(c.A,{value:"all",children:"All"}),(0,D.jsx)(c.A,{value:"day",children:"Day(Today)"}),(0,D.jsx)(c.A,{value:"week",children:"Week(This Week)"}),(0,D.jsx)(c.A,{value:"month",children:"Month(This Month)"})]})]})]}),(0,D.jsx)(r.Ay,{item:!0,xs:12,children:(0,D.jsx)(F,{filter:h})}),t.length>0&&(0,D.jsx)(r.Ay,{item:!0,xs:12,children:(0,D.jsx)(oe,{Report:U,AiReport:ee,OpenAiReport:he})})]}),(0,D.jsx)(W,{open:x,handleClose:()=>u(!1)})]}),(0,D.jsx)(de,{})]})}},5817:()=>{},8590:()=>{},4530:()=>{},8108:()=>{},551:()=>{},1234:()=>{}}]);
//# sourceMappingURL=150.7b3da655.chunk.js.map