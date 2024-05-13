import React, { useState } from "react";
import Header from '../components/Header'
import ImageUploading, { ImageListType } from "react-images-uploading";
import classNames from 'classnames'
import { getUUID } from "../utils/utils";
import { OpenAI } from "openai";


function Regenerate() {


    const [images, setImages] = React.useState([]);
    const [resultImage, setResultImage] = useState<string>('');
    const maxNumber = 1;
    const [prompt, setPrompt] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };


    const generateImage = async () => {
        setIsGenerating(true);


        setIsGenerating(false);
    }

    const onClickSaveImageHandle = () => {

        if (!resultImage) {
            return;
        }
        const now = Date.now();

        const fileName = now + '-' + getUUID();
        fetch(resultImage)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.download = `${fileName}.jpg`;
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error fetching the file:", error);
            });
    }




    return (
        <React.Fragment>
            <Header />
            <div className="container mx-auto max-w-screen-xl mt-16 px-3">
                <div className="mb-5">
                    <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-bold">

                    </h2>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                        }) => (

                            <div className="upload__image-wrapper">
                                <button
                                    style={isDragging ? { color: "red" } : undefined}
                                    onClick={() => onImageUpdate(0)}
                                    {...dragProps}
                                    className="w-full border-[3px] border-blue-400 rounded-2xl border-dotted py-[50px] text-center"
                                >
                                    {
                                        imageList.length == 0 && <>クリックまたはドラッグ＆ドロップ</>
                                    }

                                    {imageList.map((image, index) => (
                                        <div key={index} className="">
                                            <div className="max-w-[650px] mx-auto">
                                                <img src={image.dataURL} className="" alt="" />
                                            </div>
                                        </div>
                                    ))}
                                </button>
                                <div className="mt-[30px] flex justify-end">
                                    <button className="transition-all duration-300 hover:opacity-75 text-white rounded-lg py-[5px] px-[10px] bg-orange-500 " onClick={onImageRemoveAll}>削除</button>
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                    <div className="mt-[30px] flex justify-between items-center gap-x-4">
                        <input
                            type="text"
                            value={prompt}
                            placeholder="AI Image Generator"
                            onChange={(e) => setPrompt(e.target.value)}
                            className="outline-none block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                        />
                        <button
                            type="button"
                            onClick={generateImage}
                            className={classNames(
                                'text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                                { 'btn-disabled': prompt === '' },
                            )}
                        >
                            {isGenerating ? 'starting...' : 'start'}
                        </button>
                    </div>
                    <div className='mt-[30px] flex justify-end items-center'>
                        <button
                            type="button"
                            onClick={onClickSaveImageHandle}
                            className={classNames(
                                'text-white border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5  py-2 text-center',
                            )}
                        >
                            Save
                        </button>
                    </div>
                    <div className="mt-[30px] border-[3px] rounded-xl min-h-[450px] p-[20px]">
                        {
                            resultImage && <img src={resultImage} className="h-[500px] mx-auto aspect-square" alt="Result Image" />
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Regenerate;