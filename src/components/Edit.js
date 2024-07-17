import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const [formData, setFormData] = useState({
        name: "",
        text: "",
        select: "",
        checkbox: null,
    });

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/productname/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData(data); 
            })
            .catch(err => console.log(err))
    }, [id]);
 

    const nagigate = useNavigate()


    const handleSubmit = event => {
        event.preventDefault();
      fetch(`http://localhost:3000/productname/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
      })
      .then(res => {
        alert("data updated successfully");
        nagigate('/listdata');
        setFormData(res)
      })
    };

    return (
        <div className="container">
            <div>
                <h1>Update List Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            placeholder="Enter Company Name"
                            name="name"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="selectCar">Select Car</label>
                    <select
                        className="form-control"
                        id="selectCar"
                        value={formData.select}
                        onChange={e => setFormData({...formData, select: e.target.value})}
                    >
                        <option value="">Select</option>
                        <option value="Porsche">Porsche</option>
                        <option value="Bmw">Bmw</option>
                        <option value="Kia">Kia</option>
                        <option value="Audi">Audi</option>
                        <option value="XUV700">XUV 700</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="skuNo">SKU NO</label>
                    <input
                        type="text"
                        className="form-control"
                        id="skuNo"
                        placeholder="Enter SKU NO"
                        value={formData.text}
                        onChange={e => setFormData({...formData, text: e.target.value})}
                    />
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="displayCheckbox"
                        value={formData.checkbox}
                        onChange={e => setFormData({...formData, checkbox: e.target.value})}
                    />
                    <label className="form-check-label" htmlFor="displayCheckbox">
                        Display
                    </label>
                </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        edit
                    </button>
                </form>
            </div>
        </div>
    );
}
