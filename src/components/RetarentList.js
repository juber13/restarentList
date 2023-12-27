import { useState , useEffect } from 'react'
import React from 'react'


const RetarentList = () => {
 const [list , setList] = useState([]);
 const [searcInput , setSearchInput] = useState("");
 const [ratingValue , setRatingValue] = useState(0);


 const fetchdata = async() => {
        try {
            const response = await fetch("https://cdn.adpushup.com/reactTask.json");
            const data = await response.json();
            const allList = data.map(item => {
                return item.restaurantList;
            })
            setList(allList.flat());
        } catch (error) {
            console.error(error);
        }
 }


 const filterRes = (data) => {
    return data.filter(item => Number(Math.floor(item.ratings)) === Number(ratingValue)  || item.name.toLowerCase().includes(searcInput.toLowerCase()))
 }

//  const ratingFilter = (e) =>{
//     setRatingValue(e.target.value);
//    if(searcInput !== ""){
//     const newList = list.filter(item => item.ratings === ratingValue);
//     setList(newList);
//    }
//  }
 
 
   useEffect(() => {
     fetchdata();
    },[])
    

  return (
    <div className='container'>
      <div className='w-4/5 m-auto p-6 flex'>
        <input className='border p-4 mr-3 w-3/6 text-xl' type="text" placeholder='Search...' value={searcInput} onChange={(e) => setSearchInput(e.target.value)}/>
        <input className='border p-4 mr-3 w-3/6 text-xl' type="number" value={ratingValue} onChange={(e) => setRatingValue(e.target.value)} placeholder='Rating'/>
    </div>
    <div className='restaurent_list flex flex-wrap gap-12 items-center justify-center p-2 w-4/5 m-auto bg-red-100' style={{marginTop:"10px"}}>
        {filterRes(list).map((item , index) => {
            console.log(Number(item.ratings))
            return(
             <div className='item border w-60 h-60 flex flex-col justify-between bg-emerald-50' key={index}>
               <div className='details p-3'>
                <h2 className='text-xl'>@{item.name}</h2>
                <small className='text-xl'>{item.ratings ? [...Array(Math.floor(item.ratings))].map((_, i) => "⭐") : <small className='text-red-600'>"No Rating Yet.."</small>}</small>
                <p>Food Type : {item.food_types[0]}</p>
                <p>Price : <strong>{item.price_for_two}</strong></p>
               </div>

                <div className="footer bg-slate-100 w-full p-4">
                    <a href="https://www.zomato.com/ncr/collections" target="_blank" rel="noreferrer">🥣Visit Menu</a>
                </div>
             </div>   
            )
        })}
    </div>
 </div>
  )
}

export default RetarentList