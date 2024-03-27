import { useEffect, useState } from 'react';
import NavForm from '../../layouts/components/Nav/NavForm';
import { Heading2 } from '../../components/Heading';
import {Accordion} from '../Accordion'
import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Statusattr from '../ColorByStatus/statusattr';


export  const Tab7Content = () => {
    const axiosPrivate = useAxiosPrivate();
    const [listOfAccordionItems, setListOfAccordionItems] = useState<FieldTab1Content[] | []>([]);
    const [accordionItems, setAccordionItems] = useState([]);
    const [number, setNumber] = useState([0, 0, 0, 0, 0, 0]); // Mảng số liệu
    type FieldTab1Content = {
        id: string;
        name: string;
        realname:string;
        date: string;
        time:string;
        destination:string;
        status: string;
        status_attr:string;
        reason:string;
        note:string;
    };
    let statusCount = [0, 0, 0, 0, 0, 0]; // Mảng đếm số lượng trạng thái
    useEffect(() => {
        axiosPrivate.get('tabcontent/').then((response) => {
            const data = response.data;
            response.data.forEach(item => {
                if(item.status == 0){
                    statusCount[0] += 1;
                } else if(item.status == 1){
                    statusCount[1] += 1; // Đếm số lượng trạng thái "差し戻し"
                } else if(item.status == 2){
                    statusCount[2] += 1;
                } else if(item.status == 3){
                    statusCount[3] += 1;
                } else if(item.status == 4){
                    statusCount[4] += 1;
                }
                else{
                    statusCount[5] += 1;
                }
            });
            
            setNumber(statusCount);
            if (Array.isArray(data)) {
                const filteredData = data.filter(item => item.status == 5);
                const accordionItems = filteredData.map((item, index) => {
                    const statusattr = item.status_attr ? Statusattr(item.status_attr) : '#FF0000';
                    let approveTexts = '';
                    if(item.status == 0){
                        approveTexts = '承認待ち';
                    } else if(item.status == 1){
                        approveTexts = '差し戻し';
                    } else if(item.status == 2){
                        approveTexts = '下書き';
                    } else if(item.status == 3){
                        approveTexts = '却下';
                    } else if(item.status == 4){
                        approveTexts = '完了';
                    }
                    else{
                        approveTexts = '取り消し'
                    }
                    return{
                        statusattr: statusattr,
                        title: `${item.name}`,
                        subtitle: `${item.realname} \u00A0（${item.date} \u00A0\u00A0 ${item.time}）`,
                        approveText: approveTexts,
                        editIcon: editIcon,
                        closeIcon: closeIcon,
                        content: (
                         <div>
                            <div className='box-register'>
                                <ul>
                                    <li>
                                        <div className='box-register__item'>
                                         <span className='box-register__item__title'>期間</span>
                                            <span className='box-register__item__content'>{item.date}</span>
                                         </div>
                                     </li>
                                     <li>
                                         <div className='box-register__item'>
                                             <span className='box-register__item__title'>行先</span>
                                             <span className='box-register__item__content'>{item.destination}</span>
                                         </div>
                                    </li>
                                     <li>
                                        <div className='box-register__item'>
                                            <span className='box-register__item__title'>事由</span>
                                             <span className='box-register__item__content'>{item.destination}</span>
                                         </div>
                                    </li>
                                     <li>
                                         <div className='box-register__item'>
                                             <span className='box-register__item__title'>備考</span>
                                            <span className='box-register__item__content'>{item.note}</span>
                                         </div>
                                     </li>
                                 </ul>
                             </div>
                             <div className='box-approves'>
                                <div className='box-approves__inner'>
                                     <p className='box-approves__headding'>承認状況</p>
                                    <ul>
                                        <li>
                                             <div className='box-approves__item'>
                                                 <div className='box-approves__item__title'>
                                                    <span>申</span>
                                                 </div>
                                                 <div className='box-approves__item__content'>
                                                     <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='box-approves__item'>
                                                 <div className='box-approves__item__title'>
                                                     <span>1</span>
                                                 </div>
                                                 <div className='box-approves__item__content'>
                                                    <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                     <textarea>コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                     <p className='box-approves__item__content__btn'>
                                                         <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                     </p>
                                                     <p className='list-btn'>
                                                         <span className='list-btn__item'><span className='lbl01'style={{ color: statusattr, border: `1px solid ${statusattr}` }}>{item.status_attr}</span></span>
                                                     </p>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                            <div className='box-approves__item'>
                                                 <div className='box-approves__item__title'>
                                                     <span>2</span>
                                                 </div>
                                                 <div className='box-approves__item__content'>
                                                     <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                     <textarea>コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                     <p className='box-approves__item__content__btn'>
                                                         <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                     </p>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='box-approves__item'>
                                                 <div className='box-approves__item__title'>
                                                     <span className='active'>3</span>
                                                 </div>
                                                 <div className='box-approves__item__content'>
                                                     <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                     <textarea>コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                     <p className='box-approves__item__content__btn'>
                                                         <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                 </p>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='box-approves__item'>
                                                 <div className='box-approves__item__title'>
                                                     <span>未</span>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='box-approves__item box-approves__item--01'>
                                                 <div className='box-approves__item__title'>
                                                     <span className='bg-blue01 color-white'>完</span>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='box-approves__item box-approves__item--01'>
                                                 <div className='box-approves__item__title'>
                                                     <span className='bg-red01 color-white'>却</span>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='box-approves__item box-approves__item--01'>
                                                 <div className='box-approves__item__title'>
                                                     <span className='bg-blue01 color-white'>下</span>
                                                 </div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='box-approves__item box-approves__item--01'>
                                                 <div className='box-approves__item__title'>
                                                     <span className='bg-blue01 color-white'>消</span>
                                                 </div>
                                             </div>
                                         </li>
                                     </ul>
                                 </div>
                             </div>
                         </div>
                        ),
                    }
                });
                setListOfAccordionItems(accordionItems);
                setAccordionItems(accordionItems);
            } else {
                console.error('Dữ liệu không phải là một mảng:', data);
            }
        }).catch((error) => {
            console.error('Lỗi khi gọi API:', error);
        });
    }, [axiosPrivate]);
    return (
        <div>
            <Heading2 text="申請状況" />
            <div className='box-application'>
                <p className='txt-lead'>自分が行った申請の一覧です。</p>
                <div className='box-tab'>
                    <NavForm number={number}/>
                    <div className="tab01 tab-content">
                        <div>
                            <Accordion items={accordionItems}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};