const ComponentDays = (props) => {
  let propsProperty = props.data.props;
  let hasDaysInput = false;
  propsProperty.map((option) => {
    hasDaysInput = option.days;
  })
  return (
    <>
    { hasDaysInput &&
      <div className="c-form-item">
        <input type="text" className="c-form-control form-input" /><label className="c-form-label--02">日間</label>
      </div>
    }
    </>
  );
};

export default ComponentDays;
