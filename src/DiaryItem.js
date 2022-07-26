import { useRef, useState } from "react";
const DiaryItem = ({author,content,created_date,emotion,id,onRemove,onEdit})=>{
    const [isEdit,setIsEdit]= useState(false);
    const [localContent,setLocalContent]=useState("");
    const toggleIsEdit=()=>setIsEdit(!isEdit);
    const localContentInput=useRef();
    const handleQuitEdit=()=>{
        setIsEdit(false)
        setLocalContent(content)
        
    }
    
    
    const handleEdit=()=>{
        if(localContent.length<5){
            localContentInput.current.focus();
            return;
        }
        else{
            onEdit(id,localContent)
            toggleIsEdit();
        }
    }
    


return <div className="DiaryItem">
    
    <div className="info">
        <span>작성자:{author}| 감정 점수:{emotion}|</span>
        <span className="date">
            {new Date(created_date).toLocaleString()}
        </span>
    <br></br>
    
    </div>
    <div className="content">
        {isEdit?<>
        <textarea
        ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
        ></textarea>
        </>:<>{content}</>}
    </div>

    {isEdit?
    <>
    <button onClick={handleQuitEdit}>수정취소</button>
    <button onClick={handleEdit}>수정완료</button>
    </>
    :<>
    <button onClick={()=>{
        console.log(id);
        if(window.confirm("일기를 정말 삭제할까요?")){
            onRemove(id);
        }
    }}>삭제하기</button>
     <button onClick={toggleIsEdit}>수정하기</button></>
     


}
</div>

}

export default DiaryItem