import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, NavLink, RouterProvider } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Hero />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  },
  {
    path: "*",
    element: <div className="w-full h-screen flex flex-col justify-center items-center bg-[#FAF8F3] px-4">
      <h1 className="text-[2vw] md:text-[4vw] font-['font-3'] text-black/90 mb-4">404</h1>
      <h2 className="text-[1vw] md:text-[2vw] font-['font-3'] text-black/80 mb-8">Page Not Found</h2>
      <p className="text-[0.8vw] md:text-[1vw] font-['font-5'] text-black/70 text-center max-w-lg mb-12 leading-relaxed">
        We apologize, but the requested page could not be found. Please verify the URL or navigate back to continue browsing.
      </p>
      <NavLink 
        to="/"
        className="px-10 py-4 bg-black text-white rounded-lg font-['font-3'] hover:bg-gray-900 transition-colors duration-300"
      >
        Return to Homepage
      </NavLink>
    </div>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
