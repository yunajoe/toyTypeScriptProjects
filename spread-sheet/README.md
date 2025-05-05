# 스프레트 시트 기능

1. 구글 스프레드의 파일, 수정, 보기, 서식, 데이터와 같게하기

2. 쿼리문

   - 특정 열 선택  
     ex) =QUERY(A1:D11, "SELECT A, B", 1)
     A, B열에 해당하는 컬럼 값들만 나옴

   - 전체 열 선택
     ex) =QUERY(A1:D11, "SELECT \*", 1)

   - WHERE 조건
     ex) =QUERY(A1:D12, "SELECT A, D WHERE D > 4000", 1)
     ex) =QUERY(A1:D12, "SELECT A WHERE B = 'mouse'", 1)
     ex) =QUERY(A1:D12, "SELECT A, B, D WHERE B = 'webcam' AND D = 3800", 1)
     ex) =QUERY(A1:D12, "SELECT A, C WHERE C >= date '2019-05-01'", 1)

   - LABEL (열 이름 바꾸기)
     ex) =QUERY(A1:D12, "SELECT A, D LABEL A '직원', D '판매금액'", 1)

   - ORDER BY (정렬)
     ex) =QUERY(A1:D12, "SELECT A, D ORDER BY D DESC", 1)

   - LIMIT
     ex) QUERY(A1:D12, "SELECT A, B LIMIT 5", 1)

   - GROUP BY
     ex) QUERY(A1:D12, "SELECT A, SUM(D) GROUP BY A", 1)

   - FORMAT (금액 포맷 지정)
     ex) QUERY(A1:D12, "SELECT A, D FORMAT D '₩#,##0'", 1)

   - OFFSET (몇 행 건너뛰기)
     ex) QUERY(A1:D12, "SELECT A, D OFFSET 5", 1)
