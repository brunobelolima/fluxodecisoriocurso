# Atualização do fluxo com SIMET incorporado

## Publicação no GitHub Pages

Envie o conteúdo desta pasta para a raiz do repositório fluxodecisoriocurso, substituindo os arquivos anteriores. Mantenha index.html e assets/ na raiz. O código editável está em codigo-fonte/. Compilação: npm ci e npm run build.

## O que mudou

- Retirada a classificação da conectividade municipal. Os dados brutos municipais ficam recolhidos e não determinam a adequação local.
- Painel único de teste: identificação por endereço/nome de unidade ou geolocalização solicitada ao navegador.
- SIMET oficial incorporado na própria página, carregado somente ao clicar. Sua interface carregou na verificação visual realizada nesta entrega.
- Resultados registrados pelo usuário são aplicados às sugestões, ao resumo e ao PDF. Trocar o local apaga os resultados anteriores para evitar atribuição à rede errada.
- Orientações pedagógicas e prévia das plataformas recolhidas. Removidas repetições de título, alertas, modalidade e instruções do resumo.

## Integração automática pendente

A incorporação do teste não equivale à integração automática de dados. Não foi localizada uma interface pública documentada de incorporação com retorno de resultados ao domínio do fluxograma. Não foi implementada leitura do conteúdo interno do SIMET, interceptação de tráfego, acesso a bancos privados ou um protocolo postMessage presumido. O formulário informa explicitamente que download e upload ainda devem ser copiados do teste.

Para concluir a importação automática seria necessária uma interface documentada e disponibilizada pelo responsável pelo SIMET, com retorno de resultados, política de origens e eventuais credenciais. Não se deve expor credenciais em um site estático GitHub Pages.

O endereço informado e as coordenadas identificam o ponto apenas no plano local. Não são enviados ao SIMET por este formulário e não permitem medir remotamente a conexão de um endereço. A medição deve ser iniciada no dispositivo conectado à rede de interesse. A geolocalização exige HTTPS e autorização do navegador, sem substituir a medição.

O SIMET é um serviço externo: pode apresentar termos, solicitar permissões e alterar suas regras de incorporação. Se o navegador ou o serviço impedir o painel, existe uma alternativa em outra aba, recolhida em “O teste não carregou?”. Não se garante medição incorporada em todos os navegadores ou redes.

## Verificação

- TypeScript e compilação Vite aprovados.
- Interface do SIMET carregada no painel incorporado da prévia.
- Testados endereço, registro de valores com vírgula decimal, aplicação ao planejamento e invalidação após mudança de local.
- Verificada a alternativa de endereço quando GPS não está disponível em contexto HTTP.
- Regressão das recomendações para objetivos múltiplos, conexão insuficiente e geração de PDF aprovada.
- Não foi executada uma medição real de velocidade nem validado o GPS em um dispositivo físico ou em domínio HTTPS de produção.
- Não publicado no GitHub nesta entrega.
