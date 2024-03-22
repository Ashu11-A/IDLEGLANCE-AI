import { useStoryboards } from "@/hooks/useStoryboards";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { StoryboardsImages } from "./Player.d";

export function Cinematics({ time }: { time: number }): ReactElement {
    const [image, setImage] = useState<StoryboardsImages | undefined>(undefined)
    const { findImage } = useStoryboards()
    const timestamp = Math.ceil(time / 2) * 2

    useEffect(() => {
        const newImage = findImage(time)
        console.log('Cinematics mudou')
        console.log(timestamp)
        console.log(newImage)
        setImage(newImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timestamp])

    return (
        <AnimatePresence>
            {image !== undefined
                && <motion.image
                    className={'absolute blur-3xl '}
                    key={image.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 1.5
                        }
                    }}
                    transition={{
                        duration: 2,
                    }}
                >
                     <Image alt={'Image Cinematics'} src={image.image} width={0} height={0} className="w-[1280px] h-[720px] bg-background/50" />
                </motion.image>
            }
        </AnimatePresence>

    )
}