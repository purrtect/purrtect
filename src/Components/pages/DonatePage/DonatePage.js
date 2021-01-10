import React from 'react'
import { Link } from 'react-router-dom'
import '../../BodySection.css'
import { Button } from '../../Button'
import Earth from '../../images/earth.png'
import '../Footer/Footer.css'

function DonatePage() {
    return (
        <>
            <div className='edit-cat-body-section'>
                <div className="row home__body-row" style={{display:'flex', flexDirection:'reverse-row'}}>
                    <div className="col col-cat-info">
                        <div className="home__body-text-wrapper">
                            <div className='cat-info-line'>Donate to LIFEEARTH</div>
                            <form>
                                <div className='cat-info-line'>Amount:</div>
                                <select>
                                    <option value="5">$5</option>
                                    <option value="20">$20</option>
                                    <option selected value="50">$50</option>
                                </select>
                            </form> 
                            <br></br>
                            <Link to="/">
                                <Button buttonSize='btn--medium' buttonColor="light-blue">
                                    Donate
                                </Button>
                            </Link>                     
                        </div>
                    </div>
                    <div className="col">
                        <div className="home__body-img-wrapper">
                            <img src={Earth} alt="Earth" className='home__body-img' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonatePage
