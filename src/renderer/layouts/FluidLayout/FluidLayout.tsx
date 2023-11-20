type FluidLayoutProps = {
  children: string;
};

export const FluidLayout = (prop: FluidLayoutProps) => {
  return (
    <div className="wrapper">
      <div className="container-fluid">{prop.children}</div>
    </div>
  );
};
