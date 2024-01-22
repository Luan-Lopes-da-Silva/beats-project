'use client'

import { FormEvent, useRef, useState } from "react"

export default function Page(){
    const [data,setData] = useState('')
    const refContainer = useRef<HTMLDivElement>(null)

    async function seardData(ev:FormEvent){
    ev.preventDefault()
    const getApi = await fetch("http://localhost:3000/beats")
    const conversedApi:import("../types/types").BeatType[] = await getApi.json()
    const filter = conversedApi.filter(beat=>(beat.data === data))
    if(filter.length>0){
        const divRowHeader = document.createElement('div')
        const spanHeader1 = document.createElement('span')
        spanHeader1.innerText = 'Numero Batida'
        const spanHeader2 = document.createElement('span')
        spanHeader2.innerText = 'Data'
        const spanHeader3 = document.createElement('span')
        spanHeader3.innerText = 'Farinha de Trigo'
        const spanHeader4 = document.createElement('span')
        spanHeader4.innerText = 'Fermento'
        const spanHeader5 = document.createElement('span')
        spanHeader5.innerText = 'Propionato'
        const spanHeader6 = document.createElement('span')
        spanHeader6.innerText = 'Responsavel' 
        const spanHeader7 = document.createElement('span')
        spanHeader7.innerText = 'Horario'
        divRowHeader.append(spanHeader1,spanHeader2,spanHeader3,spanHeader4,spanHeader5,spanHeader6,spanHeader7)
        if(refContainer.current){
            refContainer.current.append(divRowHeader)
        }
        for(let i = 0; i<filter.length; i++){
            const rowContainer = document.createElement('div')
            rowContainer.id =  filter[i].id
            const beatNumberSpan = document.createElement('span')
            beatNumberSpan.innerText = `${filter[i].numeroBatida}`
            const dataSpan = document.createElement('span')
            dataSpan.innerText = `${filter[i].data}`
            const farinhaSpan = document.createElement('span')
            farinhaSpan.innerText = filter[i].farinha
            const fermentoSpan = document.createElement('span')
            fermentoSpan.innerText =  filter[i].fermento
            const propionatoSpan = document.createElement('span')
            propionatoSpan.innerText =  filter[i].propionato
            const responsavelSpan = document.createElement('span')
            responsavelSpan.innerText =  filter[i].responsavel
            const hourSpan = document.createElement('span')
            hourSpan.innerText = `${filter[i].hour}`

        rowContainer.append(beatNumberSpan,farinhaSpan,fermentoSpan,propionatoSpan,responsavelSpan)
    
        if(refContainer.current){
          refContainer.current.append(rowContainer)
        }
        }
    }else{
        console.log('Não tem nada')
    }
    
    }


    return(
        <>
        <form onSubmit={(ev)=>seardData(ev)}>
            <label htmlFor="">Qual dia de produção você quer buscar?</label>
            <input 
            type="text" 
            value={data}
            onChange={(ev)=>setData(ev.currentTarget.value)}
            style={{display:'block',color:'black'}}
            />
            <button>Buscar</button>
        </form>
        <div ref={refContainer}></div>
        </>
    )
}