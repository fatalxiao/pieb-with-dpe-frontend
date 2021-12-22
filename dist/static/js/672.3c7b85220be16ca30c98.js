"use strict";(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[672],{49691:(e,t,r)=>{r.d(t,{AX:()=>n,ZP:()=>a});var n="/pieb-with-dpe";const a={baseUrl:"http://localhost:4100",appBaseUrl:n}},61672:(e,t,r)=>{r.r(t),r.d(t,{default:()=>O,formatObservalData:()=>v}),r(23826),r(67311),r(46430),r(69626),r(68461),r(12952),r(54138),r(78158);var n=r(20324),a=r(34783),o=(r(33403),r(49691)),l=r(93526);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e){if(null!=e&&e.params){var t=e.params.patientId;return l.Z.get(i(i({},e),{},{url:"".concat(o.ZP.appBaseUrl,"/observal/getObservalDataByPatientId/").concat(t)}))}}function s(e){if(null!=e&&e.params){var t=e.params,r=t.patientId,n=t.observalData;return l.Z.post({url:"".concat(o.ZP.appBaseUrl,"/observal/createOrUpdateObservalData/").concat(r),params:n})}}var p=["observalEndPoint","epPlacementPoint"];function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=function(e){return function(){var t,r;return e?(e.observalEndPoint,e.epPlacementPoint,b(b({},(0,a.Z)(e,p)),{},{observalEndPointId:(null==e||null===(t=e.observalEndPoint)||void 0===t?void 0:t.id)||null,epPlacementPointId:(null==e||null===(r=e.epPlacementPoint)||void 0===r?void 0:r.id)||null})):null}},d={initialTime:"",observalEndPoint:null,cervixFullyDilatedTime:"",epPlacementPoint:null,cervixDilatation:"",initialDose:"8",pumpConsumption:"",bolus:"",pcaCount:"",manualBolusCount:"",firstPcaTime:"",firstManualBolusTime:"",hasVasoactiveAgent:!1,hasHypotension:!1,hasCaesareanSection:!1,hasInstrumental:!1,hasLateralEpisiotomy:!1,birthTime:"",foetalWeight:"",oneMinuteApgarScore:"",fiveMinuteApgarScore:"",description:""};const O={nameSpace:"observal",state:{form:b({},d),getActionType:null,updateActionType:null},apis:{getObservalData:function(e){var t=e.patientId;return function(e){return e({api:u,params:{patientId:t},successResMsgDisabled:!0})}},createOrUpdateObservalData:function(e){var t=e.patientId,r=e.callback,n=e.successResMsgDisabled,a=e.failureResMsgDisabled,o=void 0!==a&&a;return function(e,a,l){var c=l().observal.form;if(t&&c)return e({api:s,params:{patientId:t,observalData:v(c)()},successResMsgDisabled:n,failureResMsgDisabled:o,successCallback:function(){null==r||r()}})}}},globalReducers:{resetData:function(e){return b(b({},e),{},{form:b({},d)})}},reducers:{updateObservalField:function(e,t){var r=t.fieldName,n=t.fieldValue,a=b({},e.form);return a[r]=n,b(b({},e),{},{form:a})},getObservalRequest:function(e){return b(b({},e),{},{getActionType:"observal/getObservalRequest"})},getObservalSuccess:function(e,t){var r=t.responseData;return b(b({},e),{},{getActionType:"observal/getObservalSuccess",form:r||b({},d)})},getObservalFailure:function(e){return b(b({},e),{},{getActionType:"observal/getObservalFailure"})},updateObservalRequest:function(e){return b(b({},e),{},{updateActionType:"observal/updateObservalRequest"})},updateObservalSuccess:function(e){return b(b({},e),{},{updateActionType:"observal/updateObservalSuccess"})},updateObservalFailure:function(e){return b(b({},e),{},{updateActionType:"observal/updateObservalFailure"})}}}},93526:(e,t,r)=>{r.d(t,{Z:()=>s}),r(23826),r(67311),r(46430),r(69626),r(68461),r(12952),r(54138),r(78158);var n=r(20324),a=(r(10956),r(95003)),o=r.n(a),l=r(16681);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){var r=t.name,n=t.url,a=t.params,c=t.header,u=t.contentType,s=t.cancelable,p={method:e,url:n,headers:i(i({},c),{},{"Content-type":u||"application/json"}),params:"get"===e?a:null,data:"post"===e?a:null};if(s){var f=o().CancelToken.source();l.ZP.add({name:r,url:n,source:f}),p.cancelToken=null==f?void 0:f.token}return o()(p)}const s={get:function(e){return u("get",e)},post:function(e){return u("post",e)}}},16681:(e,t,r)=>{function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,{ZP:()=>o}),r(46430),r(69626),r(10956),r(25591),r(92674),r(70820),r(37262),r(67311),r(60051),r(34826),r(10902),r(44719);var a=[];const o={add:function(e){e&&a.push(e)},cancelByName:function(e){a=a.filter((function(t){var r,n;return(null==t?void 0:t.name)!==e||(null==t||null===(r=t.source)||void 0===r||null===(n=r.cancel)||void 0===n||n.call(r),!1)}))},cancelOthersByName:function(e){a=a.filter((function(t){var r,n;return(null==t?void 0:t.name)===e||(null==t||null===(r=t.source)||void 0===r||null===(n=r.cancel)||void 0===n||n.call(r),!1)}))},cancelAll:function(){var e,t=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){i=!0,l=e},f:function(){try{c||null==r.return||r.return()}finally{if(i)throw l}}}}(a);try{for(t.s();!(e=t.n()).done;){var r,o,l=e.value;null==l||null===(r=l.source)||void 0===r||null===(o=r.cancel)||void 0===o||o.call(r)}}catch(e){t.e(e)}finally{t.f()}a.length=0}}}}]);