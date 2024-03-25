export default function ScoreBoard({ data }) {
  return (
    <div className='scoreboard'>
      <div className='timer'>
        <div className='display-value'>{data.timeLeft}</div>
        <div>Time</div>
      </div>
      <div className='title'>
        Galaxy <br /> Guardian
      </div>
      <div className='score'>
        <div className='display-value'>{data.score}</div>
        <div>Score</div>
      </div>
    </div>
  )
}
