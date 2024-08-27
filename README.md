## flexible-infinity-scroll for react

* This plugin can use it to do infinity scroll in React.
* Even if infinite items have different height values, the rendering is calculated and displayed flexibly.

****

> Full Screen Infinity Scroll

```scss
.content {
  padding: 1rem;
}

.scroll_wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scroll_item {
  box-shadow: 0 0 3px black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;

  .img_wrap {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: grey;
    margin-right: 0.5rem
  }

  .text_wrap {
    white-space: pre-wrap;
  }
}
```

```tsx
import React, {useEffect, useRef, useState} from "react";
import {uesScrollPaging} from "flexible-infinity-scroll/lib/uesScrollPaging";
import {ScrollPagingWrap} from "flexible-infinity-scroll/lib/ScrollPagingWrap";
import {ScrollPagingItem} from "flexible-infinity-scroll/lib/ScrollPagingItem";
import {ScrollPagingMore} from "flexible-infinity-scroll/lib/ScrollPagingMore";
import infinityCss from './infinityScroll.module.scss'

type paramType = {
  cnt: number
}

const FullScreen = () => {
  const [list, setList] = useState<paramType[]>([])

  useEffect(() => {
    getEvent()
  }, [])

  const {wrap, item, more,} = uesScrollPaging({list});

  const getEvent = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const items: paramType[] = Array(10).fill(0).map(() => ({cnt: Math.floor(Math.random() * 5 + 3)}))
    list.push(...items)
    setList([...list])
  };

  return (
    <div className={infinityCss.content}>
      <ScrollPagingWrap as={'div'} className={infinityCss.scroll_wrap} {...wrap}>
        <ScrollPagingItem as={'div'} className={infinityCss.scroll_item} {...item}>
          {(v, i) => {
            return <>
              <div className={infinityCss.img_wrap}></div>
              <div>
                <div>Index : {i}</div>
                <div>Line : {v.cnt}</div>
                <div className={infinityCss.text_wrap}>{'\\n\n'.repeat(v.cnt)}</div>
              </div>
            </>
          }}
        </ScrollPagingItem>
      </ScrollPagingWrap>
      <ScrollPagingMore as={'div'} event={getEvent} {...more} css={css`display: flex; justify-content: center; align-content: center`}>
        Loading...
      </ScrollPagingMore>
    </div>
  )
}

export default FullScreen
```
![Animation](https://github.com/user-attachments/assets/a2c5a63c-7f22-4b3e-ad0d-a9283815ec3b)

****

> Independent Infinity Scroll

```scss
.content {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
}

.scroll_container {
  overflow: auto;
  width: 50vw;
  min-width: 400px;
  height: 500px;
  border: 1px solid grey;
  padding: 1rem
}

.scroll_wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scroll_item {
  box-shadow: 0 0 3px black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;

  .img_wrap {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: grey;
    margin-right: 0.5rem
  }

  .text_wrap {
    white-space: pre-wrap;
  }
}
```

```tsx
import React, {useEffect, useRef, useState} from "react";
import {uesScrollPaging} from "flexible-infinity-scroll/lib/uesScrollPaging";
import {ScrollPagingContainer} from "flexible-infinity-scroll/lib/ScrollPagingContainer";
import {ScrollPagingWrap} from "flexible-infinity-scroll/lib/ScrollPagingWrap";
import {ScrollPagingItem} from "flexible-infinity-scroll/lib/ScrollPagingItem";
import {ScrollPagingMore} from "flexible-infinity-scroll/lib/ScrollPagingMore";
import infinityCss from './infinityScroll.module.scss'

type paramType = {
  cnt: number
}

const Independent = () => {
  const [list, setList] = useState<paramType[]>([])

  useEffect(() => {
    getEvent()
  }, [])

  const {container, wrap, item, more,} = uesScrollPaging({list});

  const getEvent = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const items: paramType[] = Array(10).fill(0).map(() => ({cnt: Math.floor(Math.random() * 5 + 3)}))
    list.push(...items)
    setList([...list])
  };

  return (
    <div className={infinityCss.content}>
      <ScrollPagingContainer as={'div'} className={infinityCss.scroll_container} {...container}>
        <ScrollPagingWrap as={'div'} className={infinityCss.scroll_wrap} {...wrap}>
          <ScrollPagingItem as={'div'} className={infinityCss.scroll_item} {...item}>
            {(v, i) => {
              return <>
                <div className={infinityCss.img_wrap}></div>
                <div>
                  <div>Index : {i}</div>
                  <div>Line : {v.cnt}</div>
                  <div className={infinityCss.text_wrap}>{'\\n\n'.repeat(v.cnt)}</div>
                </div>
              </>
            }}
          </ScrollPagingItem>
        </ScrollPagingWrap>
        <ScrollPagingMore as={'div'} event={getEvent} {...more} css={css`display: flex; justify-content: center; align-content: center`}>
          Loading...
        </ScrollPagingMore>
      </ScrollPagingContainer>
    </div>
  );
}

export default Independent
```
![Animation](https://github.com/user-attachments/assets/c34f40e7-2f35-47dc-9f93-58e74af8af86)

****

> Scroll Change Item

```tsx
import React, {useEffect, useRef, useState} from "react";
import {uesScrollPaging} from "flexible-infinity-scroll/lib/uesScrollPaging";
import {ScrollPagingContainer} from "flexible-infinity-scroll/lib/ScrollPagingContainer";
import {ScrollPagingWrap} from "flexible-infinity-scroll/lib/ScrollPagingWrap";
import {ScrollPagingItem} from "flexible-infinity-scroll/lib/ScrollPagingItem";
import {ScrollPagingMore} from "flexible-infinity-scroll/lib/ScrollPagingMore";
import infinityCss from './infinityScroll.module.scss'

type paramType = {
  cnt: number
}

const Independent = () => {
  const [list, setList] = useState<paramType[]>([])

  useEffect(() => {
    getEvent()
  }, [])

  const {container, wrap, item, more,} = uesScrollPaging({list});

  const getEvent = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const items: paramType[] = Array(10).fill(0).map(() => ({cnt: Math.floor(Math.random() * 5 + 3)}))
    list.push(...items)
    setList([...list])
  };

  return (
    <div className={infinityCss.content}>
      <ScrollPagingContainer as={'div'} className={infinityCss.scroll_container} {...container}>
        <ScrollPagingWrap as={'div'} className={infinityCss.scroll_wrap} {...wrap}>
          <ScrollPagingItem as={'div'} className={infinityCss.scroll_item} {...item}>
            {(v, i) => {
              return <>
                <div className={infinityCss.img_wrap}></div>
                <div>
                  <div>Index : {i}</div>
                  <div>
                    Line : {v.cnt}
                    <button onClick={() => setList(v => {
                        v[i].cnt += 1
                        return [...v]
                    })}>+1</button>
                    <button onClick={() => setList(v => {
                        v[i].cnt -= 1
                        return [...v]
                    })}>-1</button>
                  </div>
                  <div className={infinityCss.text_wrap}>{'\\n\n'.repeat(v.cnt)}</div>
                </div>
              </>
            }}
          </ScrollPagingItem>
        </ScrollPagingWrap>
        <ScrollPagingMore as={'div'} event={getEvent} {...more} css={css`display: flex; justify-content: center; align-content: center`}>
          Loading...
        </ScrollPagingMore>
      </ScrollPagingContainer>
    </div>
  );
}

export default Independent
```
![Animation](https://github.com/user-attachments/assets/950e2831-c73e-4b56-b40a-97d7d76cde8e)