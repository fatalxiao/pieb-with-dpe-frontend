"use strict";(self.webpackChunkpieb_with_dpe_frontend=self.webpackChunkpieb_with_dpe_frontend||[]).push([[272],{49691:(e,t,r)=>{r.d(t,{AX:()=>n,ZP:()=>o});var n="/pieb-with-dpe";const o={baseUrl:"http://localhost:4100",appBaseUrl:n}},93305:(e,t,r)=>{r.d(t,{YR:()=>u,hK:()=>l,K3:()=>p}),r(23826),r(67311),r(46430),r(69626),r(68461),r(12952),r(54138),r(78158);var n=r(20324),o=(r(33403),r(49691)),a=r(93526);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e){if(null!=e&&e.params){var t=e.params.id;return a.Z.get(i(i({},e),{},{url:"".concat(o.ZP.appBaseUrl,"/patient/getPatientById/").concat(t)}))}}function l(e){return a.Z.post(i(i({},e),{},{url:"".concat(o.ZP.appBaseUrl,"/patient/createPatient")}))}function p(e){return a.Z.post(i(i({},e),{},{url:"".concat(o.ZP.appBaseUrl,"/patient/createOrUpdatePatient")}))}},69272:(e,t,r)=>{r.r(t),r.d(t,{default:()=>p}),r(23826),r(67311),r(46430),r(69626),r(68461),r(12952),r(54138),r(78158);var n=r(20324),o=(r(10956),r(93305)),a=r(42953),c=r.n(a);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l={group:null,id:"",name:""};const p={nameSpace:"patientBaseInfo",state:{form:u({},l)},apis:{createPatient:function(e){var t=e.callback;return function(e,r,n){var a=n().patientBaseInfo.form;a.id&&a.name&&a.group&&e({api:o.hK,params:{id:a.id,name:a.name,groupId:a.group.id},successCallback:function(){r({type:"patients/getPatients"}),null==t||t()}})}}},reducers:{resetPatientBaseInfo:function(e){return u(u({},e),{},{form:u({},l)})},updatePatientBaseInfoField:function(e,t){var r=t.fieldName,n=t.fieldValue,o=c()(e.form);return o[r]=n,u(u({},e),{},{form:o})}}}},93526:(e,t,r)=>{r.d(t,{Z:()=>p}),r(23826),r(67311),r(46430),r(69626),r(68461),r(12952),r(54138),r(78158);var n=r(20324),o=(r(10956),r(95003)),a=r.n(o),c=r(16681);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){var r=t.name,n=t.url,o=t.params,i=t.header,l=t.contentType,p=t.cancelable,f={method:e,url:n,headers:u(u({},i),{},{"Content-type":l||"application/json"}),params:"get"===e?o:null,data:"post"===e?o:null};if(p){var s=a().CancelToken.source();c.ZP.add({name:r,url:n,source:s}),f.cancelToken=null==s?void 0:s.token}return a()(f)}const p={get:function(e){return l("get",e)},post:function(e){return l("post",e)}}},16681:(e,t,r)=>{function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,{ZP:()=>a}),r(46430),r(69626),r(10956),r(25591),r(92674),r(70820),r(37262),r(67311),r(60051),r(34826),r(10902),r(44719);var o=[];const a={add:function(e){e&&o.push(e)},cancelByName:function(e){o=o.filter((function(t){var r,n;return(null==t?void 0:t.name)!==e||(null==t||null===(r=t.source)||void 0===r||null===(n=r.cancel)||void 0===n||n.call(r),!1)}))},cancelOthersByName:function(e){o=o.filter((function(t){var r,n;return(null==t?void 0:t.name)===e||(null==t||null===(r=t.source)||void 0===r||null===(n=r.cancel)||void 0===n||n.call(r),!1)}))},cancelAll:function(){var e,t=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){u=!0,c=e},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw c}}}}(o);try{for(t.s();!(e=t.n()).done;){var r,a,c=e.value;null==c||null===(r=c.source)||void 0===r||null===(a=r.cancel)||void 0===a||a.call(r)}}catch(e){t.e(e)}finally{t.f()}o.length=0}}}}]);