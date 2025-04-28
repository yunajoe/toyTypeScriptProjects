import { useEffect, useState } from "react";
import "./App.css";
import "./card.css";

const getImages = () => {
  const images = [];
  for (let i = 0; i <= 1; i++) {
    for (let i = 1; i <= 6; i++) {
      images.push({
        id: i,
        index: 9999,
        path: `../public/Flower${i}.jpg`,
        showBackImage: false,
      });
    }
  }

  return images.sort(() => Math.random() * 10 - 5);
};

function App() {
  const [cardImages, setCardImages] = useState(getImages);
  const [cardIndexArr, setCardIndexArr] = useState<number[]>([]);
  const [turnCount, setTurnCount] = useState(0);

  // index를 선택한 카드가 뒤지어 져야 한다. 다르르
  const handleClick = (index: number, card: any) => {
    setCardIndexArr((prev) => [...prev, index]);
    setCardImages((prev) => {
      const copyPrev = [...prev];
      let targetCard = copyPrev[index];
      targetCard = {
        id: targetCard.id,
        index: index,
        path: targetCard.path,
        showBackImage: !targetCard.showBackImage,
      };
      copyPrev[index] = targetCard;
      return copyPrev;
    });
  };

  useEffect(() => {
    // cardIndexArrr의 length가 짝수가 될떄마다
    // 안에 있는 인덱스의 값에 해당하는 object의 id를 확인해보다
    // 다르면은 그 object의 showBackImage를 false로 다시 설정. 그리고 나서 cardIndexARr에서 제거한다 .
    if (cardIndexArr.length !== 0 && cardIndexArr.length % 2 === 0) {
      console.log("카운트!");

      // setTurnCount((prev) => prev + 1);
      let ids: number[] = [];
      cardIndexArr.forEach((cardIndex) => {
        let objId = cardImages[cardIndex].id;
        ids = [...ids, objId];
      });
      const set = Array.from(new Set(ids));
      // id가 다르다
      if (ids.length === set.length) {
        const [index1, index2] = cardIndexArr;
        const [obj1, obj2] = [cardImages[index1], cardImages[index2]];

        obj1.showBackImage = false;
        obj2.showBackImage = false;

        setTimeout(() => {
          setCardImages((prev) => {
            const copyPrev = [...prev];
            copyPrev[obj1.index] = obj1;
            copyPrev[obj2.index] = obj2;
            return copyPrev;
          });
          setCardIndexArr([]);
          setTurnCount((prev) => prev + 1);
        }, 800);
      } else {
        setCardIndexArr([]);
      }
    }
  }, [cardIndexArr.length]);

  console.log("cardImages", cardImages);

  return (
    <>
      <div className="title-container">
        <h1>Test Your Memory</h1>
        <div>New Game</div>
        <div className="count-container">
          {/* Turns는 총 시도해 볼 수 있는 횟수...  */}
          <p>Turns</p>
          <p>:</p>
          <p>{turnCount}/15</p>
        </div>
      </div>
      {/* card container */}
      <div className="card-container">
        {cardImages.map((card, index) => {
          return (
            <div
              key={index}
              className={card.showBackImage ? "card-click" : "card"}
              onClick={() => handleClick(index, card)}
            >
              <div className="card-inner">
                <div className="card-front">텍스트</div>
                <div className="card-back">
                  <img
                    src={card.path}
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
