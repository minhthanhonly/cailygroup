import ListTabs from '../../../components/List/ListBranch';

const Tabs = (statusCounts: number[]) =>[
  {
    text: `進行中(${statusCounts[0]})`,
    to: '/tabs/tab1',
  },
  {
    text: `すべて(${statusCounts.reduce((a, b) => a + b, 0)})`,
    to: '/tabs/tab2',
  },
  {
    text: `差し戻し(${statusCounts[1]})`,
    to: '/tabs/tab3',
  },
  {
    text: `却下(${statusCounts[3]})`,
    to: '/tabs/tab4',
  },
  {
    text: `完了(${statusCounts[4]})`,
    to: '/tabs/tab5',
  },
  {
    text: `下書き(${statusCounts[2]})`,
    to: '/tabs/tab6',
  },
  {
    text: `取り消し(${statusCounts[5]})`,
    to: '/tabs/tab7',
  },
];


const NavForm: React.FC<{ number: number[] }> = ({ number }) => {
  return(
    <>
      <ListTabs branch={Tabs(number)}/>
    </>
  )
};

export default NavForm;
