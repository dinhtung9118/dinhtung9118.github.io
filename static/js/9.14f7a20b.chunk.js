(this["webpackJsonpweb-doctor"]=this["webpackJsonpweb-doctor"]||[]).push([[9],{359:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"c",(function(){return g})),n.d(t,"e",(function(){return E})),n.d(t,"f",(function(){return y})),n.d(t,"g",(function(){return x})),n.d(t,"b",(function(){return k})),n.d(t,"d",(function(){return I}));var r=n(16),a=n(133),o=n(0),i=n.n(o),c=n(239),l=n(247),u=n(249),s=n(292),p=n(242),m=n(46),b=function(e){var t=e.error,n=Object(a.a)(e,["error"]),o=Object(m.e)(),b=o.config.academicLevel,d=o.component.inputs.academicRank,f=d.errors,v=void 0===f?{}:f;return i.a.createElement(i.a.Fragment,null,i.a.createElement(c.a,{error:!!t},d.label),i.a.createElement(l.a,{height:"0px",visibility:"hidden",px:4},d.label),i.a.createElement(u.a,Object.assign({name:"academicRank",color:"primary",label:d.label,placeholder:d.placeholder,error:!!t},n,{value:n.value||""}),Object.entries(b).map((function(e){var t=Object(r.a)(e,2),n=t[0],a=t[1];return i.a.createElement(s.a,{key:n,value:n},a)}))),t&&i.a.createElement(p.a,{error:!!t},v[t]))},d=n(240),f=n(592),v=n(579),j=n(586),g=function(e){var t=e.error,n=Object(a.a)(e,["error"]),o=Object(m.e)(),c=o.config.gender,u=o.component.inputs,s=u.gender.errors,b=void 0===s?{}:s;return i.a.createElement(i.a.Fragment,null,i.a.createElement(l.a,{display:"flex",alignItems:"center",justifyContent:"flex-end"},i.a.createElement(d.a,{error:!!t},u.gender.label),i.a.createElement(l.a,{pr:2}),i.a.createElement(f.a,n,Object.entries(c).map((function(e){var t=Object(r.a)(e,2),n=t[0],a=t[1];return i.a.createElement(v.a,{key:n,value:n,control:i.a.createElement(j.a,{size:"small"}),label:a})})))),t&&i.a.createElement(p.a,{error:!!t,style:{textAlign:"right"}},b[t]))},h=n(589),O=n(284),E=function(e){var t=e.onChange,n=e.error,c=Object(a.a)(e,["onChange","error"]),l=Object(m.e)(),u=l.config.nations,s=l.component.inputs,p=s.nation.errors,b=void 0===p?{}:p,d=Object(o.useMemo)((function(){return Object.entries(u)}),[u]);return i.a.createElement(h.a,{options:d,value:d.find((function(e){return Object(r.a)(e,1)[0]===c.value}))||null,getOptionLabel:function(e){return Object(r.a)(e,2)[1]},filterSelectedOptions:!0,onChange:function(e,n){return t(null===n||void 0===n?void 0:n.first)},renderInput:function(e){return i.a.createElement(O.a,Object.assign({},e,{size:"small",variant:"outlined",label:s.nation.label,error:!!n,helperText:n?b[n]:""},c))}})},y=function(e){var t=Object.assign({},e),n=Object(m.e)(),a=n.config.nationality,c=n.component.inputs,l=c.nationality.errors,u=void 0===l?{}:l,s=Object(o.useMemo)((function(){return Object.entries(a)}),[a]);return i.a.createElement(h.a,{options:s,value:s.find((function(e){return Object(r.a)(e,1)[0]===t.value}))||null,getOptionLabel:function(e){return Object(r.a)(e,2)[1]},filterSelectedOptions:!0,onChange:function(e,n){return t.onChange(null===n||void 0===n?void 0:n.first)},renderInput:function(e){return i.a.createElement(O.a,Object.assign({},e,{size:"small",variant:"outlined",label:c.nationality.label,error:!!t.error,helperText:t.error?u[t.error]:""}))}})},x=function(e){var t=Object(m.e)(),n=t.config.hospital,a=t.component.inputs,c=a.workplace.errors,l=void 0===c?{}:c,u=Object(o.useMemo)((function(){return Object.entries(n)}),[n]),s=Object(o.useMemo)((function(){return u.filter((function(t){var n=Object(r.a)(t,1)[0];return e.value?e.value.includes(n):null}))}),[u,e.value]);return i.a.createElement(h.a,{options:u,value:s,getOptionLabel:function(e){return Object(r.a)(e,2)[1]},filterSelectedOptions:!0,multiple:!0,onChange:function(t,n){return e.onChange(null===n||void 0===n?void 0:n.map((function(e){return Object(r.a)(e,1)[0]})))},renderInput:function(t){return i.a.createElement(O.a,Object.assign({},t,{size:"small",variant:"outlined",label:a.workplace.label,error:!!e.error,helperText:e.error?l[e.error]:""}))}})},k=function(e){var t=Object(m.e)(),n=t.config.diseases,a=t.component.inputs,c=a.diseases.errors,l=void 0===c?{}:c,u=Object(o.useMemo)((function(){return Object.entries(n)}),[n]),s=Object(o.useMemo)((function(){return u.filter((function(t){var n=Object(r.a)(t,1)[0];return e.value.includes(n)}))}),[u,e.value]);return i.a.createElement(h.a,{options:u,value:s,getOptionLabel:function(e){return Object(r.a)(e,2)[1]},filterSelectedOptions:!0,multiple:!0,onChange:function(t,n){return e.onChange(null===n||void 0===n?void 0:n.map((function(e){return Object(r.a)(e,1)[0]})))},renderInput:function(t){return i.a.createElement(O.a,Object.assign({},t,{size:"small",variant:"outlined",label:a.diseases.label,error:!!e.error,helperText:e.error?l[e.error]:""}))}})},I=function(e){var t,n=e.onChange,c=e.error,l=Object(a.a)(e,["onChange","error"]),u=Object(m.e)(),s=u.config.jobTitle,p=u.component.inputs,b=p.jobTitle.errors,d=void 0===b?{}:b,f=Object(o.useMemo)((function(){return Object.entries(s)}),[s]);return i.a.createElement(h.a,{options:f,value:null!==(t=f.find((function(e){return Object(r.a)(e,1)[0]===l.value})))&&void 0!==t?t:null,getOptionLabel:function(e){return Object(r.a)(e,2)[1]},filterSelectedOptions:!0,onChange:function(e,t){return n(null===t||void 0===t?void 0:t.first)},renderInput:function(e){return i.a.createElement(O.a,Object.assign({},e,{size:"small",variant:"outlined",label:p.jobTitle.label,error:!!c,helperText:c?d[c]:""},l))}})}},398:function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},399:function(e,t){e.exports=function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}},534:function(e,t,n){"use strict";var r=n(1),a=n(3),o=n(0),i=(n(7),n(4)),c=n(5),l=n(24),u=o.forwardRef((function(e,t){var n=e.absolute,c=void 0!==n&&n,l=e.classes,u=e.className,s=e.component,p=void 0===s?"hr":s,m=e.flexItem,b=void 0!==m&&m,d=e.light,f=void 0!==d&&d,v=e.orientation,j=void 0===v?"horizontal":v,g=e.role,h=void 0===g?"hr"!==p?"separator":void 0:g,O=e.variant,E=void 0===O?"fullWidth":O,y=Object(a.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return o.createElement(p,Object(r.a)({className:Object(i.default)(l.root,u,"fullWidth"!==E&&l[E],c&&l.absolute,b&&l.flexItem,f&&l.light,"vertical"===j&&l.vertical),role:h,ref:t},y))}));t.a=Object(c.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(l.d)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(u)},537:function(e,t,n){var r=n(538),a=n(541),o=n(546),i=n(323),c=n(548),l=n(549),u=n(398),s=n(551),p=Object.prototype.hasOwnProperty;e.exports=function(e){if(null==e)return!0;if(c(e)&&(i(e)||"string"==typeof e||"function"==typeof e.splice||l(e)||s(e)||o(e)))return!e.length;var t=a(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(u(e))return!r(e).length;for(var n in e)if(p.call(e,n))return!1;return!0}},538:function(e,t,n){var r=n(398),a=n(539),o=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return a(e);var t=[];for(var n in Object(e))o.call(e,n)&&"constructor"!=n&&t.push(n);return t}},539:function(e,t,n){var r=n(540)(Object.keys,Object);e.exports=r},540:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},541:function(e,t,n){var r=n(542),a=n(375),o=n(543),i=n(544),c=n(545),l=n(318),u=n(374),s=u(r),p=u(a),m=u(o),b=u(i),d=u(c),f=l;(r&&"[object DataView]"!=f(new r(new ArrayBuffer(1)))||a&&"[object Map]"!=f(new a)||o&&"[object Promise]"!=f(o.resolve())||i&&"[object Set]"!=f(new i)||c&&"[object WeakMap]"!=f(new c))&&(f=function(e){var t=l(e),n="[object Object]"==t?e.constructor:void 0,r=n?u(n):"";if(r)switch(r){case s:return"[object DataView]";case p:return"[object Map]";case m:return"[object Promise]";case b:return"[object Set]";case d:return"[object WeakMap]"}return t}),e.exports=f},542:function(e,t,n){var r=n(314)(n(310),"DataView");e.exports=r},543:function(e,t,n){var r=n(314)(n(310),"Promise");e.exports=r},544:function(e,t,n){var r=n(314)(n(310),"Set");e.exports=r},545:function(e,t,n){var r=n(314)(n(310),"WeakMap");e.exports=r},546:function(e,t,n){var r=n(547),a=n(324),o=Object.prototype,i=o.hasOwnProperty,c=o.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(e){return a(e)&&i.call(e,"callee")&&!c.call(e,"callee")};e.exports=l},547:function(e,t,n){var r=n(318),a=n(324);e.exports=function(e){return a(e)&&"[object Arguments]"==r(e)}},548:function(e,t,n){var r=n(373),a=n(399);e.exports=function(e){return null!=e&&a(e.length)&&!r(e)}},549:function(e,t,n){(function(e){var r=n(310),a=n(550),o=t&&!t.nodeType&&t,i=o&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===o?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||a;e.exports=l}).call(this,n(138)(e))},550:function(e,t){e.exports=function(){return!1}},551:function(e,t,n){var r=n(552),a=n(553),o=n(554),i=o&&o.isTypedArray,c=i?a(i):r;e.exports=c},552:function(e,t,n){var r=n(318),a=n(399),o=n(324),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return o(e)&&a(e.length)&&!!i[r(e)]}},553:function(e,t){e.exports=function(e){return function(t){return e(t)}}},554:function(e,t,n){(function(e){var r=n(372),a=t&&!t.nodeType&&t,o=a&&"object"==typeof e&&e&&!e.nodeType&&e,i=o&&o.exports===a&&r.process,c=function(){try{var e=o&&o.require&&o.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(t){}}();e.exports=c}).call(this,n(138)(e))},584:function(e,t,n){"use strict";n.r(t),n.d(t,"useStyles",(function(){return S}));var r=n(16),a=n(0),o=n.n(a),i=n(368),c=n(247),l=n(288),u=n(402),s=n(534),p=n(284),m=n(21),b=n(313),d=n.n(b),f=n(537),v=n.n(f),j=n(319),g=n(88),h=n(258),O=n(22),E=n(134),y=n(80),x=n.n(y),k=n(93),I=n(72),w=n(359),S=Object(h.a)((function(e){return{root:{paddingTop:e.spacing(2),background:e.palette.common.white,width:600},link:{textDecoration:"none",color:e.palette.primary.main}}}));t.default=function(){var e=S(),t=Object(m.h)(),n=Object(I.b)().enqueueSnackbar,b=t.search.replace("?",""),f=Object(a.useState)(),h=Object(r.a)(f,2),y=h[0],C=h[1],T=Object(a.useState)(),A=Object(r.a)(T,2),M=A[0],B=A[1],D=Object(a.useState)(),N=Object(r.a)(D,2),P=N[0],W=N[1],L=Object(a.useState)(""),z=Object(r.a)(L,2),F=z[0],R=z[1],q=Object(a.useState)([]),U=Object(r.a)(q,2),V=U[0],H=U[1],J=(Object(m.g)(),d()(Object(j.parse)(b),"bookingId","")),G=d()(t,"state.workingTime",new O.g);Object(a.useEffect)((function(){G&&!v()(G)&&B(G)}),[G]),Object(a.useEffect)((function(){J&&g.doctor.getBookingInfo(J).then((function(e){C(e),H(null===e||void 0===e?void 0:e.diseaseCodes),e&&e.userId&&g.patient.single(e.patient||e.userId).then((function(e){W(e)}))}))}),[J]);return o.a.createElement(i.a,{className:e.root},o.a.createElement(c.a,{alignItems:"center",display:"flex",justifyContent:"space-between"},o.a.createElement(c.a,{fontSize:24,fontWeight:500},"Phieu tai kham"),o.a.createElement(c.a,null,o.a.createElement(l.a,{color:"primary",onClick:function(){return function(){var e,t,r=x()(null===M||void 0===M?void 0:M.date).toDate().getTime(),a=r+60*((null===M||void 0===M?void 0:M.from)||0)*1e3,i=r+60*((null===M||void 0===M?void 0:M.to)||0)*1e3,c={notes:F,description:null===y||void 0===y?void 0:y.description,type:E.b.RE_EXAMINATION,patientId:null===y||void 0===y?void 0:y.patient,doctorId:null===y||void 0===y||null===(e=y.doctor)||void 0===e?void 0:e.id,partnerId:null===y||void 0===y||null===(t=y.partner)||void 0===t?void 0:t.id,specialtyId:null===y||void 0===y?void 0:y.specialty.id,start:a,end:i,hasMedicalInsurance:!0,diseaseCodes:V,additionalData:(null===y||void 0===y?void 0:y.additionalData)||{},serialId:null===y||void 0===y?void 0:y.id};g.doctor.reExaminationBooking(c).then((function(e){n(o.a.createElement(k.a,{name:"reExameBookingSuccess",message:"Booking successfuly!"}),{key:"reExameBookingSuccess",variant:"success"})})).catch((function(e){n(o.a.createElement(k.a,{name:"reExameBookingError",message:null===e||void 0===e?void 0:e.message}),{key:"reExameBookingError",variant:"error"})}))}()}},"Save"))),o.a.createElement(c.a,{display:"flex",mt:2,mb:2},o.a.createElement(c.a,null,o.a.createElement(u.a,{alt:"Remy Sharp",src:null===P||void 0===P?void 0:P.avatar})),o.a.createElement(c.a,{ml:2},o.a.createElement(c.a,null,"H\u1ecd t\xean: ".concat(null===P||void 0===P?void 0:P.fullName)),o.a.createElement(c.a,null,"Email: ".concat(null===P||void 0===P?void 0:P.email)))),o.a.createElement(s.a,null),o.a.createElement(c.a,{mt:2,mb:2},o.a.createElement(c.a,{mb:1},"Thong tin tai kham"),o.a.createElement(c.a,{mb:1},o.a.createElement(c.a,null,"Ng\xe0y t\xe1i Kh\xe1m: ".concat(null===M||void 0===M?void 0:M.date)),o.a.createElement(c.a,null,"Th\u1eddi gian d\u1ef1 ki\u1ebfn b\u1eaft \u0111\u1ea7u: ".concat(O.g.minusFormat((null===M||void 0===M?void 0:M.from)||0))),o.a.createElement(c.a,null,"Th\u1eddi gian d\u1ef1 ki\u1ebfn k\u1ebft th\xfac: ".concat(O.g.minusFormat((null===M||void 0===M?void 0:M.to)||0)))),o.a.createElement(c.a,{mt:1},o.a.createElement(w.b,{value:V||[],onChange:function(e){console.log("values",e),H(e||[])}})),o.a.createElement(c.a,{mt:1},o.a.createElement(p.a,{fullWidth:!0,id:"outlined-multiline-static",label:"L\u1eddi nh\u1eafn B\xe1c s\u1ef9",multiline:!0,rows:4,value:F,onChange:function(e){var t;R(null===(t=e.target)||void 0===t?void 0:t.value)},placeholder:"Nh\u1eadp l\u1eddi nh\u1eafn",variant:"outlined"}))),o.a.createElement(s.a,null),o.a.createElement(c.a,null,o.a.createElement(c.a,{mt:5},o.a.createElement(c.a,{mt:2,mb:1},"Info Detail"),o.a.createElement(c.a,{display:"flex"},o.a.createElement(c.a,{minWidth:200,mr:5},o.a.createElement(c.a,{pt:1,pb:1},"Time Consultation:"),o.a.createElement(c.a,{pt:1,pb:1},"Patient need Consulting"),o.a.createElement(c.a,{pt:1,pb:1},"Patient notes")),o.a.createElement(c.a,null,o.a.createElement(c.a,{pt:1,pb:1}," ","14:30 - 22/10/2020"),o.a.createElement(c.a,{pt:1,pb:1}," ","stomach pain"),o.a.createElement(c.a,{pt:1,pb:1}," ","FormGroup is a helpful wrapper used to group selection controls components that provides an easier API. However, you are encouraged you to use Checkboxes instead if multiple related controls are required. (See: When to use)."))),o.a.createElement(c.a,{mt:2,mb:1},"More Info"),o.a.createElement(c.a,{display:"flex"},o.a.createElement(c.a,{minWidth:200,mr:5},o.a.createElement(c.a,{pt:1,pb:1},"Allergy:"),o.a.createElement(c.a,{pt:1,pb:1},"Height:"),o.a.createElement(c.a,{pt:1,pb:1},"Weight:"," "),o.a.createElement(c.a,{pt:1,pb:1},"Patient:"," "),o.a.createElement(c.a,{pt:1,pb:1},"Patient:"," "),o.a.createElement(c.a,{pt:1,pb:1},"Last Re-examination:"," ")),o.a.createElement(c.a,null,o.a.createElement(c.a,{pt:1,pb:1}," ","Sea Food"),o.a.createElement(c.a,{pt:1,pb:1}," ","170 cm"),o.a.createElement(c.a,{pt:1,pb:1}," ","57 kg"),o.a.createElement(c.a,{pt:1,pb:1}," ","DO NOT use tobacco"),o.a.createElement(c.a,{pt:1,pb:1}," ","DO NOT use stimulants (alcohol, beer ...)"),o.a.createElement(c.a,{pt:1,pb:1}," ","14:30 - 12/9/2020"))),o.a.createElement(c.a,null,"More Image"))))}}}]);
//# sourceMappingURL=9.14f7a20b.chunk.js.map