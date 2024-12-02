import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink, Link } from 'react-router-dom';

export const DartsDel=()=> {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const[darts,setDarts] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://darts.sulla.hu/darts/${id}`)
            const darts = await res.json();
            setDarts(darts);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
}, [id]);
return (
    <div className="p-5 m-auto text-center content bg-lavender">
        <h3 className="text-dark text-center">Törlendő dartsozó neve: {darts.name}</h3>
        {isPending || !darts.id ? (
            <div className="spinner-border"></div>
        ) : (
                        <div className="card p-4">
                            <p className="text-danger text-center">Születési éve: {darts.birth_date}</p>
                            <p className="text-danger text-center">Megnyert világbajnokságai: {darts.world_ch_won}</p>
                            <div className="card-body d-flex flex-column align-items-center">
                                <Link to={darts.profile_url} className="fs-5 btn btn-success" target="_blank">Profil link</Link><br />
                                <img src={darts.image_url ? darts.image_url : 
                                    "https://via.placeholder.com/400x800"} alt={darts.name} 
                                    className="img-fluid" style={{width: "200px"}}/>
                                <div><br />
                                    <NavLink to={"/"}><button className="bi bi-backspace btn btn-warning">&nbsp;Mégsem</button></NavLink>&nbsp;&nbsp;
                                    <button className="bi bi-trash3 btn btn-danger">&nbsp;Törlés</button>
                                </div>
                        </div>
            <form onSubmit={(event) => {
                event.persist();
                event.preventDefault();
                fetch(`https://darts.sulla.hu/darts/${id}`, {
                    method: "DELETE",
                })
                .then(() =>
                {
                    navigate("/");
                })
                .catch(console.log);
                }}>
                
            </form>   
        </div>
                    
        )}
        </div>
        );
};