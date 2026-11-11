const L='#2a2140';
function mb(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const f=n=>(+n).toFixed(1),f2=n=>(+n).toFixed(2),IV='#fff8e1';
function star(cx,cy,R,r,n){let s='';for(let i=0;i<n*2;i++){const a=Math.PI*i/n-Math.PI/2,q=i%2?r:R;s+=f(cx+Math.cos(a)*q)+','+f(cy+Math.sin(a)*q)+' '}return s}

