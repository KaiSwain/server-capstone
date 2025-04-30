export function Input({ id, type="text", placeholder="", refEl=undefined, label=undefined, onChangeEvent, addlClass="", children, extra="" }) {
    return (
      <div className={`field ${addlClass}`}>
        {label && <label className="label">{label}</label>}
        <div className="control level">
          <input
            id={id}
            placeholder={placeholder}
            className="input"
            type={type}
            ref={refEl}
            onChange={onChangeEvent}
          ></input>
          {extra}
        </div>
        {children}
      </div>
    )
  }
