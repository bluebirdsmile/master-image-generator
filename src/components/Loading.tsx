import comLogo from '../assets/logo.png';

const Loading = () => {
    return (
        <div className="absolute top-0 flex justify-center items-center bg-[rgba(0,0,0,0.16)] w-full h-full">
            <div className="mt-[00px]">
                <img src={comLogo} className="w-[100px] h-[100px] animate-bounce duration-500 transition-all" width={300} height={300} alt="logo" />
            </div>
        </div>
    )
}


export default Loading;