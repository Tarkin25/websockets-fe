import React from 'react'
import KeyListener from '../components/KeyListener'

const TestPage = () => {
    return (
        <div>
            <KeyListener action={() => console.log("combination pressed!")} keys={["Shift", "s"]} />
        </div>
    )
}

export default TestPage
