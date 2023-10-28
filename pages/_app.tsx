import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import DefaultNavbar from '@/components/DefaultNavbar'

export default function App({ Component, pageProps }: AppProps) {

  return   <div className='flex flex-col w-full min-h-full'> 
    <DefaultNavbar></DefaultNavbar>
   <Component {...pageProps} />
   </div>
}
