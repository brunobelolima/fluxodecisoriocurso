# Fluxo atualizado com alertas e classificação local

Envie o conteúdo desta pasta à raiz do repositório fluxodecisoriocurso. Mantenha index.html e assets/ na raiz. O código editável está em codigo-fonte/.

Alterações desta versão:
- Achados da dissertação visíveis como alertas de leitura, com citação autor-data e acesso à referência completa em ABNT.
- Removida a expressão “ou informe o endereço” junto ao botão de geolocalização. O campo de identificação do local foi mantido.
- Classificação local exibida automaticamente ao preencher download e upload, com escala do vermelho ao verde, sem depender da seleção de plataformas ou de clicar em Aplicar.
- Valores válidos usados automaticamente pelo planejamento, resumo e PDF. O endereço pode ficar sem preenchimento; nesse caso o local aparece como não identificado.
- Retirado o parágrafo indicado pelo usuário da última etapa, do resumo e do PDF.

A escala local compara os dados informados à referência de 4 Mbps de download e 2,5 Mbps de upload para um dispositivo em reunião com vídeo; é uma escala do fluxo, não uma classificação oficial SIMET. As exigências variam conforme os recursos usados. Foram mantidas a avaliação de adequação às plataformas e suas fontes.

O SIMET permanece incorporado. Os valores ainda são registrados manualmente, pois a importação automática não foi implementada. Uma alteração no endereço invalida os dados anteriores.

Verificação: TypeScript e Vite aprovados; geração de PDF aprovada; alertas inspecionados no navegador; preenchimento de 4 Mbps de download e 2,5 Mbps de upload gerou automaticamente Atende à referência. O teste de interface utilizou valores hipotéticos.

Não publicado no GitHub nesta entrega.
