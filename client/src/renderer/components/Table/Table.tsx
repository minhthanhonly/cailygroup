import './Table.scss';

interface TableFromProps {
	customProp: string;
}

export const TableFrom: React.FC<TableFromProps> = ({ customProp }) => {
	console.log(customProp);
  return (
    <table className='tb-from'>
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
		<th><div className='tb-from--th'>期間<span className='txt-red'>（必須）</span></div></th>
		<td>
			<div className='tb-from--td'>
				<div className='tb-from--times'>
					<span><input type="text" className='tb-from--input' /></span>
					<span><input type="text" className='tb-from--input' /></span>
				</div>
				<div className='tb-from--days'>
					<input type="text" className='tb-from--input' />
				</div>
			</div>
		</td>
	  </tr>
      <tr>
		<th><div className='tb-from--th'>期間<span className='txt-red'>（必須）</span></div></th>
		<td>
			<div className='tb-from--td'>
				<div className='tb-from--days'>
					<input type="text" className='tb-from--input' />
				</div>
				<div className='tb-from--times'>
					<span><input type="text" className='tb-from--input' /></span>
					<span><input type="text" className='tb-from--input' /></span>
				</div>
			</div>
		</td>
	  </tr>
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
		<th><div className='tb-from--th'>用途<span className='txt-red'>（必須）</span></div></th>
		<td>
			<div className='tb-from--td'>
				<h5 className='tb-from--title'>■有給休暇</h5>
				<div className='tb-from--checkbox'>
					<label><input type="checkbox" name="checkbox" /><span></span>遅刻</label>
				</div>
				<div className='tb-from--checkbox'>
					<label><input type="checkbox" name="checkbox" /><span></span>早退</label>
				</div>
				<div className='tb-from--checkbox'>
					<label><input type="checkbox" name="checkbox" /><span></span>時間外勤務</label>
				</div>
				<h5 className='tb-from--title'>■無給休暇</h5>
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
      <tr>
		<th><div className='tb-from--th'>行先<span className='txt-red'>（必須）</span></div></th>
		<td>
			<div className='tb-from--td'>
				<input type="text" className='tb-from--input' />
			</div>
		</td>
	  </tr>
      <tr>
		<th><div className='tb-from--th'>事由<span className='txt-red'>（必須）</span></div></th>
		<td>
			<div className='tb-from--td'>
				<textarea className='tb-from--area'></textarea>
			</div>
		</td>
	  </tr>
      <tr>
		<th><div className='tb-from--th'>備考</div></th>
		<td>
			<div className='tb-from--td'>
				<textarea className='tb-from--area'></textarea>
			</div>
		</td>
	  </tr>
    </table>
  )
}