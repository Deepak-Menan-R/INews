import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import axios from "axios";

const NftCard = ({ title, author, image, description, url, extra }) => {
  const [heart, setHeart] = useState(true);

  // Function to handle clicking on "Click to Read" button
  const handleClickRead = () => {
    window.open(url, '_blank'); // Open article URL in a new tab
  };

  // Function to handle clicking on "Read Aloud" button
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      try {
        // Clear any previous utterances
        speechSynthesis.cancel();

        // Create new SpeechSynthesisUtterance instances
        const titleUtterance = new SpeechSynthesisUtterance(title);
        const descriptionUtterance = new SpeechSynthesisUtterance(description);
        const Tittle = new SpeechSynthesisUtterance("Tittle");
        const Description = new SpeechSynthesisUtterance("Description");

        // Use default voice for speech synthesis
        speechSynthesis.speak(Tittle);
        speechSynthesis.speak(titleUtterance);
        speechSynthesis.speak(Description);
        speechSynthesis.speak(descriptionUtterance);
      } catch (error) {
        console.error("Error occurred during speech synthesis:", error);
        alert("An error occurred during speech synthesis.");
      }
    } else {
      // Speech synthesis not supported, handle accordingly (e.g., show an error message)
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  // Function to handle translation
  const handleTranslate = () => {
    const API_KEY = "YOUR_GOOGLE_TRANSLATE_API_KEY";
    const targetLanguage = "en"; // Target language for translation (e.g., English)
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    axios
      .post(apiUrl, {
        q: description,
        target: targetLanguage,
      })
      .then((response) => {
        const translatedText = response.data.data.translations[0].translatedText;
        alert(`Translated Description: ${translatedText}`);
      })
      .catch((error) => {
        console.error("Error occurred during translation:", error);
        alert("An error occurred during translation.");
      });
    };

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={() => setHeart(!heart)}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {title}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              By {author}
            </p>
            <button
              onClick={handleTranslate}
              className="linear rounded-[20px] bg-gray-200 px-4 py-2 text-base font-medium text-gray-800 transition duration-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500 mr-2"
            >
              Translate
            </button>
          </div>

          <div className="flex">
            <button
              onClick={handleClickRead}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90 mr-2"
            >
              Click to Read
            </button>
            <button
              onClick={handleReadAloud}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Read Aloud
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
