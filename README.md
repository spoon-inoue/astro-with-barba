# About
AstroとBarba.jsを併用したデモです。

https://astro-with-barba.vercel.app/

![657ef1fb6c35e2cdb61ff819a77998b6edec1a67](https://user-images.githubusercontent.com/105195761/217194855-c3f1642b-1c95-45d6-965c-27b61afc0933.png)

# Memo
Barba.jsを使った場合、ページ遷移のタイミングでタイトル以外のhead要素を置き換えません。<br/>
なので、ページ単位でStyleを分けて生成するAstroに適用すると、ページ遷移してもスタイルが当たってない状態になります。<br/>
このため、Barba.jsのページ遷移のタイミングで、head内のstyleを置換する必要がありました。<br/>
ただ、すべてのstyleを置換すると、遷移時に描画によるチラつきが発生してしまいました。Astroは、ページ単位でstyleファイルを作成しますが、明示的にglobalなstyleを分けることもできるので、globalなstyleファイルは置換しないようにしました。（Transition Coverのスタイルもここに含まれます）<br/>
PCではチラつかなくなりましたが、iphone実機ではそれでもチラつくが収まりませんでした。（結局、ページ固有のstyleの描画タイミングですこしチラついてしまう）<br/>
<br/>
面倒だったので、すべてのstyleファイルをバンドルして、いっぺんに読み込むようにしました。チラつきはなくなりましたが、方法としてこれが正しいのかわからないので（少なくともドキュメントにはない方法）、もっといいやり方があれば教えてください。


各ページで、`BundleStyles.astro`を呼び出しています。<br/>
Astroはページがビルドされたときにそのページに依存するスタイルをバンドルするので、BundleStylesでは、すべてのページコンポーネントをインポートしてstyleをひとつのファイルにバンドルしています。

https://github.com/spoon-inoue/astro-with-barba/blob/9a68b1afa107d107126d4d5926b95b05f4e37906/src/layouts/BundleStyles.astro#L1-L6


# References
- [オールインワンのWeb制作環境Astro！こんなのがほしかった。](https://cumak.net/blog/astro/)
- [Barba.js snippets](https://www.willstyle.co.jp/blog/1722/)
