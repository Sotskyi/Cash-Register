import cl from "./Header.module.css";
import { useTypeWriter } from "../../hooks/useTypeWriter";
export const Header = () => {
  const displayedString = useTypeWriter("Cash Register");
  return <div className={cl.title}>{displayedString}</div>;
};
