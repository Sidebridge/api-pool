import clsx from "clsx";

type PulseLoader = {
  styles: string;
};

const PulseLoader = ({ styles }: PulseLoader) => {
  return (
    <div className={clsx("lds-ripple", styles)}>
      <div></div>
      <div></div>
    </div>
  );
};

export default PulseLoader;
