"use strict";(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[895],{4732:(e,a,t)=>{t.d(a,{Z:()=>i});var n=t(36347),l=t.n(n)()((function(e){return e[1]}));l.push([e.id,".observal-data-form .material-text-field,.observal-data-form .material-dropdown-select,.observal-data-form .material-provider,.observal-data-form .material-time-picker{margin-bottom:48px}.observal-data-form .duration-tag .display-field-content{display:inline-block;width:auto;padding:9px 12px;background:#f7f7f7;color:#718ca7;border-radius:4px}",""]);const i=l},14814:(e,a,t)=>{t.d(a,{Z:()=>r});var n=t(50369),l=t(95369),i=t(78283),o=function(e){return n.createElement(l.Z,e)};o.defaultProps={theme:i.default.HIGHLIGHT,rightIconCls:"fal fa-chevron-down",isLabelAnimate:!1};const r=o},77895:(e,a,t)=>{t.r(a),t.d(a,{default:()=>H}),t(37262),t(26783);var n=t(50369),l=t(7887),i=t(8973),o=t(44120),r=(t(59274),t(67311),t(60051),t(35629)),c=t(81451),s=t(27312),u=t(18753),m=t(24470),d=(t(11775),t(33403),t(57018)),v=t(78283),p=["value","onChange"],f=function(e){var a=e.value,t=e.onChange,l=(0,m.Z)(e,p),i=(0,n.useCallback)((function(e){if(!e)return"";var a=e.split(":");return"".concat(a[0],":").concat(a[1])}),[]),o=(0,n.useCallback)((function(e){null==t||t(e?i(e):"")}),[i,t]);return n.createElement(d.Z,(0,u.Z)({},l,{value:i(a),onChange:o}))};f.defaultProps={theme:v.default.HIGHLIGHT,isLabelAnimate:!1,clearButtonVisible:!1};const b=f;var h=t(70596),E=t(14814),C=t(26329),g=t.n(C),N=t(87908),Z=t(93379),w=t.n(Z),P=t(7795),y=t.n(P),I=t(90569),T=t.n(I),k=t(3565),S=t.n(k),D=t(19216),U=t.n(D),A=t(44589),M=t.n(A),x=t(4732),F={};F.styleTagTransform=M(),F.setAttributes=S(),F.insert=T().bind(null,"head"),F.domAPI=y(),F.insertStyleElement=U(),w()(x.Z,F),x.Z&&x.Z.locals&&x.Z.locals;var L=function(e){var a=e.patientId,t=e.form,l=e.observalEndPoints,i=e.epPlacementPoints,o=e.dispatch,u=(0,n.useCallback)((function(){a&&(null==o||o({type:"observal/createOrUpdateObservalData",patientId:a,successResMsgDisabled:!0,failureResMsgDisabled:!0}))}),[a,o]),m=(0,n.useMemo)((function(){return g()(u,400)}),[u]),d=(0,n.useCallback)((function(e,a){null==o||o({type:"observal/updateObservalField",fieldName:e,fieldValue:a}),setTimeout((function(){return m()}),0)}),[o,m]);return n.createElement("div",{className:"observal-data-form"},n.createElement(h.Z,{title:"1. Basic Information"},n.createElement("div",{className:"row"},n.createElement(b,{className:"col-6",label:"Initial Time",value:(0,N.Uw)(t.initialTime),onChange:function(e){return d("initialTime",e)}}),n.createElement(E.Z,{className:"col-6",data:l,value:t.observalEndPoint,label:"Observal End Point",valueField:"id",displayField:"name",onChange:function(e){return d("observalEndPoint",e)}}),n.createElement(b,{className:"col-6",label:"Cervix Fully Dilated Time",value:(0,N.Uw)(t.cervixFullyDilatedTime),onChange:function(e){return d("cervixFullyDilatedTime",e)}}),n.createElement(E.Z,{className:"col-3",data:i,value:t.epPlacementPoint,label:"EP Placement Point",valueField:"id",displayField:"name",onChange:function(e){return d("epPlacementPoint",e)}}),n.createElement(c.Z,{className:"col-3",label:"Cervix Dilatation",value:(0,N.Uw)(t.cervixDilatation),onChange:function(e){return d("cervixDilatation",e)}}))),n.createElement(h.Z,{title:"2. Medication use"},n.createElement("div",{className:"row"},n.createElement(c.Z,{className:"col-3 unit-ml",label:"Initial Dose",rightIconCls:"unit",value:(0,N.Uw)(t.initialDose),onChange:function(e){return d("initialDose",e)}}),n.createElement(c.Z,{className:"col-3 unit-ml",label:"Pump Consumption",rightIconCls:"unit",value:(0,N.Uw)(t.pumpConsumption),onChange:function(e){return d("pumpConsumption",e)}}),n.createElement(c.Z,{className:"col-3 unit-ml",label:"Bolus",rightIconCls:"unit",value:(0,N.Uw)(t.bolus),onChange:function(e){return d("bolus",e)}}))),n.createElement(h.Z,{title:"3. PCA"},n.createElement("div",{className:"row"},n.createElement(b,{className:"col-6",label:"First PCA Time",value:(0,N.Uw)(t.firstPcaTime),onChange:function(e){return d("firstPcaTime",e)}})),n.createElement("div",{className:"row"},n.createElement(c.Z,{className:"col-6",label:"PCA Count",value:(0,N.Uw)(t.pcaCount),onChange:function(e){return d("pcaCount",e)}}))),n.createElement(h.Z,{title:"4. Bolus"},n.createElement("div",{className:"row"},n.createElement(b,{className:"col-6",label:"First Manual Bolus Time",value:(0,N.Uw)(t.firstManualBolusTime),onChange:function(e){return d("firstManualBolusTime",e)}})),n.createElement("div",{className:"row"},n.createElement(c.Z,{className:"col-6",label:"Manual Bolus Count",value:(0,N.Uw)(t.manualBolusCount),onChange:function(e){return d("manualBolusCount",e)}}))),n.createElement(h.Z,{title:"5. Labor"},n.createElement("div",{className:"row"},n.createElement(r.Z,{className:"col-3",label:"Vasoactive Agent",checked:t.hasVasoactiveAgent,onChange:function(e){return d("hasVasoactiveAgent",e)}}),n.createElement(r.Z,{className:"col-3",label:"Hypotension",checked:t.hasHypotension,onChange:function(e){return d("hasHypotension",e)}}),n.createElement(r.Z,{className:"col-3",label:"Caesarean Section",checked:t.hasCaesareanSection,onChange:function(e){return d("hasCaesareanSection",e)}}),n.createElement(r.Z,{className:"col-3",label:"Instrumental",checked:t.hasInstrumental,onChange:function(e){return d("hasInstrumental",e)}}))),n.createElement(h.Z,{title:"6. Lateral Episiotomy"},n.createElement("div",{className:"row"},n.createElement(r.Z,{className:"col-3",label:"Lateral Episiotomy",checked:t.hasLateralEpisiotomy,onChange:function(e){return d("hasLateralEpisiotomy",e)}}))),n.createElement(h.Z,{title:"7. Foetal"},n.createElement("div",{className:"row"},n.createElement(b,{className:"col-3",label:"Birth Time",value:(0,N.Uw)(t.birthTime),onChange:function(e){return d("birthTime",e)}})),n.createElement("div",{className:"row"},n.createElement(c.Z,{className:"col-3 unit-g",label:"Foetal Weight",rightIconCls:"unit",value:(0,N.Uw)(t.foetalWeight),onChange:function(e){return d("foetalWeight",e)}}),n.createElement(c.Z,{className:"col-3",label:"1min Apgar Score",value:(0,N.Uw)(t.oneMinuteApgarScore),onChange:function(e){return d("oneMinuteApgarScore",e)}}),n.createElement(c.Z,{className:"col-3",label:"5min Apgar Score",value:(0,N.Uw)(t.fiveMinuteApgarScore),onChange:function(e){return d("fiveMinuteApgarScore",e)}}))),n.createElement(h.Z,{title:"8. Others"},n.createElement("div",{className:"row"},n.createElement(s.Z,{className:"col-12",label:"Description",maxLength:1e3,wordCountVisible:!0,value:(0,N.Uw)(t.description),onChange:function(e){return d("description",e)}}))))};L.GENDER_LIST=[{label:"Male",value:1},{label:"Female",value:2}];const B=(0,l.connect)((function(e){return{form:e.observal.form,observalEndPoints:e.observalEndPoint.list,epPlacementPoints:e.epPlacementPoint.list}}))(L);var O=t(31576);const H=(0,l.connect)((function(e){var a;return{getObservalDataStatus:null===(a=e.apiStatus.observal)||void 0===a?void 0:a.getObservalData}}))((function(e){var a,t=e.match,l=e.getObservalDataStatus,r=e.dispatch,c=null==t||null===(a=t.params)||void 0===a?void 0:a.patientId,s=(0,n.useMemo)((function(){return l!==O.ApiStatus.SUCCESS}),[l]),u=(0,n.useCallback)((function(){c||null==r||r({type:"route/push",route:"/app/patient-list"}),null==r||r({type:"patientInfo/getPatientInfo",id:c}),null==r||r({type:"observal/getObservalData",patientId:c})}),[c,r]),m=(0,n.useCallback)((function(){null==r||r({type:"route/push",route:"/app/patient/analgesia/".concat(c)})}),[c,r]),d=(0,n.useCallback)((function(){null==r||r({type:"observal/createOrUpdateObservalData",patientId:c,callback:function(){return null==r?void 0:r({type:"route/push",route:"/app/patient-list"})}})}),[c,r]);return(0,n.useEffect)((function(){u()}),[u]),(0,n.useEffect)((function(){null==r||r({type:"editPatient/updatePatientStep",activatedStep:2})}),[r]),n.createElement("div",{className:"observal-data"},n.createElement(i.Z,{loading:s},n.createElement(B,{patientId:c}),n.createElement(o.Z,{isLast:!0,onPrev:m,onNext:d})))}))}}]);