import React, { useState, useEffect ,useRef } from 'react';
import logo from "./assets/lmc_logo_white.png";
import { useNavigate } from 'react-router-dom';

function Form5() {
  const firstinputref = useRef(null);
  useEffect(()=>{
    firstinputref.current?.focus();
  },[])
  const navigate = useNavigate();
  const [forminput5, setForminput5] = useState({
    medicarenumber: "",
    medicarelineno: "",
    medicareexpirymonth: "",
    medicareexpiryyear: ""
  });

  // Get patient ID from localStorage
  const patientId = localStorage.getItem("patient_id");

  // If no patient ID, redirect to Form1
  useEffect(() => {
    if (!patientId) {
      alert("Patient ID not found. Please start from Form1.");
      navigate("/");
    }
  }, [patientId, navigate]);

  const handleChange = (e) => {
    setForminput5({ ...forminput5, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { medicarenumber, medicarelineno, medicareexpirymonth, medicareexpiryyear } = forminput5;

  // Basic validation
  if (!medicarenumber || !medicarelineno || !medicareexpirymonth || !medicareexpiryyear) {
    alert("Please fill in all fields");
    return;
  }

  // Validate month
  const monthNum = parseInt(medicareexpirymonth, 10);
  if (monthNum < 1 || monthNum > 12) {
    alert("Month must be between 01 and 12");
    return;
  }

  // Validate year (4 digits)
  if (!/^\d{4}$/.test(medicareexpiryyear)) {
    alert("Year must be 4 digits");
    return;
  }

  // Combine month and year into MM/YYYY
  const medicareexpiry = `${medicareexpirymonth.padStart(2, "0")}/${medicareexpiryyear}`;

  // Prepare payload for API
  const payload = {
    medicarenumber,
    medicarelineno,
    medicareexpiry, // single combined field
  };

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/patient/${patientId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update patient info");
    }

    // Navigate to next form
    navigate("/form6", { state: { patient_id: patientId } });
  } catch (error) {
    console.error(error);
    alert("Error updating patient data.");
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

      <div className="container form-container mt-3">
        <div className="col-12 text-center mt-2">
          <h5 className="form-h5">New Patient Form</h5>
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
              <div className='card form5-card'>
                <div className='row mb-3 mt-3 mx-2'>
                  <div className='col-12'>
                    <label>Medicare Number</label>
                    <input type="text" ref={firstinputref}  name='medicarenumber' className='form5-input mt-2' maxLength={10}  placeholder='Medicare Number' onChange={handleChange} value={forminput5.medicarenumber} />
                  </div>
                </div>

                <div className='row mb-3 mx-2'>
                  <div className='col-12'>
                    <label>Medicare Line No</label>
                    <input type="text" name='medicarelineno' className='form5-input mt-2' placeholder='Medicare Line No' maxLength={2}  onChange={handleChange} value={forminput5.medicarelineno} />
                  </div>
                </div>

                <div className='row mb-3 mx-2'>
                  <div className='col-12'>
                    <label>Medicare Expiry</label>
                    <div className='row mt-1'>
                      <div className='col-4'>
                        <input type="text" name="medicareexpirymonth" className='form5-input mt-2' maxLength={2}  placeholder='MM' onChange={handleChange} value={forminput5.medicareexpirymonth} />
                      </div>
                      <div className='col-6 mx-3'>
                        <input type="text" name="medicareexpiryyear" className='form5-input mt-2' maxLength={4}  placeholder='YYYY'  onChange={handleChange} value={forminput5.medicareexpiryyear} />
                      </div>
                    </div>
                  </div>
                </div>

               <div className='row d-flex  justify-content-center mb-3 mt-4 mx-1 '>
                            <div className='col-12 d-flex justify-content-center  '>

                              <div className='col-3 d-flex justify-content-start' onClick={()=>navigate("/form4")} >
                                  <button  type='submit' className='form5-button-back  ' >
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

export default Form5;
