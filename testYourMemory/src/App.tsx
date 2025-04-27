import { useState } from "react";
import "./App.css";
import "./card.css";

const getImages = () => {
  const images = [];
  for (let i = 0; i <= 1; i++) {
    for (let i = 1; i <= 6; i++) {
      images.push({
        id: i,
        path: `../public/Flower${i}.jpg`,
        showBackImage: false,
      });
    }
  }

  return images.sort(() => Math.random() * 10 - 5);
};

function App() {
  const [cardImages, setCardImages] = useState(getImages);
  const [clickIndexArr, setClickIndexArr] = useState<any[]>([]);
  const [isReset, setIsReset] = useState(false);

  // if (prev.find((item) => item.id === targetCard.id)) {

  //   // return [
  //   //   ...prev,
  //   //   {
  //   //     id: targetCard.id,
  //   //     path: targetCard.path,
  //   //     showBackImage: !targetCard.showBackImage,
  //   //   },
  //   // ];
  // }
  // index를 선택한 카드가 뒤지어 져야 한다. 다르르
  const handleClick = (index: number, card: any) => {
    console.log("index입니다", index);
    setCardImages((prev) => {
      const copyPrev = [...prev];
      let targetCard = copyPrev[index];
      targetCard = {
        id: targetCard.id,
        path: targetCard.path,
        showBackImage: !targetCard.showBackImage,
      };
      copyPrev[index] = targetCard;
      return copyPrev;
    });
  };
  console.log("cardImages", cardImages);

  return (
    <>
      <div className="title-container">
        <h1>Test Your Memory</h1>
        <div>New Game</div>
        <div className="count-container">
          <p>Turns</p>
          <p>:</p>
          <p>1/15</p>
        </div>
      </div>
      {/* card container */}
      <div className="card-container">
        {cardImages.map((card, index) => {
          // console.log("card", card);
          return (
            <div
              key={index}
              className={card.showBackImage ? "card-click" : "card"}
              // className={
              //   clickIndexArr[index].showBackImage ? "card-click" : "card"
              // }
              // className={
              //   clickIndexArr.find((item) => item.index === index)
              //     ? "card-click"
              //     : "card"
              // }
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
