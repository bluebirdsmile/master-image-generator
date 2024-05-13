import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Regenerate from '../pages/Regeneate'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/regenerate',
        element: <Regenerate />,
    },
])

export default router
