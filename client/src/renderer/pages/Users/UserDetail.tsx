import { useEffect, useState } from 'react';
import { Menberdetails } from '../../components/Menberdetails';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const UserDetail = () => {
  const axiosPrivate = useAxiosPrivate();
  const {id} = useParams();

  type FieldUsers = {
    id: string,
    realname: string,
    group_name: string,
    authority_name: string,
    userid: string,
    user_skype: string,
    user_email: string,
    user_address: string,
    user_phone: string,
  }

  const [formValue, setFormValue] = useState({id: '', realname: '', group_name: '', authority_name: '', userid: '', user_skype: '', user_email: '', user_address: '', user_phone: ''});
  useEffect(() => {
    axiosPrivate.get('users/detail/'+id).then(response => {
      setFormValue(response.data);
    })
  }, [])

  return (
    <>
      <Menberdetails id={formValue.id} userid={formValue.userid} realname={formValue.realname} group_name={formValue.group_name} user_address={formValue.user_address} user_phone={formValue.user_phone} user_email={formValue.user_email} user_skype={formValue.user_skype} />
    </>
  )

  // return <Menberdetails id={id} userid={formValue[0].userid} realname={formValue[0].realname} group_name={formValue[0].group_name} user_address={formValue[0].user_address} user_phone={formValue[0].user_phone} user_email={formValue[0].user_email} user_skype={formValue[0].user_skype} />;
};
