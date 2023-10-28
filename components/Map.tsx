import { useLoadScript, GoogleMap,MarkerF } from '@react-google-maps/api';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useMemo, useEffect, useState } from 'react';
import {removeDuplicates} from '@/lib/lib.js'
import { Trot } from '@prisma/client';
const getIcon= (bat:number)=>{
  if(bat>80) return "greenTrot.svg";
  if(bat>50) return "yellowTrot.svg"
  if(bat>20) return "orangeTrot.svg"
  return "redTrot.svg"
}
const Map: NextPage = () => {
  const TrotTab = ({code,battery}:{
    code:string
    battery:number
  })=>{
    return (
      <div className='h-10 border flex justify-between px-4' >
          <p>#{code}</p>
          <p>{battery}%</p>
          <Link href={"/rent?code="+code}>rent</Link>
      </div>
    )

  }
  const [trots,setTrots]=useState([])
  const [selectedTrots, setSelectedTrots]= useState([])
  const libraries = useMemo(() => [], []);
  const mapCenter = useMemo(
    () => ({ lat: 45.7463827, lng: 21.2123609 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });
  const getTrots=async ()=>{
    await fetch("/api/getAvailableTrots")
      .then((r) =>
        r.json().then((newTrots) => {
          setTrots(newTrots)
        })
      )
      // .then(()=>{setIsLoading(false)})
      .catch((e) => console.log(e));
  }
  useEffect(()=>{
  getTrots()
 },[])
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
 
  return (
    <div className='flex flex-col  w-full'>
     
      <div className="flex bg-purple-400 w-full h-[600px]  ">
      <div className="bg-red-400 w-1/4">
      {selectedTrots.map((trot:Trot)=>{
        return <TrotTab battery={trot.battery} code= {trot.code} key={trot.id} />
      })}
      </div>
            <GoogleMap  
      //@ts-ignore
        options={mapOptions}
        zoom={19}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '80%', height: '100%' }}
        onLoad={() => console.log('Map Component Loaded...')}
      > 
     { trots.map((trot:Trot)=>{
      return(<MarkerF position={{lat:trot.lat,lng:trot.long}} 
        onLoad={() => console.log('Marker Loaded')} 
        icon={getIcon(trot.battery)}
        onClick={()=>{
          setSelectedTrots(oldTrots=>removeDuplicates([...oldTrots,trot]))
        }}
        />)
     })}

      </GoogleMap>
    </div>

    </div>
     
  );
};

export default Map;