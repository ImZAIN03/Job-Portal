import { useState } from "react"
import Banner from "../Components/Banner"

const Home = () => {
    const [query,setQuery] = useState("")
    const handleInputChange = (event) => {
      setQuery(event.target.value)
    }
    console.log(query);
  return (
    <div className="bg-slate-100">
      <Banner query={query} handleInputChange={handleInputChange}/>
    </div>
  )
}

export default Home