import barba, { ISchemaPage } from '@barba/core'
import gsap from 'gsap'

class App {
  constructor() {
    // インスタンスが一回しか生成されないかチェック
    console.log('create app: ' + Math.random())
    this.init()
  }

  private init() {
    barba.init({
      views: [
        {
          namespace: 'home',
          afterEnter(data) {
            console.log(data.next.namespace)
          },
        },
        {
          namespace: 'about',
          afterEnter(data) {
            console.log(data.next.namespace)
          },
        },
        {
          namespace: 'demo',
          afterEnter(data) {
            console.log(data.next.namespace)
          },
        },
      ],
      transitions: [
        {
          name: 'cover',
          leave: async () => {
            return await gsap.fromTo(
              '.transition-cover',
              { clipPath: 'inset(0 100% 0 0)' },
              { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out' },
            )
          },
          enter: () => {
            gsap.fromTo(
              '.transition-cover',
              { clipPath: 'inset(0 0 0 0%)' },
              { clipPath: 'inset(0 0 0 100%)', duration: 0.5, ease: 'power2.out' },
            )
          },
        },
      ],
    })

    barba.hooks.beforeEnter((data) => {
      this.replaceHead(data.next)
    })
  }

  private replaceHead(next: ISchemaPage) {
    // https://www.willstyle.co.jp/blog/1722/
    const head = document.head

    const newPageRawHead = next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
    const newPageHead = document.createElement('head')
    newPageHead.innerHTML = newPageRawHead

    // prettier-ignore
    const removeHeadTags = [
      "meta[name='description']",
    ].join(',')

    const headTags = head.querySelectorAll(removeHeadTags)
    for (let i = 0; i < headTags.length; i++) {
      head.removeChild(headTags[i])
    }
    const newHeadTags = newPageHead.querySelectorAll(removeHeadTags)

    for (let i = 0; i < newHeadTags.length; i++) {
      head.appendChild(newHeadTags[i])
    }
  }
}

new App()
