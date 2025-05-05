import { useState } from "react";
import "./App.css";
import "./Header.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <div className="title-bar">
          <div className="left">
            <img />
            <div className="title">
              <div className="title-input">
                <input value="묭묭이와 먹을 음식 리스트~히히" />
                <div>별포 아이콘 드라이브 아이콘 구름 아이콘</div>
              </div>
              <div>
                파일 수정 보기 삽입 서식 데이터 도구 확장 프로그램 도움말
              </div>
            </div>
          </div>
          <div className="right">
            시계 아이콘 챗팅 아이콘 카메라 아이콘 공유탭
          </div>
        </div>
        <div className="menu-bar">아이콘1 아이콘2 아이콘3 아이콘4 아이콘5</div>
      </div>

      <div className="excel-container">
        <div className="excel-header">dd</div>
        <div className="excel-body">dd</div>
      </div>
    </>
  );
}

export default App;
