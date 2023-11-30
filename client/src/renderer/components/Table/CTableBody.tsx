type CTableBodyProps = {
  contents: string[];
};

export const CTableBody = (props: CTableBodyProps) => {
  return (
    <tbody>
      <tr>
        {props.contents.map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    </tbody>
  )
}
