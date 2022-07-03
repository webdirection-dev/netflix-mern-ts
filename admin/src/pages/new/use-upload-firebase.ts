import React, {useState, useContext, useEffect} from "react"
import {storage} from "../../configs/firebase"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"

import {MovieContext} from "../../context/movieContext/MovieContext"
import {createMovies} from "../../context/apiCalls"

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
    const [item, setItem] = useState({} as IItem)
    const [isCheckItem, setIsCheckItem] = useState(false)
    const [itemLength, setItemLength] = useState(0)
    const [files, setFiles] = useState({} as IFiles)
    const [filesLengthInItem, setFilesLengthInItem] = useState(0)
    const [filesLength, setFilesLength] = useState(0)
    const [uploaded, setUploaded] = useState(0)
    const [movieAvatar, setMovieAvatar] = useState('' as string | File)

    const imgUrl = movieAvatar ?
        URL.createObjectURL(movieAvatar as Blob | MediaSource) :
        'https://firebasestorage.googleapis.com/v0/b/netflix-a1cac.appspot.com/o/static-ui-images%2Fno-images.png?alt=media&token=662c7049-5349-48e1-9620-b0399764fa8a'

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name

        setItem({
            ...item,
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
                            setItem(prev => (
                                {
                                    ...prev,
                                    [i.label]: downloadURL,
                                }
                            ))

                            setUploaded(prev => prev + 1)
                        });
                }
            );
        })
    }

    const handleUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        upload([
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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        createMovies(item, dispatch)
        setItem({})
        setUploaded(0)
    }

    const handleMovieAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setMovieAvatar(localFile[0])
        }
    }

    useEffect(() => {
        for (let key in files) {
            setFilesLength(filesLength + 1)
        }
    }, [files])

    useEffect(() => {
        for (let key in item) {
            setItemLength(itemLength + 1)
        }
    }, [item])

    useEffect(() => {
        for (let key in item) {
            if (
                key === 'img' ||
                key === 'imgTitle' ||
                key === 'imgSmall' ||
                key === 'trailer' ||
                key === 'video'
            ) setFilesLengthInItem(filesLengthInItem + 1)
        }
    }, [item])

    useEffect(() => {
        for (let key in item) {
            if (
                (item.title && item.title !== '') &&
                (item.description && item.description !== '') &&
                (item.year && item.year !== '') &&
                (item.genre && item.genre !== '') &&
                (item.duration && item.duration !== '') &&
                (item.limit && item.limit !== '')
            ) setIsCheckItem(true)
        }
    }, [item])

    return {
        imgUrl,
        handleChangeText,
        handleChangeFile,
        handleUpload,
        handleMovieAvatar,
        uploaded,
        handleSubmit,
        filesLength,
        isCheckItem,
        itemLength,
        filesLengthInItem,
    }
}