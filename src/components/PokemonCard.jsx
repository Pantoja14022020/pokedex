import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Spinner,
  Chip
} from "@material-tailwind/react";
import axios from 'axios'
import { useEffect, useState } from "react";
  





export function PokemonCard({name,url}) {

  const [urlImage, setUrlImage] = useState('')
  const [weigth, setWeight] = useState('')
  const [heigth, setHeight] = useState('')
  const [urlAudio, setUrlAudio] = useState('')




  const getDetailPokemon = async url => {//Funcion para obtener informacion detallada del pokemon
    const {data} = await axios.get(url)

    setUrlImage(data.sprites.front_default)//Navego a traves de propiedades para obtener url de imagen
    setWeight(data.weight)
    setHeight(data.height)
    setUrlAudio(data.cries.latest)
  }



  useEffect(()=>{
    getDetailPokemon(url)
  },[])



  return (
    <Card className="w-full max-w-[26rem] m-2">
      {
        urlImage ? (urlImage.length > 0 ? <img src={`${urlImage}`} alt={`${name}`} width={'80px'} height={'80px'}/> : <Spinner/>) : <></>
      }
      <CardBody>


        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </Typography>
        </div>


        
          <Chip variant="ghost" value={`Weight: ${weigth}`} key={1 }/>
          <Chip variant="ghost" value={`Height: ${heigth}`} style={{marginTop:'0.5rem'}} key={2}/>
        


      </CardBody>


      <CardFooter className="pt-3">
        <audio src={`${urlAudio}`} controls></audio>
      </CardFooter>

    </Card>
  );
}