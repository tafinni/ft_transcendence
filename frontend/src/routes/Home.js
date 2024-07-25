import React from 'react';
import Navigation from '../components/Navigation';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { t } = useTranslation();

  return (
    <div>
      <Navigation />
      <div className="content">
      </div>
	  <header className="App-header">
        <p>
          <div>{t('test text')}</div>
          
        </p>
      </header>
    </div>
  );
};

export default Home;
