import './SwitchBtn.scss';
export const SwitchBtn = ({id , ChangeStataus ,status}) => {
  return (
    <label
      for={id}
      className="SwitchBtn"
    >
      <input
        type="checkbox"
        value=""
        checked={status === "done" ? true : false}
        id={id}
        className="SwitchBtn_input peer"
        onChange={(e) => ChangeStataus(e.target.checked)}
      />
      <div className="SwitchBtn_ring peer-focus:outline-none  peer  peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-green"></div>
    </label>
  );
};
