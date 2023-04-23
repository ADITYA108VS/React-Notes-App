import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import database_changed from "../context/database_changed";
export default function Home(){
    const [array,set_array]=useState([]);
    const {changed,set_changed}=useContext(database_changed);

    // getting all data again from database if the database is changed using database_changed state
    useEffect(()=>{
        async function get_all(){
            try{
                const response= await fetch('http://localhost:3000/home',{
                    'method':"GET"
                });
                
                const rjson= await response.json();
                return rjson;
            }catch(error){
                return error;
            }
        };
        get_all().then((data)=>{
            const updated_array = [];
            for(let i=0;i<data.length;i++)
            {
                const value=data[i];
                updated_array.push(<Card roll={value.user_id}
                    key={value.user_id}
                    id={value.user_id}
                    name={value.name}
                    />);
            }
            set_array(updated_array);
            // again setting the database changed state as false
            set_changed(false);
        }).catch((error)=>{
            console.log(error);
        })

    },[changed,set_changed]);
    
    return(
        <div style={{"backgroundColor":"palegreen" ,"display": "flex", "flexWrap": "wrap" ,"padding":"50px"
    }}>
            {
                array
            }
        </div>
    )
}