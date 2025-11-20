import React, { use } from 'react'
import logo from "./assets/lmc_logo_white.png"
import { useState ,useRef,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Form3() {
    const firstinputref = useRef(null);
    useEffect(()=>{
      firstinputref.current?.focus()
    },[])
     const [errors,setErrors] = useState({})
    const navigate=useNavigate();
    const[form3input,setForm3input] = useState({
        dob:"",
        homephone:"",
        workphone:"",
        mobilephone:"",
        email:""
    });
    const handleChange=(e)=>{
        setForm3input({...form3input,[e.target.name]:e.target.value})
      };
   const handleSubmit = async (e) => {
  e.preventDefault();
  let newErrors = {};

  if (!form3input.dob.trim()) newErrors.dob = "Field is required";
  if (!form3input.mobilephone.trim()) newErrors.mobilephone = "Field is required";

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  const patientId = localStorage.getItem("patient_id");

  if (!patientId) {
    alert("Patient ID missing. Please start again.");
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/patient/${patientId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form3input)
    });

    if (!response.ok) {
      alert("Error saving Form 3 data");
      return;
    }

    console.log("Form 3 saved successfully");
    navigate("/form4");
    

  } catch (error) {
    console.error(error);
    alert("Network error");
  }
};


  return (
            <header style={{backgroundColor:"whitesmoke" , height:"1000px"}}>
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
                    <div className='container  form-container  mt-3'>
                        <div className='col-12 text-center mt-2'>
                          <h5 className='form-h5'>New Patient Form</h5>
                        </div>
                        <div className='row d-flex justify-content-center'>
                          <div className='col-7'>
                            <ul className="progressbar">
                            <li className="active completed" data-tooltip="Name"></li>
                            <li className='active' data-tooltip="Contacts"></li>
                            <li data-tooltip="Address"></li>
                            <li data-tooltip="Medicare"></li>
                            <li data-tooltip="DVA"></li>
                          </ul>
                          </div>
                        
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                           <div className='row d-flext justify-content-center '>
                            <div className='col-7'>
                              <div className='card form3-card mb-3 mt-4'>
                            <div className='row mb-2 mx-2 mt-3 '>
                            <div className='col-12 col-md-6 mb-2'>
                                <label >Date Of Birth <label className='red' htmlFor="">*</label></label>
                                   <input type="date"  ref={firstinputref}   className='form3-input mt-2' name='dob'   onChange={handleChange} value={form3input.dob} />
                                    {errors.dob && <p style={{color:"red", fontSize:"14px"}}>{errors.dob}</p>}
                            </div>
                            <div className='col-12 col-md-6 '>
                                <label>Home Phone</label>  
                                <input type="text" name="homephone" className='form3-input mt-2' placeholder='Home Phone' maxLength={10} onChange={handleChange} value={form3input.homephone} />
                            </div>
                         </div>
                         
                          <div className='row  mb-2 mx-2 mt-2'>
                            <div className='col-12 col-md-6 mb-3'>
                                <label >Work Phone</label>  
                                    <input type="text" name="workphone" className='form3-input mt-2' placeholder='Work Phone' maxLength={10} onChange={handleChange} value={form3input.workphone}  />
                            </div>
                             <div className='col-12 col-md-6 mb-2  '>
                                <label>Mobile Phone <label className='red' htmlFor="">*</label></label>  
                                    <input type="text" name="mobilephone" className='form3-input mt-2' placeholder='Mobile Phone' maxLength={10} onChange={handleChange} value={form3input.mobilephone} />
                                      {errors.mobilephone && <p style={{color:"red", fontSize:"14px"}}>{errors.mobilephone}</p>}
                            </div>
                          </div>
                          <div className='row mb-2 mx-2 '>
                            <div className='col-12 '>
                                <label htmlFor="preferredname">Email</label>  
                                <div className='row-7  '>
                                    <input type="text" name="email" className='form3-input mt-2' placeholder='Email' onChange={handleChange} value={form3input.email}/>
                                </div>
                            </div>
                          </div>
                           <div className='row d-flex  justify-content-center mb-3 mt-4 mx-1 '>
                            <div className='col-12 d-flex justify-content-center  '>

                              <div className='col-3 d-flex justify-content-start' onClick={()=>navigate("/form2")} >
                                  <button  type='submit' className='form3-button-back  ' >
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
                 
  )
}

export default Form3