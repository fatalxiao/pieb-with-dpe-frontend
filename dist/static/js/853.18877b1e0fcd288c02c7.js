"use strict";(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[853],{49691:(t,e,n)=>{n.d(e,{AX:()=>r,ZP:()=>a});var r="/pieb-with-dpe";const a={baseUrl:"http://localhost:4100",appBaseUrl:r}},93305:(t,e,n)=>{n.d(e,{K3:()=>l,YR:()=>s,hK:()=>u}),n(23826),n(67311),n(46430),n(69626),n(68461),n(12952),n(54138),n(78158);var r=n(20324),a=(n(33403),n(49691)),o=n(93526);function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){(0,r.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t){if(null!=t&&t.params){var e=t.params.id;return o.Z.get(c(c({},t),{},{url:"".concat(a.ZP.appBaseUrl,"/patient/getPatientById/").concat(e)}))}}function u(t){return o.Z.post(c(c({},t),{},{url:"".concat(a.ZP.appBaseUrl,"/patient/createPatient")}))}function l(t){return o.Z.post(c(c({},t),{},{url:"".concat(a.ZP.appBaseUrl,"/patient/createOrUpdatePatient")}))}},54853:(t,e,n)=>{n.r(e),n.d(e,{default:()=>u,getGestationalDays:()=>s}),n(23826),n(46430),n(69626),n(68461),n(12952),n(54138),n(78158);var r=n(20324),a=(n(67311),n(60051),n(93305));function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){(0,r.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c={group:null,id:"",name:"",age:"",gestationalDaysWeeks:"",gestationalDaysDays:"",height:"",weight:"",heartRate:"",initialVasScore:"",systolicBloodPressure:"",diastolicBloodPressure:"",fetalHeartRate:"",pulseOxygenSaturation:"",cervicalDilationAtTimeOfEA:"",hasOxytocinAtTimeOfEA:!1,hasInduction:!1,status:1,description:""};function s(t,e){var n=0;return t&&!isNaN(t)&&(n+=7*+t),e&&!isNaN(e)&&(n+=+e),n}const u={nameSpace:"patientInfo",state:{form:i({},c),getActionType:null,updateActionType:null},apis:{getPatientInfo:function(t){var e=t.id;return function(t,n){e&&(n({type:"resetData"}),t({api:a.YR,params:{id:e},successResMsgDisabled:!0}))}},updatePatientInfo:function(t){var e=t.id,n=t.callback,r=t.successResMsgDisabled;return function(t,o,i){var c=i().patientInfo.form;e&&t({api:a.K3,params:{id:e,age:c.age,gestationalDays:s(c.gestationalDaysWeeks,c.gestationalDaysDays),height:c.height,weight:c.weight,heartRate:c.heartRate,initialVasScore:c.initialVasScore,systolicBloodPressure:c.systolicBloodPressure,diastolicBloodPressure:c.diastolicBloodPressure,fetalHeartRate:c.fetalHeartRate,pulseOxygenSaturation:c.pulseOxygenSaturation,cervicalDilationAtTimeOfEA:c.cervicalDilationAtTimeOfEA,hasOxytocinAtTimeOfEA:c.hasOxytocinAtTimeOfEA,hasInduction:c.hasInduction,description:c.description},successResMsgDisabled:r,successCallback:function(){null==n||n()}})}}},globalReducers:{resetData:function(t){return i(i({},t),{},{form:i({},c)})}},reducers:{updatePatientInfoField:function(t,e){var n=e.fieldName,a=e.fieldValue;return i(i({},t),{},{form:i(i({},t.form),{},(0,r.Z)({},n,a))})},getPatientInfoRequest:function(t){return i(i({},t),{},{getActionType:"patientInfo/getPatientInfoRequest"})},getPatientInfoSuccess:function(t,e){var n=e.responseData||i({},c);return n.gestationalDays&&!isNaN(n.gestationalDays)&&(n.gestationalDaysWeeks=~~(n.gestationalDays/7),n.gestationalDaysDays=n.gestationalDays%7),i(i({},t),{},{getActionType:"patientInfo/getPatientInfoSuccess",form:n})},getPatientInfoFailure:function(t){return i(i({},t),{},{getActionType:"patientInfo/getPatientInfoFailure"})},updatePatientInfoRequest:function(t){return i(i({},t),{},{updateActionType:"patientInfo/updatePatientInfoRequest"})},updatePatientInfoSuccess:function(t){return i(i({},t),{},{updateActionType:"patientInfo/updatePatientInfoSuccess"})},updatePatientInfoFailure:function(t){return i(i({},t),{},{updateActionType:"patientInfo/updatePatientInfoFailure"})}}}},93526:(t,e,n)=>{n.d(e,{Z:()=>l}),n(23826),n(67311),n(46430),n(69626),n(68461),n(12952),n(54138),n(78158);var r=n(20324),a=(n(10956),n(95003)),o=n.n(a),i=n(16681);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){(0,r.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e){var n=e.name,r=e.url,a=e.params,c=e.header,u=e.contentType,l=e.cancelable,f={method:t,url:r,headers:s(s({},c),{},{"Content-type":u||"application/json"}),params:"get"===t?a:null,data:"post"===t?a:null};if(l){var p=o().CancelToken.source();i.ZP.add({name:n,url:r,source:p}),f.cancelToken=null==p?void 0:p.token}return o()(f)}const l={get:function(t){return u("get",t)},post:function(t){return u("post",t)}}},16681:(t,e,n)=>{function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,{ZP:()=>o}),n(46430),n(69626),n(10956),n(25591),n(92674),n(70820),n(37262),n(67311),n(60051),n(34826),n(10902),n(44719);var a=[];const o={add:function(t){t&&a.push(t)},cancelByName:function(t){a=a.filter((function(e){var n,r;return(null==e?void 0:e.name)!==t||(null==e||null===(n=e.source)||void 0===n||null===(r=n.cancel)||void 0===r||r.call(n),!1)}))},cancelOthersByName:function(t){a=a.filter((function(e){var n,r;return(null==e?void 0:e.name)===t||(null==e||null===(n=e.source)||void 0===n||null===(r=n.cancel)||void 0===r||r.call(n),!1)}))},cancelAll:function(){var t,e=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){s=!0,i=t},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw i}}}}(a);try{for(e.s();!(t=e.n()).done;){var n,o,i=t.value;null==i||null===(n=i.source)||void 0===n||null===(o=n.cancel)||void 0===o||o.call(n)}}catch(t){e.e(t)}finally{e.f()}a.length=0}}}}]);