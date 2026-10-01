"use strict";
const form=document.getElementById("courseForm"),result=document.getElementById("result");
const put=(id,text)=>document.getElementById(id).textContent=text;
form.addEventListener("submit",event=>{
 event.preventDefault();
 const read=id=>document.getElementById(id).value;
 const need=read("need"),audience=read("audience"),level=read("level"),barrier=read("barrier"),cases=read("cases");
 const goals=[...form.querySelectorAll('[name="outcome"]:checked')].map(el=>el.value);
 if(!goals.length){put("error","Selecione pelo menos um resultado prioritário.");form.querySelector('[name="outcome"]').focus();return;}put("error","");
 const management=audience==="managers";
 const profession=read("profession"),experience=read("experience"),context=read("context"),workload=read("workload");
 const professionLabel=document.getElementById("profession").selectedOptions[0].textContent.split(" — ")[0];
 const a=level==="low"?"Fundamentos de CP, identificação de necessidades, avaliação multidimensional, comunicação, ética e planejamento do cuidado.":level==="mixed"?"Avaliação diagnóstica e núcleo comum nivelador, com percursos diferenciados por lacunas.":"Revisão dirigida pelas lacunas identificadas; formação prévia não comprova competência avançada. Selecionar a complexidade após avaliação diagnóstica.";
 const b=management?"Competências compartilhadas com as equipes: comunicação, colaboração, coordenação do cuidado e compreensão das necessidades de pacientes e famílias.":"Comunicação, trabalho interprofissional, planejamento do cuidado e coordenação. Selecionar competências compartilhadas entre os grupos profissionais participantes.";
 let c=management?"Planejamento e implementação da rede, indicadores, qualidade, acesso e educação permanente.":audience==="specific"?"Aprofundamento das competências da categoria selecionada, respeitando suas atribuições e limites de atuação.":"Trilhas diferenciadas por categoria profissional; incluir trilha de gestão quando houver gestores.";
 if(!management&&profession!=="all")c+=" Categoria escolhida: "+professionLabel+". Adaptar linguagem e atividades ao escopo da categoria; a dissertação não valida uma lista de competências exclusivas.";
 if(profession==="reception"&&!management)c+=" Priorizar acolhimento, orientação de acesso e comunicação com a equipe, sem atribuir avaliação clínica.";
 const d=management||cases==="manager"?"Atividade com dados gerenciais de CP e discussão da implementação da PNCP, conforme o percurso de gestores do curso.":audience==="mixed"||cases==="dual"?"Dois percursos: assistência com triagem, SPICT-Br, registro e teleconsultoria; gestão com dados gerenciais e discussão da PNCP.":cases==="yes"?"Triagem, aplicação do SPICT-Br, registro de abordagem paliativa e discussão com especialistas em teleconsultoria; preservar dados identificáveis.":cases==="limited"?"Casos contextualizados, telementoria e aplicação supervisionada quando possível.":"Casos simulados progressivos, discussão estruturada e plano de transferência para a prática.";
 const target=document.getElementById("modules");target.replaceChildren();
 [["A · Núcleo comum",a],["B · Competências compartilhadas",b],["C · Núcleo profissional",c],["D · Aplicação e telessaúde",d]].forEach(([title,text])=>{const card=document.createElement("article");card.className="module";const h=document.createElement("h3"),p=document.createElement("p");h.textContent=title;p.textContent=text;card.append(h,p);target.append(card);});
 let ped="Orientação andragógica, problematização e aprendizagem experiencial: conteúdos breves, casos, reflexão e feedback.";
 if(need==="basic")ped+=" Progredir dos fundamentos para situações mais complexas.";
 if(need==="gap")ped+=" Mapear lacunas e alinhar cada atividade a um objetivo observável.";
 if(goals.includes("knowledge"))ped+=" Usar recuperação espaçada e quizzes com feedback.";
 if(goals.includes("performance"))ped+=" Incluir simulação e avaliação de desempenho com critérios explícitos — proposta para a próxima oferta.";
 if(need==="practice"||goals.includes("practice"))ped+=" Priorizar decisões e planos aplicáveis ao serviço.";put("pedagogy",ped);
 let tele=management||cases==="manager"?"Organizar atividade com dados gerenciais e discussão síncrona da PNCP.":audience==="mixed"||cases==="dual"?"Combinar teleconsultoria de casos assistenciais com discussão gerencial da PNCP, em percursos próprios.":cases==="yes"?"Combinar teleducação, discussão de casos e teleconsultoria para problemas assistenciais reais, com retorno sobre a aplicação.":"Combinar teleducação síncrona e assíncrona com telementoria e discussão estruturada de casos.";
 if(need==="network"||goals.includes("service"))tele+=" Manter encontros recorrentes e comunidade de prática para apoiar a rede.";put("telehealth",tele);
 let fmt=barrier==="time"||barrier==="both"?"Microblocos assíncronos e encontros síncronos curtos, com percurso flexível.":"Atividades assíncronas, avaliações formativas e encontros síncronos.";
 if(barrier==="digital"||barrier==="both")fmt+=" Oferecer materiais leves para celular, download e suporte inicial.";
 if(barrier==="space"||barrier==="both")fmt+=" Pactuar espaços e oportunidades de formação com o serviço.";
 if(barrier==="local"||context!=="aps")fmt+=" Contextualizar casos e fluxos à realidade local e ao ponto da rede.";
 if(barrier==="unknown")fmt+=" Diagnosticar barreiras antes da oferta.";
 if(experience==="no")ped+=" Usar casos introdutórios e apoio à primeira aplicação.";
 else if(experience==="yes")ped+=" Incorporar experiências e casos trazidos pelos participantes sem dispensar avaliação diagnóstica.";
 put("pedagogy",ped);
 fmt+=workload==="original"?" Referência histórica: 40 h (22 h teóricas, 1 h prática e 17 h estudo).":workload==="pediatric"?" Referência histórica: 40 h + 10 h opcionais de pediatria.":" Redistribuir a carga pelo diagnóstico; não há carga alternativa validada neste estudo.";
 fmt+=" Estimar a carga horária pela soma das atividades necessárias a cada competência, incluindo estudo e aplicação.";put("format",fmt);
 let ev="Acompanhar participação, conclusão, satisfação e experiência qualitativa.";
 if(goals.includes("knowledge"))ev+=" Avaliar conhecimento antes e após o curso e, quando viável, sua manutenção posterior.";
 if(goals.includes("skill"))ev+=" Medir autoeficácia antes e após, como confiança autorreferida, utilizando instrumento pertinente ao público.";
 if(goals.includes("performance"))ev+=" Avaliar desempenho em casos com rubrica — componente proposto para nova oferta.";
 if(goals.includes("practice")||need==="practice")ev+=" Planejar seguimento em 60–90 dias para verificar transferência para a prática.";
 if(goals.includes("service")||need==="network")ev+=" Monitorar indicadores de processo e implementação definidos no diagnóstico.";put("assessment",ev);

 const materials=read("materials"),pilot=read("pilot"),support=read("support"),platform=read("platform"),followup=read("followup");
 const analysis="Confirmar necessidades com participantes e serviços, mapear competências e recursos e distinguir lacunas educacionais de problemas de organização do trabalho. Entrega: diagnóstico documentado e prioridades pactuadas.";
 const design="Definir objetivos observáveis e alinhar competências, atividades e critérios de avaliação. Organizar módulos A–D e estimar a carga horária. Entrega: matriz curricular e plano de avaliação. "+ped;
 let development=materials==="new"?"Produzir roteiros, conteúdos, casos, quizzes e rubricas.":materials==="adapt"?"Revisar materiais existentes e adaptar linguagem, casos, escopo profissional e contexto assistencial.":"Verificar alinhamento dos materiais revisados aos objetivos e critérios de avaliação.";
 development+=" Testar acessibilidade, uso no celular e funcionamento das atividades. "+(pilot==="yes"?"Realizar piloto com participantes representativos e revisar pelos resultados.":"Fazer teste reduzido de navegação e atividades com representantes do público antes da oferta.")+" Entrega: materiais e ambiente testados.";
 let implementation="Definir cronograma, responsáveis, comunicação com participantes, acolhimento digital e fluxo de teleconsultoria. "+tele+" "+fmt;
 implementation+=support==="yes"?" Preparar tutores e combinar rotinas de suporte.":support==="limited"?"Dimensionar turmas e encontros pela capacidade de tutoria; prever prazos de resposta.":"Definir responsáveis por tutoria e suporte antes de abrir inscrições.";
 implementation+=platform==="ava"?" Configurar e testar o ambiente virtual e a videoconferência.":platform==="simple"?"Organizar materiais e entregas em canais acessíveis; testar acompanhamento e registro das atividades.":" Selecionar e testar a infraestrutura antes da oferta.";
 implementation+=" Entrega: plano operacional de oferta.";
 let evaluation="Avaliação formativa: revisar objetivos, materiais e atividades em cada fase. Avaliação final: "+ev;
 if(followup==="no"&&(goals.includes("practice")||goals.includes("service")||need==="practice"||need==="network"))evaluation+=" O acompanhamento posterior ainda não está disponível: pactuar uma estratégia antes de prometer medir mudança da prática ou do serviço. Desempenho em casos não demonstra, por si só, transferência.";
 evaluation+=" Entrega: relatório com resultados, limites e decisões de revisão.";
 const plan=document.getElementById("addiePlan");plan.replaceChildren();
 [["1 · Análise",analysis],["2 · Design",design],["3 · Desenvolvimento",development],["4 · Implementação",implementation],["5 · Avaliação",evaluation]].forEach(([title,text])=>{const article=document.createElement("article");article.className="panel";const h=document.createElement("h3"),paragraph=document.createElement("p");h.textContent=title;paragraph.textContent=text;article.append(h,paragraph);
 const grounding={
 "1 · Análise":"Base: 67,80% sem formação prévia e público multiprofissional. Referência: Knowles, Holton e Swanson (2015). Usar diagnóstico individual para definir o percurso.",
 "2 · Design":"Base: conhecimento Δ 0,09 e autoeficácia Δ 0,28. Referências: Freire (1996), Kolb (1984, edição listada) e Dennick (2016). Proposta: ligar conteúdo, experiência, reflexão e aplicação, com objetivos observáveis.",
 "3 · Desenvolvimento":"Base: 6 UR sobre usabilidade e inclusão digital. Referência: Machado et al. (2026). Proposta: materiais leves, teste no celular, revisão de linguagem e piloto.",
 "4 · Implementação":"Base: conclusão de 102/288 iniciantes e valorização da mediação docente (16 UR). Referência: Mackin et al. (2024), sobre ECHO. Proposta: tutoria e discussão recorrente de casos; não atribuir isoladamente os ganhos à teleconsultoria.",
 "5 · Avaliação":"Base: BPW-BR e ausência de seguimento e desfechos assistenciais. Referências: Libardi, Luiz e Gutierrez (2024); Pelayo-Alvarez et al. (2013). Proposta: complementar autorrelato com desempenho e acompanhamento. A confiabilidade do domínio de conhecimento e a pertinência dos itens ao público exigem atenção; não usar o escore como único critério de competência."
 };const evidence=document.createElement("p");evidence.className="grounding";evidence.textContent=grounding[title];article.append(evidence);plan.append(article);});
 if(followup==="no")put("assessment",evaluation);
 result.hidden=false;result.focus();result.scrollIntoView({behavior:"smooth",block:"start"});
});
form.addEventListener("reset",()=>{result.hidden=true;put("error","");});
document.getElementById("print").addEventListener("click",()=>window.print());

document.getElementById("baseline").addEventListener("click",()=>{
 form.reset();
 document.getElementById("need").value="basic";
 document.getElementById("materials").value="adapt";
 document.getElementById("experience").value="mixed";
 document.getElementById("cases").value="dual";
 document.getElementById("audience").value="multi";
 document.getElementById("level").value="mixed";
 document.getElementById("barrier").value="digital";
 document.getElementById("cases").value="dual";
 document.getElementById("audience").value="mixed";
 document.getElementById("followup").value="no";
 put("baseline-status","Perfil inspirado no estudo: assistência e gestão, formação e experiências heterogêneas, barreiras digitais e atividades práticas distintas. Recursos, tutoria e piloto permanecem escolhas de planejamento; confira-os antes de gerar. A ausência de seguimento reproduz a limitação da avaliação original.");
});
