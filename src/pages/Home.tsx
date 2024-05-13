import { useCallback, useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import SizeSelector from '../components/SizeSelector'
import { IMAGE_SIZES } from '../constant'
import classNames from 'classnames'
import { getAuctionFixedImagePrompt, getRandomLora, getSellingFixedImagePrompt, getSurpriseModel } from '../utils/utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getUUID } from "../utils/utils";
import ModelSelector from '../components/ModelSelector'
import Loading from '../components/Loading'
import { negativePrompt } from '../constant'





function Home() {
    const [sizeValue, setSizeValue] = useState(IMAGE_SIZES[0].value)
    const [IsGenerating, setIsGenerating] = useState(false)
    const [resultImage, setResultImage] = useState<string>('');
    const [prompt, setPrompt] = useState('');
    const [accessToken, setAccessToken] = useState<string>('');
    const [currentModel, setCurrentModel] = useState<string>('');
    const intervalIdRef = useRef<any>(null);
    const [lora, setLora] = useState<string>(getRandomLora(''));
    const [count, setCount] = useState<number>(0);
    const [autoKind, setAutoKind] = useState<string>('auction');


    const getAccessToken = async () => {

        const apiUrl = 'https://openapi.seaart.ai/v1/api/auth/token';

        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID!;
        const SECRET = process.env.REACT_APP_SECRET!;

        if (!(CLIENT_ID && SECRET)) {
            throw new Error("Env error");
        }

        const data = {
            client_id: CLIENT_ID,
            secret: SECRET
        }

        try {
            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setAccessToken(response.data.data.access_token);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAccessToken();
    }, []);


    const generateImage = async () => {
        if (!accessToken) {
            await getAccessToken();
        }

        if (prompt == "") {
            toast('Please enter the prompt.');
            return;
        }

        if (currentModel == "") {
            toast('Please select a model.')
            return;
        }

        setIsGenerating(true);
        try {
            const apiUrl = 'https://openapi.seaart.ai/v1/api/task/text-to-img';
            let width = 768;
            let height = 1024;

            switch (sizeValue) {
                case 'small':
                    width = 480;
                    height = 640;
                    break;

                case 'normal':
                    width = 640;
                    height = 860;
                    break;

                case 'big':
                    width = 768;
                    height = 1024;
                    break;
                default:
                    break;
            }

            const requestData = {
                category: 1,
                art_model_no: currentModel,
                prompt: prompt,
                width: width,
                height: height,
                num: 1,
                loras: [
                    {
                        model_id: lora
                    }
                ],
                negative_prompt: negativePrompt
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            const taskId = setInterval(() => { checkTaskStatus(response.data.data.id) }, 4000);
            intervalIdRef.current = taskId;
        } catch (error) {
            console.log(error)
        }

    }

    const checkTaskStatus = async (id: string) => {

        try {
            const imageApiUrl = "https://openapi.seaart.ai/v1/api/task/batch-progress";
            const requestData = {
                task_ids: [id]
            }

            const response = await axios.post(imageApiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const status = response.data.data.items[0].status_desc;
            console.log(status);
            if (status === 'finish') {
                setResultImage(response.data.data.items[0].images[0].url);
                setIsGenerating(false);
                clearInterval(intervalIdRef.current);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const onClickAuctionPromptHandle = () => {
        const newRandom = getAuctionFixedImagePrompt();
        setPrompt(newRandom);
        const newRandomModel = getSurpriseModel(currentModel);
        setCurrentModel(newRandomModel);
        const newRandomLora = getRandomLora(lora);
        setLora(newRandomLora);
    }

    const onClickSellingPromptHandle = () => {
        const newRandom = getSellingFixedImagePrompt();
        setPrompt(newRandom);
        const newRandomModel = getSurpriseModel(currentModel);
        setCurrentModel(newRandomModel);
        const newRandomLora = getRandomLora(lora);
        setLora(newRandomLora);
    }


    const onClickSaveImageHandle = async () => {

        if (!resultImage) {
            toast('There are no images to save.')
            return;
        }
        convertToJPEG(resultImage)
    }

    const convertToJPEG = (imageUrl: string) => {
        if (!imageUrl) {
            return;
        }

        const now = Date.now();
        const fileName = now + '-' + getUUID() + ".jpeg";

        const corsProxy = "https://cors-anywhere.herokuapp.com/";
        const proxiedUrl = corsProxy + imageUrl;

        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Necessary for CORS
        img.src = proxiedUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (ctx) { // TypeScript forces us to check if `ctx` is not null
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) { // Check if blob is not null
                        // Create a URL for the blob object
                        const url = URL.createObjectURL(blob);
                        // You can now download the image or display it
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }, 'image/jpeg');
            }
        };

        img.onerror = () => {
            alert('Failed to load image. Make sure the URL is correct and the server supports CORS.');
        };
    };

    const ResultImageComponent = useCallback(() => {
        return (
            <div className="mt-[30px] border-[3px] rounded-xl min-h-[450px] p-[20px]">
                {
                    resultImage && <img src={resultImage} className="h-[500px] mx-auto aspect-square" alt="Result Image" />
                }
            </div>
        )
    }, [resultImage])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (/^\d+$/.test(inputValue)) {
            setCount(Number(inputValue));
        }
    };

    const onClickAutoGenerate = async () => {
        if (count == 0) {
            toast('Enter the number of images you want to create.')
        }

        let randomModel = '';
        let randomPrompt = '';
        let randomLora = '';
        setIsGenerating(true);
        for (let index = 0; index < count; index++) {

            setTimeout(() => {
                randomModel = getSurpriseModel(randomModel);
                if (autoKind == 'auction') {
                    randomPrompt = getAuctionFixedImagePrompt();
                } else {
                    randomPrompt = getSellingFixedImagePrompt();
                }
                randomLora = getRandomLora(randomLora);
                autoImageGenerate(randomModel, randomPrompt, randomLora);
            }, 30000 * index + 1)
        }

        setIsGenerating(false);
    }


    const autoImageGenerate = async (randomModel: string, randomPrompt: string, randomLora: string) => {
        if (!accessToken) {
            await getAccessToken();
        }
        try {
            const apiUrl = 'https://openapi.seaart.ai/v1/api/task/text-to-img';
            let width = 768;
            let height = 1024;
            console.log('send prompt')

            const requestData = {
                category: 1,
                art_model_no: randomModel,
                prompt: randomPrompt,
                width: width,
                height: height,
                num: 1,
                loras: [
                    {
                        model_id: randomLora
                    }
                ],
                negative_prompt: negativePrompt
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            console.log('waiting 30')
            await new Promise((resolve) => setTimeout(resolve, 35000));
            console.log('get image')

            while (1) {
                try {
                    const imageApiUrl = "https://openapi.seaart.ai/v1/api/task/batch-progress";
                    const requestData = {
                        task_ids: [response.data.data.id]
                    }

                    const responseImage = await axios.post(imageApiUrl, requestData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    const status = responseImage.data.data.items[0].status_desc;
                    console.log(status);
                    if (status === 'finish') {
                        setResultImage(responseImage.data.data.items[0].images[0].url);
                        convertToJPEG(responseImage.data.data.items[0].images[0].url);
                        break
                    } else {
                        console.log('Not finished, try getting again')
                        await new Promise((resolve) => setTimeout(resolve, 5000));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            console.log('done')

        } catch (error) {
            console.log(error)
        }
    }


    const onChangeAutoKind = (kind: string, val: string) => {
        if (val == 'on') {
            setAutoKind(kind);
        }
    }


    return (
        <div className='relative'>
            <Header />
            <div className="container mx-auto max-w-screen-xl px-2 pb-[100px]">
                <h1 className="mt-16 pb-7 sm:mt-20 animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl sm:7xl font-black">
                    AI Image Generation System
                </h1>
                <div className="max-w-screen-xl mt-10 mx-auto">
                    <div className='border-[1px] rounded-2xl p-[20px]'>
                        <div className="mb-6 flex space-y-5 flex-col sm:flex-row sm:items-baseline sm:space-x-5">
                            <div className="flex w-full row space-x-2 items-center">
                                <input
                                    type="text"
                                    value={prompt}
                                    placeholder="Explain what you want the AI to draw"
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="outline-none block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                                />
                                <SizeSelector
                                    value={sizeValue}
                                    onValueChange={(value) => {
                                        setSizeValue(value)
                                    }}
                                />
                                <ModelSelector
                                    value={currentModel}
                                    onValueChange={(value) => {
                                        setCurrentModel(value)
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={generateImage}
                                className={classNames(
                                    'text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                                    { 'btn-disabled': prompt === '' },
                                    { loading: IsGenerating }
                                )}
                            >
                                {IsGenerating ? 'starting...' : 'start'}
                            </button>

                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-center gap-x-5'>
                                <button
                                    type="button"
                                    onClick={onClickAuctionPromptHandle}
                                    className={classNames(
                                        'text-white border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5  py-2 text-center',
                                    )}
                                >
                                    Auction
                                </button>
                                <button
                                    type="button"
                                    onClick={onClickSellingPromptHandle}
                                    className={classNames(
                                        'text-white border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5  py-2 text-center',
                                    )}
                                >
                                    Selling
                                </button>
                            </div>
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
                    </div>
                    <div className='mt-[20px] border-[1px] rounded-2xl p-[20px] flex justify-start items-center gap-x-5 '>
                        <div className='flex justify-start items-center'>
                            <input onChange={(e) => onChangeAutoKind("auction", e.target.value)}
                                type="radio" name="radio-auction" className="radio radio-primary" checked={autoKind == "auction"} />
                            <label htmlFor="radio-auction" className='px-[10px]'>Auction</label>
                            <input onChange={(e) => onChangeAutoKind("selling", e.target.value)}
                                type="radio" name="radio-selling" className="radio radio-primary" checked={autoKind == "selling"} />
                            <label htmlFor="radio-selling" className='px-[10px]'>Selling</label>
                        </div>
                        <input
                            type="number"
                            value={count}
                            onChange={handleInputChange}
                            className="outline-none block w-[100px] p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                        />
                        <button
                            type="button"
                            onClick={() => onClickAutoGenerate()}
                            className={classNames(
                                'text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                            )}
                        >
                            Auto Generating
                        </button>
                    </div>
                </div>
                <ResultImageComponent />
            </div>
            {
                IsGenerating &&
                <Loading />
            }
        </div>
    )
}

export default Home
