import { useEffect, useState } from "react";
import "./App.css";
import "./card.css";

const getImages = () => {
  const images = [];
  for (let i = 0; i <= 1; i++) {
    for (let i = 1; i <= 6; i++) {
      images.push({
        id: i,
        path: `../public/Flower${i}.jpg`,
      });
    }
  }

  return images.sort(() => Math.random() * 10 - 5);
};

function App() {
  const [cardImages, setCardImages] = useState(getImages);
  const [clickIndexArr, setClickIndexArr] = useState<any[]>([]);

  // index를 선택한 카드가 뒤지어 져야 한다. 다르르
  const handleClick = (index: number, card: any) => {
    console.log("index", index);
    console.log("card", card);
    setClickIndexArr((prev) => [...prev, { index, ...card }]);
  };

  useEffect(() => {
    console.log("clickIndexArr", clickIndexArr);
    // clickIndexArr.forEach((item, index) => {
    //   if (index % 2 !== 0) {
    //     let prevIndex = index - 1;
    //     const isDifferent =
    //       clickIndexArr[index].id !== clickIndexArr[prevIndex].id;
    //     if (isDifferent) {
    //       setClickIndexArr([]);
    //     }
    //   }
    // });
  }, [clickIndexArr.length]);

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
          return (
            <div
              key={index}
              className={
                clickIndexArr.find((item) => item.index === index)
                  ? "card-click"
                  : "card"
              }
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
        {/* <div
          className={!isImageShow ? "card" : "card-click"}
          onClick={handleClick}
        >
          <div className="card-inner">
            <div className="card-front">텍스트</div>
            <div className="card-back">이미지</div>
          </div>
        </div>
        <div className="card">2</div>
        <div className="card">3</div>
        <div className="card">4</div>

        <div className="card">1</div>
        <div className="card">2</div>
        <div className="card">3</div>
        <div className="card">4</div>

        <div className="card">1</div>
        <div className="card">2</div>
        <div className="card">3</div>
        <div className="card">4</div> */}
      </div>
    </>
  );
}

export default App;
