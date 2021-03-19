import './Grid.scss';
import { genFilter, genRows } from './Grid.utils';

function Grid(props) {
  const temp_names = [];
  const filter = genFilter(props, temp_names);

  return (
    <div className="container-fluid">
      {genRows(props, filter)}
    </div>
  );
}

export default Grid;
