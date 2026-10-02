export type PdfSummary={territory:string;audience:string;goal:string;guidance:string;action:string;modality:string;production:string;connectivity:string;teaching:string[];conference:string[];rankingNote:string;pending:string[];requirements?:string[];pedagogicalPriority?:string};
export async function createSummaryPdf(s:PdfSummary){
 const {jsPDF}=await import('jspdf');
 const doc=new jsPDF({unit:'mm',format:'a4'});const margin=17,width=176;let y=20;
 const clean=(s:string)=>s.replace(/[→]/g,' para ').replace(/[≥]/g,'>=').replace(/[–—]/g,'-').replace(/×/g,'x');
 function text(value:string,size=10,bold=false,color:[number,number,number]=[25,23,45]){
  doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(...color);
  const lines=doc.splitTextToSize(clean(value),width) as string[];
  for(const line of lines){if(y>274){doc.addPage();y=20}doc.text(line,margin,y);y+=size*.43}y+=2;
 }
 function heading(value:string){y+=3;text(value,11,true,[75,75,197])}
 doc.setFillColor(248,189,9);doc.rect(margin,12,width,1.5,'F');
 text('PLANEJAR CP | CURSOS NO SUS',10,true,[75,75,197]);text('Resumo do plano de oferta',19,true);
 text(`${s.territory} | ${s.audience}`,10);text(`Gerado em ${new Date().toLocaleDateString('pt-BR')} | Objetivo: ${s.goal}`,9);
 heading('Orientação automática');text(s.guidance,12,true);text(s.action);
 text(`Modalidade: ${s.modality}`,10,true);text(`Produção: ${s.production}`);if(s.pedagogicalPriority)text(`Prioridade pedagógica: ${s.pedagogicalPriority}`,9);
 if(s.requirements?.length){heading('Requisitos selecionados');s.requirements.forEach(v=>text(v,9))}
 heading('Conectividade de referência');text(s.connectivity,9);
 heading('Plataformas sugeridas');text('Ensino',10,true);s.teaching.forEach(v=>text(v,9));text('Videoconferência',10,true);s.conference.forEach(v=>text(v,9));text(s.rankingNote,8);
 heading('Próximas providências');(s.pending.length?s.pending:['Analisar os resultados do piloto e acompanhar a oferta.']).forEach((v,i)=>text(`${i+1}. ${v}`,9));
 heading('Avaliação');text('Acompanhar inscritos, iniciantes e concluintes; conhecimento e autoeficácia pré/pós; satisfação, barreiras, tarefa aplicada e seguimento após o curso.',9);
 text('Fundamentação: dados oficiais da Anatel e achados de Lima (Unifesp, 2026). Orientação para planejamento; a referência municipal não substitui a validação da conexão local.',8);
 const pages=doc.getNumberOfPages();for(let i=1;i<=pages;i++){doc.setPage(i);doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(110,125,135);doc.text(`Planejar CP | ${i} / ${pages}`,margin,286)}
 return doc;
}
