import React from 'react'
import logo from "./assets/lmc_logo_white.png"
import { useState ,useRef,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Form() {
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

   const navigate = useNavigate();
  const [errors,setErrors] = useState({})
  const [forminput,setForminput]=useState({
    firstname:"",
    surname:"",
    dob:""
  });

  const handleChange=(e)=>{
    setForminput({...forminput,[e.target.name]:e.target.value})
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  let newErrors = {};

  if (!forminput.firstname.trim()) newErrors.firstname = "Field is required";
  if (!forminput.surname.trim()) newErrors.surname = "Field is required";

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/patient/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forminput)
    });

    if (!response.ok) {
      alert("Error creating patient");
      return;
    }

    const data = await response.json();

    // save patient id
    localStorage.setItem("patient_id", data.id);

    // NOW navigate
    navigate("/form2");

  } catch (error) {
    console.error(error);
    alert("Network error");
  }
};





 

  return (
    <header className='header1' style={{backgroundColor:"whitesmoke",height:"1300px"}} >
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
              <li className="active" data-tooltip="Name"></li>
              <li data-tooltip="Contacts"></li>
              <li data-tooltip="Address"></li>
              <li data-tooltip="Medicare"></li>
              <li data-tooltip="DVA"></li>
            </ul>
          </div>
        </div>

        <div className='container form-container-2'>
          <div className='row d-flex justify-content-center'>
            <div className='col-7'>
              <div className='card form-card1 mb-3'>
                <p className='d-flex align-items-center mx-4 mt-3 form-p1 '>
                  Lakesh Medical will not prescribe these to a new Patient: valium, oxycontin, oxycodone or schedule & drugs.
                </p>
              </div>
            </div>
          </div>

          <div className='row d-flex justify-content-center'>
            <div className='col-7'>
              <div className='card form-card2 mb-3'>
                <p className='container-2-p d-flex justify-content-center'>Privacy Consent</p>
                <div className='row'>
                  <div className='col-11 mx-4 mb-4'>
                    <p className='form-p'>
                      Lakes Medical maintains confidentiality at all times. Our practice recognizes that the information we collect is often highly sensitive in nature. As a medical centre we have adopted the relevant highest standard of privacy compliance to ensure personal information is protected.
                    </p>
                    <p className='form-p'>
                      We may use the information collected, used and disclosed at the discretion of the practice for the following purpose. 
                      1. Pathology, 2. Radiology, 3. Pharmacy enquiries, 4. Appointment reminders, 5. Healthcheck recalls, 6. Specialist Referrals, 7. HIC/Medicare Enquiries.
                      You may withdraw, alter or restrict your consent anytime, by notifying the practice in writing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='row d-flex justify-content-center'>
              <div className='col-7'>
                <div className='card form-card3 mb-3'>
                  <div className='row mb-3 mx-2 mt-3'>

                    {/* FIRST NAME AND SURNAME SAME ROW */}
                    <div className='col-12 col-md-6 mb-2'>
                      <label >First Name<label className='red'>*</label></label>
                      <input
                        ref={firstInputRef}
                        className='container-2-input mt-2'
                        minLength={3}
                        type="text"
                        placeholder="First Name"
                        name='firstname'
                        value={forminput.firstname}
                        onChange={handleChange}
                        
                      />
                      {errors.firstname && <p   style={{color:"red", fontSize:"14px"}}>{errors.firstname}</p>}
                    </div>

                    <div className='col-12 col-md-6 mt-1 '>
                      <label>Surname<label className='red'>*</label></label>
                      <input
                        className='container-2-input mt-1 '
                        minLength={3}
                        type="text"
                        placeholder="Surname"
                        name='surname'
                        value={forminput.surname}
                        onChange={handleChange}
                        
                      />
                       {errors.surname && <p style={{color:"red", fontSize:"14px"}}>{errors.surname}</p>}
                    </div>
                  </div>

                  <div className='row mx-1'>
                    <div className='col-12   mx-1 '>
                      <label>Date Of Birth<label className='red'>*</label></label>
                      <input
                        className='container-2-input dob mt-2 '
                        type="date"
                        name='dob'
                        value={forminput.dob}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='row d-flex  justify-content-end'>
                    <div className='col-6 mt-2 d-flex justify-content-end mx-3'>
                      <button type='submit' className='mt-4 mb-3 form-button'>
                        Agree & Continue
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </header>
  )
}

export default Form
