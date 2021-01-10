import React from 'react'
import BodySection from '../../BodySection'
import {homeObjOne, homeObjTwo, homeObjThree} from './Data'

function Home() {
    return (
        <>
            <BodySection {...homeObjOne} />
            <BodySection {...homeObjTwo} />
            <BodySection {...homeObjThree} />
        </>
    )
}

export default Home
