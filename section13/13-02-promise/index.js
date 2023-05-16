const fetchData = async () => {
  // API 보내기 요청!!

  const result = await new Promise((성공시함수, 실패시함수) => {
    setTimeout(() => {
      try {
        console.log('이미지 받아옴');
        성공시함수('image');
      } catch (error) {
        실패시함수('error');
      }
    }, 5000);
  });
  console.log(result);
};

fetchData();
