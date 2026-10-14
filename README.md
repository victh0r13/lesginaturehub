# Le Signature Hub

Landing page do Le Signature Hub, espaço com consultórios por hora para profissionais da saúde no Edifício Le Quartier, em Águas Claras (Brasília).

Next.js 16, React 19, Tailwind CSS 4 e TypeScript. Página única e estática.

## Rodar no computador

```bash
npm install
npm run dev
```

O site abre em http://localhost:3001. Para testar a versão final: `npm run build` e depois `npm start`.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Contatos, endereço, descrições e preços | `src/lib/site.ts` |
| Layout das seções | `src/app/page.tsx` |
| Cores, fontes e animações | `src/app/globals.css` |
| Fotos | `public/images/` |
| Imagem de compartilhamento | `src/app/opengraph-image.jpg` (1200×630) |
