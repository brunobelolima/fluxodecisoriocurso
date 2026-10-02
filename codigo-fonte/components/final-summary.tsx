'use client';
import {requirementSummary} from '../lib/platform-requirements';
import type {TrailState} from '../lib/trail';
import type {Municipality} from '../lib/connectivity';
import {summaryRows,finalGuidance} from '../lib/course-summary';
import {courseDecision} from '../lib/course-decision';
import {rankPlatforms} from '../lib/platform-compatibility';
import {createSummaryPdf,type PdfSummary} from '../lib/summary-pdf';
import {CheckCircle2,Download} from 'lucide-react';
import {useEffect,useRef,useState} from 'react';
type Props={values:TrailState;data:{municipality:Municipality;mode:string;retrieved:string}|null;plan:ReturnType<typeof courseDecision>;production:string;pending:string[]};
const num=(v:number|null)=>v===null?'Sem dado':v.toLocaleString('pt-BR',{maximumFractionDigits:1});
export default function FinalSummary({values,data,plan,production,pending}:Props){
 const summary=summaryRows(values,data?.municipality??null),guidance=finalGuidance(values,plan.modality,production,pending),ranking=rankPlatforms(values),target=useRef<HTMLElement>(null);
 const [downloading,setDownloading]=useState(false),[error,setError]=useState('');
 useEffect(()=>{target.current?.focus();target.current?.scrollIntoView({block:'start',behavior:'smooth'})},[]);
 const teaching=[ranking.teachingSuggestion?`${ranking.teachingSuggestion.platform} · ${ranking.teachingReason}`:'Sugestão de ensino pendente: confirmar requisitos.'];
 const conference=[ranking.conferenceSuggestion?`${ranking.conferenceSuggestion.platform} · ${ranking.conferenceReason}`:'Sugestão de videoconferência pendente: confirmar requisitos e acesso.'];
 const rankingNote=`Videoconferência: ${ranking.mode==='audio'?'somente áudio':'vídeo'}. Sugestões baseadas nos requisitos informados, estrutura existente e referência municipal de banda. Confirmar recursos, serviço e conexão local antes da oferta.`;
 const connectivity=ranking.measured?`Anatel · internet móvel: download médio ${values.download} Mbps; upload médio ${values.upload} Mbps. Referência ${values.measurementDate}. Validar a conexão local.`:'Medições municipais não utilizadas ou indisponíveis.';
 const pdf:PdfSummary={territory:summary.territory,audience:summary.audience,goal:summary.goal,guidance:guidance.title,action:guidance.action,modality:plan.modality,production,connectivity,teaching,conference,rankingNote,pending,pedagogicalPriority:plan.actions[3].action,requirements:requirementSummary(values).map(([k,v])=>`${k}: ${v}`)};
 async function download(){setDownloading(true);setError('');try{const doc=await createSummaryPdf(pdf);doc.save(`Plano_CP_${values.id||'municipio-pendente'}.pdf`)}catch{setError('Não foi possível gerar o PDF. Tente novamente.')}finally{setDownloading(false)}}
 return <section className="final-summary summary-compact" ref={target} tabIndex={-1} aria-labelledby="summary-title"><div className="summary-heading"><CheckCircle2 size={24}/><div><span className="eyebrow">TRILHA CONCLUÍDA</span><h2 id="summary-title">Resumo do plano</h2><p>{summary.territory} · {summary.audience}</p></div><button type="button" className="pdf-download" onClick={download} disabled={downloading}><Download size={17}/>{downloading?'Gerando…':'Baixar PDF'}</button></div>{error&&<p role="alert" className="error">{error}</p>}
 <div className="summary-guidance"><b>{guidance.title}</b><p>{guidance.action}</p></div><dl className="summary-conditions"><div><dt>Objetivo</dt><dd>{summary.goal}</dd></div><div><dt>Modalidade</dt><dd>{plan.modality}</dd></div><div><dt>Produção</dt><dd>{production}</dd></div><div><dt>Prioridade pedagógica</dt><dd>{plan.actions[3].action}</dd></div></dl>
 <div className="summary-rankings"><div><h3>Plataforma sugerida de ensino</h3><ol>{teaching.map(t=><li key={t}>{t}</li>)}</ol></div><div><h3>Plataforma sugerida de videoconferência · {ranking.mode==='audio'?'áudio':'vídeo'}</h3><ol>{conference.map(t=><li key={t}>{t}</li>)}</ol></div></div><p className="small">Plataformas sugeridas conforme requisitos informados; validar a conexão local e os planos. Critérios e fontes disponíveis nas etapas anteriores.</p>
 <div className="summary-next"><h3>Próximas providências{pending.length?` · ${pending.length}`:''}</h3>{pending.length?<ul>{pending.map(p=><li key={p}>{p}</li>)}</ul>:<p>Analisar os resultados do piloto e acompanhar a oferta.</p>}</div>
 <details className="summary-details"><summary>Ver respostas e fundamentação</summary><p>{plan.rationale}</p><dl className="summary-conditions">{summary.rows.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="small">{connectivity}</p><p className="small">{rankingNote}</p><p className="small">Avaliação: participação, conclusão, conhecimento e autoeficácia pré/pós, satisfação, barreiras e aplicação no serviço.</p><p className="small">Fundamentação: dados oficiais da Anatel e achados de Lima (Unifesp, 2026). Recomendações para planejamento.</p></details><p className="small summary-note">Baixe o PDF para guardar o plano. As respostas serão apagadas ao recarregar a página.</p></section>;
}
