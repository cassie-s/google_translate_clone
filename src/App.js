import { useEffect, useState } from 'react'
import TextBox from './components/TextBox'
import Arrows from './components/Arrows'
import Button from './components/Button'
import Modal from './components/Modal'
import axios from 'axios'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [languages, setLanguages] = useState(null)
  const [inputLanguage, setInputLanguage] = useState('English')
  const [outputLanguage, setOutputLanguage] = useState('Spanish')
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')

/* Get languages from API and assign empty array in useEffect so it only runs once */
  const getLanguages = async () => {
    const response = await axios.get('http://localhost:8001/languages')
    setLanguages(response.data)
  }
  useEffect(() => {
    getLanguages()
  }, [])

  const translate = async () => {
    console.log('translate')
    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }
    const response = await axios.get('http://localhost:8001/translation', {
      params : data
    })
    console.log('response', response)
    setTranslatedText(response.data)
  }

  /* when clicking the arrows, input and outlook languages swap */

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  return (
    <div className="app">

      {/* if showModal is null, show the two text boxes */}

      {!showModal && (
        <>
          <TextBox
            style="input"
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            style="output"
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}

      {/* else show the Modal */}

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === 'input' ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === 'input' ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  )
}

export default App
