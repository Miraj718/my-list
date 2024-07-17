import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Listdata() {
 
    const [listdata, setlistdata] = useState([]);
    const [selectitem, setselectitem] = useState(null);
    const [showdata, setshowdata] = useState(false)

    const fetchlist = () => {
        fetch("http://localhost:3000/productname")
            .then((response) => response.json())
            .then((data) => {
                setlistdata(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    useEffect(() => {
        fetchlist();
    }, []);


    const handonDelete = (id) => {
        fetch("http://localhost:3000/productname/" + id, {
            method: "DELETE"
        })
            .then(() => {
                setlistdata(listdata.filter(item => item.id !== id));
            })
            .catch(err => console.log(err));
    };

    const navigate = useNavigate();

    const handleonupdate = (id) => {
        navigate(`/edit/${id}`);
    }

   const handleidclick = (item) => {
    setselectitem(item);
    setshowdata(true);
   };

  const handleCloseModal = () => {
    setshowdata(false);
    setselectitem(null);
  }
    

  return (

    <div className='container'>
       <h2>List of data:-</h2>
            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Select Car</th>
                        <th scope="col">SKU NO</th>
                        <th scope="col">Display</th>
                        <th scope="col">Action</th>
                        {/* <th scope="col">Update</th> */}
                    </tr>
                </thead>
                <tbody>

                {listdata.length === 0 ? (
                            <tr>
                                <td colSpan="6">No data available</td>
                            </tr>
                        ) : (
                    listdata.map((listItem, index) => (

                            <tr key={listItem.id}>
                                {/* <th scope="row">{index + 1}</th> */}
                                <td onClick={() => handleidclick(listItem)} style={{ cursor: 'pointer' }}>{listItem.id}</td>
                                <td>{listItem.name}</td>
                                <td>{listItem.select}</td>
                                <td>{listItem.text}</td>
                                <td>{listItem.display}</td>
                                {/* <Link></Link> */}
                                {/* <td><button onClick={() => handleupdate(listItem.id)}>Update</button></td> */}
                                <td><button onClick={() => handonDelete(listItem.id)}>Delete</button>
                                <button className="text-dark" style={{ marginLeft: '5px' }} onClick={() => handleonupdate(listItem.id)}>Update</button></td>
                                {/* <td></td> */}
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
            {showdata && selectitem && (
                <Modal item={selectitem} onClose={handleCloseModal}/>
            )}
    </div>
  )
}


function Modal({ item, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Item Details</h3>
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Product Name:</strong> {item.name}</p>
                <p><strong>Select Car:</strong> {item.select}</p>
                <p><strong>SKU NO:</strong> {item.text}</p>
                <p><strong>Display:</strong> {item.display}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
