const SelectDropDown = ({ style, setShowModal, selectedLanguage }) => {
  {/* when clicking the drop-down, the modal opens with a specific style */}
  return (
    <div onClick={() => setShowModal(style)} className="select-drop-down">
      <input value={selectedLanguage} readOnly />
      <div className="down-arrow">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
      </div>
    </div>
  )
}

export default SelectDropDown
