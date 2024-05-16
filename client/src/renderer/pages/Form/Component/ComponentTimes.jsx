const ComponentTimes = (props) => {
  let propsProperty = props.data.props;
  let hasTimesInput = false;
  propsProperty.map((option) => {
    hasTimesInput = option.times;
  })
  return (
    <>
    { hasTimesInput &&
      <div className="c-form-item c-form-item--02 pl0">
        <input type="text" className="c-form-control form-input" placeholder="hh:mm" />
      </div>
    }
    </>
  );
};

export default ComponentTimes;
