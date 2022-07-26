import DiaryItem from "./DiaryItem";

const DiaryList= ({diaryList,onRemove,onEdit})=>{

    return <div className="DiaryList">
        일기 리스트
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it)=>(<div>
                <DiaryItem onEdit={onEdit} key={it.id} {...it} onRemove={onRemove}></DiaryItem>
            </div>))}
        </div>
    </div>
};

DiaryList.defaultProps={
    diaryList:[],

}
export default DiaryList;