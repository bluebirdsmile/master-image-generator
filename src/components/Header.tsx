import logoImg from '../assets/logo.png'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'



function Header() {

    const navigate = useNavigate();

    
    const onClickHandle = (val: string) => {
        if(val == 'generate') {
            navigate('/');
        } else {
            navigate('/regenerate');
        }
    }
    


    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-3">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/">
                        <img
                            src={logoImg}
                            className="mr-3 h-12 sm:h-14"
                            alt="Logo"
                        />
                    </a>
                    {/* <div className='flex justify-center items-center gap-x-3'>
                        <button
                                type="button"
                                onClick={() => onClickHandle('generate')}
                                className={classNames(
                                    'text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                                )}
                            >
                            生成
                        </button>
                        <button
                                type="button"
                                onClick={() => onClickHandle('regenerate')}
                                className={classNames(
                                    'text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                                )}
                            >
                            再生
                        </button>
                    </div> */}
                </div>
            </nav>
        </header>
    )
}

export default Header
