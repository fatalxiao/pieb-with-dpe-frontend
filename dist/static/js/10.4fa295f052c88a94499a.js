(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[10],{20666:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});var i=n(36347),a=n.n(i)()((function(t){return t[1]}));a.push([t.id,".module-card{border:1px solid rgba(0,0,0,0.06);border-radius:24px;box-shadow:0 0 16px rgba(0,0,0,0.06) !important;overflow:hidden}\n",""]);const o=a},8112:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});var i=n(36347),a=n.n(i)()((function(t){return t[1]}));a.push([t.id,".edit-patient{position:relative;display:flex;flex-direction:column;min-height:100%}.edit-patient .edit-patient-stepper{margin-bottom:16px}.edit-patient .edit-patient-base-info{padding-bottom:16px;border-bottom:1px solid #e4eaf2}.edit-patient .edit-patient-base-info .edit-patient-name{margin:0}.edit-patient .edit-patient-base-info .edit-patient-desc{opacity:.5}.edit-patient .edit-patient-content{position:relative;flex:1;padding:24px;overflow:hidden}.edit-patient .edit-patient-content .edit-patient-content-title{margin-bottom:0}\n",""]);const o=a},74289:(t,e,n)=>{"use strict";n.d(e,{Z:()=>h});var i=n(18753),a=n(71083),o=n(24470),d=n(37699),r=n(6484),s=n.n(r),p=n(77443),l=n(41844),c=n.n(l),u=n(93379),m=n.n(u),f=n(20666);m()(f.Z,{insert:"head",singleton:!1}),f.Z.locals;var v=(0,d.forwardRef)((function(t,e){var n=t.className,r=(0,o.Z)(t,["className"]);return d.createElement(p.default,(0,i.Z)({},r,{ref:e,className:c()("module-card",(0,a.Z)({},n,n))}))}));v.propTypes={className:s().string};const h=v},41009:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>f}),n(10956),n(33403);var i=n(37699),a=n(19313),o=n(19374),d=n(28398),r=n(47400),s=n(3750),p=n(80755),l=n(74289),c=n(93379),u=n.n(c),m=n(8112);u()(m.Z,{insert:"head",singleton:!1}),m.Z.locals;const f=(0,a.connect)((function(t){return{form:t.patientInfo.form,steps:t.editPatient.steps,activatedStep:t.editPatient.activatedStep}}),(function(t){return(0,o.bindActionCreators)({routerPush:r.J5},t)}))((function(t){var e,n,a=t.route,o=t.form,r=t.steps,c=t.activatedStep,u=t.routerPush,m=(0,i.useCallback)((function(t){var e,n=t.activatedStep;null==u||u(null==r||null===(e=r[n])||void 0===e?void 0:e.route)}),[r,c,u]);return i.createElement("div",{className:"edit-patient"},i.createElement(p.Z,{className:"edit-patient-stepper",steps:r,activatedStep:c,finishedStep:(null==r?void 0:r.length)-1,onChange:m}),i.createElement(l.Z,{className:"edit-patient-content"},null!=o&&o.name?i.createElement("div",null,i.createElement("div",{className:"edit-patient-base-info"},i.createElement("h1",{className:"edit-patient-name"},o.name),i.createElement("div",{className:"edit-patient-desc"},"".concat(o.id,"  ·  ").concat(o.group&&(null===(e=o.group)||void 0===e?void 0:e.name)))),c>=0?i.createElement("h2",{className:"edit-patient-content-title"},"Step ".concat(c+1,". ").concat(null==r?void 0:r[c].title)):null):null,(0,d.renderRoutes)(null==a?void 0:a.routes),"/app/patient"===(null===(n=location)||void 0===n?void 0:n.pathname)?i.createElement(s.Redirect,{from:"/app/patient",to:"/app/patient-list"}):null))}))},3750:(t,e,n)=>{t.exports=n(85413)(3727)},41844:(t,e,n)=>{t.exports=n(24255)(4184)}}]);