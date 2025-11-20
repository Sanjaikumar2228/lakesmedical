import React, { useState, useEffect ,useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/lmc_logo_white.png";
import axios from "axios";

function Form6() {
  const firstinputref = useRef(null);
  useEffect(()=>{
    firstinputref.current?.focus();
  },[])
  const navigate = useNavigate();
  const location = useLocation();

  // First try location.state, fallback to localStorage
  const [patientId, setPatientId] = useState(location.state?.patient_id || localStorage.getItem("patient_id"));

  useEffect(() => {
    if (!patientId) {
      alert("Patient ID not found. Please start from Form1.");
      navigate("/");
    }
  }, [patientId, navigate]);

  const [form6input, setForm6input] = useState({
    pensioncode: "",
    pensionno: "",
    pensionexpiry: "",
    dvacode: "",
    dvanumber: "",
  });

  const handleChange = (e) => {
    setForm6input({ ...form6input, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!patientId) return;

  try {
    // Remove empty fields
    const payload = {};
    Object.keys(form6input).forEach(key => {
      if (form6input[key] !== "" && form6input[key] !== null) {
        payload[key] = form6input[key];
      }
    });

    const response = await axios.patch(
      `http://127.0.0.1:8000/api/patient/${patientId}/`,
      payload
    );

    console.log("Updated successfully:", response.data);
    navigate("/form7");

  } catch (error) {
    console.error("Error updating:", error);
    alert("Error submitting form data");
  }
};


  return (
    <header style={{ backgroundColor: "whitesmoke", height: "1000px" }}>
      <div className='row d-flex justify-content-center'>
        <div className='col-12 justify-content-center d-flex'>
          <nav className="navbar">
            <section className='nav-section'>
              <span><img className='sec-logo' src={logo} alt="" /></span>
              <span><h4 className='sec-h4'>Lakesh Medical</h4></span>
            </section>
          </nav>
        </div>
      </div>

      <div className='container form-container mt-3'>
        <div className='col-12 text-center mt-2'>
          <h5 className='form-h5'>New Patient Form</h5>
        </div>

        <div className='row d-flex justify-content-center'>
          <div className='col-7'>
            <ul className="progressbar">
              <li className="active completed" data-tooltip="Name"></li>
              <li className='active completed' data-tooltip="Contacts"></li>
              <li className='active completed' data-tooltip="Address"></li>
              <li className='active' data-tooltip="Medicare"></li>
              <li data-tooltip="DVA"></li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='row d-flex justify-content-center'>
            <div className='col-7'>
              <div className='card form6-card'>
                <div className='row mb-3 mt-3 mx-2'>
                  <div className='col-12 col-md-6 mb-2'>
                    <label>Pension Code</label>
                    <select name="pensioncode" ref={firstinputref}  className='form6-input from6-select mt-2' onChange={handleChange} value={form6input.pensioncode}>
                      <option value="">Select</option>
                      <option value="Pensioner Concession Card">Pensioner Concession Card</option>
                      <option value="Health Care Card">Health Care Card</option>
                      <option value="Commonwealth Seniors Health Card">Commonwealth Seniors Health Card</option>
                    </select>
                  </div>

                  <div className='col-12 col-md-6'>
                    <label>Pension No</label>
                    <input type="text" name="pensionno" className='form6-input mt-2' placeholder='Pension No' onChange={handleChange} value={form6input.pensionno} />
                  </div>
                </div>

                <div className='row mb-3 mt-1 mx-2'>
                  <div className='col-12 col-md-6'>
                    <label>Pension Expiry</label>
                    <input type="date" name="pensionexpiry" className='form6-input mt-2' onChange={handleChange} value={form6input.pensionexpiry} />
                  </div>

                  <div className='col-12 col-md-6'>
                    <label>DVA Code *</label>
                    <select name="dvacode" className='form6-input from6-select mt-2' onChange={handleChange} value={form6input.dvacode}>
                      <option value="">Select</option>
                      <option value="Gold">Gold</option>
                      <option value="White">White</option>
                      <option value="Orange">Orange</option>
                    </select>
                  </div>
                </div>

                <div className='row mb-3 mx-2'>
                  <div className='col-12'>
                    <label>DVA Number *</label>
                    <input type="text" name="dvanumber" className='form6-input mt-2' placeholder='DVA Number' onChange={handleChange} value={form6input.dvanumber} />
                  </div>
                </div>

               <div className='row d-flex  justify-content-center mb-3 mt-4 mx-1 '>
                            <div className='col-12 d-flex justify-content-center  '>

                              <div className='col-3 d-flex justify-content-start' onClick={()=>navigate("/form5")} >
                                  <button  type='submit' className='form6-button-back  ' >
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
        </form>

      </div>
    </header>
  );
}

export default Form6;
