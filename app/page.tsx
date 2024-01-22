'use client'
import { FormEvent, useEffect, useRef, useState } from "react";
import {BeatType} from './types/types'

export default function Home() {
  const [beat,setBeat] = useState('')
  const [fermento,setFermento] = useState('')
  const [propionato,setPropionato] = useState('')
  const [responsavel,setResponsavel] = useState('')
  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    async function renderBeats(){
    const getApi = await fetch("http://localhost:3000/beats")
    const getConversed:BeatType[] = await getApi.json()

    if(getConversed.length>0){
      for (let i = 0; i<getConversed.length; i++){

        const rowContainer = document.createElement('div')
        rowContainer.id =  getConversed[i].id
        const beatNumberSpan = document.createElement('span')
        beatNumberSpan.innerText = `${getConversed[i].numeroBatida}`
        const dataSpan = document.createElement('span')
        dataSpan.innerText = `${getConversed[i].data}`
        const farinhaSpan = document.createElement('span')
        farinhaSpan.innerText = getConversed[i].farinha
        const fermentoSpan = document.createElement('span')
        fermentoSpan.innerText =  getConversed[i].fermento
        const propionatoSpan = document.createElement('span')
        propionatoSpan.innerText =  getConversed[i].propionato
        const responsavelSpan = document.createElement('span')
        responsavelSpan.innerText =  getConversed[i].responsavel
        const hourSpan = document.createElement('span')
        hourSpan.innerText = `${getConversed[i].hour}`
    
    
        rowContainer.append(beatNumberSpan,farinhaSpan,fermentoSpan,propionatoSpan,responsavelSpan)
    
        if(refContainer.current){
          refContainer.current.append(rowContainer)
        }
      }
    }else{
      console.log('Não tem nada')
    }
    }
    renderBeats()
  },[])

  async function createBeat(ev:FormEvent){
    ev.preventDefault()
    const date = new Date()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const fullHour = `${hour}:${minutes}`
    const fullString = `${day}/0${month}/${year}`
    const getApi = await fetch("http://localhost:3000/beats")
    const getConversed:BeatType[] = await getApi.json()
    const callApi = await fetch("http://localhost:3000/beats",{
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({numeroBatida:getConversed.length+1, farinha:beat,fermento,propionato,responsavel,hour:fullHour,data:fullString}),
    })

    const rowContainer = document.createElement('div')

    const dataSpan = document.createElement('span')
    dataSpan.innerText = fullString
    const beatNumberSpan = document.createElement('span')
    beatNumberSpan.innerText = `${getConversed.length+1}`
    const farinhaSpan = document.createElement('span')
    farinhaSpan.innerText = beat
    const fermentoSpan = document.createElement('span')
    fermentoSpan.innerText = fermento
    const propionatoSpan = document.createElement('span')
    propionatoSpan.innerText = propionato
    const responsavelSpan = document.createElement('span')
    responsavelSpan.innerText = responsavel
    const hourSpan = document.createElement('span')
    hourSpan.innerText = fullHour


    rowContainer.append(beatNumberSpan,dataSpan,farinhaSpan,fermentoSpan,propionato,responsavelSpan,hourSpan)

    if(refContainer.current){
      refContainer.current.append(rowContainer)
    }

    }
    

  return (
   <>
   <form onSubmit={(ev)=>createBeat(ev)}>
    <label htmlFor="">Farinha de Trigo (KG)</label>
    <input 
    type="text" 
    style={{display:'block', color:'black'}}
    value={beat}
    onChange={(ev)=>setBeat(ev.currentTarget.value)}
    />
    <label htmlFor="">Fermento (KG)</label>
    <input 
    type="text" 
    style={{display:'block', color:'black'}}
    value={fermento}
    onChange={(ev)=>setFermento(ev.currentTarget.value)}
    />
    <label htmlFor="">Propionato (KG)</label>
    <input 
    type="text" 
    style={{display:'block', color:'black'}}
    value={propionato}
    onChange={(ev)=>setPropionato(ev.currentTarget.value)}
    />
    <label htmlFor="">Responsavel</label>
    <input 
    type="text" 
    style={{display:'block', color:'black'}}
    value={responsavel}
    onChange={(ev)=>setResponsavel(ev.currentTarget.value)}
    />
    <button className="bg-gray-300 mt-7">Creat beat</button>
   </form>

   <div ref={refContainer}>
    <div>
      <span>Numero Batida</span>
      <span>Data</span>
      <span>Farinha de Trigo</span>
      <span>Fermento</span>
      <span>Propionato</span>
      <span>Responsavel</span>
      <span>Horario</span>
    </div>
   </div>
   </>
  );
}
