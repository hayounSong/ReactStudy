import React,{useEffect,useState} from "react"

const Lifecycle=()=>{
    const [count,setCount]=useState(0);
    const [text,setText]=useState("");
    useEffect(() => {

        console.log("Mount");
    },[count]);
    return <div>




        {count}
        <button onClick={()=>{
            setCount(count)
        }}>+</button>

        <div>
            <input value={text} onChange={(e)=>setText(e.target.value)}></input>
        </div>
    </div>

}

export default Lifecycle