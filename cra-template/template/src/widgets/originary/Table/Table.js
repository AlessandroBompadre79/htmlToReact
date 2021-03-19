import './Table.scss';
import { genFilter, genTh, genTr } from './Table.utils';

function Table(props) {
  if(!props || !props.rows || props.rows.length === 0) {
    return <></>;
  }

  const temp_names = [];
  const filter = genFilter(props, temp_names);
  const genIndex = (props) => !props.hideindex? <th scope="row">#</th> :<></>;

  return (
    <table className="table">
      <thead>
        <tr>
          {genIndex(props)}
          {genTh(props.titles || filter)}
        </tr>
      </thead>
      <tbody>
        {genTr(props.rows, filter, props)}
      </tbody>
    </table>
  );
}

export default Table;
