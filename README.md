# mariadb-nlp-ko mariadb fulltext

mysql/mariadb의 스토리지 엔진인 innodb에서 한국어 fulltext 검색이 지원된다고 해서 데이터를 대량으로 넣은 상태에서 테스팅을 진행하였다.

데이터 출처. 여기서 json파일들을 다운받고 src/data에 넣으면 된다
https://github.com/e9t/nsmc/tree/master/raw

실행결과 정규식을 통한 검색보다는 확연이 빠른 모습(단어 4개짜리 검색을 하였을때 약 4-500ms가량 빠름)을 보이지만 정확도면에서 아쉬운 부분이 있었고, 데이터량이 적은 상황이면 그냥 정규식을 쓰는것이 좋을 것으로 보인다.
추후에 elasticsearch도 다룰 일이 있으면 이와 리스크 비교를 해보는것도 재미있어 보임.
