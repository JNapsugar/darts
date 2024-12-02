import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export function DartsListPage() {

    const[dartses,setDartses] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        axios.get("https://darts.sulla.hu/darts")
            .then((res) => res.data)
            .then((data) => setDartses(data))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                
                <div>
                    <p className="h1">Dartsozók</p>
                    {dartses.map((darts, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="h5">Dartsozó neve:<br/> {darts.name}</p>
                            <p className="text-danger">Születési dátum: {darts.birth_date}</p>
                            <p className="text-success">Megnyert világbajnokságok: {darts.world_ch_won}</p>
                            <div className="card-body">
                                <Link to={darts.profile_url} className="fs-6 btn btn-success" target="_blank">Profil link</Link> <br/><br />
                                <Link key={darts.id} to={"/darts/" + darts.id}>
                                    <img alt={darts.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={darts.image_url ? darts.image_url :
                                            "https://via.placeholder.com/400x800"} />
                                </Link>
                                <br />
                                <div>
                                    <br />
                                    <Link to={"/darts/" + darts.id} className='btn btn-primary'><i className="bi bi-text-paragraph fs-3"></i></Link>&nbsp;&nbsp;
                                    <Link to={"/mod-darts/" + darts.id} className='btn btn-warning'><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;
                                    <Link to={"/del-darts/" + darts.id} className='btn btn-danger'><i className="bi bi-trash2 fs-3"></i></Link>
                                </div>      
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}
export default DartsListPage;