
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
            </table>
        </>
    )
}