import _ from 'lodash';

const propertyData = {
  id: 1,
  propertyName: '1BR Japanese-style Private Room near Kyoto Station',
  propertyType: 'private',
  cancelPolicy: 'strict',
  roomNum: 1,
  bathroomNum: 1,
  priceInDollars: 50,
  host: {
    id: 1,
    firstName: 'Tom'
  }
}

function handleClick(e) {
  e.preventDefault();
  const mainEl = document.getElementById('main');
  /*
    getDataを呼び出して、mainEl.innerHTMLを利用して、結果を出力します。
  */
  getData().then((data) => {
    mainEl.innerHTML = `
      <h3>宿泊施設名：${data.propertyName}</h3>
      <dl>
      <dt>部屋数：</dt><dd>${data.roomNum}</dd>
      <dt>バスルーム数：</dt><dd>${data.bathroomNum}</dd>
      <dt>料金（ドル）：</dt><dd>${data.priceInDollars}</dd>
      <dt>ホストID：</dt><dd>${data.host.id}</dd>
      <dt>ホスト名：</dt><dd>${data.host.firstName}</dd>
      </dl>
    `
  })
  .catch((err) => {
    mainEl.innerHTML = `<p>${err}</p>`
  })
}

function getData() {
  /*
    fetchDataを呼び出して、戻ってきたデータのsuccessの値を元にresolveで物件データまたは、rejectでエラーメッセージを返す。
  */
  return fetchData().then((results) => {
    if (results.success) {
      return Promise.resolve(results.propertyData);
    } else {
      return Promise.reject(results.message);
    }
  })
}

function fetchData() {
  /*
    lodashのrandom()を使って、80%の確率で正しいデータを返し、20%の確率でエラーを返すようにしましょう。
    またsetTimeoutを利用して、1秒待ってから結果を得るようにします。
  */
  return new Promise((resolve) => {
    setTimeout(function () {
      const random = _.random(1,5);
      if (random <= 4) {
        resolve(Object.assign({}, {propertyData}, {success: true}));
      } else {
        resolve({
          success: false,
          message: 'データの取得に失敗しました。'
        });
      }
    }, 1000);
  })
}

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", handleClick);
}
