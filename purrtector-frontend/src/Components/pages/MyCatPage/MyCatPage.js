import React from 'react'
import { Link } from 'react-router-dom'
import BodySection from '../../BodySection'
import '../../BodySection.css'
import { Button } from '../../Button'
import ExampleCat from '../../images/cat-crown-grey.png'
import Fish from '../../images/fish.png'
import OrangeTrophy from '../../images/cat-trophy-1.png'
import GreyTrophy from '../../images/cat-trophy-2.png'
import CandyTrophy from '../../images/cat-trophy-3.png'

const homeObjDonate = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Help save the world',
    headline: 'Donate to LifeEarth',
    description: 'With your donation, LifeEarth will be able to continuously plant new trees to help our environment.',
    buttonLabel: 'Donate Right Meow',
    imgStart: '',
    img: Fish,
    alt: 'Fish',
    link: '/donate'
}

const unlock = [true, false, false]

function MyCatPage() {
    return (
        <>
            <div className='edit-cat-body-section'>
                <div className="row home__body-row" style={{display:'flex', flexDirection:'reverse-row'}}>
                    <div className="col col-cat-info">
                        <div className="home__body-text-wrapper">
                            <div className='cat-info-line'>Name: ThunderGrey</div>
                            <div className='cat-info-line'>Skin: Grey</div>
                            <div className='cat-info-line' style={{padding:"0 0 20px 0"}}>Exp: Need Graphics</div>
                            <Link to="/edit-cat">
                                <Button buttonStyle="primary" buttonColor="light-blue" buttonSize="btn--small">
                                    Edit Cat Info
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="home__body-img-wrapper">
                            <img src={ExampleCat} alt="ExampleCat" className='home__body-img' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="trophy-body-section">
                <div className="title-line-center">
                    Trophy Collection
                </div>
                <div className="row home__body-row" style={{display:'flex', flexDirection: 'row'}}>
                    <div className="col-trophy">
                        <div className="trophy-line">
                            First Step
                        </div>
                        <div className="trophy-img-wrapper">
                            <img src={OrangeTrophy} alt="OrangeTrophy" className={
                                unlock[0] ? 'trophy-img' : 'trophy-img grey-filter'
                            } />
                        </div>
                        <div style={{marginTop:"10px"}}>
                            <Link to="/">
                                <Button buttonColor={unlock[0] ? "light-blue" : "grey"} buttonSize="btn--small">
                                    Share
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-trophy">
                        <div className="trophy-line">
                            Save $100
                        </div>
                        <div className="trophy-img-wrapper">
                            <img src={GreyTrophy} alt="GreyTrophy" className={
                                unlock[1] ? 'trophy-img' : 'trophy-img grey-filter'
                            } />
                        </div>
                        <div style={{marginTop:"10px"}}>
                            <Link to="/">
                                <Button buttonColor={unlock[1] ? "light-blue" : "grey"} buttonSize="btn--small">
                                    Share
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-trophy">
                        <div className="trophy-line">
                            Donator Cat
                        </div>
                        <div className="trophy-img-wrapper">
                            <img src={CandyTrophy} alt="CandyTrophy" className={
                                unlock[2] ? 'trophy-img' : 'trophy-img grey-filter'
                            } />
                        </div>
                        <div style={{marginTop:"10px"}}>
                            <Link to="/">
                                <Button buttonColor={unlock[2] ? "light-blue" : "grey"} buttonSize="btn--small">
                                    Share
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <BodySection {...homeObjDonate} />
        </>
    )
}

export default MyCatPage
