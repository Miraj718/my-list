import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Form() {

    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [select, setSelect] = useState("");
    const [show, setshow] = useState(false);
    const [hide, sethide] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleValidation = () => {
        let formIsValid = true;
        let errors = {};

        // Product Name validation
        if (name.length > 20) {
            formIsValid = false;
            errors["name"] = "Product Name cannot exceed 20 characters";
        }

        // SKU number validation (alphanumeric)
        if (!/^[a-z0-9]+$/i.test(text)) {
            formIsValid = false;
            errors["text"] = "SKU NO must be alphanumeric";
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const formData = {
                name: name,
                text: text,
                select: select,
                display: show? "Show": "Hide"
            };
            fetch("http://localhost:3000/productname", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => {
                    alert("Data submitted successfully");
                    navigate('/listdata');
                })
                .catch(error => {
                    console.error("Error submitting data:", error);
                });
        }
    };

    return (
        <div className="container">
            <div>
                <h1>Product List Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Product Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <span style={{ color: "red" }}>{errors["name"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectCar">Select Car</label>
                        <select
                            className="form-control"
                            id="selectCar"
                            value={select}
                            onChange={(event) => setSelect(event.target.value)}
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
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                        />
                        <span style={{ color: "red" }}>{errors["text"]}</span>
                    </div>
                    {/* <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="displayCheckbox"
              checked={checkbox}
              onChange={(event) => setCheckbox(event.target.checked)}
            />
            <label className="form-check-label" htmlFor="displayCheckbox">
              Display
            </label>
          </div> */}
            <label className="form-check-label" htmlFor="displayCheckbox">
              Display:-
            </label>
                    <div class="form-check">
                        <input class="form-check-input" 
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1" 
                       value={show}
                       onChange={(event) => setshow(event.target.value)}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Show
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                         class="form-check-input"
                         type="radio" 
                         name="flexRadioDefault" 
                         id="flexRadioDefault2"
                         value={hide}
                         onChange={(event) => sethide(event.target.value)}
                         />
                        <label class="form-check-label" for="flexRadioDefault2">
                           Hide
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
