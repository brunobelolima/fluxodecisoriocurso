type Municipality={id:string;name:string;uf:string};
const states:Record<string,string>={'acre':'AC','alagoas':'AL','amapa':'AP','amazonas':'AM','bahia':'BA','ceara':'CE','distrito federal':'DF','espirito santo':'ES','goias':'GO','maranhao':'MA','mato grosso':'MT','mato grosso do sul':'MS','minas gerais':'MG','para':'PA','paraiba':'PB','parana':'PR','pernambuco':'PE','piaui':'PI','rio de janeiro':'RJ','rio grande do norte':'RN','rio grande do sul':'RS','rondonia':'RO','roraima':'RR','santa catarina':'SC','sao paulo':'SP','sergipe':'SE','tocantins':'TO'};
export const normalizePlace=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/^municipio (de |do |da )?/,'').trim();
export function matchMunicipality(data:{address?:Record<string,string>;name?:string},list:Municipality[]){
 const a=data.address??{};if(a.country_code!=='br')return null;
 const uf=a['ISO3166-2-lvl4']?.replace('BR-','')||states[normalizePlace(a.state??'')];
 const names=[a.city,a.town,a.municipality,a.village,a.county,data.name].filter((s):s is string=>typeof s==='string'&&!!s).map(normalizePlace);
 const matches=list.filter(m=>m.uf===uf&&names.includes(normalizePlace(m.name)));return matches.length===1?matches[0]:null;
}
export async function resolveMunicipality(latitude:number,longitude:number,list:Municipality[]){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
 try{const query=new URLSearchParams({format:'jsonv2',lat:latitude.toFixed(3),lon:longitude.toFixed(3),zoom:'10',addressdetails:'1','accept-language':'pt-BR'});
 const response=await fetch(`https://nominatim.openstreetmap.org/reverse?${query}`,{signal:controller.signal,headers:{Accept:'application/json'},referrerPolicy:'strict-origin-when-cross-origin'});
 if(!response.ok)throw Error('Consulta indisponível');const match=matchMunicipality(await response.json(),list);if(!match)throw Error('Município não identificado sem ambiguidade');return match;
 }finally{clearTimeout(timer);}
}
