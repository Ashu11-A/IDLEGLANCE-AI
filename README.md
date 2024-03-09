# IDLEGLANCE-AI

Você gosta muito de algo? Pois eh, eu também;

Dependências:
- youtube-dl
- FFMPEG
- Nextjs
- Next-video
- Prisma or Nestjs 
- Tensorflow or Pytorch [python]

UI:
Será parecido como uma homepage de Netflix/YouTube entre outros, terá uma contagem regressiva para o próximo vídeo, com base nos últimos 360 dias, e com animações para os últimos 10 segundos ;).
Os vídeos serão catálogos com as coisas ditas abaixo, cada vídeo será processado individualmente, numa fila não assíncrona.

- shacfn/ui
- radix ui
- nextui

Baixar vídeos do YouTube (o vídeo será baixado do YouTube para poder ser processado localmente, os usuários tbm poderão baixar o vídeo, mas diretamente do YouTube, nenhum arquivo será salvo após o processamento!)

Cada vídeo terá um score de afinidade que os usuários poderiam dar, assim podendo ter uma melhor experiência com os recomendados

Transcrição da legenda por OCR, e criação de timeline (descrição já contém a legenda alguma das vezes)

Detecção:
- Língua do áudio (pela timeline, certas músicas tem diferentes linguagens ao decorrer da música)
- Fonte da legenda (OCR/IA)
- Personagens, e personagens principais representados (Banco de imagens)

Home:
Catálogo por:
- Thumbnail semelhantes (IA)
- Nome do vídeo
- Author da música
- Editor (Description or IA)
- Tags
- Estilo de edição (IA)
- Estilo de música
- Animes usados, anime representado (Banco de imagens), (Possível erro por uso de filtro na edição)


Timeline:
Animes usados, seus nomes, episódios e time do anime.
Contagem de:
- Transições
- Cortes
- Telas pretas
- Blur
- Efeitos conhecidos
- Aproximações e afastamentos
