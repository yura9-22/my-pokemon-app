import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css' //初期ファイルに入っているCSSを読み込む

//アプリケーションのメインコンポーネント
function  PokemonCardList() {
  //1.状態管理:データを保存する場所
  /*const [値, 値を更新する関数] = useState(初期値);*/
  const [cards, setcards] = useState([]); //取得したカードデータを配列で保持
  const [loading, setLoading] = useState(true); //ロード中かどうかを管理（初期値はtrue）
  const [error, setError] = useState(null); //エラーが発生した場合にメッセージを保持

  //2.API呼び出しの関数（非同期処理）
  const fetchCards = async () => {
    const API_URL = 'https://api.pokemontcg.io/v2/cards?q=set.id:base1&pageSize=10'; //1. ベースセットのカードを10枚取得するURL
    try {
      const response = await axios.get(API_URL);//2. axiosでAPIを呼び出す

      setcards(responce.data.data); //3. 取得したデータを状態に保存
      setLoading(false); //4. ロード完了
    } catch (err) {
      setError(err); //5. エラーが発生した場合にメッセージを設定
      setLoading(false); //6. ロード完了
      console.error('APIからのデータ取得に失敗しました:', err); //7. エラーログをコンソールに表示
    }
  }

  //3.副作用の管理：コンポーネントが最初に表示された時に実行
  useEffect(() => {
    fetchCards();
    //依存配列が空の[]なので、コンポーネントの初回マウント時（表示時）に一度だけ実行される
    //[]内に変数が置かれている場合、その変数が変更されるたびに実行される
  },[]);

  //4.UIの表示（ローディングとエラーのハンドリング）
  if (loading) {
    return (
  <div className='loading'>
    <h1>カードをロード中…</h1>
    <p>APIからデータを取得しています</p>
    </div>
  )}; 
if (error) {
  return (
    <div className='error-message'>
      <p>エラーが発生しました: {error.message}</p>
    </div>
  )};

  return (
    <div className="card-container">
      <h1>ポケモンカード一覧(API連携済み)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {/*取得したデータをループ処理で表示*/}
        {cards.map((card) => (
          <div key={card.id} className='card-item'>
            <h2>{card.name}</h2>
            {/*取得したURLを使って画像を表示*/}
            <img src={card.images.small} alt={card.name} style={{width: '100%'}} />
            </div>
        ))}
      </div>
    </div>
  );
}
export default PokemonCardList;