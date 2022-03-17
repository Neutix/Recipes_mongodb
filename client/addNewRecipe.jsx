import React, {useState} from "react";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export function AddNewRecipe() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [time, setTime] = useState("");
    const [topText, setTopText] = useState("");
    const [img, setImg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/recipes/new", {
            method: "post",
            body: JSON.stringify({name, type, recipeType, time, topText, img}),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            console.log("Title to server sent");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add new recipe</h1>
            <Link to={"/"}>
                <button>Hjem</button>
            </Link>
            <div>
                <label>
                    Navn:
                    <input value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Type:
                    <input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    OppskriftType:
                    <input
                        value={recipeType}
                        onChange={(e) => setRecipeType(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Tid:
                    <input value={time} onChange={(e) => setTime(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Tekst:
                    <input value={topText} onChange={(e) => setTopText(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Bilde:
                    <input value={img} onChange={(e) => setImg(e.target.value)}/>
                </label>
            </div>
            <div>
                <button>Legg til</button>
            </div>
            <pre>
        {JSON.stringify(
            {name, type, recipeType, time, topText, img},
            undefined,
            " "
        )}
      </pre>
        </form>
    );
}