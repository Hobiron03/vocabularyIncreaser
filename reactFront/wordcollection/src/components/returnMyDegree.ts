const returnMyDegree = (level: number): string => {
  let degree = "名もなき者";
  if (level === 1) {
    degree = "名もなき者";
  } else if (level === 2) {
    degree = "かけ出し冒険者";
  } else if (level > 2 && level <= 4) {
    degree = "かけ出し冒険者";
  } else if (level > 4 && level <= 5) {
    degree = "勉強熱心";
  } else if (level > 5 && level <= 7) {
    degree = "ことばマニア";
  } else if (level > 7 && level <= 9) {
    degree = "世界一のボキャブラリー";
  } else if (level > 9 && level <= 11) {
    degree = "言語学者";
  } else if (level > 11 && level <= 13) {
    degree = "創生者";
  } else if (level > 13 && level <= 15) {
    degree = "名を冠する者";
  } else {
    degree = "神";
  }
  return degree;
};

export default returnMyDegree;
