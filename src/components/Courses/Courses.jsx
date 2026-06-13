import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Courses.css";


const BASE_URL =
"https://brillon-tasks-1.onrender.com/api/v1";



const Courses=({home})=>{


const navigate=useNavigate();


const [items,setItems]=useState([]);

const [level,setLevel]=useState("departments");

const [title,setTitle]=useState("Departments");

const [history,setHistory]=useState([]);

const [loading,setLoading]=useState(true);







// IMAGE


const getImage=(name="")=>{


name=name.toLowerCase();



if(name.includes("tech"))

return "https://images.unsplash.com/photo-1498050108023-c5249f4df085";


if(name.includes("ai"))

return "https://images.unsplash.com/photo-1677442136019-21780ecad995";


if(name.includes("business"))

return "https://images.unsplash.com/photo-1552664730-d307ca884978";



return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f";


};










// ================= API FIX =================


const extractArray=(data)=>{



console.log(
"API RESPONSE",
data
);




if(Array.isArray(data))

return data;




if(Array.isArray(data.data))

return data.data;




if(Array.isArray(data.data?.departments))

return data.data.departments;




if(Array.isArray(data.data?.categories))

return data.data.categories;




if(Array.isArray(data.data?.domains))

return data.data.domains;




if(Array.isArray(data.data?.tracks))

return data.data.tracks;




if(Array.isArray(data.data?.courses))

return data.data.courses;





if(Array.isArray(data.departments))

return data.departments;



if(Array.isArray(data.categories))

return data.categories;



if(Array.isArray(data.domains))

return data.domains;



if(Array.isArray(data.tracks))

return data.tracks;



if(Array.isArray(data.courses))

return data.courses;




return [];

};










const apiCall=async(url)=>{


const token=

localStorage.getItem("token")

||

localStorage.getItem("userToken");




const res=await fetch(

BASE_URL+url,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);




const data=await res.json();




return extractArray(data);



};











// FIRST LOAD


const loadDepartments=async()=>{


try{


setLoading(true);



const result=

await apiCall(

"/hierarchy/departments"

);



setItems(result);


setLevel("departments");


setTitle("Departments");



}


catch(e){

console.log(e);

}


finally{

setLoading(false);

}



};










useEffect(()=>{


loadDepartments();


},[]);











// CARD CLICK


const openItem=async(item)=>{


try{


setLoading(true);





setHistory([

...history,


{

items,

level,

title

}


]);







let result=[];







if(level==="departments"){



result=await apiCall(

`/hierarchy/categories?departmentId=${item._id}`

);


setLevel("categories");


}





else if(level==="categories"){



result=await apiCall(

`/hierarchy/domains?categoryId=${item._id}`

);


setLevel("domains");


}






else if(level==="domains"){



result=await apiCall(

`/hierarchy/tracks?domainId=${item._id}`

);



setLevel("tracks");


}







else if(level==="tracks"){



result=await apiCall(

`/content/courses?trackId=${item._id}`

);



setLevel("courses");


}






else if(level==="courses"){



navigate(

`/course-details/${item._id}`

);



return;


}








setItems(result);



setTitle(

item.name ||

item.title

);



}



catch(e){


console.log(e);


}


finally{


setLoading(false);


}



};










// BACK


const goBack=()=>{


const last=

history[history.length-1];



if(!last)

return;




setItems(last.items);

setLevel(last.level);

setTitle(last.title);



setHistory(

history.slice(0,-1)

);


};









if(loading)

return <h1>Loading...</h1>;











const list=

Array.isArray(items)

?

(home ? items.slice(0,3):items)

:

[];











return(


<div className="courses-section">





<h1 className="courses-title">

{title}

</h1>





{

history.length>0 &&


<button

className="view-more-btn"

onClick={goBack}

>

← Back

</button>


}








<div className="courses-container">





{

list.length>0 ?



list.map(item=>(




<div

className="course-card"

key={item._id}

>





<img

src={

item.image ||

getImage(

item.name ||

item.title

)

}

/>







<div className="course-content">



<span className="course-category">

{level}

</span>





<h2>

{

item.name ||

item.title

}

</h2>





<p>

{

item.description ||

"Explore learning content"

}

</p>







<button

onClick={()=>openItem(item)}

>


{

level==="courses"

?

"View Details"

:

"Open"

}


</button>






</div>




</div>




))




:



<h2>

No Data Found

</h2>


}








</div>





</div>


);


};




export default Courses;