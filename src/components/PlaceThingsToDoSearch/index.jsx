import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { IoLocationOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import IranStates from 'src/assets/data/IranStates.json';
import { TbZoomCancel } from 'react-icons/tb';
import IranStateKeys from 'src/assets/data/IranStateKeys.json';

const PlaceThingsToDoSearch = ({ open, setOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryResults, setQueryResults] = useState([]);

  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length >= 1) {
      const results = IranStates.filter(state => {
        return state.label.includes(searchQuery);
      });
      console.log('results:', results);
      setQueryResults(results);
    }
  }, [searchQuery]);

  const searchQueryHandler = e => {
    setSearchQuery(e.target.value);
  };

  const searchHandler = e => {
    e.preventDefault();
    console.log('submitting result of where to go, navigating to:', `/things-to-do&where=${searchQuery}`);
    if (searchQuery.length < 3) {
      toast.error('حداقل سه حرف وارد کنید');
      return;
    }
    navigate(`/things-to-do?where-to=${searchQuery}`);
    setOpen(false);
  };

  const suggestionsSearchHandler = search => {
    if (search.length < 3) {
      toast.error('حداقل سه حرف وارد کنید');
      return;
    }
    navigate(`/things-to-do?where-to=${search}`);
  };

  const modalCloseHandler = () => {
    setOpen(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      searchHandler(e);
    }
  };

  return (
    <Modal className="things-to-do-wrapper" open={open} onClose={modalCloseHandler}>
      <div className="things-to-do-wrapper__container">
        <div className="things-to-do-wrapper__container__search-form">
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={searchQueryHandler}
            onKeyPress={handleKeyPress}
            className="things-to-do-wrapper__container__search-form__search-box"
            placeholder="به کجا؟..."
          />
        </div>
        <hr className="things-to-do-wrapper__container__hr" />
        {(searchQuery.length < 1 || queryResults.length > 0) && (
          <div className="things-to-do-wrapper__container__suggestions-title">
            <span className="things-to-do-wrapper__container__suggestions-title__title">مقاصد پیشنهادی:</span>
          </div>
        )}
        {/* <div className="things-to-do-wrapper__container__suggestions-title">
            <span className="things-to-do-wrapper__container__suggestions-title__title">مقصدی یافت نشد!</span>
          </div> */}
        {searchQuery.length >= 1 && queryResults.length === 0 && (
          <div className="no-things-to-do-wrapper">
            <div className="no-things-to-do">
              <TbZoomCancel style={{ fontSize: '48px', color: '#04aa6c' }} />
              <h5 className="no-things-to-do__title">مقصدی یافت نشد!</h5>
            </div>
          </div>
        )}
        {searchQuery.length < 1 && (
          <div className="things-to-do-wrapper__container__search-suggestions">
            <div
              className="things-to-do-wrapper__container__search-suggestions__suggestion"
              onClick={() => {
                suggestionsSearchHandler('تهران');
              }}
            >
              <IoLocationOutline className="things-to-do-wrapper__container__search-suggestions__suggestion__icon" />
              <span className="things-to-do-wrapper__container__search-suggestions__suggestion__title">تهران</span>
            </div>

            <hr className="things-to-do-wrapper__container__search-suggestions__hr" />

            <div
              className="things-to-do-wrapper__container__search-suggestions__suggestion"
              onClick={() => {
                suggestionsSearchHandler('شیراز');
              }}
            >
              <IoLocationOutline className="things-to-do-wrapper__container__search-suggestions__suggestion__icon" />

              <span className="things-to-do-wrapper__container__search-suggestions__suggestion__title">شیراز</span>
            </div>

            <hr className="things-to-do-wrapper__container__search-suggestions__hr" />

            <div
              className="things-to-do-wrapper__container__search-suggestions__suggestion"
              onClick={() => {
                suggestionsSearchHandler('اصفهان');
              }}
            >
              <IoLocationOutline className="things-to-do-wrapper__container__search-suggestions__suggestion__icon" />

              <span className="things-to-do-wrapper__container__search-suggestions__suggestion__title">اصفهان</span>
            </div>

            <hr className="things-to-do-wrapper__container__search-suggestions__hr" />

            <div
              className="things-to-do-wrapper__container__search-suggestions__suggestion"
              onClick={() => {
                suggestionsSearchHandler('یزد');
              }}
            >
              <IoLocationOutline className="things-to-do-wrapper__container__search-suggestions__suggestion__icon" />

              <span className="things-to-do-wrapper__container__search-suggestions__suggestion__title">یزد</span>
            </div>
          </div>
        )}
        {searchQuery.length >= 1 && queryResults.length > 0 && (
          <div className="things-to-do-wrapper__container__search-suggestions">
            {queryResults.map((result, index) => {
              return (
                <>
                  <div
                    className="things-to-do-wrapper__container__search-suggestions__suggestion"
                    key={index}
                    onClick={() => {
                      suggestionsSearchHandler(result.label);
                    }}
                  >
                    <IoLocationOutline className="things-to-do-wrapper__container__search-suggestions__suggestion__icon" />
                    <span className="things-to-do-wrapper__container__search-suggestions__suggestion__title">
                      {result.label}
                    </span>
                  </div>
                  {index !== queryResults.length - 1 && (
                    <hr className="things-to-do-wrapper__container__search-suggestions__hr" />
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PlaceThingsToDoSearch;
