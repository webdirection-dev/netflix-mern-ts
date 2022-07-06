import React, {useState, useContext, useEffect} from "react"
import {storage} from "../../configs/firebase"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"

import {MovieContext} from "../../context/movieContext/MovieContext"
import {createMovies} from "../../context/apiCalls"
import {noImg} from '../../static-data/img'
import {movieInputs} from "../../static-data/data/form-source"

const quantityInputs = movieInputs.data.length + movieInputs.loadingMedia.length

type TFile = Blob | Uint8Array | ArrayBuffer

interface IFiles {
    [key: string]: {localFile: {}, path: string}
}

interface IItem {
    [key: string]: string | number
}

interface IUpload {
    file: TFile;
    label: string;
    path: string;
}

export const useUploadFirebase = () => {
    const {dispatch} = useContext(MovieContext)
    const [items, setItems] = useState({isSeries: 'false'} as IItem) // isSeries НЕ УДАЛЯТЬ!!!
    const [files, setFiles] = useState({} as IFiles)

    const [isCheckItem, setIsCheckItem] = useState(false)
    const [isFilesLengthInItem, setIsFilesLengthInItem] = useState(false)
    const [isFilesFill, setIsFilesFill] = useState(false)

    const [movieAvatar, setMovieAvatar] = useState('' as string | File)

    const imgUrl = movieAvatar ? URL.createObjectURL(movieAvatar as Blob | MediaSource) : noImg

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name

        setItems({
            ...items,
            [name]: value
        })
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.files
        const name = e.target.name

        if (value !== null) {
            setFiles({
                ...files,
                [name]: {
                    localFile: value[0],
                    path: value[0].name
                }
            })
        }
    }

    const upload = (items: IUpload[]) => {
        items.forEach((i) => {
            const fileName = i.label + '-' + i.path.split('.')[0] + '-' + new Date().getTime()

            const storageRef = ref(storage, `/items/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, i.file)

            uploadTask.on(
                'state_changed',

                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },

                (err) => console.error(err),

                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setItems(prev => (
                                {
                                    ...prev,
                                    [i.label]: downloadURL,
                                }
                            ))
                        });
                }
            );
        })
    }

    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        await upload([
            {
                file: files.img.localFile as TFile,
                label: 'img',
                path: files.img.path
            },
            {
                file: files.imgTitle.localFile as TFile,
                label: 'imgTitle',
                path: files.imgTitle.path
            },
            {
                file: files.imgSmall.localFile as TFile,
                label: 'imgSmall',
                path: files.imgSmall.path
            },
            {
                file: files.trailer.localFile as TFile,
                label: 'trailer',
                path: files.trailer.path
            },
            {
                file: files.video.localFile as TFile,
                label: 'video',
                path: files.video.path
            },
        ])
    }

    const handleClearForm = () => {
        setItems({isSeries: 'false'})
        setFiles({})
        setIsCheckItem(false)
        setIsFilesLengthInItem(false)
        setIsFilesFill(false)
        setMovieAvatar('')
    }

    const handleMovieAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setMovieAvatar(localFile[0])
        }
    }

    useEffect(() => {
        let counter = 0
        for (let key in files) {counter++}
        if (counter === movieInputs.loadingMedia.length) setIsFilesFill(true)
        else setIsFilesFill(false)
    }, [files])

    useEffect(() => {
        let counter = 0
        for (let key in items) {
            counter++

            if (
                (items.title && items.title !== '') &&
                (items.description && items.description !== '') &&
                (items.year && items.year !== '') &&
                (items.genre && items.genre !== '') &&
                (items.duration && items.duration !== '') &&
                (items.limit && items.limit !== '') &&
                (items.isSeries && items.isSeries !== '')
            ) setIsCheckItem(true)
            else setIsCheckItem(false)
        }

        if (counter === quantityInputs) {
            createMovies(items, dispatch)
        }
    }, [items, dispatch])

    console.log(items)

    return {
        imgUrl,
        handleChangeText,
        handleChangeFile,
        handleMovieAvatar,
        handleClearForm,
        handleUpload,
        isFilesFill,
        isCheckItem,
        isFilesLengthInItem,
    }
}