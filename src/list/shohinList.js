import shohinListSource from '../json/shohin.json';

export const columns = [
  ['hincd', '商品コード',  350110700,], 
  ['hinnm', '商品名'  ,  "ﾏｱｼﾞｵﾄｼﾐ",], 
  ['size' , 'サイズ'  ,  "",], 
  ['yoryo', '容量'   ,  1000,], 
  ['juryo', '重量区分' ,  "G",], 
  ['irisu', '入数'   ,  20], 
].map(([name, title, sample ]) => ({ name, title, sample }));

export const shohinList = shohinListSource.map((row) => {
  const dic = {};
  Object.entries(row).forEach(([ title, value ]) => {
    const name = columns.find(({ title: check }) => check === title).name;
    dic[name] = value;
  });
  return dic;
});

