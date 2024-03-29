from typing import Dict, List, TypedDict
from fastapi import APIRouter, UploadFile, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from PIL import Image
from sentence_transformers import SentenceTransformer, util

detectAnimeContent = pipeline("image-classification", model="antonioglass/real-or-anime-age")
detectSimilarityText = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
detectAdultText = pipeline("text-classification", model="lazyghost/bert-large-uncased-Adult-Text-Classifier")

router = APIRouter(
    prefix="/process",
    tags=['process']
)

imagesAllow = [
    'image/jpeg',
    'image/webp',
    'image/png'
]

class ImageInput(BaseModel):
    src: str

@router.post('/thumb')
async def processThumb(img: UploadFile | None):
    if not img:
        raise HTTPException(status_code=404, detail='Image not Found')
    if isinstance(img, UploadFile) and img.content_type not in imagesAllow:
        raise HTTPException(status_code=403, detail='File type not allowed')

    imgType = img.src if isinstance(img, ImageInput) else Image.open(img.file)

    result: List[Dict[str, float]] = detectAnimeContent(imgType) # type: ignore

    if isinstance(result, list):
        animeArray = [
            'anime_adult',
            'anime_contentious',
            'anime_non_adult'
        ]
        return {
            'isAnime': result[0].get('label', None) in animeArray,
        }
    
class Sentences(BaseModel):
    input: str
    compare: list[str]
    
@router.post('/similarity')
async def calcSimilarity(body: Sentences):
    input = body.input
    compareList = body.compare

    #Compute embedding for both lists
    input = detectSimilarityText.encode(input, convert_to_tensor=True)

    response = []

    for compare in compareList:
        convertTensor = detectSimilarityText.encode(compare, convert_to_tensor=True)
        similarity = util.pytorch_cos_sim(input, convertTensor).cpu().item() # type: ignore
        response.append({ 'text': compare, 'similarity': similarity })
        print({ 'text': compare, 'similarity': similarity })
    return response

class ValidateContent(BaseModel):
    texts: list[str] | str

@router.post('/adult')
async def detectAdultContent(body: ValidateContent):
    texts = body.texts
    label_0 = 0
    label_1 = 0

    # Isso ira tratar o texto que contenha mais de 512 caracteres e retornar um array com os textos
    def textRefactoring(text: str) -> list[str]:
        brokenText = text.split()
        formattedText = []
        currentSize = 0
        for word in brokenText:
            if currentSize + len(word) + 1 <= 512: # Adicionamos 1 para contar o espaço
             if formattedText and len(formattedText[-1]) + len(word) + 1 <= 512: # Verificamos se a palavra cabe no último elemento
                 formattedText[-1] += ' ' + word
             else:
                 formattedText.append(word)
            else:
                break
        return formattedText
    
    class Result(TypedDict):
        label: str
        score: int
    def processResult(result: list[Result]):
        nonlocal label_0, label_1 # Pegar variaveis externas
        for values in result:
            if values["label"] == 'LABEL_0':
                print(values["score"])
                label_0 += values["score"]
            else:
                label_1 += values["score"]

    if isinstance(texts, list):
        for text in texts:
            if len(text) >= 512:
                formattedTexts = textRefactoring(text)

                for formatted in formattedTexts:
                    result: List[Result] = detectAdultText(formatted) # type: ignore
                    print(result)
                    if isinstance(result, list):
                        processResult(result)
                        
                label_0 = label_0 / len(formattedTexts)
                label_1 = label_1 / len(formattedTexts)
            else:
                result: List[Result] = detectAdultText(text) # type: ignore
                processResult(result)
    else:
        result: List[Result] = detectAdultText(texts) # type: ignore
        processResult(result)

    return [
        {
            "label": "safe",
            "score": label_0
        },
        {
            "label": "adult",
            "score": label_1
        }
    ]

