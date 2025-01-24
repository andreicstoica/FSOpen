/* eslint-disable react/prop-types */
const Filter = ({val, changeFunc}) => {
    return (
        <div>
            find countries: <input type='text' value={val} onChange={changeFunc}/>
        </div>
    )
}

export default Filter