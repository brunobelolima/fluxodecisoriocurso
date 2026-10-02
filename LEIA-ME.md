# Publicação direta no GitHub Pages

Esta pasta contém o site compilado na raiz. O código editável está em `codigo-fonte/`.

1. Extraia o ZIP.
2. Envie o CONTEÚDO de Teleducacao_CP para a raiz do repositório: index.html, assets/, logos, favicon.svg, .nojekyll e codigo-fonte/. Não envie apenas o ZIP nem coloque Teleducacao_CP como pasta dentro do repositório.
3. Se houver um workflow anterior de compilação em .github/workflows/pages.yml, remova-o para usar esta publicação direta.
4. Em Settings → Pages → Build and deployment → Source, selecione Deploy from a branch.
5. Selecione main e /(root), depois Save.
6. Aguarde a publicação terminar e abra o endereço informado em Pages.

Preserve toda a pasta assets/; não renomeie seus arquivos. Alterações no código-fonte precisam ser recompiladas com npm ci e npm run build dentro de codigo-fonte/. Substitua então os arquivos publicados pelo conteúdo de dist/.
