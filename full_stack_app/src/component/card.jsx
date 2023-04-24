import React, { useContext } from "react";
import database_changed from "../context/database_changed";
import { delete_url } from "../url/url_endpoints";
export default function Card(props) {
    const { set_changed } = useContext(database_changed);
    const id = props.id;
    const name = props.name;
    function delete_record() {
        async function delete_from_db() {
            try {
                const response = await fetch(delete_url, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": name,
                        "roll": id
                    })
                });
                return response;
            } catch (error) {
                return error;
            }
        }


        delete_from_db().then((response) => {
            set_changed(true);
        }).catch((error) => {
            console.log(`error happened while deleting record ${error}`);
        })

    }
    return (
        <div style={{
            "color": "black",
            "display": "inline-block", "padding": "10px",
            "backgroundColor": "cyan", "textAlign": "center",
            "border": "5px solid black", "margin": "10px",
            "borderRadius": "13px", "width": "fit-content"
        }}>

            <h1>{id}</h1>
            <h2>{name}</h2>
            <button style={{ "backgroundImage": "url(https://w7.pngwing.com/pngs/378/604/png-transparent-computer-icons-button-x-logo-web-button-symbol.png)" }} onClick={delete_record}>DELETE</button>
        </div>
    )
}
