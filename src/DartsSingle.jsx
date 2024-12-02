import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsSingle = () => {
    const { dartsId } = useParams();
    const [darts, setDarts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setPending(true);
            try {
                const valasz = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`)
                setDarts(valasz.data);
            }
            catch (hiba) {
                console.log(hiba);
            }
            finally {
                setPending(false);
            };    
    };
    fetchData();
    }, [dartsId]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Dartsozó neve: {darts.name}</h2>
        {isPending || !dartsId  ? (<div className="spinner-border"></div>) : (
            <div className="row row-cols-2 justify-content-center align-items-center">
                    <div className="col">
                        <div className="card h-250 p-4">
                            <p className="text-danger text-center">Születési éve: {darts.birth_date}</p>
                            <p className="text-danger text-center">Megnyert világbajnokságai: {darts.world_ch_won}</p>
                            <div className="card-body d-flex flex-column align-items-center">
                                <Link to={darts.profile_url} className="fs-5 btn btn-success" target="_blank">Profil link</Link><br />
                                <img src={darts.image_url ? darts.image_url : 
                                    "https://via.placeholder.com/400x800"} alt={darts.name} 
                                    className="img-fluid" style={{width: "200px"}}/>
                            </div>
                            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                                <Link to="/" className='btn btn-primary'><i className="bi bi-backspace-fill fs-3"></i></Link>&nbsp;&nbsp;
                                <Link to={"/mod-darts/" + darts.id} className='btn btn-warning'><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;
                                <Link to={"/del-darts/" + darts.id} className='btn btn-danger'><i className="bi bi-trash2 fs-3"></i></Link>
                            </div>
                        </div>

                    </div>
            </div>
        )}
        </div>
    );
}