(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[475],{2:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/checkout/payment",function(){return n(9341)}])},7485:function(e,t,n){"use strict";n.d(t,{D:function(){return CheckoutStepper}});var a=n(5893),r=n(2734),i=n(1730),s=n(5616),o=n(4616),l=n(4472),c=n(3578),d=n(1163);let h=[{label:"Shipping",path:"/checkout/shipping"},{label:"Payment",path:"/checkout/payment"},{label:"Review",path:"/checkout/review"}],CheckoutStepper=()=>{let e=(0,d.useRouter)(),t=(0,r.Z)(),n=(0,i.Z)(t.breakpoints.down("sm")),p=h.findIndex(t=>t.path===e.pathname);return(0,a.jsx)(s.Z,{sx:{width:"100%",mb:4},children:(0,a.jsx)(o.Z,{activeStep:p,alternativeLabel:!n,orientation:n?"vertical":"horizontal",children:h.map((t,n)=>(0,a.jsx)(l.Z,{completed:p>n,children:(0,a.jsx)(c.Z,{sx:{cursor:p>=n?"pointer":"default","& .MuiStepLabel-label":{color:p>=n?"primary.main":"text.disabled"}},onClick:()=>{p>=n&&e.push(t.path)},children:t.label})},t.label))})})}},4242:function(e,t,n){"use strict";n.d(t,{W:function(){return Navigation}});var a=n(5893),r=n(2293),i=n(155),s=n(5616),o=n(3946),l=n(6653),c=n(6624),d=n(1664),h=n.n(d),p=n(4858),x=n(5861),u=n(6770);let Logo=()=>(0,a.jsx)(h(),{href:"/",style:{textDecoration:"none"},children:(0,a.jsxs)(s.Z,{sx:{display:"flex",alignItems:"center",cursor:"pointer",gap:1.5,position:"relative",py:1,"&:hover":{"& .icon":{transform:"rotate(10deg) scale(1.1)",boxShadow:"0 4px 15px rgba(85, 108, 214, 0.15)"},"& .text":{letterSpacing:2},"&::after":{width:"100%",opacity:.8}},"&::after":{content:'""',position:"absolute",bottom:0,left:0,width:"0%",height:"2px",background:"linear-gradient(145deg, rgba(85, 108, 214, 0.8) 0%, rgba(25, 133, 123, 0.8) 100%)",transition:"width 0.3s ease-in-out, opacity 0.3s ease-in-out",opacity:0}},children:[(0,a.jsx)(s.Z,{className:"icon",sx:{bgcolor:"rgba(255, 255, 255, 0.9)",borderRadius:"50%",p:1,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",boxShadow:"0 2px 10px rgba(85, 108, 214, 0.1)"},children:(0,a.jsx)(u.Z,{sx:{fontSize:"2rem",color:"rgba(25, 133, 123, 0.9)",filter:"drop-shadow(0 2px 3px rgba(25, 133, 123, 0.15))"}})}),(0,a.jsx)(x.Z,{variant:"h5",component:"span",className:"text",sx:{fontWeight:800,background:"linear-gradient(145deg, rgba(85, 108, 214, 0.9) 0%, rgba(25, 133, 123, 0.9) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",textTransform:"uppercase",letterSpacing:1.5,fontSize:{xs:"1.2rem",sm:"1.5rem"},textShadow:"0 2px 8px rgba(85, 108, 214, 0.08)"},children:"ShopHub"})]})}),Navigation=()=>{let{cart:e}=(0,p.j)(),t=e.items.reduce((e,t)=>e+t.quantity,0);return(0,a.jsx)(r.Z,{position:"fixed",sx:{bgcolor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",boxShadow:"0 2px 15px rgba(85, 108, 214, 0.08)"},children:(0,a.jsxs)(i.Z,{sx:{justifyContent:"space-between",px:{xs:2,sm:4}},children:[(0,a.jsx)(Logo,{}),(0,a.jsx)(s.Z,{sx:{display:"flex",alignItems:"center",gap:2},children:(0,a.jsx)(h(),{href:"/cart",passHref:!0,style:{textDecoration:"none"},children:(0,a.jsx)(o.Z,{component:"span",sx:{color:"rgba(25, 133, 123, 0.9)",transition:"all 0.3s ease","&:hover":{transform:"scale(1.1)",color:"rgba(85, 108, 214, 0.9)"}},children:(0,a.jsx)(l.Z,{badgeContent:t,color:"primary",sx:{"& .MuiBadge-badge":{bgcolor:"rgba(85, 108, 214, 0.9)",color:"white",fontWeight:"bold"}},children:(0,a.jsx)(c.Z,{sx:{fontSize:"1.75rem"}})})})})})]})})}},9341:function(e,t,n){"use strict";n.r(t);var a=n(5893),r=n(7294),i=n(1163),s=n(5582),o=n(6886),l=n(629),c=n(5861),d=n(5616),h=n(4054),p=n(476),x=n(1050),u=n(6836),m=n(7781),g=n(7244),b=n(9417),j=n(1519),f=n(4242),Z=n(7485),y=n(4858),v=n(3973);t.default=()=>{let e=(0,i.useRouter)(),{cart:t}=(0,y.j)(),[n,C]=(0,r.useState)({cardNumber:"",cardName:"",expiryDate:"",cvv:"",paymentMethod:"credit"});(0,r.useEffect)(()=>{(0,v.Z0)("Checkout - Payment",window.location.pathname),(0,v.rT)(2,"Payment");let e=localStorage.getItem("paymentDetails");if(e){let{paymentMethod:t}=JSON.parse(e);C(e=>({...e,paymentMethod:t}))}},[]),(0,r.useEffect)(()=>{0===t.items.length&&e.push("/cart");let n=localStorage.getItem("shippingDetails");n||e.push("/checkout/shipping")},[t.items.length,e]);let handleInputChange=e=>t=>{let n=t.target.value;C(t=>({...t,[e]:n})),"paymentMethod"===e&&(0,v.$y)(2,"credit"===n?"Credit Card":"Debit Card")};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(f.W,{}),(0,a.jsxs)(s.Z,{maxWidth:"lg",sx:{py:4},children:[(0,a.jsx)(Z.D,{}),(0,a.jsxs)(o.ZP,{container:!0,spacing:4,children:[(0,a.jsx)(o.ZP,{item:!0,xs:12,md:8,children:(0,a.jsxs)(l.Z,{sx:{p:4},children:[(0,a.jsx)(c.Z,{variant:"h4",component:"h1",gutterBottom:!0,children:"Payment Information"}),(0,a.jsxs)(d.Z,{component:"form",onSubmit:t=>{t.preventDefault(),localStorage.setItem("paymentDetails",JSON.stringify({paymentMethod:n.paymentMethod})),e.push("/checkout/review")},sx:{mt:4},children:[(0,a.jsxs)(h.Z,{component:"fieldset",sx:{mb:4},children:[(0,a.jsx)(p.Z,{component:"legend",children:"Payment Method"}),(0,a.jsxs)(x.Z,{value:n.paymentMethod,onChange:handleInputChange("paymentMethod"),children:[(0,a.jsx)(u.Z,{value:"credit",control:(0,a.jsx)(m.Z,{}),label:"Credit Card"}),(0,a.jsx)(u.Z,{value:"debit",control:(0,a.jsx)(m.Z,{}),label:"Debit Card"})]})]}),(0,a.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,a.jsx)(o.ZP,{item:!0,xs:12,children:(0,a.jsx)(g.Z,{required:!0,fullWidth:!0,label:"Card Number",value:n.cardNumber,onChange:handleInputChange("cardNumber"),inputProps:{maxLength:16}})}),(0,a.jsx)(o.ZP,{item:!0,xs:12,children:(0,a.jsx)(g.Z,{required:!0,fullWidth:!0,label:"Name on Card",value:n.cardName,onChange:handleInputChange("cardName")})}),(0,a.jsx)(o.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(g.Z,{required:!0,fullWidth:!0,label:"Expiry Date (MM/YY)",value:n.expiryDate,onChange:handleInputChange("expiryDate"),inputProps:{maxLength:5}})}),(0,a.jsx)(o.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(g.Z,{required:!0,fullWidth:!0,label:"CVV",type:"password",value:n.cvv,onChange:handleInputChange("cvv"),inputProps:{maxLength:4}})})]}),(0,a.jsxs)(d.Z,{sx:{mt:4,display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)(b.Z,{variant:"outlined",onClick:()=>e.push("/checkout/shipping"),children:"Back to Shipping"}),(0,a.jsx)(b.Z,{type:"submit",variant:"contained",color:"primary",disabled:!(()=>{let{cardNumber:e,cardName:t,expiryDate:a,cvv:r}=n;return""!==e.trim()&&""!==t.trim()&&""!==a.trim()&&""!==r.trim()})(),children:"Continue to Review"})]})]})]})}),(0,a.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,a.jsxs)(l.Z,{sx:{p:3},children:[(0,a.jsx)(c.Z,{variant:"h6",gutterBottom:!0,children:"Order Summary"}),(0,a.jsx)(j.Z,{sx:{my:2}}),(0,a.jsxs)(d.Z,{sx:{mb:2},children:[(0,a.jsxs)(c.Z,{children:["Items (",t.items.reduce((e,t)=>e+t.quantity,0),"): $",t.total.toFixed(2)]}),(0,a.jsx)(c.Z,{children:"Shipping: Calculated next"})]}),(0,a.jsx)(j.Z,{sx:{my:2}}),(0,a.jsxs)(c.Z,{variant:"h6",children:["Total: $",t.total.toFixed(2)]})]})})]})]})]})}}},function(e){e.O(0,[334,886,470,167,244,774,888,179],function(){return e(e.s=2)}),_N_E=e.O()}]);