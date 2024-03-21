'use server'
import sharp from 'sharp';
import axios from "axios";

interface StoryboardsType {
    templateUrl: string
    thumbnailWidth: number
    thumbnailHeight: number
    columns: number,
    rows: number
}

export interface Images {
    name: string
    image: Buffer
    time: number
}

export async function GenImagem({ templateUrl, thumbnailWidth, thumbnailHeight, columns, rows }: StoryboardsType) {
    // Carrega a imagem usando a biblioteca sharp
    const input = (await axios({ url: templateUrl, responseType: 'arraybuffer' })).data as Buffer
    const imagemOriginal = sharp(input);

    // Obtém as dimensões da imagem original
    const { width, height } = await imagemOriginal.metadata();

    // Calcula as dimensões de cada thumbnail
    const larguraThumbnailFinal = width / columns;
    const alturaThumbnailFinal = height / rows;

    const imagens: Images[] = []

    // Itera sobre as linhas e colunas para cortar as miniaturas
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * larguraThumbnailFinal;
            const y = row * alturaThumbnailFinal;
            const time = col * 2 * (row + 1)

            // Corta a miniatura
            const imageBuffer = await imagemOriginal
                .clone()
                .extract({ left: x, top: y, width: larguraThumbnailFinal, height: alturaThumbnailFinal })
                .resize(thumbnailWidth, thumbnailHeight)
                .toBuffer();
            imagens.push({ name: `miniatura_${row}_${col}.jpg`, time: time, image: imageBuffer })
        }
    }
    console.log('Miniaturas cortadas com sucesso!');
    return JSON.parse(JSON.stringify(imagens))

}