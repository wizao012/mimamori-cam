# CV連携・確認手順

## 組み込み済み

- 全HTML（A案、B案、thanks、company、privacy）にGTM-N3RCKG38のheadコードとbody直後のnoscript。
- A案フォーム: 氏名 name / 電話番号 tel / メール email / 郵便番号 postal / 住所 address。
- hidden項目: utm_source, utm_medium, utm_campaign, utm_term, utm_content, placement, keyword, matchtype, gclid, fbclid, lpv, lp_path, referrer。
- 追加: submitted_at（UTC ISO）、source_url、submission_id、privacy_consent。
- 流入パラメータはセッション内で保持（24時間を超えたものは読み込み時に破棄）。新しい流入パラメータがある場合は上書き。既定lpv=A。
- 個人情報を計測イベントへ渡さない。source_urlは許可した広告パラメータだけ、referrerはクエリを除く。
- no-cors + FormDataで指定Zapier Catch HookへPOST。Content-Typeは手動指定しない。
- POSTのPromise解決後だけform_submit_cvを一回pushし、GTMイベント処理を最大約1.8秒待ってthanks.htmlへ遷移。失敗・未入力・未同意ではCVを発火しない。
- サンクスページの再読込・直接アクセスでCVは発火しない。二重クリックを抑止。

## 大切な制約

添付PDFのno-cors方式はレスポンスがopaqueとなるため、HTTPエラーやZap停止をブラウザから判定できません。form_submit_cvは「ブラウザ送信処理完了」であり、Zapierの受理・シート保存・有効リード確定を保証するイベントではありません。送信タイムアウト時も実際は届いている場合があります。submission_idを使ってZapier側で再送の重複を排除してください。サーバー側の受信確認が必要な場合は別途中継API構成が必要です。

## Zapier側

1. 指定Catch HookのTest triggerでテストデータを取得する。
2. Code by ZapierのInput Dataに上記の各項目を対応付ける。特にtel / postal / addressを忘れない。
3. docs/zapier-format.jsのコードを貼り付ける。
4. 保存先シート・通知先など後続処理に出力を対応付ける。
5. submission_idによる重複排除を、書き込みや通知の前に設ける。
6. Zapを有効化して、テスト行・通知まで確認する。TESTデータは営業連絡の対象から外す。

## GTM側

1. カスタムイベントトリガーを作成: イベント名 `form_submit_cv`（完全一致）。
2. GA4・Google広告等の必要なCVタグへそのトリガーを設定し、GTM Previewで確認。
3. 「サンクスページ表示」でも同じCVを発火する設定は併用しない（二重計測防止）。
4. 氏名・電話番号・メール・住所をDOMから収集してGA4等へ送らない。
5. コンテナを公開。Cookie・同意管理、各媒体の要件は実際に配信するタグに合わせて確認。

確認用URL例: `/?utm_source=TEST&utm_medium=test&utm_campaign=TEST_CAM&gclid=TEST_GCLID&fbclid=TEST_FBCLID&lpv=A`

LP側でGTMコードを設置しても、コンテナ内のタグや広告アカウント側の設定が自動で作成されるわけではありません。

## 検証範囲

ローカルのスタブ検証: 未入力・ダミー電話・未同意・正常送信・二重送信・ネットワークエラー・広告パラメータ・直接サンクス表示を確認します。実際のZapier受信一覧とGTM Preview/広告管理画面の確認はアカウント所有者の作業です。

## 参考

- 依頼者提供「山本のLP作成やりかた_2605.pdf」
- https://developers.google.com/tag-platform/tag-manager/datalayer
- https://help.zapier.com/hc/en-us/articles/8496288690317-Trigger-Zap-workflows-from-webhooks
- 会社情報: https://biglobe-hikari-mybest-aimitsumori.pages.dev/company
- 方針原文: https://biglobe-hikari-mybest-aimitsumori.pages.dev/privacy.html
