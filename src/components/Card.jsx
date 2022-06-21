export default function Card({card, handleChoice, flipped, disabled}) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="rounded-lg border-2 border-white p-1 h-32 w-32">
      {flipped && <img src={card.src} alt="test" className="h-full w-full" />}
      {!flipped && <img 
        src="/img/cover.png" 
        onClick={handleClick} 
        className="h-full w-full" />}
    </div>
  )
}
