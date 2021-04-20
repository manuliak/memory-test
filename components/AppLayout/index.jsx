import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, Dropdown, Button} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next';

import { useAuth } from '../../context/AuthContext'

export default function AppLayout({children}) {
    const [activeLanguage, setActiveLanguage] = useState('en');
    const { t, i18n } = useTranslation();

    const { currentUser, logout } = useAuth();

    useEffect(() => {
        i18n.changeLanguage(activeLanguage);
    }, [activeLanguage])

    return (
        <div className="page">
            <div className="page__header">
                <Container fluid="sm">
                    <div className="header d-flex justify-content-between align-items-center">
                        <div className="header__logo">
                            <Link href="/">
                                <a className="header__logo-link">
                                    <div className="header__logo-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30" fill="none" className="svg-icon gb-header__icon_brain">
                                            <path d="M17.8689 3.02886C17.351 3.73515 17 4.87429 17 6.5V8.59688C17 9.27809 17.2318 9.93902 17.6574 10.471L19.6987 13.0226C19.7969 13.0077 19.8976 13 20 13C21.1046 13 22 13.8954 22 15C22 16.1046 21.1046 17 20 17C18.8954 17 18 16.1046 18 15C18 14.743 18.0485 14.4974 18.1367 14.2717L16.0957 11.7204C15.3864 10.8338 15 9.73223 15 8.59688V6.5C15 4.62571 15.399 3.01485 16.2561 1.84614C17.1422 0.637768 18.4492 0 20 0C22.5086 0 24.6556 1.53887 25.5523 3.72237C27.8341 4.39265 29.5 6.50091 29.5 9C29.5 9.50503 29.4896 10.0445 29.3413 10.5813C30.9227 11.4208 32 13.0838 32 15C32 16.9163 30.9226 18.5793 29.3412 19.4188C29.4895 19.9555 29.4998 20.4949 29.4998 20.9998C29.4998 23.4989 27.8339 25.6072 25.5521 26.2774C24.6554 28.4609 22.5085 29.9998 19.9998 29.9998C19.3466 29.9998 18.7159 29.8951 18.1247 29.7007L18.7493 27.8007C19.1415 27.9297 19.5615 27.9998 19.9998 27.9998C21.8098 27.9998 23.3414 26.7969 23.8339 25.1446L24.0101 24.5536L24.6173 24.4457C26.2557 24.1546 27.4998 22.7215 27.4998 20.9998C27.4998 20.1304 27.4324 19.8125 27.1907 19.5187C26.8604 19.1173 26.415 18.9669 25.9316 19.0185C25.4251 19.0726 24.8978 19.3531 24.5383 19.8025L23.3632 21.2714C23.4515 21.4972 23.5 21.7429 23.5 22C23.5 23.1046 22.6046 24 21.5 24C20.3954 24 19.5 23.1046 19.5 22C19.5 20.8954 20.3954 20 21.5 20C21.6023 20 21.7029 20.0077 21.8011 20.0225L22.9766 18.5531C23.6601 17.6987 24.6679 17.142 25.7194 17.0298C26.5822 16.9377 27.4842 17.1479 28.223 17.7405C29.2706 17.2723 30 16.2204 30 15C30 13.7796 29.2705 12.7276 28.223 12.2594C27.4842 12.852 26.5821 13.0621 25.7194 12.97C24.668 12.8578 23.6602 12.3011 22.9768 11.4467L21.8013 9.97745C21.7031 9.9923 21.6024 10 21.5 10C20.3954 10 19.5 9.10457 19.5 8C19.5 6.89543 20.3954 6 21.5 6C22.6046 6 23.5 6.89543 23.5 8C23.5 8.25696 23.4515 8.50261 23.3633 8.72829L24.5385 10.1973C24.898 10.6467 25.4252 10.9272 25.9317 10.9813C26.415 11.0329 26.8605 10.8826 27.1908 10.4812C27.4326 10.1874 27.5 9.86945 27.5 9C27.5 7.27833 26.2559 5.84518 24.6175 5.55412L24.0102 5.44625L23.834 4.85517C23.3416 3.20295 21.81 2 20 2C19.0508 2 18.3578 2.36223 17.8689 3.02886Z" fill="black"></path>
                                            <path d="M8.63674 21.2717C8.54846 21.4974 8.5 21.743 8.5 22C8.5 23.1046 9.39543 24 10.5 24C11.6046 24 12.5 23.1046 12.5 22C12.5 20.8954 11.6046 20 10.5 20C10.3976 20 10.2969 20.0077 10.1987 20.0226L9.02324 18.5533C8.33975 17.6989 7.33204 17.1422 6.28057 17.03C5.41788 16.9379 4.51584 17.148 3.77704 17.7406C2.72947 17.2724 2 16.2204 2 15C2 13.7796 2.72944 12.7277 3.77699 12.2595C4.51577 12.8521 5.41783 13.0623 6.28056 12.9702C7.33209 12.858 8.33988 12.3013 9.0234 11.4469L10.1989 9.97749C10.2971 9.99231 10.3977 10 10.5 10C11.6046 10 12.5 9.10457 12.5 8C12.5 6.89543 11.6046 6 10.5 6C9.39543 6 8.5 6.89543 8.5 8C8.5 8.25706 8.5485 8.5028 8.63684 8.72856L7.46166 10.1975C7.10216 10.6469 6.57494 10.9274 6.06835 10.9815C5.585 11.0331 5.13959 10.8827 4.8093 10.4813C4.56756 10.1875 4.50016 9.86956 4.50016 9.00019C4.50016 7.27852 5.74427 5.84537 7.38268 5.55431L7.98995 5.44644L8.16611 4.85536C8.65855 3.20314 10.1902 2.00019 12.0002 2.00019C12.4385 2.00019 12.8585 2.07034 13.2507 2.19926L13.8753 0.299305C13.2841 0.104937 12.6534 0.000190735 12.0002 0.000190735C9.49155 0.000190735 7.34458 1.53905 6.44787 3.72256C4.16609 4.39284 2.50016 6.50109 2.50016 9.00019C2.50016 9.50514 2.51055 10.0445 2.65876 10.5812C1.07739 11.4207 0 13.0837 0 15C0 16.9162 1.07735 18.5792 2.65866 19.4187C2.51039 19.9555 2.5 20.495 2.5 21C2.5 23.4991 4.16593 25.6073 6.44771 26.2776C7.34441 28.4611 9.49139 30 12 30C13.5508 30 14.8578 29.3622 15.7439 28.1539C16.601 26.9852 17 25.3743 17 23.5V21.4031C17 20.2678 16.6136 19.1662 15.9043 18.2796L13.8633 15.7283C13.9515 15.5026 14 15.257 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17C12.1024 17 12.2031 16.9923 12.3013 16.9774L14.3426 19.529C14.7682 20.061 15 20.7219 15 21.4031V23.5C15 25.1257 14.649 26.2648 14.1311 26.9711C13.6422 27.6378 12.9492 28 12 28C10.19 28 8.65839 26.797 8.16595 25.1448L7.98978 24.5538L7.38252 24.4459C5.74411 24.1548 4.5 22.7217 4.5 21C4.5 20.1306 4.5674 19.8126 4.80923 19.5188C5.13955 19.1174 5.58495 18.9671 6.06828 19.0187C6.57483 19.0728 7.10201 19.3533 7.4615 19.8027L8.63674 21.2717Z" fill="black"></path>
                                        </svg>
                                    </div>
                                    <div className="header__logo-label">Memory Test</div>
                                </a>
                            </Link>
                        </div>

                        <div className="header__nav">
                            <ul className="d-flex align-items-center">
                            {
                                currentUser ? (
                                    <>
                                        <li>
                                            <Link href="/profile">
                                                <a>
                                                    Profile
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Button onClick={logout} variant="light">Logout</Button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link href="/signin">
                                                <a>
                                                    Sign in
                                                </a>
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                            </ul>
                        </div>

                        <div className="language-switch">
                            
                            <Dropdown
                                onSelect={(selectedKey) => setActiveLanguage(selectedKey)}
                                
                            >
                                <Dropdown.Toggle id="dropdown-custom-1" variant="light">
                                    <FontAwesomeIcon icon={faGlobeAmericas} size="xs" />
                                    <span>{activeLanguage.toUpperCase()}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="right">
                                    {activeLanguage !== 'en' ? <Dropdown.Item eventKey="en">EN</Dropdown.Item> : ""}
                                    {activeLanguage !== 'uk' ? <Dropdown.Item eventKey="uk">UK</Dropdown.Item> : ""}
                                    {activeLanguage !== 'ru' ? <Dropdown.Item eventKey="ru">RU</Dropdown.Item> : ""}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="page__content">
                <Container fluid="sm">
                    {children}
                </Container>
            </div>
            <div className="page__footer">
                <Container fluid="sm">
                    <p className="developer-link">
                        {t('developedBy')} <a href="https://www.linkedin.com/in/sergey-manuliak-1579a8a7/" target="_blank" rel="noopener nofollow">S.Manuliak</a>
                    </p>
                </Container>
            </div>
        </div>
    )
}