const returnMyDegree = (level: number): string => {
  let degree = "名もなき者";
  if (level === 1) {
    degree = "かけだし冒険者";
  } else if (level === 2) {
    degree = "冒険の始まりだ！";
  } else if (level > 2 && level <= 4) {
    degree = "破壊僧";
  } else if (level > 4 && level <= 5) {
    degree = "言葉の神";
  } else if (level > 5 && level <= 6) {
    degree = "言語学者";
  } else if (level > 7 && level <= 10) {
    degree = "言葉の神";
  }
  return degree;
};

export default returnMyDegree;
