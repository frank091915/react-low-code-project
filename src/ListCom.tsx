import React, { FC, useState, useRef } from "react";
import { produce } from "immer";
// import type { MouseEvent } from "react"; // 在react中引入ts类型
import Card from "./components/Card";
const ListCom: FC = () => {
  const myRef = useRef(
    (() => {
      console.log(new Date(), "00");
      return new Date();
    })(),
  );
  console.log(myRef.current, "123");
  console.log("render");
  const rawList = [
    { name: "问卷1", id: "1", published: false },
    { name: "问卷2", id: "2", published: false },
    { name: "问卷3", id: "3", published: false },
    { name: "问卷4", id: "4", published: false },
  ];
  // 本地变量是没有记忆的，每次都会重新声明
  // 不需要重新触发组件更新的话，直接使用本地变量即可
  // 1.所有state 在当前render阶段值不会变，一次render就是一次快照，state不会改变
  const [state, setState] = useState(0);
  const [list, setList] = useState(rawList);

  // HTMLButtonElement 为ts内置类型不用引入
  const handleClick = (key: string) => {
    setState(state + 1);
    setState(state + 1);
    setState(state + 1);
    // 所以不管调用多少次settor,state + 1始终都是一个不变的值
    setState((state) => state + 1);
    setState((state) => state + 1);
    // setState更改state是异步进行的，并且会将完多个更新合并再重新渲染组件
    setState((state) => {
      console.log("update in cb");
      return state + 1;
    });
    console.log("after update", key);
    // 2.如果想要拿到更新后的state，可以将函数传入setter，通过回调函数参数获取最新的state

    // 3.不可变数据！！不能直接修改state的值，需要传入一个新值，通过stateSetter函数重新赋值
  };
  const hangleDelete = (id: string) => {
    setList(list.filter((item) => id !== item.id));
  };
  const hangleAdd = () => {
    const id = Math.random().toString().slice(-3);
    const newItem = { name: "问卷" + id, id, published: false };
    setList(
      produce((draft) => {
        draft.push(newItem);
      }),
    );
  };
  const onToggle = (id: string) => {
    setList(
      list.map((item) => {
        if (id === item.id) {
          item.published = !item.published;
        }
        return item;
      }),
    );
  };
  return (
    <div className="listBox">
      <div>
        <button onClick={() => hangleAdd()}>新增</button>
      </div>
      {list.map((item) => (
        <Card
          {...item}
          onClick={handleClick}
          onDelete={hangleDelete}
          onToggle={onToggle}
          key={item.id}
        ></Card>
      ))}
    </div>
  );
};
export default ListCom;
