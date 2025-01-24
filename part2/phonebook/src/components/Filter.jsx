const Filter = ({val, changeFunc}) => {
    return (
        <div>
            filter shown with <input value={val} onChange={changeFunc}/>
        </div>
    )
}

export default Filter