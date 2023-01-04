# pyErrorJP

　Pythonのエラーコードの文章に対して、日本語の補足説明をつけるJavaScript

# How to use

　次のA,Bの2種類の利用方法がある。

## A. ブラウザで動作するIDEに埋め込む

1. 「Pyodide」や「Jupyter notebook」などのブラウザ上で動作する「Python IDE」に「pyErrorJP.js」を埋め込む。
2.  標準エラー出力の出力するコードの直後に「generateMsgJP(stderr)」を追記する。※stderr=String型の標準エラー出力
3.  自動的にエラーに補足説明がつくようになる

### 埋め込み例（Pyodide Console）：  

>　[https://s-sasaki-gunma.github.io/pyErrorJP/console.html](https://s-sasaki-gunma.github.io/pyErrorJP/console.html)

## B. ブックマークレットとして利用

1. 下記のJavaScriptをブックマークに登録する
2. ブラウザ上のエラーの文字列をマウスで選択する
3. 選択状態で登録したブックマークをクリックすると、エラーに関する補足説明が画面にポップアップする

``` javascript
javascript:(
  function(){
    let el = document.createElement('script');
    el.src = 'https://s-sasaki-gunma.github.io/pyErrorJP/pyErrorJP.js';
    document.body.appendChild(el);
    el.onload = function(){
      let err_msg = document.getSelection().toString();
      alert( err_msg + '\n' + generateMsgJP(err_msg) );
      el.remove();
    }
  }()
);
```
