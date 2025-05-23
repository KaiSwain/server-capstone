export function Select({id, refEl, options, title, label, addlClass = "" }) {
    return (
      <div className="field is-expanded">
        {label ? <label className="label">{label}</label> : <></>}
        <div className={`select ${addlClass} is-fullwidth`}>
          <select id={id} ref={refEl}>
            <option value="0">{title}</option>
            {
              options.map((option, i) => (
  
                <option key={i} value={option.id}>{option.name || option}</option>
              
              ))
            }
          </select>
        </div>
      </div>
    )
  }