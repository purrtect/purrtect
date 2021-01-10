import React from 'react'
import '../../BodySection.css'
import ReactScrollableList from 'react-scrollable-list'

const list = [
    {
        id: '1',
        content: 'aaaa'
    },
    {
        id: '2',
        content: 'bbbb'
    },
    {
        id: '3',
        content: 'cccc'
    }
]

function HistoryPage() {
    return (
        <>
            <div className='edit-cat-body-section darkBg'>
                <div className="title-line-center-history">Purchase History</div>
                <div className="home__body-text-wrapper">
                    <ReactScrollableList
                        listItems={list}
                        heightOfItem={30}
                        maxItemsToRender={2}
                        style={{ color: '#333' }}
                        />
                </div>
            </div>
        </>
    )
}

export default HistoryPage
