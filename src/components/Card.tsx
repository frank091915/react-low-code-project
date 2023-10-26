import React, { FC } from "react";
import "./Card.css";
type ListType = {
  name: string;
  id: string;
  published: boolean;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle?: (id: string) => void;
};

const Card: FC<ListType> = (props) => {
  const { name, published, id, onClick, onDelete, onToggle } = props;
  const handleEdit = (id: string) => {
    console.log(id, "id");
    onClick(id);
  };
  return (
    <div className="singleCard">
      <span className="title">{name}</span>
      <span className={`status ${published ? "published" : "notPublished"}`}>
        {published ? "发布" : "未发布"}
      </span>
      <button className="button" onClick={() => handleEdit(id)}>
        编辑问卷
      </button>
      <button className="button" onClick={() => onDelete(id)}>
        删除
      </button>
      <button className="button" onClick={() => onToggle && onToggle(id)}>
        {published ? "撤销发布" : "发布"}
      </button>
    </div>
  );
};

export default Card;
