import React, { useState ,useRef,useEffect } from 'react';
import logo from "./assets/lmc_logo_white.png"
import {useNavigate} from 'react-router-dom';

function Form4() {
    const firstinputref = useRef(null);
    useEffect(()=>{
      firstinputref.current?.focus();
    },[])
    const navigate = useNavigate();
  const [sameAddress, setSameAddress] = useState(false);

 const handleToggle = () => {
  setSameAddress(prev => {
    const newValue = !prev; // new toggle state

    setForm4input(form => ({
      ...form,
      postaladdress: newValue ? form.address1 : "",
      postalcity: newValue ? form.city : "",
      postalpostcode: newValue ? form.postcode : ""
    }));

    return newValue;
  });
};

  const [form4input ,setForm4input] = useState({
    address1:"",
    address2:"",
    city:"",
    postcode:"",
    postaladdress:"",
    postalcity:"",
    postalpostcode:""
  })
   const handleChange=(e)=>{
    setForm4input({...form4input,[e.target.name]:e.target.value})
   }
 const handlesubmit = async (e) => {
  e.preventDefault();

  const patientId = localStorage.getItem("patient_id");

  if (!patientId) {
    alert("Patient ID missing");
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/patient/${patientId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form4input)
    });

    if (!response.ok) {
      alert("Error saving Form 4 data");
      return;
    }

    navigate("/form5");

  } catch (error) {
    console.error(error);
    alert("Network error");
  }
};


  return (
    <header style={{backgroundColor:"whitesmoke" , height:"1000px"}} >
     <div className='row d-flex justify-content-center'>
        <div className='col-12 justify-content-center d-flex'>
              <nav className="navbar  ">
                  <section className='nav-section' >
                  <span><img className='sec-logo' src={logo} alt="" /></span> 
                  <span><h4 className='sec-h4'>Lakesh Medical</h4></span> 
                  </section>
              </nav>
        </div>
      </div>
      <div className="container form-container mt-3">
        <div className="col-12 text-center mt-2">
          <h5 className="form-h5">New Patient Form</h5>
        </div>

         <div className='row d-flex justify-content-center'>
            <div className='col-7'>
              <ul className="progressbar">
              <li className="active  completed" data-tooltip="Name"></li>
              <li className='active completed' data-tooltip="Contacts"></li>
              <li className='active' data-tooltip="Address"></li>
              <li data-tooltip="Medicare"></li>
              <li data-tooltip="DVA"></li>
            </ul>
            </div>
          
          </div>
        <form   onSubmit={handlesubmit}>
          {/* form4-card1 */}
          <div className='row d-flex justify-content-center'>
            <div className='col-7'>
              <div className='card form4-card1 mt-4'>
            <div className="row d-flex justify-content-center mt-3 mb-3 mx-2 ">
            <div className="col-12 col-md-6 mb-2">
              <label >Address1</label>
                <input type="text" ref={firstinputref}  className="form4-input mt-2" name="address1" placeholder="Address1" onChange={handleChange} value={form4input.address1} />
            </div>
            <div className="col-12 col-md-6 ">
              <label htmlFor="address2">Address2</label>
                <input type="text" name="address2" className="form4-input mt-2" placeholder="Address2" onChange={handleChange} value={form4input.address2}  />
            </div>
          </div>


          <div className="row d-flex justify-content-center  mb-2 mx-2">
            <div className="col-12 col-md-6 mb-2">
              <label >City </label>
                <input type="text" name="city" className="form4-input mt-2" placeholder="City" onChange={handleChange} value={form4input.city}  />
            </div>
             <div className="col-12 col-md-6 mb-2">
              <label >Postcode </label>
                <input type="number" name="postcode" className="form4-input mt-2" placeholder="Postcode" onChange={handleChange} value={form4input.postcode}  />
            </div>
          </div>
                {/* ✅ Toggle Switch Below Postcode */}
            <div className="row   mt-2 form-check form-switch mb-4 mx-2 ">
            <div className="col-12 ">
              <label className="form-check-label ms-2" htmlFor="sameAddressSwitch">
                <input
                className="form-check-input mt-2  "
                type="checkbox"
                id="sameAddressSwitch"
                checked={sameAddress}
                onChange={handleToggle}
                style={{ cursor: 'pointer' }}
              />
                Postal address is same as above
              </label>
            </div>
            </div>

            <div className="row d-flex justify-content-center mt-2 mb-3 mx-2">
            <div className="col-12 col-md-6 mb-2">
              <label>PostalAddress</label>
                <input type="text" name="postaladdress" className="form4-input mt-2" placeholder="PostalAddress" onChange={handleChange} value={form4input.postaladdress}  />
            </div>
             <div className="col-12 col-md-6 ">
              <label>postalCity</label>
                <input type="text" name="postalcity" className="form4-input mt-2" placeholder="City" onChange={handleChange} value={form4input.postalcity}  />
             </div>
            </div>

           <div className="row  mx-2 mb-3">
            <div className="col-12"> 
              <label htmlFor="postcode">PostalPostcode</label>
              <div className="row-7 mt-1">
                <input type="number" name="postalpostcode" className="form4-input" placeholder="Postcode" onChange={handleChange} value={form4input.postalpostcode} />
              </div>
            </div>
          </div>
            
          <div className='row d-flex  justify-content-center mb-3 mt-2 mx-1 '>
                            <div className='col-12 d-flex justify-content-center  '>

                              <div className='col-3 d-flex justify-content-start' onClick={()=>navigate("/form3")} >
                                  <button  type='submit' className='form4-button-back  ' >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left mx-1" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8"/>
                                </svg>
                                  Back
                                </button>
                              </div>
                              <div className='col-9 d-flex justify-content-end' >
                                  <button  type='submit' className='form2-button  '  >Next
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                </svg>
                                </button>
                              </div>
                            
                               
                          </div>      
                          </div>
              </div>
            </div>
          </div>
            
         
           {/* form4-card2 */}

           

          
        </form>
      </div>
    </header>
  );
}

export default Form4;
