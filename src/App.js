import logo from './logo.svg';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useCallback, useEffect, useMemo, useReducer} from 'react';
import { useRef } from 'react';
import Lifecycle from './Lifecycle';

// const dummyList=[
//   {
//     id:1,
//     author:"송하윤",
//     content:"하이",
//     emotion:5,
//     created_date:new Date().getTime(),
//   },
//   {
//     id:2,
//     author:"송하윤2",
//     content:"하이2",
//     emotion:2,
//     created_date:new Date().getTime(),
//   },
//   {
//     id:3,
//     author:"송하윤3",
//     content:"하이3",
//     emotion:3,
//     created_date:new Date().getTime(),
//   }
// ]

const reducer=(state,action)=>{
  switch(action.type){
    case 'INIT':{
      return action.data
    }

    case "CREATE":{
      const created_date=new Date().getTime();
      const NewItem={
        ...action.data,
        created_date
      }
      return [NewItem,...state]
    }
    case "REMOVE":{
      return state.filter((it)=>it.id!==action.targetId)}
    case "EDIT":
      return state.map((it)=>it.id===action.targetId?{...it,content:action.newContent} : it)

    default:
      return state;
  }
}


const App=()=> {
  // const [data,setData]=useState([])
  
  const [data,dispatch]=useReducer(reducer,[])
  const getData=async()=>{
    const res=await fetch('https://jsonplaceholder.typicode.com/comments')
    .then((res)=>res.json())
    console.log(res);

    const initData=res.slice(0,20).map((it)=>{
      return{
        author:it.email,
        content:it.body,
        emotion: Math.floor(Math.random()*5+1),
        created_date: new Date().getTime(),
        id:dataId.current++
      };
    })
    dispatch({type:"INIT",data:initData})
    
  }
  
  useEffect(()=>{
    getData();
  },[])
const dataId= useRef(0);


const onCreate= useCallback((author,content,emotion) =>{

  dispatch({type:"CREATE",data:{author,content,emotion,id:dataId.current}})
  const created_date=new Date().getTime();
  
  dataId.current+=1;


},[]);

const onEdit=useCallback((targetId,newContent)=>{
  dispatch({type:"EDIT",targetId,newContent})
},[])
const onRemove=useCallback((targetId)=>{
  dispatch({type:"REMOVE",targetId})
  
  
},[])

const getDiaryAnalysis=useMemo(()=>{
  

  const goodCount=data.filter((it)=>it.emotion>=3).length;
  const badCount=data.length-goodCount;
  const goodRatio=(goodCount/data.length)*100;
  return {goodCount,badCount,goodRatio}

},[data.length])

const {goodCount,badCount,goodRatio}=getDiaryAnalysis;
  return (
    <div className="App">
    
    <DiaryEditor onCreate={onCreate}></DiaryEditor>
    <div>전체일기 :{data.length}</div>
    <div>기분 좋은 일기 개수: {goodCount}</div>
    <div>기분 나쁜 일기 개수: {badCount}</div>
    <div>기분 좋은 일기 비율: {goodRatio}</div>
    <DiaryList key={data.id} onEdit={onEdit} diaryList={data} onRemove={onRemove}></DiaryList>
    </div>
  );
}

export default App;
