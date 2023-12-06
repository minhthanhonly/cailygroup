import { NavLink } from "react-router-dom";

interface ListBranchProps {
  branch: {
    text: string;
    to: string;
  }[];
}

const ListBranch: React.FC<ListBranchProps> = ({branch}) => {
  return (
    <>
      <ul className="lst-branch">
        {branch.map((item) => (
          <li key={item.text}><NavLink to={item.to}>{item.text}</NavLink></li>
        ))}
      </ul>
    </>
  );
};

export default ListBranch;
