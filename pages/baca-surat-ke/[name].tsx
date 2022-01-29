import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import Link from "next/link";

export default function Detail()
{
    const parser = HtmlParser;
    const router = useRouter();
    const [detail, setDetail] = useState<any>([]);
    const [baca, setBaca] = useState(false);
    
    useEffect(()=>{
        const {name} = router.query;
        async function detailSurah()
        {
            const get = await axios.get(`https://equran.id/api/surat/${name}`);
            const data: any = await get.data;
            setDetail(data);
        }
        detailSurah();
        if(!router.isReady) return;
    }, [router])
    return(
        <div className="container mx-auto">
            {baca ? 
            <>
                <div className="text-center">
                    <Link href='/' passHref>
                        <button className="text-lg font-bold px-3 rounded-full outline outline-offset-2 outline-1 w-max mt-5">
                        Kembali ke Home  
                        </button>
                    </Link>                  
                    {detail?.ayat?.map((show: any)=>{
                        return(
                            <div className="flex flex-col text-center my-12 text-lg px-3" key={show.nomor}>
                                <p className="py-2">{show.ar}</p>
                                <p className="py-2">{show.nomor}, {show.idn}</p>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </> : 
            <>
                <div className="flex justify-center item-center w-full flex-col">
                    <div className="flex flex-col my-5">
                        <div className="px-3 text-md md:text-lg">
                            <h5 className="text-lg font-bold">Keterangan surat: </h5>
                            <p>Surat ke {detail.nomor}</p>
                            <p>{detail.nama}</p>
                            <p>{detail.nama_latin} ({detail.arti}), {detail.jumlah_ayat} Ayat</p>
                            <p className="text-right py-5">{parser(detail.deskripsi)}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={()=>setBaca(true)} className="text-lg font-bold px-3 rounded-full outline outline-offset-2 outline-1  w-max">Baca {detail.nama_latin}</button>
                    </div>
                </div>
            </>}
        </div>
    )
}