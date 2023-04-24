import React, { useContext, useState } from "react";
import database_changed from "../context/database_changed";
import { post_url } from "../url/url_endpoints";
export default function InputField() {

    //getting the added and setadded_state from global context file
    const {set_changed}=useContext(database_changed);
    

    const [name, setname] = useState("");
    const [user_id, setuserid] = useState("");


    //setting the name on each change in input
    function onchange_name(event) {
        setname(event.target.value);
    }

    //setting the user_id on each change in input
    function onchange_user(event) {
        setuserid(event.target.value);
    }

    //making a post request to database to add a user
    async function posta() {
        try {
            const response = await fetch(post_url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "roll": user_id
                })
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }

    // making post request for addition of data
    function function_post() {
        if(name.length === 0 || user_id.length ===0)
        {
            alert("Please fill the full field")
            return;
        }
        posta().then((response) => {
            
            if(response.status === 200)
            {
                set_changed(true);
            }
            else
            {
                alert(`user with roll ${user_id} already exists`);
            }
           
        }).catch((error) => {
            console.log(error);
        })
       
    }

    return (
        <div style={{"backgroundColor":"skyblue", "justifyContent":"center","alignItems":"center","display":"flex","padding":"20px"}}>
            <input style={{"margin":"10px","height":"30px","width":"200px","border":"4px solid black","borderRadius":"5px"}} id="user_id" placeholder="ENTER ROLL" onChange={onchange_user}></input>
            <input style={{"margin":"10px","height":"30px","width":"200px","border":"4px solid black","borderRadius":"5px"}} id="name" placeholder="ENTER NAME" onChange={onchange_name}></input>
            <button style={{"margin":"10px","height":"40px","border":"4px solid black","borderRadius":"5px"}} type="submit" onClick={function_post}> ADD</button>
        </div>
    )
}