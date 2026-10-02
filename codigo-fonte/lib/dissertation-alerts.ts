import type {TrailState} from './trail';
export function dissertationAlerts(v:TrailState,network:{measured:boolean;constrained:boolean}){
 const alerts:Record<string,string>={};
 if(v.time&&v.time!=='yes')alerts.participation='Tempo protegido não pactuado ou não confirmado.';
 if(v.pedagogy||(network.measured&&network.constrained))alerts.digital='Usabilidade e inclusão digital apareceram em 6 de 58 unidades de registro (10,34%), com relatos de acesso apenas pelo celular. Teste login, leitura, atividades e presença no aparelho; use arquivos leves. O estudo não quantificou o uso exclusivo de celular.';
 if(v.facilitation&&v.facilitation!=='yes')alerts.facilitation='Responsável por mediação e feedback não disponível ou não confirmado.';
 if(v.specialist&&v.specialist!=='yes')alerts.practice='Equipe e canal de telessaúde não disponíveis ou não confirmados.';
 if(v.acs==='yes')alerts.tracks='Aquisição de conhecimento pelos ACS: avaliar conhecimentos prévios e adaptar a linguagem da intervenção pedagógica, usando termos claros, explicação dos conceitos técnicos e exemplos do território. Adequar casos às atribuições dos ACS e usar quizzes com feedback. Na dissertação, o conhecimento melhorou discretamente no conjunto da amostra (Δ 0,09; p=0,032); a análise ajustada não demonstrou diferença no conhecimento pós-curso por categoria profissional. A diferença observada em relação aos ACS foi de autoeficácia, não de aquisição de conhecimento.';
 return alerts;
}
