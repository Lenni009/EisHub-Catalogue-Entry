import{d as a,u as l,s as u,o as c,b as s,j as m,v as r,k as t,e,F as v,n as y}from"./index-124422fc.js";const E=e("label",null,"Economy Tier",-1),g=y('<optgroup label="T3"><option value="★★★ Economy">Advanced</option><option value="★★★ Economy">Affluent</option><option value="★★★ Economy">Booming</option><option value="★★★ Economy">Flourishing</option><option value="★★★ Economy">High Supply</option><option value="★★★ Economy">Opulent</option><option value="★★★ Economy">Prosperous</option><option value="★★★ Economy">Wealthy</option></optgroup><optgroup label="T2"><option value="★★ Economy">Adequate</option><option value="★★ Economy">Balanced</option><option value="★★ Economy">Comfortable</option><option value="★★ Economy">Developing</option><option value="★★ Economy">Medium Supply</option><option value="★★ Economy">Promising</option><option value="★★ Economy">Satisfactory</option><option value="★★ Economy">Sustainable</option></optgroup><optgroup label="T1"><option value="★ Economy">Declining</option><option value="★ Economy">Destitute</option><option value="★ Economy">Failing</option><option value="★ Economy">Fledgling</option><option value="★ Economy">Low Supply</option><option value="★ Economy">Struggling</option><option value="★ Economy">Unsuccessful</option><option value="★ Economy">Unpromising</option></optgroup><optgroup label="Pirate"><option value="{{BlackMarket}}">Black Market</option></optgroup><optgroup label="Abandoned"><option value="★ Economy (Abandoned)">Abandoned</option></optgroup>',5),d=[g],f=a({__name:"EconomySelect",setup(o){const n=l(),{economy:p}=u(n);return(o,n)=>(c(),s(v,null,[E,m(e("select",{id:"wealthInput","onUpdate:modelValue":n[0]||(n[0]=o=>t(p).value=o)},d,512),[[r,t(p).value]])],64))}});export{f as _};
