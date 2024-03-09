<div align="center">

# IDLEGLANCE-AI

![license-info](https://img.shields.io/github/license/Ashu11-A/IDLEGLANCE-AI?logo=gnu&style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![stars-info](https://img.shields.io/github/stars/Ashu11-A/IDLEGLANCE-AI?colorA=302D41&colorB=f9e2af&style=for-the-badge)

![Last-Comitt](https://img.shields.io/github/last-commit/Ashu11-A/IDLEGLANCE-AI?style=for-the-badge&colorA=302D41&colorB=b4befe)
![Comitts Year](https://img.shields.io/github/commit-activity/y/Ashu11-A/IDLEGLANCE-AI?style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![reposize-info](https://img.shields.io/github/repo-size/Ashu11-A/IDLEGLANCE-AI?style=for-the-badge&colorA=302D41&colorB=90dceb)

</div>

*Você gosta muito de algo? Pois eh, eu também;*

### Requirements
- Node >= 21
- Python >= 3.7

### Dependências:
- nextjs
- next-video
- next-auth
- react-query
- youtube-dl-exec
- FFMPEG
- Tensorflow or Pytorch [python]

### UI:
#### Dependências
- shacfn/ui
- radix ui
- nextui
- MUI
#### Sumary
Será parecido como uma homepage de Netflix/YouTube entre outros, terá uma contagem regressiva para o próximo vídeo, com base nos últimos 360 dias, e com animações para os últimos 10 segundos ;)

Os vídeos serão catálogos com as coisas ditas abaixo, cada vídeo será processado individualmente, numa fila não assíncrona.
As páginas dos vídeos terão uma UI clean e intuitiva, onde será possível baixar a legenda da música, baixar o vídeo ou a música, links de referência para Spotify, autor da música...

- [ ] Modo escuro/claro
- [ ] Perfil do usuário
- [ ] Páginas individuais para os vídeos
- [ ] configurações (Qualidade, Linguagem, etc...)

### Funcionalidades
- [ ] Baixar vídeos do YouTube (Os usuários poderão baixar o vídeo, mas diretamente do YouTube)
- [ ] Processamento dos vídeos [OCR - AI - Metadata] (O vídeo será baixado do YouTube para poder ser processado localmente, nenhum vídeo será salvo após o processamento! Apenas seus metadados)
- [ ] Usuário terá como curtir ou não o vídeo, para poder classificar seus gostos

### Score
#### Dependências
- compute-cosine-similarity
#### Collected data
- Like
- View Count
- Tempo de visualização
#### Sumary
- [ ] Cada vídeo terá um score de afinidade com o usuário, assim podendo ter uma melhor experiência com os recomendados

### API
#### Dependências
- FastAPI (python)
- Nestjs (javascript)
- @nestjs/bull (javascript)
- redis
#### Database
- GraphQL
- Prisma
#### Sumary
Maior parte de integração com IA será feito com Python, mas a parte visual será React (Javascript), então para a comunicação com o python, será feito uma API geral

### Detecção:
- [ ] Língua do áudio (pela timeline, certas músicas tem diferentes linguagens ao decorrer da música)
- [ ] Anime or Real life
- [ ] Personagens, e personagens principais representados (Banco de imagens)

### Subtitle
#### Dependências
- OCR
- IA
#### Sumary
- [ ] Fonte da legenda (OCR/IA)
- [ ] Transcrição da legenda por OCR, e criação de timeline (descrição já contém a legenda alguma das vezes)

### Home
#### Catálogo por
- [ ] Thumbnail semelhantes (IA)
- [ ] Nome do vídeo
- [ ] Autor da música
- [ ] Editor (Description or IA)
- [ ] Tags
- [ ] Estilo de edição (IA)
- [ ] Estilo de música (IA)
- [ ] Animes usados, anime representado (Banco de imagens), (Possível erro por uso de filtro na edição)


### Timeline:
- [ ] Animes usados, seus nomes, episódios e time do anime.

Contagem de:
- [ ] Transições
- [ ] Cortes
- [ ] Telas pretas
- [ ] Blur
- [ ] Efeitos conhecidos
- [ ] Aproximações e afastamentos

### Referências:

Queue:
https://medium.com/yavar/nestjs-queues-c8040ca61b79

YouTube API:
https://developers.google.com/youtube
https://github.com/LuanRT/YouTube.js

Timeline: https://github.com/xzdarcy/react-timeline-editor

Search Anime:
https://github.com/soruly/trace.moe

Detect anime:
https://github.com/hysts/anime-face-detector

Transcription OCR:
 https://github.com/naptha/tesseract.js
 https://github.com/JaidedAI/EasyOCR

Detect Language:
https://github.com/wooorm/franc
https://github.com/JohnSnowLabs/spark-nlp

Similar Image:
https://github.com/tomasrasymas/simimg
https://github.com/visual-layer/fastdup
https://github.com/shibing624/similarities
https://github.com/adumrewal/SIFTImageSimilarity

Similar song:
https://github.com/itsbrunodev/similar-songs
https://github.com/iammordaty/assistant-web

Detect typography:
https://github.com/prnvdixit/Pyfont
https://github.com/robinreni96/Font_Recognition-DeepFont
https://github.com/frobertpixto/font-from-image
https://github.com/lkmidas/Font-Detection
https://github.com/JeffersonQin/YuzuMarker.FontDetection
