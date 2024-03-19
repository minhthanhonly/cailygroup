
export const TravelAllowance = () => {

    return (
        <>
            <h2 className="hdglv2"><span>通勤手当申請書</span></h2>
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
                            <div className='tb-from--checkbox'>
                                <label><input type="checkbox" name="checkbox" /><span></span>時間外勤務</label>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th><div className='tb-from--th'>行先<span className='txt-red'>（必須）</span></div></th>
                    <td>
                        <div className='tb-from--td'>
                            <input type="text" className='tb-from--input' />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><div className='tb-from--th'>行先<span className='txt-red'>（必須）</span></div></th>
                    <td>
                        <div className='tb-from--td'>
                            <input type="text" className='tb-from--input' />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><div className='tb-from--th'>行先<span className='txt-red'>（必須）</span></div></th>
                    <td>【時給制の場合】普通運賃の勤務日数分を支給　　【月給制の場合】1ヵ月分の定期券代金を支給</td>
                </tr>
            </table>
            <div className="table ">


                <div className='tbl_custom--03 boder-input'>
                    <table>
                        <thead>
                            <tr>
                                <th>鉄道名</th>
                                <th>路線名</th>
                                <th className='w500'>利用区間</th>
                                <th>1ヵ月の定期代 <br />(普通運賃往復の場合)</th>
                                <th>備考</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td> <p className='grid-row grid--flex'> <input className='width_auto' type="text" /> ↔ <input className='width_auto' type="text" /></p></td>
                                <td><input type="text" /> <input type="text" /></td>
                                <td>note</td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td> <p className='grid-row grid--flex'> <input className='width_auto' type="text" /> ↔ <input className='width_auto' type="text" /></p></td>
                                <td><input type="text" /> <input type="text" /></td>
                                <td>note note note note  note </td>
                            </tr>
                        </tbody>
                    </table>
                    <a href='@' className='plus-row'> 行を追加する</a>
                </div>
                <div className='tbl_custom--04 tbl_width tbl_right'>
                    <table>
                        <tbody>
                            <tr>
                                <th className='rowspan' rowSpan={2}>合計</th>
                                <td>0</td>
                            </tr>
                            <tr>
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