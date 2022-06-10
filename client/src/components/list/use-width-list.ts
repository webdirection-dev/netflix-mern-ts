import React, {useEffect, useRef, useState} from "react";
import {useMatchMedia} from "../../hooks"

interface IMedia { [key: string]: boolean }

export const useWidthList = () => {
    const [listener, setListener] = useState(0)
    const [isMoved, setIsMoved] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)
    const [translateContainer, setTranslateContainer] = useState(0)
    const {isMac, isDesktop, isTablet, isMobile} : IMedia = useMatchMedia()

    const handleClick = (direction: string) => {
        const iWidth = window.innerWidth - 2300 - 50
        const forViewport = isMac ? 4 : isDesktop ? 5 : isTablet ? 6 : 7

        if (listRef.current !== null) {
            if (direction === 'left' && translateContainer < 0) {
                changeTranslate(listRef, setTranslateContainer, translateContainer + 230)
                if (translateContainer >= -230) changeTranslate(listRef, setTranslateContainer, 0)
            }

            if (direction === 'right' && translateContainer > -230 * forViewport) {
                changeTranslate(listRef, setTranslateContainer, translateContainer - 230)

                if (
                    (isDesktop && (translateContainer <= -920 && translateContainer > -1150)) ||
                    (isTablet && (translateContainer <= -1150 && translateContainer > -1380)) ||
                    (isMobile && (translateContainer <= -1380))
                ) changeTranslate(listRef, setTranslateContainer, iWidth)
            }
        }
    }

    useEffect(() => {
        if (translateContainer < 0) setIsMoved(true)
        window.addEventListener('resize', () => {
            setListener(listener + 1)
        })

        return () => window.removeEventListener('resize', () => {setListener(listener + 1)})

    }, [translateContainer])

    useEffect(() => {
        if (listener > 0) {
            if (window.innerWidth >= 1440 && (translateContainer < -920 && translateContainer > -1150)) {
                setTranslateContainer(-920)
                step(listRef,-920)
            }

            windowListener(listRef, setTranslateContainer, translateContainer)

            setListener(0)
        }
    }, [listener])

    return { isMoved, listRef, handleClick, }
}

//helpers
function step(
    ref: React.RefObject<HTMLDivElement>,
    num: number,
    s?: number | undefined
): void {
    if (ref.current !== null) {
        if (s) ref.current.style.transform = `translateX(${s}px)`
        if (!s) ref.current.style.transform = `translateX(${num}px)`
    }
}

function windowListener(
    listRef: React.RefObject<HTMLDivElement>,
    setTranslateContainer: React.Dispatch<React.SetStateAction<number>>,
    translateContainer: number
): void {
    const iWidth = window.innerWidth - 2300 - 50

    if (window.innerWidth >= 1440) {
        changeTranslate(listRef, setTranslateContainer, -920)
    }

    if (
        (window.innerWidth < 1440 && window.innerWidth >= 1200) &&
        (translateContainer < -1150 && translateContainer >= -1380)
    ) {
        changeTranslate(listRef, setTranslateContainer, iWidth)
    }

    if (window.innerWidth < 1200 && translateContainer < -1380) {
        changeTranslate(listRef, setTranslateContainer, iWidth)
    }
}


function changeTranslate(
    listRef: React.RefObject<HTMLDivElement>,
    setTranslateContainer: React.Dispatch<React.SetStateAction<number>>,
    positionX: number,
) {
    setTranslateContainer(positionX)
    step(listRef,positionX)
}