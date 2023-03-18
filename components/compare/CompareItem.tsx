import clsx from "clsx";

type CompareItemProps = {
  styles?: string;
};

const CompareItem = ({ styles }: CompareItemProps) => {
  return (
    <div className={clsx("w-4/12 h-full align-col", styles)}>
      <div className="items-center h-20 px-6 font-light border-b row-btwn text-light border-grey border-opacity-10">
        <span className="">Search API</span>
      </div>

      <div className="box-border h-auto p-6 font-light text-right text-grey align-col">
        <p className="mb-4">Since 2019</p>

        <p className="mb-4">300 Users</p>
        <div className={clsx("h-40 w-full mb-4")}>
          <span>
            Free Account - $10/Month <br />
            <br />
            Pro Account - $10/Month <br />
            <br />
            Comapany’s Account - $10/Month
          </span>
        </div>

        <span className="mb-4">PHP, Javascript, Python, Vue Js, Laravel</span>

        <span className="mb-4">24/7 Availability</span>

        <span className="mb-4">24/7 Availability</span>
      </div>
    </div>
  );
};

export default CompareItem;
