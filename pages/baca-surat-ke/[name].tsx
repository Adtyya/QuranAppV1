import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Detail()
{
    const parser = HtmlParser;
    const router = useRouter();
    const [detail, setDetail] = useState<any>([]);
    const [baca, setBaca] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        const {name} = router.query;
        async function detailSurah()
        {
            setLoading(true);
            const get = await axios.get(`https://equran.id/api/surat/${name}`);
            setTimeout(()=>{
                setLoading(false);
            },1000)
            const data: any = await get.data;
            setDetail(data);
        }
        detailSurah();
        if(!router.isReady) return;
    }, [router])
    return(
        <div className="container mx-auto">
            {loading ? 
                <div className="flex flex-col px-3 py-5">
                    <Skeleton width={120}/>
                    <Skeleton width={90} />
                    <Skeleton width={60} />
                    <Skeleton width={180} />
                    <div className="mt-5">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>

                </div> 
            :
            <>
                {baca ? 
                <>
                <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div className="flex-justify-between py-1">
                        <Link href='/' passHref>
                            <button className="w-full text-lg font-bold focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
                                <p>
                                Kembali ke Home
                                </p>
                            </button>
                        </Link>
                    </div>
                </section>
                    <div className="text-center">
                        <h3 className="arab text-2xl font-bold mt-8">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h3>
                        {detail?.ayat?.map((show: any)=>{
                            return(
                                <div className="flex flex-col text-center my-12 text-lg px-3" key={show.nomor}>
                                    <p className="arab py-2">{show.ar}</p>
                                    <p className="py-2">{show.nomor}. {show.idn} </p>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                </> : 
                <>
                    <div className="flex justify-center item-center w-full flex-col">
                        <div className="flex flex-col my-5">
                            <div className="px-3 text-md md:text-lg w-full">
                                <h5 className="text-lg font-bold">Keterangan surat: </h5>
                                <p>Surat ke {detail.nomor} </p>
                                <p className="arab">{detail.nama}</p>
                                <p>{detail.nama_latin} ({detail.arti}), {detail.jumlah_ayat} Ayat</p>
                                <p className="text-justify py-5">{parser(detail.deskripsi)}</p>
                            </div>
                        </div>
                        <div className="text-center my-3">
                            <button className="text-lg font-bold px-3 rounded-full outline outline-offset-2 outline-1 w-max mx-3"><Link href='/' passHref><p>Kembali ke Home</p></Link></button>
                            <button onClick={()=>setBaca(true)} className="text-lg font-bold px-3 rounded-full outline outline-offset-2 outline-1  w-max">Baca {detail.nama_latin}</button>
                        </div>
                    </div>
                </>}
            </>}

        </div>
    )
}