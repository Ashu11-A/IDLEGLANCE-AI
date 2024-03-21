<div align="center">

# IDLEGLANCE-AI

![license-info](https://img.shields.io/github/license/Ashu11-A/IDLEGLANCE-AI?logo=mit&style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![stars-info](https://img.shields.io/github/stars/Ashu11-A/IDLEGLANCE-AI?colorA=302D41&colorB=f9e2af&style=for-the-badge)

![Last-Comitt](https://img.shields.io/github/last-commit/Ashu11-A/IDLEGLANCE-AI?style=for-the-badge&colorA=302D41&colorB=b4befe)
![Comitts Year](https://img.shields.io/github/commit-activity/y/Ashu11-A/IDLEGLANCE-AI?style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![reposize-info](https://img.shields.io/github/repo-size/Ashu11-A/IDLEGLANCE-AI?style=for-the-badge&colorA=302D41&colorB=90dceb)

*Um projeto que visa criar uma plataforma similar a Netflix/YouTube para conteúdos específicos, com foco em funcionalidades avançadas de IA e personalização.*

</div>

Procurando a documentação da API? [veja aqui](https://github.com/Ashu11-A/IDLEGLANCE-AI/blob/main/api/README.md)

### Processamento de Vídeos
- [ ] Baixar vídeos do YouTube (Os usuários poderão baixar o vídeo, mas diretamente do YouTube)
- [ ] Processamento local dos vídeos (OCR - AI - Metadata) (Nenhum vídeo será salvo após o processamento! Apenas seus metadados)
- [ ] Curtida/descurtida de vídeos para classificação.
- [ ] Upscale de thumbnails para 4k

### Score de Afinidade
#### Collected data
- [ ] Like
- [ ] View Count
- [ ] Tempo de visualização
- [ ] Thumbnail
#### Sumary
- [ ] Cálculo de similaridade entre vídeos e usuário
- [ ] Consideração de curtidas, visualizações, tempo de visualização, thumbnails
- [ ] Recomendações personalizadas

### API
#### Dependências
- [ ] FastAPI (python)
- [x] Nestjs (javascript)
- [ ] @nestjs/bull (javascript)
- [ ] Redis
#### Database
- GraphQL
- Prisma
#### Sumary
- [x] Banco de dados GraphQL/Rest com Prisma
- [x] Tabela de: Usuários, Vídeos...
- [ ] Integração com Python para IA

### Detecção
- [ ] Língua do áudio (com reconhecimento de mudanças ao longo da música)
- [ ] Tipo de conteúdo (Anime or Real life)
- [ ] Personagens, e personagens principais representados (Banco de imagens)

### Legendas
- [ ] Fonte da legenda (OCR/IA)
- [ ] Extração de legendas por OCR e IA

### UI:
#### Dependências
- [x] Tailwindcss
- [ ] shacfn/ui
- [ ] radix ui
- [ ] MUI
#### Sumary
Será parecido como uma homepage de Netflix/YouTube entre outros, terá uma contagem regressiva para o próximo vídeo, com base nos últimos 360 dias, e com animações para os últimos 10 segundos ;)

Os vídeos serão catálogos com as coisas ditas abaixo, cada vídeo será processado individualmente, numa fila não assíncrona.
As páginas dos vídeos terão uma UI clean e intuitiva, onde será possível baixar a legenda da música, baixar o vídeo ou a música, links de referência para Spotify, autor da música...

- [x] Modo escuro/claro
- [ ] Perfil do usuário
- [x] Páginas individuais para os vídeos
- [ ] Configurações (Qualidade, Linguagem, etc...)
- [ ] Criação de timeline

### Home
#### Catálogo por diversos critérios
- [ ] Thumbnail semelhantes (IA)
- [ ] Nome do vídeo
- [ ] Autor da música
- [ ] Editor (Description or IA)
- [ ] Tags
- [ ] Estilo de edição (IA)
- [ ] Estilo de música (IA)
- [ ] Animes usados, anime representado (Banco de imagens), (Possível erro por uso de filtro na edição)


### Timeline:
- [ ] Identificação de animes usados, seus nomes, episódios e tempo no anime
Contagem de:
- [ ] Transições
- [ ] Cortes
- [ ] Telas pretas
- [ ] Blur
- [ ] Efeitos conhecidos
- [ ] Aproximações e afastamentos

### Requirements
- Node >= 21
- Python >= 3.7

### Dependências:
- nextjs
- next-video
- next-auth
- next-themes
- youtube-dl-exec
- FFMPEG
- python-shell
- Tensorflow or Pytorch [python]
- React Hook Form
#### Test
- JestJS
- React Testing Library
- Cypress
#### Animation
- Framer Motion
#### Charts
- Recharts
- React Chartjs 2
#### Cache
- Zustand
- Context API
- React Query

### Referências:

#### Upscale:
https://github.com/upscayl/upscayl-ncnn

#### Queue:
https://medium.com/yavar/nestjs-queues-c8040ca61b79

#### YouTube API:
https://developers.google.com/youtube
https://github.com/LuanRT/YouTube.js

#### Timeline: https://github.com/xzdarcy/react-timeline-editor

#### Search Anime:
https://github.com/soruly/trace.moe

#### Detect anime:
https://github.com/hysts/anime-face-detector
https://huggingface.co/antonioglass/real-or-anime-age

#### Detect gender anime:
https://huggingface.co/DOFOFFICIAL/animeGender-dvgg-0.7

#### Transcription OCR:
 https://github.com/naptha/tesseract.js
 https://github.com/JaidedAI/EasyOCR

#### Detect Language:
https://github.com/wooorm/franc
https://github.com/JohnSnowLabs/spark-nlp
https://huggingface.co/speechbrain/lang-id-voxlingua107-ecapa

#### Detect type song:
https://huggingface.co/ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition

#### Segmentation song:
https://huggingface.co/pyannote/segmentation
https://huggingface.co/pyannote/speaker-diarization-3.1

#### Similar Text:
https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2

#### Similar Image:
https://github.com/tomasrasymas/simimg
https://github.com/visual-layer/fastdup
https://github.com/shibing624/similarities
https://github.com/adumrewal/SIFTImageSimilarity

#### Similar song:
https://github.com/itsbrunodev/similar-songs
https://github.com/iammordaty/assistant-web

#### Detect typography:
https://github.com/prnvdixit/Pyfont
https://github.com/robinreni96/Font_Recognition-DeepFont
https://github.com/frobertpixto/font-from-image
https://github.com/lkmidas/Font-Detection
https://github.com/JeffersonQin/YuzuMarker.FontDetection
