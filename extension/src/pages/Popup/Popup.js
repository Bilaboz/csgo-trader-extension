import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCog } from '@fortawesome/free-solid-svg-icons';

import NewTabLink from 'components/NewTabLink/NewTabLink';
import Calculator from 'components/Popup/Calculator/Calculator';
import CustomA11yButton from 'components/CustomA11yButton/CustomA11yButton';

const Popup = () => {
  // if there is any badge text it gets removed
  chrome.runtime.sendMessage({ badgetext: '' }, () => {});
  const [links, setLinks] = useState([]);
  const [showCalc, doShowCalc] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['popupLinks'],
      ({ popupLinks }) => {
        const navLinks = popupLinks.map((link) => {
          if (link.active) {
            return (
              <div key={link.id}>
                <NewTabLink to={link.url}>{link.name}</NewTabLink>
              </div>
            );
          }
          return null;
        });
        setLinks(navLinks);
      });
  }, []);

  const LogoAndLinks = () => {
    return (
      <>
        <NewTabLink to="https://csgotrader.app" key="home">
          <img src="/images/cstlogo48.png" alt="CSGO Trader Logo" />
          <h5>
            <span className="orange">CSGO Trader </span>
            <span>
              {chrome.runtime.getManifest().version}
            </span>
          </h5>
        </NewTabLink>
        {
          links
        }
      </>
    );
  };

  return (
    <>
      <div className="popup">
        {showCalc ? <Calculator /> : <LogoAndLinks />}
        <div className="bottomRow">
          <CustomA11yButton
            action={() => { doShowCalc(!showCalc); }}
            className="action"
            title="Calculator"
          >
            <FontAwesomeIcon icon={faCalculator} />
          </CustomA11yButton>
          <span className="action">
            <NewTabLink to="index.html">
              <FontAwesomeIcon icon={faCog} title="Open Options" />
            </NewTabLink>
          </span>
        </div>
      </div>
    </>
  );
};

export default Popup;
