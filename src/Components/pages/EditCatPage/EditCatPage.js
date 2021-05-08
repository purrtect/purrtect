import React from 'react'
import { Link } from 'react-router-dom'
import '../../BodySection.css'
import { Button } from '../../Button'
import ExampleCat from '../../images/cat-crown-grey.png'

function EditCatPage() {
    return (
        <>
            <div className='edit-cat-body-section'>
                <div className="row home__body-row" style={{display:'flex', flexDirection:'reverse-row'}}>
                    <div className="col col-cat-info">
                        <div className="home__body-text-wrapper">
                            <div className='cat-info-line'>Input info here:</div>
                            <form>
                                <div className='cat-info-line'>Name:</div>
                                <input
                                className='footer-input'
                                name='cat-name'
                                type='cat-name'
                                placeholder='New name'
                                />
                                <div className='cat-info-line'>Skin:</div>
                                <select>
                                    <option value="grapefruit">Orange</option>
                                    <option value="lime">Grey</option>
                                    <option selected value="coconut">Candy</option>
                                </select>
                            </form>
                            <br></br>  
                            <div style={{paddingLeft:"30px"}}>
                                <Link to="/">
                                    <Button buttonSize='btn--mobile' buttonColor="light-blue">
                                        Submit Changes
                                    </Button>
                                </Link>
                            </div>
                                                
                        </div>
                    </div>
                    <div className="col">
                        <div className="home__body-img-wrapper">
                            <img src={ExampleCat} alt="ExampleCat" className='home__body-img' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCatPage
