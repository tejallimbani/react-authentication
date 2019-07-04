import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Main from '../src/components/main';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="login-container">
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;