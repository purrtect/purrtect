import React from 'react'
import '../../BodySection.css'

function HistoryPage() {
    return (
        <>
            <div className='edit-cat-body-section darkBg'>
                <div className="title-line-center-history">Purchase History</div>
                <div className="home__body-text-wrapper">
                    <div className="row-history">
                        <div className="col">
                            <div className="line-history">2021-1-10</div>
                        </div>
                        <div className="col">
                            <div className="line-history">A barrel of crude oil</div>
                        </div>
                    </div>
                    <div className="row-history">
                        <div className="col">
                            <div className="line-history">2021-1-11</div>
                        </div>
                        <div className="col">
                            <div className="line-history">A puppy</div>
                        </div>
                    </div>
                    <div className="row-history">
                        <div className="col">
                            <div className="line-history">2021-1-15</div>
                        </div>
                        <div className="col">
                            <div className="line-history">Four hamsters</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryPage
