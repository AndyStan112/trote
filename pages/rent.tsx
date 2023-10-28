import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'

export default function Rent() {
  const [start,setStart] = useState(0)
  const [curr,setCurr] = useState(0)
  const [end,setEnd] = useState(false)
  const Trip = ()=>{
    return<div>
       <button onClick={()=>{
    
      if(start==0) {
        setStart( Date.now())
        setCurr( Date.now())
      }
      else {
        setEnd(true);
      }
    }}>{!end&&(start==0?"Start":"End")}</button>
    
    {
    start!=0&& <p>{Math.ceil((curr-start)/1000/24)}  Minutes Elapsed</p>}
  
    </div>
  }
  useEffect(()=>{
    if(!end)
    setTimeout(()=>{
      setCurr(Date.now())
    },1000)
  },[curr])
 const searchParams = useSearchParams()
 const SCode= searchParams.get("code")
  return (
    <main
      className={`min-h-screen flex `}
    >
   {SCode!=null?
   <div>
      <Trip></Trip>
   </div>
   
   :"Please scan the qr code of the scooter you want to use"
   }
    </main>
  )
}
