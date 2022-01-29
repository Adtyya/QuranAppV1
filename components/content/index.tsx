import axios from "axios";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";

export default function Content()
{
    const [surah, setSurah] = useState([]);
    const [load, setLoad] = useState(false);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(15);
    const [pagination, setPagination] = useState(false);
    const baseUrl = 'https://equran.id/api';

    const response = async ()=>{

        try {
            setLoad(true);
            const res = await axios.get(`${baseUrl}/surat`);
            setLoad(false);
            setSurah(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e: SyntheticEvent)=>{
        e.preventDefault();
    }

    useEffect(()=>{
        response();
    },[]);

    function Pagination()
    {
        if(page >= surah.length){
            setPagination(true);
        }else{
            setPage((value)=> value + 15);
        }
    }

    return(
        <div className="container mx-auto">
            <div className="flex item-center justify-center">
                <form onSubmit={handleSubmit}>
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search by Surah name .." onChange={(e)=>setQuery(e.target.value)}/>
                </form>
            </div>
            <div>
                {load ? <p className="text-2xl text-center">Loading Data</p> : ""
                }
                <div className="flex flew-row flex-wrap w-full justify-center">
                    {surah.filter((show: any)=>{
                        if(query == ''){
                            return show;
                        }else if(show.nama_latin.toLowerCase().includes(query.replace(/\s+/g,'-').toLocaleLowerCase())){
                            return show;
                        }
                    }).slice(0, page).map((show: any)=>{
                        return(
                            <div key={show.nomor} className="flex w-full py-3 px-3 mx-3 my-3 bg-slate-200 rounded w-full h-fit md:w-1/4">
                                <Link href={`/baca-surat-ke/${show.nomor}`} passHref>
                                    <div>
                                        <div className="flex flex-row">
                                            <p className="text-lg rounded-full mx-4 my-3 px-2 py-2">
                                                {show.nomor}
                                            </p>
                                            <div className="flex-col my-3">
                                                <p className="font-bold italic">{show.nama_latin}</p>
                                                <p className="italic">{show.arti}, {show.jumlah_ayat} Ayat</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                {pagination? 
                <>
                    <p className="text-center text-lg">Tidak ada lagi data yang dapat ditampilkan!</p>
                </>
                :
                    <div className="text-center">
                        <button className="text-lg font-bold px-3 rounded-full outline outline-offset-2 outline-1 w-max my-5" onClick={Pagination}>
                            Muat lebih banyak  
                        </button>
                    </div>
                
                }
            </div>
        </div>
    )
}