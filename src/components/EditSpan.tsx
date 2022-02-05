import React, {ChangeEvent, useState} from 'react';




type EditSpanPropsType={
    title:string //компонента получает строку
    apdateTask:(title:string)=>void//нам нужен колбэк который подхватит новое значение инпута отредактипованную унесет его в родителя
}

export const EditSpan = (props:EditSpanPropsType) => {
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
       props. apdateTask(title);
        setEditMode(false);
    }
    return (

        editMode
            // ?  <><input onChange={onChangeHandler} value={title} autoFocus onBlur={offEditMode}/>
            //     {/*<ButtonOne name={'x'}/>*/}
            //
            // </>
            // : <><span onDoubleClick={onEditMode}>{props.title}</span> </>
            ? <input onChange={onChangeHandler} value={title} autoFocus onBlur={offEditMode}/>
            : <span onDoubleClick={ onEditMode}>{props.title}</span>
    );
};
