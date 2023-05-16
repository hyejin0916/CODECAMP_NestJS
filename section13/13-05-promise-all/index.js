const fetchData = async () => {
  console.time('await time');
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('성공');
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('성공');
    }, 3000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('성공');
    }, 1000);
  });
  console.timeEnd('await time');
};

fetchData();

const fetchData2 = async () => {
  console.time('all time');

  const results = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('성공');
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('성공');
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('성공');
      }, 1000);
    }),
  ]);
  console.log(results);
  console.timeEnd('all time');
};

fetchData2();
