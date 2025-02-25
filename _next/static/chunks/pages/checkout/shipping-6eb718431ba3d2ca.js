(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[768],{3719:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/checkout/shipping",function(){return n(7030)}])},4242:function(e,t,n){"use strict";n.d(t,{W:function(){return Navigation}});var a=n(5893),r=n(2293),i=n(155),s=n(5616),l=n(9417),o=n(6653),d=n(5500),c=n(1163),u=n(4858),h=n(5861),x=n(6770);let Logo=()=>{let e=(0,c.useRouter)();return(0,a.jsxs)(s.Z,{onClick:()=>e.push("/"),sx:{display:"flex",alignItems:"center",cursor:"pointer",gap:1.5,position:"relative",py:1,"&:hover":{"& .icon":{transform:"rotate(10deg) scale(1.1)",boxShadow:"0 4px 15px rgba(85, 108, 214, 0.15)"},"& .text":{letterSpacing:2},"&::after":{width:"100%",opacity:.8}},"&::after":{content:'""',position:"absolute",bottom:0,left:0,width:"0%",height:"2px",background:"linear-gradient(145deg, rgba(85, 108, 214, 0.8) 0%, rgba(25, 133, 123, 0.8) 100%)",transition:"width 0.3s ease-in-out, opacity 0.3s ease-in-out",opacity:0}},children:[(0,a.jsx)(s.Z,{className:"icon",sx:{bgcolor:"rgba(255, 255, 255, 0.9)",borderRadius:"50%",p:1,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",boxShadow:"0 2px 10px rgba(85, 108, 214, 0.1)"},children:(0,a.jsx)(x.Z,{sx:{fontSize:"2rem",color:"rgba(25, 133, 123, 0.9)",filter:"drop-shadow(0 2px 3px rgba(25, 133, 123, 0.15))"}})}),(0,a.jsx)(h.Z,{variant:"h5",component:"span",className:"text",sx:{fontWeight:800,background:"linear-gradient(145deg, rgba(85, 108, 214, 0.9) 0%, rgba(25, 133, 123, 0.9) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",textTransform:"uppercase",letterSpacing:1.5,fontSize:{xs:"1.2rem",sm:"1.5rem"},textShadow:"0 2px 8px rgba(85, 108, 214, 0.08)"},children:"ShopHub"})]})},Navigation=()=>{let e=(0,c.useRouter)(),{cart:t}=(0,u.j)(),n=t.items.reduce((e,t)=>e+t.quantity,0);return(0,a.jsx)(r.Z,{position:"fixed",sx:{bgcolor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",boxShadow:"0 2px 15px rgba(85, 108, 214, 0.08)"},children:(0,a.jsxs)(i.Z,{sx:{justifyContent:"space-between",px:{xs:2,sm:4}},children:[(0,a.jsx)(Logo,{}),(0,a.jsx)(s.Z,{sx:{display:"flex",alignItems:"center",gap:2},children:(0,a.jsx)(l.Z,{variant:"contained",color:"primary",onClick:()=>e.push("/cart"),startIcon:(0,a.jsx)(o.Z,{badgeContent:n,color:"error",sx:{"& .MuiBadge-badge":{bgcolor:"rgba(25, 133, 123, 0.9)",color:"white"}},children:(0,a.jsx)(d.Z,{})}),sx:{borderRadius:"50px",px:3,py:1,textTransform:"none",fontSize:"1rem",fontWeight:500,background:"linear-gradient(145deg, rgba(85, 108, 214, 0.9) 0%, rgba(25, 133, 123, 0.9) 100%)",boxShadow:"0 3px 12px rgba(85, 108, 214, 0.15)","&:hover":{background:"linear-gradient(145deg, rgba(25, 133, 123, 0.9) 0%, rgba(85, 108, 214, 0.9) 100%)",boxShadow:"0 4px 15px rgba(85, 108, 214, 0.2)"}},children:"Cart"})})]})})}},7030:function(e,t,n){"use strict";n.r(t);var a=n(5893),r=n(7294),i=n(1163),s=n(3953),l=n(629),o=n(5861),d=n(5616),c=n(6886),u=n(7979),h=n(9417),x=n(4242),p=n(4858),g=n(3973);t.default=()=>{let e=(0,i.useRouter)(),{cart:t}=(0,p.j)(),[n,m]=(0,r.useState)({firstName:"",lastName:"",email:"",address:"",city:"",state:"",zipCode:"",country:""});(0,r.useEffect)(()=>{(0,g.Z0)("Checkout - Shipping",window.location.pathname),(0,g.rT)(1,"Shipping")},[]),(0,r.useEffect)(()=>{0===t.items.length&&e.push("/cart")},[t.items.length,e]);let handleInputChange=e=>t=>{m(n=>({...n,[e]:t.target.value}))};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(x.W,{}),(0,a.jsx)(s.Z,{maxWidth:"md",sx:{py:4},children:(0,a.jsxs)(l.Z,{sx:{p:4},children:[(0,a.jsx)(o.Z,{variant:"h4",component:"h1",gutterBottom:!0,children:"Shipping Information"}),(0,a.jsxs)(d.Z,{component:"form",onSubmit:t=>{t.preventDefault(),localStorage.setItem("shippingDetails",JSON.stringify(n)),e.push("/checkout/payment")},sx:{mt:4},children:[(0,a.jsxs)(c.ZP,{container:!0,spacing:3,children:[(0,a.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,label:"First Name",value:n.firstName,onChange:handleInputChange("firstName")})}),(0,a.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,label:"Last Name",value:n.lastName,onChange:handleInputChange("lastName")})}),(0,a.jsx)(c.ZP,{item:!0,xs:12,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,type:"email",label:"Email",value:n.email,onChange:handleInputChange("email")})}),(0,a.jsx)(c.ZP,{item:!0,xs:12,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,label:"Address",value:n.address,onChange:handleInputChange("address")})}),(0,a.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,label:"City",value:n.city,onChange:handleInputChange("city")})}),(0,a.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,label:"State",value:n.state,onChange:handleInputChange("state")})}),(0,a.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,label:"ZIP Code",value:n.zipCode,onChange:handleInputChange("zipCode")})}),(0,a.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,a.jsx)(u.Z,{required:!0,fullWidth:!0,label:"Country",value:n.country,onChange:handleInputChange("country")})})]}),(0,a.jsxs)(d.Z,{sx:{mt:4,display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)(h.Z,{variant:"outlined",onClick:()=>e.push("/cart"),children:"Back to Cart"}),(0,a.jsx)(h.Z,{type:"submit",variant:"contained",color:"primary",disabled:!Object.values(n).every(e=>""!==e.trim()),children:"Continue to Payment"})]})]})]})})]})}}},function(e){e.O(0,[678,886,979,774,888,179],function(){return e(e.s=3719)}),_N_E=e.O()}]);