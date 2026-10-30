# Fluxo com Cloudflare e alertas condicionais

Envie o conteúdo desta pasta para a raiz do repositório fluxodecisoriocurso. Mantenha index.html e assets/ na raiz. Código editável em codigo-fonte/. Compilação: npm ci e npm run build.

## Alterações

- Alertas menores, em tom neutro, com conteúdo e referência ABNT recolhidos. Nenhum alerta é mostrado antes de uma resposta relevante.
- Avisos por falta de tempo protegido, mediação, telessaúde, suporte técnico ou conteúdo adequado. A participação de ACS isoladamente não dispara alerta. A banda abaixo das referências de vídeo só gera aviso quando recursos de vídeo foram escolhidos.
- Selecionar “Ainda não confirmado” não dispara alerta de divergência. O checklist continua registrando as pendências.
- GPS preenche estado e município após consulta reversa ao Nominatim/OpenStreetMap. A correspondência exige país Brasil, UF e nome compatíveis com a base municipal. Quando não há correspondência segura, permanecem os campos manuais. Coordenadas arredondadas a três casas decimais são enviadas ao serviço, apenas após clique do usuário.
- Motor oficial @cloudflare/speedtest 1.15.0 substitui o SIMET. A página externa bloqueia iframe; o motor executa na própria página e entrega os dados ao fluxo automaticamente.
- Download, upload, latência e jitter são apresentados. Perda de pacotes não é medida; não se atribui estabilidade prolongada a uma medição breve.
- Perfil integrado com até cerca de 45 MB de transferência e interrupção pelo usuário. Por limitar o volume, pode divergir do teste completo, especialmente em conexões muito rápidas. Há link para a página completa indicada pelo usuário e alternativa de registro manual.
- Classificação de banda do próprio fluxo mantida, sem atribuir a escala à Cloudflare ou ao AIM. Valores e origem do teste seguem para o resumo e o PDF.

## Verificação

TypeScript e Vite aprovados. Testes das condições dos alertas, associação município/UF, limites da classificação e geração de PDF aprovados. Um teste real Cloudflare concluiu no navegador da prévia, preenchendo os valores e a classificação. Esse resultado representa o ambiente de verificação, não a conexão do usuário. Consulta reversa com coordenadas públicas de Santos retornou Santos/SP. A permissão GPS de um dispositivo físico em HTTPS de produção ainda precisa ser conferida após publicação.

Geolocalização exige HTTPS e autorização do navegador. Nominatim e Cloudflare dependem da disponibilidade e das políticas dos serviços. Não foram inseridas chaves ou credenciais no site.

Não publicado no GitHub nesta entrega.

## Fontes técnicas

Cloudflare: https://github.com/cloudflare/speedtest
Nominatim: https://nominatim.org/release-docs/latest/api/Reverse/
OpenStreetMap: https://www.openstreetmap.org/copyright
