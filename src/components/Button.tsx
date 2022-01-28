import React from "react";
import s from './../TodoList.module.css'
import {Button} from "@material-ui/core";


 type ButtonPropsType={
     name:string
     callback?:()=>void
 }
export const ButtonOne=(props:ButtonPropsType)=>{
     const onClickHandler=()=>{
         // props.callback()
     }
    return(

            <Button variant={'contained'} size={'small'} style={{maxWidth: '27px',minHeight: '23px', minWidth:'27px', maxHeight:'23px'}} className={s.btn} onClick={onClickHandler}>{props.name}</Button>
    )
}