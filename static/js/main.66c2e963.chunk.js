(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(t,e,n){t.exports={container:"styles_container__2kRPO",scopedContent:"styles_scopedContent__29NLN",mainWheel:"styles_mainWheel__35iHf",thumb:"styles_thumb__XOlUg"}},32:function(t,e,n){t.exports={ear:"styles_ear__1cGPn",started:"styles_started__3JQw6"}},42:function(t){t.exports={colorWheel:"Color Wheel",clickToGetStarted:"Click to get started"}},43:function(t){t.exports={colorWheel:"Color Wheel",clickToGetStarted:"Click v\xe0o \u0111\xe2y \u0111\u1ec3 b\u1eaft \u0111\u1ea7u"}},44:function(t){t.exports={colorWheel:"\u0426\u0432\u0435\u0442\u043d\u043e\u0435 \u043a\u043e\u043b\u0435\u0441\u043e",clickToGetStarted:"\u0429\u0435\u043b\u043a\u043d\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044c, \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u0447\u0430\u0442\u044c"}},49:function(t,e,n){t.exports=n(72)},67:function(t,e,n){},72:function(t,e,n){"use strict";n.r(e);var a,r,o,i,c=n(0),s=n.n(c),l=n(28),u=n.n(l),h=n(45),d=n(13),m=n(36),p=Object(d.c)({appState:{}}),v=n(17),f=n(18),b=n(21),O=n(19),C=n(22),y=n(27),g=n(24),j=n(12),x=n(47),w=n(48),M=n(39),k=n(26),E=n.n(k),_=function(t,e){return{x:t*Math.cos(e),y:t*Math.sin(e)}},P=n(40),S=n.n(P),W={capture:!0},z=function(t,e){return[Math.sqrt(t*t+e*e),Math.atan2(e,t)]},I=function(t){return(t+Math.PI)/(2*Math.PI)*360},N=function(t,e,n){var a,r,o,i=n*e,c=t/60,s=i*(1-Math.abs(c%2-1));c>=0&&c<=1?(a=i,r=s,o=0):c>=1&&c<=2?(a=s,r=i,o=0):c>=2&&c<=3?(a=0,r=i,o=s):c>=3&&c<=4?(a=0,r=s,o=i):c>=4&&c<=5?(a=s,r=0,o=i):c>=5&&c<=6&&(a=i,r=0,o=s);var l=n-i;return[255*(a+l),255*(r+l),255*(o+l)]},T=function(t,e,n){return"#"+((1<<24)+(t<<16)+(e<<8)+n).toString(16).slice(1)},G=Object(w.a)(function(){return Object(x.a)({},function(){var t=window.devicePixelRatio||1,e=window.screen.width*t;return M.isMobile?{ratio:t,size:e-40}:{ratio:t,size:parseInt(.3*e)}}())})((o=r=function(t){function e(t){var n;return Object(v.a)(this,e),(n=Object(b.a)(this,Object(O.a)(e).call(this,t))).state={initialized:!1,canvasCenter:{x:0,y:0},thumbPosition:[],thumbColors:[],scoped:null},n.ctx=null,n.data=null,n.initCanvas=function(t){n.ctx=t.getContext("2d");var e=n.props.size,a=t.getBoundingClientRect(),r={x:a.left+e/2,y:a.top+e/2};n.setState({canvasCenter:r,initialized:!0},function(){return n.draw()})},n.draw=function(){for(var t=n.props,e=t.size,a=t.thickness,r=e/2,o=n.ctx,i=o.createImageData(e,e),c=i.data,s=-r;s<r;s++)for(var l=-r;l<r;l++){var u=z(s,l),h=Object(g.a)(u,2),d=h[0],m=h[1];if(!(d>r)&&!(a>0&&d<r-a-3)){var p=I(m),v=4*(s+r+(l+r)*e),f=N(p,d/r,1),b=Object(g.a)(f,3),O=b[0],C=b[1],y=b[2];c[v]=O,c[v+1]=C,c[v+2]=y,c[v+3]=255}}o.fillRect(0,0,2*r,2*r),o.translate(r,r),r-=3,o.beginPath(),o.arc(0,0,r,0,2*Math.PI,!0),o.clip(),n.data=i.data,o.putImageData(i,0,0)},n.onMouseMove=n.onMouseMove.bind(Object(j.a)(Object(j.a)(n))),n}return Object(C.a)(e,t),Object(f.a)(e,[{key:"componentDidMount",value:function(){document.addEventListener("mousemove",this.onMouseMove,W)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousemove",this.onMouseMove,W)}},{key:"onMouseMove",value:function(t){var e=t.clientX,n=t.clientY;if(this.state.initialized){var a=this.props,r=a.size,o=a.numberOfThumbs,i=a.isConstraint,c=a.onColorsChanged,s=this.state.canvasCenter,l=1*r/2,u=e-s.x,h=n-s.y,d=z(u,h),m=Object(g.a)(d,2),p=m[0],v=m[1],f=[],b=2*Math.PI/o,O=l;!i&&p<l&&(O=p),O--;for(var C=0;C<o;C++){var y=_(O,v);y.x+=l,y.y+=l,y.phi=v,y.deg=I(v),f.push(y),v+=b}var j=this.data||this.ctx.getImageData(0,0,r,r).data,x=f.map(function(t){var e=[t.x,t.y].map(Math.round),n=Object(g.a)(e,2),a=n[0],o=n[1],i=[0,1,2].map(function(t){return j[4*(a+o*r)+t]}),c=Object(g.a)(i,3),s=c[0],l=c[1],u=c[2];return{r:s,g:l,b:u,hex:T(s,l,u)}});this.setState({thumbPosition:f,thumbColors:x},function(){return c(x)})}}},{key:"render",value:function(){var t=this.props.size,e=this.state,n=e.thumbPosition,a={thumbPosition:n,thumbColors:e.thumbColors},r=this.props.renderScoped(a),o=s.a.cloneElement(r,{className:S()(r.props.className,E.a.scopedContent)});return s.a.createElement("div",{className:E.a.container},s.a.createElement("div",{className:E.a.mainWheel},s.a.createElement("canvas",{ref:this.initCanvas,width:t,height:t}),this.state.initialized&&n.map(function(t){var e={top:t.y+"px",left:t.x+"px"};return s.a.createElement("div",{className:E.a.thumb,style:e})}),o),this.props.children(a))}}]),e}(c.Component),r.defaultProps={thickness:0,numberOfThumbs:1,isConstraint:!0,renderScoped:function(){},children:function(){},onColorsChanged:function(){}},a=o))||a,D=n(32),L=n.n(D),R=Object(y.b)()(i=function(t){function e(){var t,n;Object(v.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(b.a)(this,(t=Object(O.a)(e)).call.apply(t,[this].concat(r)))).state={colors:[]},n.renderEars=function(t){var e=t.thumbPosition,a=t.thumbColors,r=n.props.t;return s.a.createElement("div",null,e.map(function(t,e){var n=a[e].hex,r=_(25,Math.PI-t.phi),o=r.x,i=r.y,c={backgroundColor:n,transform:"translate(".concat(o,"px, ").concat(i,"px)")};return s.a.createElement("div",{className:L.a.ear,style:c})}),s.a.createElement("div",{className:L.a.started}),","," ",s.a.createElement("div",null,s.a.createElement("h1",null,r("colorWheel")),s.a.createElement("p",null,r("clickToGetStarted"))))},n}return Object(C.a)(e,t),Object(f.a)(e,[{key:"render",value:function(){var t=this;return s.a.createElement("div",null,s.a.createElement(G,{thickness:30,numberOfThumbs:3,onColorsChanged:function(e){return t.setState({colors:e})},renderScoped:this.renderEars}))}}]),e}(c.Component))||i,A=function(t){function e(){var t,n;Object(v.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(b.a)(this,(t=Object(O.a)(e)).call.apply(t,[this].concat(r)))).state={step:0},n.getStepComponent=function(){return[R][n.state.step]},n}return Object(C.a)(e,t),Object(f.a)(e,[{key:"render",value:function(){return s.a.createElement("div",{className:"App",style:{padding:"60px"}},s.a.createElement(R,null))}}]),e}(c.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(67);var B=n(46),J=n(42),U=n(43),X=n(44);B.a.use(y.a).init({resources:{en:{translation:J},vi:{translation:U},ru:{translation:X}},lng:"en",fallbackLng:"en",interpolation:{escapeValue:!1}}),u.a.render(s.a.createElement(h.a,{store:Object(d.d)(p,Object(d.a)(m.a))},s.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[49,1,2]]]);
//# sourceMappingURL=main.66c2e963.chunk.js.map