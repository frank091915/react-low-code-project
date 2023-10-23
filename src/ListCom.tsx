import React, { FC, useState } from "react";
import type { MouseEvent } from "react"; // 在react中引入ts类型

// type ListType = { name: string; key: string };
const ListCom: FC = () => {
  console.log("render");
  // 本地变量是没有记忆的，每次都会重新声明
  // 不需要重新触发组件更新的话，直接使用本地变量即可
  // 1.所有state 在当前render阶段值不会变，一次render就是一次快照，state不会改变
  const [state, setState] = useState(0);
  const list = [
    { name: "问卷1", key: 1, published: false },
    { name: "问卷2", key: 2, published: false },
    { name: "问卷3", key: 3, published: false },
    { name: "问卷4", key: 4, published: false },
  ];
  // HTMLButtonElement 为ts内置类型不用引入
  const handleClick = (event: MouseEvent<HTMLDivElement>, name: string) => {
    setState(state + 1);
    setState(state + 1);
    setState(state + 1);
    // 所以不管调用多少次settor,state + 1始终都是一个不变的值
    console.log(event.target, name, "state", state);
    setState((state) => state + 1);
    setState((state) => state + 1);
    // setState更改state是异步进行的，并且会将完多个更新合并再重新渲染组件
    setState((state) => {
      console.log("update");
      return state + 1;
    });
    console.log("after update");
    // 2.如果想要拿到更新后的state，可以将函数传入setter，通过回调函数参数获取最新的state

    // 3.不可变数据！！不能直接修改state的值，需要传入一个新值，通过stateSetter函数重新赋值
  };
  return (
    <>
      {list.map((item) => (
        <div key={item.key} onClick={(event) => handleClick(event, item.name)}>
          <span>{item.name}</span>{" "}
          <span>{item.published ? "发布" : "撤销发布"}</span>
          <button>编辑问卷</button>
        </div>
      ))}
    </>
  );
};
export default ListCom;
