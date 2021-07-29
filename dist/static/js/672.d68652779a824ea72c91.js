"use strict";(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[672],{49691:(e,t,n)=>{n.d(t,{AX:()=>r,ZP:()=>a});var r="/pieb-with-dpe";const a={baseUrl:"http://localhost:4100",appBaseUrl:r}},61672:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v,formatObservalData:()=>p}),n(23826),n(67311),n(46430),n(68461),n(12952),n(54138),n(78158);var r=n(71083),a=n(24470),o=(n(33403),n(49691)),l=n(93526);const i={getObservalDataByPatientId:function(e){return l.Z.get({url:"".concat(o.ZP.appBaseUrl,"/observal/getObservalDataByPatientId/").concat(null==e?void 0:e.patientId)})},createOrUpdateObservalData:function(e){return l.Z.post({url:"".concat(o.ZP.appBaseUrl,"/observal/createOrUpdateObservalData/").concat(null==e?void 0:e.patientId),params:null==e?void 0:e.observalData})}};var u=["observalEndPoint","epPlacementPoint"];function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p=function(e){return function(){var t,n;return e?(e.observalEndPoint,e.epPlacementPoint,s(s({},(0,a.Z)(e,u)),{},{observalEndPointId:(null==e||null===(t=e.observalEndPoint)||void 0===t?void 0:t.id)||null,epPlacementPointId:(null==e||null===(n=e.epPlacementPoint)||void 0===n?void 0:n.id)||null})):null}},f={initialTime:"",observalEndPoint:null,cervixFullyDilatedTime:"",epPlacementPoint:null,cervixDilatation:"",initialDose:"8",pumpConsumption:"",bolus:"",pcaCount:"",manualBolusCount:"",firstPcaTime:"",firstManualBolusTime:"",hasVasoactiveAgent:!1,hasHypotension:!1,hasCaesareanSection:!1,hasInstrumental:!1,hasLateralEpisiotomy:!1,birthTime:"",foetalWeight:"",oneMinuteApgarScore:"",fiveMinuteApgarScore:"",description:""};const v={nameSpace:"observal",state:{form:s({},f),getActionType:null,updateActionType:null},apis:{getObservalData:function(e){var t=e.patientId;return function(e){return e({api:i.getObservalDataByPatientId,params:{patientId:t},successResMsgDisabled:!0})}},createOrUpdateObservalData:function(e){var t=e.patientId,n=e.callback,r=e.successResMsgDisabled,a=e.failureResMsgDisabled,o=void 0!==a&&a;return function(e,a,l){var u=l().observal.form;if(t&&u)return e({api:i.createOrUpdateObservalData,params:{patientId:t,observalData:p(u)()},successResMsgDisabled:r,failureResMsgDisabled:o,successCallback:function(){null==n||n()}})}}},globalReducers:{resetData:function(e){return s(s({},e),{},{form:s({},f)})}},reducers:{updateObservalField:function(e,t){var n=t.fieldName,r=t.fieldValue,a=s({},e.form);return a[n]=r,s(s({},e),{},{form:a})},getObservalRequest:function(e){return s(s({},e),{},{getActionType:"observal/getObservalRequest"})},getObservalSuccess:function(e,t){var n=t.responseData;return s(s({},e),{},{getActionType:"observal/getObservalSuccess",form:n||s({},f)})},getObservalFailure:function(e){return s(s({},e),{},{getActionType:"observal/getObservalFailure"})},updateObservalRequest:function(e){return s(s({},e),{},{updateActionType:"observal/updateObservalRequest"})},updateObservalSuccess:function(e){return s(s({},e),{},{updateActionType:"observal/updateObservalSuccess"})},updateObservalFailure:function(e){return s(s({},e),{},{updateActionType:"observal/updateObservalFailure"})}}}},93526:(e,t,n)=>{n.d(t,{Z:()=>s}),n(23826),n(67311),n(46430),n(68461),n(12952),n(54138),n(78158);var r=n(71083),a=(n(10956),n(95003)),o=n.n(a),l=n(16681);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){var n=t.name,r=t.url,a=t.params,i=t.header,c=t.contentType,s=t.cancelable,p={method:e,url:r,headers:u(u({},i),{},{"Content-type":c||"application/json"}),params:"get"===e?a:null,data:"post"===e?a:null};if(s){var f=o().CancelToken.source();l.ZP.add({name:n,url:r,source:f}),p.cancelToken=null==f?void 0:f.token}return o()(p)}const s={get:function(e){return c("get",e)},post:function(e){return c("post",e)}}},16681:(e,t,n)=>{function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,{ZP:()=>o}),n(46430),n(10956),n(25591),n(69626),n(92674),n(70820),n(67311),n(60051),n(34826),n(10902),n(44719);var a=[];const o={add:function(e){e&&a.push(e)},cancelByName:function(e){a=a.filter((function(t){var n,r;return(null==t?void 0:t.name)!==e||(null==t||null===(n=t.source)||void 0===n||null===(r=n.cancel)||void 0===r||r.call(n),!1)}))},cancelOthersByName:function(e){a=a.filter((function(t){var n,r;return(null==t?void 0:t.name)===e||(null==t||null===(n=t.source)||void 0===n||null===(r=n.cancel)||void 0===r||r.call(n),!1)}))},cancelAll:function(){var e,t=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,i=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){u=!0,l=e},f:function(){try{i||null==n.return||n.return()}finally{if(u)throw l}}}}(a);try{for(t.s();!(e=t.n()).done;){var n,o,l=e.value;null==l||null===(n=l.source)||void 0===n||null===(o=n.cancel)||void 0===o||o.call(n)}}catch(e){t.e(e)}finally{t.f()}a.length=0}}}}]);