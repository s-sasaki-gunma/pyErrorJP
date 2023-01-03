function generateMsgJP(error_document){
  let err_doc = error_document.split('\n').slice(-1)[0];
  let err_cls = err_doc.split(':')[0];
  let err_msg = err_doc.substr(err_cls.length+2);
  console.log(err_cls, err_msg);

  function getErrorType(error_class){
    const error_classes = {
      'SyntaxError': '文法エラー',
      'IndentationError': 'インデントのエラー',
      'TabError': 'タブとスペースの混在エラー',
      'NameError': '名前に関するエラー',
      'AttributeError': '属性に関するエラー',
      'ModuleNotFoundError': 'モジュールエラー',
      'IndexError': 'インデクス範囲外エラー',
      'ValueError': '値に関するエラー',
      'ZeroDivisionError': '0除算エラー',
      'TypeError': '型に関するエラー'
    };
    let res_msg = '【エラー(' + error_class + ')】\n';
    if ( error_class in error_classes ) {
      res_msg = '【' + error_classes[error_class] + '(' + error_class + ')】\n';
    }
    return res_msg;
  }

  function getErrorComplement(error_class, error_message){
    function getDataType(name, suffix=''){
      const types = {
          'str': '文字列',
          'int': '整数',
          'float': '数値',
          'list': 'リスト',
          'tuple': 'タプル'
      };
      let res_msg = name + '型' + suffix;
      if ( name in types ){
        res_msg = types[name] + '(' + name + '型)';
      }
      return res_msg;
    }

    // SyntaxError
    if ( 'invalid syntax' == error_message ){
      return '　文法が正しくありません。入力ミス等が無いか確認してください。';
    }
    if ( m = (/name '(.*)' is not defined/).exec(error_message) ) {
      return '　「' + m[1] + '」という名前の変数などは見つかりませんでした。スペルミスや、大文字小文字の打ち間違い等をしていないか確認してください。';
    }
    if ( m = (/'(.*)' was never closed/).exec(error_message) ){
      return '　「' + m[1] + '」を閉じ忘れています。';
    }
    if ( m = (/unterminated (?:triple-quoted )?string literal \(detected at line (\d+)\)/).exec(error_message) ){
        return '　文字列が閉じられていません。クォートを忘れていませんか？（' + m[1] + '行目で検出）';
    }
    if ( m = (/EOF while scanning (?:triple-quoted )?string literal/).exec(error_message) ){
        return '　文字列が閉じられていません。クォートを忘れていませんか？';
    }
    if ( 'expected \':\'' == error_message ){
        return '　コロン「:」を忘れています。';
    }
    if ( 'invalid syntax. Perhaps you forgot a comma?' == error_message ){
        return '　文法が正しくありません。コンマ「,」を忘れていませんか？';
    }
    if ( 'invalid syntax. Maybe you meant \'==\' or \'=\' instead of \'=\'?' == error_message ){
        return '　文法が正しくありません。「=」ではなく「==」や「=」ではありませんか？';
    }
    if ( 'cannot assign to literal here. Maybe you meant \'==\' instead of \'=\'?' == error_message ){
        return '　リテラル（文字や数字）に代入することはできません。「=」ではなく「==」ではありませんか？';
    }
    if ( 'cannot assign to expression here. Maybe you meant \'==\' instead of \'=\'?' == error_message ){
        return '　式に代入することはできません。「=」ではなく「==」ではありませんか？';
    }
    if ( 'cannot assign to attribute here. Maybe you meant \'==\' instead of \'=\'?' == error_message ){
        return '　ここで属性に代入することはできません。「=」ではなく「==」ではありませんか？';
    }
    if ( 'EOL while scanning string literal' == error_message ){
        return '　文字列が閉じられていません。クォートを忘れていないか確認してください。';
    }
    if ( 'unexpected EOF while parsing' == error_message ){
        return '　カッコ等の閉じ忘れをしていないか確認してください。';
    }
    if ( m = (/closing parenthesis '(.*)' does not match opening parenthesis '(.*)'/).exec(error_message) ){
        return '　閉じカッコの\' ' + m[1] + ' \'が開きカッコの\' ' + m[2] + ' \'と一致していません。カッコの種類を揃えてください。';
    }
    if ( m = (/unmatched '(.*)'/).exec(error_message) ){
        return '　対応するカッコの無い「' + m[1] + '」があります。';
    }
    if ( m = (/Missing parentheses in call to '(.*)'. Did you mean (.*)\?/).exec(error_message) ){
        return '　「 ' + m[1] + ' 」を呼び出すにはカッコが必要です。例： ' + m[2];
    }
    if ( 'Generator expression must be parenthesized' == error_message ){
        return '　ジェネレータ式にはカッコが必要です。';
    }
    if ( 'did you forget parentheses around the comprehension target?' == error_message ){
        return '　内包表記のターゲットをカッコで囲むのを忘れていませんか？';
    }
    if ( 'invalid non-printable character U+3000' == error_message ){
        return '　全角空白が使われています。半角空白に直してください。';
    }
    if ( m = (/invalid character '([（）’”＋－＊／％：＜＞＝！])' \((.*)\)/).exec(error_message) ){
        return '　全角の ' + m[1] + ' が使われています。英語入力状態で書き直してください。';
    }
    if ( m = (/invalid character '(.*)' \((.*)\)/).exec(error_message) ){
        return '　不正な文字 ' + m[1] + ' が使われています。';
    }

    // IndentationError, TabError
    if ( 'unexpected indent' == error_message ){
        return '　インデントが入るべきでない場所に入ってしまっています。';
    }
    if ( 'expected an indented block' == error_message ){
        return '　インデントが入るべき場所にありません。';
    }
    if ( 'unindent does not match any outer indentation level' == error_message ){
        return '　合わせるべきインデントが合っていません。';
    }
    if ( m = (/expected an indented block after '([^']+)' statement [oi]n line (\d+)/).exec(error_message) ){
        return '　' + m[2] + '行目の ' + m[1] + ' の後に、インデントがありません。';
    }
    if ( 'inconsistent use of tabs and spaces in indentation' == error_message ){
        return '　インデントにタブとスペースが混在しています。';
    }

    // IndexError
    if ( 'list index out of range' == error_message ){
        return '　リストの範囲外を参照しようとしています。リストの大きさと参照しようとした位置を確認してください。';
    }
    if ( 'tuple index out of range' == error_message ){
        return '　タプルの範囲外を参照しようとしています。タプルの大きさと参照しようとした位置を確認してください。';
    }
    if ( 'string index out of range' == error_message ){
        return '　文字列の範囲外を参照しようとしています。文字列の長さと参照しようとした位置を確認してください。';
    }

    // NameError
    if ( m = (/name '(.*)' is not defined. Did you mean: '(.*)'\?/).exec(error_message) ){
        return '　「' + m[1] + '」という名前の変数などは見つかりませんでした。「' + m[2] + '」のスペルミスではありませんか？';
    }
    if ( m = (/name '(.*)' is not defined/).exec(error_message) ){
        return '　「' + m[1] + '」という名前の変数などは見つかりませんでした。スペルミスや、大文字小文字の打ち間違い等をしていないか確認してください。';
    }

    // TypeError
    if ( m = (/'(.*)' object is not subscriptable/).exec(error_message) ){
        return '　' + m[1] + 'オブジェクトは添字表記に対応していません。カッコの種類を間違えていませんか？あるいは、配列の次元数を間違えていませんか？';
    }
    if ( m = (/can only concatenate str \(not '(.*)'\) to str/).exec(error_message) ){
        return '　文字列に ' + getDataType(m[1],'のデータ') + 'を結合することはできません。';
    }
    if ( m = (/unsupported operand type\(s\) for \+: '(.*)' and '(.*)'/).exec(error_message) ){
        return '　' + getDataType(m[1]) + ' に ' + getDataType(m[2],'のデータ') + 'を足すことはできません。';
    }
    if ( m = (/(.*)\(\) missing (\d+) required positional argument(?:s)?: (.*)/).exec(error_message) ){
        let args = m[3].replace(', and ', ', ').replace(' and ', ', ');
        return '　' + m[1] + '() に必要な引数が ' + m[2] + ' 個（' + args + '）足りません。';
    }
    if ( m = (/(.*) expected at most (\d+) argument(?:s)?, got (\d+)/).exec(error_message) ){
        return '　' + m[1] + ' は引数（位置引数）を ' + m[2] + ' 個しか受け取りませんが、' + m[3] + ' 個の引数が与えられています。';
    }
    if ( m = (/(.*) takes at most (\d+) argument(?:s)? \((\d+) given\)/).exec(error_message) ){
        return '　' + m[1] + ' は引数（位置引数）を ' + m[2] + ' 個しか受け取りませんが、' + m[3] + ' 個の引数が与えられています。';
    }
    if ( m = (/(.*)\(\) takes (\d+) positional argument(?:s)? but (\d+) were given/).exec(error_message) ){
        return '　' + m[1] + '() は引数（位置引数）を ' + m[2] + ' 個しか受け取りませんが、' + m[3] + ' 個の引数が与えられています。';
    }
    if ( m = (/(.*)\(\) takes from (\d+) to (\d+) positional argument(?:s)? but (\d+) were given/).exec(error_message) ){
        return '　' + m[1] + '() は引数（位置引数）を ' + m[2] + '～' + m[3] + ' 個しか受け取りませんが、' + m[4] + ' 個の引数が与えられています。';
    }
    if ( m = (/(.*)\(\) got an unexpected keyword argument '(.*)'/).exec(error_message) ){
        return '　' + m[1] + '() に \'' + m[2] + '\' という未対応のキーワード引数が与えられています。';
    }
    if ( 'int() can\'t convert non-string with explicit base' == error_message ){
        return '　int() は引数を2つ与えた場合には、第一引数は「文字列型の数字」、第二引数は「2以上36以下の整数」です。\n　例： int("1010",2) と書くと、2進数の「1010」が10進数でいくつになるか求められる。'
    }

    // ValueError
    if ( m = (/invalid literal for int\(\) with base (\d+): (\'.*\')/).exec(error_message) ){
        return '　文字列 ' + m[2] + ' は、' + m[1] + '進法の数値として不適切です。';
    }
    if ( m = (/could not convert string to float: (\'.*\')/).exec(error_message) ){
        return '　文字列 ' + m[1] + ' を float 型に変換することはできません。';
    }

    // AttributeError
    if ( m = (/'(.*)' object has no attribute '(.*)'. Did you mean: '(.*)'\?/).exec(error_message) ){
        return '　' + getDataType(m[1],'のオブジェクト') + ' には、属性 ' + m[2] + ' はありません。「 ' + m[3] + ' 」のスペルミスではありませんか？';
    }
    if ( m = (/'(.*)' object has no attribute '(.*)'/).exec(error_message) ){
        return '　' + getDataType(m[1],'のオブジェクト') + ' には、属性 ' + m[2] + ' はありません。オブジェクトの型は想定通りか、属性名のスペルミスは無いか確認してください。';
    }

    // KeyError
    if ( 'KeyError' == error_class ){
        return '　' + error_message + 'というキーはありません。スペルミス等をしていないか確認してください。';
    }

    // ModuleNotFoundError, ImportError
    if ( m = (/No module named '(.*)'/).exec(error_message) ){
        return '　モジュール「' + m[1] + '」が見つかりません。このモジュールがインストールされているか、スペルミスをしていないか確認してください。';
    }
    if ( m = (/cannot import name '(.*)' from '(.*)'/).exec(error_message) ){
        return '　モジュール「' + m[2] + '」に、「' + m[1] + '」という名前のオブジェクトが見つかりません。スペルミスをしていないか等確認してください。';
    }

    // FileNotFoundError
    if ( m = (/\[Errno 2\] No such file or directory: '(.*)'/).exec(error_message) ){
        return '　ファイル「' + m[1] + '」が見つかりません。スペルミス等をしていないか確認してください。';
    }

    // ZeroDivisionError
    if ( 'division by zero' == error_message ){
        return '　0 で割ることはできません。除数（割る数）が予期せず 0 になっていないか確認してください。';
    }

    // その他エラー
    return error_message;
  }

  let res_msg = '\n'
              + '―――――――――――――――――――――――――――――\n'
              + '| Python本来のエラーメッセージは、上に表示されています。 |\n'
              + '| 調べる場合は、本来のエラーメッセージを検索して下さい。 |\n'
              + '―――――――――――――――――――――――――――――\n\n'

  res_msg = res_msg + getErrorType(err_cls);

  res_msg = res_msg + getErrorComplement(err_cls, err_msg);

  return res_msg;

}