import React, { use } from 'react'
import logo from "./assets/lmc_logo_white.png"
import { useState ,useEffect,useRef } from 'react'
import {useNavigate} from 'react-router-dom'

function Form2() {
      const firstinputref = useRef(null);
      useEffect(()=>{
        firstinputref.current?.focus();
      },[]);
      const [errors,setErrors] = useState({})
      const navigate = useNavigate();
    const[form2input,setForm2input] = useState({
        title:"",
        firstname:"",
        middlename:"",
        surname:"",
        preferredname:""
    });
    const handleChange=(e)=>{
        setForm2input({...form2input,[e.target.name]:e.target.value})
      };
  const handleSubmit = async (e) => {
  e.preventDefault();
  let newErrors = {};

  if (!form2input.title.trim()) newErrors.title = "Field is required";
  if (!form2input.firstname.trim()) newErrors.firstname = "Field is required";
  if (!form2input.surname.trim()) newErrors.surname = "Field is required";

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  const patientId = localStorage.getItem("patient_id");

  if (!patientId) {
    alert("Patient ID not found. Please start again.");
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/patient/${patientId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form2input)
    });

    if (!response.ok) {
      alert("Error saving Form 2 data");
      return;
    }

    console.log("Form 2 saved successfully");
    navigate("/form3");
  

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
                    <div className='container  form-container  mt-3'>
                        <div className='col-12 text-center mt-2'>
                          <h5 className='form-h5'>New Patient Form</h5>
                        </div>
                        <div className='row d-flex justify-content-center'>
                          <div className='col-7'>
                            <ul className="progressbar">
                            <li className="active completed" data-tooltip="Name"></li>
                            <li data-tooltip="Contacts"></li>
                            <li data-tooltip="Address"></li>
                            <li data-tooltip="Medicare"></li>
                            <li data-tooltip="DVA"></li>
                          </ul>
                          </div>
                        
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                          <div className='row d-flex justify-content-center '>
                            <div className='col-7'>
                               <div className='card form2-card mt-5 mb-3 '>
                             <div className='row mb-1 mx-2 mt-3 '>
                            <div className='col-12 col-md-6 mb-2 '>
                                       <label>Title <label className='red' htmlFor="">*</label></label>
                                      <select   ref={firstinputref}   name="title" className='form2-input from2-select mt-2' onChange={handleChange} value={form2input.title} required >
                                        <option value="0"></option>
                                        <option value="Mr"  >Mr</option>
                                        <option value="Mrs" >Mrs</option>
                                        <option value="MS" >Ms</option>
                                        <option value="mast" >Mast</option>
                                    </select>
                                     {errors.title && <p style={{color:"red", fontSize:"14px"}}>{errors.title}</p>}
                                </div>
                                   <div className='col-12 col-md-6 mb-1'>
                                     <label>First Name <label className='red' htmlFor="">*</label></label>  
                                    <input type="text" name="firstname" className='form2-input mt-2' placeholder='First Name' minLength={3} onChange={handleChange} value={form2input.firstname} />
                                      {errors.firstname && <p style={{color:"red", fontSize:"14px"}}>{errors.firstname}</p>}
                                   </div>
                                   
                            </div>
                          
                          <div className='row d-flex justify-content-center  mx-2 mt-2'>
                            <div className='col-12 col-md-6 mb-2 '>
                                <label>Middle Name</label>  
                                    <input type="text" name="middlename" className='form2-input mt-2' placeholder='Middle Name'  onChange={handleChange} value={form2input.middlename}  />
                                
                            </div>
                              <div className='col-12 col-md-6 '>
                                <label >Surname <label className='red' htmlFor="">*</label></label>  
                                    <input type="text" name="surname" className='form2-input mt-2' placeholder='Surname' minLength={3} onChange={handleChange} value={form2input.surname} />
                                  {errors.surname && <p style={{color:"red", fontSize:"14px"}}>{errors.surname}</p>}
                            </div>
                            
                          </div>
                         
                          <div className='row d-flex justify-content-center mb-2 mx-2 mt-3'>
                            <div className='col-12 '>
                                <label htmlFor="preferredname">Preferred Name</label>  
                                <div className='row-7 mt-1 '>
                                    <input type="text" name="preferredname" className='form2-input mt-2' minLength={3} placeholder='Preferred Name' onChange={handleChange} value={form2input.preferredname}  />
                                </div>
                            </div>
                          </div>
                          <div className='row d-flex  justify-content-center mb-3 mt-4 mx-1 '>
                            <div className='col-12 d-flex justify-content-center  '>

                              <div className='col-3 d-flex justify-content-center' onClick={()=>navigate("/form")} >
                                  <button  type='submit' className='form2-button-back ' >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left mx-1" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8"/>
                                </svg>
                                  Back
                                </button>
                              </div>
                              <div className='col-9 d-flex justify-content-center' >
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

export default Form2