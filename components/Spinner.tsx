const Spinner = ({size = 96}: {size?: number}) => <div style={{height: size}} className={`aspect-square h-24 border-4 rounded-full border-t-transparent animate-spin mx-auto`} />;

export default Spinner;