from typing import Dict, List
from fastapi import APIRouter, UploadFile, HTTPException
from pydantic import BaseModel
from transformers import pipeline, AutoModel
from PIL import Image
from sentence_transformers import SentenceTransformer, util

pipe = pipeline("image-classification", model="antonioglass/real-or-anime-age")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

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

    result: List[Dict[str, float]] = pipe(imgType) # type: ignore

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

    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    #Compute embedding for both lists
    input = model.encode(input, convert_to_tensor=True)

    for compare in compareList:
        convertTensor = model.encode(compare, convert_to_tensor=True)
        similarity = util.pytorch_cos_sim(input, convertTensor) # type: ignore
        print(similarity.cpu().item())