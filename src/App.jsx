import { useState, useEffect } from "react";
import useSound from "use-sound";
import PlayArea from "./components/PlayArea";
import ScoreBoard from "./components/ScoreBoard";
import "./styles.css";
export default function App() {
  const STARTING_TIME = 60;
  const STARTING_SCORE = 0;
  const [timerRunning, setTimerRunning] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(STARTING_TIME);
  const [score, setScore] = useState(STARTING_SCORE);
  const [playSong] = useSound("../audio/song.mp3");
  const [playClick] = useSound("../audio/click.mp3", { volume: 0.45 });

  function handleOnClick(e) {
    e.preventDefault();
    setTimerRunning(true);
    playSong();
    playClick();
  }



  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timerId = setInterval(() => {
        // Decrement the time by 1 second
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      // Clean up the interval when the component unmounts or when timerRunning becomes false
      return () => {
        clearInterval(timerId);
      };
    }
    // When timeLeft reaches 0, stop the timer and reset state

    if (!timeLeft) {
      setTimerRunning(false);
      setTimeLeft(STARTING_TIME);
      setScore(STARTING_SCORE)
      setIsGameFinished(true)
    }
  }, [timeLeft, timerRunning]);

  return (
    <div>
      <ScoreBoard data={{ score, timeLeft }} />
      {isGameFinished && (
        <>
        <h2>{`Your score ${score}`}</h2>
        </>
      )}
      <PlayArea playProps={{ timeLeft, timerRunning, setScore }} />
      <button
        className={`play-button ${timerRunning ? "fade-out" : "fade-in"}`}
        onClick={handleOnClick}
        disabled={timerRunning} // Disable the button when timer is running
      >
        Başlat
      </button>
    </div>
  );
}

/* Challenge 

       Uygulamanın temel oyun bileşenleri zaten yerinde, ancak başlat butonu ve zamanlayıcı tamamlanmamış durumda. Sizin göreviniz oyunu çalıştırmak için bunları ayarlamayı bitirmek

        1. Kullanıcı başlat butonuna tıkladığında. 
            - zamanlayıcı saniyeleri geri saymaya başlar.
            - başlat butonunun classList'inde "fade-in" class'ı "fade-out" ile değiştirilir.
            - başlat butonu devre dışı bırakılır. 
            - playSong() ve playClick() çağrılarak müzik ve tıklama sesi çalınır. 
        
        2. 0 saniyede zamanlayıcı durur ve başlat butonunun classList'inde "fade-out", "fade-in" ile değiştirilir. 
        
        3. Oyuncu daha sonra başlat butonuna tekrar tıklarsa, zamanlayıcı 60 saniyeye sıfırlanır ve skor 0'a sıfırlanır ve görev 1'de listelenen her şey tekrar gerçekleşir. 
        
        4. Bu görevleri yerine getirmek için *sadece* bu yorumların altına kod yazmanız gerekir; bunların üzerinde veya farklı bir dosyada herhangi bir şey değiştirmeniz veya eklemeniz gerekmez 
*/
