import type {TrailState} from './trail';
export function dissertationAlerts(v:TrailState,network:{measured:boolean;constrained:boolean}){
 const alerts:Record<string,string>={};
 if(v.time==='no')alerts.participation='Não há tempo protegido pactuado para participar do curso.';
 if(v.technicalSupport==='none'||(network.measured&&network.constrained&&!!v.meetingResources&&v.meetingResources!=='audio'))alerts.digital=v.technicalSupport==='none'?'Não há suporte técnico para dificuldades de acesso.':'A banda testada está abaixo das referências de vídeo comparadas.';
 if(v.facilitation==='no')alerts.facilitation='Não há responsável por mediação e feedback.';
 if(v.specialist==='no')alerts.practice='Não há equipe e canal de telessaúde para apoiar a aplicação prática.';
 if(['partial','no'].includes(v.content))alerts.tracks=v.acs==='yes'?'O conteúdo ainda precisa ser adequado ao público, incluindo as atribuições e a linguagem para ACS.':'O conteúdo disponível ainda não está adequado ao público e ao território.';
 return alerts;
}
