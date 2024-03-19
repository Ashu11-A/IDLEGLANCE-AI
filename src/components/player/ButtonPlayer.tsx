import Icon from "@mdi/react"
import { useKeyPress, useKeyPressEvent } from "react-use"
import { mdiAlertCircleOutline } from '@mdi/js';

interface ButtonPlayerType {
    icon: string,
    iconActive?: string,
    actived?: boolean,
    key: string,
    keyFunction: () => void
}

export function ButtonPlayer({ icon, iconActive, actived, key, keyFunction }: ButtonPlayerType) {
    useKeyPressEvent(key, () => keyFunction())
    return (
        <button
            className='mx-5'
            onClick={keyFunction}
        >
            {actived
            ? <Icon color={'white'} path={iconActive ?? mdiAlertCircleOutline} size={'2rem'} />
            : <Icon color={'white'} path={icon} size={'2rem'} />
        }
        </button>
    )
}