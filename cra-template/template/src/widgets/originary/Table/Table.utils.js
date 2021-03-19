import { Link } from "react-router-dom";
import root from "../../../root";

function getDate(str) {
    if(str) {
        str = typeof str === 'string' ? str : `${str}`;
        const year = str.substring(0, 4);
        const month = str.substring(4, 6);
        const day = str.substring(6, 8);
        const hours = str.substring(8, 10);
        const minutes = str.substring(10, 12);
        const seconds = str.substring(12, 14);
        const milliseconds = str.substring(14);
        let res = (day? `${day}-${month}-${year}` : `${month}-${year}`) + (hours? ` ${hours}:${minutes}:${seconds}:${milliseconds}` : '');

        return res;
    }
}

function genFilter(props, temp_names) {
    if (props.filter) {
        props.filter.forEach(key => {
            temp_names.push(`${key}`);
        });
        return temp_names;
    }

    const obj = props.rows? props.rows[0] : props;
    for (const [key, value] of Object.entries(obj)) {
        if (typeof (value) !== 'object') {
            temp_names.push(`${key}`);
        }
        else {
            genFilter(value, temp_names)
        }
    }
    return temp_names;
}


const genCols = (row, filter, props) => {
    const tds = [];
    const columns = (row) => {
      const cols = Object.entries(row);

      cols.forEach((col) => {
        let [key, value] = col;
        if (typeof (value) === 'object') {
            columns(value);
        } else {
            if (props.types) {
                if (props.types[key] === 'date') {
                    value = getDate(value);
                }
            }
            tds[key] = value;
        }
      });
    }

    columns(row);
    const genLink = (key) => {
        if (props.links && props.links[key]) {
            return <Link to={{
                pathname: props.links[key],
                state: {
                  params: row
                }
              }} className="text-info">{tds[key]}</Link>
        }
        return tds[key];
    };

    return filter.map((key, index) => <td key={`col_${index.toString()}`}>{genLink(key)}</td>);
}

const genIndex = (props,index) => !props.hideindex? <th scope="row">{index}</th> :<></>;

const genTr = (rows, filter, props, types) => rows.map((row, index) => (
    <tr key={`row_${index.toString()}`}>
        {genIndex(props, index)}
        {genCols(row, filter, props)}
    </tr>
));

const genTh = (filter) => filter.map((th, index) => (
    <th key={index.toString()}>
        {th.replace(/_/g, ' ').toUpperCase()}
    </th>
));

export {
    genFilter,
    genTh,
    genTr
}