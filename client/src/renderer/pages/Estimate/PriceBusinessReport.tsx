import { useEffect, useState } from "react";
import DatePicker from 'react-multi-date-picker';
import date from "../../components/Dashboard/date";

export const PriceBusinessReport = () => {
    const [rows, setRows] = useState([{ id: 0, number: '' }]);
    const [date, setDate] = useState(new Date());

    // thêm 
    const addRow = () => {
        const newRow = { id: rows.length, number: '' };
        setRows([...rows, newRow]);
    };
    const handleLeaveDateChange = () => {
        const newRows = [...rows];
        setRows(newRows);
    };

    return (
        <>
            <h2 className="hdglv2"><span>出張旅費清算書</span></h2>
            <p className="txt-lead">下記の通り申請致します。</p>

            <table className='tb-from'>
                <tr>
                    <th><div className='tb-from--th'>用途<span className='txt-red'>（必須）</span></div></th>
                    <td>
                        <div className='tb-from--td'>
                            <div className='tb-from--checkbox'>
                                <label><input type="checkbox" name="checkbox" /><span></span>遅刻</label>
                            </div>
                            <div className='tb-from--checkbox'>
                                <label><input type="checkbox" name="checkbox" /><span></span>早退</label>
                            </div>
                            <input type="text" className='tb-from--input' />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><div className='tb-from--th'>期間<span className='txt-red'>（必須）</span></div></th>
                    <td>
                        <div className='tb-from--td'>
                            <div className='tb-from--times'>
                                <span><input type="text" className='tb-from--input' /></span>
                                <span><input type="text" className='tb-from--input' /></span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><div className='tb-from--th'>行先<span className='txt-red'>（必須）</span></div></th>
                    <td>
                        <div className='tb-from--td tb-from--file'>
                            <input type="file" id="fileInput" className='tb-from--fileInput' />
                            <input type="text" className='tb-from--input' />
                            <button className="tb-from--button">ファイル選択</button>
                            <button className="tb-from--button tb-from--button__red">キャンセル</button>
                            <p>※全てのデータをひとつのフォルダにまとめてzipファイルに圧縮してからアップロードしてください。</p>
                        </div>
                    </td>
                </tr>
            </table>

            <div className="table tbl_custom">
                <div className='tbl_custom--03'>
                    <table>
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>項目</th>
                                <th>交通費</th>
                                <th>宿泊費</th>
                                <th>交際費</th>
                                <th>食費</th>
                                <th>その他</th>
                                <th>合計</th>
                                <th>備考</th>

                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id}>
                                    <td> <DatePicker onChange={(_date) => handleLeaveDateChange()} value={date} format="DD-MM" /> </td>
                                    <td><input type="text" placeholder='入力してください' /></td>
                                    <td><input type="text" placeholder='入力してください' /></td>
                                    <td><input type="text" placeholder='入力してください' /></td>
                                    <td><input type="text" placeholder='入力してください' /></td>
                                    <td><input type="text" placeholder='入力してください' /></td>
                                    {/* <td><input className="numberInput" type="text" value={row.number} onChange={(e) => handleNumberChange(e, index)} /></td> */}
                                    <td><input type="text" placeholder='入力してください' /></td>
                                    <td><input type="text" placeholder='入力してください' /></td>
                                    <td><input type="text" placeholder='入力してください' /></td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                    <p onClick={addRow} className='plus-row'> 行を追加する</p>
                </div>

                <div className='tbl_custom--04 tbl_width tbl_right'>
                    <table>
                        <tbody>
                            <tr>
                                <th>仮払金差引合計</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>仮払金</th>
                                <td><input className='input_noboder w100' type="text" placeholder='金額を入力' /></td>
                            </tr>
                            <tr>
                                <th>出張手当</th>
                                <td><span>日当 3,000 × </span><input className='input_noboder' type="text" placeholder='日数を入力' /><span> 日</span></td>
                            </tr>
                            <tr>
                                <th>精算額</th>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='box-router'>
                <div className='box-router__title'>承認ルート</div>
                <div className='grid-row box-router__grid'>
                    <div className='box-router__name'>
                        <p>承認者: </p> <p>齋藤社長</p>
                    </div>
                    <div className='box-router__name'>
                        <p>共有者: </p> <p>総務</p>
                    </div>

                </div>
                <div className='box-router__edit'>
                    <p className='plus-row box-router__edit--content'>承認ルートを編集</p>
                </div>
            </div>
            <div className="wrp-button"><button className="btn btn--from btn--gray">下書き保存</button><button className="btn btn--from btn--blue">申請する</button></div>
        </>
    )

}