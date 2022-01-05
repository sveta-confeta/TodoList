import React from "react";
import s from './../TodoList.module.css'
 type ButtonPropsType={
     name:string
     callback:()=>void
 }
export const Button=(props:ButtonPropsType)=>{
     const onClickHandler=()=>{
         props.callback()
     }
    return(

            <button className={s.btn}onClick={onClickHandler}>{props.name}</button>
    )
}