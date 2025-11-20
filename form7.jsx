import React from 'react'
import logo from "./assets/lmc_logo_white.png"
function Form7() {
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
                              <li className=' active completed' data-tooltip="Contacts"></li>
                              <li className=' active completed' data-tooltip="Address"></li>
                              <li className='active completed'  data-tooltip="Medicare"></li>
                              <li className='active completed' data-tooltip="DVA"></li>
                            </ul>
                            </div>
                          
                          </div>
                          <div className='row d-flex justify-content-center '>
                            <div className='col-7'>
                              <div className='card form7-card' >  
                                       <div className='row d-flex justify-content-center mt-3 mx-4 mb-3'>
                                        <div className='col-12 text-center mt-3 '>
                                            <h5 className='form7-h5' >Thank you for filling up the form</h5>
                                        </div>
                                      </div>
                              </div>
                            </div>
                          </div>
                      
                    </div>
     </header>
  )
}

export default Form7