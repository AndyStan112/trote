import Link from "next/link"
const DefaultNavbar=()=> {
  return (
   <div className="flex justify-center gap-4 py-4 w-full bg-gray-400">
    <img src="greenTrot.svg"></img>
    <Link className="bg-slate-300 rounded-md p-1 text-center " href="/">Home</Link>
    <Link className="bg-slate-300 rounded-md  p-1 text-center" href="/rent">Rent</Link>
   </div>
  )
}
export default DefaultNavbar