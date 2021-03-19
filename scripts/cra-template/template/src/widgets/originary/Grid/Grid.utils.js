
import { genFilter } from '../Table/Table.utils';

const genTitle = (key, depth, index, props) => {
  const title = (props && props.titles) ? props.titles[index] : key;
  return <div className="title" style={{fontSize: `${1.1 - depth*0.1}em`}}>{title}</div>;
};

const genSpan = (value, depth) => <div className="text-left" style={{fontSize: `${1 - depth*0.1}em`}}>{value}</div>

const isIn = (key, filter, props) => {
  if (!props.filter) {
      return true;
  }
  for(let i=0; i < filter.length; i++) {
      if (filter[i].toLowerCase() === key.toLowerCase()) {
          return true;
      }
  }
  return false;
};

const genColumns = (record, depth, filter, props) => {
  const cols = Object.entries(record);
  return cols.map((col, index) => {
    let [key, value] = col;
    if (isIn(key, filter, props)) {
      if (typeof (value) !== 'object') {
        return (<div className={`text-center ${depth >= 1 ? "col" : "col-12"}`} key={`col_${depth}_${index}`}>
            {depth === 0 ? <h5><br/></h5>: <></>}
            <div className="col-12 text-left">
              {genTitle(key, depth, index, props)}
              {genSpan(value, depth)}
            </div>
          </div>);
      } else {
        return (
          <div className={`col-sm ${depth > 0 ? "col-md" : "col-md sub-container"}`} key={`col_${depth}_${index}`}>
            {genTitle(key, depth)}
            <div className="row">
              {genColumns(value, depth + 1, filter, props)}
            </div>
          </div>
        );
      }
    }
    return <></>;
  });
};

const genRows = (props, filter) => {
  const records = props.rows;
  return records.map((record, index) => {
    return (
    <div className="row underlined" key={`row_${index}`}>
      {genColumns(record, 0, filter, props)}
    </div>);
  });
};

export {
  genFilter,
  isIn,
  genRows
}