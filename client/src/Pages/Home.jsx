import { useEffect, useState } from "react"
import Banner from "../Components/Banner"
import Card from "../Components/Card"
import Jobs from "./Jobs"
import Sidebar from "../sidebar/Sidebar"

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
      setIsLoading(true);
      fetch("jobs.json").then(res => res.json()).then(data => {
        // console.log(data);
        setJobs(data);
        setIsLoading(false);
      })
    }, [])

    // console.log(jobs);

    // Handle Input Changes
    const [query,setQuery] = useState("")
    const handleInputChange = (event) => {
      setQuery(event.target.value)
    }
    // Filter Jobs By Title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    // Radio Filtering
    const handleChange = (event) => {
      setSelectedCategory(event.target.value)
    }  

    // Button Based Filtering
    const handleClick = (event) => {
      setSelectedCategory(event.target.value)
    }

    // caluclate the index range
    const caluclatePageRange = () => {
      const startIndex = (currentPage -1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return {startIndex, endIndex}
    }

    // function for next page
    const nextPage = () => {
      if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
        setCurrentPage(currentPage + 1);  
      }
    }

    // function for the previous page
    const prevPage = () => {
      if(currentPage > 1){
        setCurrentPage(currentPage - 1)
      }
    }

    // Main Function
    const filteredData = (jobs, selected, query) => {
      let filteredJobs = jobs;
      
      // filtering Input Items
      if(query) {
        filteredJobs = filteredItems;
      }

      // category filtering 
if(selected){
      filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate}) => {
        return (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) === parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
        );
      }); 
      console.log(filteredJobs);
    }

      //slice data based on current page
      const {startIndex, endIndex} = caluclatePageRange()
      filteredJobs = filteredJobs.slice(startIndex, endIndex)
      return filteredJobs.map((data, i) => <Card key={i} data={data}/>)

    }

    const result = filteredData(jobs, selectedCategory, query)

  return (
    <div className="bg-slate-100">
      <Banner query={query} handleInputChange={handleInputChange}/>

      {/* main content */}
      <div className=" bg-slate-100 md:grid grid-cols-4 gap-8 lg:px-24">
        {/* left side */}
        <div className="bg-slate-50 p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick}/>
        </div>

        {/* job cards */}
        <div className="col-span-2 bg-slate-50 p-4 rounded-sm">
        {
          isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ? (<Jobs result={result}/>) : <>
          <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>  
          <p>No Data Found!</p>  
          </> 
        }

        {/* pagination */}
        {
          result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={currentPage === 1} className="hover:underline">Previous</button>
              <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className="hover:underline">Next</button>
            </div>
          ) : ""
        }

        </div>
        
        {/* right side */}
        <div className="bg-slate-50 p-4 rounded">Right</div>

      </div>
    
    </div>
  )
}

export default Home