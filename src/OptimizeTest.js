import React,{ useEffect, useState } from "react"

const CounterA=React.memo(({count})=>{
    useEffect=(()=>{
        console.log(`Counter A change ${count}`)
    })
    return <div>{count}</div>
})

const CounterB=({obj})=>{
    useEffect=(()=>{
        console.log(`Counter B change ${obj.count}`)
    })
    return <div>{obj.count}</div>
}

const areEqual=(prevProps,nextProps)=>{
    if(prevProps.obj.count === nextProps.obj.count){
    return true
    }
    return false
}
const MemorizedCounterB= React.memo(CounterB,areEqual)

const OptimzeTest=()=>{


    const [count,setCount]=useState(1);
    const [obj,setObj]=useState({
        count:1,
});
    return (<div style={{padding:50}}>
        <h2>Counter A</h2>
        <CounterA count={count}></CounterA>
        <button onClick={()=>setCount(count)}>Abutton</button>

        <h2>Counter B</h2>
        <MemorizedCounterB obj={obj}></MemorizedCounterB>
        <button onClick={()=>setObj({
            count:obj.count
        })}>B button</button>   

    </div>);
}

export default OptimzeTest