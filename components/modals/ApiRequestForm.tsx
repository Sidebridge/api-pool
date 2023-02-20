const ApiRequestForm = () => {
  return (
    <div className="align-col w-full bg-dark-matte text-white">
      <div className="detail-title w-full row-btwn border-b light-border p-5">
        <div className="title-left align-row content-start">
          <div className="align-col ml-4">
            <h3 className="text-xl">Sendwave</h3>
            {/* <p className="font-light text-sm">
              Ratings & Reviews <span className="text-grey">(3 Reviews)</span>
            </p> */}
          </div>
        </div>
      </div>

      <div className="detail-body w-full flex flex-grow overflow-y-scroll"></div>
    </div>
  );
};

export default ApiRequestForm;
