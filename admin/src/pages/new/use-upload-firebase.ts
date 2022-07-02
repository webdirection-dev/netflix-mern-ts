import React, {useState} from "react"
import {storage} from "../../firebase"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"

type TFile = Blob | Uint8Array | ArrayBuffer

interface IFiles {
    [key: string]: {localFile: {}, path: string}
}

interface IUpload {
    file: TFile;
    label: string;
    path: string;
}

export const useUploadFirebase = () => {
    const [item, setItem] = useState({})
    const [files, setFiles] = useState({} as IFiles)
    const [uploaded, setUploaded] = useState(0)

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
        items.forEach((i) => {const storageRef = ref(storage, `/items/${i.path}`)
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

                            console.log('File available at', downloadURL)
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

    return {handleChangeText, handleChangeFile, handleUpload, uploaded}
}