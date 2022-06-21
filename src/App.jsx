import { useEffect, useState } from "react"
import Card from "./components/Card"

const cards = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {
  
  const [gameCards, setGameCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)

    setGameCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setGameCards(prevGameCards => {
          return prevGameCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
             } else {
              return card
             }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(),1000)
      }
      
    }
  },[choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCards()
  }, [])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="h-screen bg-[#1b1523]">
      <div className='container mx-auto flex flex-col gap-8 p-6 items-center '>
        <h1 className='text-slate-200 text-4xl font-bold'>Magic Match</h1>
        <button 
          onClick={shuffleCards} 
          className='bg-black text-slate-200 -mt-3 border border-slate-200 py-1 px-2 font-bold rounded text-xl hover:bg-rose-500/70'
        >New Game</button>
        <div 
          className="grid grid-cols-4 gap-4 w-fit mx-auto"
        >
          {gameCards.map(card => (
              <Card 
                card={card} 
                key={card.id} 
                handleChoice={handleChoice} 
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled} />
            ))
          }
        </div>
        
        <span className="text-white mx-auto">Turn {turns}</span>
      </div>
      
      
    </div>
  )
}

export default App
