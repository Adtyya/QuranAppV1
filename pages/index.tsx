import Navbar from "../components/navbar"
import Hero from "../components/hero"
import Content from "../components/content"
import { useEffect, useState } from "react"

export default function Home()
{
  return(
    <div className="container mx-auto">
      <Navbar />
      <Content />
    </div>
  )
}