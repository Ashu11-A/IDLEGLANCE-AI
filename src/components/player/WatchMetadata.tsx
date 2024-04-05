'use client'
import { Video } from "@/app/video/page"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"

export default function WatchMetadata({ id }: { id: string}) {
  const [showMore, setShowMore] = useState(false)  
  const { data } = useQuery({
    queryKey: [id, 'info'],
    queryFn: () => axios.get(`/internal/video/${id}`).then((res) => res.data as Video),
    refetchOnWindowFocus: false
  })

  function adicionarLinks(texto: string) {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return texto.replace(exp, `<a style="color: rgb(62, 166, 255)" href='$1'>$1</a>`);
  }
  function textRefactoring(text: string): string[] {
    const brokenText: string[] = text.split(' ');
    const formattedText: string[] = [];
    let currentSize: number = 0;
  
    for (const word of brokenText) {
      if (currentSize + word.length + 1 <= 120) { // Adicionamos 1 para contar o espaço
        if (formattedText.length && formattedText[formattedText.length - 1].length + word.length + 1 <= 120) { // Verificamos se a palavra cabe no último elemento
          formattedText[formattedText.length - 1] += ' ' + word;
        } else {
          formattedText.push(word);
        }
        currentSize += word.length + 1;
      } else {
        break;
      }
    }
    
    return formattedText;
  }

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-row h-6 w-full">
        {data === undefined
          ? <Skeleton className="w-96 h-full rounded-full" />
          : <p className="text-start font-semibold text-xl">{data.title.replace('[Lyrics x AMV]', '')}</p>}
      </div>
      <div className="h-[1px] bg-zinc-800 w-full"></div>
      {data === undefined
        ? <Skeleton className="w-full h-40 rounded-2xl" />
        : <div className="bg-zinc-800 rounded-2xl p-5 whitespace-pre-wra">
          {data.description.length > 200 && !showMore ? (
            <>
              {textRefactoring(data.description)[0].split('\n\n').map((text) => (
                <pre className="py-2 text-xs" key={Math.random()} dangerouslySetInnerHTML={{ __html: adicionarLinks(text) }} />
              ))}
              <button onClick={() => setShowMore((prev) => !prev)}>Mostrar Mais...</button>
            </>
          ) : (
            <>
              {data.description.split('\n\n').map((text) => (
                <pre className="py-2 text-xs" key={Math.random()} dangerouslySetInnerHTML={{ __html: adicionarLinks(text) }} />
              ))}
              <button onClick={() => setShowMore((prev) => !prev)}>Mostrar Menos...</button>
            </>
          )}
        </div>
      }
    </div>
  )
}