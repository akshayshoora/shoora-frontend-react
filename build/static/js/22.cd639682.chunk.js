"use strict";(self.webpackChunkshoora_frontend_react=self.webpackChunkshoora_frontend_react||[]).push([[22],{5022:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return o}});var r=n(1811),a=n(9507),i=n(7909),o=function(t,e,n,o,u){var c=t.ownerDocument.defaultView,f=(0,a.i)(t),s=function(t){return f?-t.deltaX:t.deltaX};return(0,i.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return function(t){var e=t.startX;return f?e>=c.innerWidth-50:e<=50}(t)&&e()},onStart:n,onMove:function(t){var e=s(t)/c.innerWidth;o(e)},onEnd:function(t){var e=s(t),n=c.innerWidth,a=e/n,i=function(t){return f?-t.velocityX:t.velocityX}(t),o=i>=0&&(i>.2||e>n/2),h=(o?1-a:a)*n,d=0;if(h>5){var l=h/Math.abs(i);d=Math.min(l,540)}u(o,a<=0?.01:(0,r.h)(0,a,.9999),d)}})}}}]);
//# sourceMappingURL=22.cd639682.chunk.js.map