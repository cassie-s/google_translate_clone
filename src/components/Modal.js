import { useState } from 'react'

const Modal = ({
  setShowModal,
  languages,
  chosenLanguage,
  setChosenLanguage,
}) => {

  /* defining searched languages separately to reduce number of calls to api. Set it to an empty string if searching */
  const [searchedLanguage, setSearchedLanguage] = useState('')

  const filteredLanguages = (languages || []).filter((language) =>
    language.toLowerCase().startsWith(searchedLanguage.toLowerCase())
  )

  /* Set chosen language to what was clicked. Close the modal since we have chosen a langauge */
  const handleClick = (e) => {
    setChosenLanguage(e.target.textContent)
    setShowModal(false)
  }


  /* set the searched language to the event target value */
  const handleChange = (e) => {
    setSearchedLanguage(e.target.value)
    setChosenLanguage(e.target.value)
  }

  return (
    <div className="option-list">
      <div className="search-bar">
        <input value={chosenLanguage} onChange={handleChange} />
        {/* when clicking the close button, close the modal */}
        <div className="close-button" onClick={() => setShowModal(null)}>
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </div>
      <div className="option-container">
        <ul>
          {/*If filtered language exists, map it and get the index*/}
          {filteredLanguages?.map((filteredLanguage, _index) => (
            <div className="list-item">
              <div className="icon">
                {chosenLanguage === filteredLanguage ? '✓' : ''}
              </div>
              <li
                key={_index}
                onClick={handleClick}
                style={{
                  color: chosenLanguage === filteredLanguage ? '#8ab4f8' : null,
                }}
              >
                {filteredLanguage}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Modal