export const IMAGE_SIZES = [
    {
        label: 'Small (480 X 640)',
        value: 'Small',
    },
    {
        label: 'Normal (640 X 860)',
        value: 'Normal',
    },
    {
        label: 'Big(768 x 1024)',
        value: 'Big'
    }
]


export const modelList = [
    { value: "7b996b6065386c0bc1559a05b756fb2b", label: "7b996" },
    { value: "9d2672fc7e8cdd0e83260b5ef189c232", label: "9d267" },
    { value: "7c6eb1b37632abfac7c14f1c64456afc", label: "7c6eb" },
    { value: "621c84921538781c752c46d2ff8c13fe", label: "621c8" },
    { value: "e85c7407e4d02808491bb179cb6f4206", label: "e85c7" },
    { value: "033ff8410c90075778b450572fb18e45", label: "033ff" },
    { value: "01b2f03ef08e21eaad3f8c15e317e90b", label: "01b2f" },
    { value: "a440a99c41938f28edabe3a762d60bd8", label: "a440a" },
    { value: "0ef87495c6662eed17cca438bc4cef9e", label: "0ef87" },
]



export const fixedPrompt = 'masterpiece, best quality,	high resolution, 1girl, looking at viewer';
export const negativePrompt = 'extra limbs,	missing limb, extra digit, fewer digit, missing digit, missing fingers, mouth mask, fused fingers, mutated hands and fingers, fused limb, bad hands, long neck, long body, bad anatomy, disfigured, deformed, poorly drawn, mutation, extra nipples, extra breasts, disembodied penis, multiple views, text'


export type SellingImageDynamicPromptType = {
    first: string[];
    second: string[];
    third: string[];
    fourth: string[];
    fifth: string[];
    sixth: string[];
    seventh: string[];
    eighth: string[];
    ninth: string[];
    tenth: string[];
    eleventh: string[];
    twelfth: string[];
    thirteenth: string[];
    fourteenth: string[];
}

export const sellingImageDynamicPrompt = {
    first: [
        'full body',
        'upper body',
    ],
    second: [
        'on the bed',
        'classroom',
        'pool side',
        'library',
        'sea',
    ],
    third:[
        'sunlight'
    ],
    fourth: [
        'sunny',
    ],
    fifth: [
        'girl',
        'woman',
        'loli',
        'house wife'
    ],
    sixth: [    
        'pale skin',
    ],
    seventh: [
        'petite ',
        'fighter '
    ],
    eighth: [
        'black hair',
        'brown hair',
    ],
    ninth: [
        'middle hair',
        'long hair',
        'hair bun',
        'ponytail',
        'straight hair',
        'wavy hair',
        'messy hair',
        'forehead'
    ],
    tenth: [
        'aroused',
        'ahegao',
        'orgasm',
        'embarrassed',
        'blush',
        'evil grin'
    ],
    eleventh: [
        'flat chest',
        'small breasts',
        'medium breasts',
        'large breasts',
        'pointy breasts'
    ],
    twelfth: [
        'sow off nipples under white shirt',
        'topless',
        'show off breasts',
        'bra lift',
        'press breasts together',
        'grabbing own breasts',
        'panty lift',
        'show off pussy',
        'bottomless',
        'pussy juice'
    ],
    thirteenth: [
        'Sitting with Knees Up',
        'Sitting with Knees Up, spread legs',
        'cowgirl position, open legs',
        'crawling position on their hands and knees:1.3',
        '(leaning forward:1.3), (hands on knees:1.3)',
        '(breast squeeze:1.3)',
        'mini skirt, (skirt lift:1.3), (from bottom:1.3)',
        'Sitting with Knees Up, spread legs, cameltoe',
        'Sitting with Knees Up, spread legs, show panties',
        'wearing knit sweater & miniskirt, (Flirtingly lifting her skirt to show her panties:1.3)',
        '(spread pussy:1.3)',
        '(stick out butt:1.3)',
        'spread legs, legs up',
        'masturbation'
    ],
    fourteenth: [
        'nsfw',
        'nude',
        'pubic hair',
        'pussy'
    ]
}

export type AuctionImageDynamicPromptType = {
    first: string[];
    second: string[];
    third: string[];
    fourth: string[];
    fifth: string[];
    sixth: string[];
    seventh: string[];
    eighth: string[];
    ninth: string[];
    tenth: string[];
    eleventh: string[];
    twelfth: string[];
    thirteenth: string[];
}

export const auctionImageDynamicPrompt = {
    first: [
        'full body',
        'upper body',
    ],
    second: [
        'on the bed',
        'classroom',
        'pool side',
        'library',
        'sea',
    ],
    third:[
        'sunlight'
    ],
    fourth: [
        'sunny',
    ],
    fifth: [
        'girl',
        'woman',
        'loli',
        'house wife'
    ],
    sixth: [    
        'pale skin',
    ],
    seventh: [
        'petite ',
        'fighter '
    ],
    eighth: [
        'black hair',
        'brown hair',
    ],
    ninth: [
        'middle hair',
        'long hair',
        'hair bun',
        'ponytail',
        'straight hair',
        'wavy hair',
        'messy hair',
        'forehead'
    ],
    tenth: [
        'aroused',
        'ahegao',
        'orgasm',
        'embarrassed',
        'blush',
        'evil grin'
    ],
    eleventh: [
        'flat chest',
        'small breasts',
        'medium breasts',
        'large breasts',
        'pointy breasts'
    ],
    twelfth: [
        'school uniform',
        'sailor uniform',
        'swimsuit',
        'bikini',
        'highleg swimsuit',
        'thong bikini',
        'micro bikini',
        'bra',
        'panties',
        'wearing Fishnet bodystocking',
        'wearing Frilly babydoll and matching shorts',
        'wearing Halter neck lace teddy with peek-a-boo cups',
        'sow off nipples under white shirt'
    ],
    thirteenth: [
        'Sitting with Knees Up',
        'Sitting with Knees Up, spread legs',
        'cowgirl position, open legs',
        'crawling position on their hands and knees:1.3',
        '(leaning forward:1.3), (hands on knees:1.3)',
        '(breast squeeze:1.3)',
        'mini skirt, (skirt lift:1.3), (from bottom:1.3)',
        'Sitting with Knees Up, spread legs, cameltoe',
        'Sitting with Knees Up, spread legs, show panties',
        'wearing knit sweater & miniskirt, (Flirtingly lifting her skirt to show her panties:1.3)',
        '(spread pussy:1.3)',
        '(stick out butt:1.3)'
    ],
}




export const loraList = [
    '1e81d51a0206bfb0b3c5b0334fdd3aa5',
    '6243963e170941b4b24e97e200bf7615',
    '8fbab6e6f0b9efa4330f1c83a379fdb5'
]