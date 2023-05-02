import clsx from "clsx";

const SupportedSDKs = ({
  langs,
  styles,
  limit = 3,
}: {
  langs: string[] | null;
  styles?: string;
  limit?: number;
}) => {
  return (
    <div
      className={clsx(
        "items-center supported-langs align-row text-grey-legacy",
        styles
      )}
    >
      {langs?.slice(0, limit).map((lang: string) => (
        <div
          key={lang}
          className="p-1 px-3 mr-2 leading-relaxed capitalize border rounded-full border-dark"
        >
          {lang}
        </div>
      ))}
      {langs && langs?.length > limit && (
        <div className="p-1 px-2.5 rounded-full border border-dark text-center">
          <span>+{langs?.length - limit}</span>
        </div>
      )}
    </div>
  );
};

export default SupportedSDKs;
