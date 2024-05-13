// tslint:disable-next-line: no-unused-variable
import { modelList, loraList } from '../constant'
import { v4 as uuidv4 } from 'uuid'
import { fixedPrompt, sellingImageDynamicPrompt, SellingImageDynamicPromptType, auctionImageDynamicPrompt, AuctionImageDynamicPromptType } from '../constant'


export const getAuctionFixedImagePrompt = (): string => {
    let prompt = fixedPrompt;

    Object.keys(auctionImageDynamicPrompt).forEach((key: string) => {
        const eachPrompt = auctionImageDynamicPrompt[key as keyof AuctionImageDynamicPromptType];
        const randomIndex = Math.floor(Math.random() * eachPrompt.length);
        prompt += ", " + eachPrompt[randomIndex]
    });

    return prompt;
}


export const getSellingFixedImagePrompt = (): string => {
    let prompt = fixedPrompt;

    Object.keys(sellingImageDynamicPrompt).forEach((key: string) => {
        const eachPrompt = sellingImageDynamicPrompt[key as keyof SellingImageDynamicPromptType];
        const randomIndex = Math.floor(Math.random() * eachPrompt.length);
        prompt += ", " + eachPrompt[randomIndex]
    });

    return prompt;
}



export const getSurpriseModel = (modelValue: string): string => {
    const randomIndex = Math.floor(Math.random() * modelList.length)
    const randomModel = modelList[randomIndex]

    if (randomModel.value === modelValue) return getSurpriseModel(modelValue)

    return randomModel.value;
}


export const getRandomLora = (lora: string): string => {
    const randomIndex = Math.floor(Math.random() * loraList.length)
    const randomLora = loraList[randomIndex]

    if (randomLora === lora) return getRandomLora(lora)

    return randomLora;
}



interface Identifiable {
    _id: number | string
}

export const removeDuplicatesById = <T extends Identifiable>(arr: T[]): T[] => {
    return Object.values(
        arr.reduce((acc, current) => {
            acc[current._id] = current
            return acc
        }, {} as Record<string | number, T>)
    )
}


export const getUUID = () => {
    const val = uuidv4();
    return val;
}