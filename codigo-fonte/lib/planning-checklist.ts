import type {TrailState} from './trail';
export type ChecklistItem={label:string;done:boolean};
export function planningChecklist(v:TrailState,hasMunicipality:boolean,live:boolean):ChecklistItem[]{
 const items:ChecklistItem[]=[
 {label:'Definir público e objetivo do curso',done:!!v.audience&&!!v.goal},
 {label:'Identificar o município e consultar os indicadores de conectividade',done:hasMunicipality},
 {label:'Pactuar tempo protegido na jornada de trabalho',done:v.time==='yes'},
 {label:'Disponibilizar conteúdo adequado ao público e ao território',done:v.content==='yes'},
 {label:'Garantir equipe de CP, pedagogia, TI e administração',done:v.team==='full'},
 {label:'Disponibilizar plataforma de ensino, hospedagem e suporte',done:v.lms==='yes'},
 {label:'Definir suporte técnico',done:!!v.technicalSupport&&!['none','unknown'].includes(v.technicalSupport)},
 {label:'Designar responsável pelo acompanhamento e feedback',done:v.facilitation==='yes'},
 {label:'Pactuar equipe e canal de apoio por telessaúde',done:v.specialist==='yes'},
 {label:'Definir certificação e critérios de conclusão',done:v.certification==='yes'},
 {label:v.pilot==='adjust'?'Corrigir dificuldades e repetir o piloto':'Executar o piloto e validar acesso e plataformas',done:v.pilot==='done'}];
 if(live&&['teams','meet','zoom','webex','bbb'].includes(v.conferenceExisting))items.splice(7,0,{label:'Verificar licença para turma, encontros e recursos necessários',done:v.licenseFit==='yes'});
 return items;
}
