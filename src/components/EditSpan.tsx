import React, {ChangeEvent, useState} from 'react';

type EditSpanPropsType={
    title:string
    // changeTitle:(editTitle:string)=>void//нам нужен колбэк который подхватит новое значение инпута и унесет его в родителя
}

const EditSpan = (props:EditSpanPropsType) => {
    //у титла должно быть два состояния: обычное и для редактирования. это прямое показание для создания локального стейта
    let[editMode,setEditMode]=useState<boolean>(false);
    //у нас появился инпут для редактирования тасок, а это значит нужен локстейт хранить инфу в инпуте до отправки в BLL
    const [title, setTitle] = useState<string>( props.title);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  //функция для инпута
        setTitle(event.currentTarget.value)
    }


    const onEditMode = () => {
      setEditMode(true);
    }

    const offEditMode=()=>{
        // props.changeTitle(title);
        setEditMode(false);
    }
    return (
        editMode ? <input onChange={onChangeHandler} value={title} autoFocus onBlur={offEditMode}/> : <span onDoubleClick={onEditMode}>{props.title}</span>

    );
};

export default EditSpan;