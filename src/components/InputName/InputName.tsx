import React, { useState } from "react";
import { useDatabase } from "../../hooks/database";
import { setUserName } from "../../redux/loginUsersSlice";
import { useAppDispatch } from "../../redux/store";
import './inputName.scss';


interface InputNameProps {
  userName: string;
  setInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputName: React.FC<InputNameProps> = ({userName, setInput}) => {
  const dispatch = useAppDispatch();
  const {writeUserName} = useDatabase();
  const [name, setName] = useState<string>(userName);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const keyUpAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveName();
    }
  }

  const saveName = () => {
    setInput(false);
    if (name !== "") {
      writeUserName(name);
      dispatch(setUserName(name));
    }
  }

  return (
    <input
      name='userName'
      className="inputName"
      autoFocus
      type='text'
      value={name}
      onChange={changeName}
      onKeyUp={keyUpAction}
      onBlur={saveName}
    />
  )
}