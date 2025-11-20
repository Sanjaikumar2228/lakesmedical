import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './form.jsx'
import Form2 from './form2.jsx'
import Form3 from './form3.jsx'
import Form4 from './form4.jsx'
import Form5 from './form5.jsx'
import Form6 from './form6.jsx'
import Form7 from './form7.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  { 
     path:'/form',
     element:<Form/>
  },
  {
    path:'/form2',
    element:<Form2/>
  },
  {
    path:"/form3",
    element:<Form3/>
  },
  {
    path:'/form4',
    element:<Form4/>
  },
  {
    path:'/form5',
    element:<Form5/>
  },
  {
    path:'/form6',
    element:<Form6/>
  },
  {
    path:'/form7',
    element:<Form7/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)