(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[463],{82159:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(36347),i=n.n(a)()((function(e){return e[1]}));i.push([e.id,".field-set{margin-top:24px;border-top:1px solid #e4eaf2}.field-set .field-set-title{padding:24px 0;margin:0}.field-set .field-set-content{box-sizing:border-box;padding:0 20px}\n",""]);const l=i},85554:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(36347),i=n.n(a)()((function(e){return e[1]}));i.push([e.id,'.step-action{position:relative;width:100%;padding-top:24px;margin-top:36px}.step-action::before,.step-action::after{display:table;content:""}.step-action::after{clear:both}.step-action .previous-button{float:left;width:120px;height:48px;color:#abb5c1}.step-action .previous-button:hover{color:#4c637b}.step-action .continue-button{float:right;width:180px;height:48px;font-weight:700}.step-action::before{content:"";position:absolute;left:-24px;top:0;display:block;width:calc(100% + 48px);height:1px;background:#e4eaf2}\n',""]);const l=i},49849:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(36347),i=n.n(a)()((function(e){return e[1]}));i.push([e.id,".module-loading{display:block;margin:48px auto}\n",""]);const l=i},8971:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(36347),i=n.n(a)()((function(e){return e[1]}));i.push([e.id,'.patient-form .material-text-field,.patient-form .material-dropdown-select{margin-bottom:48px}.patient-form .gestational-days::before{content:"+";position:absolute;left:-15px;bottom:0;display:block;width:30px;height:30px;text-align:center;color:#abb5c1}.patient-form .msg{margin-left:15px;margin-right:15px}\n',""]);const l=i},97242:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(36347),i=n.n(a)()((function(e){return e[1]}));i.push([e.id,".patient-info{margin-top:64px}\n",""]);const l=i},70596:(e,t,n)=>{"use strict";n.d(t,{Z:()=>f});var a=n(18753),i=n(71083),l=n(24470),o=n(37699),r=n(41844),s=n.n(r),c=n(93379),u=n.n(c),d=n(82159);u()(d.Z,{insert:"head",singleton:!1}),d.Z.locals;const f=function(e){var t=e.children,n=e.className,r=e.title,c=(0,l.Z)(e,["children","className","title"]);return o.createElement("div",(0,a.Z)({},c,{className:s()("field-set",(0,i.Z)({},n,n))}),o.createElement("h3",{className:"field-set-title"},r),o.createElement("div",{className:"field-set-content"},t))}},44120:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var a=n(37699),i=n(3428),l=n(46358),o=n(78283),r=n(93379),s=n.n(r),c=n(85554);s()(c.Z,{insert:"head",singleton:!1}),c.Z.locals;var u=function(e){var t=e.isFirst,n=e.isLast,r=e.onPrev,s=e.onNext;return a.createElement("div",{className:"step-action"},t?null:a.createElement(i.default,{className:"previous-button",value:"Previous",iconCls:"fal fa-arrow-left",onClick:r}),a.createElement(l.default,{className:"continue-button",theme:o.default.SUCCESS,value:n?"DONE":"SAVE and CONTINUE",onClick:s}))};u.defaultProps={isFirst:!1,isLast:!1};const d=u},8973:(e,t,n)=>{"use strict";n.d(t,{Z:()=>b});var a=n(18753),i=n(71083),l=n(14999),o=n(24470),r=n(37699),s=n(59307),c=n(41844),u=n.n(c),d=n(26329),f=n.n(d),m=n(93379),p=n.n(m),h=n(49849);p()(h.Z,{insert:"head",singleton:!1}),h.Z.locals;var g=function(e){var t=e.children,n=e.className,c=e.loading,d=(0,o.Z)(e,["children","className","loading"]),m=(0,r.useState)(!0),p=(0,l.Z)(m,2),h=p[0],g=p[1],b=(0,r.useCallback)((function(){return g(!0)}),[]),v=(0,r.useCallback)((function(){return g(!1)}),[]),E=(0,r.useMemo)((function(){return f()(v,150)}),[v]);return(0,r.useEffect)((function(){!h&&c?b():!c&&h&&E()}),[c,h,b,E]),h?r.createElement(s.default,(0,a.Z)({},d,{className:u()("module-loading",(0,i.Z)({},n,n))})):t};g.defaultProps={size:s.default.Size.LARGE};const b=g},32149:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>C}),n(26783),n(37262);var a=n(37699),i=n(19313),l=n(19374),o=n(47400),r=n(16082),s=n(8973),c=(n(59274),n(67311),n(60051),n(63014)),u=n(39956),d=n(1133),f=n(70596),m=n(26329),p=n.n(m),h=n(87908),g=n(93379),b=n.n(g),v=n(8971);b()(v.Z,{insert:"head",singleton:!1}),v.Z.locals;const E=(0,i.connect)((function(e){return{form:e.patientInfo.form}}),(function(e){return(0,l.bindActionCreators)({updatePatientInfoField:o.QQ,updatePatientInfo:o.jl},e)}))((function(e){var t=e.form,n=e.patientId,i=e.updatePatientInfoField,l=e.updatePatientInfo,o=(0,a.useCallback)((function(){return n&&l(n,void 0,!0)}),[n,l]),r=(0,a.useMemo)((function(){return p()(o,1e3)}),[o]),s=(0,a.useCallback)((function(e,t){null==i||i(e,t),setTimeout((function(){return r()}),0)}),[i,r]);return a.createElement("div",{className:"patient-form"},a.createElement(f.Z,{title:"1. Patient Information"},a.createElement("div",{className:"row"},a.createElement(u.Z,{className:"col-3",label:"Age",value:(0,h.Uw)(t.age),onChange:function(e){return s("age",e)}}),a.createElement(u.Z,{className:"col-3 unit-weeks",label:"Gestational Days",rightIconCls:"unit",value:(0,h.Uw)(t.gestationalDaysWeeks),onChange:function(e){return s("gestationalDaysWeeks",e)}}),a.createElement(u.Z,{className:"col-3 unit-days gestational-days",rightIconCls:"unit",value:(0,h.Uw)(t.gestationalDaysDays),onChange:function(e){return s("gestationalDaysDays",e)}})),a.createElement("div",{className:"row"},a.createElement(u.Z,{className:"col-3 unit-cm",label:"Height",rightIconCls:"unit",value:(0,h.Uw)(t.height),onChange:function(e){return s("height",e)}}),a.createElement(u.Z,{className:"col-3 unit-kg",label:"Weight",rightIconCls:"unit",value:(0,h.Uw)(t.weight),onChange:function(e){return s("weight",e)}}),a.createElement(u.Z,{className:"col-3",label:"Heart Rate",value:(0,h.Uw)(t.heartRate),onChange:function(e){return s("heartRate",e)}}),a.createElement(u.Z,{className:"col-3",label:"Initial Vas Score",value:(0,h.Uw)(t.initialVasScore),onChange:function(e){return s("initialVasScore",e)}})),a.createElement("div",{className:"row"},a.createElement(u.Z,{className:"col-3",label:"Systolic Blood Pressure",value:(0,h.Uw)(t.systolicBloodPressure),onChange:function(e){return s("systolicBloodPressure",e)}}),a.createElement(u.Z,{className:"col-3",label:"Diastolic Blood Pressure",value:(0,h.Uw)(t.diastolicBloodPressure),onChange:function(e){return s("diastolicBloodPressure",e)}}),a.createElement(u.Z,{className:"col-3",label:"Fetal Heart Rate",value:(0,h.Uw)(t.fetalHeartRate),onChange:function(e){return s("fetalHeartRate",e)}}),a.createElement(u.Z,{className:"col-3",label:"Pulse Oxygen Saturation",value:(0,h.Uw)(t.pulseOxygenSaturation),onChange:function(e){return s("pulseOxygenSaturation",e)}})),a.createElement("div",{className:"row"},a.createElement(u.Z,{className:"col-6",label:"Cervical Dilation At Time Of EA",value:(0,h.Uw)(t.cervicalDilationAtTimeOfEA),onChange:function(e){return s("cervicalDilationAtTimeOfEA",e)}}),a.createElement(c.Z,{className:"col-3",label:"Induction",checked:!!t.hasInduction,onChange:function(e){return s("hasInduction",e)}}),a.createElement(c.Z,{className:"col-3",label:"Oxytocin At Time Of EA",checked:!!t.hasOxytocinAtTimeOfEA,onChange:function(e){return s("hasOxytocinAtTimeOfEA",e)}}))),a.createElement(f.Z,{title:"2. Others"},a.createElement("div",{className:"row"},a.createElement(d.Z,{className:"col-12",label:"Description",maxLength:1e3,wordCountVisible:!0,value:(0,h.Uw)(t.description),onChange:function(e){return s("description",e)}}))))}));var Z=n(44120),N=n(97242);b()(N.Z,{insert:"head",singleton:!1}),N.Z.locals;const C=(0,i.connect)((function(e){return{getActionType:e.patientInfo.getActionType}}),(function(e){return(0,l.bindActionCreators)({routerPush:o.J5,updatePatientStep:o.e4,getPatientInfo:o.Ss,updatePatientInfo:o.jl},e)}))((function(e){var t=e.match,n=e.getActionType,i=e.updatePatientStep,l=e.getPatientInfo,o=e.updatePatientInfo,c=e.routerPush,u=(0,a.useMemo)((function(){return t.params.id}),[t.params.id]),d=(0,a.useCallback)((function(){return u?null==l?void 0:l(u):null==c?void 0:c("/app/patient-list")}),[u,l]),f=(0,a.useCallback)((function(){return null==o?void 0:o(u,(function(){return null==c?void 0:c("/app/patient/analgesia/".concat(u))}))}),[u,o,c]);return(0,a.useEffect)((function(){return null==i?void 0:i(0)}),[i]),(0,a.useEffect)((function(){return d()}),[u]),a.createElement("div",{className:"patient-info"},a.createElement(s.Z,{loading:n!==r.xG},a.createElement(E,{patientId:u}),a.createElement(Z.Z,{isFirst:!0,onNext:f})))}))},63014:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var a=n(24470),i=n(37699),l=n(84741),o=n(65029),r=n(78283),s=function(e){var t=e.className,n=e.label,r=e.isLabelAnimate,s=e.useSeparator,c=(0,a.Z)(e,["className","label","isLabelAnimate","useSeparator"]);return i.createElement(l.default,{className:t,label:n,isLabelAnimate:r,useSeparator:s},i.createElement(o.default,c))};s.defaultProps={theme:r.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1,useSeparator:!1};const c=s},1133:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var a=n(37699),i=n(20910),l=n(78283),o=function(e){return a.createElement(i.Z,e)};o.defaultProps={theme:l.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1,autoHeight:!0};const r=o},39956:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var a=n(37699),i=n(22690),l=n(78283),o=function(e){return a.createElement(i.Z,e)};o.defaultProps={theme:l.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1};const r=o},87908:(e,t,n)=>{"use strict";function a(e){return null==e?"":e}n.d(t,{Uw:()=>a}),n(71083),n(69626),n(56051),n(49898),n(23826),n(44395),n(83235)},41844:(e,t,n)=>{e.exports=n(24255)(4184)}}]);