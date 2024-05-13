import { RouterProvider } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import router from './routes'

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    )
}

export default App
