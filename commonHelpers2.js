import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as r}from"./assets/vendor-651d7991.js";document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".form");s.addEventListener("submit",a=>{a.preventDefault();const i=s.querySelector('[name="delay"]'),l=s.querySelectorAll('[name="state"]'),o=Array.from(l).find(e=>e.checked);if(!o){r.error({title:"Error",message:"Please choose a state (Fulfilled or Rejected)"});return}const t=parseInt(i.value);if(isNaN(t)||t<=0){r.error({title:"Error",message:"Please enter a valid delay (greater than 0)"});return}new Promise((e,n)=>{setTimeout(()=>{o.value==="fulfilled"?e(t):n(t)},t)}).then(e=>{r.success({title:"Fulfilled Promise",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({title:"Rejected Promise",message:`❌ Rejected promise in ${e}ms`})})})});
//# sourceMappingURL=commonHelpers2.js.map
