import logo from './logo.svg';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import Lifecycle from './Lifecycle';
import OptimzeTest from './OptimizeTest';

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



const App=()=> {
  const [data,setData]=useState([]);
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
    setData(initData);
  }

  useEffect(()=>{
    getData();
  },[])
const dataId= useRef(0);
const onCreate= (author,content,emotion) =>{
  const created_date=new Date().getTime();
  const newItem={
    author,
    content,
    emotion,
    created_date,
    id:dataId.current
  };
  dataId.current+=1;
  setData([newItem,...data]);

};

const onEdit=(targetId,newContent)=>{
  setData(
    data.map((it)=>it.id===targetId ? {...it,content:newContent}:it)
  )
}
const onRemove=(targetId)=>{
  
  const newDiaryList = data.filter((it) => it.id !==targetId);
  setData(newDiaryList)
}

const getDiaryAnalysis=useMemo(()=>{
  

  const goodCount=data.filter((it)=>it.emotion>=3).length;
  const badCount=data.length-goodCount;
  const goodRatio=(goodCount/data.length)*100;
  return {goodCount,badCount,goodRatio}

},[data.length])

const {goodCount,badCount,goodRatio}=getDiaryAnalysis;
  return (
    <div className="App">
    <OptimzeTest></OptimzeTest>
    <DiaryEditor onCreate={onCreate}></DiaryEditor>
    <div>전체일기 :{data.length}</div>
    <div>기분 좋은 일기 개수: {goodCount}</div>
    <div>기분 나쁜 일기 개수: {badCount}</div>
    <div>기분 좋은 일기 비율: {goodRatio}</div>
    <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove}></DiaryList>
    </div>
  );
}

export default App;