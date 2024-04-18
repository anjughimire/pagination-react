import React, { useState } from 'react'
import Data from './Data.json'

function Page() {
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(Data.length/recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const[search, setSearch] = useState("");

    return (
        <div>
            <input type="text" placeholder="Search Company...."
            onChange={(e)=>setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                    <th>SNo</th>
                    <th>company</th>
                    <th>contact</th>
                    <th>country</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    records.filter((data)=> {
                        return search.toLowerCase() === ' '? data : data.company.toLowerCase().includes(search)
                    }).map((data, index)=>(
                        <tr key={index}>
                            <td>{10 *(currentPage-1) + index+1}</td>
                            <td>{data.company}</td>
                            <td>{data.contact}</td>
                            <td>{data.country}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className='center'>
                    <li className='pagination'><a href="#" onClick={prePage}>Prev</a></li>
                        {
                            numbers.map((data, index) => {
                                <li className={currentPage === data? 'active': ''} key={index}>
                                    <a href="#" className='pagination' onClick={()=> changeCPage(data)} >{data}</a>
                                </li>
                            })
                        }
                        <li className='pagination'><a href="#" onClick={nextPage}>Next</a></li>
                </ul>
            </nav>
        </div>
    )
    function prePage(){
        if(currentPage!== 1){
            setCurrentPage(currentPage-1)
        }
    }
    function changeCPage(SNo){
        (setCurrentPage(SNo))
    }
    
    function nextPage(){
        if(currentPage!== npage){
            setCurrentPage(currentPage+1)
        }
    }
}

export default Page
