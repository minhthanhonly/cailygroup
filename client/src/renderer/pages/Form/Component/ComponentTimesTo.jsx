const ComponentTimesTo = (props) => {
  let propsProperty = props.data.props;
  let hasTimesToInput = false;
  propsProperty.map((option) => {
    hasTimesToInput = option.timesto;
  })
  return (
    <>
    { hasTimesToInput &&
      <div className="c-form-inner">
        <div className="c-form-item--02">
          <input type="text" className="c-form-control" placeholder="hh:mm" />
        </div>
        <div className="c-form-item--02">
          <input type="text" className="c-form-control" placeholder="hh:mm" />
        </div>
      </div>
    }
    </>
  );
};

export default ComponentTimesTo;
