(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[329],{92901:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var n=a(36347),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,".display-field .material-provider-label{display:block;height:16px !important}.display-field .display-field-content{box-sizing:border-box;width:100%;height:40px;padding:9px 12px 9px 8px;line-height:22px}\n",""]);const i=l},82159:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var n=a(36347),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,".field-set{margin-top:24px;border-top:1px solid #e4eaf2}.field-set .field-set-title{padding:24px 0;margin:0}.field-set .field-set-content{box-sizing:border-box;padding:0 20px}\n",""]);const i=l},85554:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var n=a(36347),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,'.step-action{position:relative;width:100%;padding-top:24px;margin-top:36px}.step-action::before,.step-action::after{display:table;content:""}.step-action::after{clear:both}.step-action .previous-button{float:left;width:120px;height:48px;color:#abb5c1}.step-action .previous-button:hover{color:#4c637b}.step-action .continue-button{float:right;width:180px;height:48px;font-weight:700}.step-action::before{content:"";position:absolute;left:-24px;top:0;display:block;width:calc(100% + 48px);height:1px;background:#e4eaf2}\n',""]);const i=l},49849:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var n=a(36347),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,".module-loading{display:block;margin:48px auto}\n",""]);const i=l},80251:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var n=a(36347),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,".observal-data-form .material-text-field,.observal-data-form .material-dropdown-select,.observal-data-form .material-provider,.observal-data-form .material-time-picker{margin-bottom:48px}.observal-data-form .duration-tag .display-field-content{display:inline-block;width:auto;padding:9px 12px;background:#f7f7f7;color:#718ca7;border-radius:4px}\n",""]);const i=l},70596:(e,t,a)=>{"use strict";a.d(t,{Z:()=>d});var n=a(18753),l=a(71083),i=a(24470),r=a(37699),o=a(41844),s=a.n(o),c=a(93379),u=a.n(c),m=a(82159);u()(m.Z,{insert:"head",singleton:!1}),m.Z.locals;const d=function(e){var t=e.children,a=e.className,o=e.title,c=(0,i.Z)(e,["children","className","title"]);return r.createElement("div",(0,n.Z)({},c,{className:s()("field-set",(0,l.Z)({},a,a))}),r.createElement("h3",{className:"field-set-title"},o),r.createElement("div",{className:"field-set-content"},t))}},44120:(e,t,a)=>{"use strict";a.d(t,{Z:()=>m});var n=a(37699),l=a(3428),i=a(46358),r=a(78283),o=a(93379),s=a.n(o),c=a(85554);s()(c.Z,{insert:"head",singleton:!1}),c.Z.locals;var u=function(e){var t=e.isFirst,a=e.isLast,o=e.onPrev,s=e.onNext;return n.createElement("div",{className:"step-action"},t?null:n.createElement(l.default,{className:"previous-button",value:"Previous",iconCls:"fal fa-arrow-left",onClick:o}),n.createElement(i.default,{className:"continue-button",theme:r.default.SUCCESS,value:a?"DONE":"SAVE and CONTINUE",onClick:s}))};u.defaultProps={isFirst:!1,isLast:!1};const m=u},8973:(e,t,a)=>{"use strict";a.d(t,{Z:()=>h});var n=a(18753),l=a(71083),i=a(14999),r=a(24470),o=a(37699),s=a(59307),c=a(41844),u=a.n(c),m=a(26329),d=a.n(m),p=a(93379),f=a.n(p),v=a(49849);f()(v.Z,{insert:"head",singleton:!1}),v.Z.locals;var b=function(e){var t=e.children,a=e.className,c=e.loading,m=(0,r.Z)(e,["children","className","loading"]),p=(0,o.useState)(!0),f=(0,i.Z)(p,2),v=f[0],b=f[1],h=(0,o.useCallback)((function(){return b(!0)}),[]),g=(0,o.useCallback)((function(){return b(!1)}),[]),E=(0,o.useMemo)((function(){return d()(g,150)}),[g]);return(0,o.useEffect)((function(){!v&&c?h():!c&&v&&E()}),[c,v,h,E]),v?o.createElement(s.default,(0,n.Z)({},m,{className:u()("module-loading",(0,l.Z)({},a,a))})):t};b.defaultProps={size:s.default.Size.LARGE};const h=b},26663:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>S}),a(26783),a(37262);var n=a(37699),l=a(19313),i=a(19374),r=a(47400),o=a(84439),s=a(8973),c=a(44120),u=(a(59274),a(67311),a(60051),a(63014)),m=a(39956),d=a(1133),p=a(18753),f=a(24470),v=(a(11775),a(33403),a(57018)),b=a(78283),h=function(e){var t=e.value,a=e.onChange,l=(0,f.Z)(e,["value","onChange"]),i=(0,n.useCallback)((function(e){if(!e)return"";var t=e.split(":");return"".concat(t[0],":").concat(t[1])}),[]),r=(0,n.useCallback)((function(e){null==a||a(e?i(e):"")}),[i,a]);return n.createElement(v.Z,(0,p.Z)({},l,{value:i(t),onChange:r}))};h.defaultProps={theme:b.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1};const g=h;var E=a(70596),C=(a(84741),a(41844),a(93379)),Z=a.n(C),N=a(92901);Z()(N.Z,{insert:"head",singleton:!1}),N.Z.locals;var w=a(98677),P=a(26329),x=a.n(P),T=a(87908),I=(a(98990),a(44395)),k=a.n(I);const A=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"YYYY-MM-DD HH:mm:ss";if(!e||!t)return-1;var n=k()(e,a),l=k()(t,a);return n.isValid()&&l.isValid()?Math.abs(+n-+l):-1};var D=a(80251);Z()(D.Z,{insert:"head",singleton:!1}),D.Z.locals;var y=function(e){var t=e.patientId,a=e.form,l=e.observalEndPoints,i=e.epPlacementPoints,r=e.updateObservalDataField,o=e.createOrUpdateObservalData,s=(0,n.useCallback)((function(){return t&&(null==o?void 0:o(t,void 0,!0,!0))}),[t,o]),c=(0,n.useMemo)((function(){return x()(s,400)}),[s]),p=(0,n.useCallback)((function(e,t){null==r||r(e,t),setTimeout((function(){return c()}),0)}),[r,c]),f=(0,n.useCallback)((function(e,t){return e<0?"":t?"Duration of Analgesia: ".concat(60+~~(e/1e3/60)," min"):"Duration: ".concat(~~(e/1e3/60)," min")}),[]);return(0,n.useMemo)((function(){return f(A(null==a?void 0:a.initialTime,null==a?void 0:a.firstPcaTime))}),[a,f]),(0,n.useMemo)((function(){return f(A(null==a?void 0:a.initialTime,null==a?void 0:a.firstManualBolusTime))}),[a,f]),(0,n.useMemo)((function(){return f(A(null==a?void 0:a.initialTime,null==a?void 0:a.birthTime),!0)}),[a,f]),n.createElement("div",{className:"observal-data-form"},n.createElement(E.Z,{title:"1. Basic Information"},n.createElement("div",{className:"row"},n.createElement(g,{className:"col-6",label:"Initial Time",value:(0,T.Uw)(a.initialTime),onChange:function(e){return p("initialTime",e)}}),n.createElement(w.Z,{className:"col-6",data:l,value:a.observalEndPoint,label:"Observal End Point",valueField:"id",displayField:"name",onChange:function(e){return p("observalEndPoint",e)}}),n.createElement(g,{className:"col-6",label:"Cervix Fully Dilated Time",value:(0,T.Uw)(a.cervixFullyDilatedTime),onChange:function(e){return p("cervixFullyDilatedTime",e)}}),n.createElement(w.Z,{className:"col-3",data:i,value:a.epPlacementPoint,label:"EP Placement Point",valueField:"id",displayField:"name",onChange:function(e){return p("epPlacementPoint",e)}}),n.createElement(m.Z,{className:"col-3",label:"Cervix Dilatation",value:(0,T.Uw)(a.cervixDilatation),onChange:function(e){return p("cervixDilatation",e)}}))),n.createElement(E.Z,{title:"2. Medication use"},n.createElement("div",{className:"row"},n.createElement(m.Z,{className:"col-3 unit-ml",label:"Initial Dose",rightIconCls:"unit",value:(0,T.Uw)(a.initialDose),onChange:function(e){return p("initialDose",e)}}),n.createElement(m.Z,{className:"col-3 unit-ml",label:"Pump Consumption",rightIconCls:"unit",value:(0,T.Uw)(a.pumpConsumption),onChange:function(e){return p("pumpConsumption",e)}}),n.createElement(m.Z,{className:"col-3 unit-ml",label:"Bolus",rightIconCls:"unit",value:(0,T.Uw)(a.bolus),onChange:function(e){return p("bolus",e)}}))),n.createElement(E.Z,{title:"3. PCA"},n.createElement("div",{className:"row"},n.createElement(g,{className:"col-6",label:"First PCA Time",value:(0,T.Uw)(a.firstPcaTime),onChange:function(e){return p("firstPcaTime",e)}})),n.createElement("div",{className:"row"},n.createElement(m.Z,{className:"col-6",label:"PCA Count",value:(0,T.Uw)(a.pcaCount),onChange:function(e){return p("pcaCount",e)}}))),n.createElement(E.Z,{title:"4. Bolus"},n.createElement("div",{className:"row"},n.createElement(g,{className:"col-6",label:"First Manual Bolus Time",value:(0,T.Uw)(a.firstManualBolusTime),onChange:function(e){return p("firstManualBolusTime",e)}})),n.createElement("div",{className:"row"},n.createElement(m.Z,{className:"col-6",label:"Manual Bolus Count",value:(0,T.Uw)(a.manualBolusCount),onChange:function(e){return p("manualBolusCount",e)}}))),n.createElement(E.Z,{title:"5. Labor"},n.createElement("div",{className:"row"},n.createElement(u.Z,{className:"col-3",label:"Vasoactive Agent",checked:a.hasVasoactiveAgent,onChange:function(e){return p("hasVasoactiveAgent",e)}}),n.createElement(u.Z,{className:"col-3",label:"Hypotension",checked:a.hasHypotension,onChange:function(e){return p("hasHypotension",e)}}),n.createElement(u.Z,{className:"col-3",label:"Caesarean Section",checked:a.hasCaesareanSection,onChange:function(e){return p("hasCaesareanSection",e)}}),n.createElement(u.Z,{className:"col-3",label:"Instrumental",checked:a.hasInstrumental,onChange:function(e){return p("hasInstrumental",e)}}))),n.createElement(E.Z,{title:"6. Lateral Episiotomy"},n.createElement("div",{className:"row"},n.createElement(u.Z,{className:"col-3",label:"Lateral Episiotomy",checked:a.hasLateralEpisiotomy,onChange:function(e){return p("hasLateralEpisiotomy",e)}}))),n.createElement(E.Z,{title:"7. Foetal"},n.createElement("div",{className:"row"},n.createElement(g,{className:"col-3",label:"Birth Time",value:(0,T.Uw)(a.birthTime),onChange:function(e){return p("birthTime",e)}})),n.createElement("div",{className:"row"},n.createElement(m.Z,{className:"col-3 unit-g",label:"Foetal Weight",rightIconCls:"unit",value:(0,T.Uw)(a.foetalWeight),onChange:function(e){return p("foetalWeight",e)}}),n.createElement(m.Z,{className:"col-3",label:"1min Apgar Score",value:(0,T.Uw)(a.oneMinuteApgarScore),onChange:function(e){return p("oneMinuteApgarScore",e)}}),n.createElement(m.Z,{className:"col-3",label:"5min Apgar Score",value:(0,T.Uw)(a.fiveMinuteApgarScore),onChange:function(e){return p("fiveMinuteApgarScore",e)}}))),n.createElement(E.Z,{title:"8. Others"},n.createElement("div",{className:"row"},n.createElement(d.Z,{className:"col-12",label:"Description",maxLength:1e3,wordCountVisible:!0,value:(0,T.Uw)(a.description),onChange:function(e){return p("description",e)}}))))};y.GENDER_LIST=[{label:"Male",value:1},{label:"Female",value:2}];const L=(0,l.connect)((function(e){return{form:e.observal.form,observalEndPoints:e.observalEndPoint.list,epPlacementPoints:e.epPlacementPoint.list}}),(function(e){return(0,i.bindActionCreators)({updateObservalDataField:r._G,createOrUpdateObservalData:r.Db},e)}))(y),S=(0,l.connect)((function(e){return{getActionType:e.observal.getActionType}}),(function(e){return(0,i.bindActionCreators)({routerPush:r.J5,updatePatientStep:r.e4,getPatientInfo:r.Ss,getObservalData:r.nE,createOrUpdateObservalData:r.Db},e)}))((function(e){var t,a=e.match,l=e.getActionType,i=e.routerPush,r=e.updatePatientStep,u=e.getPatientInfo,m=e.getObservalData,d=e.createOrUpdateObservalData,p=(0,n.useMemo)((function(){var e;return null==a||null===(e=a.params)||void 0===e?void 0:e.patientId}),[null==a||null===(t=a.params)||void 0===t?void 0:t.patientId]),f=(0,n.useCallback)((function(){p||null==i||i("/app/patient-list"),null==u||u(p),null==m||m(p)}),[p,i,u,m]),v=(0,n.useCallback)((function(){return null==i?void 0:i("/app/patient/analgesia/".concat(p))}),[p,i]),b=(0,n.useCallback)((function(){return d(p,(function(){return null==i?void 0:i("/app/patient-list")}))}),[p,i,d]);return(0,n.useEffect)((function(){null==r||r(2),f()}),[]),n.createElement("div",{className:"observal-data"},n.createElement(s.Z,{loading:l!==o.Jo},n.createElement(L,{patientId:p}),n.createElement(c.Z,{isLast:!0,onPrev:v,onNext:b})))}))},63014:(e,t,a)=>{"use strict";a.d(t,{Z:()=>c});var n=a(24470),l=a(37699),i=a(84741),r=a(65029),o=a(78283),s=function(e){var t=e.className,a=e.label,o=e.isLabelAnimate,s=e.useSeparator,c=(0,n.Z)(e,["className","label","isLabelAnimate","useSeparator"]);return l.createElement(i.default,{className:t,label:a,isLabelAnimate:o,useSeparator:s},l.createElement(r.default,c))};s.defaultProps={theme:o.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1,useSeparator:!1};const c=s},98677:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(37699),l=a(95369),i=a(78283),r=function(e){return n.createElement(l.Z,e)};r.defaultProps={theme:i.default.HIGHLIGHT,rightIconCls:"fal fa-chevron-down",isLabelAnimate:!1};const o=r},1133:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(37699),l=a(20910),i=a(78283),r=function(e){return n.createElement(l.Z,e)};r.defaultProps={theme:i.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1,autoHeight:!0};const o=r},39956:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(37699),l=a(22690),i=a(78283),r=function(e){return n.createElement(l.Z,e)};r.defaultProps={theme:i.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1};const o=r},87908:(e,t,a)=>{"use strict";function n(e){return null==e?"":e}a.d(t,{Uw:()=>n}),a(71083),a(69626),a(56051),a(49898),a(23826),a(44395),a(83235)},41844:(e,t,a)=>{e.exports=a(24255)(4184)}}]);