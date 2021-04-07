import React from 'react'

export default function AppLayout({children}) {
    return (
        <div className="page">
            <div className="page__header">
                <div className="container">
                    <div className="header">
                        <div className="header__logo">
                            memory test
                        </div>
                    </div>
                </div>
            </div>
            <div className="page__content">
                <div className="container">
                    {children}
                </div>
            </div>
            <div className="page__footer">
                <div className="container">
                    <p className="developer-link">
                        developed by <a href="https://www.linkedin.com/in/sergey-manuliak-1579a8a7/" target="_blank" rel="noopener nofollow">S.Manuliak</a>
                    </p>
                </div>
            </div>
        </div>
    )
}