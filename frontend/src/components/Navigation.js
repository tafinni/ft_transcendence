import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'; //added
import './Navigation.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


function Navigation() {
	const { t, i18n } = useTranslation(); // useTranslation hook

	const changeLanguage = (lng) => {
	  i18n.changeLanguage(lng);
	};

	return ( 
		<div className="nav-space">
				<Navbar fixed="top">
					<Container>
						<Link to ="/" className="nav-link">
							PONG
						</Link>
						<Nav className="me-auto">
							<NavDropdown title={<i className="bi bi-play-fill no-arrow"></i>} id="play-dropdown" className="no-arrow-dropdown" renderMenuOnMount={true}>
									<NavDropdown.Item onClick={() => changeLanguage('en')}>{t('one_player')}</NavDropdown.Item>
									<NavDropdown.Item onClick={() => changeLanguage('fi')}>{t('two_players')}</NavDropdown.Item>
									<NavDropdown.Item onClick={() => changeLanguage('en')}>{t('four_players')}</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link href="#tournament"> <t className="bi bi-trophy-fill"></t> </Nav.Link>
							<Link to ="/stats" className="nav-link">
								<t className="bi bi-file-bar-graph-fill"></t>
							</Link>
							<Link to ="/profile" className="nav-link">
								<t className="bi bi-file-person-fill"></t>
							</Link>
							<Nav.Link href="#chat"> <t className="bi bi-chat-dots-fill"></t> </Nav.Link>
						<NavDropdown title={t('language')} id="language-dropdown" renderMenuOnMount={true}>
							<NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
							<NavDropdown.Item onClick={() => changeLanguage('fi')}>Finnish</NavDropdown.Item>
							<NavDropdown.Item onClick={() => changeLanguage('ru')}>Russian</NavDropdown.Item>
						</NavDropdown>
						</Nav>
					</Container>
				</Navbar>
		</div> 
	);
}

export default Navigation;
